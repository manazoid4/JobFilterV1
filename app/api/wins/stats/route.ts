/**
 * GET /api/wins/stats
 * Returns anonymised aggregate win stats for the WinStatsBanner component.
 * No user data exposed — count and total value only.
 *
 * Note: lead_outcomes has no postcode column, so stats are national.
 */

import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

/** Suppress monetary value unless this many rows contribute non-null values (anonymisation). */
const MIN_COHORT = 3;

function formatValue(pounds: number): string {
  if (pounds >= 1_000_000) return `£${(pounds / 1_000_000).toFixed(1)}m`;
  if (pounds >= 1_000) return `£${Math.round(pounds / 1_000)}k`;
  return `£${Math.round(pounds)}`;
}

function buildMessage(wonCount: number, totalValue: number): string {
  if (wonCount === 0) return '';
  const valueStr = totalValue > 0 ? ` — ${formatValue(totalValue)} in work` : '';
  return `${wonCount} job${wonCount === 1 ? '' : 's'} won via JobFilter in the last 30 days${valueStr}`;
}

export async function GET() {
  const admin = getSupabaseServiceClient();
  if (!admin) {
    return Response.json({ ok: false, reason: 'db_unavailable' });
  }

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // Four parallel queries:
  // 1. Exact total win count (no row-fetch cap).
  // 2. Sum of won_value for rows where won_value IS NOT NULL (primary value).
  // 3. Sum of quote_value for rows where won_value IS NULL (fallback — replicates
  //    COALESCE(won_value, quote_value) per-row without a row-fetch cap or PostgREST
  //    column-naming collision from selecting two .sum() columns in one query).
  // 4. Count of rows that contribute to the monetary aggregate (either value non-null).
  //    Used for cohort anonymisation: won-count alone is not sufficient because 3 wins
  //    with only 1 having a value would still disclose that single customer's contract.
  const [
    { count: wonCount, error: countErr },
    { data: wonValueRow, error: wonValueErr },
    { data: quoteValueRow, error: quoteValueErr },
    { count: valueContributorCount, error: contributorErr },
  ] = await Promise.all([
    admin
      .from('lead_outcomes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'won')
      .gte('won_at', since),
    admin
      .from('lead_outcomes')
      .select('won_value.sum()')
      .eq('status', 'won')
      .gte('won_at', since)
      .not('won_value', 'is', null)
      .single(),
    admin
      .from('lead_outcomes')
      .select('quote_value.sum()')
      .eq('status', 'won')
      .gte('won_at', since)
      .is('won_value', null)
      .single(),
    admin
      .from('lead_outcomes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'won')
      .gte('won_at', since)
      .or('won_value.not.is.null,quote_value.not.is.null'),
  ]);

  if (countErr || wonCount === null) {
    return Response.json({ ok: false, reason: 'query_error' });
  }

  if (wonCount === 0) {
    return Response.json({ ok: false, reason: 'no_data' });
  }

  // If either aggregate query failed, suppress the value entirely — a partial subtotal
  // published as the full 30-day figure would be misleading.
  const valueQueryFailed = !!wonValueErr || !!quoteValueErr;
  const wonValue = valueQueryFailed ? 0 : Number((wonValueRow as { sum: number | null } | null)?.sum ?? 0);
  const quoteValue = valueQueryFailed ? 0 : Number((quoteValueRow as { sum: number | null } | null)?.sum ?? 0);
  const totalValue = wonValue + quoteValue;

  // Use contributor count (rows with a non-null value) as the anonymisation threshold,
  // not the total win count. Three wins with only one valued entry would otherwise
  // disclose a single customer's contract.
  const contributors = contributorErr || valueContributorCount === null ? 0 : valueContributorCount;
  const displayValue = !valueQueryFailed && contributors >= MIN_COHORT ? totalValue : 0;

  // Cache national aggregate at CDN layer — results change rarely and the endpoint
  // is called on every postcode keystroke via WinStatsBanner.
  return Response.json(
    {
      ok: true,
      wonCount,
      totalValueFormatted: displayValue > 0 ? formatValue(displayValue) : '',
      message: buildMessage(wonCount, displayValue),
    },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
  );
}

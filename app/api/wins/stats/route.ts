/**
 * GET /api/wins/stats
 * Returns anonymised aggregate win stats for the WinStatsBanner component.
 * No user data exposed — count and total value only.
 *
 * Note: lead_outcomes has no postcode column, so stats are national.
 */

import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

/** Suppress monetary value for small cohorts to avoid disclosing individual contract values. */
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

  // Three parallel queries:
  // 1. Exact count with no row-fetch cap.
  // 2. Sum of won_value for rows where won_value IS NOT NULL (primary value source).
  // 3. Sum of quote_value for rows where won_value IS NULL (fallback — replicates
  //    COALESCE(won_value, quote_value) per-row without a row-fetch cap or PostgREST
  //    column-naming collision from selecting two aggregate columns at once).
  const [
    { count: wonCount, error: countErr },
    { data: wonValueRow, error: wonValueErr },
    { data: quoteValueRow, error: quoteValueErr },
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
  ]);

  if (countErr || wonCount === null) {
    return Response.json({ ok: false, reason: 'query_error' });
  }

  if (wonCount === 0) {
    return Response.json({ ok: false, reason: 'no_data' });
  }

  // Value aggregate errors resolve to 0 so a schema/query issue doesn't break the count display.
  const wonValue = wonValueErr ? 0 : Number((wonValueRow as { sum: number | null } | null)?.sum ?? 0);
  const quoteValue = quoteValueErr ? 0 : Number((quoteValueRow as { sum: number | null } | null)?.sum ?? 0);
  const totalValue = wonValue + quoteValue;

  // Suppress value for small cohorts — a single aggregate could disclose an individual's contract value.
  const displayValue = wonCount >= MIN_COHORT ? totalValue : 0;

  return Response.json({
    ok: true,
    wonCount,
    totalValueFormatted: displayValue > 0 ? formatValue(displayValue) : '',
    message: buildMessage(wonCount, displayValue),
  });
}

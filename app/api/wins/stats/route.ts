/**
 * GET /api/wins/stats?postcode=B14
 * Returns anonymised aggregate win stats for the WinStatsBanner component.
 * No user data exposed — count and total value only.
 *
 * Note: lead_outcomes has no postcode column, so stats are national.
 * The banner copy is intentionally non-location-specific.
 */

import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

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

  // Count and sum in two lightweight queries to avoid a row-fetch cap.
  // won_value stores pounds (toMoneyInt strips formatting, rounds — no ×100).
  const [{ count: wonCount, error: countErr }, { data: sumRow, error: sumErr }] = await Promise.all([
    admin
      .from('lead_outcomes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'won')
      .gte('won_at', since),
    admin
      .from('lead_outcomes')
      .select('won_value.sum(),quote_value.sum()')
      .eq('status', 'won')
      .gte('won_at', since)
      .single(),
  ]);

  if (countErr || sumErr || wonCount === null) {
    return Response.json({ ok: false, reason: 'query_error' });
  }

  if (wonCount === 0) {
    return Response.json({ ok: false, reason: 'no_data' });
  }

  const totalValue = Number((sumRow as Record<string, unknown> | null)?.['won_value'] ?? (sumRow as Record<string, unknown> | null)?.['quote_value'] ?? 0);

  return Response.json({
    ok: true,
    wonCount,
    totalValueFormatted: totalValue > 0 ? formatValue(totalValue) : '',
    message: buildMessage(wonCount, totalValue),
  });
}

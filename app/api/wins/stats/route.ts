/**
 * GET /api/wins/stats
 * Returns anonymised aggregate win stats for the WinStatsBanner component.
 * No user data exposed — count and total value only.
 *
 * Note: lead_outcomes has no postcode column, so stats are national.
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

  // Two queries: exact count (no row-fetch cap) + value rows for client-side sum.
  // Client-side sum applies won_value ?? quote_value per row — matches the ROI
  // endpoint logic and correctly handles rows where only quote_value is set.
  // High limit covers realistic 30-day win volumes on this platform.
  const [{ count: wonCount, error: countErr }, { data: rows, error: rowErr }] = await Promise.all([
    admin
      .from('lead_outcomes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'won')
      .gte('won_at', since),
    admin
      .from('lead_outcomes')
      .select('won_value, quote_value')
      .eq('status', 'won')
      .gte('won_at', since)
      .limit(10_000),
  ]);

  if (countErr || rowErr || wonCount === null) {
    return Response.json({ ok: false, reason: 'query_error' });
  }

  if (wonCount === 0) {
    return Response.json({ ok: false, reason: 'no_data' });
  }

  const totalValue = (rows ?? []).reduce(
    (sum, r) => sum + Number((r as { won_value: number | null; quote_value: number | null }).won_value ?? (r as { won_value: number | null; quote_value: number | null }).quote_value ?? 0),
    0,
  );

  return Response.json({
    ok: true,
    wonCount,
    totalValueFormatted: totalValue > 0 ? formatValue(totalValue) : '',
    message: buildMessage(wonCount, totalValue),
  });
}

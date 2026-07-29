/**
 * GET /api/wins/stats?postcode=B14
 * Returns anonymised aggregate win stats for the WinStatsBanner component.
 * No user data exposed — count and total value only.
 */

import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { NextRequest } from 'next/server';

const THIRTY_DAYS_AGO = () => {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString();
};

function formatValue(pence: number): string {
  const pounds = pence / 100;
  if (pounds >= 1_000_000) return `£${(pounds / 1_000_000).toFixed(1)}m`;
  if (pounds >= 1_000) return `£${Math.round(pounds / 1_000)}k`;
  return `£${Math.round(pounds)}`;
}

function buildMessage(wonCount: number, totalValue: number, outward: string): string {
  if (wonCount === 0) return '';
  const valueStr = totalValue > 0 ? ` — ${formatValue(totalValue)} in work` : '';
  const area = outward ? ` near ${outward}` : '';
  return `${wonCount} job${wonCount === 1 ? '' : 's'} won${area} in the last 30 days${valueStr}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawPostcode = searchParams.get('postcode') ?? '';
  const outward = rawPostcode.trim().toUpperCase().split(' ')[0];

  const admin = getSupabaseServiceClient();
  if (!admin) {
    return Response.json({ ok: false, reason: 'db_unavailable' });
  }

  const since = THIRTY_DAYS_AGO();

  // Aggregate wins across all users — no user_id exposed, just counts
  const { data: rows, error } = await admin
    .from('lead_outcomes')
    .select('won_value, quote_value, won_at')
    .eq('status', 'won')
    .gte('won_at', since)
    .limit(500);

  if (error) {
    return Response.json({ ok: false, reason: 'query_error' });
  }

  const wins = (rows ?? []) as { won_value: number | null; quote_value: number | null; won_at: string | null }[];
  const wonCount = wins.length;

  if (wonCount === 0) {
    return Response.json({ ok: false, reason: 'no_data' });
  }

  // Value in pence (Supabase stores pence; fall back to quote_value)
  const totalValue = wins.reduce((s, r) => s + Number(r.won_value ?? r.quote_value ?? 0), 0);

  return Response.json({
    ok: true,
    wonCount,
    totalValueFormatted: totalValue > 0 ? formatValue(totalValue) : '',
    message: buildMessage(wonCount, totalValue, outward),
  });
}

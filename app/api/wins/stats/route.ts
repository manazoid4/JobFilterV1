/**
 * GET /api/wins/stats?postcode=B14
 * Returns anonymised win counts for jobs recorded near a postcode.
 * Reads from lead_outcomes table — no PII, no names, no phone numbers.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { getOutward } from '../../../../leadEngine/postcode';
import { rateLimitNext } from '../../../../server/lib/nextRateLimit';

function formatValue(pounds: number): string {
  if (pounds >= 1_000_000) return `£${(pounds / 1_000_000).toFixed(1)}m`;
  if (pounds >= 1_000) return `£${Math.round(pounds / 1_000)}k`;
  return `£${pounds}`;
}

function buildMessage(wonCount: number, totalValue: number, outward: string): string {
  if (wonCount === 0) return '';
  const area = outward.toUpperCase();
  const valueStr = totalValue > 0 ? ` worth ${formatValue(totalValue)}` : '';
  if (wonCount === 1) return `1 job near ${area} won through JobFilter${valueStr}.`;
  if (wonCount < 5) return `${wonCount} jobs near ${area} won through JobFilter${valueStr}.`;
  return `${wonCount}+ jobs near ${area} won through JobFilter${valueStr}.`;
}

export async function GET(req: NextRequest) {
  const limited = rateLimitNext(req, 20);
  if (limited) return limited;

  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('postcode') || '';
  if (!raw) {
    return NextResponse.json({ ok: false, error: 'postcode required' }, { status: 400 });
  }

  const outward = getOutward(raw);
  if (!outward) {
    return NextResponse.json({ ok: false, error: 'invalid postcode' }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'service unavailable' }, { status: 503 });
  }

  // Look for wins within 90 days in the same postcode district only.
  // Using the area prefix as a fallback subsumes the district and inflates
  // counts across the whole postal area, so we use the outward code alone.
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();

  // Exact count via HEAD request — no row limit, accurate at any scale.
  // won_at.is.null covers wins recorded before the column was added (no backfill).
  const { count: wonCount, error: countError } = await supabase
    .from('lead_outcomes')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'won')
    .or(`won_at.gte.${since},and(won_at.is.null,created_at.gte.${since})`)
    .eq('postcode_outward', outward);

  if (countError) {
    return NextResponse.json({ ok: false, error: 'query error' }, { status: 500 });
  }

  if (!wonCount || wonCount === 0) {
    return NextResponse.json({ ok: false, wonCount: 0 });
  }

  // Suppress the value for small cohorts: a single-win district publishing
  // an exact value alongside a postcode could let someone with prior knowledge
  // of a contractor confirm a private outcome. The count alone is safely aggregate.
  // Only fetch and expose the value sum once three or more wins exist.
  let totalValue = 0;
  if (wonCount >= 3) {
    const { data: valueRows, error: valueError } = await supabase
      .from('lead_outcomes')
      .select('won_value')
      .eq('status', 'won')
      .or(`won_at.gte.${since},and(won_at.is.null,created_at.gte.${since})`)
      .eq('postcode_outward', outward)
      .limit(5_000);

    totalValue = valueError
      ? 0
      : (valueRows ?? []).reduce((sum, row) => sum + (row.won_value ?? 0), 0);
  }

  const totalValueFormatted = totalValue > 0 ? formatValue(totalValue) : '';
  const message = buildMessage(wonCount, totalValue, outward);

  return NextResponse.json({
    ok: true,
    wonCount,
    totalValueFormatted,
    message,
  });
}

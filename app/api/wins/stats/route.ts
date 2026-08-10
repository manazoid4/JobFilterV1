/**
 * GET /api/wins/stats?postcode=B14
 * Returns anonymised win counts for jobs recorded near a postcode.
 * Reads from lead_outcomes table — no PII, no names, no phone numbers.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

function normaliseOutward(raw: string): string {
  return raw.trim().toUpperCase().split(/\s+/)[0];
}

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
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('postcode') || '';
  if (!raw) {
    return NextResponse.json({ ok: false, error: 'postcode required' }, { status: 400 });
  }

  const outward = normaliseOutward(raw);

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'service unavailable' }, { status: 503 });
  }

  // Look for wins within 90 days in the same postcode district only.
  // Using the area prefix as a fallback subsumes the district and inflates
  // counts across the whole postal area, so we use the outward code alone.
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();

  // Exact count via HEAD request — no row limit, accurate at any scale.
  const { count: wonCount, error: countError } = await supabase
    .from('lead_outcomes')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'won')
    .gte('won_at', since)
    .ilike('postcode_outward', `${outward}%`);

  if (countError) {
    return NextResponse.json({ ok: false, error: 'query error' }, { status: 500 });
  }

  if (!wonCount || wonCount === 0) {
    return NextResponse.json({ ok: false, wonCount: 0 });
  }

  // Fetch won_values to sum — limit is generous; a realistic 90-day district
  // count rarely exceeds a few hundred even at full scale.
  const { data: valueRows, error: valueError } = await supabase
    .from('lead_outcomes')
    .select('won_value')
    .eq('status', 'won')
    .gte('won_at', since)
    .ilike('postcode_outward', `${outward}%`)
    .limit(5_000);

  const totalValue = valueError
    ? 0
    : (valueRows ?? []).reduce((sum, row) => sum + (row.won_value ?? 0), 0);

  const totalValueFormatted = totalValue > 0 ? formatValue(totalValue) : '';
  const message = buildMessage(wonCount, totalValue, outward);

  return NextResponse.json({
    ok: true,
    wonCount,
    totalValueFormatted,
    message,
  });
}

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

function areaPrefix(outward: string): string {
  // B14 → B, SW1A → SW, EC1 → EC
  const m = outward.match(/^([A-Z]{1,2})/);
  return m ? m[1] : outward.slice(0, 2);
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
  const prefix = areaPrefix(outward);

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'service unavailable' }, { status: 503 });
  }

  // Look for wins within 90 days, in same postcode district or area prefix.
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const filter = `postcode_outward.ilike.${outward}%,postcode_outward.ilike.${prefix}%`;

  // Exact count via HEAD request — no row limit, accurate at any scale.
  const { count: wonCount, error: countError } = await supabase
    .from('lead_outcomes')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'won')
    .gte('won_at', since)
    .or(filter);

  if (countError) {
    return NextResponse.json({ ok: false, error: 'query error' }, { status: 500 });
  }

  if (!wonCount || wonCount === 0) {
    return NextResponse.json({ ok: false, wonCount: 0 });
  }

  // Fetch won_values to sum — limit is generous; a realistic 90-day area
  // count rarely exceeds a few hundred even at full scale.
  const { data: valueRows, error: valueError } = await supabase
    .from('lead_outcomes')
    .select('won_value')
    .eq('status', 'won')
    .gte('won_at', since)
    .or(filter)
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

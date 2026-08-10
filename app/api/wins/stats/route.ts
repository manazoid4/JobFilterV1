/**
 * GET /api/wins/stats?postcode=B14
 * Returns anonymised win counts for nearby tradespeople.
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

function formatValue(pence: number): string {
  const pounds = Math.round(pence);
  if (pounds >= 1_000_000) return `£${(pounds / 1_000_000).toFixed(1)}m`;
  if (pounds >= 1_000) return `£${Math.round(pounds / 1_000)}k`;
  return `£${pounds}`;
}

function buildMessage(wonCount: number, totalValue: number, outward: string): string {
  if (wonCount === 0) return '';
  const area = outward.toUpperCase();
  const valueStr = totalValue > 0 ? ` worth ${formatValue(totalValue)}` : '';
  if (wonCount === 1) return `1 tradesperson near ${area} won a job${valueStr} through JobFilter.`;
  if (wonCount < 5) return `${wonCount} tradespeople near ${area} won jobs${valueStr} through JobFilter.`;
  return `${wonCount}+ tradespeople near ${area} are winning work${valueStr} through JobFilter.`;
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

  // Look for wins within 90 days, in same postcode district or area prefix
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('lead_outcomes')
    .select('won_value, postcode_outward')
    .eq('status', 'won')
    .gte('won_at', since)
    .or(`postcode_outward.ilike.${outward}%,postcode_outward.ilike.${prefix}%`)
    .limit(200);

  if (error) {
    return NextResponse.json({ ok: false, error: 'query error' }, { status: 500 });
  }

  const wonCount = data?.length ?? 0;
  const totalValue = (data ?? []).reduce((sum, row) => sum + (row.won_value ?? 0), 0);

  if (wonCount === 0) {
    return NextResponse.json({ ok: false, wonCount: 0 });
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

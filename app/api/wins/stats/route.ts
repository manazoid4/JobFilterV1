import { NextRequest } from 'next/server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

function formatValue(total: number): string {
  if (total >= 1_000_000) return `£${(total / 1_000_000).toFixed(1)}m`;
  if (total >= 1_000) return `£${Math.round(total / 1_000)}k`;
  return `£${total.toLocaleString('en-GB')}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get('postcode')?.trim().toUpperCase() ?? '';
  const outward = postcode.split(' ')[0]; // full outward code e.g. B14, SW1A

  if (outward.length < 2) {
    return Response.json({ ok: true, wonCount: 0 });
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return Response.json({ ok: true, wonCount: 0 });
  }

  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('lead_outcomes')
    .select('postcode_outward, won_value')
    .eq('status', 'won')
    .gte('won_at', ninetyDaysAgo)
    .eq('postcode_outward', outward)
    .limit(500);
  if (error) {
    return Response.json({ ok: true, wonCount: 0 });
  }

  const rows = data ?? [];
  const wonCount = rows.length;
  if (wonCount === 0) {
    return Response.json({ ok: true, wonCount: 0 });
  }

  const totalValue = rows.reduce((s, r) => s + Number(r.won_value ?? 0), 0);
  const totalFormatted = formatValue(totalValue);
  const area = outward || 'your area';

  const message =
    wonCount === 1
      ? `1 trade won a job near ${area} in the last 90 days via JobFilter`
      : `${wonCount} trades won jobs near ${area} in the last 90 days — ${totalFormatted} in verified work`;

  return Response.json({ ok: true, wonCount, totalValueFormatted: totalFormatted, message });
}

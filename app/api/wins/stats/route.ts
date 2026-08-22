import { NextRequest } from 'next/server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { outwardFromPostcode } from '../../../../server/utils/postcode';

function formatValue(total: number): string {
  if (total >= 1_000_000) return `£${(total / 1_000_000).toFixed(1)}m`;
  if (total >= 1_000) return `£${Math.round(total / 1_000)}k`;
  return `£${total.toLocaleString('en-GB')}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get('postcode')?.trim() ?? '';
  const outward = outwardFromPostcode(postcode); // handles "B14 7QH" and compact "B147QH"

  if (!outward) {
    return Response.json({ ok: true, wonCount: 0 });
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return Response.json({ ok: true, wonCount: 0 });
  }

  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const base = { status: 'won' as const, won_at: ninetyDaysAgo, postcode_outward: outward };

  const [countRes, sumRes] = await Promise.all([
    supabase
      .from('lead_outcomes')
      .select('*', { count: 'exact', head: true })
      .eq('status', base.status)
      .gte('won_at', base.won_at)
      .eq('postcode_outward', base.postcode_outward),
    supabase
      .from('lead_outcomes')
      .select('won_value.sum()')
      .eq('status', base.status)
      .gte('won_at', base.won_at)
      .eq('postcode_outward', base.postcode_outward)
      .single(),
  ]);

  if (countRes.error || sumRes.error) {
    return Response.json({ ok: true, wonCount: 0 });
  }

  const wonCount = countRes.count ?? 0;
  if (wonCount === 0) {
    return Response.json({ ok: true, wonCount: 0 });
  }

  const totalValue = Number((sumRes.data as any)?.sum ?? 0);
  const totalFormatted = formatValue(totalValue);

  const message =
    wonCount === 1
      ? `1 job won near ${outward} in the last 90 days via JobFilter`
      : `${wonCount} jobs won near ${outward} in the last 90 days — ${totalFormatted} in logged work`;

  const payload: Record<string, unknown> = { ok: true, wonCount, message };
  if (wonCount >= 2) payload.totalValueFormatted = totalFormatted;
  return Response.json(payload);
}

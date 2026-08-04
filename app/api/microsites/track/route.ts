import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { slugify } from '../../../../src/lib/microsite';

// Best-effort referral event logging for the microsite loop.
// Never blocks the user: always returns ok, even when Supabase is unconfigured.
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = slugify(String(body?.slug ?? ''));
    const event = String(body?.event ?? 'click') === 'signup' ? 'signup' : 'click';
    const source = String(body?.source ?? '').replace(/[<>]/g, '').trim().slice(0, 80);
    if (!slug) return Response.json({ ok: true });

    const supabase = getSupabaseServiceClient();
    if (supabase) {
      await supabase.from('microsite_referrals').insert([{ slug, event, source }]);
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: true });
  }
}

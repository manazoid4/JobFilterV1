import { getSupabaseServiceClient } from '../../../src/lib/supabase/server';
import { isReservedSlug, slugify } from '../../../src/lib/microsite';

function clean(input: unknown, max: number) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

// Reserve + persist a firm microsite. Returns the clean root URL.
// Falls back gracefully ({ ok:false, error:'not_configured' }) when Supabase
// is not configured, so the builder can still produce a URL-param link.
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const firmName = clean(body?.name, 80);
    const baseSlug = slugify(firmName);

    if (!firmName || !baseSlug) {
      return Response.json({ ok: false, error: 'Firm name is required.' }, { status: 422 });
    }
    if (isReservedSlug(baseSlug)) {
      return Response.json({ ok: false, error: 'That name is reserved — try a more specific firm name.' }, { status: 409 });
    }

    const record = {
      firm_name: firmName,
      trade: clean(body?.trade, 60),
      areas: clean(body?.areas, 120),
      phone: clean(body?.phone, 40),
      whatsapp: clean(body?.whatsapp, 40) || clean(body?.phone, 40),
      years: clean(body?.years, 12),
      blurb: clean(body?.blurb, 240),
    };

    const supabase = getSupabaseServiceClient();
    if (!supabase) {
      // Not configured — let the client fall back to a URL-param link.
      return Response.json({ ok: false, error: 'not_configured', slug: baseSlug });
    }

    // Reserve a unique slug: base, then base-2..base-6, then a random suffix.
    const candidates = [baseSlug, ...[2, 3, 4, 5, 6].map((n) => `${baseSlug}-${n}`)];
    candidates.push(`${baseSlug}-${Math.random().toString(36).slice(2, 6)}`);

    for (const slug of candidates) {
      const { error } = await supabase.from('microsites').insert([{ slug, ...record }]);
      if (!error) {
        return Response.json({ ok: true, slug, url: `https://jobfilter.uk/${slug}` });
      }
      if (error.code !== '23505') {
        // Unexpected error — fall back to a URL-param link rather than blocking.
        return Response.json({ ok: false, error: 'not_configured', slug: baseSlug });
      }
      // 23505 = unique violation → try the next candidate.
    }

    return Response.json({ ok: false, error: 'Could not reserve a slug — try a different name.' }, { status: 409 });
  } catch (error: any) {
    return Response.json({ ok: false, error: String(error?.message ?? 'Microsite create failed.') }, { status: 500 });
  }
}

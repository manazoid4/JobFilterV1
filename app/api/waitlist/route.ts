import { getSupabaseServiceClient } from '../../../src/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const entry = {
      name: clean(body?.name, 80),
      trade: clean(body?.trade, 60),
      contact: clean(body?.contact, 120),
      contact_type: detectContactType(body?.contact),
      source: clean(body?.source, 80) || 'site',
    };

    if (!entry.name || !entry.trade || !entry.contact) {
      return Response.json({ ok: false, error: 'Name, trade, and email or phone are required.' }, { status: 422 });
    }

    const supabase = getSupabaseServiceClient();
    let stored: { id: string | null } & typeof entry = { id: null, ...entry };

    if (supabase) {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([entry])
        .select('id')
        .single();
      if (!error && data) {
        stored = { id: data.id, ...entry };
      }
    }

    return Response.json({ ok: true, stored });
  } catch (error: any) {
    return Response.json({ ok: false, error: String(error?.message ?? 'Waitlist failed.') }, { status: 500 });
  }
}

function clean(input: unknown, max: number) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

function detectContactType(input: unknown) {
  const value = String(input ?? '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
  if (/^\+?[\d\s().-]{8,}$/.test(value)) return 'phone';
  return 'unknown';
}

import { createAuthServerClient } from '../../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

async function authenticatedUser() {
  const client = await createAuthServerClient();
  const { data, error } = await client.auth.getUser();
  return error ? null : data.user;
}

export async function GET() {
  const user = await authenticatedUser().catch(() => null);
  if (!user) return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 });
  const admin = getSupabaseServiceClient();
  if (!admin) return Response.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  const { data, error } = await admin.from('profiles').select('phone, whatsapp_opt_in_at, whatsapp_opt_out_at').eq('id', user.id).maybeSingle();
  if (error) return Response.json({ ok: false, error: 'Could not load notification preferences' }, { status: 500 });
  const optedInAt = data?.whatsapp_opt_in_at ? Date.parse(data.whatsapp_opt_in_at) : 0;
  const optedOutAt = data?.whatsapp_opt_out_at ? Date.parse(data.whatsapp_opt_out_at) : 0;
  return Response.json({ ok: true, phone: data?.phone ?? '', whatsappEnabled: optedInAt > 0 && optedInAt > optedOutAt });
}

export async function POST(request: Request) {
  const user = await authenticatedUser().catch(() => null);
  if (!user) return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  if (typeof body.whatsappEnabled !== 'boolean') return Response.json({ ok: false, error: 'whatsappEnabled must be boolean' }, { status: 422 });
  const phone = String(body.phone ?? '').trim();
  if (body.whatsappEnabled && !/^\+?[0-9\s\-().]{7,20}$/.test(phone)) {
    return Response.json({ ok: false, error: 'A valid WhatsApp number is required' }, { status: 422 });
  }

  const admin = getSupabaseServiceClient();
  if (!admin) return Response.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  const now = new Date().toISOString();
  const update = body.whatsappEnabled
    ? { phone, whatsapp_opt_in_at: now, whatsapp_opt_out_at: null, updated_at: now }
    : { whatsapp_opt_out_at: now, updated_at: now };
  const { error } = await admin.from('profiles').update(update).eq('id', user.id);
  if (error) return Response.json({ ok: false, error: 'Could not save notification preferences' }, { status: 500 });
  return Response.json({ ok: true, whatsappEnabled: body.whatsappEnabled });
}

import { createAuthServerClient } from '@/src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '@/src/lib/supabase/server';

export async function POST(request: Request) {
  const authClient = await createAuthServerClient();
  const { data, error } = await authClient.auth.getUser();

  if (error || !data.user) {
    return Response.json({ ok: false, error: 'Confirm your account before activation.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const admin = getSupabaseServiceClient();
  if (!admin) {
    return Response.json({ ok: false, error: 'Supabase service role is not configured.' }, { status: 503 });
  }

  const patch = {
    id: data.user.id,
    email: data.user.email,
    company_name: clean(body.company, 120),
    phone: clean(body.whatsapp, 40),
    trade: clean(body.trade, 60).toLowerCase(),
    postcode_outward: clean(body.postcode, 12).toUpperCase(),
    onboarding_status: 'activation_pending',
    updated_at: new Date().toISOString(),
  };

  if (!patch.phone || !patch.trade || !patch.postcode_outward) {
    return Response.json({ ok: false, error: 'WhatsApp, trade, and postcode are required.' }, { status: 422 });
  }

  const { error: upsertError } = await admin.from('profiles').upsert(patch, { onConflict: 'id' });
  if (upsertError) {
    return Response.json({ ok: false, error: upsertError.message }, { status: 500 });
  }

  await admin.from('n8n_events').insert({
    user_id: data.user.id,
    event_type: 'account.activation_requested',
    payload: patch,
    status: 'received',
  });

  return Response.json({ ok: true });
}

function clean(input: unknown, max: number) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

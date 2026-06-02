/**
 * /api/alerts — Lead alert registration and listing.
 *
 * POST: Register a seeker alert { trade, location, frequency, postcode_outward? }
 *   - instant: paid only
 *   - daily:   paid only
 *   - weekly:  free users allowed
 *
 * GET: List the authenticated user's active alerts.
 *
 * Email delivery is NOT implemented here — this is the data model and API skeleton.
 * To enable delivery, integrate one of:
 *   RESEND_API_KEY   — https://resend.com/docs/api-reference
 *   SENDGRID_API_KEY — https://docs.sendgrid.com/api-reference
 * Hook a scheduled job to read lead_alerts (active=true) and send accordingly.
 */

import { createAuthServerClient } from '../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../src/lib/supabase/server';
import { isOwnerEmail } from '../../../server/lib/ownerAccess';

const VALID_TRADES = new Set([
  'plumbing', 'electrical', 'roofing', 'building', 'carpentry',
  'painting', 'hvac', 'landscaping',
]);
const VALID_FREQUENCIES = new Set(['instant', 'daily', 'weekly']);
const PAID_FREQUENCIES = new Set(['instant', 'daily']);
const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';

async function resolveUser(): Promise<{ userId: string; email: string; isPaid: boolean } | null> {
  if (FULL_ACCESS_TEST_MODE) return { userId: 'test', email: 'test@test.com', isPaid: true };

  try {
    const authClient = await createAuthServerClient();
    const { data, error } = await authClient.auth.getUser();
    if (error || !data.user) return null;

    const email = data.user.email ?? '';
    if (isOwnerEmail(email)) return { userId: data.user.id, email, isPaid: true };

    const admin = getSupabaseServiceClient();
    if (!admin) return { userId: data.user.id, email, isPaid: false };

    const { data: sub } = await admin
      .from('subscriptions')
      .select('active, status')
      .eq('user_id', data.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const isPaid = !!(sub?.active || sub?.status === 'active');
    return { userId: data.user.id, email, isPaid };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const user = await resolveUser();
  if (!user) {
    return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const trade = String(body.trade ?? '').toLowerCase().trim();
  const location = String(body.location ?? '').trim().slice(0, 120);
  const postcode_outward = String(body.postcode_outward ?? body.postcode ?? '').toUpperCase().trim().slice(0, 8) || null;
  const frequency = String(body.frequency ?? 'weekly').toLowerCase();

  if (!VALID_TRADES.has(trade)) {
    return Response.json(
      { ok: false, error: `trade must be one of: ${[...VALID_TRADES].join(', ')}` },
      { status: 422 }
    );
  }
  if (!location) {
    return Response.json({ ok: false, error: 'location is required' }, { status: 422 });
  }
  if (!VALID_FREQUENCIES.has(frequency)) {
    return Response.json(
      { ok: false, error: 'frequency must be instant, daily, or weekly' },
      { status: 422 }
    );
  }
  if (PAID_FREQUENCIES.has(frequency) && !user.isPaid) {
    return Response.json(
      {
        ok: false,
        error: `${frequency} alerts require a paid subscription. Weekly alerts are available on the free plan.`,
      },
      { status: 403 }
    );
  }

  const admin = getSupabaseServiceClient();
  if (!admin) {
    return Response.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  }

  const { data, error } = await admin
    .from('lead_alerts')
    .upsert(
      {
        user_id: user.userId,
        trade,
        location,
        postcode_outward,
        frequency,
        active: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,trade,location,frequency' }
    )
    .select()
    .single();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({
    ok: true,
    alert: data,
    note: 'Email delivery requires RESEND_API_KEY or SENDGRID_API_KEY to be configured on the server.',
  });
}

export async function GET() {
  const user = await resolveUser();
  if (!user) {
    return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 });
  }

  const admin = getSupabaseServiceClient();
  if (!admin) {
    return Response.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  }

  const { data, error } = await admin
    .from('lead_alerts')
    .select('id, trade, location, postcode_outward, frequency, active, last_sent_at, created_at')
    .eq('user_id', user.userId)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, alerts: data ?? [] });
}

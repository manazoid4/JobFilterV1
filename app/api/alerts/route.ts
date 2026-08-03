/**
 * /api/alerts — Lead alert registration and listing.
 *
 * POST: Register a seeker alert { trade, location, frequency, postcode_outward, radius_miles? }
 *   - daily:   paid only
 *   - weekly:  free users allowed
 *
 * GET: List the authenticated user's active alerts.
 *
 * Email delivery runs via the /api/alerts/send cron (see vercel.json), which
 * reads lead_alerts (active=true), scans for matching leads, and emails via
 * Resend (RESEND_API_KEY). Requires postcode_outward to be set on the alert.
 */

import { createAuthServerClient } from '../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../src/lib/supabase/server';
import { isOwnerEmail } from '../../../server/lib/ownerAccess';

const VALID_TRADES = new Set([
  'plumbing', 'electrical', 'roofing', 'building', 'carpentry',
  'painting', 'hvac', 'landscaping',
]);
const VALID_FREQUENCIES = new Set(['daily', 'weekly']);
const POSTCODE_OUTWARD_RE = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?$/;
const PAID_FREQUENCIES = new Set(['daily']);
const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';

function parseRadius(value: unknown): number | null {
  const radius = Number(value ?? 25);
  return Number.isInteger(radius) && radius >= 1 && radius <= 100 ? radius : null;
}

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
  const postcode_raw = String(body.postcode_outward ?? body.postcode ?? '').toUpperCase().trim().replace(/\s+/g, '').slice(0, 8);
  const postcode_outward = POSTCODE_OUTWARD_RE.test(postcode_raw) ? postcode_raw : null;
  const frequency = String(body.frequency ?? 'weekly').toLowerCase();
  const radius_miles = parseRadius(body.radius_miles ?? body.radiusMiles);

  if (!VALID_TRADES.has(trade)) {
    return Response.json(
      { ok: false, error: `trade must be one of: ${[...VALID_TRADES].join(', ')}` },
      { status: 422 }
    );
  }
  if (!location) {
    return Response.json({ ok: false, error: 'location is required' }, { status: 422 });
  }
  if (!postcode_outward) {
    return Response.json({ ok: false, error: 'A valid UK postcode outward code is required' }, { status: 422 });
  }
  if (radius_miles === null) {
    return Response.json({ ok: false, error: 'radius_miles must be a whole number from 1 to 100' }, { status: 422 });
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
        radius_miles,
        frequency,
        active: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,trade,location,frequency' }
    )
    .select()
    .single();

  if (error) {
    console.error('[alerts POST] upsert failed:', error.code);
    return Response.json({ ok: false, error: 'Failed to save alert' }, { status: 500 });
  }

  return Response.json({
    ok: true,
    alert: data,
    note: `Alert saved. New matches are checked ${frequency}.`,
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
    .select('id, trade, location, postcode_outward, radius_miles, frequency, active, last_checked_at, last_sent_at, created_at')
    .eq('user_id', user.userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[alerts GET] query failed:', error.code);
    return Response.json({ ok: false, error: 'Failed to load alerts' }, { status: 500 });
  }

  return Response.json({ ok: true, alerts: data ?? [] });
}

export async function PATCH(request: Request) {
  const user = await resolveUser();
  if (!user) return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 });

  const body = await request.json().catch(() => ({} as Record<string, unknown>));
  const id = String(body.id ?? '').trim();
  if (!id) return Response.json({ ok: false, error: 'id is required' }, { status: 422 });

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.active === 'boolean') update.active = body.active;
  if (body.radius_miles !== undefined || body.radiusMiles !== undefined) {
    const radius = parseRadius(body.radius_miles ?? body.radiusMiles);
    if (radius === null) return Response.json({ ok: false, error: 'radius_miles must be a whole number from 1 to 100' }, { status: 422 });
    update.radius_miles = radius;
  }
  if (body.frequency !== undefined) {
    const frequency = String(body.frequency).toLowerCase();
    if (!VALID_FREQUENCIES.has(frequency)) return Response.json({ ok: false, error: 'Invalid frequency' }, { status: 422 });
    if (PAID_FREQUENCIES.has(frequency) && !user.isPaid) return Response.json({ ok: false, error: 'Paid subscription required' }, { status: 403 });
    update.frequency = frequency;
  }

  const admin = getSupabaseServiceClient();
  if (!admin) return Response.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  const { data, error } = await admin.from('lead_alerts').update(update).eq('id', id).eq('user_id', user.userId).select().maybeSingle();
  if (error) return Response.json({ ok: false, error: 'Failed to update alert' }, { status: 500 });
  if (!data) return Response.json({ ok: false, error: 'Alert not found' }, { status: 404 });
  return Response.json({ ok: true, alert: data });
}

export async function DELETE(request: Request) {
  const user = await resolveUser();
  if (!user) return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 });
  const id = new URL(request.url).searchParams.get('id')?.trim();
  if (!id) return Response.json({ ok: false, error: 'id is required' }, { status: 422 });

  const admin = getSupabaseServiceClient();
  if (!admin) return Response.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  const { data, error } = await admin.from('lead_alerts').delete().eq('id', id).eq('user_id', user.userId).select('id').maybeSingle();
  if (error) return Response.json({ ok: false, error: 'Failed to delete alert' }, { status: 500 });
  if (!data) return Response.json({ ok: false, error: 'Alert not found' }, { status: 404 });
  return Response.json({ ok: true });
}

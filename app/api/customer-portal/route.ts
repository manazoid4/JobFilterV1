import { rateLimitNext } from '../../../server/lib/nextRateLimit';
import { getAppOrigin, getStripe } from '../../../src/lib/stripe';
import { createAuthServerClient } from '../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../src/lib/supabase/server';

export async function POST(request: Request) {
  const limited = rateLimitNext(request, 10);
  if (limited) return limited;

  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ ok: false, error: 'Billing is not configured' }, { status: 503 });
  }

  let userId = '';
  try {
    const authClient = await createAuthServerClient();
    const { data, error } = await authClient.auth.getUser();
    if (error || !data.user) {
      return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 });
    }
    userId = data.user.id;
  } catch {
    return Response.json({ ok: false, error: 'Authentication is not configured' }, { status: 503 });
  }

  const admin = getSupabaseServiceClient();
  if (!admin) {
    return Response.json({ ok: false, error: 'Billing account lookup is not configured' }, { status: 503 });
  }

  const { data: subscription, error: subscriptionError } = await admin
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .not('stripe_customer_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (subscriptionError) {
    console.error('[customer-portal] subscription lookup failed:', subscriptionError.code);
    return Response.json({ ok: false, error: 'Could not load your billing account' }, { status: 500 });
  }

  let customerId = typeof subscription?.stripe_customer_id === 'string'
    ? subscription.stripe_customer_id
    : '';

  if (!customerId) {
    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) {
      console.error('[customer-portal] profile lookup failed:', profileError.code);
      return Response.json({ ok: false, error: 'Could not load your billing account' }, { status: 500 });
    }
    customerId = typeof profile?.stripe_customer_id === 'string' ? profile.stripe_customer_id : '';
  }

  if (!customerId) {
    return Response.json({ ok: false, error: 'No billing account is linked to this user' }, { status: 404 });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${getAppOrigin(request)}/account`,
    });
    return Response.json({ ok: true, url: session.url });
  } catch (error) {
    console.error('[customer-portal] session creation failed:', error instanceof Error ? error.message : error);
    return Response.json({ ok: false, error: 'Could not open the billing portal' }, { status: 502 });
  }
}

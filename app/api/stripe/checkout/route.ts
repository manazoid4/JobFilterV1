import { allowedPriceIds, getAppOrigin, getStripe, resolvePriceId, type Tier } from '../../../../src/lib/stripe';
import { createAuthServerClient } from '../../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { rateLimitNext } from '../../../../server/lib/nextRateLimit';
import type { User } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const limited = rateLimitNext(request, 10);
  if (limited) return limited;

  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ ok: false, error: 'STRIPE_SECRET_KEY is not configured' }, { status: 503 });
  }

  let user: User;
  try {
    const authClient = await createAuthServerClient();
    const { data, error } = await authClient.auth.getUser();
    if (error || !data.user?.email) {
      return Response.json({ ok: false, error: 'Create and confirm your account before checkout' }, { status: 401 });
    }
    user = data.user;
  } catch {
    return Response.json({ ok: false, error: 'Authentication is not configured' }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));

  // Accept either `tier` (legacy) or `plan` (per task spec). Default 'pro'.
  const rawTier = body.tier || body.plan;
  const tier: Tier =
    rawTier === 'founding' ? 'founding'
    : rawTier === 'business' ? 'business'
    : rawTier === 'epc' ? 'epc'
    : 'pro';

  const billing = body.billing === 'annual' ? 'annual' : 'monthly';

  // Accept either explicit `priceId` (per task spec) or resolve from tier/billing —
  // but only if it's one of our own configured Stripe prices, never a raw client value.
  const requestedPrice = typeof body.priceId === 'string' ? body.priceId : '';
  const price = requestedPrice && allowedPriceIds().has(requestedPrice) ? requestedPrice : resolvePriceId(tier, billing);

  if (!price) {
    return Response.json({ ok: false, error: `Stripe price for ${tier} is not configured` }, { status: 503 });
  }

  const email = user.email;
  if (!email) {
    return Response.json({ ok: false, error: 'Create and confirm your account before checkout' }, { status: 401 });
  }
  const checkoutIdentity = await getCheckoutIdentity(user.id, email, user.user_metadata);
  const origin = getAppOrigin(request);
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    ...(checkoutIdentity.stripeCustomerId
      ? { customer: checkoutIdentity.stripeCustomerId }
      : { customer_email: checkoutIdentity.email }),
    client_reference_id: checkoutIdentity.userId,
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/dashboard?welcome=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing?cancelled=1`,
    allow_promotion_codes: true,
    metadata: {
      tier,
      plan: tier,
      user_id: checkoutIdentity.userId,
      trade: checkoutIdentity.trade,
      postcode_outward: checkoutIdentity.postcodeOutward,
    },
    subscription_data: {
      metadata: {
        tier,
        plan: tier,
        user_id: checkoutIdentity.userId,
      },
    },
  });

  return Response.json({ ok: true, url: session.url, sessionId: session.id });
}

async function getCheckoutIdentity(
  userId: string,
  email: string,
  userMetadata: Record<string, unknown> | undefined,
) {
  const fallback = {
    userId,
    email,
    trade: cleanMetadata(userMetadata?.trade, 60),
    postcodeOutward: cleanMetadata(userMetadata?.postcode_outward, 12).toUpperCase(),
    stripeCustomerId: '',
  };

  const admin = getSupabaseServiceClient();
  if (!admin) return fallback;

  const [profileResult, subscriptionResult] = await Promise.all([
    admin
      .from('profiles')
      .select('trade, postcode_outward')
      .eq('id', userId)
      .maybeSingle(),
    admin
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .not('stripe_customer_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (profileResult.error) throw new Error(`Could not load checkout profile: ${profileResult.error.message}`);
  if (subscriptionResult.error) throw new Error(`Could not load billing identity: ${subscriptionResult.error.message}`);

  const profile = profileResult.data;
  const subscription = subscriptionResult.data;

  return {
    ...fallback,
    trade: cleanMetadata(profile?.trade ?? fallback.trade, 60),
    postcodeOutward: cleanMetadata(profile?.postcode_outward ?? fallback.postcodeOutward, 12).toUpperCase(),
    stripeCustomerId: cleanMetadata(subscription?.stripe_customer_id, 255),
  };
}

function cleanMetadata(value: unknown, maxLength: number) {
  return typeof value === 'string'
    ? value.replace(/[<>]/g, '').trim().slice(0, maxLength)
    : '';
}

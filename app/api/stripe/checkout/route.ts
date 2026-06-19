import { allowedPriceIds, getAppOrigin, getStripe, resolvePriceId, type Tier } from '../../../../src/lib/stripe';
import { rateLimitNext } from '../../../../server/lib/nextRateLimit';

export async function POST(request: Request) {
  const limited = rateLimitNext(request, 10);
  if (limited) return limited;

  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ ok: false, error: 'STRIPE_SECRET_KEY is not configured' }, { status: 503 });
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

  const userId = typeof body.userId === 'string' ? body.userId : typeof body.user_id === 'string' ? body.user_id : '';
  const email = typeof body.email === 'string' ? body.email : '';

  if (!userId || !email) {
    return Response.json({ ok: false, error: 'Create and confirm your account before checkout' }, { status: 401 });
  }

  if (!price) {
    return Response.json({ ok: false, error: `Stripe price for ${tier} is not configured` }, { status: 503 });
  }

  const origin = getAppOrigin(request);
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: email,
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/dashboard?welcome=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing?cancelled=1`,
    allow_promotion_codes: true,
    metadata: {
      tier,
      plan: tier,
      user_id: userId,
      userId,
      trade: typeof body.trade === 'string' ? body.trade : '',
      postcodeOutward: typeof body.postcodeOutward === 'string' ? body.postcodeOutward : '',
    },
  });

  return Response.json({ ok: true, url: session.url, sessionId: session.id });
}

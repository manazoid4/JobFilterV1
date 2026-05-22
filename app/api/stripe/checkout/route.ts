import Stripe from 'stripe';

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return Response.json({ ok: false, error: 'STRIPE_SECRET_KEY is not configured' }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const body = await request.json().catch(() => ({}));
  const tier = body.tier === 'business' ? 'business' : body.tier === 'founding' ? 'founding' : 'pro';
  const price = getPriceId(tier);

  if (!price) {
    return Response.json({ ok: false, error: `Stripe price for ${tier} is not configured` }, { status: 503 });
  }

  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: typeof body.email === 'string' ? body.email : undefined,
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/activation-pending?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    metadata: {
      tier,
      userId: typeof body.userId === 'string' ? body.userId : '',
    },
  });

  return Response.json({ ok: true, url: session.url });
}

function getPriceId(tier: string) {
  if (tier === 'founding') return process.env.STRIPE_PRICE_FOUNDING || process.env.STRIPE_PRICE_FOUNDING_MONTHLY;
  if (tier === 'business') return process.env.STRIPE_PRICE_BUSINESS;
  return process.env.STRIPE_PRICE_PRO || process.env.STRIPE_PRICE_PRO_MONTHLY;
}

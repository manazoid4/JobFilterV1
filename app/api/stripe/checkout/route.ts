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
  const userId = typeof body.userId === 'string' ? body.userId : '';
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
    success_url: `${origin}/activation-pending?paid=1&tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    metadata: {
      tier,
      userId,
      trade: typeof body.trade === 'string' ? body.trade : '',
      postcodeOutward: typeof body.postcodeOutward === 'string' ? body.postcodeOutward : '',
    },
  });

  return Response.json({ ok: true, url: session.url });
}

function getPriceId(tier: string) {
  if (tier === 'founding') return process.env.STRIPE_PRICE_FOUNDING || process.env.STRIPE_PRICE_FOUNDING_MONTHLY;
  if (tier === 'business') return process.env.STRIPE_PRICE_BUSINESS;
  return process.env.STRIPE_PRICE_PRO || process.env.STRIPE_PRICE_PRO_MONTHLY;
}

function getAppOrigin(request: Request) {
  const configured = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  if (configured) return configured.replace(/\/$/, '');

  const requestOrigin = request.headers.get('origin');
  if (requestOrigin && !requestOrigin.includes('localhost') && !requestOrigin.includes('127.0.0.1')) {
    return requestOrigin;
  }

  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://jobfilter.uk';
}

// Server-side Stripe initialization helper.
// Do NOT import this from any client component — it depends on STRIPE_SECRET_KEY.
import Stripe from 'stripe';

let cachedStripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  if (!cachedStripe) {
    cachedStripe = new Stripe(secretKey);
  }
  return cachedStripe;
}

export type Tier = 'founding' | 'pro' | 'business' | 'epc';

export function resolvePriceId(tier: Tier, billing: 'monthly' | 'annual' = 'monthly'): string | undefined {
  if (tier === 'founding') {
    if (billing === 'annual') return process.env.STRIPE_PRICE_FOUNDING_ANNUAL;
    return (
      process.env.STRIPE_PRICE_FOUNDING_MONTHLY ||
      process.env.STRIPE_PRICE_FOUNDING
    );
  }
  if (tier === 'pro') {
    if (billing === 'annual') return process.env.STRIPE_PRICE_PRO_ANNUAL;
    return process.env.STRIPE_PRICE_PRO_MONTHLY || process.env.STRIPE_PRICE_PRO;
  }
  if (tier === 'business') return process.env.STRIPE_PRICE_BUSINESS;
  if (tier === 'epc') return process.env.STRIPE_PRICE_EPC_MONTHLY;
  return undefined;
}

export function getAppOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  if (configured) return configured.replace(/\/$/, '');
  const requestOrigin = request.headers.get('origin');
  if (requestOrigin && !requestOrigin.includes('localhost') && !requestOrigin.includes('127.0.0.1')) {
    return requestOrigin;
  }
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://jobfilter.uk';
}

import Stripe from 'stripe';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const DEFAULT_ORIGIN = process.env.APP_URL || 'https://jobfilter.uk';
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' as any })
  : null;

const PRICES = {
  founding: { monthly: 2900, annual: 24000 },
  pro: { monthly: 4900, annual: 40800 },
  epc: { monthly: 1900, annual: 1900 },
};

const FOUNDING_MAX = 30;

export async function createCheckoutSession(data: { tier: string; billing: string; email?: string; userId?: string }) {
  if (!stripe) throw new Error('Stripe not configured');

  const { tier, billing, email, userId } = data;
  const tierKey = tier === 'founding' ? 'founding' : tier === 'epc' ? 'epc' : 'pro';
  const isAnnual = billing === 'annual';

  if (tierKey === 'founding') {
    const count = await getFoundingCount();
    if (count >= FOUNDING_MAX) {
      throw new Error('Founding 30 slots are full. Join Pro instead.');
    }
  }

  const priceConfig: any = {
    currency: 'gbp',
    product_data: {
      name: tierKey === 'founding' ? 'JobFilter Founding 30' : tierKey === 'epc' ? 'EPC Signal Engine' : 'JobFilter Pro',
      description: tierKey === 'founding'
        ? 'Unlimited scans. Full leads. WhatsApp alerts. £29/mo locked forever.'
        : tierKey === 'epc'
        ? 'EPC data signals for your area. £19/mo.'
        : 'Unlimited scans. Full leads. WhatsApp alerts. All tools.',
    },
    unit_amount: isAnnual ? PRICES[tierKey].annual : PRICES[tierKey].monthly,
    recurring: { interval: isAnnual ? 'year' : 'month' },
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: priceConfig, quantity: 1 }],
    mode: 'subscription',
    success_url: `${DEFAULT_ORIGIN}/activation-pending?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${DEFAULT_ORIGIN}/#pricing`,
    customer_email: email || undefined,
    metadata: {
      tier: tierKey,
      billing: isAnnual ? 'annual' : 'monthly',
      userId: userId || '',
    },
  });

  return { url: session.url };
}

export async function handleStripeWebhook(rawBody: string, signature: string) {
  if (!stripe) throw new Error('Stripe not configured');
  if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET not set');

  const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    await handleCheckoutCompleted(session);
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as any;
    await handlePaymentFailed(invoice);
  }

  return { received: true };
}

async function handleCheckoutCompleted(session: any) {
  const { metadata, customer_email, subscription } = session;
  const tier = metadata?.tier || 'pro';
  const billing = metadata?.billing || 'monthly';
  const userId = metadata?.userId || '';

  const payment = {
    stripeSessionId: session.id,
    stripeCustomerId: String(session.customer || ''),
    stripeSubscriptionId: String(subscription || ''),
    tier,
    billing,
    email: customer_email || '',
    userId,
    amount: session.amount_total || 0,
    status: 'active',
    paidAt: new Date().toISOString(),
  };

  const db = getFirestore();
  await db.collection('payments').add(payment);

  if (userId) {
    await db.collection('users').doc(userId).set({
      tier,
      billing,
      status: 'active',
      stripeCustomerId: String(session.customer || ''),
      stripeSubscriptionId: String(subscription || ''),
      paidAt: payment.paidAt,
    }, { merge: true });
  } else if (customer_email) {
    const userSnap = await db.collection('users').where('email', '==', customer_email).limit(1).get();
    if (!userSnap.empty) {
      await userSnap.docs[0].ref.set({
        tier,
        billing,
        status: 'active',
        stripeCustomerId: String(session.customer || ''),
        stripeSubscriptionId: String(subscription || ''),
        paidAt: payment.paidAt,
      }, { merge: true });
    }
  }

  console.log('[stripe] Payment completed:', { tier, billing, email: customer_email });
}

async function handlePaymentFailed(invoice: any) {
  const customerId = String(invoice.customer || '');
  const userSnap = await getFirestore()
    .collection('users')
    .where('stripeCustomerId', '==', customerId)
    .limit(1)
    .get();

  if (!userSnap.empty) {
    await userSnap.docs[0].ref.set({ status: 'past_due' }, { merge: true });
  }

  console.log('[stripe] Payment failed for customer:', customerId);
}

async function getFoundingCount(): Promise<number> {
  const snapshot = await getFirestore()
    .collection('payments')
    .where('tier', '==', 'founding')
    .where('status', '==', 'active')
    .count()
    .get();
  return snapshot.data().count || 0;
}

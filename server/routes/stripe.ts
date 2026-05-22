import type { Express, Request, Response } from 'express';
import Stripe from 'stripe';
import { rateLimit } from '../middleware/rateLimit';
import { triggerN8n } from '../lib/n8n';
import { sendWelcomeEmail, sendPaidConfirmationEmail, sendAdminAlert } from '../lib/resend';

const DEFAULT_ORIGIN = process.env.VITE_SITE_URL || process.env.APP_URL || 'http://localhost:3000';
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' as any })
  : null;

// Price IDs from env (preferred) or fallback to inline amounts
const PRICE_IDS = {
  founding: process.env.STRIPE_PRICE_FOUNDING || '',
  pro: process.env.STRIPE_PRICE_PRO || '',
  business: process.env.STRIPE_PRICE_BUSINESS || '',
};

// Fallback inline amounts (pence) when price IDs not set
const INLINE_AMOUNTS = {
  founding: { monthly: 3900, annual: 39000 },
  pro: { monthly: 7900, annual: 79000 },
  business: { monthly: 14900, annual: 149000 },
};

const FOUNDING_MAX = 30;

export function registerStripeRoutes(app: Express) {
  app.post('/api/create-checkout-session', rateLimit, async (req: Request, res: Response) => {
    try {
      if (!stripe) throw new Error('Stripe not configured');

      const { tier, billing, email, userId } = req.body ?? {};
      if (!tier || !billing) {
        return res.status(422).json({ error: 'tier and billing are required' });
      }

      const tierKey = tier === 'founding' ? 'founding' : tier === 'business' ? 'business' : 'pro';
      const isAnnual = billing === 'annual';

      if (tierKey === 'founding') {
        const count = await getWaitlistCount();
        if (count >= FOUNDING_MAX) {
          return res.status(409).json({ error: 'Founding 30 slots are full. Join Pro instead.' });
        }
      }

      const priceId = PRICE_IDS[tierKey];
      let lineItem: Stripe.Checkout.SessionCreateParams.LineItem;

      if (priceId) {
        lineItem = { price: priceId, quantity: 1 };
      } else {
        const amounts = INLINE_AMOUNTS[tierKey];
        const amount = isAnnual ? amounts.annual : amounts.monthly;
        const productNames: Record<string, string> = {
          founding: 'JobFilter Founding 30',
          pro: 'JobFilter Pro',
          business: 'JobFilter Business',
        };
        lineItem = {
          price_data: {
            currency: 'gbp',
            product_data: { name: productNames[tierKey] },
            unit_amount: amount,
            recurring: { interval: isAnnual ? 'year' : 'month' },
          },
          quantity: 1,
        };
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [lineItem],
        mode: 'subscription',
        success_url: `${req.headers.origin || DEFAULT_ORIGIN}/activation-pending?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || DEFAULT_ORIGIN}/#pricing`,
        customer_email: email || undefined,
        metadata: {
          tier: tierKey,
          billing: isAnnual ? 'annual' : 'monthly',
          userId: userId || '',
        },
      });

      res.json({ url: session.url });
    } catch (err: any) {
      console.error('[stripe:create-session]', err?.message);
      res.status(503).json({ error: err.message });
    }
  });

  app.post('/api/stripe/webhook', expressRawBody, async (req: Request, res: Response) => {
    try {
      if (!stripe) throw new Error('Stripe not configured');
      if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET not set');

      const sig = req.headers['stripe-signature'] as string;
      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error('[stripe:webhook] Signature verification failed:', err.message);
        return res.status(400).json({ error: 'Webhook signature verification failed' });
      }

      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;
        case 'customer.subscription.created':
          await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.updated':
          await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
        case 'invoice.payment_succeeded':
          await handleInvoiceSucceeded(event.data.object as Stripe.Invoice);
          break;
        case 'invoice.payment_failed':
          await handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;
      }

      res.json({ received: true });
    } catch (err: any) {
      console.error('[stripe:webhook]', err?.message);
      res.status(500).json({ error: 'Webhook handler failed' });
    }
  });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { metadata, customer_email, subscription } = session;
  const tier = metadata?.tier || 'pro';
  const billing = metadata?.billing || 'monthly';
  const userId = metadata?.userId || '';
  const email = customer_email || '';
  const customerId = String(session.customer || '');
  const subscriptionId = String(subscription || '');

  const payment = {
    stripe_session_id: session.id,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
    tier,
    billing,
    email,
    user_id: userId,
    amount: session.amount_total || 0,
    status: 'active',
    paid_at: new Date().toISOString(),
  };

  try {
    await storePayment(payment);
    await upsertSubscription(customerId, subscriptionId, { tier, status: 'active', email, user_id: userId });
    await sendPaidConfirmationEmail(email, tier);
    await sendAdminAlert(
      `New ${tier} signup`,
      `Email: ${email}\nTier: ${tier}\nBilling: ${billing}\nAmount: £${((session.amount_total || 0) / 100).toFixed(2)}`
    );
    await triggerN8n('new_paid_subscription', { tier, billing, email, userId, customerId, subscriptionId });
    console.log('[stripe] Checkout completed:', { tier, billing, email });
  } catch (err: any) {
    console.error('[stripe] handleCheckoutCompleted failed:', err?.message);
  }
}

async function handleSubscriptionCreated(sub: Stripe.Subscription) {
  const customerId = String(sub.customer);
  await upsertSubscription(customerId, sub.id, { status: sub.status });
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  const customerId = String(sub.customer);
  await upsertSubscription(customerId, sub.id, { status: sub.status });
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  const customerId = String(sub.customer);
  await upsertSubscription(customerId, sub.id, { status: 'cancelled' });
  await triggerN8n('payment_failed', { customerId, reason: 'subscription_deleted' });
}

async function handleInvoiceSucceeded(invoice: Stripe.Invoice) {
  const customerId = String(invoice.customer || '');
  await updateUserByStripeCustomer(customerId, { status: 'active' });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = String(invoice.customer || '');
  await updateUserByStripeCustomer(customerId, { status: 'past_due' });
  await triggerN8n('payment_failed', { customerId, invoiceId: invoice.id });
  await sendAdminAlert('Payment failed', `Customer: ${customerId}\nInvoice: ${invoice.id}`);
  console.log('[stripe] Payment failed for customer:', customerId);
}

async function getWaitlistCount(): Promise<number> {
  try {
    const { supabase } = await import('../lib/supabase');
    if (!supabase) return 0;
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
    return count || 0;
  } catch {
    return 0;
  }
}

async function storePayment(payment: any) {
  try {
    const { supabase } = await import('../lib/supabase');
    if (!supabase) return;
    const { error } = await supabase.from('payments').insert(payment);
    if (error) console.error('[stripe] DB insert error:', error.message);
  } catch {
    console.warn('[stripe] Could not store payment — DB unavailable');
  }
}

async function upsertSubscription(
  customerId: string,
  subscriptionId: string,
  data: Record<string, unknown>
) {
  try {
    const { supabase } = await import('../lib/supabase');
    if (!supabase) return;
    const { error } = await supabase
      .from('subscriptions')
      .upsert(
        { stripe_customer_id: customerId, stripe_subscription_id: subscriptionId, ...data, updated_at: new Date().toISOString() },
        { onConflict: 'stripe_customer_id' }
      );
    if (error) console.error('[stripe] Subscription upsert error:', error.message);
  } catch {
    console.warn('[stripe] Could not upsert subscription — DB unavailable');
  }
}

async function updateUserByStripeCustomer(customerId: string, data: Record<string, unknown>) {
  try {
    const { supabase } = await import('../lib/supabase');
    if (!supabase) return;
    const { error } = await supabase
      .from('subscriptions')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('stripe_customer_id', customerId);
    if (error) console.error('[stripe] Update by customer error:', error.message);
  } catch {
    console.warn('[stripe] Could not update subscription — DB unavailable');
  }
}

function expressRawBody(req: Request, _res: Response, next: any) {
  let data = '';
  req.on('data', (chunk: Buffer) => { data += chunk; });
  req.on('end', () => {
    (req as any).body = data;
    next();
  });
}

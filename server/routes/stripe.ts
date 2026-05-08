import type { Express, Request, Response } from 'express';
import Stripe from 'stripe';

const DEFAULT_ORIGIN = process.env.APP_URL || 'http://localhost:3000';
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' as any })
  : null;

const PRICES = {
  founding: { monthly: 2900, annual: 24000 },
  pro: { monthly: 4900, annual: 40800 },
  epc: { monthly: 1900, annual: 0 },
};

const FOUNDING_MAX = 30;

export function registerStripeRoutes(app: Express) {
  app.post('/api/create-checkout-session', async (req: Request, res: Response) => {
    try {
      if (!stripe) throw new Error('Stripe not configured');

      const { tier, billing, email, userId } = req.body ?? {};
      if (!tier || !billing) {
        return res.status(422).json({ error: 'tier and billing are required' });
      }

      const tierKey = tier === 'founding' ? 'founding' : tier === 'epc' ? 'epc' : 'pro';
      const isAnnual = billing === 'annual' && tierKey !== 'epc';

      if (tierKey === 'founding') {
        const count = await getWaitlistCount();
        if (count >= FOUNDING_MAX) {
          return res.status(409).json({ error: 'Founding 30 slots are full. Join Pro instead.' });
        }
      }

      const priceMap: Record<string, { monthly: number; annual: number }> = PRICES;
      const amount = isAnnual ? priceMap[tierKey].annual : priceMap[tierKey].monthly;

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
        unit_amount: amount,
        recurring: { interval: isAnnual ? 'year' : 'month' },
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price_data: priceConfig, quantity: 1 }],
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

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
      }

      if (event.type === 'invoice.payment_failed') {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
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

  try {
    await storePayment(payment);
    await updateUserStatus(userId, customer_email, {
      tier,
      billing,
      status: 'active',
      stripeCustomerId: String(session.customer || ''),
      stripeSubscriptionId: String(subscription || ''),
      paidAt: payment.paidAt,
    });
    console.log('[stripe] Payment completed:', { tier, billing, email: customer_email });
  } catch (err: any) {
    console.error('[stripe] Failed to store payment:', err?.message);
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = String(invoice.customer || '');
  try {
    await updateUserByStripeCustomer(customerId, {
      status: 'past_due',
    });
    console.log('[stripe] Payment failed for customer:', customerId);
  } catch (err: any) {
    console.error('[stripe] Failed to update past_due status:', err?.message);
  }
}

async function getWaitlistCount(): Promise<number> {
  try {
    const { supabase } = await import('../lib/supabase');
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
    const { error } = await supabase.from('payments').insert(payment);
    if (error) console.error('[stripe] DB insert error:', error.message);
  } catch {
    console.warn('[stripe] Could not store payment — DB unavailable');
  }
}

async function updateUserStatus(userId: string, email: string, data: any) {
  if (!userId && !email) return;

  try {
    const { supabase } = await import('../lib/supabase');

    if (userId) {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', userId);
      if (error) console.error('[stripe] User update error:', error.message);
      return;
    }

    if (email) {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('email', email);
      if (error) console.error('[stripe] User update by email error:', error.message);
    }
  } catch {
    console.warn('[stripe] Could not update user — DB unavailable');
  }
}

async function updateUserByStripeCustomer(customerId: string, data: any) {
  try {
    const { supabase } = await import('../lib/supabase');
    const { error } = await supabase
      .from('users')
      .update(data)
      .eq('stripeCustomerId', customerId);
    if (error) console.error('[stripe] Update by customer error:', error.message);
  } catch {
    console.warn('[stripe] Could not update user by customer — DB unavailable');
  }
}

function expressRawBody(req: Request, res: Response, next: any) {
  let data = '';
  req.on('data', (chunk: Buffer) => { data += chunk; });
  req.on('end', () => {
    (req as any).body = data;
    next();
  });
}

import Stripe from 'stripe';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { getStripe } from '../../../../src/lib/stripe';

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripe();

  if (!stripe || !webhookSecret) {
    return Response.json({ ok: false, error: 'Stripe webhook is not configured' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  if (!signature) {
    return Response.json({ ok: false, error: 'Missing Stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : 'Invalid signature' }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    console.error('[stripe/webhook] Supabase not configured — event not processed:', event.type);
    return Response.json({ received: true });
  }

  // Log every event for audit trail
  await supabase.from('n8n_events').insert({
    event_type: `stripe.${event.type}`,
    payload: event as unknown as Record<string, unknown>,
    status: 'received',
  }).then(({ error }) => {
    if (error) console.warn('[stripe/webhook] Could not log event:', error.message);
  });

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id || session.metadata?.userId;
      if (!userId) {
        console.error('[stripe/webhook] checkout.session.completed missing user_id in metadata — cannot upgrade plan. session_id:', session.id);
      } else {
        await upsertSubscriptionFromCheckout(session);
        console.log('[stripe/webhook] plan upgraded for user_id:', userId, 'session_id:', session.id);
      }
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      await updateSubscriptionStatus(subscription);
      console.log('[stripe/webhook]', event.type, 'processed for subscription:', subscription.id);
    }
  } catch (err) {
    console.error('[stripe/webhook] handler error for', event.type, ':', err instanceof Error ? err.message : err);
    // Still return 200 so Stripe does not retry — error is logged above
  }

  return Response.json({ received: true });
}

async function upsertSubscriptionFromCheckout(session: Stripe.Checkout.Session) {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return;

  const userId = session.metadata?.user_id || session.metadata?.userId;
  const plan = session.metadata?.plan || session.metadata?.tier || 'pro';
  const stripeSubscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
  const stripeCustomerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;

  if (!userId) {
    console.error('[stripe/webhook] upsertSubscriptionFromCheckout: missing user_id');
    return;
  }
  if (!stripeSubscriptionId) {
    // Session mode may be 'payment' (one-time) — no subscription to upsert but still upgrade plan
    console.warn('[stripe/webhook] checkout.session.completed has no subscription ID — upgrading profile only. session_id:', session.id);
    const { error } = await supabase.from('profiles').update({
      plan,
      stripe_customer_id: stripeCustomerId ?? null,
      onboarding_status: 'paid',
      updated_at: new Date().toISOString(),
    }).eq('id', userId);
    if (error) console.error('[stripe/webhook] profiles update failed:', error.message);
    return;
  }

  const { error: subError } = await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: stripeCustomerId ?? null,
    stripe_subscription_id: stripeSubscriptionId,
    plan,
    status: 'active',
    active: true,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'stripe_subscription_id' });
  if (subError) console.error('[stripe/webhook] subscriptions upsert failed:', subError.message);

  const { error: profError } = await supabase.from('profiles').update({
    plan,
    stripe_customer_id: stripeCustomerId ?? null,
    onboarding_status: 'paid',
    updated_at: new Date().toISOString(),
  }).eq('id', userId);
  if (profError) console.error('[stripe/webhook] profiles update failed:', profError.message);
}

async function updateSubscriptionStatus(subscription: Stripe.Subscription) {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return;

  const active = ['active', 'trialing'].includes(subscription.status);
  const periodEnd = (subscription as any).current_period_end
    ? new Date((subscription as any).current_period_end * 1000).toISOString()
    : null;

  await supabase.from('subscriptions').update({
    status: subscription.status,
    active,
    current_period_end: periodEnd,
    updated_at: new Date().toISOString(),
  }).eq('stripe_subscription_id', subscription.id);

  const { data } = await supabase
    .from('subscriptions')
    .select('user_id, plan')
    .eq('stripe_subscription_id', subscription.id)
    .maybeSingle();

  if (data?.user_id) {
    await supabase.from('profiles').update({
      plan: active ? data.plan : 'free',
      onboarding_status: active ? 'paid' : 'payment_inactive',
      updated_at: new Date().toISOString(),
    }).eq('id', data.user_id);
  }
}

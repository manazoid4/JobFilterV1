import Stripe from 'stripe';
import { getSupabaseServiceClient } from '@/src/lib/supabase/server';

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return Response.json({ ok: false, error: 'Stripe webhook is not configured' }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
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
  if (supabase) {
    await supabase.from('n8n_events').insert({
      event_type: `stripe.${event.type}`,
      payload: event as unknown as Record<string, unknown>,
      status: 'received',
    });

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await upsertSubscriptionFromCheckout(session);
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      await updateSubscriptionStatus(subscription);
    }
  }

  return Response.json({ received: true });
}

async function upsertSubscriptionFromCheckout(session: Stripe.Checkout.Session) {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return;

  const userId = session.metadata?.userId;
  const plan = session.metadata?.tier || 'pro';
  const stripeSubscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
  const stripeCustomerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;

  if (!userId || !stripeSubscriptionId) return;

  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: stripeCustomerId ?? null,
    stripe_subscription_id: stripeSubscriptionId,
    plan,
    status: 'active',
    active: true,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'stripe_subscription_id' });

  await supabase.from('profiles').update({
    plan,
    onboarding_status: 'paid',
    updated_at: new Date().toISOString(),
  }).eq('id', userId);
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

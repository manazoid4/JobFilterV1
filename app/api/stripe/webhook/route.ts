import Stripe from 'stripe';
import { isOwnerEmail } from '../../../../server/lib/ownerAccess';
import { getStripe } from '../../../../src/lib/stripe';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

type AdminClient = NonNullable<ReturnType<typeof getSupabaseServiceClient>>;

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
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : 'Invalid signature' },
      { status: 400 },
    );
  }

  const admin = getSupabaseServiceClient();
  if (!admin) {
    console.error('[stripe/webhook] Supabase not configured — event will be retried:', event.id);
    return Response.json({ ok: false, error: 'Subscription storage is not configured' }, { status: 503 });
  }

  try {
    if (await isEventProcessed(admin, event.id)) {
      return Response.json({ received: true, skipped: 'duplicate' });
    }

    await processEvent(stripe, admin, event);
    await markEventProcessed(admin, event.id, event.type);
    return Response.json({ received: true });
  } catch (error) {
    console.error(
      '[stripe/webhook] processing failed; returning 500 for Stripe retry:',
      event.type,
      event.id,
      error instanceof Error ? error.message : error,
    );
    return Response.json({ ok: false, error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function processEvent(stripe: Stripe, admin: AdminClient, event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      await syncCheckoutSession(stripe, admin, event.data.object as Stripe.Checkout.Session);
      return;
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      await syncCurrentSubscription(stripe, admin, (event.data.object as Stripe.Subscription).id);
      return;
    case 'invoice.payment_succeeded':
      await syncInvoiceSubscription(stripe, admin, event.data.object as Stripe.Invoice);
      return;
    case 'invoice.payment_failed':
      await syncInvoiceSubscription(stripe, admin, event.data.object as Stripe.Invoice);
      return;
    default:
      return;
  }
}

async function syncCheckoutSession(stripe: Stripe, admin: AdminClient, session: Stripe.Checkout.Session) {
  if (session.mode !== 'subscription') return;

  const userId = session.metadata?.user_id || session.client_reference_id;
  const subscriptionId = idOf(session.subscription);

  if (!userId || !subscriptionId) {
    throw new Error(`checkout session ${session.id} is missing authenticated subscription identity`);
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  if (subscription.metadata.user_id && subscription.metadata.user_id !== userId) {
    throw new Error(`checkout session ${session.id} does not match its subscription identity`);
  }
  await syncSubscription(admin, subscription, userId);
}

async function syncSubscription(
  admin: AdminClient,
  subscription: Stripe.Subscription,
  authenticatedUserId?: string,
) {
  const customerId = idOf(subscription.customer);
  if (!customerId) throw new Error(`subscription ${subscription.id} is missing customer identity`);

  const { data: existing, error: existingError } = await admin
    .from('subscriptions')
    .select('user_id, plan')
    .eq('stripe_subscription_id', subscription.id)
    .maybeSingle();
  throwOnError(existingError, 'subscription lookup');

  let userId = cleanText(authenticatedUserId || subscription.metadata?.user_id, 128) || existing?.user_id || '';
  let plan = cleanPlan(subscription.metadata?.plan || subscription.metadata?.tier || existing?.plan);

  if (!userId) {
    const { data: byCustomer, error: customerError } = await admin
      .from('subscriptions')
      .select('user_id, plan')
      .eq('stripe_customer_id', customerId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    throwOnError(customerError, 'customer subscription lookup');
    userId = byCustomer?.user_id || '';
    plan = cleanPlan(subscription.metadata?.plan || subscription.metadata?.tier || existing?.plan || byCustomer?.plan);
  }

  if (!userId) {
    throw new Error(`subscription ${subscription.id} is missing authenticated user identity`);
  }

  const status = subscription.status;
  const active = ['active', 'trialing'].includes(status);
  const periodEnd = (subscription as Stripe.Subscription & { current_period_end?: number }).current_period_end;

  await writeSubscription(admin, {
    userId,
    customerId,
    subscriptionId: subscription.id,
    plan,
    status,
    active,
    currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
  });
}

async function syncInvoiceSubscription(
  stripe: Stripe,
  admin: AdminClient,
  invoice: Stripe.Invoice,
) {
  const subscriptionId = invoiceSubscriptionId(invoice);
  if (!subscriptionId) return;

  await syncCurrentSubscription(stripe, admin, subscriptionId);
}

async function syncCurrentSubscription(stripe: Stripe, admin: AdminClient, subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  await syncSubscription(admin, subscription);
}

async function writeSubscription(admin: AdminClient, input: {
  userId: string;
  customerId: string;
  subscriptionId: string;
  plan: string;
  status: string;
  active: boolean;
  currentPeriodEnd: string | null;
}) {
  const { error: subscriptionError } = await admin.from('subscriptions').upsert({
    user_id: input.userId,
    stripe_customer_id: input.customerId,
    stripe_subscription_id: input.subscriptionId,
    plan: input.plan,
    status: input.status,
    active: input.active,
    current_period_end: input.currentPeriodEnd,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'stripe_subscription_id' });
  throwOnError(subscriptionError, 'subscription state write');

  const { data: profile, error: profileLookupError } = await admin
    .from('profiles')
    .select('email')
    .eq('id', input.userId)
    .maybeSingle();
  throwOnError(profileLookupError, 'profile lookup');

  if (profile?.email && isOwnerEmail(profile.email)) return;

  const onboardingStatus = input.active
    ? 'paid'
    : input.status === 'past_due'
      ? 'payment_failed'
      : 'payment_inactive';
  const { error: profileError } = await admin.from('profiles').update({
    plan: input.active ? input.plan : 'free',
    stripe_customer_id: input.customerId,
    onboarding_status: onboardingStatus,
    updated_at: new Date().toISOString(),
  }).eq('id', input.userId);
  throwOnError(profileError, 'profile subscription write');
}

async function isEventProcessed(admin: AdminClient, eventId: string) {
  const { data, error } = await admin
    .from('stripe_webhook_events')
    .select('id')
    .eq('event_id', eventId)
    .maybeSingle();
  throwOnError(error, 'webhook idempotency lookup');
  return data !== null;
}

async function markEventProcessed(admin: AdminClient, eventId: string, eventType: string) {
  const { error } = await admin.from('stripe_webhook_events').insert({
    event_id: eventId,
    event_type: eventType,
    processed_at: new Date().toISOString(),
  });
  if (error?.code === '23505') return;
  throwOnError(error, 'webhook idempotency write');
}

function invoiceSubscriptionId(invoice: Stripe.Invoice) {
  const legacy = (invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription | null }).subscription;
  if (legacy) return idOf(legacy);

  const parent = (invoice as Stripe.Invoice & {
    parent?: { subscription_details?: { subscription?: string | Stripe.Subscription | null } } | null;
  }).parent;
  return idOf(parent?.subscription_details?.subscription);
}

function idOf(value: string | { id: string } | null | undefined) {
  return typeof value === 'string' ? value : value?.id || '';
}

function cleanPlan(value: unknown) {
  return ['founding', 'pro', 'business', 'epc'].includes(String(value)) ? String(value) : 'pro';
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function throwOnError(error: { message?: string } | null, context: string): asserts error is null {
  if (error) throw new Error(`${context} failed: ${error.message || 'unknown database error'}`);
}

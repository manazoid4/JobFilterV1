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

  // Idempotency protection — skip if event already processed
  const processed = await isEventProcessed(supabase, event.id);
  if (processed) {
    console.log('[stripe/webhook] duplicate event skipped:', event.type, 'id:', event.id);
    return Response.json({ received: true, skipped: 'duplicate' });
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

    if (event.type === 'customer.subscription.created') {
      const subscription = event.data.object as Stripe.Subscription;
      await upsertSubscriptionFromCreated(subscription);
      console.log('[stripe/webhook] customer.subscription.created processed for subscription:', subscription.id);
    }

    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaymentSucceeded(supabase, invoice);
      console.log('[stripe/webhook] invoice.payment_succeeded processed for invoice:', invoice.id);
    }

    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaymentFailed(supabase, invoice);
      console.log('[stripe/webhook] invoice.payment_failed processed for invoice:', invoice.id);
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

  // Mark event as processed
  await markEventProcessed(supabase, event.id, event.type);

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
    // Check if this user is an owner — never downgrade owner accounts via Stripe webhook
    const { data: profile } = await supabase.from('profiles').select('email').eq('id', data.user_id).maybeSingle();
    const ownerEmails = ['manazoid4@gmail.com', ...(process.env.JOBFILTER_SUPERUSER_EMAILS ?? '').split(',').map((e: string) => e.trim().toLowerCase()).filter(Boolean)];
    if (profile?.email && ownerEmails.includes(profile.email.toLowerCase())) {
      console.log('[stripe-webhook] skipping plan change for owner account', profile.email);
      return;
    }

    await supabase.from('profiles').update({
      plan: active ? data.plan : 'free',
      onboarding_status: active ? 'paid' : 'payment_inactive',
      updated_at: new Date().toISOString(),
    }).eq('id', data.user_id);
  }
}

// ─── Idempotency protection ──────────────────────────────────────────────────

async function isEventProcessed(supabase: NonNullable<ReturnType<typeof getSupabaseServiceClient>>, eventId: string): Promise<boolean> {
  const { data } = await supabase
    .from('stripe_webhook_events')
    .select('id')
    .eq('event_id', eventId)
    .maybeSingle();
  return data !== null;
}

async function markEventProcessed(supabase: NonNullable<ReturnType<typeof getSupabaseServiceClient>>, eventId: string, eventType: string): Promise<void> {
  const { error } = await supabase.from('stripe_webhook_events').insert({
    event_id: eventId,
    event_type: eventType,
    processed_at: new Date().toISOString(),
  });
  if (error) {
    // Log but don't fail — the event was still processed successfully
    console.warn('[stripe/webhook] could not mark event as processed:', error.message);
  }
}

// ─── customer.subscription.created ──────────────────────────────────────────

async function upsertSubscriptionFromCreated(subscription: Stripe.Subscription) {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return;

  const stripeCustomerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;
  const stripeSubscriptionId = subscription.id;
  const status = subscription.status;
  const active = ['active', 'trialing'].includes(status);
  const plan = subscription.items.data[0]?.price?.nickname
    ?? subscription.items.data[0]?.price?.id
    ?? 'pro';
  const rawPeriodEnd = (subscription as unknown as { current_period_end?: number }).current_period_end;
  const periodEnd = rawPeriodEnd
    ? new Date(rawPeriodEnd * 1000).toISOString()
    : null;

  // Find user by stripe customer id
  const { data: subData } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', stripeCustomerId)
    .maybeSingle();

  const userId = subData?.user_id;

  if (!userId) {
    console.warn('[stripe/webhook] customer.subscription.created: no user found for stripe_customer_id:', stripeCustomerId);
    return;
  }

  const { error: subError } = await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: stripeCustomerId ?? null,
    stripe_subscription_id: stripeSubscriptionId,
    plan,
    status,
    active,
    current_period_end: periodEnd,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'stripe_subscription_id' });
  if (subError) console.error('[stripe/webhook] subscriptions upsert failed:', subError.message);

  // Check owner protection before updating profile
  const { data: profile } = await supabase.from('profiles').select('email').eq('id', userId).maybeSingle();
  const ownerEmails = ['manazoid4@gmail.com', ...(process.env.JOBFILTER_SUPERUSER_EMAILS ?? '').split(',').map((e: string) => e.trim().toLowerCase()).filter(Boolean)];
  if (profile?.email && ownerEmails.includes(profile.email.toLowerCase())) {
    console.log('[stripe-webhook] skipping plan change for owner account:', profile.email);
    return;
  }

  const { error: profError } = await supabase.from('profiles').update({
    plan,
    stripe_customer_id: stripeCustomerId ?? null,
    onboarding_status: active ? 'paid' : 'payment_inactive',
    updated_at: new Date().toISOString(),
  }).eq('id', userId);
  if (profError) console.error('[stripe/webhook] profiles update failed:', profError.message);
}

// ─── invoice.payment_succeeded ────────────────────────────────────────────────

type LegacyInvoice = Stripe.Invoice & { subscription?: string | { id: string } };

async function handleInvoicePaymentSucceeded(
  supabase: NonNullable<ReturnType<typeof getSupabaseServiceClient>>,
  invoice: Stripe.Invoice,
) {
  const stripeCustomerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
  if (!stripeCustomerId) return;

  const inv = invoice as LegacyInvoice;
  // Update subscription to active if not already
  if (inv.subscription) {
    const subscriptionId = typeof inv.subscription === 'string' ? inv.subscription : inv.subscription?.id;
    if (subscriptionId) {
      const { error } = await supabase.from('subscriptions').update({
        status: 'active',
        active: true,
        updated_at: new Date().toISOString(),
      }).eq('stripe_subscription_id', subscriptionId);
      if (error) console.error('[stripe/webhook] invoice.payment_succeeded: subscriptions update failed:', error.message);

      // Also refresh profile status
      const { data } = await supabase
        .from('subscriptions')
        .select('user_id, plan')
        .eq('stripe_subscription_id', subscriptionId)
        .maybeSingle();

      if (data?.user_id) {
        const { data: profile } = await supabase.from('profiles').select('email').eq('id', data.user_id).maybeSingle();
        const ownerEmails = ['manazoid4@gmail.com', ...(process.env.JOBFILTER_SUPERUSER_EMAILS ?? '').split(',').map((e: string) => e.trim().toLowerCase()).filter(Boolean)];
        if (profile?.email && ownerEmails.includes(profile.email.toLowerCase())) {
          console.log('[stripe-webhook] skipping profile update for owner account:', profile.email);
          return;
        }

        await supabase.from('profiles').update({
          plan: data.plan,
          onboarding_status: 'paid',
          updated_at: new Date().toISOString(),
        }).eq('id', data.user_id);
      }
    }
  }

  console.log('[stripe/webhook] invoice.payment_succeeded: payment logged for customer:', stripeCustomerId, 'invoice:', invoice.id);
}

// ─── invoice.payment_failed ──────────────────────────────────────────────────

async function handleInvoicePaymentFailed(
  supabase: NonNullable<ReturnType<typeof getSupabaseServiceClient>>,
  invoice: Stripe.Invoice,
) {
  const stripeCustomerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
  if (!stripeCustomerId) return;

  const inv = invoice as LegacyInvoice;
  if (inv.subscription) {
    const subscriptionId = typeof inv.subscription === 'string' ? inv.subscription : inv.subscription?.id;
    if (subscriptionId) {
      // Mark subscription as past_due
      const { error } = await supabase.from('subscriptions').update({
        status: 'past_due',
        active: false,
        updated_at: new Date().toISOString(),
      }).eq('stripe_subscription_id', subscriptionId);
      if (error) console.error('[stripe/webhook] invoice.payment_failed: subscriptions update failed:', error.message);

      // Update profile status — but protect owner accounts
      const { data } = await supabase
        .from('subscriptions')
        .select('user_id, plan')
        .eq('stripe_subscription_id', subscriptionId)
        .maybeSingle();

      if (data?.user_id) {
        const { data: profile } = await supabase.from('profiles').select('email').eq('id', data.user_id).maybeSingle();
        const ownerEmails = ['manazoid4@gmail.com', ...(process.env.JOBFILTER_SUPERUSER_EMAILS ?? '').split(',').map((e: string) => e.trim().toLowerCase()).filter(Boolean)];
        if (profile?.email && ownerEmails.includes(profile.email.toLowerCase())) {
          console.log('[stripe-webhook] skipping past_due downgrade for owner account:', profile.email);
          return;
        }

        await supabase.from('profiles').update({
          plan: 'free',
          onboarding_status: 'payment_failed',
          updated_at: new Date().toISOString(),
        }).eq('id', data.user_id);
      }
    }
  }

  console.warn('[stripe/webhook] invoice.payment_failed: marked past_due for customer:', stripeCustomerId, 'invoice:', invoice.id);
}

import Stripe from 'stripe';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

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
  }

  return Response.json({ received: true });
}

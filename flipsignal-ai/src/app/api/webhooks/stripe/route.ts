import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getStripe, getPlanForPriceId } from "@/lib/stripe";
import { SubscriptionStatus } from "@prisma/client";
import type Stripe from "stripe";

/**
 * POST /api/webhooks/stripe
 * Handles checkout.session.completed, customer.subscription.updated, and
 * customer.subscription.deleted events to keep the Subscription model
 * (and the related User.planTier) in sync with Stripe.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: `Invalid signature: ${err}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (!userId || !session.subscription || !session.customer) break;

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const priceId = subscription.items.data[0]?.price.id;
      const planTier = getPlanForPriceId(priceId);

      await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          status: SubscriptionStatus.ACTIVE,
          planTier,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
        update: {
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          status: SubscriptionStatus.ACTIVE,
          planTier,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });

      await prisma.user.update({ where: { id: userId }, data: { planTier } });
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0]?.price.id;
      const planTier = getPlanForPriceId(priceId);
      const status = mapStripeStatus(subscription.status);

      const existing = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId: subscription.id },
      });
      if (!existing) break;

      await prisma.subscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          status,
          planTier,
          stripePriceId: priceId,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      });

      await prisma.user.update({ where: { id: existing.userId }, data: { planTier } });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const existing = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId: subscription.id },
      });
      if (!existing) break;

      await prisma.subscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: SubscriptionStatus.CANCELED, planTier: "FREE" },
      });
      await prisma.user.update({ where: { id: existing.userId }, data: { planTier: "FREE" } });
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}

function mapStripeStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "active":
      return SubscriptionStatus.ACTIVE;
    case "trialing":
      return SubscriptionStatus.TRIALING;
    case "past_due":
      return SubscriptionStatus.PAST_DUE;
    case "canceled":
    case "unpaid":
      return SubscriptionStatus.CANCELED;
    default:
      return SubscriptionStatus.INCOMPLETE;
  }
}

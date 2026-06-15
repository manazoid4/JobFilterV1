import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { getStripe, PLAN_PRICE_IDS } from "@/lib/stripe";
import { PlanTier } from "@prisma/client";

/**
 * POST /api/billing/checkout
 * Body (form): { plan: "PRO" | "ELITE" }
 * Creates a Stripe Checkout session for the selected plan and redirects
 * the user to it.
 */
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId }, include: { subscription: true } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const form = await req.formData();
  const plan = form.get("plan") as PlanTier;
  const priceId = PLAN_PRICE_IDS[plan];

  if (!priceId) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  const stripe = getStripe();
  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: user.subscription?.stripeCustomerId ?? undefined,
    customer_email: user.subscription?.stripeCustomerId ? undefined : user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/billing?success=true`,
    cancel_url: `${origin}/billing?canceled=true`,
    metadata: { userId: user.id, plan },
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}

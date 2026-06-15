import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

/**
 * POST /api/billing/portal
 * Redirects the user to the Stripe billing portal for self-service
 * subscription management.
 */
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId }, include: { subscription: true } });
  if (!user?.subscription?.stripeCustomerId) {
    return NextResponse.json({ error: "No Stripe customer found" }, { status: 400 });
  }

  const stripe = getStripe();
  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  const session = await stripe.billingPortal.sessions.create({
    customer: user.subscription.stripeCustomerId,
    return_url: `${origin}/billing`,
  });

  return NextResponse.redirect(session.url, { status: 303 });
}

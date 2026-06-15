import Stripe from "stripe";
import { PlanTier } from "@prisma/client";

let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set. Configure it to enable billing.");
  }
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
  }
  return client;
}

/** Maps plan tiers to their Stripe Price IDs (configured via env vars). */
export const PLAN_PRICE_IDS: Partial<Record<PlanTier, string>> = {
  [PlanTier.PRO]: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
  [PlanTier.ELITE]: process.env.NEXT_PUBLIC_STRIPE_PRICE_ELITE,
};

/** Resolves a Stripe Price ID back to a PlanTier (used by the webhook handler). */
export function getPlanForPriceId(priceId: string | null | undefined): PlanTier {
  if (!priceId) return PlanTier.FREE;
  for (const [tier, id] of Object.entries(PLAN_PRICE_IDS)) {
    if (id === priceId) return tier as PlanTier;
  }
  return PlanTier.FREE;
}

import { PlanTier } from "@prisma/client";

const TIER_RANK: Record<PlanTier, number> = {
  [PlanTier.FREE]: 0,
  [PlanTier.PRO]: 1,
  [PlanTier.ELITE]: 2,
};

/**
 * Feature -> minimum plan tier required. Used both by API routes (to
 * reject access) and the UI (to show upgrade prompts).
 */
export const FEATURE_GATES = {
  FULL_DEAL_FEED: PlanTier.PRO,
  DAILY_OPPORTUNITY_FEED: PlanTier.PRO,
  PORTFOLIO_TRACKING: PlanTier.PRO,
  LISTING_GENERATOR: PlanTier.PRO,
  NEGOTIATION_ASSISTANT: PlanTier.PRO,
  FLIP_COPILOT: PlanTier.PRO,
  FULL_AUTOMATION: PlanTier.ELITE,
  PREDICTIVE_SOURCING: PlanTier.ELITE,
  CATEGORY_INTELLIGENCE: PlanTier.ELITE,
  CHAT_ALERTS: PlanTier.ELITE,
  BATCH_DEAL_ANALYSIS: PlanTier.ELITE,
} as const;

export type FeatureGate = keyof typeof FEATURE_GATES;

/** Returns true if `planTier` meets or exceeds the tier required for `feature`. */
export function hasAccess(planTier: PlanTier, feature: FeatureGate): boolean {
  return TIER_RANK[planTier] >= TIER_RANK[FEATURE_GATES[feature]];
}

/** Throws if `planTier` does not meet the minimum tier required for `feature`. */
export function requireFeature(planTier: PlanTier, feature: FeatureGate): void {
  if (!hasAccess(planTier, feature)) {
    throw new PlanGateError(feature, FEATURE_GATES[feature]);
  }
}

export class PlanGateError extends Error {
  constructor(public feature: FeatureGate, public requiredTier: PlanTier) {
    super(`Feature "${feature}" requires the ${requiredTier} plan or higher.`);
    this.name = "PlanGateError";
  }
}

/** FREE plan limits, enforced where FEATURE_GATES allows FREE access but caps usage. */
export const FREE_TIER_LIMITS = {
  MAX_DEAL_FEED_RESULTS: 5,
  MAX_SEARCHES_PER_DAY: 10,
};

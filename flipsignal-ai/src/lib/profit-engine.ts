import type { ClassificationResult } from "./ai/classify";
import type { ValuationResult } from "./ai/valuation";
import type { CategoryStatsInput } from "./ai/dealscore";

/** Typical marketplace fee assumptions (eBay-style: ~12.8% final value fee). */
const PLATFORM_FEE_RATE = 0.128;

/** Flat estimate for packaging/postage when shipping a sold item. */
const DEFAULT_TRANSPORT_COST_CENTS = 450;

export type ProfitEstimateResult = {
  expectedResaleCents: number;
  worstCaseCents: number;
  bestCaseCents: number;
  platformFeeCents: number;
  transportCostCents: number;
  refurbCostCents: number;
  timeToSellDays: number;
  liquidityScore: number;
  roiPercent: number;
  profitDistribution: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
};

/**
 * Computes the full profit estimate for a listing given its acquisition
 * price, AI valuation range, and category-level historical performance.
 *
 * Refurb cost is estimated from the listing's condition signals (description
 * keywords). Time-to-sell and liquidity fall back to category-neutral
 * defaults when no CategoryStats exist yet for this category.
 */
export function calculateProfitEstimate(
  listing: { priceCents: number; description?: string | null },
  analysis: ClassificationResult,
  valuation: ValuationResult,
  categoryStats: CategoryStatsInput
): ProfitEstimateResult {
  const refurbCostCents = estimateRefurbCost(listing, analysis);
  const platformFeeCents = Math.round(valuation.expectedResaleCents * PLATFORM_FEE_RATE);
  const transportCostCents = DEFAULT_TRANSPORT_COST_CENTS;

  const totalCostCents = listing.priceCents + refurbCostCents + platformFeeCents + transportCostCents;
  const netProfitCents = valuation.expectedResaleCents - totalCostCents;
  const roiPercent = listing.priceCents > 0 ? (netProfitCents / listing.priceCents) * 100 : 0;

  const timeToSellDays = categoryStats?.avgTimeToSellDays ?? 14;

  // Liquidity: faster sell time + larger historical sample = more liquid.
  const liquidityScore = categoryStats
    ? clamp(Math.round(100 - categoryStats.avgTimeToSellDays * 2 + clamp(categoryStats.sampleSize / 5, 0, 20)), 0, 100)
    : 50;

  const profitDistribution = buildProfitDistribution(
    valuation,
    listing.priceCents,
    refurbCostCents,
    platformFeeCents,
    transportCostCents
  );

  return {
    expectedResaleCents: valuation.expectedResaleCents,
    worstCaseCents: valuation.worstCaseCents,
    bestCaseCents: valuation.bestCaseCents,
    platformFeeCents,
    transportCostCents,
    refurbCostCents,
    timeToSellDays,
    liquidityScore,
    roiPercent,
    profitDistribution,
  };
}

/**
 * Estimates refurbishment/repair cost from condition keywords in the
 * description. Returns 0 for items described as new/like-new.
 */
function estimateRefurbCost(
  listing: { priceCents: number; description?: string | null },
  analysis: ClassificationResult
): number {
  const text = (listing.description ?? "").toLowerCase();

  if (text.includes("for parts") || text.includes("spares or repair") || text.includes("not working")) {
    // Significant repair likely needed - budget ~25% of acquisition price.
    return Math.round(listing.priceCents * 0.25);
  }
  if (text.includes("cracked") || text.includes("damaged") || text.includes("broken")) {
    return Math.round(listing.priceCents * 0.15);
  }
  if (text.includes("used") || text.includes("worn")) {
    // Light cleaning/detailing for general secondhand items.
    return analysis.category === "Electronics" ? 0 : 500;
  }

  return 0;
}

/**
 * Builds a simple percentile profit distribution by anchoring p10/p90 to the
 * AI valuation's worst/best case resale values and interpolating the middle
 * percentiles around the expected (p50) value.
 */
function buildProfitDistribution(
  valuation: ValuationResult,
  acquisitionCents: number,
  refurbCostCents: number,
  platformFeeCentsAtExpected: number,
  transportCostCents: number
) {
  const fixedCosts = acquisitionCents + refurbCostCents + transportCostCents;

  const profitAt = (resaleCents: number) => {
    const fee = Math.round(resaleCents * PLATFORM_FEE_RATE);
    return resaleCents - fee - fixedCosts;
  };

  const p10 = profitAt(valuation.worstCaseCents);
  const p90 = profitAt(valuation.bestCaseCents);
  const p50 = profitAt(valuation.expectedResaleCents);
  const p25 = Math.round(p10 + (p50 - p10) * 0.5);
  const p75 = Math.round(p50 + (p90 - p50) * 0.5);

  return { p10, p25, p50, p75, p90 };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

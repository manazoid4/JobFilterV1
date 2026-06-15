import type { ClassificationResult } from "./classify";
import type { ValuationResult } from "./valuation";
import type { RiskResult } from "./risk";

const DEAL_SCORE_MODEL_VERSION = "dealscore-v1";

/**
 * Minimal shape of CategoryStats needed for scoring. Matches a subset of
 * the Prisma CategoryStats model.
 */
export type CategoryStatsInput = {
  avgResaleCents: number;
  avgTimeToSellDays: number;
  avgRoiPercent: number;
  sampleSize: number;
} | null;

export type DealScoreResult = {
  score: number; // 0-100 composite
  arbitrageGap: number;
  demandStrength: number;
  resaleVelocity: number;
  competitionDensity: number;
  listingQuality: number;
  sellerUrgencySignal: number;
  categoryPerformance: number;
  breakdown: Record<string, unknown>;
  modelVersion: string;
};

/**
 * Pure function (no LLM calls) that computes the composite DealScore for a
 * listing from its classification, valuation, risk assessment, and
 * category-level market stats.
 *
 * Weighting (sum = 1.0) applied to the 0-100 sub-scores to produce the
 * final composite `score`:
 *   - arbitrageGap (normalized 0-100):     30%  — biggest driver of profit potential
 *   - demandStrength:                      20%  — how fast similar items sell historically
 *   - resaleVelocity:                      15%  — inverse of expected time-to-sell
 *   - listingQuality:                      15%  — quality/completeness of listing info, penalized by risk
 *   - sellerUrgencySignal:                 10%  — likelihood seller will accept a low offer
 *   - categoryPerformance:                 10%  — historical ROI performance of the category
 *
 * `competitionDensity` is tracked and stored but not directly weighted into
 * the composite score in this v1 model (reserved for future use once
 * competitor-listing counts are available); it currently defaults to a
 * neutral midpoint value.
 */
export function computeDealScore(
  listing: { priceCents: number; description?: string | null; imageUrls?: string[] },
  analysis: ClassificationResult,
  profit: ValuationResult,
  risk: RiskResult,
  categoryStats: CategoryStatsInput
): DealScoreResult {
  // --- Arbitrage gap: (expectedResale - price) / price, clamped to [0, 100] scale ---
  const rawArbitrageGap =
    listing.priceCents > 0
      ? (profit.expectedResaleCents - listing.priceCents) / listing.priceCents
      : 0;
  const arbitrageGap = rawArbitrageGap; // stored as raw ratio (Float in schema)
  // Normalize for scoring: a 100% markup (gap == 1.0) maps to 100 points.
  const arbitrageGapScore = clamp(rawArbitrageGap * 100, 0, 100);

  // --- Demand strength: derived from category sample size and ROI ---
  // More historical samples + higher ROI => stronger demand signal.
  const demandStrength = categoryStats
    ? clamp(
        Math.round(
          clamp(categoryStats.sampleSize / 2, 0, 50) + // up to 50 pts from sample size
            clamp(categoryStats.avgRoiPercent, 0, 50) // up to 50 pts from category ROI
        ),
        0,
        100
      )
    : 50; // neutral default when no category stats exist yet

  // --- Resale velocity: inverse of avg time-to-sell (faster sell = higher score) ---
  const resaleVelocity = categoryStats
    ? clamp(Math.round(100 - categoryStats.avgTimeToSellDays * 3), 0, 100)
    : clamp(Math.round(100 - profit.confidence * 0 - 30), 0, 100); // neutral-ish default (~70)

  // --- Competition density: reserved for future use (no data source yet) ---
  const competitionDensity = 50; // neutral midpoint placeholder

  // --- Listing quality: based on description length, image count, penalized by risk flags ---
  const descLength = (listing.description ?? "").trim().length;
  const imageCount = listing.imageUrls?.length ?? 0;
  let listingQuality =
    clamp(descLength, 0, 200) / 2 + // up to 100 pts from description length (200+ chars = full)
    clamp(imageCount * 10, 0, 50); // up to 50 pts from image count (5+ images = full)
  listingQuality = clamp(listingQuality - risk.flags.length * 10, 0, 100);
  listingQuality = clamp(listingQuality / 1.5, 0, 100); // rescale combined max (~150) to 0-100

  // --- Seller urgency signal: inferred from risk flags / low price relative to resale value ---
  // A seller pricing well below market (high arbitrage gap) often signals urgency to sell.
  const sellerUrgencySignal = clamp(Math.round(arbitrageGapScore * 0.6), 0, 100);

  // --- Category performance: directly from CategoryStats avgRoiPercent ---
  const categoryPerformance = categoryStats
    ? clamp(Math.round(categoryStats.avgRoiPercent), 0, 100)
    : 50; // neutral default

  // --- Composite score (weights documented above) ---
  const score = clamp(
    Math.round(
      arbitrageGapScore * 0.3 +
        demandStrength * 0.2 +
        resaleVelocity * 0.15 +
        listingQuality * 0.15 +
        sellerUrgencySignal * 0.1 +
        categoryPerformance * 0.1
    ),
    0,
    100
  );

  // --- Risk penalty: high/critical risk caps the final score ---
  let finalScore = score;
  if (risk.riskLevel === "CRITICAL") {
    finalScore = Math.min(finalScore, 20);
  } else if (risk.riskLevel === "HIGH") {
    finalScore = Math.min(finalScore, 50);
  }

  return {
    score: finalScore,
    arbitrageGap,
    demandStrength,
    resaleVelocity,
    competitionDensity,
    listingQuality: Math.round(listingQuality),
    sellerUrgencySignal,
    categoryPerformance,
    breakdown: {
      arbitrageGapScore,
      demandStrength,
      resaleVelocity,
      competitionDensity,
      listingQuality: Math.round(listingQuality),
      sellerUrgencySignal,
      categoryPerformance,
      preRiskScore: score,
      riskLevel: risk.riskLevel,
      riskFlags: risk.flags,
      weights: {
        arbitrageGap: 0.3,
        demandStrength: 0.2,
        resaleVelocity: 0.15,
        listingQuality: 0.15,
        sellerUrgencySignal: 0.1,
        categoryPerformance: 0.1,
      },
    },
    modelVersion: DEAL_SCORE_MODEL_VERSION,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

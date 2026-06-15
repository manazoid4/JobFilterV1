import { AlertChannel, NotificationStatus, type Prisma } from "@prisma/client";
import { prisma } from "../db";
import type { NormalizedListing } from "../scrapers/types";
import { classifyListing } from "./classify";
import { estimateValuation } from "./valuation";
import { assessRisk } from "./risk";
import { computeDealScore, type CategoryStatsInput } from "./dealscore";
import { calculateProfitEstimate } from "../profit-engine";

const AI_MODEL = "gpt-4o-mini";
const PROMPT_VERSION = "v1";

/** Listings scoring at or above this threshold are surfaced as FlipOpportunities. */
const FLIP_OPPORTUNITY_THRESHOLD = 60;

/**
 * Runs the full 9-step AI ingestion pipeline for a single raw/normalized
 * listing:
 *
 *  1. ingest listing          - upsert into `Listing`
 *  2. normalize structure      - (done by caller via NormalizedListing)
 *  3. classify category        - `classifyListing`
 *  4. extract features         - derived condition/urgency/intent scores
 *  5. compute valuation range   - `estimateValuation`
 *  6. run risk model            - `assessRisk`
 *  7. generate deal score       - `computeDealScore`
 *  8. store opportunity         - `FlipOpportunity` if score >= threshold
 *  9. optionally notify user    - queue `NotificationLog` rows for matching AlertRules
 */
export async function runIngestionPipeline(raw: NormalizedListing) {
  // --- Step 1 & 2: ingest + normalize (upsert) ---
  const listing = await prisma.listing.upsert({
    where: { platform_externalId: { platform: raw.platform, externalId: raw.externalId } },
    create: {
      platform: raw.platform,
      externalId: raw.externalId,
      url: raw.url,
      title: raw.title,
      description: raw.description,
      priceCents: raw.priceCents,
      currency: raw.currency,
      location: raw.location,
      imageUrls: raw.imageUrls,
      postedAt: raw.postedAt,
      rawPayload: raw.rawPayload as Prisma.InputJsonValue,
    },
    update: {
      title: raw.title,
      description: raw.description,
      priceCents: raw.priceCents,
      location: raw.location,
      imageUrls: raw.imageUrls,
      rawPayload: raw.rawPayload as Prisma.InputJsonValue,
      scrapedAt: new Date(),
    },
  });

  // --- Step 3: classify category ---
  const classification = await classifyListing(listing);

  // --- Step 5: valuation range ---
  const valuation = await estimateValuation(listing, classification);

  // --- Step 6: risk model ---
  const risk = await assessRisk(listing, classification);

  // --- Category stats lookup (used by deal score + profit engine) ---
  const categoryStats = await lookupCategoryStats(classification.category, classification.subcategory);

  // --- Step 7: deal score ---
  const dealScoreResult = computeDealScore(listing, classification, valuation, risk, categoryStats);

  // --- Step 4: extract features (derived scores stored on ListingAnalysis) ---
  const conditionScore = clamp(Math.round(100 - risk.riskScore * 0.6), 0, 100);
  const urgencyScore = dealScoreResult.sellerUrgencySignal;
  const sellerIntentScore = clamp(Math.round((urgencyScore + dealScoreResult.arbitrageGap * 50) / 2), 0, 100);
  const undervaluationProb = clamp(dealScoreResult.arbitrageGap, 0, 1);

  await prisma.listingAnalysis.upsert({
    where: { listingId: listing.id },
    create: {
      listingId: listing.id,
      category: classification.category,
      subcategory: classification.subcategory,
      brand: classification.brand,
      model: classification.model,
      conditionScore,
      urgencyScore,
      sellerIntentScore,
      undervaluationProb,
      riskScore: risk.riskScore,
      identifiedAttributes: { riskLevel: risk.riskLevel, riskFlags: risk.flags } as Prisma.InputJsonValue,
      aiModel: AI_MODEL,
      promptVersion: PROMPT_VERSION,
      rawResponse: { classification, valuation, risk } as unknown as Prisma.InputJsonValue,
    },
    update: {
      category: classification.category,
      subcategory: classification.subcategory,
      brand: classification.brand,
      model: classification.model,
      conditionScore,
      urgencyScore,
      sellerIntentScore,
      undervaluationProb,
      riskScore: risk.riskScore,
      identifiedAttributes: { riskLevel: risk.riskLevel, riskFlags: risk.flags } as Prisma.InputJsonValue,
      rawResponse: { classification, valuation, risk } as unknown as Prisma.InputJsonValue,
    },
  });

  // --- Profit estimate ---
  const profit = calculateProfitEstimate(listing, classification, valuation, categoryStats);

  await prisma.profitEstimate.upsert({
    where: { listingId: listing.id },
    create: { listingId: listing.id, ...profit },
    update: { ...profit },
  });

  // --- Persist deal score ---
  await prisma.dealScore.upsert({
    where: { listingId: listing.id },
    create: {
      listingId: listing.id,
      score: dealScoreResult.score,
      arbitrageGap: dealScoreResult.arbitrageGap,
      demandStrength: dealScoreResult.demandStrength,
      resaleVelocity: dealScoreResult.resaleVelocity,
      competitionDensity: dealScoreResult.competitionDensity,
      listingQuality: dealScoreResult.listingQuality,
      sellerUrgencySignal: dealScoreResult.sellerUrgencySignal,
      categoryPerformance: dealScoreResult.categoryPerformance,
      breakdown: dealScoreResult.breakdown as Prisma.InputJsonValue,
      modelVersion: dealScoreResult.modelVersion,
    },
    update: {
      score: dealScoreResult.score,
      arbitrageGap: dealScoreResult.arbitrageGap,
      demandStrength: dealScoreResult.demandStrength,
      resaleVelocity: dealScoreResult.resaleVelocity,
      competitionDensity: dealScoreResult.competitionDensity,
      listingQuality: dealScoreResult.listingQuality,
      sellerUrgencySignal: dealScoreResult.sellerUrgencySignal,
      categoryPerformance: dealScoreResult.categoryPerformance,
      breakdown: dealScoreResult.breakdown as Prisma.InputJsonValue,
      modelVersion: dealScoreResult.modelVersion,
    },
  });

  await prisma.listing.update({ where: { id: listing.id }, data: { status: "ANALYZED" } });

  // --- Step 8: store opportunity ---
  let flipOpportunityId: string | null = null;
  if (dealScoreResult.score >= FLIP_OPPORTUNITY_THRESHOLD) {
    const reasonTags: string[] = [];
    if (dealScoreResult.arbitrageGap > 0.5) reasonTags.push("underpriced_cluster");
    if (undervaluationProb > 0.6) reasonTags.push("hidden_value");
    if (classification.category === "General") reasonTags.push("miscategorised");

    const flip = await prisma.flipOpportunity.upsert({
      where: { listingId: listing.id },
      create: { listingId: listing.id, reasonTags },
      update: { reasonTags },
    });
    flipOpportunityId = flip.id;

    // --- Step 9: notify matching AlertRules ---
    await queueAlerts(flip.id, listing.id, dealScoreResult.score, classification.category);
  }

  return { listing, classification, valuation, risk, dealScore: dealScoreResult, profit, flipOpportunityId };
}

async function lookupCategoryStats(category: string, subcategory?: string): Promise<CategoryStatsInput> {
  const stats = await prisma.categoryStats.findFirst({
    where: { category, subcategory: subcategory ?? null },
    orderBy: { windowEnd: "desc" },
  });

  if (!stats) return null;

  return {
    avgResaleCents: stats.avgResaleCents,
    avgTimeToSellDays: stats.avgTimeToSellDays,
    avgRoiPercent: stats.avgRoiPercent,
    sampleSize: stats.sampleSize,
  };
}

/** Queues NotificationLog rows for every active AlertRule whose filters match this opportunity. */
async function queueAlerts(flipOpportunityId: string, listingId: string, score: number, category: string) {
  const rules = await prisma.alertRule.findMany({ where: { isActive: true } });

  for (const rule of rules) {
    const filters = rule.filters as { category?: string; minScore?: number };
    if (filters.minScore !== undefined && score < filters.minScore) continue;
    if (filters.category && filters.category !== category) continue;

    for (const channel of rule.channels as AlertChannel[]) {
      await prisma.notificationLog.create({
        data: {
          userId: rule.userId,
          alertRuleId: rule.id,
          channel,
          status: NotificationStatus.PENDING,
          payload: {
            message: `New FlipSignal opportunity in ${category}: score ${score}/100`,
            flipOpportunityId,
            listingId,
          } as Prisma.InputJsonValue,
        },
      });
    }
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

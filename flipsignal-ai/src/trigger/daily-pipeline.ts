import { schedules } from "@trigger.dev/sdk/v3";
import type { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { exportDailyReportToMarkdown, exportFlipToMarkdown } from "@/lib/obsidian/export";
import { dispatchAlert } from "@/lib/notifications/dispatch";

const TOP_FLIPS_COUNT = 10;
const STATS_WINDOW_DAYS = 30;

/**
 * Full daily roll-up flow, invoked by both the Trigger.dev scheduled task
 * (06:00 UTC) and the `/api/cron/daily-pipeline` Vercel Cron route:
 *
 *  1. Recompute CategoryStats from recently sold PortfolioItems.
 *  2. Detect MarketSignals (price anomalies, demand spikes).
 *  3. Generate a global DailyReport (top flips, emerging categories,
 *     anomalies, hotspots, risk warnings).
 *  4. Export the report (and top flips) to Obsidian, if configured.
 *  5. Dispatch any PENDING NotificationLog entries.
 */
export async function runDailyPipeline(db: PrismaClient = prisma) {
  await recomputeCategoryStats(db);
  const signals = await detectMarketSignals(db);
  const report = await generateDailyReport(db, signals);
  await exportToObsidian(report);
  const dispatched = await dispatchPendingAlerts(db);

  return { reportId: report.id, signals: signals.length, dispatched };
}

async function recomputeCategoryStats(db: PrismaClient) {
  const windowEnd = new Date();
  const windowStart = new Date(windowEnd.getTime() - STATS_WINDOW_DAYS * 24 * 60 * 60 * 1000);

  const soldItems = await db.portfolioItem.findMany({
    where: { stage: "SOLD", updatedAt: { gte: windowStart } },
    include: { listing: { include: { analysis: true } } },
  });

  const groups = new Map<string, { category: string; subcategory: string | null; items: typeof soldItems }>();
  for (const item of soldItems) {
    const category = item.listing.analysis?.category ?? "General";
    const subcategory = item.listing.analysis?.subcategory ?? null;
    const key = `${category}::${subcategory ?? ""}`;
    const group = groups.get(key) ?? { category, subcategory, items: [] };
    group.items.push(item);
    groups.set(key, group);
  }

  for (const group of groups.values()) {
    const sampleSize = group.items.length;
    if (sampleSize === 0) continue;

    const avgResaleCents = avg(group.items.map((i) => i.soldPriceCents ?? 0));
    const avgRoiPercent = avg(
      group.items.map((i) =>
        i.purchasePriceCents ? (((i.soldPriceCents ?? 0) - i.purchasePriceCents) / i.purchasePriceCents) * 100 : 0
      )
    );
    const avgTimeToSellDays = avg(
      group.items.map((i) => (i.updatedAt.getTime() - i.createdAt.getTime()) / (1000 * 60 * 60 * 24))
    );

    await db.categoryStats.upsert({
      where: {
        category_subcategory_region_windowStart_windowEnd: {
          category: group.category,
          subcategory: group.subcategory ?? "",
          region: "UK",
          windowStart,
          windowEnd,
        },
      },
      create: {
        category: group.category,
        subcategory: group.subcategory ?? "",
        region: "UK",
        avgResaleCents: Math.round(avgResaleCents),
        avgRoiPercent,
        avgTimeToSellDays,
        sampleSize,
        windowStart,
        windowEnd,
      },
      update: {
        avgResaleCents: Math.round(avgResaleCents),
        avgRoiPercent,
        avgTimeToSellDays,
        sampleSize,
      },
    });
  }
}

async function detectMarketSignals(db: PrismaClient) {
  // Price anomaly: listings priced > 50% below the category's expected resale value.
  const recentListings = await db.listing.findMany({
    where: { scrapedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
    include: { analysis: true, profitEstimate: true },
  });

  const signals = [];
  for (const listing of recentListings) {
    if (!listing.profitEstimate || !listing.analysis) continue;
    const discount = (listing.profitEstimate.expectedResaleCents - listing.priceCents) / listing.profitEstimate.expectedResaleCents;
    if (discount > 0.5) {
      const signal = await db.marketSignal.create({
        data: {
          category: listing.analysis.category,
          signalType: "price_anomaly",
          region: listing.location,
          confidence: Math.min(1, discount),
          payload: { listingId: listing.id, discount } as Prisma.InputJsonValue,
        },
      });
      signals.push(signal);
    }
  }

  return signals;
}

async function generateDailyReport(db: PrismaClient, signals: Awaited<ReturnType<typeof detectMarketSignals>>) {
  const reportDate = new Date();
  reportDate.setUTCHours(0, 0, 0, 0);

  const topFlips = await db.flipOpportunity.findMany({
    take: TOP_FLIPS_COUNT,
    orderBy: [{ rank: "asc" }, { surfacedAt: "desc" }],
    include: { listing: { include: { analysis: true, dealScore: true, profitEstimate: true } } },
  });

  const emergingCategories = await db.categoryStats.findMany({
    orderBy: { avgRoiPercent: "desc" },
    take: 5,
  });

  const riskWarnings = await db.listingAnalysis.findMany({
    where: { riskScore: { gte: 60 } },
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const reportData = {
    topFlips: topFlips as unknown as Prisma.InputJsonValue,
    emergingCategories: emergingCategories as unknown as Prisma.InputJsonValue,
    priceAnomalies: signals as unknown as Prisma.InputJsonValue,
    riskWarnings: riskWarnings as unknown as Prisma.InputJsonValue,
  };

  const existing = await db.dailyReport.findFirst({ where: { userId: null, reportDate } });
  const report = existing
    ? await db.dailyReport.update({ where: { id: existing.id }, data: reportData })
    : await db.dailyReport.create({
        data: { userId: null, reportDate, localHotspots: [] as unknown as Prisma.InputJsonValue, ...reportData },
      });

  return { ...report, _topFlips: topFlips };
}

async function exportToObsidian(report: Awaited<ReturnType<typeof generateDailyReport>>) {
  if (!process.env.OBSIDIAN_VAULT_PATH) return;

  await exportDailyReportToMarkdown(report);

  for (const flip of report._topFlips) {
    await exportFlipToMarkdown({
      flip,
      listing: flip.listing,
      analysis: flip.listing.analysis,
      profit: flip.listing.profitEstimate,
      dealScore: flip.listing.dealScore,
    });
  }
}

async function dispatchPendingAlerts(db: PrismaClient) {
  const pending = await db.notificationLog.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    take: 100,
  });

  for (const notification of pending) {
    await dispatchAlert(notification, notification.user);
  }

  return pending.length;
}

function avg(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

// Wraps `runDailyPipeline` as a Trigger.dev scheduled task (06:00 UTC daily).
export const dailyPipelineTask = schedules.task({
  id: "daily-pipeline",
  cron: "0 6 * * *",
  run: async () => runDailyPipeline(prisma),
});

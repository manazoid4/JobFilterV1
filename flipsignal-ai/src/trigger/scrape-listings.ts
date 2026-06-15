import { schedules, batch } from "@trigger.dev/sdk/v3";
import { prisma } from "@/lib/db";
import { SourcePlatform } from "@prisma/client";
import { facebookAdapter } from "@/lib/scrapers/facebook";
import { ebayAdapter } from "@/lib/scrapers/ebay";
import { gumtreeAdapter } from "@/lib/scrapers/gumtree";
import { deduplicateListings } from "@/lib/scrapers/dedupe";
import { ingestionPipelineTask } from "./ingestion-pipeline";
import type { PlatformAdapter } from "@/lib/scrapers/types";

const ADAPTERS: Record<SourcePlatform, PlatformAdapter> = {
  [SourcePlatform.FACEBOOK_MARKETPLACE]: facebookAdapter,
  [SourcePlatform.EBAY]: ebayAdapter,
  [SourcePlatform.GUMTREE]: gumtreeAdapter,
  // Craigslist is an optional future expansion - falls back to the
  // Gumtree adapter's mock shape until a dedicated adapter is built.
  [SourcePlatform.CRAIGSLIST]: gumtreeAdapter,
};

/**
 * Scheduled task (every 30 minutes): runs every active ScraperSource through
 * its platform adapter, deduplicates results, and fans out one
 * `ingestionPipelineTask` run per unique listing.
 */
export const scrapeListingsTask = schedules.task({
  id: "scrape-listings",
  cron: "*/30 * * * *",
  run: async () => {
    const sources = await prisma.scraperSource.findMany({ where: { isActive: true } });

    const allListings = [];
    for (const source of sources) {
      const adapter = ADAPTERS[source.platform];
      const results = await adapter.search({
        query: source.searchQuery,
        region: source.region,
        category: source.category,
      });
      allListings.push(...results);

      await prisma.scraperSource.update({ where: { id: source.id }, data: { lastRunAt: new Date() } });
    }

    const deduped = deduplicateListings(allListings);

    if (deduped.length > 0) {
      await batch.trigger(deduped.map((listing) => ({ id: ingestionPipelineTask.id, payload: listing })));
    }

    return { scraped: allListings.length, deduped: deduped.length };
  },
});

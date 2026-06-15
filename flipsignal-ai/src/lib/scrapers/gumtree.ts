import { SourcePlatform } from "@prisma/client";
import type { NormalizedListing, PlatformAdapter, SearchParams } from "./types";
import { RateLimiter } from "./rate-limiter";

// Gumtree (UK) has no official public API; a real implementation would use
// an HTML scraper (cheerio/Playwright) against search result pages, rotating
// user agents and respecting robots.txt.
const limiter = new RateLimiter(5, 0.5); // burst of 5, refill 1 every 2s

export const gumtreeAdapter: PlatformAdapter = {
  platform: SourcePlatform.GUMTREE,

  /**
   * TODO: implement real HTML scraping of Gumtree search results.
   * Gumtree is the primary "UK arbitrage edge" source - undervalued local
   * listings that haven't been cross-posted to Facebook/eBay yet.
   * Returns mock listings for now.
   */
  async search(params: SearchParams): Promise<NormalizedListing[]> {
    await limiter.acquire();

    return [
      {
        platform: SourcePlatform.GUMTREE,
        externalId: `gumtree-mock-${Buffer.from(params.query).toString("hex").slice(0, 8)}`,
        url: "https://www.gumtree.com/p/mock",
        title: `${params.query} - quick sale needed`,
        description: `Need this gone by the weekend. ${params.query} in working order, located in ${params.region}.`,
        priceCents: 3000,
        currency: "GBP",
        location: params.region,
        imageUrls: [],
        postedAt: new Date(),
        rawPayload: { mock: true, query: params.query },
      },
    ];
  },

  normalize(raw: Record<string, unknown>): NormalizedListing {
    return {
      platform: SourcePlatform.GUMTREE,
      externalId: String(raw.id ?? raw.adId ?? ""),
      url: String(raw.url ?? ""),
      title: String(raw.title ?? ""),
      description: (raw.description as string) ?? null,
      priceCents: toCents(raw.price),
      currency: "GBP",
      location: (raw.location as string) ?? null,
      imageUrls: Array.isArray(raw.imageUrls) ? (raw.imageUrls as string[]) : [],
      postedAt: raw.datePosted ? new Date(String(raw.datePosted)) : null,
      rawPayload: raw,
    };
  },
};

function toCents(price: unknown): number {
  if (typeof price === "number") return Math.round(price * 100);
  if (typeof price === "string") {
    const numeric = Number(price.replace(/[^0-9.]/g, ""));
    return Number.isFinite(numeric) ? Math.round(numeric * 100) : 0;
  }
  return 0;
}

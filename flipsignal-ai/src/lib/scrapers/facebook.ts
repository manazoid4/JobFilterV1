import { SourcePlatform } from "@prisma/client";
import type { NormalizedListing, PlatformAdapter, SearchParams } from "./types";
import { RateLimiter } from "./rate-limiter";

// Facebook Marketplace has no public API; real implementations typically use
// a headless browser (Playwright) with a logged-in session and residential
// proxies, respecting robots.txt and FB's terms of service.
const limiter = new RateLimiter(5, 0.5); // burst of 5, refill 1 every 2s

export const facebookAdapter: PlatformAdapter = {
  platform: SourcePlatform.FACEBOOK_MARKETPLACE,

  /**
   * TODO: implement real scraping. Options:
   *  - Playwright session against marketplace search results pages
   *  - Third-party Marketplace data provider API
   * Must respect `limiter` before each request and handle pagination.
   * For now, returns mock listings so the ingestion pipeline can be
   * exercised end-to-end without live scraping.
   */
  async search(params: SearchParams): Promise<NormalizedListing[]> {
    await limiter.acquire();

    return [
      {
        platform: SourcePlatform.FACEBOOK_MARKETPLACE,
        externalId: `fb-mock-${Buffer.from(params.query).toString("hex").slice(0, 8)}`,
        url: "https://www.facebook.com/marketplace/item/mock",
        title: `${params.query} - good condition`,
        description: `Selling my ${params.query}. Some signs of use but works great. Collection only from ${params.region}.`,
        priceCents: 4500,
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
      platform: SourcePlatform.FACEBOOK_MARKETPLACE,
      externalId: String(raw.id ?? raw.externalId ?? ""),
      url: String(raw.url ?? ""),
      title: String(raw.title ?? raw.marketplace_listing_title ?? ""),
      description: (raw.description as string) ?? null,
      priceCents: toCents(raw.price ?? raw.listing_price),
      currency: String((raw.currency as string) ?? "GBP"),
      location: (raw.location as string) ?? (raw.location_text as string) ?? null,
      imageUrls: Array.isArray(raw.imageUrls) ? (raw.imageUrls as string[]) : [],
      postedAt: raw.creation_time ? new Date(Number(raw.creation_time) * 1000) : null,
      rawPayload: raw,
    };
  },
};

function toCents(price: unknown): number {
  if (typeof price === "number") return Math.round(price * 100);
  if (typeof price === "object" && price !== null && "amount" in (price as Record<string, unknown>)) {
    return Math.round(Number((price as Record<string, unknown>).amount) * 100);
  }
  return 0;
}

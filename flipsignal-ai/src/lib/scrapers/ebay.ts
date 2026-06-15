import { SourcePlatform } from "@prisma/client";
import type { NormalizedListing, PlatformAdapter, SearchParams } from "./types";
import { RateLimiter } from "./rate-limiter";

// eBay has an official Browse API (https://developer.ebay.com/api-docs/buy/browse/overview.html)
// which should be used here once EBAY_CLIENT_ID / EBAY_CLIENT_SECRET are configured.
const limiter = new RateLimiter(10, 2); // burst of 10, refill 2/s (within eBay's published limits)

export const ebayAdapter: PlatformAdapter = {
  platform: SourcePlatform.EBAY,

  /**
   * TODO: implement real integration via eBay Browse API
   * (GET /buy/browse/v1/item_summary/search?q={query}).
   * Used primarily for resale-price validation/anchoring rather than
   * sourcing - i.e. checking what similar items actually sell for.
   * Returns mock "sold" comparables for now.
   */
  async search(params: SearchParams): Promise<NormalizedListing[]> {
    await limiter.acquire();

    return [
      {
        platform: SourcePlatform.EBAY,
        externalId: `ebay-mock-${Buffer.from(params.query).toString("hex").slice(0, 8)}`,
        url: "https://www.ebay.co.uk/itm/mock",
        title: `${params.query} - sold comparable`,
        description: null,
        priceCents: 9000,
        currency: "GBP",
        location: params.region,
        imageUrls: [],
        postedAt: new Date(),
        rawPayload: { mock: true, query: params.query, soldComparable: true },
      },
    ];
  },

  normalize(raw: Record<string, unknown>): NormalizedListing {
    const price = raw.price as { value?: string; currency?: string } | undefined;

    return {
      platform: SourcePlatform.EBAY,
      externalId: String(raw.itemId ?? raw.legacyItemId ?? ""),
      url: String(raw.itemWebUrl ?? ""),
      title: String(raw.title ?? ""),
      description: (raw.shortDescription as string) ?? null,
      priceCents: price?.value ? Math.round(Number(price.value) * 100) : 0,
      currency: price?.currency ?? "GBP",
      location: (raw.itemLocation as { country?: string })?.country ?? null,
      imageUrls: raw.image ? [String((raw.image as { imageUrl?: string }).imageUrl)] : [],
      postedAt: raw.itemCreationDate ? new Date(String(raw.itemCreationDate)) : null,
      rawPayload: raw,
    };
  },
};

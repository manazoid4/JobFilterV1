import type { SourcePlatform } from "@prisma/client";

/** Normalized representation of a marketplace listing, independent of source platform. */
export type NormalizedListing = {
  platform: SourcePlatform;
  externalId: string;
  url: string;
  title: string;
  description?: string | null;
  priceCents: number;
  currency: string;
  location?: string | null;
  imageUrls: string[];
  postedAt?: Date | null;
  rawPayload: Record<string, unknown>;
};

/** Search parameters for a scraper run, derived from a ScraperSource row. */
export type SearchParams = {
  query: string;
  region: string;
  category?: string | null;
};

/**
 * Common interface every marketplace platform adapter must implement.
 * `search` fetches raw results and returns them already normalized;
 * `normalize` is exposed separately so it can be unit tested / reused
 * when raw payloads arrive via other paths (e.g. manual paste in Copilot).
 */
export interface PlatformAdapter {
  platform: SourcePlatform;
  search(params: SearchParams): Promise<NormalizedListing[]>;
  normalize(raw: Record<string, unknown>): NormalizedListing;
}

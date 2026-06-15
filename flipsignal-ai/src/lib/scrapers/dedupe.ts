import type { NormalizedListing } from "./types";

/**
 * Removes duplicate listings from a batch before ingestion.
 *
 * Two-pass approach:
 * 1. Exact dedupe on (platform, externalId) - same listing re-scraped.
 * 2. Fuzzy dedupe on normalized title + price + location - the same item
 *    cross-posted (or re-posted by the seller) with a different external id.
 */
export function deduplicateListings(listings: NormalizedListing[]): NormalizedListing[] {
  const seenExternal = new Set<string>();
  const seenFuzzy = new Set<string>();
  const result: NormalizedListing[] = [];

  for (const listing of listings) {
    const externalKey = `${listing.platform}:${listing.externalId}`;
    if (seenExternal.has(externalKey)) continue;

    const fuzzyKey = buildFuzzyKey(listing);
    if (seenFuzzy.has(fuzzyKey)) continue;

    seenExternal.add(externalKey);
    seenFuzzy.add(fuzzyKey);
    result.push(listing);
  }

  return result;
}

function buildFuzzyKey(listing: NormalizedListing): string {
  const normalizedTitle = listing.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 6) // first few significant words
    .join(" ");

  const location = (listing.location ?? "").toLowerCase().trim();

  return `${normalizedTitle}|${listing.priceCents}|${location}`;
}

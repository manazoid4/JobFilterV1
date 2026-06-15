import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SourcePlatform } from "@prisma/client";
import { runIngestionPipeline } from "@/lib/ai/pipeline";

const normalizedListingSchema = z.object({
  platform: z.nativeEnum(SourcePlatform),
  externalId: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  priceCents: z.number(),
  currency: z.string(),
  location: z.string().nullable().optional(),
  imageUrls: z.array(z.string()),
  postedAt: z.coerce.date().nullable().optional(),
  rawPayload: z.record(z.string(), z.unknown()),
});

const ingestSchema = z.array(normalizedListingSchema);

/**
 * POST /api/listings/ingest
 * Accepts an array of NormalizedListing objects (produced by scraper
 * adapters or Trigger.dev jobs) and runs the full AI ingestion pipeline
 * for each one sequentially.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = ingestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const results = [];
  for (const raw of parsed.data) {
    const result = await runIngestionPipeline({
      ...raw,
      description: raw.description ?? null,
      location: raw.location ?? null,
      postedAt: raw.postedAt ?? null,
    });
    results.push({ listingId: result.listing.id, dealScore: result.dealScore.score, flipOpportunityId: result.flipOpportunityId });
  }

  return NextResponse.json({ ingested: results.length, results });
}

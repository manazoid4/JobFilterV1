import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { runIngestionPipeline } from "@/lib/ai/pipeline";
import type { NormalizedListing } from "@/lib/scrapers/types";
import { Prisma } from "@prisma/client";

/**
 * POST /api/listings/[id]/analyze
 * Re-runs the AI pipeline for an existing listing (e.g. to refresh scores
 * after market conditions change).
 */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  const raw: NormalizedListing = {
    platform: listing.platform,
    externalId: listing.externalId,
    url: listing.url,
    title: listing.title,
    description: listing.description,
    priceCents: listing.priceCents,
    currency: listing.currency,
    location: listing.location,
    imageUrls: listing.imageUrls,
    postedAt: listing.postedAt,
    rawPayload: listing.rawPayload as Prisma.JsonObject,
  };

  const result = await runIngestionPipeline(raw);

  return NextResponse.json({
    listingId: result.listing.id,
    dealScore: result.dealScore.score,
    flipOpportunityId: result.flipOpportunityId,
  });
}

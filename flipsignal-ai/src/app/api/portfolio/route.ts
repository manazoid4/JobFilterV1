import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { FlipStage } from "@prisma/client";

/** GET /api/portfolio - list the current user's portfolio items. */
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ data: [] });

  const items = await prisma.portfolioItem.findMany({
    where: { userId: user.id },
    include: { listing: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ data: items });
}

/**
 * POST /api/portfolio
 * Body: { listingId: string }
 * Adds a listing to the user's portfolio at the DISCOVERED stage and
 * records the initial FlipLifecycle entry.
 */
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const contentType = req.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json") ? await req.json() : Object.fromEntries(await req.formData());
  const listingId = String(data.listingId ?? "");

  if (!listingId) return NextResponse.json({ error: "listingId is required" }, { status: 400 });

  const flip = await prisma.flipOpportunity.findUnique({ where: { listingId } });

  const item = await prisma.portfolioItem.upsert({
    where: { listingId },
    create: {
      userId: user.id,
      listingId,
      flipOpportunityId: flip?.id,
      stage: FlipStage.DISCOVERED,
    },
    update: {},
  });

  await prisma.flipLifecycle.create({
    data: { portfolioItemId: item.id, flipOpportunityId: flip?.id, stage: FlipStage.DISCOVERED },
  });

  return NextResponse.json({ data: item });
}

/**
 * PATCH /api/portfolio
 * Body: { portfolioItemId: string, stage: FlipStage, purchasePriceCents?, listedPriceCents?, soldPriceCents? }
 * Transitions a portfolio item to a new lifecycle stage.
 */
export async function PATCH(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { portfolioItemId, stage, purchasePriceCents, listedPriceCents, soldPriceCents } = body as {
    portfolioItemId: string;
    stage: FlipStage;
    purchasePriceCents?: number;
    listedPriceCents?: number;
    soldPriceCents?: number;
  };

  const profitRealisedCents =
    stage === FlipStage.SOLD && soldPriceCents != null && purchasePriceCents != null
      ? soldPriceCents - purchasePriceCents
      : undefined;

  const item = await prisma.portfolioItem.update({
    where: { id: portfolioItemId },
    data: { stage, purchasePriceCents, listedPriceCents, soldPriceCents, profitRealisedCents },
  });

  await prisma.flipLifecycle.create({
    data: { portfolioItemId: item.id, flipOpportunityId: item.flipOpportunityId, stage },
  });

  return NextResponse.json({ data: item });
}

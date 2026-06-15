import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { PlanTier } from "@prisma/client";
import { FREE_TIER_LIMITS } from "@/lib/plan-gates";

/**
 * GET /api/deals?category=Electronics&minScore=60&region=London&page=1
 * Returns a paginated FlipOpportunity feed. FREE plan users are capped at
 * FREE_TIER_LIMITS.MAX_DEAL_FEED_RESULTS total results regardless of page.
 */
export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();
  const user = clerkId ? await prisma.user.findUnique({ where: { clerkId } }) : null;
  const planTier = user?.planTier ?? PlanTier.FREE;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const minScore = searchParams.get("minScore") ? Number(searchParams.get("minScore")) : undefined;
  const region = searchParams.get("region");
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = 20;

  const isFree = planTier === PlanTier.FREE;
  const take = isFree ? FREE_TIER_LIMITS.MAX_DEAL_FEED_RESULTS : pageSize;
  const skip = isFree ? 0 : (page - 1) * pageSize;

  const opportunities = await prisma.flipOpportunity.findMany({
    where: {
      listing: {
        ...(category ? { analysis: { category } } : {}),
        ...(region ? { location: { contains: region, mode: "insensitive" } } : {}),
        ...(minScore !== undefined ? { dealScore: { score: { gte: minScore } } } : {}),
      },
    },
    take,
    skip,
    orderBy: [{ rank: "asc" }, { surfacedAt: "desc" }],
    include: { listing: { include: { analysis: true, dealScore: true, profitEstimate: true } } },
  });

  return NextResponse.json({ data: opportunities, page: isFree ? 1 : page, limited: isFree });
}

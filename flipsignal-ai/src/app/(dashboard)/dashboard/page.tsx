export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { DealCard } from "@/components/deal-card";
import { FREE_TIER_LIMITS } from "@/lib/plan-gates";
import { PlanTier } from "@prisma/client";

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();
  const user = clerkId ? await prisma.user.findUnique({ where: { clerkId } }) : null;
  const planTier = user?.planTier ?? PlanTier.FREE;

  const take = planTier === PlanTier.FREE ? FREE_TIER_LIMITS.MAX_DEAL_FEED_RESULTS : 50;

  const opportunities = await prisma.flipOpportunity.findMany({
    take,
    orderBy: [{ rank: "asc" }, { surfacedAt: "desc" }],
    include: {
      listing: {
        include: { analysis: true, dealScore: true, profitEstimate: true },
      },
    },
  });

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Deal Feed</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Top flip opportunities ranked by deal score.
        {planTier === PlanTier.FREE && " Upgrade to Pro to unlock the full feed."}
      </p>

      {opportunities.length === 0 ? (
        <p className="text-muted-foreground">
          No opportunities yet. Run the ingestion pipeline or seed the database to populate this feed.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => (
            <DealCard
              key={opp.id}
              data={{
                id: opp.id,
                listing: opp.listing,
                analysis: opp.listing.analysis,
                dealScore: opp.listing.dealScore,
                profit: opp.listing.profitEstimate,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

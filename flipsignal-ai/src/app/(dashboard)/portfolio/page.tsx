export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCents } from "@/lib/utils";
import { FlipStage } from "@prisma/client";

const STAGES: FlipStage[] = [
  FlipStage.DISCOVERED,
  FlipStage.VIEWED,
  FlipStage.SAVED,
  FlipStage.CONTACTED,
  FlipStage.PURCHASED,
  FlipStage.LISTED,
  FlipStage.SOLD,
];

export default async function PortfolioPage() {
  const { userId: clerkId } = await auth();
  const user = clerkId ? await prisma.user.findUnique({ where: { clerkId } }) : null;

  const items = user
    ? await prisma.portfolioItem.findMany({
        where: { userId: user.id },
        include: { listing: true },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Portfolio Tracker</h1>
      <div className="grid gap-4 lg:grid-cols-7">
        {STAGES.map((stage) => (
          <div key={stage}>
            <h2 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">{stage}</h2>
            <div className="space-y-2">
              {items
                .filter((item) => item.stage === stage)
                .map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-sm">{item.listing.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      {item.purchasePriceCents != null && (
                        <p>Bought: {formatCents(item.purchasePriceCents, item.listing.currency)}</p>
                      )}
                      {item.soldPriceCents != null && (
                        <p>Sold: {formatCents(item.soldPriceCents, item.listing.currency)}</p>
                      )}
                      {item.profitRealisedCents != null && (
                        <p>Profit: {formatCents(item.profitRealisedCents, item.listing.currency)}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

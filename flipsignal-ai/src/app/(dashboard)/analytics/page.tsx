export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AnalyticsPage() {
  const [totalListings, totalOpportunities, totalPortfolioItems, soldItems] = await Promise.all([
    prisma.listing.count(),
    prisma.flipOpportunity.count(),
    prisma.portfolioItem.count(),
    prisma.portfolioItem.count({ where: { stage: "SOLD" } }),
  ]);

  const stats = [
    { label: "Listings ingested", value: totalListings },
    { label: "Flip opportunities surfaced", value: totalOpportunities },
    { label: "Portfolio items tracked", value: totalPortfolioItems },
    { label: "Flips sold", value: soldItems },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Analytics</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Detailed funnels and PostHog dashboards are configured via NEXT_PUBLIC_POSTHOG_KEY. This page shows
        a lightweight summary from the database.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{stat.label}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

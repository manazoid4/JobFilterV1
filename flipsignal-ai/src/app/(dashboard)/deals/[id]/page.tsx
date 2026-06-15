export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBadge } from "@/components/score-badge";
import { Button } from "@/components/ui/button";
import { formatCents } from "@/lib/utils";

export default async function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { analysis: true, dealScore: true, profitEstimate: true, flipOpportunity: true },
  });

  if (!listing) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="text-sm text-muted-foreground">
          {listing.platform} &middot; {listing.location ?? "Unknown location"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {listing.dealScore && <ScoreBadge score={listing.dealScore.score} label="Deal score" />}
        {listing.analysis && <ScoreBadge score={listing.analysis.riskScore} label="Risk" />}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>{listing.description ?? "No description provided."}</p>
          <p className="font-semibold">{formatCents(listing.priceCents, listing.currency)}</p>
          <a href={listing.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            View original listing &rarr;
          </a>
        </CardContent>
      </Card>

      {listing.analysis && (
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            <div>Category: {listing.analysis.category}</div>
            <div>Subcategory: {listing.analysis.subcategory ?? "-"}</div>
            <div>Brand: {listing.analysis.brand ?? "-"}</div>
            <div>Condition: {listing.analysis.conditionScore}/100</div>
            <div>Urgency: {listing.analysis.urgencyScore}/100</div>
            <div>Undervaluation: {(listing.analysis.undervaluationProb * 100).toFixed(0)}%</div>
          </CardContent>
        </Card>
      )}

      {listing.profitEstimate && (
        <Card>
          <CardHeader>
            <CardTitle>Profit Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            <div>Expected resale: {formatCents(listing.profitEstimate.expectedResaleCents, listing.currency)}</div>
            <div>Worst case: {formatCents(listing.profitEstimate.worstCaseCents, listing.currency)}</div>
            <div>Best case: {formatCents(listing.profitEstimate.bestCaseCents, listing.currency)}</div>
            <div>Platform fees: {formatCents(listing.profitEstimate.platformFeeCents, listing.currency)}</div>
            <div>Transport cost: {formatCents(listing.profitEstimate.transportCostCents, listing.currency)}</div>
            <div>Refurb cost: {formatCents(listing.profitEstimate.refurbCostCents, listing.currency)}</div>
            <div>Time to sell: {listing.profitEstimate.timeToSellDays} days</div>
            <div>Liquidity: {listing.profitEstimate.liquidityScore}/100</div>
            <div>ROI: {listing.profitEstimate.roiPercent.toFixed(1)}%</div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <form action={`/api/copilot`} method="post">
          <Button type="submit">Send to Copilot</Button>
        </form>
        <form action={`/api/portfolio`} method="post">
          <input type="hidden" name="listingId" value={listing.id} />
          <Button type="submit" variant="outline">Add to Portfolio</Button>
        </form>
      </div>
    </div>
  );
}

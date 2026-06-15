import Link from "next/link";
import type { Listing, ListingAnalysis, DealScore, ProfitEstimate } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBadge } from "@/components/score-badge";
import { formatCents } from "@/lib/utils";

export type DealCardData = {
  id: string;
  listing: Listing;
  analysis: ListingAnalysis | null;
  dealScore: DealScore | null;
  profit: ProfitEstimate | null;
};

export function DealCard({ data }: { data: DealCardData }) {
  const { listing, analysis, dealScore, profit } = data;

  return (
    <Card>
      {listing.imageUrls[0] && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={listing.imageUrls[0]} alt={listing.title} className="h-40 w-full rounded-t-lg object-cover" />
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{listing.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">{formatCents(listing.priceCents, listing.currency)}</span>
          {dealScore && <ScoreBadge score={dealScore.score} label="Score" />}
        </div>
        {analysis && (
          <p className="text-xs text-muted-foreground">
            {analysis.category}
            {analysis.subcategory ? ` / ${analysis.subcategory}` : ""}
          </p>
        )}
        {profit && (
          <p className="text-xs text-muted-foreground">
            Est. resale {formatCents(profit.expectedResaleCents, listing.currency)} · ROI {profit.roiPercent.toFixed(0)}%
          </p>
        )}
        <Link href={`/deals/${listing.id}`} className="inline-block text-sm font-medium text-primary hover:underline">
          View deal &rarr;
        </Link>
      </CardContent>
    </Card>
  );
}

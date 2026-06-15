export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCents } from "@/lib/utils";

export default async function MarketPage() {
  const [categoryStats, signals] = await Promise.all([
    prisma.categoryStats.findMany({ orderBy: { avgRoiPercent: "desc" }, take: 20 }),
    prisma.marketSignal.findMany({ orderBy: { detectedAt: "desc" }, take: 20 }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Market Intelligence</h1>
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryStats.length === 0 ? (
              <p className="text-sm text-muted-foreground">No category stats computed yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2">Category</th>
                    <th>Region</th>
                    <th>Avg resale</th>
                    <th>Avg ROI</th>
                    <th>Avg time to sell</th>
                    <th>Sample size</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryStats.map((stat) => (
                    <tr key={stat.id} className="border-t border-border">
                      <td className="py-2">
                        {stat.category}
                        {stat.subcategory ? ` / ${stat.subcategory}` : ""}
                      </td>
                      <td>{stat.region}</td>
                      <td>{formatCents(stat.avgResaleCents)}</td>
                      <td>{stat.avgRoiPercent.toFixed(1)}%</td>
                      <td>{stat.avgTimeToSellDays.toFixed(1)} days</td>
                      <td>{stat.sampleSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Market Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {signals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No market signals detected yet.</p>
            ) : (
              signals.map((signal) => (
                <div key={signal.id} className="border-t border-border pt-2 text-sm first:border-t-0 first:pt-0">
                  <span className="font-medium">{signal.signalType}</span> &middot; {signal.category}
                  {signal.region ? ` · ${signal.region}` : ""} &middot; confidence{" "}
                  {(signal.confidence * 100).toFixed(0)}%
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

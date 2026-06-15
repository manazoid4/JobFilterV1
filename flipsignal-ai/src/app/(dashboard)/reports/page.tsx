export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ReportsPage() {
  const report = await prisma.dailyReport.findFirst({
    where: { userId: null },
    orderBy: { reportDate: "desc" },
  });

  if (!report) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">Daily Report</h1>
        <p className="text-sm text-muted-foreground">No reports generated yet. The daily pipeline runs at 06:00.</p>
      </div>
    );
  }

  const sections: Array<{ title: string; data: unknown }> = [
    { title: "Top 10 Flips", data: report.topFlips },
    { title: "Emerging Categories", data: report.emergingCategories },
    { title: "Price Anomalies", data: report.priceAnomalies },
    { title: "Local Hotspots", data: report.localHotspots },
    { title: "Risk Warnings", data: report.riskWarnings },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Daily Report — {report.reportDate.toISOString().slice(0, 10)}</h1>
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto text-xs text-muted-foreground">{JSON.stringify(section.data, null, 2)}</pre>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

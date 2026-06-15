export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertChannel } from "@prisma/client";

export default async function AlertsPage() {
  const { userId: clerkId } = await auth();
  const user = clerkId ? await prisma.user.findUnique({ where: { clerkId } }) : null;

  const rules = user
    ? await prisma.alertRule.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } })
    : [];

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Alert Rules</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create alert rule</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="/api/alerts" method="post" className="space-y-3">
            <Input name="name" placeholder="Rule name (e.g. Electronics over 70)" required />
            <Input name="category" placeholder="Category filter (optional)" />
            <Input name="minScore" type="number" min={0} max={100} placeholder="Minimum deal score" />
            <select name="channel" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
              {Object.values(AlertChannel).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Button type="submit">Create rule</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {rules.length === 0 ? (
          <p className="text-sm text-muted-foreground">No alert rules yet.</p>
        ) : (
          rules.map((rule) => (
            <Card key={rule.id}>
              <CardContent className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium">{rule.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Channels: {rule.channels.join(", ")} &middot; {rule.isActive ? "Active" : "Paused"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

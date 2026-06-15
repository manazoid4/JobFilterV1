export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanTier } from "@prisma/client";

export default async function BillingPage() {
  const { userId: clerkId } = await auth();
  const user = clerkId ? await prisma.user.findUnique({ where: { clerkId }, include: { subscription: true } }) : null;

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Billing</h1>

      <Card>
        <CardHeader>
          <CardTitle>Current plan: {user?.planTier ?? PlanTier.FREE}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {user?.subscription?.currentPeriodEnd && (
            <p className="text-sm text-muted-foreground">
              Renews: {user.subscription.currentPeriodEnd.toISOString().slice(0, 10)}
            </p>
          )}
          <div className="flex gap-3">
            <form action="/api/billing/checkout" method="post">
              <input type="hidden" name="plan" value={PlanTier.PRO} />
              <Button type="submit">Upgrade to Pro</Button>
            </form>
            <form action="/api/billing/checkout" method="post">
              <input type="hidden" name="plan" value={PlanTier.ELITE} />
              <Button type="submit" variant="outline">Upgrade to Elite</Button>
            </form>
          </div>
          {user?.subscription?.stripeCustomerId && (
            <form action="/api/billing/portal" method="post">
              <Button type="submit" variant="ghost">Manage billing</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

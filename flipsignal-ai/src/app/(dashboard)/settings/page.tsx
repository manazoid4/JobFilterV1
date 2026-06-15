export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const { userId: clerkId } = await auth();
  const user = clerkId ? await prisma.user.findUnique({ where: { clerkId } }) : null;

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Email: {user?.email ?? "-"}</p>
          <p>Plan: {user?.planTier ?? "FREE"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification channels</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="/api/settings" method="post" className="space-y-3">
            <Input name="telegramChatId" placeholder="Telegram chat ID" defaultValue={user?.telegramChatId ?? ""} />
            <Input
              name="discordWebhookUrl"
              placeholder="Discord webhook URL"
              defaultValue={user?.discordWebhookUrl ?? ""}
            />
            <Button type="submit">Save</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

/**
 * POST /api/settings
 * Body (form): { telegramChatId?, discordWebhookUrl? }
 * Updates notification channel settings for the current user, then
 * redirects back to /settings.
 */
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const telegramChatId = form.get("telegramChatId");
  const discordWebhookUrl = form.get("discordWebhookUrl");

  await prisma.user.update({
    where: { clerkId },
    data: {
      telegramChatId: telegramChatId ? String(telegramChatId) : null,
      discordWebhookUrl: discordWebhookUrl ? String(discordWebhookUrl) : null,
    },
  });

  return NextResponse.redirect(new URL("/settings", req.url));
}

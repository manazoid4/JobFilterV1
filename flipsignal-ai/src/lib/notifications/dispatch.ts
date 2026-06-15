import { AlertChannel, NotificationStatus, type NotificationLog, type User } from "@prisma/client";
import { prisma } from "../db";
import { sendTelegramAlert } from "./telegram";
import { sendDiscordAlert } from "./discord";

/**
 * Sends a single pending NotificationLog entry via its configured channel
 * and updates its status to SENT or FAILED accordingly.
 *
 * EMAIL and IN_APP channels are recorded but not yet delivered - EMAIL would
 * route through Resend/Postmark, IN_APP is read directly from this table by
 * the dashboard UI.
 */
export async function dispatchAlert(
  notification: NotificationLog,
  user: Pick<User, "telegramChatId" | "discordWebhookUrl" | "email">
): Promise<void> {
  const message = formatMessage(notification.payload as Record<string, unknown>);

  try {
    switch (notification.channel) {
      case AlertChannel.TELEGRAM:
        if (!user.telegramChatId) throw new Error("User has no telegramChatId configured");
        await sendTelegramAlert(user.telegramChatId, message);
        break;

      case AlertChannel.DISCORD:
        if (!user.discordWebhookUrl) throw new Error("User has no discordWebhookUrl configured");
        await sendDiscordAlert(user.discordWebhookUrl, message);
        break;

      case AlertChannel.EMAIL:
        // TODO: integrate transactional email provider (e.g. Resend).
        break;

      case AlertChannel.IN_APP:
        // No-op: IN_APP notifications are surfaced by querying NotificationLog directly.
        break;
    }

    await prisma.notificationLog.update({
      where: { id: notification.id },
      data: { status: NotificationStatus.SENT, sentAt: new Date() },
    });
  } catch (error) {
    await prisma.notificationLog.update({
      where: { id: notification.id },
      data: {
        status: NotificationStatus.FAILED,
        error: error instanceof Error ? error.message : String(error),
      },
    });
  }
}

function formatMessage(payload: Record<string, unknown>): string {
  if (typeof payload.message === "string") return payload.message;
  return `New FlipSignal alert: ${JSON.stringify(payload)}`;
}

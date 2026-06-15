/**
 * Sends a message to a Discord channel via an incoming webhook URL.
 */
export async function sendDiscordAlert(webhookUrl: string, message: string): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Discord webhook error (${res.status}): ${body}`);
  }
}

const N8N_URL = process.env.N8N_WEBHOOK_URL;
const N8N_KEY = process.env.N8N_API_KEY;

export type N8nEvent =
  | 'new_signup'
  | 'new_email_capture'
  | 'new_tool_use'
  | 'new_paid_subscription'
  | 'payment_failed';

export async function triggerN8n(event: N8nEvent, payload: Record<string, unknown>): Promise<void> {
  if (!N8N_URL) return;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (N8N_KEY) headers['X-N8N-API-KEY'] = N8N_KEY;

  try {
    await fetch(N8N_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ event, ...payload, ts: new Date().toISOString() }),
    });
  } catch (err: any) {
    console.error('[n8n] Trigger failed:', err?.message);
  }
}

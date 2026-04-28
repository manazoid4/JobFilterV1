export type WaitlistInput = {
  name: string;
  trade: string;
  contact: string;
  source: string;
};

export async function joinWaitlist(input: WaitlistInput) {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const payload = await response.json() as { ok: boolean; error?: string };
  if (!response.ok || !payload.ok) {
    throw new Error(payload.error ?? 'Could not join waitlist.');
  }
  return payload;
}

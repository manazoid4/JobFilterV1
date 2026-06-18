// Shared guarded Claude caller. Every AI feature in JobFilter goes through this.
// Guardrails: hard timeout, key-presence check, JSON-only parse, caller MUST supply a fallback.
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const TIMEOUT_MS = 6_000;
const MAX_OUTPUT_CHARS = 2_000;

export function aiEnabled(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

/**
 * Calls Claude with a strict JSON-only instruction. Returns null on any failure
 * (missing key, timeout, bad JSON, non-2xx) — callers must have a deterministic fallback.
 */
export async function callClaudeJSON<T>(prompt: string): Promise<T | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
        max_tokens: 512,
        temperature: 0.3,
        system: 'Return valid JSON only. Do not wrap it in markdown fences.',
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;

    const json = await res.json();
    const text = json?.content?.find((part: { type?: string }) => part?.type === 'text')?.text;
    if (!text || typeof text !== 'string' || text.length > MAX_OUTPUT_CHARS) return null;

    return JSON.parse(text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')) as T;
  } catch {
    return null;
  }
}

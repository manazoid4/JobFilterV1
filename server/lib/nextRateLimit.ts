const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;

/**
 * In-memory rate limit for Next.js route handlers (Web Request/Response).
 * Returns a 429 Response if the caller's IP is over `limit` requests/minute, else null.
 */
export function rateLimitNext(request: Request, limit = 10): Response | null {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = (forwardedFor ?? 'unknown').split(',')[0].trim();
  const now = Date.now();
  const current = hits.get(ip);

  if (!current || now > current.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  if (current.count >= limit) {
    return Response.json(
      { ok: false, error: 'Rate limit exceeded. Retry in one minute.' },
      { status: 429 }
    );
  }

  current.count += 1;
  return null;
}

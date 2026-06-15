/**
 * Minimal in-memory per-user rate limiter for API routes.
 *
 * NOTE: this resets on server restart and is per-instance, so on a
 * multi-instance Vercel deployment it only provides a soft limit. For a
 * hard limit, swap this for Upstash Redis (`@upstash/ratelimit`) using the
 * same `checkRateLimit` signature.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * @param key unique identifier, e.g. `${userId}:${route}`
 * @param limit max requests per window
 * @param windowMs window size in milliseconds
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

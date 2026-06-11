const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

type Bucket = {
  timestamps: number[];
};

// In-memory state is per serverless instance; acceptable launch stopgap until a shared store is added.
const buckets = new Map<string, Bucket>();

export function checkRateLimit(request: Request): Response | null {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const bucket = buckets.get(ip) ?? { timestamps: [] };

  bucket.timestamps = bucket.timestamps.filter((timestamp) => timestamp > cutoff);
  if (bucket.timestamps.length >= MAX_REQUESTS) {
    buckets.set(ip, bucket);
    return Response.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  bucket.timestamps.push(now);
  buckets.set(ip, bucket);
  return null;
}

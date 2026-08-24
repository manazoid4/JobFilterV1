import type { Request, Response, NextFunction } from 'express';

const WINDOW_MS = 60_000;
const LIMIT = 20;

function getIp(req: Request): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  const forwardedIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return String(forwardedIp ?? req.socket.remoteAddress ?? 'unknown')
    .split(',')[0]
    .trim();
}

export function makeRateLimit(limit = LIMIT): (req: Request, res: Response, next: NextFunction) => void {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
    const ip = getIp(req);
    const now = Date.now();
    const current = hits.get(ip);
    if (!current || now > current.resetAt) {
      hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
      return next();
    }
    if (current.count >= limit) {
      return res.status(429).json({ ok: false, error: 'rate limit exceeded. retry in one minute.' });
    }
    current.count += 1;
    return next();
  };
}

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = getIp(req);
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || now > current.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }
  if (current.count >= LIMIT) {
    return res.status(429).json({
      ok: false,
      source: 'contracts_finder',
      count: 0,
      region: '',
      outward: '',
      leads: [],
      errors: ['rate limit exceeded. retry in one minute.'],
    });
  }
  current.count += 1;
  return next();
}

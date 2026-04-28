import type { Request, Response, NextFunction } from 'express';

const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 20;

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown')
    .split(',')[0]
    .trim();
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

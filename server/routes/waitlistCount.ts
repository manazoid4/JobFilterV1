import type { Express, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit';
import { supabase } from '../lib/supabase';

const FOUNDING_MAX = 30;

export function registerWaitlistCountRoute(app: Express) {
  app.get('/api/waitlist/count', rateLimit, async (_req: Request, res: Response) => {
    try {
      let count = 0;
      if (supabase) {
        const { count: dbCount, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });
        if (!error && dbCount !== null) count = dbCount;
      }
      const remaining = Math.max(0, FOUNDING_MAX - count);
      return res.json({ ok: true, count, remaining, foundingMax: FOUNDING_MAX });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Count failed.') });
    }
  });
}

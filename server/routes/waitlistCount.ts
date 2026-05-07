import type { Express, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export function registerWaitlistCountRoute(app: Express) {
  app.get('/api/waitlist/count', async (_req: Request, res: Response) => {
    try {
      const foundingMax = 30;
      let count = 0;

      if (supabase) {
        const { count: c, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });
        if (error) throw error;
        count = c ?? 0;
      }

      const remaining = Math.max(0, foundingMax - count);
      return res.json({ ok: true, count, remaining, foundingMax });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Count failed.') });
    }
  });
}

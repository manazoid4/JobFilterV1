import fs from 'fs/promises';
import path from 'path';
import type { Express, Request, Response } from 'express';

export function registerWaitlistCountRoute(app: Express) {
  app.get('/api/waitlist/count', async (_req: Request, res: Response) => {
    try {
      const filePath = path.join(process.cwd(), 'data', 'waitlist.jsonl');
      let count = 0;
      try {
        const content = await fs.readFile(filePath, 'utf8');
        count = content.trim().split('\n').filter(Boolean).length;
      } catch {
        count = 0;
      }
      const foundingMax = 30;
      const remaining = Math.max(0, foundingMax - count);
      return res.json({ ok: true, count, remaining, foundingMax });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Count failed.') });
    }
  });
}

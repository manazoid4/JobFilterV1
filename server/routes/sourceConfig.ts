import type { Express, Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { getAllSourcesConfig, invalidateSourceConfigCache, warmSourceConfigCache } from '../../leadEngine/sourceConfig';

const ADMIN_SECRET = process.env.ADMIN_SECRET;

function isAdmin(req: Request): boolean {
  return Boolean(ADMIN_SECRET && req.headers['x-admin-secret'] === ADMIN_SECRET);
}

export function registerSourceConfigRoute(app: Express) {
  // GET /api/source-config — public: returns effective source state
  app.get('/api/source-config', async (_req: Request, res: Response) => {
    await warmSourceConfigCache();
    res.json({ ok: true, sources: getAllSourcesConfig() });
  });

  // PATCH /api/source-config/:key — admin: toggle enabled and/or score_bonus
  app.patch('/api/source-config/:key', async (req: Request, res: Response) => {
    if (!isAdmin(req)) {
      return res.status(401).json({ ok: false, error: 'unauthorized' });
    }
    const { key } = req.params;
    const { enabled, score_bonus } = req.body as { enabled?: boolean; score_bonus?: number | null };

    if (enabled === undefined && score_bonus === undefined) {
      return res.status(400).json({ ok: false, error: 'provide enabled or score_bonus' });
    }
    if (!supabase) {
      return res.status(503).json({ ok: false, error: 'database not configured' });
    }

    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (enabled !== undefined) update.enabled = enabled;
    if (score_bonus !== undefined) update.score_bonus = score_bonus;

    const { error } = await supabase
      .from('source_config')
      .upsert({ key, ...update }, { onConflict: 'key' });

    if (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }

    invalidateSourceConfigCache();
    await warmSourceConfigCache();

    res.json({ ok: true, sources: getAllSourcesConfig() });
  });
}

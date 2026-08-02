import type { Express, Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { resolveRequestAccess } from '../lib/requestAuth';

const VALID_FREQUENCIES = new Set(['weekly', 'daily', 'instant']);
const VALID_TRADES = new Set(['electrical', 'plumbing', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping']);

function sanitisePostcode(raw: string): string {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9 ]/g, '').slice(0, 8);
}

export function registerAlertsRoute(app: Express) {
  // GET /api/alerts — list alerts for the authenticated user
  app.get('/api/alerts', async (req: Request, res: Response) => {
    try {
      const access = await resolveRequestAccess(req);
      if (!access) return res.status(401).json({ ok: false, error: 'Authentication required.' });
      if (!supabase) return res.json({ ok: true, alerts: [] });

      const { data, error } = await supabase
        .from('alerts')
        .select('id, trade, postcode_outward, radius_miles, frequency, active, created_at')
        .eq('user_id', access.userId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) return res.status(500).json({ ok: false, error: error.message });
      return res.json({ ok: true, alerts: data ?? [] });
    } catch (err: any) {
      return res.status(500).json({ ok: false, error: String(err?.message ?? 'Alerts fetch failed.') });
    }
  });

  // POST /api/alerts — create a new alert
  app.post('/api/alerts', async (req: Request, res: Response) => {
    try {
      const access = await resolveRequestAccess(req);
      if (!access) return res.status(401).json({ ok: false, error: 'Sign in to save alerts.' });
      if (!supabase) return res.status(503).json({ ok: false, error: 'Alert storage is not configured yet.' });

      const trade = String(req.body.trade ?? '').toLowerCase();
      const postcode_outward = sanitisePostcode(String(req.body.postcode_outward ?? req.body.location ?? ''));
      const frequency = String(req.body.frequency ?? 'weekly').toLowerCase();
      const radius_miles = Math.min(Math.max(Number(req.body.radius_miles ?? 25), 5), 100);

      if (!VALID_TRADES.has(trade)) return res.status(422).json({ ok: false, error: 'Invalid trade.' });
      if (!postcode_outward) return res.status(422).json({ ok: false, error: 'Postcode required.' });
      if (!VALID_FREQUENCIES.has(frequency)) return res.status(422).json({ ok: false, error: 'Invalid frequency.' });

      // Upsert by user+trade+postcode so duplicate alerts don't stack
      const { data, error } = await supabase
        .from('alerts')
        .upsert(
          { user_id: access.userId, trade, postcode_outward, radius_miles, frequency, active: true, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,trade,postcode_outward' }
        )
        .select('id, trade, postcode_outward, radius_miles, frequency, active')
        .maybeSingle();

      if (error) {
        // If the upsert fails (e.g. table doesn't exist yet), return a soft error
        console.warn('[alerts] upsert failed:', error.message);
        return res.status(503).json({ ok: false, error: 'Alert could not be saved. The alerts table may not be set up yet.' });
      }

      return res.json({ ok: true, alert: data });
    } catch (err: any) {
      return res.status(500).json({ ok: false, error: String(err?.message ?? 'Alert creation failed.') });
    }
  });

  // PATCH /api/alerts — update frequency or active state
  app.patch('/api/alerts', async (req: Request, res: Response) => {
    try {
      const access = await resolveRequestAccess(req);
      if (!access) return res.status(401).json({ ok: false, error: 'Authentication required.' });
      if (!supabase) return res.status(503).json({ ok: false, error: 'Alert storage is not configured.' });

      const id = String(req.body.id ?? '').trim();
      if (!id) return res.status(422).json({ ok: false, error: 'Alert id required.' });

      const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (req.body.frequency !== undefined && VALID_FREQUENCIES.has(String(req.body.frequency))) {
        update.frequency = String(req.body.frequency);
      }
      if (req.body.active !== undefined) {
        update.active = Boolean(req.body.active);
      }

      const { error } = await supabase
        .from('alerts')
        .update(update)
        .eq('id', id)
        .eq('user_id', access.userId);

      if (error) return res.status(500).json({ ok: false, error: error.message });
      return res.json({ ok: true });
    } catch (err: any) {
      return res.status(500).json({ ok: false, error: String(err?.message ?? 'Alert update failed.') });
    }
  });

  // DELETE /api/alerts?id=... — delete an alert
  app.delete('/api/alerts', async (req: Request, res: Response) => {
    try {
      const access = await resolveRequestAccess(req);
      if (!access) return res.status(401).json({ ok: false, error: 'Authentication required.' });
      if (!supabase) return res.status(503).json({ ok: false, error: 'Alert storage is not configured.' });

      const id = String(req.query.id ?? '').trim();
      if (!id) return res.status(422).json({ ok: false, error: 'Alert id required.' });

      const { error } = await supabase
        .from('alerts')
        .delete()
        .eq('id', id)
        .eq('user_id', access.userId);

      if (error) return res.status(500).json({ ok: false, error: error.message });
      return res.json({ ok: true });
    } catch (err: any) {
      return res.status(500).json({ ok: false, error: String(err?.message ?? 'Alert deletion failed.') });
    }
  });

  // GET /api/alerts/send — Vercel daily cron trigger; dispatches pending alert emails
  app.get('/api/alerts/send', async (_req: Request, res: Response) => {
    if (!supabase) {
      console.log('[alerts/send] Supabase not configured — skipping alert dispatch');
      return res.json({ ok: true, sent: 0, reason: 'supabase_not_configured' });
    }
    // Placeholder: fetch active alerts and dispatch — full send logic added in a follow-up
    console.log('[alerts/send] Daily cron fired');
    return res.json({ ok: true, sent: 0, reason: 'dispatch_not_yet_implemented' });
  });
}

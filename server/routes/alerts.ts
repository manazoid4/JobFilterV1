import type { Express, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit';
import { resolveRequestAccess } from '../lib/requestAuth';
import { supabase } from '../lib/supabase';

const ALLOWED_TRADES = new Set([
  'electrical', 'plumbing', 'roofing', 'building',
  'carpentry', 'painting', 'hvac', 'landscaping',
]);

function clean(input: unknown, max: number): string {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

export function registerAlertsRoute(app: Express) {
  app.post('/api/alerts', rateLimit, async (req: Request, res: Response) => {
    try {
      const access = await resolveRequestAccess(req);
      if (!access) {
        return res.status(401).json({ ok: false, error: 'Sign in to set up alerts.' });
      }

      const trade = clean(req.body?.trade, 60).toLowerCase();
      const postcodeOutward = clean(req.body?.postcode_outward ?? req.body?.location, 10).toUpperCase();

      if (!ALLOWED_TRADES.has(trade) || !postcodeOutward) {
        return res.status(422).json({ ok: false, error: 'Trade and postcode area are required.' });
      }

      if (supabase) {
        // Store using waitlist table — source field encodes alert type
        await supabase
          .from('waitlist')
          .insert([{
            name: access.email,
            trade,
            contact: access.email,
            contact_type: 'email',
            source: `weekly_alert:${postcodeOutward}`,
          }])
          .select('id')
          .maybeSingle()
          .then(() => null, () => null);
      }

      console.log(JSON.stringify({
        event: 'alert_subscribed',
        userId: access.userId,
        trade,
        postcodeOutward,
        requestId: res.locals.requestId,
      }));

      return res.json({ ok: true, trade, postcodeOutward });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ ok: false, error: message || 'Alert setup failed.' });
    }
  });
}

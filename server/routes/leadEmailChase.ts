import type { Express, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit';
import { sendLeadChaseEmail } from '../lib/resend';
import { resolveRequestAccess } from '../lib/requestAuth';

export function registerLeadEmailChaseRoute(app: Express) {
  app.post('/api/leads/email-chase', rateLimit, async (req: Request, res: Response) => {
    try {
      const { to, leadTitle, area, score, estimatedValue, message, url } = req.body || {};
      const access = await resolveRequestAccess(req);
      if (!access?.email) {
        return res.status(401).json({ ok: false, error: 'Authentication required.' });
      }

      if (to && String(to).trim().toLowerCase() !== access.email) {
        return res.status(403).json({ ok: false, error: 'Email can only be sent to your authenticated address.' });
      }
      if (!leadTitle || !message) {
        return res.status(422).json({ ok: false, error: 'leadTitle and message are required.' });
      }

      const result = await sendLeadChaseEmail({
        to: access.email,
        leadTitle: String(leadTitle).slice(0, 200),
        area: String(area ?? '').slice(0, 120),
        score: Number(score) || 0,
        estimatedValue: String(estimatedValue ?? 'POA').slice(0, 80),
        message: String(message).slice(0, 5000),
        url: url ? String(url) : undefined,
      });

      if (!result.sent) {
        return res.status(503).json({ ok: false, error: result.error || 'Email failed to send.' });
      }
      return res.json({ ok: true });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Email failed.') });
    }
  });
}

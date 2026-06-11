import type { Express, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit';
import { sendLeadChaseEmail } from '../lib/resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function registerLeadEmailChaseRoute(app: Express) {
  app.post('/api/leads/email-chase', rateLimit, async (req: Request, res: Response) => {
    try {
      const { to, leadTitle, area, score, estimatedValue, message, url } = req.body || {};

      if (!to || !EMAIL_RE.test(String(to))) {
        return res.status(422).json({ ok: false, error: 'A valid email address is required.' });
      }
      if (!leadTitle || !message) {
        return res.status(422).json({ ok: false, error: 'leadTitle and message are required.' });
      }

      const result = await sendLeadChaseEmail({
        to: String(to),
        leadTitle: String(leadTitle),
        area: String(area ?? ''),
        score: Number(score) || 0,
        estimatedValue: String(estimatedValue ?? 'POA'),
        message: String(message),
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

import type { Express, Request, Response } from 'express';
import { triggerGoldLeadWhatsApp } from '../services/sms';

async function isAuthenticated(req: Request): Promise<boolean> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7);
  try {
    const { supabase } = await import('../lib/supabase');
    if (!supabase) return false;
    const { data: { user }, error } = await supabase.auth.getUser(token);
    return !error && !!user;
  } catch { return false; }
}

export function registerLeadNotifyRoute(app: Express) {
  app.post('/api/leads/notify', async (req: Request, res: Response) => {
    if (!(await isAuthenticated(req))) {
      return res.status(401).json({ ok: false, error: 'Unauthorised.' });
    }
    try {
      const { phoneNumber, leadData } = req.body || {};
      if (!phoneNumber || !leadData) {
        return res.status(422).json({ ok: false, error: 'phoneNumber and leadData required.' });
      }

      const payload = {
        leadId: leadData.id || leadData.leadId,
        score: leadData.score || 80,
        jobType: leadData.trade || 'Trade',
        area: leadData.area || leadData.location || 'Unknown',
        budget: leadData.value || leadData.estimatedValue,
        phone: phoneNumber,
        postcode: leadData.postcodeOutward,
        leadReadiness: leadData.leadReadiness,
        qualityLabel: leadData.qualityLabel,
        recommendedAction: leadData.recommendedAction,
        contactPathUsed: leadData.contactPath?.recommendedChannel || leadData.contactPathUsed,
        scoreReasons: leadData.scoreReasons || leadData.reasons,
      };

      const result = await triggerGoldLeadWhatsApp(payload);
      return res.json({ ok: true, result });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Notify failed.') });
    }
  });
}

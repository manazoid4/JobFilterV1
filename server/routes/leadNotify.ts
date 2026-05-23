import type { Express, Request, Response } from 'express';
import { triggerGoldLeadWhatsApp } from '../services/sms.js';

export function registerLeadNotifyRoute(app: Express) {
  app.post('/api/leads/notify', async (req: Request, res: Response) => {
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
      };

      const result = await triggerGoldLeadWhatsApp(payload);
      return res.json({ ok: true, result });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Notify failed.') });
    }
  });
}

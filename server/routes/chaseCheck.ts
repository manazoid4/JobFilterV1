import type { Express, Request, Response } from 'express';
import { triggerGoldLeadWhatsApp } from '../services/sms.js';

const chaseStatuses: Record<string, { status: string; sentAt: string; nudged: boolean }> = {};

export function registerChaseCheckRoute(app: Express) {
  app.post('/api/chase/update', (req: Request, res: Response) => {
    try {
      const { leadId, status } = req.body || {};
      if (!leadId || !status) {
        return res.status(422).json({ ok: false, error: 'leadId and status required.' });
      }
      chaseStatuses[leadId] = {
        status,
        sentAt: chaseStatuses[leadId]?.sentAt || new Date().toISOString(),
        nudged: chaseStatuses[leadId]?.nudged || false,
      };
      return res.json({ ok: true });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Chase update failed.') });
    }
  });

  app.post('/api/chase/nudge', async (req: Request, res: Response) => {
    try {
      const { leadId, phoneNumber, trade, area } = req.body || {};
      if (!leadId || !phoneNumber) {
        return res.status(422).json({ ok: false, error: 'leadId and phoneNumber required.' });
      }
      const entry = chaseStatuses[leadId];
      if (entry?.nudged) {
        return res.json({ ok: true, nudged: false, reason: 'already_nudged' });
      }
      if (entry?.status === 'contacted' || entry?.status === 'quoted' || entry?.status === 'won') {
        return res.json({ ok: true, nudged: false, reason: 'already_contacted' });
      }
      chaseStatuses[leadId] = { ...entry, status: entry?.status || 'sent', sentAt: entry?.sentAt || new Date().toISOString(), nudged: true };
      const result = await triggerGoldLeadWhatsApp({
        leadId,
        score: 75,
        jobType: trade || 'Trade',
        area: area || 'your area',
        budget: undefined,
        phone: phoneNumber,
        postcode: undefined,
        ghostRisk: 'MAYBE',
        qualityLabel: 'SILVER',
      });
      return res.json({ ok: true, nudged: true, result });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Nudge failed.') });
    }
  });

  app.post('/api/chase/template', (req: Request, res: Response) => {
    try {
      const { trade, area, address, description } = req.body || {};
      const message = `Hi, I noticed your property${address ? ` at ${address}` : ''} has planning approval for ${description || 'work'}. I'm a local ${trade || 'tradesman'} — would you like a quote? No obligation.`;
      return res.json({ ok: true, message });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Template failed.') });
    }
  });
}

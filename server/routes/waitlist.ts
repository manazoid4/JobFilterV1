import type { Express, Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { sendWaitlistConfirmation } from '../services/email';

export function registerWaitlistRoute(app: Express) {
  app.post('/api/waitlist', async (req: Request, res: Response) => {
    try {
      const entry = {
        name: clean(req.body?.name, 80),
        trade: clean(req.body?.trade, 60),
        contact: clean(req.body?.contact, 120),
        contact_type: detectContactType(req.body?.contact),
        source: clean(req.body?.source, 80) || 'site',
      };

      if (!entry.name || !entry.trade || !entry.contact) {
        return res.status(422).json({ ok: false, error: 'Name, trade, and email or phone are required.' });
      }

      let stored = 'none';
      if (supabase) {
        const { error } = await supabase.from('waitlist').insert(entry);
        if (error) throw error;
        stored = 'supabase';
      }

      if (entry.contact_type === 'email') {
        sendWaitlistConfirmation(entry.name, entry.contact).catch(() => {});
      }

      return res.json({ ok: true, stored });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Waitlist failed.') });
    }
  });
}

function clean(input: unknown, max: number) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

function detectContactType(input: unknown) {
  const value = String(input ?? '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
  if (/^\+?[\d\s().-]{8,}$/.test(value)) return 'phone';
  return 'unknown';
}

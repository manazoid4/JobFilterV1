import type { Express, Request, Response } from 'express';
import { scoreIntake } from '../services/decisionScoring';
import { triggerGoldLeadWhatsApp } from '../services/sms';
import { outwardFromPostcode } from '../utils/postcode';

const JOB_TYPES = new Set(['Electrical', 'Plumbing', 'Roofing', 'Building']);
const URGENCY_TYPES = new Set(['Emergency', 'This week', 'Later']);

export function registerIntakeScoreRoute(app: Express) {
  app.post('/api/intake/score', async (req: Request, res: Response) => {
    try {
      const jobType = sanitizeJobType(req.body?.jobType);
      const urgency = sanitizeUrgency(req.body?.urgency);
      const details = sanitizeText(req.body?.details);
      const postcode = sanitizeText(req.body?.postcode).toUpperCase();
      const hasPhotos = Boolean(req.body?.hasPhotos);
      const budget = sanitizeText(req.body?.budget);
      const phone = sanitizeText(req.body?.phone);
      const area = outwardFromPostcode(postcode) || postcode || 'Area unknown';
      const { score, flags, tier } = scoreIntake({ jobType, urgency, details, postcode, hasPhotos, budget });

      let whatsapp = { triggered: false, provider: 'none' };
      if (tier === 'GOLD') {
        whatsapp = await triggerGoldLeadWhatsApp({ score, jobType, area, budget, phone });
      }

      return res.json({
        ok: true,
        whatsapp,
        lead: {
          id: `lead-${Date.now()}`,
          title: `${jobType} job`,
          score,
          jobType,
          urgency,
          postcode,
          area,
          flags,
          details,
          budget,
          phone,
          tier,
          status: 'new',
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      return res.status(422).json({
        ok: false,
        errors: [String(error?.message ?? error)],
      });
    }
  });
}

function sanitizeJobType(input: unknown) {
  const value = String(input ?? '').trim();
  if (!JOB_TYPES.has(value)) throw new Error('pick a job type');
  return value;
}

function sanitizeUrgency(input: unknown) {
  const value = String(input ?? '').trim();
  if (!URGENCY_TYPES.has(value)) throw new Error('pick urgency');
  return value as 'Emergency' | 'This week' | 'Later';
}

function sanitizeText(input: unknown) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, 500);
}

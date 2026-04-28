import type { Express, Request, Response } from 'express';
import { scoreIntake } from '../services/decisionScoring';
import { triggerGoldLeadSms } from '../services/sms';
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
      const phone = sanitizeText(req.body?.phone);
      const hasPhotos = Boolean(req.body?.hasPhotos);
      const area = outwardFromPostcode(postcode) || postcode || 'Area unknown';
      const { score, flags } = scoreIntake({ jobType, urgency, details, postcode, hasPhotos });

      let sms = { triggered: false, provider: 'none' };
      if (score > 80) {
        sms = await triggerGoldLeadSms({ score, jobType, area });
      }

      return res.json({
        ok: true,
        sms,
        lead: {
          id: `lead-${Date.now()}`,
          title: `${jobType} job`,
          score,
          jobType,
          urgency,
          postcode,
          phone,
          area,
          flags,
          details,
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

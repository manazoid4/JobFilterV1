import type { Express, Request, Response } from 'express';
import type { Lead, TradeKey, Urgency } from '../../leadEngine/types';
import { scoreIntake } from '../services/decisionScoring';
import { triggerGoldLeadWhatsApp } from '../services/sms';
import { rateLimit } from '../middleware/rateLimit';
import { outwardFromPostcode } from '../utils/postcode';
import { persistLeads } from '../services/leadPersistence';

const JOB_TYPES = new Set(['Electrical', 'Plumbing', 'Roofing', 'Building']);
const URGENCY_TYPES = new Set(['Emergency', 'This week', 'Later']);

export function registerIntakeScoreRoute(app: Express) {
  app.post('/api/intake/score', rateLimit, async (req: Request, res: Response) => {
    try {
      const jobType = sanitizeJobType(req.body?.jobType);
      const urgency = sanitizeUrgency(req.body?.urgency);
      const details = sanitizeText(req.body?.details);
      const postcode = sanitizeText(req.body?.postcode).toUpperCase();
      const phone = sanitizeText(req.body?.phone);
      const hasPhotos = Boolean(req.body?.hasPhotos);
      const budget = sanitizeText(req.body?.budget);
      const area = outwardFromPostcode(postcode) || postcode || 'Area unknown';
      const { score, flags, tier } = scoreIntake({ jobType, urgency, details, postcode, hasPhotos, budget });
      const lead: Lead = {
        id: `intake-${Date.now()}`,
        title: `${jobType} job`,
        trade: toTradeKey(jobType),
        location: area,
        postcodeOutward: area,
        estimatedValue: budget || 'POA',
        urgency: toLeadUrgency(urgency),
        source: 'Intake',
        sourceConfidence: hasPhotos ? 85 : 70,
        contactSignal: phone ? 'strong' : 'weak',
        status: 'new',
        description: details,
        score,
        scoreReasons: flags,
        qualityLabel: toQualityLabel(tier),
        recommendedAction: phone ? 'Call or WhatsApp the buyer today' : 'Request phone number before quoting',
        evidenceBadges: hasPhotos ? ['Customer photos'] : ['Customer request'],
        signalStack: ['customer_intake'],
      };

      let whatsapp = { triggered: false, provider: 'none' };
      if (tier === 'GOLD') {
        try {
          whatsapp = await triggerGoldLeadWhatsApp({
            score,
            jobType,
            area,
            budget,
            phone,
            postcode,
            leadId: lead.id,
            sourceSystem: 'Intake',
            scoreReasons: flags,
            recommendedAction: lead.recommendedAction,
          });
        } catch (error: any) {
          whatsapp = { triggered: false, provider: 'meta-whatsapp', reason: String(error?.message ?? error) } as any;
        }
      }
      const persistence = await persistLeads([lead]);

      return res.json({
        ok: true,
        whatsapp,
        lead,
        persistence,
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

function toTradeKey(jobType: string): TradeKey {
  const map: Record<string, TradeKey> = {
    Electrical: 'electrical',
    Plumbing: 'plumbing',
    Roofing: 'roofing',
    Building: 'building',
  };
  return map[jobType] ?? 'building';
}

function toLeadUrgency(urgency: 'Emergency' | 'This week' | 'Later'): Urgency {
  if (urgency === 'Emergency') return 'high';
  if (urgency === 'This week') return 'medium';
  return 'low';
}

function toQualityLabel(tier: string): Lead['qualityLabel'] {
  if (tier === 'GOLD' || tier === 'SILVER' || tier === 'BRONZE') return tier;
  return 'CHECK';
}

import type { Express, Request, Response } from 'express';
import type { Lead } from '../../leadEngine/types';
import { scan } from '../../leadEngine/scan';
import { rateLimit } from '../middleware/rateLimit';
import { parseUkPostcode } from '../utils/postcode';

const TRADES = new Set(['plumbing', 'electrical', 'roofing', 'building']);

export function registerLeadSearchRoute(app: Express) {
  app.post('/api/leads/search', rateLimit, async (req: Request, res: Response) => {
    const started = Date.now();
    try {
      const postcode = parseUkPostcode(req.body?.postcode);
      const trade = sanitizeTrade(req.body?.trade);
      const radiusMiles = sanitizeRadius(req.body?.radiusMiles);

      const result = await scan({ postcode: postcode.postcode, trade, tier: 'free' });
      const leads = result.leads
        .map(toFreePreviewLead);

      console.log('[leads/search]', { trade, outward: result.outward, radiusMiles, total: result.total, shown: leads.length, ms: Date.now() - started });
      return res.json({
        ok: true,
        source: 'lead_engine',
        count: leads.length,
        region: result.region,
        outward: result.outward,
        leads,
        errors: result.errors,
      });
    } catch (error: any) {
      const message = String(error?.message ?? error);
      const status = message.includes('postcode') ? 400 : message.includes('trade') || message.includes('radius') ? 422 : 503;
      return res.status(status).json({
        ok: false,
        source: 'lead_engine',
        count: 0,
        region: '',
        outward: '',
        leads: [],
        errors: [message === 'This operation was aborted' ? 'lead engine request timed out' : message],
      });
    }
  });
}

function toFreePreviewLead(lead: Lead) {
  const score = Number(lead.score ?? 0);
  return {
    id: lead.id,
    title: `${titleCase(lead.trade)} opportunity near ${lead.postcodeOutward}`,
    trade: lead.trade,
    buyer: '',
    location: lead.location,
    postcodeOutward: lead.postcodeOutward,
    publishedAt: '',
    deadlineAt: '',
    url: '',
    estimatedValue: valuePreview(lead.estimatedValue),
    urgency: 'medium' as const,
    sourceConfidence: previewSourceConfidence(lead.sourceConfidence),
    contactSignal: 'none' as const,
    source: lead.source,
    status: lead.status,
    revenueTier: score >= 80 ? 'gold' as const : score >= 55 ? 'worth-checking' as const : 'low-signal' as const,
    tradeMatch: String(lead.trade),
    score: previewScore(score),
    reasons: ['Paid preview - unlock buyer, deadline, exact value, and action route'],
  };
}

function previewScore(score: number) {
  if (score >= 80) return 80;
  if (score >= 55) return 55;
  return 35;
}

function previewSourceConfidence(confidence: number) {
  if (confidence >= 85) return 80;
  if (confidence >= 70) return 65;
  return 50;
}

function valuePreview(value: string) {
  const amount = Number(String(value).replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(amount) || amount <= 0) return 'Unlock exact value';
  if (amount >= 100_000) return 'High-value contract';
  if (amount >= 25_000) return 'Strong-value job';
  if (amount >= 5_000) return 'Paid job signal';
  return 'Unlock exact value';
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function sanitizeTrade(input: unknown) {
  const trade = String(input ?? '').toLowerCase().replace(/[^a-z]/g, '');
  if (!TRADES.has(trade)) {
    throw new Error('trade must be plumbing, electrical, roofing, or building');
  }
  return trade;
}

function sanitizeRadius(input: unknown) {
  const radius = Number(input);
  if (!Number.isFinite(radius) || radius < 1 || radius > 100) {
    throw new Error('radiusMiles must be between 1 and 100');
  }
  return radius;
}

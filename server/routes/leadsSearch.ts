import type { Express, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit';
import type { ContractsFinderNotice } from '../services/contractsFinder';
import { fetchContractsFinderNotices } from '../services/contractsFinder';
import { normalizeNotice } from '../services/leadNormalizer';
import { outwardFromPostcode, parseUkPostcode, regionFromOutward } from '../utils/postcode';

const TRADES = new Set(['plumbing', 'electrical', 'roofing', 'building']);

export function registerLeadSearchRoute(app: Express) {
  app.post('/api/leads/search', rateLimit, async (req: Request, res: Response) => {
    const started = Date.now();
    try {
      const postcode = parseUkPostcode(req.body?.postcode);
      const trade = sanitizeTrade(req.body?.trade);
      const radiusMiles = sanitizeRadius(req.body?.radiusMiles);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);

      try {
        const notices = await fetchContractsFinderNotices(trade, controller.signal);
        const leads = notices
          .filter((notice) => noticeFitsLocation(notice, postcode.region, postcode.outward, radiusMiles))
          .map((notice) => normalizeNotice(notice, trade, postcode.outward, postcode.region))
          .sort((a, b) => b.score - a.score)
          .slice(0, radiusMiles >= 100 ? 25 : 15)
          .map(toFreePreviewLead);

        return res.json({
          ok: true,
          source: 'contracts_finder',
          count: leads.length,
          region: postcode.region,
          outward: postcode.outward,
          leads,
          errors: [],
        });
      } finally {
        clearTimeout(timeout);
        console.log('[leads/search]', { trade, outward: postcode.outward, radiusMiles, ms: Date.now() - started });
      }
    } catch (error: any) {
      const message = String(error?.message ?? error);
      const status = message.includes('postcode') ? 400 : message.includes('trade') || message.includes('radius') ? 422 : 503;
      return res.status(status).json({
        ok: false,
        source: 'contracts_finder',
        count: 0,
        region: '',
        outward: '',
        leads: [],
        errors: [message === 'This operation was aborted' ? 'contracts finder request timed out' : message],
      });
    }
  });
}

function toFreePreviewLead(lead: ReturnType<typeof normalizeNotice>) {
  return {
    ...lead,
    title: `${titleCase(lead.trade)} opportunity near ${lead.postcodeOutward}`,
    buyer: '',
    deadlineAt: '',
    url: '',
    estimatedValue: valuePreview(lead.estimatedValue),
    urgency: 'medium' as const,
    sourceConfidence: previewSourceConfidence(lead.sourceConfidence),
    contactSignal: 'none' as const,
    score: previewScore(lead.score),
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

function noticeFitsLocation(notice: ContractsFinderNotice, region: string, outward: string, radiusMiles: number) {
  const location = `${notice.location} ${notice.postcode}`.toUpperCase();
  if (!notice.postcode && location.includes('UNITED KINGDOM')) return true;
  const noticeOutward = outwardFromPostcode(notice.postcode);
  if (!noticeOutward) return radiusMiles >= 100 || location.includes('UNITED KINGDOM');
  if (noticeOutward === outward) return true;
  return radiusMiles >= 25 && regionFromOutward(noticeOutward) === region;
}

import type { Express, Request, Response } from 'express';
import type { Lead } from '../../leadEngine/types.js';
import { scan } from '../../leadEngine/scan.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { parseUkPostcode } from '../utils/postcode.js';

const TRADE_LIST = ['plumbing', 'electrical', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping'];
const TRADES = new Set(TRADE_LIST);
const FEEDBACK_STATUSES = new Set(['won', 'lost', 'too_early', 'not_real', 'real_but_uncontactable', 'ignored']);

export function registerStartSignalsRoute(app: Express) {
  app.post('/api/start-signals/search', rateLimit, async (req: Request, res: Response) => {
    try {
      const postcode = parseUkPostcode(req.body?.postcode);
      const trade = sanitizeTrade(req.body?.trade);
      const radiusMiles = sanitizeRadius(req.body?.radiusMiles);
      const result = await scan({ postcode: postcode.postcode, trade, tier: 'paid', radiusMiles });
      const leads = result.leads.map(toStartSignalLead).filter((lead) => lead.readiness !== 'WASTE');

      return res.json({
        ok: true,
        source: 'start_signal_engine',
        mode: 'start_now',
        count: leads.length,
        region: result.region,
        outward: result.outward,
        updatedAt: new Date().toISOString(),
        cached: false,
        leads,
        lockedCount: 0,
        accessMode: 'paid-start-signal-preview',
        sources: result.sources,
        sourceHealth: result.sourceHealth,
        errors: result.errors,
      });
    } catch (error: any) {
      const message = String(error?.message ?? error);
      const status = message.includes('postcode') ? 400 : message.includes('trade') || message.includes('radius') ? 422 : 503;
      return res.status(status).json({
        ok: false,
        source: 'start_signal_engine',
        mode: 'start_now',
        count: 0,
        region: '',
        outward: '',
        leads: [],
        errors: [message === 'This operation was aborted' ? 'start signal scan timed out' : message],
      });
    }
  });

  app.get('/api/start-signals/sources', rateLimit, (_req: Request, res: Response) => {
    res.json({
      ok: true,
      source: 'start_signal_engine',
      updatedAt: new Date().toISOString(),
      sources: [
        { id: 'planning-data', name: 'Planning Data API', role: 'Planning intent', refresh: '6h hot areas / daily backfill', status: 'live', confidence: 95 },
        { id: 'building-control', name: 'Council building-control registers', role: 'Site movement', refresh: 'adapter dependent', status: 'coverage-pending', confidence: 70 },
        { id: 'epc', name: 'Energy Performance Certificates', role: 'Retrofit corroboration', refresh: '12h deltas when key configured', status: 'key-required', confidence: 85 },
        { id: 'land-registry', name: 'HM Land Registry Price Paid', role: 'Recent-owner renovation signal', refresh: 'monthly', status: 'planned-cache', confidence: 85 },
        { id: 'companies-house', name: 'Companies House', role: 'Commercial fit-out signal', refresh: 'daily when key configured', status: 'key-required', confidence: 80 },
      ],
      compliance: 'Official/public sources only. Exact source URLs and fetched timestamps are required before a claim is shown as verified.',
    });
  });

  app.post('/api/start-signals/:id/feedback', rateLimit, (req: Request, res: Response) => {
    const status = String(req.body?.status ?? '').toLowerCase();
    if (!FEEDBACK_STATUSES.has(status)) {
      return res.status(422).json({ ok: false, errors: ['feedback status must be won, lost, too_early, not_real, real_but_uncontactable, ignored'] });
    }
    return res.json({
      ok: true,
      source: 'start_signal_engine',
      signalId: req.params.id,
      status,
      receivedAt: new Date().toISOString(),
    });
  });
}

function toStartSignalLead(lead: Lead) {
  const evidence = Array.from(new Set([...(lead.signalStack ?? []), ...(lead.evidenceBadges ?? [])])).filter(Boolean);
  const readiness = scoreReadiness(lead, evidence.length);
  const sourceUrl = lead.sourceUrl || (lead as any).url || '';
  return {
    ...lead,
    url: sourceUrl,
    score: Math.min(100, Math.max(Number(lead.score ?? 0), readiness === 'READY' ? 80 : readiness === 'MAYBE' ? 55 : 35)),
    readiness,
    leadReadiness: readiness,
    evidenceCount: evidence.length,
    evidenceBadges: evidence.slice(0, 5),
    whyNow: buildWhyNow(lead, evidence),
    sourceUrls: sourceUrl ? [sourceUrl] : [],
    updatedAt: new Date().toISOString(),
    recommendedAction: lead.recommendedAction || recommendedAction(readiness),
  };
}

function scoreReadiness(lead: Lead, evidenceCount: number) {
  if (lead.leadReadiness === 'READY' || lead.signalClass === 'active_site') return 'READY';
  if (lead.leadReadiness === 'MAYBE') return 'MAYBE';
  if (['homeowner_retrofit', 'commercial_fitout'].includes(String(lead.signalClass)) && evidenceCount >= 1) return 'MAYBE';
  if (evidenceCount >= 2 && Number(lead.score ?? 0) >= 60) return 'MAYBE';
  return 'WASTE';
}

function buildWhyNow(lead: Lead, evidence: string[]) {
  if (lead.signalClass === 'active_site') return 'Planning and site-movement evidence point to work moving now.';
  if (lead.signalClass === 'homeowner_retrofit') return 'Retrofit/property evidence suggests an owner may need trade work soon.';
  if (lead.signalClass === 'commercial_fitout') return 'Business and property signals suggest a fit-out opportunity.';
  return evidence[0] ? `Recent ${evidence[0].toLowerCase()} evidence raises this above planning noise.` : 'Recent official signals make this worth checking.';
}

function recommendedAction(readiness: 'READY' | 'MAYBE' | 'WASTE') {
  if (readiness === 'READY') return 'Check source evidence and reserve a survey slot within 48 hours.';
  if (readiness === 'MAYBE') return 'Save it, verify the source, and follow up if the site matches your trade.';
  return 'Skip unless you already know the site.';
}

function sanitizeTrade(input: unknown) {
  const trade = String(input ?? '').toLowerCase().replace(/[^a-z]/g, '');
  if (!TRADES.has(trade)) {
    throw new Error(`trade must be ${TRADE_LIST.join(', ')}`);
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

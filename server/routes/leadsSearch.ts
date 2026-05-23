import type { Express, Request, Response } from 'express';
import type { Lead } from '../../leadEngine/types';
import { scan } from '../../leadEngine/scan';
import { CONFIG } from '../../leadEngine/config';
import { rateLimit } from '../middleware/rateLimit';
import { parseUkPostcode } from '../utils/postcode';
import { persistLeads } from '../services/leadPersistence';

const TRADE_LIST = ['plumbing', 'electrical', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping'];
const TRADES = new Set(TRADE_LIST);
const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';

export function registerLeadSearchRoute(app: Express) {
  app.post('/api/leads/search', rateLimit, async (req: Request, res: Response) => {
    const started = Date.now();
    try {
      const postcode = parseUkPostcode(req.body?.postcode);
      const trade = sanitizeTrade(req.body?.trade);
      const radiusMiles = sanitizeRadius(req.body?.radiusMiles);

      const result = await scan({ postcode: postcode.postcode, trade, tier: 'paid', radiusMiles });
      const persistence = await persistLeads(result.leads);
      const leads = FULL_ACCESS_TEST_MODE
        ? result.leads.map(l => ({ ...l, reasons: l.scoreReasons ?? [] }))
        : result.leads.slice(0, CONFIG.freeTierLimit).map(toFreePreviewLead);

      console.log('[leads/search]', { trade, outward: result.outward, radiusMiles, total: result.total, shown: leads.length, ms: Date.now() - started });
      return res.json({
        ok: true,
        source: 'lead_engine',
        count: leads.length,
        region: result.region,
        outward: result.outward,
        leads,
        lockedCount: FULL_ACCESS_TEST_MODE ? 0 : Math.max(0, result.total - leads.length),
        accessMode: FULL_ACCESS_TEST_MODE ? 'full-test-access' : 'free-preview',
        persistence,
        sources: result.sources,
        sourceHealth: result.sourceHealth,
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

// Strip common tender boilerplate prefixes and cap at 8 words
const BOILERPLATE_PREFIXES = /^(provision of|supply of|supply and (installation|delivery) of|procurement of|appointment of|delivery of|contract for)\s+/i;

function shortenTenderTitle(rawTitle: string): string {
  const stripped = rawTitle.replace(BOILERPLATE_PREFIXES, '').trim();
  const words = stripped.split(/\s+/);
  return words.slice(0, 8).join(' ') + (words.length > 8 ? '…' : '');
}

function previewTitle(lead: Lead): string {
  const src = lead.source;

  if (src === 'ContractsFinder' || src === 'FTS' || src === 'PCS' || src === 'Sell2Wales') {
    if (lead.title && lead.title.length > 4) {
      return shortenTenderTitle(lead.title);
    }
  }

  if (src === 'PlanningData') {
    return `Planning signal: ${titleCase(lead.trade)} work near ${lead.postcodeOutward}`;
  }

  if (src === 'CompaniesHouse') {
    return `New ${titleCase(lead.trade)} business signal near ${lead.postcodeOutward}`;
  }

  if (src === 'LandRegistry') {
    return `New owner nearby — ${titleCase(lead.trade)} renovation likely`;
  }

  // DirectorySignal, EPC: capitalise trade properly
  return `${titleCase(lead.trade)} opportunity near ${lead.postcodeOutward}`;
}

function toFreePreviewLead(lead: Lead) {
  const score = Number(lead.score ?? 0);
  return {
    id: lead.id,
    title: previewTitle(lead),
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
    reasons: buildReasons(lead, score),
    distanceMiles: lead.distanceMiles,
    qualityLabel: lead.qualityLabel,
    leadReadiness: lead.leadReadiness,
    recommendedAction: lead.recommendedAction,
    evidenceBadges: lead.evidenceBadges,
    signalStack: lead.signalStack,
    signalClass: lead.signalClass,
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

function buildReasons(_lead: Lead, _score: number): string[] {
  return ['Paid preview - unlock buyer, deadline, exact value, and action route'];
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

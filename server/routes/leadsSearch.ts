import type { Express, Request, Response } from 'express';
import type { Lead } from '../../leadEngine/types';
import { scan } from '../../leadEngine/scan';
import { CONFIG } from '../../leadEngine/config';
import { rateLimit } from '../middleware/rateLimit';
import { parseUkPostcode } from '../utils/postcode';
import { persistLeads } from '../services/leadPersistence';
import { persistSourceBenchmarkRun } from '../services/sourceBenchmark';
import { resolveOwnerFromToken } from '../lib/ownerAccess';

const TRADE_LIST = ['plumbing', 'electrical', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping'];
const TRADES = new Set(TRADE_LIST);
const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';

// Weekly scan limit for free-tier authenticated users.
// Unauthenticated requests get the same limit but are only tracked by rate-limit middleware.
const FREE_WEEKLY_SCAN_LIMIT = 3;

/** Returns the ISO week key for the current week: YYYY-WXX */
function getWeekKey(): string {
  const now = new Date();
  const day = now.getDay() === 0 ? 7 : now.getDay(); // Mon=1..Sun=7
  const thursday = new Date(now);
  thursday.setDate(now.getDate() + (4 - day));
  const year = thursday.getFullYear();
  const jan1 = new Date(year, 0, 1);
  const weekNum = Math.ceil((((thursday.getTime() - jan1.getTime()) / 86400000) + 1) / 7);
  return `${year}-W${String(weekNum).padStart(2, '0')}`;
}

type AccessContext = {
  tier: 'full' | 'preview';
  userId: string | null;
  scanLimitExceeded: boolean;
  scansUsed: number;
};

async function resolveAccessContext(req: Request): Promise<AccessContext> {
  const noAuth: AccessContext = { tier: 'preview', userId: null, scanLimitExceeded: false, scansUsed: 0 };
  if (FULL_ACCESS_TEST_MODE) return { tier: 'full', userId: null, scanLimitExceeded: false, scansUsed: 0 };

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return noAuth;

  const token = authHeader.slice(7);

  // Owner always gets full access
  const ownerEmail = await resolveOwnerFromToken(token);
  if (ownerEmail) return { tier: 'full', userId: null, scanLimitExceeded: false, scansUsed: 0 };

  try {
    const { supabase } = await import('../lib/supabase');
    if (!supabase) return noAuth;

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return noAuth;

    // Check subscription
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('active, status')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (sub?.active || sub?.status === 'active') {
      return { tier: 'full', userId: user.id, scanLimitExceeded: false, scansUsed: 0 };
    }

    // Free tier — check + increment server-side weekly scan counter
    const thisWeek = getWeekKey();
    const { data: profile } = await supabase
      .from('profiles')
      .select('weekly_scan_week, weekly_scan_count')
      .eq('id', user.id)
      .maybeSingle();

    const storedWeek: string | null = profile?.weekly_scan_week ?? null;
    const storedCount: number = (storedWeek === thisWeek ? (profile?.weekly_scan_count ?? 0) : 0);

    if (storedCount >= FREE_WEEKLY_SCAN_LIMIT) {
      return { tier: 'preview', userId: user.id, scanLimitExceeded: true, scansUsed: storedCount };
    }

    // Increment counter (best-effort — never block the scan if this fails)
    const newCount = storedCount + 1;
    supabase.from('profiles').update({
      weekly_scan_week: thisWeek,
      weekly_scan_count: newCount,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id).then(({ error: e }) => {
      if (e) console.warn('[leads/search] scan counter update failed:', e.message);
    });

    return { tier: 'preview', userId: user.id, scanLimitExceeded: false, scansUsed: newCount };
  } catch {
    // Supabase unavailable — allow scan to proceed
    return noAuth;
  }
}


export function registerLeadSearchRoute(app: Express) {
  app.post('/api/leads/search', rateLimit, async (req: Request, res: Response) => {
    const started = Date.now();
    try {
      const postcode = parseUkPostcode(req.body?.postcode);
      const trade = sanitizeTrade(req.body?.trade);
      const radiusMiles = sanitizeRadius(req.body?.radiusMiles);

      const queryStartedAt = new Date(started).toISOString();
      const [result, accessCtx] = await Promise.all([
        scan({ postcode: postcode.postcode, trade, tier: 'paid', radiusMiles }),
        resolveAccessContext(req),
      ]);
      const queryFinishedAt = new Date().toISOString();

      // Server-side free scan gate — blocks after FREE_WEEKLY_SCAN_LIMIT scans/week
      if (accessCtx.scanLimitExceeded) {
        return res.status(429).json({
          ok: false,
          source: 'lead_engine',
          count: 0,
          region: result.region,
          outward: result.outward,
          leads: [],
          errors: [`Free scan limit reached (${FREE_WEEKLY_SCAN_LIMIT} per week). Upgrade to scan without limits.`],
          scanLimitExceeded: true,
          scansUsed: accessCtx.scansUsed,
          weeklyLimit: FREE_WEEKLY_SCAN_LIMIT,
        });
      }

      const persistence = await persistLeads(result.leads);
      const sourceBenchmark = await persistSourceBenchmarkRun({ result, trade, queryStartedAt, queryFinishedAt });
      const isPaid = accessCtx.tier === 'full';
      const leads = isPaid
        ? result.leads.map(l => ({ ...l, reasons: l.scoreReasons ?? [] }))
        : result.leads.slice(0, CONFIG.freeTierLimit).map(toFreePreviewLead);

      console.log('[leads/search]', { trade, outward: result.outward, radiusMiles, total: result.total, shown: leads.length, accessTier: accessCtx.tier, scansUsed: accessCtx.scansUsed, ms: Date.now() - started });
      return res.json({
        ok: true,
        source: 'lead_engine',
        count: leads.length,
        region: result.region,
        outward: result.outward,
        leads,
        lockedCount: isPaid ? 0 : Math.max(0, result.total - leads.length),
        accessMode: isPaid ? (FULL_ACCESS_TEST_MODE ? 'full-test-access' : 'paid') : 'free-preview',
        scansUsed: accessCtx.scansUsed,
        weeklyLimit: isPaid ? null : FREE_WEEKLY_SCAN_LIMIT,
        persistence,
        sourceBenchmark,
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
    // Paid intelligence: source confidence is blurred, contact signal locked to none
    sourceConfidence: previewSourceConfidence(lead.sourceConfidence),
    contactSignal: 'none' as const,
    source: lead.source,
    status: lead.status,
    revenueTier: score >= 80 ? 'gold' as const : score >= 55 ? 'worth-checking' as const : 'low-signal' as const,
    tradeMatch: String(lead.trade),
    score: previewScore(score),
    reasons: buildReasons(),
    distanceMiles: lead.distanceMiles,
    qualityLabel: undefined,
    // Locked paid fields — show upgrade teaser, not real data
    leadReadiness: undefined,
    recommendedAction: 'Upgrade to see recommended action',
    contactPath: undefined,
    whyThisIsAJob: undefined,
    opportunityAtoms: undefined,
    evidenceBadges: (lead.evidenceBadges ?? []).slice(0, 1), // Show at most one badge as teaser
    signalStack: undefined,
    signalClass: undefined,
    locked: true,
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

function buildReasons(): string[] {
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

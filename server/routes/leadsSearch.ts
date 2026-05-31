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

async function resolveAccessTier(req: Request): Promise<'full' | 'preview'> {
  if (FULL_ACCESS_TEST_MODE) return 'full';

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return 'preview';

  const token = authHeader.slice(7);

  // Owner always gets full access
  const ownerEmail = await resolveOwnerFromToken(token);
  if (ownerEmail) return 'full';

  try {
    const { supabase } = await import('../lib/supabase');
    if (!supabase) return 'preview';

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return 'preview';

    const { data: sub } = await supabase
      .from('subscriptions')
      .select('active, status')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (sub?.active || sub?.status === 'active') return 'full';
  } catch {
    // Supabase unavailable — fall through to preview
  }

  return 'preview';
}

export function registerLeadSearchRoute(app: Express) {
  app.post('/api/leads/search', rateLimit, async (req: Request, res: Response) => {
    const started = Date.now();
    try {
      const postcode = parseUkPostcode(req.body?.postcode);
      const trade = sanitizeTrade(req.body?.trade);
      const radiusMiles = sanitizeRadius(req.body?.radiusMiles);

      const queryStartedAt = new Date(started).toISOString();
      const [result, accessTier] = await Promise.all([
        scan({ postcode: postcode.postcode, trade, tier: 'paid', radiusMiles }),
        resolveAccessTier(req),
      ]);
      const queryFinishedAt = new Date().toISOString();
      const persistence = await persistLeads(result.leads);
      const sourceBenchmark = await persistSourceBenchmarkRun({ result, trade, queryStartedAt, queryFinishedAt });
      const isPaid = accessTier === 'full';
      const leads = isPaid
        ? result.leads.map(l => ({ ...l, reasons: l.scoreReasons ?? [] }))
        : result.leads.slice(0, CONFIG.freeTierLimit).map(toFreePreviewLead);

      console.log('[leads/search]', { trade, outward: result.outward, radiusMiles, total: result.total, shown: leads.length, accessTier, ms: Date.now() - started });
      return res.json({
        ok: true,
        source: 'lead_engine',
        count: leads.length,
        region: result.region,
        outward: result.outward,
        leads,
        lockedCount: isPaid ? 0 : Math.max(0, result.total - leads.length),
        accessMode: isPaid ? (FULL_ACCESS_TEST_MODE ? 'full-test-access' : 'paid') : 'free-preview',
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

/**
 * SERVER-SIDE contact gating — strips ALL direct contact fields and paid intelligence.
 * This is an explicit allowlist: only the fields listed here reach free/unauthenticated users.
 * Do NOT spread lead fields — new fields added to Lead type must be explicitly evaluated.
 * Paid fields stripped: contactPath, buyerName, url/sourceUrl, phone, email, contactName,
 * whatsappNumber, whyThisIsAJob, opportunityAtoms, signalStack, signalClass, leadReadiness,
 * recommendedAction, and exact score/confidence/value data.
 */
function toFreePreviewLead(lead: Lead) {
  const score = Number(lead.score ?? 0);
  return {
    // Identity (safe)
    id: lead.id,
    title: previewTitle(lead),
    trade: lead.trade,
    source: lead.source,
    status: lead.status,
    distanceMiles: lead.distanceMiles,
    qualityLabel: lead.qualityLabel,
    // Location blurred to outward code only — no full postcode
    location: lead.location,
    postcodeOutward: lead.postcodeOutward,
    // Dates stripped — reveal timeline only to paid
    publishedAt: '',
    deadlineAt: '',
    // Contact — all stripped
    buyer: '',
    // buyerName: STRIPPED
    // contactPath: STRIPPED (contains phone, email, script, contact strategy)
    // sourceUrl / url: STRIPPED
    url: '',
    // Value blurred
    estimatedValue: valuePreview(lead.estimatedValue),
    // Urgency blurred
    urgency: 'medium' as const,
    // Intelligence blurred
    sourceConfidence: previewSourceConfidence(lead.sourceConfidence),
    contactSignal: 'none' as const,
    score: previewScore(score),
    revenueTier: score >= 80 ? 'gold' as const : score >= 55 ? 'worth-checking' as const : 'low-signal' as const,
    tradeMatch: String(lead.trade),
    reasons: buildReasons(lead, score),
    evidenceBadges: (lead.evidenceBadges ?? []).slice(0, 1), // teaser only
    // Paid intelligence — all stripped
    // whyThisIsAJob: STRIPPED
    // opportunityAtoms: STRIPPED
    // signalStack: STRIPPED
    // signalClass: STRIPPED
    leadReadiness: undefined,
    recommendedAction: 'Upgrade to see recommended action',
    contactPath: undefined,
    whyThisIsAJob: undefined,
    opportunityAtoms: undefined,
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

function buildReasons(lead: Lead, _score: number): string[] {
  // Pass through scorer reasons — parseTradeReasons() on the client formats them
  // as trade-specific labels (e.g. "EV CHARGER — YOUR TRADE").
  // Filter internal/non-displayable reasons that parseTradeReasons already skips anyway.
  const reasons = (lead.scoreReasons ?? []).filter(
    (r) => !r.startsWith('Not your trade') && !r.startsWith('Source confidence') && !r.startsWith('Source class') && !r.startsWith('Proximity fit')
  );
  return reasons.length > 0 ? reasons : ['Verified signal — unlock buyer, value, and action route'];
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

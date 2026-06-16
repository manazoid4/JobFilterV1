import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Lead } from './types';

// Closes the quote-win feedback loop: real won/lost outcomes (captured by
// /api/leads/outcome into lead_outcomes) are aggregated here and turned into a
// small, bounded score adjustment that scan.ts applies during ranking.
//
// Philosophy: the deterministic scorer (scorer.ts) stays the backbone. This
// layer only *nudges* — sources/trades that actually convert get a small boost,
// score-reasons that correlate with wasted time get a small penalty. Learning
// never dominates: total swing is clamped to ±MAX_TOTAL_SWING.

const _url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const _key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const _db: SupabaseClient | null = _url && _key
  ? createClient(_url, _key, { auth: { persistSession: false } })
  : null;

// Statuses that mean the tradie actually acted on the lead (denominator).
const ACTIONED_STATUSES = new Set(['contacted', 'answered', 'quoted', 'won', 'lost', 'no_answer']);
// Statuses that mean wasted effort (used for toxic-reason detection).
const BAD_STATUSES = new Set(['lost', 'no_answer']);

// Guards against overfitting on tiny samples.
const MIN_TOTAL_OUTCOMES = 10;   // need this many actioned outcomes before adjusting anything
const MIN_GROUP_SAMPLES = 5;     // need this many in a source/trade/reason group to trust it
const DIMENSION_CLAMP = 6;       // max ± per dimension (source, trade)
const MAX_REASON_PENALTY = 6;    // max total penalty from toxic reasons
const MAX_TOTAL_SWING = 12;      // hard clamp on combined learned adjustment
const WINRATE_SCALE = 40;        // (groupWinRate - baseline) * scale → points
const TOXIC_MIN_LOSS_SHARE = 0.65; // reason counts as toxic if ≥65% of its outcomes were bad

interface GroupStat { actioned: number; won: number; }
interface ReasonStat { won: number; bad: number; }

interface LearnedWeights {
  totalActioned: number;
  baselineWinRate: number;
  bySource: Map<string, GroupStat>;
  byTrade: Map<string, GroupStat>;
  toxicReasons: Set<string>;
}

let _cache: LearnedWeights | null = null;
let _cacheExpiry = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

// Strip trailing "(+N)" / "(-N)", percentages and digits so reasons scored now
// match historically stored reason strings by category, not exact value.
function normaliseReason(reason: string): string {
  return String(reason ?? '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')   // drop "(+16)" etc
    .replace(/[\d.%£]+/g, '')    // drop numbers/percent/currency
    .replace(/[:,].*$/, '')      // drop everything after first colon/comma (the variable list)
    .replace(/\s+/g, ' ')
    .trim();
}

function emptyWeights(): LearnedWeights {
  return { totalActioned: 0, baselineWinRate: 0, bySource: new Map(), byTrade: new Map(), toxicReasons: new Set() };
}

export async function warmOutcomeLearningCache(): Promise<void> {
  if (Date.now() < _cacheExpiry && _cache !== null) return;
  if (!_db) {
    _cache = emptyWeights();
    _cacheExpiry = Date.now() + CACHE_TTL_MS;
    return;
  }
  try {
    const { data } = await _db
      .from('lead_outcomes')
      .select('status, source, trade, score_reasons_at_delivery')
      .order('updated_at', { ascending: false })
      .limit(2000);

    const weights = emptyWeights();
    const bySource = weights.bySource;
    const byTrade = weights.byTrade;
    const reasonStats = new Map<string, ReasonStat>();

    for (const row of data ?? []) {
      const status = String(row.status ?? '').toLowerCase();
      if (!ACTIONED_STATUSES.has(status)) continue;
      const won = status === 'won';
      const bad = BAD_STATUSES.has(status);

      weights.totalActioned += 1;
      bump(bySource, String(row.source ?? 'unknown'), won);
      bump(byTrade, String(row.trade ?? 'unknown'), won);

      // Reason toxicity uses only won vs bad rows (clear signal).
      if (won || bad) {
        const seen = new Set<string>();
        for (const raw of (row.score_reasons_at_delivery ?? [])) {
          const key = normaliseReason(raw);
          if (!key || seen.has(key)) continue;   // de-dupe within one lead
          seen.add(key);
          const rs = reasonStats.get(key) ?? { won: 0, bad: 0 };
          if (won) rs.won += 1; else rs.bad += 1;
          reasonStats.set(key, rs);
        }
      }
    }

    const totalWon = [...bySource.values()].reduce((s, g) => s + g.won, 0);
    weights.baselineWinRate = weights.totalActioned > 0 ? totalWon / weights.totalActioned : 0;

    for (const [reason, rs] of reasonStats) {
      const n = rs.won + rs.bad;
      if (n >= MIN_GROUP_SAMPLES && rs.bad / n >= TOXIC_MIN_LOSS_SHARE) {
        weights.toxicReasons.add(reason);
      }
    }

    _cache = weights;
    _cacheExpiry = Date.now() + CACHE_TTL_MS;
  } catch {
    _cache ??= emptyWeights();
    _cacheExpiry = Date.now() + 60_000;
  }
}

function bump(map: Map<string, GroupStat>, key: string, won: boolean): void {
  const g = map.get(key) ?? { actioned: 0, won: 0 };
  g.actioned += 1;
  if (won) g.won += 1;
  map.set(key, g);
}

function dimensionAdjustment(stat: GroupStat | undefined, baseline: number): number {
  if (!stat || stat.actioned < MIN_GROUP_SAMPLES) return 0;
  const winRate = stat.won / stat.actioned;
  const raw = Math.round((winRate - baseline) * WINRATE_SCALE);
  return Math.max(-DIMENSION_CLAMP, Math.min(DIMENSION_CLAMP, raw));
}

/**
 * Bounded score adjustment learned from real outcomes. Returns 0 points until
 * enough outcomes exist to be trustworthy. Reads only the warmed cache — sync,
 * safe to call inside the scan ranking map.
 */
export function getOutcomeAdjustment(
  lead: Pick<Lead, 'source' | 'trade' | 'scoreReasons'>
): { points: number; reasons: string[] } {
  const w = _cache;
  if (!w || w.totalActioned < MIN_TOTAL_OUTCOMES) return { points: 0, reasons: [] };

  let points = 0;
  const reasons: string[] = [];

  const srcAdj = dimensionAdjustment(w.bySource.get(String(lead.source ?? 'unknown')), w.baselineWinRate);
  if (srcAdj !== 0) {
    points += srcAdj;
    reasons.push(`Learned: ${lead.source} win-rate history (${srcAdj > 0 ? '+' : ''}${srcAdj})`);
  }

  const tradeAdj = dimensionAdjustment(w.byTrade.get(String(lead.trade ?? 'unknown')), w.baselineWinRate);
  if (tradeAdj !== 0) {
    points += tradeAdj;
    reasons.push(`Learned: ${lead.trade} conversion history (${tradeAdj > 0 ? '+' : ''}${tradeAdj})`);
  }

  if (w.toxicReasons.size) {
    const hit = new Set<string>();
    for (const r of lead.scoreReasons ?? []) {
      const key = normaliseReason(r);
      if (w.toxicReasons.has(key)) hit.add(key);
    }
    if (hit.size) {
      const penalty = Math.min(hit.size * 3, MAX_REASON_PENALTY);
      points -= penalty;
      reasons.push(`Learned: signals linked to wasted leads (-${penalty})`);
    }
  }

  points = Math.max(-MAX_TOTAL_SWING, Math.min(MAX_TOTAL_SWING, points));
  return { points, reasons };
}

/** Observability snapshot — lets the analytics route confirm the loop is closed. */
export function getOutcomeLearningSnapshot() {
  const w = _cache;
  if (!w) return { active: false, totalActioned: 0, baselineWinRate: 0, toxicReasonCount: 0 };
  return {
    active: w.totalActioned >= MIN_TOTAL_OUTCOMES,
    totalActioned: w.totalActioned,
    baselineWinRate: Math.round(w.baselineWinRate * 100),
    toxicReasonCount: w.toxicReasons.size,
  };
}

import type { Express, Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { resolveRequestAccess, type RequestAccess } from '../lib/requestAuth';
import { outwardFromPostcode, isKnownUkArea } from '../utils/postcode';

const OUTCOME_STATUSES = new Set([
  'delivered',
  'opened',
  'saved',
  'contacted',
  'answered',
  'quoted',
  'won',
  'lost',
  'no_answer',
]);

type OutcomeStatus = 'delivered' | 'opened' | 'saved' | 'contacted' | 'answered' | 'quoted' | 'won' | 'lost' | 'no_answer';

export function registerOutcomeReportRoute(app: Express) {
  app.post('/api/leads/outcome', async (req: Request, res: Response) => {
    try {
      const access = await resolveRequestAccess(req);
      if (!access) {
        return res.status(401).json({ ok: false, error: 'Authentication required.' });
      }
      if (!supabase) {
        return res.status(503).json({ ok: false, error: 'Supabase is not configured; outcome storage is disabled.' });
      }

      const { leadId, status } = req.body || {};
      const cleanStatus = String(status ?? '').toLowerCase() as OutcomeStatus;
      if (!leadId || !OUTCOME_STATUSES.has(cleanStatus)) {
        return res.status(422).json({ ok: false, error: 'leadId and valid status required.' });
      }

      const ownershipError = await verifyLeadMutationAccess(String(leadId), access);
      if (ownershipError) return res.status(ownershipError.status).json({ ok: false, error: ownershipError.error });

      const now = new Date().toISOString();
      const row = buildOutcomeRow(req.body, cleanStatus, now, access.userId);
      const { error } = await supabase
        .from('lead_outcomes')
        .upsert(row, { onConflict: 'lead_id' });

      if (error) {
        return res.status(500).json({ ok: false, error: error.message });
      }

      if (access.isOwner || (await leadIsOwnedBy(String(leadId), access.userId))) {
        await supabase
          .from('leads')
          .update({ status: cleanStatus, updated_at: now })
          .eq('id', leadId);
      }

      return res.json({ ok: true, status: cleanStatus });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Outcome failed.') });
    }
  });

  app.get('/api/wins/stats', async (req: Request, res: Response) => {
    try {
      if (!supabase) {
        return res.status(503).json({ ok: false, error: 'Supabase is not configured; stats are unavailable.' });
      }
      const outward = outwardFromPostcode(String(req.query.postcode || ''));
      const areaPrefix = outward.match(/^[A-Z]+/)?.[0] ?? '';
      if (!areaPrefix || !isKnownUkArea(areaPrefix)) {
        return res.json({ ok: true, available: false });
      }
      const { wonCount: totalWonCount, totalValue, suppressed } = await readWonStatsByArea(areaPrefix);

      let message: string;
      if (suppressed) {
        message = 'Wins logged in your area — details stay private until more trades track jobs. Be the next to log one.';
      } else if (totalWonCount > 0) {
        message = `${totalWonCount} trade${totalWonCount === 1 ? '' : 's'} in your area won jobs worth £${totalValue.toLocaleString()} via JobFilter`;
      } else {
        message = 'Be the first trade in your area to log a win.';
      }

      return res.json({
        ok: true,
        available: true,
        postcodeArea: areaPrefix,
        wonCount: totalWonCount,
        totalValue,
        totalValueFormatted: `£${totalValue.toLocaleString()}`,
        suppressed,
        message,
      });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Stats failed.') });
    }
  });

  app.get('/api/outcomes/weekly-analytics', async (_req: Request, res: Response) => {
    try {
      const rows = await readOutcomeRows();
      return res.json({
        ok: true,
        bestSourceByWinRate: bestByWinRate(rows, 'source'),
        bestTradeByWinRate: bestByWinRate(rows, 'trade'),
        bestPostcodeByWonValue: bestByWonValue(rows, 'postcode_outward'),
        worstFalsePositiveScoreReason: worstFalsePositiveReason(rows),
        leadScoreCalibration: scoreCalibration(rows),
      });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Analytics failed.') });
    }
  });

  app.post('/api/leads/flag', async (req: Request, res: Response) => {
    try {
      const access = await resolveRequestAccess(req);
      if (!access) {
        return res.status(401).json({ ok: false, error: 'Authentication required.' });
      }
      const { leadId, reason } = req.body || {};
      if (!leadId) return res.status(422).json({ ok: false, error: 'leadId required.' });

      if (supabase) {
        const ownershipError = await verifyLeadMutationAccess(String(leadId), access);
        if (ownershipError) return res.status(ownershipError.status).json({ ok: false, error: ownershipError.error });
        const now = new Date().toISOString();
        const { error } = await supabase
          .from('lead_outcomes')
          .upsert({ lead_id: String(leadId), user_id: access.userId, status: 'flagged', lost_reason: reason ?? null, updated_at: now }, { onConflict: 'lead_id' });
        if (error) return res.status(500).json({ ok: false, error: 'Flag could not be saved.' });
      } else {
        return res.status(503).json({ ok: false, error: 'Supabase is not configured; flag storage is disabled.' });
      }

      return res.json({ ok: true });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Flag failed.') });
    }
  });

  app.post('/api/leads/review-link', (req: Request, res: Response) => {
    try {
      const { customerName, trade } = req.body || {};
      const message = `Hi ${customerName || 'there'}, thanks for choosing us for your ${trade || 'trade'} work. If you're happy with the job, a quick Google review would mean the world — just paste your review link here before sending: [YOUR GOOGLE REVIEW LINK]`;
      return res.json({ ok: true, message });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Review link failed.') });
    }
  });

  app.get('/api/leads/summary', async (_req: Request, res: Response) => {
    try {
      const rows = await readOutcomeRows();
      const won = rows.filter((o) => o.status === 'won');
      const wonCount = won.length;
      const totalValue = won.reduce((sum, o) => sum + Number(o.won_value ?? 0), 0);
      return res.json({
        ok: true,
        wonCount,
        totalValue: totalValue > 0 ? `£${totalValue.toLocaleString()}` : 'N/A',
        monthlyCost: 39,
        summary: wonCount > 0
          ? `${wonCount} jobs won. ~£${totalValue.toLocaleString()} total. £39 founder subscription.`
          : 'No won jobs tracked yet. Start tracking outcomes to see your ROI.',
      });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Summary failed.') });
    }
  });
}

function buildOutcomeRow(body: any, status: OutcomeStatus, now: string, userId: string) {
  return {
    lead_id: String(body.leadId),
    user_id: userId,
    delivery_event_id: body.deliveryEventId ?? null,
    title: body.title ?? 'Unknown job',
    trade: body.trade ?? null,
    location: body.location ?? null,
    postcode_outward: body.postcodeOutward ?? body.postcode ?? null,
    status,
    won_value: toMoneyInt(body.wonValue ?? body.value),
    lost_reason: status === 'lost' ? body.lostReason ?? null : null,
    quote_value: toMoneyInt(body.quoteValue),
    contacted_at: status === 'contacted' || status === 'answered' || status === 'quoted' || status === 'won' ? body.contactedAt ?? now : body.contactedAt ?? null,
    quoted_at: status === 'quoted' || status === 'won' ? body.quotedAt ?? now : body.quotedAt ?? null,
    won_at: status === 'won' ? body.wonAt ?? now : null,
    lost_at: status === 'lost' ? body.lostAt ?? now : null,
    source_attribution: body.sourceAttribution ?? body.source ?? null,
    source: body.sourceAttribution ?? body.source ?? null,
    score_at_delivery: toMoneyInt(body.scoreAtDelivery ?? body.score),
    score_reasons_at_delivery: Array.isArray(body.scoreReasonsAtDelivery) ? body.scoreReasonsAtDelivery : [],
    contact_path_used: body.contactPathUsed ?? null,
    updated_at: now,
  };
}

async function verifyLeadMutationAccess(leadId: string, access: RequestAccess) {
  if (!supabase) return { status: 503, error: 'Supabase is not configured.' };

  const [{ data: lead, error: leadError }, { data: outcome, error: outcomeError }] = await Promise.all([
    supabase.from('leads').select('user_id').eq('id', leadId).maybeSingle(),
    supabase.from('lead_outcomes').select('user_id').eq('lead_id', leadId).maybeSingle(),
  ]);

  if (leadError || outcomeError) return { status: 500, error: 'Lead ownership could not be verified.' };
  if (!lead) return { status: 404, error: 'Lead not found.' };
  if (access.isOwner) return null;
  if (lead.user_id && lead.user_id !== access.userId) return { status: 403, error: 'Forbidden.' };
  if (outcome?.user_id && outcome.user_id !== access.userId) return { status: 403, error: 'Forbidden.' };
  return null;
}

async function leadIsOwnedBy(leadId: string, userId: string) {
  if (!supabase) return false;
  const { data } = await supabase.from('leads').select('user_id').eq('id', leadId).maybeSingle();
  return data?.user_id === userId;
}

const SMALL_AREA_PRIVACY_THRESHOLD = 3;

async function readWonStatsByArea(areaPrefix: string): Promise<{ wonCount: number; totalValue: number; suppressed: boolean }> {
  const client = supabase!;
  const areaFilter = `^${areaPrefix}[0-9]`;

  const distinctUsers = await countDistinctContributors(areaFilter, SMALL_AREA_PRIVACY_THRESHOLD);
  if (distinctUsers === 0) {
    return { wonCount: 0, totalValue: 0, suppressed: false };
  }
  if (distinctUsers < SMALL_AREA_PRIVACY_THRESHOLD) {
    return { wonCount: 0, totalValue: 0, suppressed: true };
  }

  const { data: aggData, error: aggError } = await (client as any)
    .from('lead_outcomes')
    .select('won_count:count(), won_value_sum:won_value.sum()')
    .eq('status', 'won')
    .filter('postcode_outward', 'imatch', areaFilter);

  if (aggError) throw new Error(aggError.message);
  const row = (aggData as any)?.[0] ?? {};
  const wonCount = Number(row.won_count ?? 0);
  const totalValue = Number(row.won_value_sum ?? 0);

  return { wonCount, totalValue, suppressed: false };
}

async function countDistinctContributors(areaFilter: string, target: number): Promise<number> {
  const client = supabase!;
  const seen: string[] = [];
  for (let i = 0; i < target; i++) {
    let query: any = (client as any)
      .from('lead_outcomes')
      .select('user_id')
      .eq('status', 'won')
      .filter('postcode_outward', 'imatch', areaFilter)
      .not('user_id', 'is', null)
      .limit(1);
    if (seen.length > 0) {
      query = query.not('user_id', 'in', `(${seen.join(',')})`);
    }
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    const userId = (data as any)?.[0]?.user_id;
    if (!userId) return seen.length;
    seen.push(userId);
  }
  return seen.length;
}

async function readOutcomeRows() {
  if (!supabase) return [] as any[];
  const { data, error } = await supabase
    .from('lead_outcomes')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1000);
  if (error) throw new Error(error.message);
  return data ?? [];
}

function toMoneyInt(value: unknown) {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

function bestByWinRate(rows: any[], key: string) {
  const groups = groupRows(rows, key);
  return [...groups.entries()]
    .map(([value, list]) => ({ value, total: list.length, wins: list.filter(row => row.status === 'won').length }))
    .filter(item => item.total > 0)
    .map(item => ({ ...item, winRate: Math.round((item.wins / item.total) * 100) }))
    .sort((a, b) => b.winRate - a.winRate || b.wins - a.wins)[0] ?? null;
}

function bestByWonValue(rows: any[], key: string) {
  const groups = groupRows(rows.filter(row => row.status === 'won'), key);
  return [...groups.entries()]
    .map(([value, list]) => ({ value, wonValue: list.reduce((sum, row) => sum + Number(row.won_value ?? 0), 0) }))
    .sort((a, b) => b.wonValue - a.wonValue)[0] ?? null;
}

function worstFalsePositiveReason(rows: any[]) {
  const lost = rows.filter(row => row.status === 'lost' || row.status === 'no_answer');
  const counts = new Map<string, number>();
  for (const row of lost) {
    for (const reason of row.score_reasons_at_delivery ?? []) {
      counts.set(reason, (counts.get(reason) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

function scoreCalibration(rows: any[]) {
  const scored = rows.filter(row => typeof row.score_at_delivery === 'number');
  const won = scored.filter(row => row.status === 'won');
  const bad = scored.filter(row => row.status === 'lost' || row.status === 'no_answer');
  return {
    avgWonScore: average(won.map(row => row.score_at_delivery)),
    avgBadScore: average(bad.map(row => row.score_at_delivery)),
    sampleSize: scored.length,
    recommendation: won.length && bad.length && (average(bad.map(row => row.score_at_delivery)) ?? 0) >= (average(won.map(row => row.score_at_delivery)) ?? 0)
      ? 'Reduce weight on reasons that appear in lost/no-answer outcomes and increase contact-path and source-evidence weights.'
      : 'Keep collecting outcomes before changing score weights materially.',
  };
}

function groupRows(rows: any[], key: string) {
  const groups = new Map<string, any[]>();
  for (const row of rows) {
    const value = String(row[key] ?? 'unknown');
    const list = groups.get(value) ?? [];
    list.push(row);
    groups.set(value, list);
  }
  return groups;
}

function average(values: number[]) {
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

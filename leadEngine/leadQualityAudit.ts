import type { AuditLabel, Lead } from './types';
import { scan } from './scan';
import { supabase } from '../server/lib/supabase';

const LAUNCH_PATCHES = [
  { patch: 'Birmingham/West Midlands', postcode: 'B1 1AA', outward: 'B1' },
  { patch: 'London', postcode: 'SW1A 1AA', outward: 'SW1A' },
  { patch: 'Manchester', postcode: 'M1 1AE', outward: 'M1' },
];

const AUDIT_TRADES = ['building', 'roofing', 'electrical'];

export async function runLeadQualityAudit() {
  const reports: Array<{ patch: string; trade: string; audited: number; report: ReturnType<typeof buildAuditReport> }> = [];
  for (const patch of LAUNCH_PATCHES) {
    for (const trade of AUDIT_TRADES) {
      const scanResult = await scan({ postcode: patch.postcode, trade, tier: 'paid', radiusMiles: 50 });
      const sourceBacked = scanResult.leads
        .filter(lead => lead.sourceUrl)
        .slice(0, 100);
      const labels = labelLeads(sourceBacked, trade);
      const report = buildAuditReport(labels);

      if (supabase) {
        const { data: run, error } = await supabase
          .from('lead_quality_audit_runs')
          .insert({
            run_week: weekStartIso(),
            patch: patch.patch,
            postcode_outward: scanResult.outward || patch.outward,
            trade,
            requested_count: 100,
            audited_count: labels.length,
            actionable_count: labels.filter(item => item.human_label === 'ACTIONABLE').length,
            report,
          })
          .select('id')
          .single();

        if (!error && run?.id && labels.length) {
          await supabase.from('lead_quality_audit_items').insert(labels.map(item => ({
            ...item,
            audit_run_id: run.id,
          })));
        }
      }

      reports.push({
        patch: patch.patch,
        trade,
        audited: labels.length,
        report,
      });
    }
  }
  return reports;
}

function labelLeads(leads: Lead[], requestedTrade: string) {
  const seen = new Set<string>();
  return leads.map(lead => {
    const label = classifyLead(lead, requestedTrade, seen);
    seen.add(`${lead.title.toLowerCase()}|${lead.postcodeOutward}`);
    return {
      lead_id: lead.id,
      source: lead.source,
      source_url: lead.sourceUrl ?? '',
      postcode_outward: lead.postcodeOutward,
      trade: String(lead.trade),
      score_at_audit: Math.round(Number(lead.score ?? 0)),
      human_label: label.human_label,
      reason: label.reason,
      contact_path: lead.contactPath ?? {},
      contact_path_used: lead.contactPath?.recommendedChannel ?? null,
    };
  });
}

function classifyLead(lead: Lead, requestedTrade: string, seen: Set<string>): { human_label: AuditLabel; reason: string } {
  const signature = `${lead.title.toLowerCase()}|${lead.postcodeOutward}`;
  if (seen.has(signature)) return { human_label: 'DUPLICATE', reason: 'Duplicate title/postcode within the audit set.' };
  if (lead.signalClass === 'internal_fallback' || lead.source === 'DirectorySignal') return { human_label: 'FAKE_OR_INTERNAL', reason: 'Internal fallback sources are excluded from sale readiness audits.' };
  if (!lead.sourceUrl) return { human_label: 'FAKE_OR_INTERNAL', reason: 'No source evidence URL.' };
  if (String(lead.trade) !== requestedTrade) return { human_label: 'WRONG_TRADE', reason: `Lead normalised as ${lead.trade}, not ${requestedTrade}.` };
  if (lead.contactPath?.recommendedChannel === 'do_not_contact_yet' || !lead.contactPath?.allowedChannels?.length) return { human_label: 'NO_CONTACT_PATH', reason: lead.contactPath?.reason ?? 'No practical contact path.' };
  if ((lead.score ?? 0) < 45) return { human_label: 'LOW_VALUE', reason: 'Score below action threshold after value/contact/source checks.' };
  if (lead.publishedAt) {
    const ageDays = (Date.now() - new Date(lead.publishedAt).getTime()) / 86_400_000;
    if (ageDays > 45) return { human_label: 'TOO_LATE', reason: `Source is ${Math.round(ageDays)} days old.` };
  }
  if (lead.urgency === 'low' && !lead.opportunityAtoms?.length) return { human_label: 'TOO_EARLY', reason: 'Planning/source signal exists but no near-term job atom was found.' };
  return { human_label: 'ACTIONABLE', reason: 'Source-backed, trade-matched, has contact path, and passes score threshold.' };
}

function buildAuditReport(items: Array<{ source: string; trade: string; score_at_audit: number; human_label: AuditLabel; reason: string }>) {
  const actionable = items.filter(item => item.human_label === 'ACTIONABLE');
  const bad = items.filter(item => item.human_label !== 'ACTIONABLE');
  return {
    trueActionableRateBySource: rateBy(items, 'source'),
    trueActionableRateByTrade: rateBy(items, 'trade'),
    averageScoreGood: average(actionable.map(item => item.score_at_audit)),
    averageScoreBad: average(bad.map(item => item.score_at_audit)),
    topFalsePositiveScoreReasons: topReasons(bad),
    scoringWeightsToChange: [
      'Increase contact-path weighting; downgrade no lawful/practical contact route harder.',
      'Boost source-backed opportunity atoms above title keyword matches.',
      'Reduce freshness confidence when source published date is missing or synthesized.',
      'Do not count internal fallback or exclusivity copy as evidence.',
    ],
  };
}

function rateBy(items: any[], key: string) {
  const groups = new Map<string, any[]>();
  for (const item of items) {
    const value = String(item[key] ?? 'unknown');
    const list = groups.get(value) ?? [];
    list.push(item);
    groups.set(value, list);
  }
  return [...groups.entries()].map(([value, list]) => ({
    value,
    audited: list.length,
    actionable: list.filter(item => item.human_label === 'ACTIONABLE').length,
    actionableRate: list.length ? Math.round((list.filter(item => item.human_label === 'ACTIONABLE').length / list.length) * 100) : 0,
  }));
}

function topReasons(items: Array<{ reason: string }>) {
  const counts = new Map<string, number>();
  for (const item of items) counts.set(item.reason, (counts.get(item.reason) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([reason, count]) => ({ reason, count }));
}

function average(values: number[]) {
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function weekStartIso() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

if (process.argv[1] && process.argv[1].endsWith('leadQualityAudit.ts')) {
  runLeadQualityAudit()
    .then(report => {
      console.log(JSON.stringify({ ok: true, report }, null, 2));
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

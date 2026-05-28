import type { ScanResult, SourceStats } from '../../leadEngine/types';
import { SOURCE_REGISTRY } from '../../leadEngine/sourceConfig';
import { supabase } from '../lib/supabase';

export type LaunchStatus = 'LAUNCH_READY' | 'WATCH_ONLY' | 'DO_NOT_SELL';

export async function persistSourceBenchmarkRun(args: {
  result: ScanResult;
  trade: string;
  queryStartedAt: string;
  queryFinishedAt: string;
}) {
  if (!supabase) return { stored: false, count: 0, provider: 'none' };

  const rows = Object.entries(args.result.sources).map(([sourceKey, stats]) => toSourceRunRow({
    sourceKey,
    stats,
    postcodeOutward: args.result.outward,
    trade: args.trade,
    queryStartedAt: args.queryStartedAt,
    queryFinishedAt: args.queryFinishedAt,
  }));

  const { error } = await supabase.from('source_benchmark_runs').insert(rows);
  if (error) {
    console.warn('[source_benchmark] insert failed:', error.message);
    return { stored: false, count: 0, provider: 'supabase', error: error.message };
  }

  await upsertTerritoryReadiness(args.result.outward, args.trade, args.result.sources);
  return { stored: true, count: rows.length, provider: 'supabase' };
}

function toSourceRunRow(args: {
  sourceKey: string;
  stats: SourceStats;
  postcodeOutward: string;
  trade: string;
  queryStartedAt: string;
  queryFinishedAt: string;
}) {
  const newest = args.stats.newestSourcePublishedAt ?? null;
  const sourceLatencyHours = newest
    ? Math.max(0, Math.round((Date.now() - new Date(newest).getTime()) / 36_000) / 100)
    : null;

  return {
    source_key: args.sourceKey,
    postcode_outward: args.postcodeOutward,
    trade: args.trade,
    query_started_at: args.queryStartedAt,
    query_finished_at: args.queryFinishedAt,
    fetched_count: args.stats.fetched ?? 0,
    passed_count: args.stats.passed ?? 0,
    dropped_count: args.stats.dropped ?? 0,
    newest_source_published_at: newest,
    source_latency_hours: sourceLatencyHours,
    fetch_latency_ms: args.stats.latencyMs ?? null,
    failed: Boolean(args.stats.failed),
    error: args.stats.error ?? null,
  };
}

export async function getSourceHealthSummary() {
  if (!supabase) return { provider: 'none', rows: [] as any[] };

  const { data, error } = await supabase
    .from('source_benchmark_runs')
    .select('*')
    .order('query_finished_at', { ascending: false })
    .limit(200);

  if (error) {
    console.warn('[source_benchmark] read failed:', error.message);
    return { provider: 'supabase', rows: [] as any[], error: error.message };
  }

  return { provider: 'supabase', rows: data ?? [] };
}

export function summarizeSourceHealth(rows: any[]) {
  const bySource = new Map<string, any[]>();
  for (const row of rows) {
    const list = bySource.get(row.source_key) ?? [];
    list.push(row);
    bySource.set(row.source_key, list);
  }

  return [...bySource.entries()].map(([sourceKey, sourceRows]) => {
    const latest = sourceRows[0];
    const lastSuccess = sourceRows.find(row => !row.failed);
    const fetched = sum(sourceRows, 'fetched_count');
    const passed = sum(sourceRows, 'passed_count');
    const failedCount = sourceRows.filter(row => row.failed).length;
    return {
      id: sourceKey,
      name: SOURCE_REGISTRY.find(source => source.key === sourceKey)?.label ?? sourceKey,
      status: lastSuccess ? 'live' : latest?.failed ? 'failing' : 'watch',
      fetched,
      passed,
      dropped: sum(sourceRows, 'dropped_count'),
      failedCount,
      lastRunAt: latest?.query_finished_at ?? null,
      lastSuccessfulRunAt: lastSuccess?.query_finished_at ?? null,
      newestSourcePublishedAt: latest?.newest_source_published_at ?? null,
      sourceLatencyHours: latest?.source_latency_hours ?? null,
      fetchLatencyMs: latest?.fetch_latency_ms ?? null,
      error: latest?.error ?? null,
    };
  });
}

function sum(rows: any[], key: string) {
  return rows.reduce((total, row) => total + Number(row?.[key] ?? 0), 0);
}

async function upsertTerritoryReadiness(postcodeOutward: string, trade: string, sources: Record<string, SourceStats>) {
  if (!supabase) return;

  const passedSources = Object.entries(sources).filter(([, stats]) => (stats.passed ?? 0) > 0 && !stats.failed).map(([source]) => source);
  const hasPlanning = passedSources.some(source => source.toLowerCase().includes('planning') || source.toLowerCase().includes('plan'));
  const hasEpc = passedSources.some(source => source.toLowerCase().includes('epc'));
  const hasTender = passedSources.some(source => source.toLowerCase().includes('contract') || source.toLowerCase().includes('fts') || source.toLowerCase().includes('pcs'));
  const passedTotal = Object.values(sources).reduce((total, stats) => total + Number(stats.passed ?? 0), 0);

  const launchStatus: LaunchStatus =
    passedTotal >= 12 && hasPlanning && (hasEpc || hasTender || passedSources.length >= 3)
      ? 'LAUNCH_READY'
      : passedTotal >= 3 && passedSources.length >= 1
        ? 'WATCH_ONLY'
        : 'DO_NOT_SELL';

  const coverageClass =
    !passedSources.length ? 'no planning data'
    : hasPlanning && hasEpc && hasTender ? 'multi-source viable'
    : hasPlanning && hasEpc ? 'planning + EPC'
    : hasPlanning && hasTender ? 'planning + tender'
    : hasPlanning ? 'planning only'
    : 'no planning data';

  const readinessScore = Math.min(100, passedTotal * 4 + passedSources.length * 12 + (hasPlanning ? 20 : 0) + (hasEpc ? 10 : 0) + (hasTender ? 10 : 0));
  await supabase.from('territory_metrics').upsert({
    postcode_outward: postcodeOutward,
    trade,
    signal_score: readinessScore,
    launch_status: launchStatus,
    coverage_class: coverageClass,
    last_successful_scan_at: new Date().toISOString(),
    source_freshness_score: readinessScore,
    minimum_weekly_leads_met: passedTotal >= 12,
    readiness_reason: `${passedTotal} passed leads across ${passedSources.length} live source(s): ${passedSources.join(', ') || 'none'}`,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'postcode_outward,trade' });
}

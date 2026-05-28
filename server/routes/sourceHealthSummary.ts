import type { Express, Request, Response } from 'express';
import { getAllSourcesConfig } from '../../leadEngine/sourceConfig';
import { rateLimit } from '../middleware/rateLimit';
import { getSourceHealthSummary, summarizeSourceHealth } from '../services/sourceBenchmark';

const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';

export function registerSourceHealthSummaryRoute(app: Express) {
  app.get('/api/source-health-summary', rateLimit, async (req: Request, res: Response) => {
    const isPaid = FULL_ACCESS_TEST_MODE || String(req.query.tier).toLowerCase() === 'paid';
    const runData = await getSourceHealthSummary();
    const runSummary = summarizeSourceHealth(runData.rows);
    const configuredSources = getAllSourcesConfig();
    const byId = new Map(runSummary.map(source => [source.id, source]));

    const sources = configuredSources.map(source => {
      const run = byId.get(source.key);
      return {
        id: source.key,
        name: source.label,
        configuredReadiness: source.readiness,
        enabled: source.effectiveEnabled,
        scoreBonus: source.effectiveScoreBonus,
        status: run?.status ?? (source.effectiveEnabled ? 'awaiting-run' : 'disabled'),
        fetched: run?.fetched ?? 0,
        passed: run?.passed ?? 0,
        dropped: run?.dropped ?? 0,
        failedCount: run?.failedCount ?? 0,
        lastRunAt: run?.lastRunAt ?? null,
        lastSuccessfulRunAt: run?.lastSuccessfulRunAt ?? null,
        newestSourcePublishedAt: run?.newestSourcePublishedAt ?? null,
        sourceLatencyHours: run?.sourceLatencyHours ?? null,
        fetchLatencyMs: run?.fetchLatencyMs ?? null,
        error: run?.error ?? null,
      };
    });

    const healthy = sources.filter(source => source.lastSuccessfulRunAt).length;
    const runnable = sources.filter(source => source.enabled).length;
    const healthScore = runnable ? Math.round((healthy / runnable) * 100) : 0;

    if (!isPaid) {
      return res.json({
        ok: true,
        tier: 'free',
        coverage: 'limited preview',
        healthScore,
        sourceCount: sources.length,
        healthyCount: healthy,
        gatedCount: Math.max(0, sources.length - healthy),
        lastChecked: new Date().toISOString(),
        lastSuccessfulRunAt: latestDate(sources.map(source => source.lastSuccessfulRunAt)),
        upgradeMessage: 'Upgrade for full source coverage, freshness, and launch-readiness detail',
      });
    }

    return res.json({
      ok: true,
      tier: 'paid',
      provider: runData.provider,
      healthScore,
      sourceCount: sources.length,
      healthyCount: healthy,
      lastChecked: new Date().toISOString(),
      sources,
      paidPlanningApiRecommendation: recommendPaidPlanningApi(sources),
    });
  });
}

function latestDate(values: Array<string | null>) {
  return values
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1) ?? null;
}

function recommendPaidPlanningApi(sources: Array<{ id: string; passed: number; lastSuccessfulRunAt: string | null; sourceLatencyHours: number | null }>) {
  const planningData = sources.find(source => source.id === 'PlanningData');
  const paidCandidates = sources.filter(source => ['PlanWire', 'PlanNexus', 'Searchland', 'PlanAPI'].includes(source.id));
  const activePaid = paidCandidates.filter(source => source.lastSuccessfulRunAt);

  if (activePaid.length) {
    const best = activePaid.sort((a, b) => b.passed - a.passed || Number(a.sourceLatencyHours ?? 9999) - Number(b.sourceLatencyHours ?? 9999))[0];
    return `Keep benchmarking ${best.id}; it is currently the strongest paid planning candidate by run-derived yield/freshness.`;
  }

  if (!planningData?.lastSuccessfulRunAt || planningData.passed < 10) {
    return 'Benchmark PlanWire or PlanNexus before selling exclusive territories; official free planning coverage is not yet enough on its own.';
  }

  return 'Do not buy paid planning access yet; keep weekly benchmarks running against PlanningData until coverage or freshness fails.';
}

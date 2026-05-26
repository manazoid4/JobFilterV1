import type { Express, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit';

// Aggregate source-health view. Free tier sees roll-up only.
// Paid tier (or FULL_ACCESS_TEST_MODE) sees per-source detail.
// Future: read agent 14's vault log for live uptime + 7d lead counts.

const SOURCES: Array<{ id: string; name: string; status: 'live' | 'coverage-pending' | 'key-required' | 'planned-cache'; confidence: number }> = [
  { id: 'planning-data', name: 'Planning Data API', status: 'live', confidence: 95 },
  { id: 'building-control', name: 'Council building-control registers', status: 'coverage-pending', confidence: 70 },
  { id: 'epc', name: 'Energy Performance Certificates', status: 'key-required', confidence: 85 },
  { id: 'land-registry', name: 'HM Land Registry Price Paid', status: 'planned-cache', confidence: 85 },
  { id: 'companies-house', name: 'Companies House', status: 'key-required', confidence: 80 },
];

const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';

export function registerSourceHealthSummaryRoute(app: Express) {
  app.get('/api/source-health-summary', rateLimit, (req: Request, res: Response) => {
    const isPaid = FULL_ACCESS_TEST_MODE || String(req.query.tier).toLowerCase() === 'paid';
    const total = SOURCES.length;
    const healthy = SOURCES.filter(s => s.status === 'live').length;
    const healthScore = total ? Math.round((healthy / total) * 100) : 0;
    const lastChecked = new Date().toISOString();

    if (!isPaid) {
      return res.json({
        ok: true,
        tier: 'free',
        coverage: 'limited preview',
        healthScore,
        sourceCount: total,
        healthyCount: healthy,
        gatedCount: total - healthy,
        lastChecked,
        upgradeMessage: 'Upgrade for full source coverage + uptime SLA',
      });
    }

    return res.json({
      ok: true,
      tier: 'paid',
      healthScore,
      sourceCount: total,
      healthyCount: healthy,
      lastChecked,
      sources: SOURCES.map(s => ({
        id: s.id,
        name: s.name,
        status: s.status,
        confidence: s.confidence,
        statusLabel:
          s.status === 'live' ? 'live'
          : s.status === 'key-required' ? 'configure API key'
          : s.status === 'coverage-pending' ? 'coverage pending'
          : 'cache planned',
      })),
    });
  });
}

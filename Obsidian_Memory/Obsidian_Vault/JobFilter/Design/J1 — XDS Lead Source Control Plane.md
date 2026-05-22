---
type: design-doc
project: JobFilter
created: 2026-05-22
status: design
inspiration: "[[2026-05-22-atlassian-layoff-syrakis]]"
tags: [jobfilter, design, source-engine, j1]
---

# J1 — XDS-style Lead Source Control Plane

## Why
Currently `functions/leadEngine/fetchers/*.ts` hardcodes source list, weights, key requirements. Add/remove/weight a source = code change → redeploy.

Borrowed from Envoy XDS: separate **config plane** from **data plane**. Sources hot-load from config. Operators add sources via config, not PR.

## Architecture

```
[Config Plane]                    [Data Plane]
GET /api/sources/config   ----->  leadEngine/scan()
  (returns SourceConfig[])         reads config, dispatches fetches
PUT /api/sources/config   ----->  in-memory cache, 60s TTL
  (admin-only, updates)
```

## SourceConfig shape

```ts
type SourceConfig = {
  id: string;
  fetcher: 'ContractsFinder' | 'PlanningData' | 'CompaniesHouse' | 'LandRegistry' | 'EPC' | 'DirectorySignal' | 'FTS' | 'PCS' | 'Sell2Wales';
  enabled: boolean;
  weight: number;       // 0-100, scoring contribution
  requiresKey?: string; // env var; if unset → status 'key-required'
  trades?: string[];    // limit to trades; empty = all
  regions?: string[];   // GB|England|Wales|Scotland|NI; empty = all
  rateLimit?: { per: 'minute'|'hour'|'day', max: number };
  notes?: string;
};
```

## Phases
1. Centralise: `functions/leadEngine/sources.config.ts` exports `SourceConfig[]`. No API yet.
2. Refactor `scan.ts` + fetchers to read from config.
3. Add `GET /api/sources/config` (read-only).
4. Wire agent 14 + `/api/start-signals/sources` to use same config.
5. **Later**: Supabase backing + admin PUT route + cache invalidation.

## Risks
- High blast radius. Do behind `USE_NEW_SOURCE_CONFIG` flag.
- Don't break free-tier preview ranking.

## Wins
- New sources = config entry, not PR
- Disable bad source w/o redeploy
- Health watchdog + scanner aligned

## Related
- [[2026-05-22-atlassian-layoff-syrakis]]
- [[n8n Agent Roster]]
- `functions/leadEngine/scan.ts`
- `functions/leadEngine/fetchers/`

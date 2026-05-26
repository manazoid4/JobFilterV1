---
type: design-doc
project: JobFilter
created: 2026-05-22
status: design
inspiration: "[[2026-05-22-atlassian-layoff-syrakis]]"
tags: [jobfilter, design, source-health, j6, paid-conversion]
---

# J6 — Source Health as Paid Product Surface

## Why
Agent 14 polls `/api/start-signals/sources` every 4h, logs to vault. Internal-only today.

Promote: turn internal metric into **paid-tier trust signal**. Free = teaser. Paid = full live dashboard.

## Free tier view
> **Lead sources today**
> 🟢 Coverage: limited preview
> ⚪️ 5 sources gated — upgrade for full coverage + uptime SLA

## Paid tier view
> **Lead sources — live**
> 🟢 ContractsFinder · 95% uptime · 247 leads last 7d
> 🟢 PlanningData · 98% uptime · 412 leads last 7d
> 🟡 CompaniesHouse · key configured · 156 leads last 7d
> 🟢 EPC · 94% uptime · 89 leads last 7d
> 🔴 LandRegistry · stale · last data 4d ago
>
> Health 87% · Last checked: 2min ago

## Steps
1. New `GET /api/source-health-summary`:
   - Free tier → `{ healthScore, sourceCount, healthyCount, lastChecked }`
   - Paid tier → full per-source detail (same auth gate as start-signals)
2. Frontend card on `src/pages/DashboardPage.tsx`
3. Free card = teaser + upgrade CTA
4. Paid card = live grid
5. PricingPage perk line: "Source health 99%+ guarantee"

## Data source
- **A**: poll `/api/start-signals/sources` per load — latency cost
- **B (recommended)**: agent 14 already writes vault md every 4h. Read latest + 7d lead counts from Agent Runs/. Cached.

## Wins
- Existing automation → revenue surface
- Trust signal vs competitors who hide sources
- Ongoing reason to stay subscribed (not one-time scan)

## Related
- [[2026-05-22-atlassian-layoff-syrakis]]
- `server/routes/startSignals.ts`
- `n8n-workflows/14-source-health-watchdog.json`
- [[n8n Agent Roster]]

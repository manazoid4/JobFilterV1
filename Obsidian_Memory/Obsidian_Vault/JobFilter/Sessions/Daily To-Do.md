# Daily To-Do

## 2026-08-02 (NightlyBuildAgent)

### COMPLETED ✓
- [x] Fix /api/alerts 404 — created server/routes/alerts.ts + registered in app.ts
- [x] Fix Vercel cron hourly→daily (Hobby plan limit was blocking deployment)
- [x] Add /api/alerts/send stub for the cron
- [x] Copy polish: FindJobsPage zero-scan banner clarity (no more contradictory copy)
- [x] Copy polish: FindJobsPage upgrade nudge — competitor names + "no shared auction"
- [x] Copy polish: PricingPage plan cards — specific copy, direct CTAs
- [x] Copy polish: DashboardPage alerts — disclaimer → action-first
- [x] UX fix: postcode error inline on mobile (was off-screen below trade presets)
- [x] PR #419 open: nightly/2026-08-02

### ALSO COMPLETED (continuation run) ✓
- [x] Remove dead Express alerts route (`server/routes/alerts.ts` deleted; App Router already handles /api/alerts correctly)
- [x] Remove broken import + registration from `server/app.ts`
- [x] Fix misleading DashboardPage alerts copy — now correctly states weekly is free, daily/instant require Full Access
- [x] tsc + build: PASS after cleanup
- [x] Pushed fix commit 24c7be8 to nightly/2026-08-02

### TODO — NEXT RUN
- [ ] Apply Supabase migration `20260802_lead_alerts_schema_fix.sql` — migrates instant→daily rows, adds `last_checked_at` + `radius_miles` columns, tightens frequency CHECK to daily/weekly only
- [ ] Verify "ADD TO CALENDAR →" on LeadDetailPage is accessible to free-tier users

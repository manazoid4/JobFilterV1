# Daily To-Do — JobFilter

Last updated: 2026-08-24b (NightlyBuildAgent second run)

## Completed This Run
- [x] npm run build — green
- [x] npx tsc --noEmit — clean
- [x] Trade-specific badge labels: parseTradeReasons fallback now uses title keywords / trade name
- [x] Scan counter zero-state copy: removed "submission context" jargon
- [x] DashboardPage: 5 copy fixes (alert headline, description, "Not actioned", win-review hint, empty chase state)
- [x] NEEDLE: found top 3 UX issues
- [x] BUILDER: removed duplicate trade dropdown from scan form (clearest fix)
- [x] PR #506 opened — nightly/2026-08-24-scoring-copy-fix

## Completed Previous Runs
- [x] HomePage hero copy — fear→proof→control, competitor names in ops strip (PR #499)
- [x] PricingPage CTAs — removed "START AFTER COVERAGE CHECK" friction, clear pricing (PR #499)
- [x] Scan counter (weekly reset, Monday midnight): DONE — FindJobsPage.tsx
- [x] WinStatsBanner with /api/wins/stats endpoint: DONE
- [x] Google Calendar ICS export: DONE — calendarExport.ts + LeadDetailPage.tsx
- [x] WhatsApp templates (quick_quote_offer + availability_check): DONE — chaseTemplates.ts
- [x] FindJobsPage "no scan yet" state — fear hook headline + removed SVG map illustration
- [x] WinStatsBanner zero-state — show placeholder when wonCount = 0
- [x] TrustCenterPage accuracy fix — removed false "exclusive territory lock" claim

## In Progress
- [ ] PR #506 — awaiting CI "check" status

## Next Run Priorities
1. **LeadDetailPage WhatsApp UX** — 3 scattered WhatsApp CTAs (lines 431, 576, 599-605) with no clear primary action. Consolidate to one entry point or add clear hierarchy (primary = sticky ActionBar, secondary = template section).
2. **PR backlog review** — 30+ open PRs against stale base commits (65508a9, 9df30ec). Most conflict with current main (5489192). User should review and close stale ones — agent cannot merge PRs without CI passing.
3. **DashboardPage "OPPORTUNITY ALERTS" micro-label** — still uses "OPPORTUNITY ALERTS" (line 124). Consider: "JOB ALERTS" — shorter, plain English.

## Known Issues
- node_modules not committed (expected) — fresh install needed each remote session
- Main branch protected: requires "check" CI status — all agent pushes must go via PR
- 30+ open PRs piling up — needs manual review/close of stale ones
- Obsidian vault Product docs absent from this repo clone (roadmap, key problems, design direction files not found — vault only has Changelog + Sessions)

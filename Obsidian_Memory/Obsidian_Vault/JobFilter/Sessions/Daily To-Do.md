# Daily To-Do — JobFilter

Last updated: 2026-08-24 (NightlyBuildAgent)

## Completed This Run
- [x] npm run build — green
- [x] npx tsc --noEmit — clean
- [x] FindJobsPage "no scan yet" state — fear hook headline + removed SVG map illustration
- [x] WinStatsBanner zero-state — show placeholder when wonCount = 0
- [x] TrustCenterPage accuracy fix — removed false "exclusive territory lock" claim
- [x] PR #504 opened — nightly/2026-08-24-copy-ux

## Completed Previous Runs
- [x] HomePage hero copy — fear→proof→control, competitor names in ops strip (PR #499)
- [x] PricingPage CTAs — removed "START AFTER COVERAGE CHECK" friction, clear pricing (PR #499)
- [x] Scan counter (weekly reset, localStorage-based): DONE — FindJobsPage.tsx
- [x] WinStatsBanner with /api/wins/stats endpoint: DONE
- [x] Google Calendar ICS export: DONE — calendarExport.ts + LeadDetailPage.tsx
- [x] WhatsApp templates (quick_quote_offer + availability_check): DONE — chaseTemplates.ts

## In Progress
- [ ] PR #504 — awaiting CI "check" status

## Next Run Priorities
1. Review PR #504 CI — merge if green
2. Copy polish: ForYourTradePage bottom CTA — verify WaitlistForm is wired to /api/waitlist (no fake flows)
3. Trade-specific scoring UX: fallback "Verified signal" badge label on lead cards is too vague — improve to show a trade-specific reason even without a parsed tradeMatch reason

## Known Issues
- node_modules not committed (expected) — fresh install needed each remote session
- Main branch protected: requires "check" CI status — all agent pushes must go via PR
- Obsidian vault Product docs absent from this repo clone (roadmap, key problems, design direction files were not found — vault only has Changelog + Sessions)

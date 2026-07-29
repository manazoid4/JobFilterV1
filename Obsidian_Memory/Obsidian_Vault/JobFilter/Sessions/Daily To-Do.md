# Daily To-Do

Last updated: 2026-07-29 (NightlyBuildAgent — run 2)

## Completed this run ✅

- [x] Build `GET /api/wins/stats` backend endpoint (WinStatsBanner was wired but API missing)
- [x] Fix scan-limit expired message — name specific upgrade value (buyer name, deadline, source link)
- [x] Fix scan-limit CTA copy — "SEE BUYER DETAILS — £39/MO →"
- [x] Fix pricing page billing ambiguity in priceNote
- [x] Fix Pilot plan body copy — remove internal jargon
- [x] Fix Pilot plan CTA — "START — £39/MO →"
- [x] Add "No credit card required" under Pilot CTA
- [x] Add SCAN FREE NOW CTA to coverage section (instruction + no action gap fixed)
- [x] Consolidate "no card" disclaimers in pricing hero
- [x] Consistent "SCAN FREE — NO CARD NEEDED →" label across all free CTAs
- [x] Fix wins API: cohort anonymisation (suppress value when wonCount < 3)
- [x] Fix wins API: replace 10k-capped row-fetch with two uncapped PostgREST aggregate queries (COALESCE semantics)
- [x] Verify LockedValue gating — toFreePreviewLead sets buyer/deadlineAt/url to '' so lock UI is always correct (no code change needed)

## Next run — top priorities

- [ ] **Fix duplicate trade select UX** — Remove `<select>` dropdown from FindJobsPage form (NEEDLE Issue 1). Preset buttons cover all 8 trades. Preset buttons should set state only, not trigger submit. Single "SCAN NOW →" submit path. File: `src/pages/FindJobsPage.tsx` lines 493–570.
- [ ] **Google Calendar ICS export** — `GET /api/leads/:id/calendar.ics` returning valid ICS. "ADD TO CALENDAR" link on LeadDetailPage. Both backend route and frontend link needed.
- [ ] **Verify wins API in production** — Check `WinStatsBanner` renders when real `lead_outcomes` rows exist with `status='won'`. Cohort anonymisation: value only shown when wonCount >= 3.

## Tier 1 features status

| Feature | Status |
|---|---|
| Scan counter (3 free/week, resets Monday) | ✅ BUILT |
| Won leaderboard (WinStatsBanner + /api/wins/stats) | ✅ BUILT + HARDENED (2026-07-29) |
| WhatsApp templates (quick_quote_offer + availability_check) | ✅ BUILT (pre-existing) |
| Google Calendar ICS export | ❌ TODO |
| Trade-specific scoring UX | ❌ TODO |

## Known issues / discoveries

- Vercel Hobby plan incompatible with `0 * * * *` cron in `vercel.json` (hourly `/api/alerts/send`). Pre-existing. Needs Pro plan upgrade or change to `@daily`.
- Duplicate trade-select UX issue in FindJobsPage (NEEDLE) — deferred to next run.
- LockedValue gating confirmed correct: API scrubs buyer/deadlineAt/url to '' for free-tier users in `toFreePreviewLead`. Codex P2 on this was a false positive.

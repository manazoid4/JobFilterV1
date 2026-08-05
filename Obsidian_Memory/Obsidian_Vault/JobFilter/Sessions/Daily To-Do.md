# Daily To-Do — JobFilter

Last updated: 2026-08-05 (NightlyBuildAgent)

## Completed This Run ✅

- [x] Build passes clean (after npm install in fresh container)
- [x] TypeScript clean — 0 errors
- [x] Confirmed all Tier 1 features already built (scan counter, ICS export, won leaderboard, WhatsApp templates, trade scoring)
- [x] Copy polish: HomePage hero — fear-first copy, competitor callout (BuildAlert, Planning Pipe)
- [x] Copy polish: PricingPage — label fix, FAQ direct language, plan card body shortened
- [x] Site health: FindJobsPage "WHY THIS SCORE?" button — bigger tap target, readable text, wider panel
- [x] Source mix label → "Verified signals" (consistent with signal language)
- [x] PR #439 created: https://github.com/manazoid4/JobFilterV1/pull/439
- [x] Vercel preview deployed: job-filter-v1-git-nightly-copy-polis-e374d0-manazir-s-projects1.vercel.app

## Next Run Priorities

1. **Competitor vs page for Planning Pipe** — `/vs/planning-pipe` page exists in routes but check content; BuildAlert comparison may also be thin
2. **EmptyScanReport component copy** — not reviewed this run; likely has weak "no results" messaging; apply fear → proof → control
3. **AlertQuickSetup API** — the `/api/alerts` POST endpoint wired in FindJobsPage needs verification; if it's broken, the alert CTA is a dead end
4. **Vault files**: create proper vault structure if deploying to new repo sessions regularly

## Known Issues / Watch List

- CI "Production runtime regression" step was still running at nightly build close — check if it passes
- package-lock.json has local changes (npm install) — stashed, not committed (correct behaviour)
- 2 moderate severity npm audit vulnerabilities present — not blocking but worth reviewing

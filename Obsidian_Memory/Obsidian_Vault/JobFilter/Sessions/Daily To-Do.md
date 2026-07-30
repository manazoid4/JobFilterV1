# Daily To-Do — JobFilter

## Last updated: 2026-07-30 (NightlyBuildAgent)

---

## COMPLETED THIS SESSION

- [x] Build passes (npm install required in fresh clone)
- [x] TypeScript: 0 errors
- [x] PricingPage copy polish — competitor differentiation, CTA clarity, "no credit card required"
- [x] FindJobsPage copy polish — exhausted-scan copy, upgrade nudge headline "WHO DO YOU CALL?"
- [x] Vercel cron fix — `/api/alerts/send` changed from `0 * * * *` (hourly) to `0 8 * * *` (daily) to fix Hobby plan limit
- [x] PR #410 opened — nightly/copy-polish-2026-07-30

---

## NEXT RUN — TOP 3 PRIORITIES

1. **Trade-specific scoring UX** — electricians should see "EV CHARGER — YOUR TRADE", "REWIRE" as highlighted badges; plumbers should see "BOILER", "BATHROOM FIT" etc. Currently `parseTradeReasons()` parses what's in the API response but the scoring engine may not emit specific enough trade keywords. Investigate `leadEngine/scorer.ts` to see if trade-specific reasons are generated per trade type, and tighten the keyword matching.

2. **LeadListPage copy** — the tracked leads list page (`/leads`) has minimal copy. Add a header nudge ("3 leads tracked this week — who have you chased?") and a won/lost counter strip. Increases engagement with the tracking feature.

3. **Pricing page competitor table** — add a compact 3-row comparison table (JobFilter vs Checkatrade vs MyBuilder vs Bark) to the pricing page. Rows: "What it covers", "Shared leads?", "Price". Hard-coded, no dynamic data. Already have `/vs/checkatrade`, `/vs/mybuilder`, `/vs/bark` pages — link from table. This is the highest-converting trust element missing from the pricing page.

---

## KNOWN ISSUES / WATCH LIST

- `vercel.json` cron was hourly — now daily at 8am UTC. If alerts need more frequency, must upgrade Vercel plan.
- Obsidian_Memory vault is gitignored in main repo — vault files committed to feature branches only, not persisted to main.
- `NEXT_PUBLIC_OPEN_ACCESS` env var controls scan limits — confirm it's set to `'false'` in production.

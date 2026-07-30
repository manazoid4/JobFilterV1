# Daily To-Do — JobFilter

## Last updated: 2026-07-30 (NightlyBuildAgent — session 2)

---

## COMPLETED THIS SESSION (session 2 continuation)

- [x] Codex P1 (vercel.json): renamed DashboardPage `instant` option from "HOURLY SOURCE CHECK" → "DAILY SOURCE CHECK"; inline active-alert text "Hourly check" → "Daily check"; `alert-delivery-contract-regression.mjs` updated to assert `'0 8 * * *'` and `/DAILY SOURCE CHECK/`
- [x] Codex P2 (PricingPage.tsx): updated `package-copy-regression.mjs` to match current copy (`'you pay for qualification, evidence and workflow'` lowercase, `'Results vary by trade, area and timing'`); both assertions pass
- [x] All 4 Codex review comments on PR #410 replied to (2 outdated + 2 active)
- [x] Commit b22b8a0 pushed to nightly/copy-polish-2026-07-30
- [x] Vercel build triggered (awaiting green)

---

## NEXT RUN — TOP 3 PRIORITIES

1. **Trade-specific scoring UX** — electricians should see "EV CHARGER — YOUR TRADE", "REWIRE" as highlighted badges; plumbers should see "BOILER", "BATHROOM FIT" etc. Currently `parseTradeReasons()` parses what's in the API response but the scoring engine may not emit specific enough trade keywords. Investigate `leadEngine/scorer.ts` to see if trade-specific reasons are generated per trade type, and tighten the keyword matching.

2. **LeadListPage copy** — the tracked leads list page (`/leads`) has minimal copy. Add a header nudge ("3 leads tracked this week — who have you chased?") and a won/lost counter strip. Increases engagement with the tracking feature.

3. **Pricing page competitor table** — add a compact 3-row comparison table (JobFilter vs Checkatrade vs MyBuilder vs Bark) to the pricing page. Rows: "What it covers", "Shared leads?", "Price". Hard-coded, no dynamic data. Already have `/vs/checkatrade`, `/vs/mybuilder`, `/vs/bark` pages — link from table. This is the highest-converting trust element missing from the pricing page.

---

## KNOWN ISSUES / WATCH LIST

- `vercel.json` cron is daily at 8am UTC (Hobby plan limit). DashboardPage now correctly labels the `instant` alert frequency option "DAILY SOURCE CHECK". If hourly checks are needed in future, must upgrade Vercel plan and revert regression test + dashboard label.
- Obsidian_Memory vault is gitignored in main repo — vault files committed to feature branches only, not persisted to main.
- `NEXT_PUBLIC_OPEN_ACCESS` env var controls scan limits — confirm it's set to `'false'` in production.
- PR #410 (nightly/copy-polish-2026-07-30) open — awaiting CI green and owner merge.

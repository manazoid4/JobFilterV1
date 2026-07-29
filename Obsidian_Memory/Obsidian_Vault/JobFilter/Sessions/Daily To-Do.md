# Daily To-Do — JobFilter

Last updated: 2026-07-29 (NightlyBuildAgent) — CI PASSED ✅

## Completed this run ✅
- [x] Trade-specific scoring UX: electrician sees EV CHARGER/REWIRE/EICR, plumber sees BOILER WORK/BATHROOM FIT in WHY? popup
- [x] Nav CTA "CHECK FTS FREE" → "SCAN FOR JOBS FREE →" (FTS acronym removed)
- [x] All upgrade CTAs unified to "SEE WHO TO CALL — £39/MO →"
- [x] 0-scans-remaining message rewritten from B2B jargon to plain tradesman language
- [x] PricingPage: "No credit card required" inline next to SCAN FREE CTA
- [x] PricingPage: Checkatrade/Bark competitor callout added
- [x] NEEDLE site health check — 3 issues identified
- [x] 9 Codex P2 review comments addressed across 5 push rounds; CI green ✅

## High Priority — Next Run 🔴
- [ ] **Homepage audience split**: hero says "5–25-person contractors" but scanner is sole-trader UX — decide on one audience and align copy throughout
- [ ] **Scan=0 empty state**: when all free scans used, scanner form is still visible but confusing — consider a "here's what you found, upgrade to call them" summary instead
- [ ] **Vault directory**: Obsidian_Memory not committed to repo — agent needs to create on each run (no persistence between sessions)

## Medium Priority 🟡
- [ ] **WinStatsBanner**: component and API exist but `wonCount` will be 0 for most users early on — add fallback copy ("Be the first in your area to log a win")
- [ ] **Upgrade prompt reduction**: currently 4 upgrade prompts on one scroll path — reduce to 2 max (one mid-list, one end-of-results)
- [ ] **Trade-specific page copy**: ForYourTradePage per-trade example leads use sample data — wire to live scan results for selected trade

## Discovered this run — do not break
- `parseTradeReasons` is called in `LeadResultCard` inside `FindJobsPage.tsx` — NOT in the `LeadCard` component in `src/components/LeadCard.tsx`. Any changes to scoring display on the leads list page must go in `FindJobsPage.tsx`.
- `GENERIC_TRADE_LABELS` is now a per-trade `Record<string, Set<string>>` — keys are the exact scorer keyword tokens (e.g. `PLUMB — YOUR TRADE`, not `PLUMBING — YOUR TRADE`). Must match `leadEngine/scorer.ts` TRADE_KEYWORDS high-tier strings.
- `submittedTrade` state captures the trade at scan time; `scanTrade={submittedTrade ?? trade}` passed to `LeadResultCard` — do not revert to `trade` (mutable form state).
- `vercel.json` has hourly cron (`0 * * * *`) which fails Hobby plan preview deployments — pre-existing, not blocking the required `check` CI job.
- Vault directory is NOT in the repo on clone — agent must `mkdir -p` on each run.

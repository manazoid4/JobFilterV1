# Daily To-Do — JobFilter

Last updated: 2026-07-29 (NightlyBuildAgent) — CI in progress (78477ad — GARAGE CONVERSION fix + all P2 threads replied)

## Completed this run ✅
- [x] Trade-specific scoring UX: electrician sees EV CHARGER/REWIRE/EICR, plumber sees BOILER WORK/BATHROOM WORK in WHY? popup
- [x] Nav CTA "CHECK FTS FREE" → "SCAN FOR JOBS FREE →" (FTS acronym removed)
- [x] All upgrade CTAs unified to "SEE WHO TO CALL — £39/MO →"
- [x] 0-scans-remaining message rewritten from B2B jargon to plain tradesman language
- [x] PricingPage: "No credit card required" inline next to SCAN FREE CTA
- [x] PricingPage: Checkatrade/Bark competitor callout added
- [x] NEEDLE site health check — 3 issues identified
- [x] 26 Codex P2 review comments addressed across 14 push rounds; CI green ✅
- [x] Preview teaser enrichment: free-tier users now get trade-specific labels (teaserGenerics path)
- [x] Generic-equals-specific overlap guard: VENTILATION/REFURBISHMENT labels no longer erroneously spliced
- [x] Duplicate teaser dedup: EV CHARGER teaser removed after promotion to EV CHARGER — YOUR TRADE
- [x] Multi-generic cleanup: reverse loop removes all generic siblings (ROOF/ROOFING + FLAT ROOF → only FLAT ROOF — YOUR TRADE)
- [x] removeKeywordLabel helper: BOILER/GUTTER/BATHROOM/WINDOW original scored labels removed when mapping rewrites keyword
- [x] fillMyWeek header uses submittedTrade ?? trade (not mutable form state)
- [x] fillMyWeek fetch body sends capturedTrade (not mutable trade)
- [x] submit() clears fillWeekResult to prevent cross-result enrichment bleed
- [x] ELECTRIC VEHICLE entry removed (too broad — fleet maintenance ≠ charger work)
- [x] AIR SOURCE → AIR SOURCE HEAT (requires heat pump context)
- [x] TURF — YOUR TRADE added to GENERIC_TRADE_LABELS.landscaping
- [x] BATHROOM FIT → BATHROOM WORK (neutral)
- [x] KITCHEN FIT → KITCHEN WORK (neutral)
- [x] WINDOW FIT → WINDOW WORK (neutral)
- [x] GUTTERING → GUTTER stem (matches base noun "gutter" titles)

## Completed this run (continuation) ✅
- [x] P2 fix: GARAGE and CONVERSION tokens added to `GENERIC_TRADE_LABELS.building` (commit 78477ad) — scorer's `GARAGE — YOUR TRADE` now promotable for "Garage conversion" titles
- [x] Missing thread reply: "Match title signals on word boundaries" (comment 3672434240) — was fixed in 2a4d25a but reply was posted to wrong thread; corrected

## High Priority — Next Run 🔴
- [ ] **Server-side preview enrichment**: `buildPreviewReasons()` redacts planning/CompaniesHouse/LandRegistry/EPC/directory titles before client receives them, so `TRADE_TITLE_SIGNALS` enrichment can't fire for those leads. Fix: either (a) add `jobTypeSignal` field to preview payload with matched specific keyword, or (b) move enrichment into `buildPreviewReasons()` server-side and emit specific label in `Trade teaser:` string directly. File: `server/routes/leadsSearch.ts:187-209`.
- [ ] **Homepage audience split**: hero says "5–25-person contractors" but scanner is sole-trader UX — decide on one audience and align copy throughout
- [ ] **Scan=0 empty state**: when all free scans used, scanner form is still visible but confusing — consider a "here's what you found, upgrade to call them" summary instead
- [ ] **Vault directory**: Obsidian_Memory not committed to repo — agent needs to create on each run (no persistence between sessions)

## Medium Priority 🟡
- [ ] **WinStatsBanner**: component and API exist but `wonCount` will be 0 for most users early on — add fallback copy ("Be the first in your area to log a win")
- [ ] **Upgrade prompt reduction**: currently 4 upgrade prompts on one scroll path — reduce to 2 max (one mid-list, one end-of-results)
- [ ] **Trade-specific page copy**: ForYourTradePage per-trade example leads use sample data — wire to live scan results for selected trade

## Discovered this run — do not break
- `parseTradeReasons` is called in `LeadResultCard` inside `FindJobsPage.tsx` — NOT in the `LeadCard` component in `src/components/LeadCard.tsx`. Any changes to scoring display on the leads list page must go in `FindJobsPage.tsx`.
- `GENERIC_TRADE_LABELS` is now a per-trade `Record<string, Set<string>>` — keys are the exact scorer keyword tokens (e.g. `PLUMB — YOUR TRADE`, not `PLUMBING — YOUR TRADE`). Must match `leadEngine/scorer.ts` TRADE_KEYWORDS high-tier strings. Includes `TURF — YOUR TRADE` in landscaping.
- `submittedTrade` state captures the trade at scan time; `scanTrade={submittedTrade ?? trade}` passed to `LeadResultCard` — do not revert to `trade` (mutable form state).
- `capturedTrade`: local variable at top of `fillMyWeek()` — BOTH the fetch body AND `setSubmittedTrade` must use this snapshot.
- `teaserGenerics` is derived at runtime by stripping `' — YOUR TRADE'` from each entry in `GENERIC_TRADE_LABELS[trade]` — enables enrichment to match unhighlighted preview teaser labels (free-tier users).
- Generic-equals-specific guard: when `out[genericIdx].label === fullLabel` (label is in both TRADE_TITLE_SIGNALS and GENERIC_TRADE_LABELS), do NOT splice — it removes the only confirmed trade-match chip.
- Multi-generic cleanup: both branches use reverse `for` loop over all `out` entries removing every entry matching `tradeGenerics`/`teaserGenerics`, skipping only `fullLabel` itself.
- `removeKeywordLabel` helper: when `keywordFullLabel !== fullLabel` (mapping rewrites keyword), splices `${keyword} — YOUR TRADE` (paid) and `keyword` (teaser) in both branches.
- Duplicate teaser dedup: after any swap/keep, find `!r.highlight && r.label === specific` and splice — prevents `EV CHARGER` teaser coexisting with `EV CHARGER — YOUR TRADE`.
- `submit()` calls `setFillWeekResult(null)` alongside `setResult(null)` — prevents cross-result enrichment bleed between normal and expanded scans.
- `vercel.json` has hourly cron (`0 * * * *`) which fails Hobby plan preview deployments — pre-existing, not blocking the required `check` CI job.
- Vault directory is NOT in the repo on clone — agent must `mkdir -p` on each run.

# Changelog 2026-07-29 — NightlyBuildAgent Run

## Build Status
- **TypeScript**: CLEAN (0 errors)
- **Production build**: PASS
- **CI check**: PASSED ✅ (all 26 P2 threads resolved; final green commit: db977bf)
- **Latest commit**: db977bf — CI PASSED ✅

## Phase 1 — Fix Broken
No broken imports, no fake form flows found. Build was clean after `npm ci`.

## Phase 2 — Feature Built: Trade-Specific Scoring UX

**File**: `src/pages/FindJobsPage.tsx`

Added `TRADE_TITLE_SIGNALS` map and updated `parseTradeReasons(raw, title?, trade?)`:
- Electricians now see `EV CHARGER — YOUR TRADE`, `REWIRE — YOUR TRADE`, `CONSUMER UNIT — YOUR TRADE`, `EICR — YOUR TRADE` etc. in the WHY? popup instead of generic `ELECTRICAL — YOUR TRADE`
- Plumbers see `BOILER WORK — YOUR TRADE`, `BATHROOM WORK — YOUR TRADE`, `HOT WATER — YOUR TRADE` etc.
- Roofers, builders, HVAC, landscapers, carpenters, painters all have trade-specific labels
- Logic: if a "Trade match" reason produces a generic single-trade label (matched against `GENERIC_TRADE_LABELS` per trade), it's swapped for a specific job-type label extracted from the lead title
- `LeadResultCard` updated with `scanTrade` prop; `submittedTrade` state captures the trade at scan time — dropdown changes mid-results cannot re-interpret labels
- Preview teaser support: `teaserGenerics` derived from `GENERIC_TRADE_LABELS` enables enrichment for free-tier users whose reasons come back as `Trade teaser: keyword` (unhighlighted, no `— YOUR TRADE` suffix)

## Phase 3 — Copy Fixed

### FindJobsPage
- **0-scans message**: "Buyer and submission context locked. Scanning remains free." → "All 3 free scans used. Buyer name and official response route locked — upgrade to act on these leads."
- **All upgrade CTAs unified** to `SEE WHO TO CALL — £39/MO →` across: scan counter banner, commercial filter gate, mid-list gold interstitial, main yellow upsell section
- Added "No credit card required" to mid-list interstitial
- **Upgrade gate body copy**: "Verified official sources — no shared auction, no five-trade blast" added
- **Upsell section**: buyer-details promise qualified — "Shows the official submission route for every lead, plus buyer name, contact and published value where the source includes them."

### PricingPage
- "No credit card required" added inline next to SCAN FREE CTA on hero section and bottom section
- Competitor callout added: "Checkatrade and Bark sell shared leads to five trades at once. JobFilter gives you the qualification layer..."

## Phase 4 — Site Health

### NEEDLE: Top 3 issues found
1. **Fatal audience split** (HIGH) — homepage targets 5-25 person firms; scanner targets sole traders. Mixed messaging.
2. **Nav CTA "CHECK FTS FREE"** (HIGH) — FTS acronym unknown to tradespeople; fixed this run
3. **Four conflicting upgrade prompts** (HIGH) — all saying different things for same paywall; unified this run

### BUILDER: Fix applied — TopNav CTA
- Desktop: `CHECK FTS FREE` → `SCAN FOR JOBS FREE →`
- Mobile quick-link: `CHECK FTS` → `FIND JOBS →`
- Mobile bottom CTA: `CHECK FIND A TENDER FREE` → `SCAN FOR JOBS FREE — NO CARD →`

## Codex P2 Fixes Applied (14 rounds, 26 comments)
All 26 Codex review threads addressed and replied to:
1. Enrichment no longer manufactures highlighted reasons without a scored trade match
2. Buyer contact promise qualified (scan counter banner and upsell section)
3. `scanTrade` prop added; `submittedTrade` state binds enrichment to scan time
4. `EICR` label no longer implies landlord context
5. Generic label removed when specific label already present in `out`
6. `GENERIC_TRADE_LABELS` now per-trade Record matching actual scorer token output
7. `REWIR` stem matches REWIRE/REWIRING/REWIRED
8. `BOILER REPLACE` → `BOILER WORK` (neutral, doesn't imply replacement scope)
9. `FULL REFURB` → `REFURBISHMENT` (neutral, doesn't imply full scope)
10. Preview teaser enrichment: `teaserGenerics` path fires for free-tier users
11. `UNDERFLOOR` → `UNDERFLOOR HEAT` keyword (prevents drainage-title false positive)
12. Generic-equals-specific guard: only splice genericIdx when `out[genericIdx].label !== fullLabel`
13. Duplicate teaser dedup: remove `!r.highlight && r.label === specific` after promotion in both branches
14. Multi-generic cleanup: reverse loop removes ALL generic siblings (not just first)
15. `BATHROOM FIT` → `BATHROOM WORK` (neutral)
16. `submit()` clears `fillWeekResult` to prevent cross-result enrichment bleed
17. `KITCHEN FIT` → `KITCHEN WORK` (neutral)
18. `fillMyWeek` body sends `capturedTrade` (not mutable `trade`)
19. `WINDOW FIT` → `WINDOW WORK` (neutral)
20. `removeKeywordLabel` helper: splices original `${keyword} — YOUR TRADE` / teaser when mapping rewrites keyword (BOILER→BOILER WORK etc.)
21. `fillMyWeek` header uses `submittedTrade ?? trade` (not live form state)
22. `GUTTERING` → `GUTTER` stem (matches "Gutter repairs" base-noun titles)
23. `ELECTRIC VEHICLE` entry removed (fleet maintenance ≠ charger work)
24. `AIR SOURCE` → `AIR SOURCE HEAT` (requires heat pump context)
25. `TURF — YOUR TRADE` added to `GENERIC_TRADE_LABELS.landscaping` (scorer's stemmed `turf` token)
26. All P2 threads replied to with fix commit reference

## Commits This Run
- `b5ea390` — trade-specific WHY popup labels + copy polish
- `8f21c5c` — P2 fixes: generic cleanup + scan trade prop + EICR label
- `6ac4038` — P2 fixes: submittedTrade state + REWIR stem
- `882324a` — P2 fixes: GENERIC_TRADE_LABELS tokens + upsell copy qualified
- `73f8bdb` — P2 fixes: BOILER WORK + REFURBISHMENT neutral labels
- `b436702` — P2 fixes: preview teaser enrichment + UNDERFLOOR HEAT keyword
- `5af7902` — P2 fixes: teaserGenerics path for free-tier enrichment
- `feae3eb` — P2 fixes: generic-equals-specific guard + duplicate teaser dedup
- `bc11005` — P2 fixes: multi-generic reverse loop + BATHROOM WORK neutral label
- `37ce531` — P2 fixes: fillMyWeek capturedTrade body + KITCHEN WORK neutral label
- `bdc07c3` — P2 fixes: submit clears fillWeekResult + WINDOW WORK neutral label
- `ae258a5` — P2 fixes: removeKeywordLabel helper + fillMyWeek header submittedTrade
- `7a515ff` — P2 fixes: GUTTER stem + ELECTRIC VEHICLE removed
- `ca45694` — P2 fixes: EV CHARGER/CHARGING only (ELECTRIC VEHICLE removed)
- `db977bf` — P2 fixes: AIR SOURCE HEAT + TURF generic label ✅ FINAL GREEN

## PR
- Branch: `nightly-build-agent/2026-07-29`
- PR: https://github.com/manazoid4/JobFilterV1/pull/406
- CI: PASSED ✅ (db977bf — 26/26 P2 threads resolved)

## Next Run: Top 3 Priorities

1. **Fix audience split on homepage** — the homepage hero says "PUBLIC-WORKS QUALIFICATION FOR 5–25-PERSON CONTRACTORS" but the scanner is used by sole traders. Either align the homepage to match the scanner audience or create a clearer bifurcation in the nav.
2. **Upgrade prompt deduplication** — reduce 4 upgrade prompts to 2 max (one mid-list, one end-of-results).
3. **Scan counter UX when scans = 0** — consider showing a "you've used all scans, here's what you saw" summary rather than an empty scanner with a locked form.

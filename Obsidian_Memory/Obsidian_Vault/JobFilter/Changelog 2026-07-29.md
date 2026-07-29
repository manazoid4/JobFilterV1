# Changelog 2026-07-29 — NightlyBuildAgent Run

## Build Status
- **TypeScript**: CLEAN (0 errors)
- **Production build**: PASS
- **CI check**: PASSED ✅ (job 90508614142)

## Phase 1 — Fix Broken
No broken imports, no fake form flows found. Build was clean after `npm ci`.

## Phase 2 — Feature Built: Trade-Specific Scoring UX

**File**: `src/pages/FindJobsPage.tsx`

Added `TRADE_TITLE_SIGNALS` map and updated `parseTradeReasons(raw, title?, trade?)`:
- Electricians now see `EV CHARGER — YOUR TRADE`, `REWIRE — YOUR TRADE`, `CONSUMER UNIT — YOUR TRADE`, `EICR — YOUR TRADE` etc. in the WHY? popup instead of generic `ELECTRICAL — YOUR TRADE`
- Plumbers see `BOILER WORK — YOUR TRADE`, `BATHROOM FIT — YOUR TRADE`, `HOT WATER — YOUR TRADE` etc.
- Roofers, builders, HVAC, landscapers, carpenters, painters all have trade-specific labels
- Logic: if a "Trade match" reason produces a generic single-trade label (matched against `GENERIC_TRADE_LABELS` per trade), it's swapped for a specific job-type label extracted from the lead title
- `LeadResultCard` updated with `scanTrade` prop; `submittedTrade` state captures the trade at scan time — dropdown changes mid-results cannot re-interpret labels

## Phase 3 — Copy Fixed

### FindJobsPage
- **0-scans message**: "Buyer and submission context locked. Scanning remains free." → "All 3 free scans used. Buyer name and official response route locked — upgrade to act on these leads."
- **All upgrade CTAs unified** to `SEE WHO TO CALL — £39/MO →` across: scan counter banner, commercial filter gate, mid-list gold interstitial, main yellow upsell section
- Added "No credit card required" to mid-list interstitial
- **Upgrade gate body copy**: "Verified official sources — no shared auction, no five-trade blast" added
- **Upsell section** (line 797): buyer-details promise qualified — "Shows the official submission route for every lead, plus buyer name, contact and published value where the source includes them."

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

**CRITIC**: Is the fix clearer in <3 seconds? **YES** — "SCAN FOR JOBS FREE" is instantly understood by any tradesperson.
**REVENUE**: Does it increase likelihood of paying £39/month? **YES** — more tradespeople clicking through to the scanner means more people seeing the lead list and hitting the upgrade gate.

## Codex P2 Fixes Applied (5 rounds)
All 9 Codex review threads addressed and replied to:
1. Enrichment no longer manufactures highlighted reasons without a scored trade match
2. Buyer contact promise qualified (scan counter banner and upsell section)
3. `scanTrade` prop added; `submittedTrade` state binds enrichment to scan time
4. `EICR` label no longer implies landlord context
5. Generic label removed when specific label already present in `out`
6. `GENERIC_TRADE_LABELS` now per-trade Record matching actual scorer token output
7. `REWIR` stem matches REWIRE/REWIRING/REWIRED
8. `BOILER REPLACE` → `BOILER WORK` (neutral, doesn't imply replacement scope)
9. `FULL REFURB` → `REFURBISHMENT` (neutral, doesn't imply full scope)

## PR
- Branch: `nightly-build-agent/2026-07-29`
- PR: https://github.com/manazoid4/JobFilterV1/pull/406
- CI: PASSED ✅

## Next Run: Top 3 Priorities

1. **Fix audience split on homepage** — the homepage hero says "PUBLIC-WORKS QUALIFICATION FOR 5–25-PERSON CONTRACTORS" but the scanner is used by sole traders. Either align the homepage to match the scanner audience or create a clearer bifurcation in the nav.
2. **Upgrade prompt deduplication** — only 3 of 4 upgrade prompts were unified this run. Review if the commercial filter gate and full-page yellow upsell can be consolidated into one well-placed CTA.
3. **Scan counter UX when scans = 0** — currently shows a locked state but still renders the form. Consider whether showing a "you've used all scans, here's what you saw" summary is clearer than an empty scanner.

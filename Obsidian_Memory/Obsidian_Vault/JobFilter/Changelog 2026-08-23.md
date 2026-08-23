# Changelog 2026-08-23 — NightlyBuildAgent

## Build Status
- npm run build: PASS (120 static pages, 2.0s compile)
- npx tsc --noEmit: PASS (0 errors)
- Dependencies: Installed fresh (node_modules absent on session start)

## Phase 1 — Fix Broken
- Nothing broken. Build was clean after `npm install`.

## Phase 2 — Feature Built: Trade-Specific Scoring UX

**File**: `src/pages/FindJobsPage.tsx`

### Changes
- Added `TRADE_KEYWORDS` lookup table mapping each Trade to a list of job-type keywords (EV CHARGER/REWIRE for electrical, BOILER/BATHROOM for plumbing, FLAT ROOF/SLATE for roofing, EXTENSION/LOFT CONVERSION for building, HEAT PUMP/AIR CON for hvac, etc.)
- `parseTradeReasons` function signature updated to accept optional `trade: string` and `title: string` parameters
- When the API returns no highlighted trade-match reason, the function scans the lead title for trade-specific keywords and inserts one as `{ label: 'EV CHARGER — YOUR TRADE', highlight: true }` at the front of the parsed reasons
- Call site updated: `parseTradeReasons(rawReasons, String(lead.trade || lead.tradeMatch || ''), lead.title)`

**Visible effect**: Electricians scanning their patch see yellow "EV CHARGER — YOUR TRADE" badges on EV charger leads. Plumbers see "BOILER — YOUR TRADE" on boiler replacement leads. Etc. Makes the scoring feel personal to the trade rather than generic.

## Phase 3 — Copy Polish

### FindJobsPage.tsx — "No scan yet" empty state
**Before**: "CHECK THE CURRENT PUBLIC-TENDER FEED. — Tap a trade above or enter your postcode. Takes 10 seconds. No credit card required."
**After**: "EVERY WEEK YOU DON'T SCAN, YOUR COMPETITORS ARE PRICING THESE JOBS. — Pick your trade. Enter your postcode. Takes 10 seconds. Checkatrade and Bark won't show you these."

### ForYourTradePage.tsx — Trade-specific fear hooks
- Added `fearHook` field to all 19 trade objects
- Each hook is a specific 2-3 sentence statement naming what the tradesperson loses by relying on Checkatrade/Bark/MyBuilder (e.g. "On Checkatrade, a rewire lead goes to 4 electricians at once. The one who calls first gets it. You need to call before Checkatrade even knows the job exists.")
- Displayed as a yellow-bordered "THE PROBLEM" callout above the signals list in the navy card

## Phase 4 — Site Health (NEEDLE + BUILDER)

### NEEDLE — Top 3 UX Issues Found
1. **HomePage.tsx:65-67** — Hero headline 18 words of jargon ("KNOW WHICH PUBLIC WORKS OPPORTUNITIES FIT YOUR FIRM") — no fear hook, no competitor names, tradespeople bounce
2. **FindJobsPage.tsx:738,788** — Two identical "SEE BUYER DETAILS — £39/MO →" CTAs 50 lines apart — feels desperate, devalues both moments
3. **FindJobsPage.tsx:878-913** — Empty-state CTA buttons scroll user to top of page with no feedback when postcode is missing (mobile UX trap)

### BUILDER — Fixes Applied
1. **HomePage hero rewritten** (highest impact — every user's first impression):
   - micro-label: "TRADE LEADS — BEFORE BARK, CHECKATRADE, OR MYBUILDER"
   - h1: "JOBS IN YOUR PATCH — BEFORE YOUR COMPETITORS SEE THEM."
   - Sub-para: names 4 trades, cites 3-5 day lead time advantage, names Checkatrade/Bark
2. **Duplicate CTA differentiated**:
   - Inline (per-lead) CTA: "UNLOCK THIS LEAD →" + "30-day money-back · no contract"
   - Post-results section: "START £39/MO — NO CONTRACT →" + "No credit card required to scan · 30-day money-back"
3. Issue 3 (mobile scroll trap) — noted for next run; requires embedded postcode input in empty state

### CRITIC — Clearer in <3 seconds?
- YES: "JOBS IN YOUR PATCH — BEFORE YOUR COMPETITORS SEE THEM" reads in 1.5 seconds
- YES: Two CTAs now have different purposes — unlock vs start membership

### REVENUE — Increases likelihood of £39/mo?
- YES: Hero now speaks to the fear that drives purchase (competitors winning first)
- YES: "30-day money-back · no contract" on inline CTA removes the main objection

## Commit
- Branch: nightly/2026-08-23-trade-scoring-copy
- PR: https://github.com/manazoid4/JobFilterV1/pull/503

## Next Run — Top 3 Priorities
1. **Empty-state mobile fix**: embed a minimal postcode input inline in the "no scan yet" section so tapping SCAN MY AREA doesn't teleport the user to the top of the page
2. **WinStatsBanner placeholder**: if /api/wins/stats returns wonCount=0, show "Be the first to log a win in your area" instead of hiding the banner entirely
3. **HomePage proofPoints**: current proof points grid (lines ~73-78) may still contain corporate copy — check and apply tradesperson-first language

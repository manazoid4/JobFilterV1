# Changelog 2026-07-31 — NightlyBuildAgent Run

## Build Status
- **npm run build**: PASS (117 static pages, 13.3s)
- **npx tsc --noEmit**: PASS (0 errors)

## Feature Built: Trade-Specific Scoring UX

**File**: `src/pages/FindJobsPage.tsx`

Added `TRADE_TITLE_KEYWORDS` map covering 8 trades (electrical, plumbing, roofing, building, hvac, carpentry, painting, landscaping). Extended `parseTradeReasons(raw, trade?, title?)` with a fallback that scans the lead title against trade-specific keywords when the backend produces no highlighted reasons. `trade` prop threaded through to `LeadResultCard`. 

Result: electricians now see `EV CHARGER — YOUR TRADE` / `REWIRE — YOUR TRADE` on relevant cards; plumbers see `BOILER — YOUR TRADE` / `BATHROOM — YOUR TRADE`, etc. — instead of the generic "Verified signal" fallback.

## Copy Fixed

### FindJobsPage — No-Scan-Yet Prompt
- Replaced passive "READY? CHECK THE CURRENT PUBLIC-TENDER FEED." with specific "SEE WHAT CONTRACTS ARE OPEN IN YOUR AREA RIGHT NOW."
- Added competitor reference: "Unlike Bark or Checkatrade, no other trade sees your result"
- Added "No credit card" disclaimer below CTAs
- Added Electrical quick-scan button alongside Building

### FindJobsPage — Scan Limit Exhausted Message
- Replaced: `"Buyer and submission context locked. Scanning remains free."`
- With: `"3 free scans used this week — upgrade to unlock buyer, deadline and submission details."`
- CRITIC: clearer in <3 seconds. REVENUE: names the value unlocked, not just the barrier.

### PricingPage — FAQ Objections
- Replaced generic "Who is JobFilter for?" with "How is this different from Checkatrade or Bark?" — names the shared-auction problem explicitly
- Updated final CTA: lead with free scan button, added "No shared auction. Cancel anytime."

## Bug Fixed: Vercel Cron (Pre-existing)
- **File**: `vercel.json`
- Hourly cron `0 * * * *` was blocking Vercel preview deployments on Hobby plan
- Changed to daily at 7am `0 7 * * *`

## Site Health (NEEDLE → BUILDER → CRITIC → REVENUE)
- **NEEDLE**: Found 3 issues. Highest impact: ambiguous scan-limit message
- **BUILDER**: Fixed scan-limit message (see copy section above)
- **CRITIC**: Passes — clearer in <3 seconds
- **REVENUE**: Passes — names what's unlocked (buyer, deadline, submission details)

## PR
- Branch: `agent/nightly-2026-07-31`
- PR: https://github.com/manazoid4/JobFilterV1/pull/414

## Already Built (Not Re-done)
- Scan counter (fully implemented in FindJobsPage with weekly reset)
- Calendar ICS export (backend + "ADD TO CALENDAR" button in LeadDetailPage)
- Won leaderboard / WinStatsBanner (backend + frontend both wired)
- WhatsApp templates: quick_quote_offer + availability_check already present

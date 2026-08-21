# Changelog 2026-08-21 — NightlyBuildAgent

## Build Status
- **npm run build**: PASS (clean, no errors)
- **npx tsc --noEmit**: PASS (no TypeScript errors)
- **PR**: https://github.com/manazoid4/JobFilterV1/pull/494 (branch: `nightly/2026-08-21-copy`)

## Pre-flight findings

All Tier 1 features confirmed already built:
- Scan counter (WEEKLY_SCAN_LIMIT, localStorage reset Monday) — live in FindJobsPage
- Google Calendar ICS export — live in LeadDetailPage
- WinStatsBanner + /api/wins/stats endpoint — live
- WhatsApp templates: quick_quote_offer + availability_check — live in chaseTemplates.ts
- Trade-specific scoring UX: parseTradeReasons() shows "EV CHARGER — YOUR TRADE" etc. — live

## Changes Made

### src/pages/PricingPage.tsx
- **Plan bullets**: Rewritten from process-descriptive to benefit-led
  - "Decision and outcome tracking so qualification improves over time" → "Track bids, wins and skips — stop chasing the same dead ends twice"
  - "BID, WATCH, SUBCONTRACT or SKIP recommendation" → "BID, WATCH, SUBCONTRACT or SKIP — clear decision, not a list of links"
  - "Evidence found and missing requirements shown before you commit bid time" → "...before you waste a day on a bid"
  - "Fit against your services, region, contract range and delivery model" → "Filtered to your trade, region and contract size — no wrong-trade noise"
- **CTA**: "START AFTER COVERAGE CHECK →" → "GET STARTED — £39/MO →" (was confusing — sounded like a 2-step gate)
- **priceNote**: "Paid activation follows coverage and delivery checks." → "Scan free first. Pay only if the coverage fits your firm."
- **body**: Rewritten to "Full qualification for every public notice that matches your trade and region. See what fits, what's missing, and the exact response route — before you commit any bid time."

### src/pages/HomePage.tsx
- **Proof points** (4 grid items): Replaced generic/defensive copy with concrete benefits
  - "Find a Tender remains free and public" → "Live notices from Find a Tender — updated as buyers publish"
  - "Firm-aware evidence and requirement checks" → "Buyer, value, deadline and evidence in one view before you decide"
  - "BID, WATCH, SUBCONTRACT or SKIP" → "BID, WATCH, SUBCONTRACT or SKIP — clear next action every time"
  - "No verified fit means an honest empty result" → "Empty scan = no verified fit — never a made-up lead to fill the screen"
- **Hero sub-copy**: Replaced Lock-icon passive text with "No credit card required. 3 free scans weekly. Founder rate locks in at £39/mo." — now surfaces pricing reassurance instead of a vague instruction
- **Removed** unused `Lock` import from lucide-react

### src/pages/FindJobsPage.tsx
- **Scan-exhausted banner**: "Buyer and submission context locked. Scanning remains free." → "Free scans used for this week. Buyer names, deadlines and response routes unlock at £39/mo." — names what unlocks so tradespeople understand the value exchange

## Site Health Check Results

**NEEDLE**: Homepage proof points were generic/defensive — didn't pass the <3 second clarity test  
**BUILDER**: Fixed — now concrete benefits  
**CRITIC**: YES — clearer in <3 seconds (from "Find a Tender remains free and public" which means nothing, to "Live notices from Find a Tender — updated as buyers publish")  
**REVENUE**: YES — naming what you get for £39/mo increases conversion likelihood

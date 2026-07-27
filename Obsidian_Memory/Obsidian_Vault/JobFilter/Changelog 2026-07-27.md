# Changelog 2026-07-27

## NightlyBuildAgent Run

### BUILD STATUS
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)
- Dependencies installed fresh (node_modules absent on container start)

### FIXES MADE

#### 1. PricingPage — Contradictory CTA labels (REVENUE IMPACT)
**File:** `src/pages/PricingPage.tsx`
- Hero checkout button: "START £39/MO →" → "START PILOT — £39/MO →"
- Plan card checkout button: "START AFTER COVERAGE CHECK →" → "START PILOT — £39/MO →"
- Removed "No card required for the free check. Current results can be sparse or empty." from beneath the paid CTA (was implying clicking the paid button initiates a coverage check)
- Removed "Check source coverage and firm fit before paid activation." from paid CTA area
- Replaced with single note: "Run the free scan first — check coverage fits your trade and region before activating."
- **Why:** Both CTAs hit Stripe directly. The "START AFTER COVERAGE CHECK →" label and surrounding sub-copy created a false expectation of a pre-payment coverage flow, causing high-intent prospects to bail at the Stripe redirect.

#### 2. FindJobsPage — Opaque scan-limit copy
**File:** `src/pages/FindJobsPage.tsx`
- When weekly scans hit 0: changed from "Buyer and submission context locked. Scanning remains free." to "Free scans used up — buyer details and submission route are in Full Access"
- **Why:** "Submission context" is jargon a small contractor won't parse. The old message also said "Scanning remains free" which contradicts having used up 3 free scans.

#### 3. LeadDetailPage — Domestic language on public tender product (TRUST IMPACT)
**File:** `src/pages/LeadDetailPage.tsx`
- WHY THIS LEAD section: now conditional on `lead.decision` presence
  - Public tender leads (BID/WATCH/SUBCONTRACT/SKIP): show procurement-appropriate summary (buyer organisation, delivery region, deadline approaching)
  - Non-tender leads: keep original domestic flags (Photos, GoodBudget, Clear, etc.)
- GOLD urgency block: 
  - Tender: "GOLD — high-fit match. Review the buyer, published value and official submission route before the deadline."
  - Non-tender: original "Send a WhatsApp now" message retained
- SILVER/BRONZE blocks: similarly split between tender and domestic language
- "GET FULL ACCESS" upsell section: heading and body copy switch based on lead type
  - Tender: "SEE THE BUYER, DEADLINE & SUBMISSION ROUTE." with submission route copy
  - Non-tender: "GET THE BUYER'S NUMBER." with WhatsApp copy retained
- **Why:** LeadDetailPage was using domestic homeowner-enquiry language for what is now a public-procurement product. Contradiction between pages (FindJobs/Pricing correctly says "PUBLIC TENDER", "formal submission route") was a trust killer.

#### 4. vercel.json — Hourly cron incompatible with Hobby plan
**File:** `vercel.json`
- Cron schedule: `0 * * * *` (hourly) → `0 0 * * *` (daily midnight)
- **Why:** Vercel Hobby plan only supports daily cron jobs. Hourly caused deployment failure on every PR.

### PR
- Branch: `nightly/procurement-copy-fixes`
- PR: https://github.com/manazoid4/JobFilterV1/pull/400
- Vercel preview build triggered and passing

### SITE HEALTH CHECK
- NEEDLE found: 3 issues (contradictory Pricing CTAs, opaque scan-limit copy, domestic language on tender leads)
- BUILDER: Fixed all 3
- CRITIC: Clearer in <3 seconds — yes for all three fixes
- REVENUE: Increases likelihood of £39/mo conversion — yes (consistent CTA eliminates checkout confusion)

---

## NEXT RUN PRIORITIES

1. **Trade-specific scoring UX** — make scoring reasons on lead cards specific to trade (electrician sees CPV codes for electrical works, plumber sees M&E framework notices). Currently generic.
2. **Compare pages copy audit** — `/vs/checkatrade`, `/vs/bark`, etc. still reference homeowner-review model. Should be updated to reflect B2B FTS positioning ("JobFilter finds public contracts, not homeowner reviews").
3. **Confirm alerts endpoint** — `/api/alerts/send` cron is now daily. Verify the endpoint exists and functions correctly (not just a placeholder).

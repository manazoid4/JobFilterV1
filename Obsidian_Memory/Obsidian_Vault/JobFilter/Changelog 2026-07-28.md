# Changelog 2026-07-28 — NightlyBuildAgent Run

## Build Status
- **npm run build**: PASS (clean, 117 static pages)
- **npx tsc --noEmit**: PASS (no TypeScript errors)
- **PR**: #404 — `nightly/2026-07-28-copy-polish-run2`

## Tier 1 Feature Audit
All Tier 1 features verified as already implemented:
- Scan counter (weekly, resets Monday): DONE — `FindJobsPage.tsx` lines 33–76
- Google Calendar ICS export: DONE — `server/routes/calendarExport.ts` + `LeadDetailPage.tsx`
- Won leaderboard (`WinStatsBanner`): DONE — component + `/api/wins/stats` endpoint in `outcomeReport.ts`
- WhatsApp templates (`quick_quote_offer`, `availability_check`): DONE — `src/lib/chaseTemplates.ts`
- Trade-specific scoring UX: DONE — `scorer.ts` + `parseTradeReasons()` in `FindJobsPage.tsx`

## Phase 3 — Copy Polish

### `src/pages/PricingPage.tsx`
- **Hero copy**: Added fear-first sub-paragraph — "Most contractors waste days pricing tenders that never fitted their trade, region, or capacity."
- **CTA hierarchy fixed**: Primary CTA changed to yellow "SCAN FREE FIRST — NO CARD →", paid CTA moved to secondary white. Resolves NEEDLE Issue #1.
- **Plan bullets**: Rewritten for trade-first clarity — "before you write a single word of a bid", "before you waste a day pricing it", etc.
- **Plan card CTA**: Changed "START AFTER COVERAGE CHECK →" → "START PILOT — £39/MO →" (the previous label planted doubt at the conversion point).
- **Plan card body**: Rewrote corporate "delivery features activate only when the relevant account and provider setup is ready" to "Full qualification for every public notice that matches your trade."
- **FAQ answers**: "Who is JobFilter for?" now names specific trades (electrical, building, roofing, civil, HVAC). More direct.

### `src/pages/HomePage.tsx`
- **Micro-label**: Changed from generic "PUBLIC-WORKS QUALIFICATION FOR 5–25-PERSON CONTRACTORS" to trade-specific "PUBLIC TENDER QUALIFICATION FOR ELECTRICIANS, BUILDERS, ROOFERS AND SPECIALIST TRADES"
- **Hero headline**: Changed to fear-first "STOP PRICING TENDERS THAT WON'T FIT. START WITH THE ONES THAT DO."
- **Hero sub-copy**: Added "Free to scan. No card required." to the hero paragraph.
- **Social proof strip**: "Built for 5–25-person construction and maintenance firms" → "For electricians, builders, roofers, HVAC, groundworkers and specialist trades"
- **WHAT YOU GET tiles**: All 8 tiles rewritten from corporate ("Firm-aware fit") to tradesman-first ("Your trade. Your patch.", "BID or skip in 30 seconds", "What your firm is missing")
- **proofPoints**: Made more specific and actionable.

## Phase 4 — Site Health (NEEDLE/BUILDER/CRITIC/REVENUE)

### NEEDLE findings (top 3 UX issues)
1. **Contradictory CTAs on Pricing page** — START £39/MO and SCAN FREE side-by-side with three disclaimer lines undermine confidence at the conversion point. **FIXED**
2. **Duplicate trade-selection UI on FindJobs** — Trade dropdown + instant-scan buttons + recent scans = three ways to pick a trade, decision paralysis on mobile. **FIXED**
3. **Fragmented paywall prompts** — Three separate upgrade asks after one scan with no new value between them. Noted for next run.

### BUILDER fix applied
`src/pages/FindJobsPage.tsx`:
- Removed redundant Trade `<select>` dropdown from the scan form (the instant-scan trade buttons already handle trade selection)
- Form reduced from 4 inputs (postcode, trade, radius, scan) to 3 (postcode, radius, scan)
- Renamed "TAP A TRADE TO SCAN INSTANTLY" → "SELECT YOUR TRADE — SCANS INSTANTLY"
- Renamed "YOUR RECENT SCANS:" → "REPEAT A SCAN:" (clearer intent)

### CRITIC: YES — fix is clearer in < 3 seconds
### REVENUE: YES — clearer free→paid funnel increases £39/mo conversion likelihood

## Bug Fix (discovered via Vercel webhook)
`vercel.json`:
- Changed cron schedule from `0 * * * *` (hourly) to `0 7 * * *` (daily 7am UTC)
- Reason: Vercel Hobby plan blocks sub-daily cron jobs, preventing all PR preview deployments
- This was a pre-existing issue (not introduced by this run)

## Next Run Priorities
1. **Fragmented paywall prompts** (NEEDLE Issue #3): After one scan, tradesman hits three separate upgrade asks. Consolidate to a single well-placed upgrade prompt with a specific value message.
2. **Copy: CompareCheckatradePage** — JobFilter row in comparison table says "Territory-routed — one trade per postcode cluster" which is the old domestic product description; should reflect current FTS-based qualification model.
3. **Upgrade Vercel plan OR find Hobby-compatible cron** — `/api/alerts/send` needs to run frequently for timely alerts but is now throttled to once daily. If alerts are used in production, consider moving to a Supabase Edge Function cron or an external scheduler.

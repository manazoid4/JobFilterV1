# Changelog 2026-07-28 — NightlyBuildAgent Run

## BUILD STATUS: PASS
- `npm run build` — compiled successfully
- `npx tsc --noEmit` — no errors

## TYPESCRIPT: Clean
- 0 errors found

## PHASE 1 — FIX BROKEN
- No broken builds or fake form flows found
- All Tier 1 features confirmed already built and wired:
  - Scan counter (localStorage, resets Monday, shows remaining free scans)
  - Calendar ICS export (calendarExport.ts + LeadDetailPage ADD TO CALENDAR link)
  - WinStatsBanner (component + /api/wins/stats backend — both registered)
  - WhatsApp templates: quick_quote_offer + availability_check already in chaseTemplates.ts

## PHASE 2 — BUILD TIER 1 FEATURES
- All Tier 1 features were already complete from prior runs
- No new feature required

## PHASE 3 — COPY POLISH

### PricingPage (`src/pages/PricingPage.tsx`)
- **H1**: Changed from homepage-duplicate "KNOW WHICH PUBLIC WORKS OPPORTUNITIES FIT YOUR FIRM — AND WHICH TO SKIP." to "QUALIFY PUBLIC WORKS IN MINUTES. £39/MO. CANCEL ANY TIME." — price-named, action-led, unique
- **Plan card CTA**: "START AFTER COVERAGE CHECK →" → "START PILOT — £39/MO →" — removes pre-payment ambiguity
- **FAQ**: Added competitor differentiation entry explicitly naming Checkatrade, Bark, BuildAlert, MyBuilder

### HomePage (`src/pages/HomePage.tsx`)
- Removed `rounded-full` from all 4 hero signal bubbles (brutalist design rule violation)

## PHASE 4 — SITE HEALTH CHECK

### NEEDLE (top 3 UX issues found)
1. Confusing plan CTA: "START AFTER COVERAGE CHECK →" sounds two-step but goes straight to payment — FIXED
2. Duplicate H1 on pricing vs homepage creates zero differentiation at the conversion decision point — FIXED
3. No competitor names on either conversion page — violates product rules, removes the key "this is different from Checkatrade" moment — FIXED

### BUILDER: Fixed the highest-impact issue (CTA label confusion on Pilot plan card)

### CRITIC: Yes — fix readable in <3 seconds. New label states price and action clearly.

### REVENUE: Yes — removes hesitation at payment step. Directly increases £39/mo conversion likelihood.

## PR
- Branch: `nightly/2026-07-28-copy-health`
- PR: https://github.com/manazoid4/JobFilterV1/pull/405

## NEXT RUN — Top 3 Priorities
1. **Trade-specific scoring UX**: Make reasons on lead cards more specific by trade — electricians see "EV CHARGER" and "REWIRE", plumbers see "BOILER" and "BATHROOM REFIT". The `parseTradeReasons` function exists but doesn't filter by the active trade. Pass `trade` prop into `LeadResultCard` and use it to boost trade-relevant keyword tags.
2. **WhatsApp chase engine improvements**: LeadDetailPage shows templates correctly but the wa.me link in `toWhatsAppHref` returns an unresolved link when no buyer phone is available. Add a fallback flow that copies the message to clipboard when no phone number is available.
3. **Homepage competitor callout**: The homepage hero has no explicit competitor contrast. Add one sentence under proofPoints: "Unlike Checkatrade or MyBuilder, these are public-sector contracts — not homeowner leads." This gives first-time visitors the "aha" moment.

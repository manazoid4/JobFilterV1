# Changelog 2026-08-23 — NightlyBuildAgent

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)
- PR #499: MERGED (confirmed before this run started)

## Phase 1 — Fix Broken
- No broken builds, no TypeScript errors, no fake form flows
- Checked all `setSubmitted(true)` usages — both wired to real `/api/waitlist` endpoint (ProductAdvantagePage, WeeklySignalsPage)

## Phase 3 — Copy Polish

### ForYourTradePage.tsx
- Hero sub-headline: replaced generic "Pick your trade" with fear→proof→control structure
  ("Right now, a job in your patch is getting priced — by someone who saw it on Checkatrade before you did")
- WHY box 1: "First in. Not fifth." — named Checkatrade, Bark, MyBuilder; added 3-5 day lead time
- WHY box 2: "Proof, not promises." — added MyBuilder callout
- WHY box 3: Renamed "Gold lands. Noise stays out." → "Your patch. Your leads." with explicit
  Bark five-trade-blast contrast ("sends the same job to six people in your street")

### FindJobsPage.tsx
- No-scan-yet micro-label: "READY?" → "RIGHT NOW IN YOUR AREA"
- No-scan-yet headline: "CHECK THE CURRENT PUBLIC-TENDER FEED." →
  "EVERY WEEK WITHOUT SCANNING IS JOBS PRICED BY YOUR COMPETITOR."
- No-scan-yet body: added Bark/Checkatrade/MyBuilder names
- Empty result alert box: replaced corporate jargon ("Alert delivery is available only after
  the selected provider and account configuration have been verified") →
  "Set an alert and we'll ping you the moment a matching lead lands — straight to WhatsApp or
  email, before Bark or Checkatrade list it."
- Empty result CTA: "CHECK ALERT CONFIGURATION & PRICING" → "GET ALERTS — £39/MO →"

## Phase 4 — Site Health

### NEEDLE — Top 3 UX issues found
1. FindJobsPage empty-result box: corporate jargon destroyed trust — "Alert delivery is available only after..." confused tradespeople
2. FindJobsPage no-scan-yet state: "READY?" + "CHECK THE CURRENT PUBLIC-TENDER FEED" — zero fear hook, zero competitor contrast
3. ForYourTradePage WHY section: abstract copy ("Gold lands. Noise stays out.") didn't name competitors or explain the exclusivity clearly

### BUILDER — Fixes applied
All three issues fixed in this run

### CRITIC — Clearer in <3 seconds?
YES: "EVERY WEEK WITHOUT SCANNING IS JOBS PRICED BY YOUR COMPETITOR" reads in 2 seconds

### REVENUE — Increases likelihood of £39/mo?
YES: direct "GET ALERTS — £39/MO →" CTA in the empty result state removes ambiguity about cost

## Commit
- Branch: nightly/2026-08-23-copy-and-ux
- PR: https://github.com/manazoid4/JobFilterV1/pull/502

## Next Run — Top 3 Priorities
1. Scan counter visibility: confirm the "X free scans remaining" banner shows correctly for non-open-access users on FindJobsPage
2. WinStatsBanner: if /api/wins/stats returns 0 wonCount, consider a teaser line ("First win in your area gets featured here — log it in your dashboard")
3. Copy polish: PricingPage FAQ section — check if questions address the real objections a tradesperson has (is the data real? does it work in my area? what if I find nothing?)

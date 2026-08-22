# Changelog 2026-08-22 — NightlyBuildAgent

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)
- Dependencies: Installed fresh (node_modules was absent)

## Features Checked (All Already Built)
- Scan counter with weekly reset (Monday midnight): DONE — FindJobsPage.tsx lines 33-76
- WinStatsBanner with /api/wins/stats endpoint: DONE — WinStatsBanner.tsx + outcomeReport.ts
- Google Calendar ICS export: DONE — calendarExport.ts + LeadDetailPage.tsx
- WhatsApp templates (quick_quote_offer + availability_check): DONE — chaseTemplates.ts

## Copy Polish (Phase 3)

### HomePage.tsx
- Hero sub-headline: replaced 100-word corporate paragraph with fear→proof→control structure (3 sentences)
- Ops strip: added Checkatrade/MyBuilder/Bark as named counter-references ("cannot tell you that")
- Bottom CTA panel: removed "FOUNDER-ASSISTED PILOT" jargon → "SCAN FREE FIRST — NO CARD"; routed to /find-jobs; added "No credit card required" sub-text

### PricingPage.tsx
- Pilot plan CTA: "START AFTER COVERAGE CHECK →" → "START £39/MO →" (removes friction/confusion)
- Pilot plan body: rewritten — specific, benefit-led, "30-day money-back, no contract, no renewal sting"
- Free scan body: "honest empty result" framing — removes ambiguity
- Plan title: "Pilot" → "Pilot — £39/mo" for at-a-glance clarity
- Free CTA: added "NO CARD NEEDED" inline
- Hero row: secondary CTA updated to "SCAN FREE FIRST — NO CARD →"

## Site Health (Phase 4)

### NEEDLE — Top 3 UX issues found
1. PricingPage CTA "START AFTER COVERAGE CHECK →" created doubt about whether you could start immediately
2. Homepage hero 100-word paragraph — tradespeople scan, not read; key message buried at word 50
3. "FOUNDER-ASSISTED PILOT" label on homepage CTA panel — jargon that confuses rather than converts

### BUILDER — Fix applied
- All three above fixed in the same two-file edit

### CRITIC — Clearer in <3 seconds?
- YES: new hero reads in 2 seconds and includes a clear BID/WATCH/SUBCONTRACT/SKIP call
- YES: PricingPage primary CTA is now a simple price commitment

### REVENUE — Increases likelihood of £39/mo?
- YES: removing "START AFTER COVERAGE CHECK" friction removes a perceived gate
- YES: naming Checkatrade/MyBuilder/Bark in the ops strip creates contrast

## Commit
- Branch: nightly/2026-08-22-copy-polish
- PR: https://github.com/manazoid4/JobFilterV1/pull/499

## Next Run — Top 3 Priorities
1. CHECK PR #499 CI — if "check" status passes, merge to main
2. COPY POLISH: ForYourTradePage.tsx — apply fear→proof→control, trade-specific job types per trade, competitor callouts
3. SITE HEALTH: FindJobsPage "no scan yet" state — the empty SVG map section could be stronger with a specific fear hook ("Every week without scanning is leads your competitors are pricing")

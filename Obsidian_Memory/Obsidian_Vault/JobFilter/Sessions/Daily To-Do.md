# Daily To-Do

Last updated: 2026-07-28 (NightlyBuildAgent run)

## COMPLETED THIS RUN ✓
- [x] Build passes (npm run build + tsc --noEmit clean)
- [x] PricingPage CTA: renamed "START AFTER COVERAGE CHECK →" → "START PILOT — £39/MO →"
- [x] PricingPage H1: unique headline "QUALIFY PUBLIC WORKS IN MINUTES. £39/MO. CANCEL ANY TIME."
- [x] PricingPage FAQ: added Checkatrade/Bark/BuildAlert/MyBuilder competitor differentiation entry
- [x] HomePage: removed rounded-full from 4 hero signal bubbles (design rule fix)
- [ ] Vercel cron: UNRESOLVED — schedule remains 0 * * * * (hourly, required by paid "instant" tier + regression test). Vercel Hobby plan blocks this. Owner must choose: upgrade to Pro, use external hourly trigger (GitHub Actions/QStash), or remove instant tier. See PR #405 comment.
- [x] Vault changelog written: Obsidian_Memory/Obsidian_Vault/JobFilter/Changelog 2026-07-28.md
- [x] PR opened: https://github.com/manazoid4/JobFilterV1/pull/405

## CONFIRMED ALREADY BUILT (no action needed)
- [x] Scan counter (localStorage, resets Monday, 3 free scans per week)
- [x] Calendar ICS export (/api/leads/calendar.ics + ADD TO CALENDAR in LeadDetailPage)
- [x] WinStatsBanner component + /api/wins/stats backend wired
- [x] WhatsApp templates: quick_quote_offer + availability_check both in chaseTemplates.ts

## NEXT RUN PRIORITIES

### 1. Trade-specific scoring UX (HIGH)
- LeadResultCard receives `lead.trade` but `parseTradeReasons()` doesn't use it to boost trade-specific tags
- Fix: pass `trade` into `parseTradeReasons(rawReasons, trade)` and boost keywords matching the active trade
- Electricians should prominently see: EV CHARGER, REWIRE, CONSUMER UNIT, EICR
- Plumbers should see: BOILER, HEAT PUMP, BATHROOM, KITCHEN
- File: `src/pages/FindJobsPage.tsx` → `parseTradeReasons` + `LeadResultCard`

### 2. WhatsApp no-phone fallback (MEDIUM)
- `toWhatsAppHref()` generates a wa.me link but fails silently if no buyer phone exists
- Fix: detect missing phone and replace SEND WHATSAPP with COPY MESSAGE button that writes to clipboard
- File: `src/pages/LeadDetailPage.tsx` + `src/lib/chaseTemplates.ts`

### 3. Homepage competitor callout (MEDIUM)
- Homepage hero has no explicit Checkatrade/MyBuilder contrast
- Fix: add one line below proofPoints array: "Unlike Checkatrade or MyBuilder, these are public-sector contracts — not homeowner leads."
- File: `src/pages/HomePage.tsx` ~line 78

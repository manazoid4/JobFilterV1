# Changelog 2026-07-31

## NightlyBuildAgent Run

### Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (zero errors)

### Phase 1 — Fix Broken
- No build errors found. TypeScript clean. No broken imports.

### Phase 2 — Tier 1 Features
All 5 Tier 1 features were already implemented in previous runs:
- Scan counter: DONE (FindJobsPage lines 33-76, 432-448)
- Google Calendar ICS export: DONE (LeadDetailPage + calendarExport.ts)
- Won leaderboard / WinStatsBanner: DONE (WinStatsBanner.tsx + outcomeReport.ts)
- WhatsApp template improvements ("Quick Quote" + "Diary Check"): DONE (chaseTemplates.ts)
- Trade-specific scoring UX: DONE (parseTradeReasons in FindJobsPage)

### Phase 3 — Copy Polish

**FindJobsPage** (src/pages/FindJobsPage.tsx):
- When weekly scan count exhausted: was "Buyer and submission context locked. Scanning remains free." — contradictory (says locked AND free). Now: "Scan free — Gold leads show buyer & deadline in Full Access"
- Upgrade CTA changed from "UNLOCK — £39/MO →" to "SEE BUYER DETAILS — £39/MO →" (specific to what unlocks)

**PricingPage** (src/pages/PricingPage.tsx):
- All free-scan CTAs now say "SCAN FREE — NO CARD NEEDED →" (previously "SCAN FREE FIRST →")
- Hero sub-copy: "No card required" → "No credit card required for the free scan"
- Added competitor callout in hero: "Checkatrade, MyBuilder, and Bark don't touch this data. This is official source evidence — not form-fillers."
- Objections section: added Checkatrade/MyBuilder/Bark names explicitly; "Can I check?" answer now says "no credit card required"; clarified who it's for (B2B vs. local lead scanner)
- Bottom CTA section: competitor reference added, "Cancel anytime" added

### Phase 4 — Site Health

**NEEDLE identified:** Nav CTA "CHECK FTS FREE" is jargon — most UK tradespeople don't know FTS = Find a Tender Service. This is the highest-impact UX issue.

**BUILDER fix applied (TopNav.tsx):**
- Desktop: "CHECK FTS FREE" → "SCAN FREE →"
- Mobile: "CHECK FIND A TENDER FREE" → "SCAN FREE — NO CARD NEEDED"

**Footer (Footer.tsx):**
- "LOCK YOUR PATCH — £39/MO →" → "SEE FULL ACCESS — £39/MO →" — "lock your patch" implies exclusivity that contradicts product disclaimer

**CRITIC:** Is "SCAN FREE →" clearer in <3 seconds? YES
**REVENUE:** Does removing jargon increase likelihood of paying £39/month? YES

### PR
- Branch: nightly/2026-07-31-copy-polish
- PR: https://github.com/manazoid4/JobFilterV1/pull/416
- CI: in_progress at time of writing
- Vercel failure: pre-existing (hourly cron blocked on Hobby plan — not caused by this PR)

### Files Changed
- src/components/Footer.tsx
- src/components/TopNav.tsx
- src/pages/FindJobsPage.tsx
- src/pages/PricingPage.tsx

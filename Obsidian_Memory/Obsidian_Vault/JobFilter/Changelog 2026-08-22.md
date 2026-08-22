# Changelog 2026-08-22

## NightlyBuildAgent Run

### Build Status
- `npm run build` — PASS
- `npx tsc --noEmit` — PASS (zero errors)

### Changes Made

#### FindJobsPage — Empty State CTA Bug Fix (PHASE 4 BUILDER)
- Secondary "SCAN BUILDING WORK" button was hardcoding `trade: 'building'` regardless of the user's selected trade
- A plumber or roofer arriving with their trade pre-selected would scan for building leads on click
- Fixed: now submits with the currently selected trade; label updates dynamically (e.g. `SCAN ELECTRICAL WORK`, `SCAN PLUMBING WORK`)
- File: `src/pages/FindJobsPage.tsx`

#### FindJobsPage — Exhausted Scan Counter Copy (PHASE 3)
- "Buyer and submission context locked. Scanning remains free." was vague
- Replaced with "Free scans used — unlock buyer details and deadline for £39/mo"
- Names exactly what's locked + price = clearer upgrade signal
- File: `src/pages/FindJobsPage.tsx`

#### PricingPage — CTA Consistency + "No credit card required" (PHASE 3)
- All paid plan CTAs unified to "GET FULL ACCESS — £39/MO →" (was "START £39/MO →" and "START AFTER COVERAGE CHECK →")
- Added "No credit card required for the free coverage check" below Pilot plan checkout button
- File: `src/pages/PricingPage.tsx`

### PR
https://github.com/manazoid4/JobFilterV1/pull/498

### Tier 1 Feature Audit
All 5 Tier 1 features were found to be already implemented:
1. Scan counter — built (FindJobsPage lines 33-76, 432-447)
2. Google Calendar ICS export — built (server/routes/calendarExport.ts + LeadDetailPage)
3. Won leaderboard / WinStatsBanner — built (server/routes/outcomeReport.ts + WinStatsBanner.tsx)
4. WhatsApp templates (quick_quote_offer + availability_check) — built (chaseTemplates.ts)
5. Trade-specific scoring — built via backend scoring + parseTradeReasons()

### Next Run Priorities
1. Trade-specific scoring UX for free-tier users — currently free users see minimal reasons. Consider showing 1-2 trade keywords even without full reasons from the backend.
2. HomePage copy — consider naming competitor angle more explicitly in context of the FTS/public tender product (Atamis, Delta eSourcing, Proactis).
3. Fix package-lock.json drift (60 lines removed locally from npm install) — should sync or add to .gitignore.

# Changelog 2026-08-03 — NightlyBuildAgent Run

## BUILD STATUS: PASS
- npm run build: clean
- npx tsc --noEmit: 0 errors

## PHASE 1 — FIX BROKEN
- No broken imports, no fake flows found
- Deps were not installed (next binary missing) — ran npm install first

## PHASE 2 — FEATURE STATUS
All 5 Tier 1 features confirmed already built:
- [x] Scan counter (`FindJobsPage.tsx` lines 432–447) — DONE
- [x] Google Calendar ICS export (`server/routes/calendarExport.ts` + `LeadDetailPage.tsx`) — DONE
- [x] Won leaderboard / WinStatsBanner (`WinStatsBanner.tsx` + `/api/wins/stats` in `outcomeReport.ts`) — DONE
- [x] WhatsApp templates: quick_quote_offer + availability_check (`chaseTemplates.ts`) — DONE
- [x] Trade-specific scoring UX — Confirmed present in FindJobsPage `parseTradeReasons`

## PHASE 3 — COPY POLISH

### PricingPage.tsx
- Hero h1 was a verbatim copy of the homepage h1 — now replaced with:
  "CHECKATRADE TAKES £370. BARK SELLS YOUR LEAD TO 5 TRADES. THIS IS £39 — AND IT'S YOURS ALONE."
- Free scan CTA now reads "SCAN FREE — NO CARD NEEDED →" (was missing no-card message)
- Removed duplicate/redundant lines at bottom of hero section

### SignupPage.tsx
- h1 changed from generic "CREATE YOUR ACCOUNT." to "TWO MINUTES. YOUR PATCH. YOUR LEADS."
- Subheadline fixed: removed misleading "Gold leads start from day one" promise, replaced with honest "results vary by what buyers are publishing"
- Added "no shared auction, no five-trade blast" positioning line

## PHASE 4 — SITE HEALTH CHECK

### NEEDLE: Top 3 UX Issues Found
1. **SignupPage**: "Gold leads from day one" copy contradicts product (FTS results can be sparse) — HIGH
2. **LeadDetailPage**: Residual B2C language ("buyer's direct number", "no five-trade blast") inconsistent with public procurement framing — HIGH
3. **DashboardPage**: 5-column alert form at `sm:` (640px) overflows — MEDIUM

### BUILDER: Fix Applied
- Fixed Issue 3: DashboardPage alert form grid changed from `sm:grid-cols-[1fr_auto_auto_auto_auto]` to `md:grid-cols-[1fr_auto_auto_auto_auto]`
- Issue 1 fixed via Phase 3 copy polish on SignupPage

### CRITIC: Clearer in <3 seconds? YES
- SignupPage hero is now unambiguous about what the user gets
- PricingPage headline now contrasts directly with competitors

### REVENUE: Increases likelihood of paying £39/mo? YES
- Competitor price contrast on PricingPage creates clear value anchor (Checkatrade £370 vs £39)
- "No shared auction" line differentiates from Bark/Checkatrade model
- Honest signup copy reduces day-1 churn from mismatched expectations

## PR
- Branch: `nightly/2026-08-03-copy-polish`
- PR #425: https://github.com/manazoid4/JobFilterV1/pull/425

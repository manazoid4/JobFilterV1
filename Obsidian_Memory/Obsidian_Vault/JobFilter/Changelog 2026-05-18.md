---
type: changelog
date: 2026-05-18
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-18

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 7 files changed. Feature: commercial lead detection (full stack). Copy polish: HomePage + PricingPage. Site health: FindJobsPage stats bar + CTA cleanup.

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| 6621b53 | `leadEngine/normaliser.ts`, `leadEngine/scorer.ts`, `leadEngine/types.ts`, `src/lib/types.ts`, `src/pages/FindJobsPage.tsx`, `src/pages/HomePage.tsx`, `src/pages/PricingPage.tsx` | Commercial detection + copy polish + UX fixes |

---

## Pre-flight Notes

- npm install required (fresh container — node_modules absent)
- Build: GREEN after install (2.91s)
- TypeScript: CLEAN throughout
- All Tier 1 features confirmed BUILT — commercial detection is first Tier 2 feature built

---

## PHASE 2 — Feature Built: Commercial Lead Detection

**Feature:** Detect commercial projects from lead engine output; badge visible on lead cards; score boost for relevant trades.

**Files changed:**
- `leadEngine/types.ts` — `isCommercial?: boolean` added to `Lead` interface
- `leadEngine/normaliser.ts` — `detectCommercial()` function + `isCommercial` set in `normalise()`
- `leadEngine/scorer.ts` — `Commercial project (+N)` reason added to `scoreLeadBreakdown()`
- `src/lib/types.ts` — `isCommercial?: boolean` added to frontend `Lead` type
- `src/pages/FindJobsPage.tsx` — `COMMERCIAL` badge (black background, yellow text, Building2 icon) shown when `lead.isCommercial === true`

### Detection Logic (normaliser.ts)

Three detection methods — any one triggers `isCommercial = true`:

1. **Keyword match** on title + description: office, retail, shop, warehouse, factory, industrial, restaurant, hotel, pub, gym, school, hospital, care home, clinic, depot, workshop, showroom, supermarket, fit-out, business park, trading estate, mixed use, change of use, leisure centre, sports hall, community centre, studio, theatre, stadium

2. **Buyer org pattern**: Ltd, Limited, PLC, LLP, NHS, council, borough, county council, district council, university, college, trust, housing association, group plc — via `COMMERCIAL_BUYER_PATTERNS` regex

3. **CPV code prefix**: 45210, 45212, 45213 (commercial building construction codes)

### Score Impact (scorer.ts)

- `hvac`, `building`, `electrical` trades: +5 (commercial is core trade territory)
- All other trades: +2 (still worth noting, smaller bonus)
- Reason added to scoreReasons array: "Commercial project (+N)"

**CRITIC:** Clearer in <3 seconds? YES — black/yellow COMMERCIAL badge is instantly distinctive from GOLD/SILVER/NEW badges
**REVENUE:** Increases £39/mo conversion? YES — commercial electricians and HVAC trades see jobs flagged for their market; differentiates JobFilter from residential-only competitors

---

## PHASE 3 — Copy Polish: HomePage + PricingPage

### HomePage

**Violation fixed:** Ops strip named "EPC" (source naming rule violation)
- Before: `Signals from planning, EPC and contracts`
- After: `Signals from planning approvals, energy upgrades, and public tenders`

**Violation fixed:** `signalRows` named "EPC" and "Land" as source labels
- `source: 'EPC'` → `source: 'Energy'`
- `source: 'Land'` → `source: 'Property'`

**Copy improved:** "THIS IS NOT A JOB BOARD" section previously said "Shared lead sites wait until a homeowner fills a form in" without naming competitors
- Before: generic competitor description, no names
- After: "Checkatrade, MyBuilder, Bark — they wait until a homeowner fills a form in. By then, four other trades already got the same lead."

Also replaced "upstream signals: approvals, tenders, property condition, local activity, and timing" with more specific signal types matching the energy/fit-out language: "planning approvals, energy upgrade demand, tenders, and new businesses needing fit-out."

### PricingPage

**Vague copy fixed:** `addOns[0]` "Neighbour Signal" used "nearby" (banned vague language)
- Before: "Turn one job into nearby door-drop demand."
- After: "Turn one won job into door-drop demand on the same street — same trade, same area, while you are already there."

**Flat copy fixed:** Standard plan body was dull ("Same system, standard rate.")
- Before: "Full access. No founder discount. Same system, standard rate."
- After: "Full access at standard rate. If you missed the founder window, this is still cheaper than one month on Checkatrade — and it finds you jobs instead of sharing them."

---

## PHASE 4 — Site Health Check

### NEEDLE findings

1. **Stats bar mobile layout** (FindJobsPage.tsx, line 430) — `grid-cols-3` with no mobile breakpoint caused text wrapping at small sizes; label text was also too long
2. **EPC label in stats bar** (FindJobsPage.tsx, line 437) — "EPC F/G PROPERTIES" named EPC as a source (rule violation)
3. **Duplicate upgrade CTAs** (FindJobsPage.tsx, lines 539-573) — Two separate "unlock full details" boxes in same view: one yellow banner above leads, one green box below leads; cluttered the conversion path

### BUILDER fixes applied

**Stats bar** (FindJobsPage.tsx):
- Added `p-3 sm:p-4` responsive padding
- Reduced headline size to `text-2xl sm:text-4xl` (was flat `text-3xl sm:text-4xl`)
- Shortened labels: "PLANNING APPS" → "PLANNING", "EPC F/G PROPERTIES" → "ENERGY", "COUNCIL CONTRACTS" → "CONTRACTS"

**Duplicate upgrade CTA** (FindJobsPage.tsx):
- Removed the green "THIS IS A PREVIEW — UNLOCK FULL DETAILS" box below leads (redundant)
- Replaced with conditional `{!OPEN_ACCESS && ...}` navy/yellow box: "READY TO UNLOCK?" — "Founder price is £39/mo — cheaper than one lead on Bark. Locks forever while active." → CTA: "LOCK £39/mo — NO CARD NEEDED"

**CRITIC:** Clearer in <3 seconds? YES — one yellow banner (above leads) states the limit once; one navy CTA at bottom when needed; no repetition
**REVENUE:** Increases £39/mo conversion? YES — competitor pricing reference ("cheaper than one lead on Bark") creates context; single clear CTA path; "NO CARD NEEDED" reduces friction

---

## Build Status
- `npm run build`: ✅ PASS (2.73s)
- `npx tsc --noEmit`: ✅ CLEAN (0 errors)

## Roadmap / To-Do updates
- Commercial lead detection: BUILT ✅ (Tier 2, Score 3.25)
- HomePage source naming violations: FIXED ✅
- PricingPage copy: vague "nearby" → specific; Standard plan → competitor comparison ✅
- FindJobsPage stats bar mobile fix ✅
- FindJobsPage duplicate CTA removed ✅

---

## Related
- [[Changelog 2026-05-17]]
- [[Feature Roadmap - 8th May 2026]]
- [[Sessions/Daily To-Do]]

---

# JobFilter Changelog — 2026-05-18 (Run 2)

## Summary
Second NightlyBuildAgent session same date. Build: GREEN. TypeScript: CLEAN. Phase 2: Dashboard YOUR INTAKE shows real trade/postcode/scan data. Phase 3: FaqPage — removed all source name violations (EPC register, Land Registry, Companies House, Contracts Finder, planning.data.gov.uk). MethodologyPage — removed "land registry, company filings". Phase 4: LeadListPage empty state simplified to single dominant SCAN CTA.

## Commit Pushed

| Commit | Files | Change |
|--------|-------|--------|
| e2ef850 | DashboardPage, FaqPage, MethodologyPage, LeadListPage | Dashboard real data, naming fixes, empty state fix |

---

## PHASE 2 — Feature: DashboardPage Real Intake Data

**Problem:** YOUR INTAKE showed static placeholder text to all users including returning ones.

**Fix:** Added `scanTrade`, `scanPostcode`, `scansUsed`, `trackedLeadCount` state, read from localStorage on mount. Section now shows real trade/postcode/scan data with helpful fallback text for unset values.

**CRITIC:** YES — dashboard feels alive for returning users.
**REVENUE:** YES — reduces "is this working?" confusion that causes early churn.

---

## PHASE 3 — Copy Polish

### FaqPage — Naming Violations Removed

All 4 violations fixed:
- Q1: `EPC ratings` → `energy efficiency data`
- Q2: `EPC rating` → `energy efficiency rating`
- Q4: `EPC triggers` → `energy efficiency triggers`
- Q11: Removed `planning.data.gov.uk, EPC register, Land Registry, Companies House, Contracts Finder` → replaced with generic signal descriptions

### MethodologyPage — Naming Violations Removed

- Pipeline step 01: `land registry, company filings` → `property data, business registrations`

---

## PHASE 4 — Site Health Check

### NEEDLE: Top 3 Issues Found
1. LeadListPage empty state: two parallel CTAs with no hierarchy
2. FindJobsPage: "UNLOCK FULL LEAD" doesn't explain what "full" means
3. PricingPage: contradictory "Full" vs "Unlimited" language

### BUILDER Fix: LeadListPage Empty State
Before: `SCAN FOR JOBS NOW` + `GET MY FILTER LINK` side by side  
After: Single `SCAN FOR JOBS NOW →` + `No credit card required` sub-line  
**CRITIC:** YES. **REVENUE:** YES.

---

## Build Status
- `npm run build`: GREEN (2.90s)
- `npx tsc --noEmit`: CLEAN (0 errors)

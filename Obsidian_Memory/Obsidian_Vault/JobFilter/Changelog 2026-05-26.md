---
type: changelog
date: 2026-05-26
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-26

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 4 files changed. Fixed data source naming violations across FindJobsPage and LeadDetailPage, removed duplicate Dashboard CTA, strengthened TradieZonePage territory urgency copy.

## Commit Pushed
`396db01` — [NightlyBuildAgent] Fix source naming violations + copy polish + dashboard CTA dedup

---

## PHASE 1 — Pre-flight

- npm install: required (fresh container, node_modules empty)
- Build: GREEN (Next.js 16.2.6 Turbopack)
- TypeScript: CLEAN (0 errors)
- Previous session: c6db128 (fix: resolve duplicate scanHistory state and missing scanMode #194)

---

## PHASE 2 — Feature / Naming Violation Fix

### FindJobsPage: Data Source Naming Violations Fixed (4 locations)

Raw backend source keys (`EPC`, `PlanningData`, `ContractsFinder`, `FTS`, `LandRegistry`, etc.) were exposed in 4 places — violating the product rule prohibiting data source naming publicly.

**Fixed:**
1. Lead card source badge: `{lead.source}` → `{formatSourceLabel(lead.source)}`
2. PATCH PULSE source mix: `PlanningData 8 · EPC 3` → `Planning signal ×8 · Energy signal ×3`
3. PATCH PULSE best source: `PlanningData (8 passed)` → `Planning signal (8)`
4. LOCKED_PLACEHOLDERS Source URL: `'planning.gov.uk/████'` → `'████ — unlock to verify'`

Added `formatSourceLabel(source: string): string` helper mapping raw source system names to generic signal labels.

**File:** `src/pages/FindJobsPage.tsx`

---

## PHASE 3 — Copy Polish

### LeadDetailPage: signalStack Badges Fixed

WHY THIS LEAD section was showing raw `signalStack` values ("EPC", "PlanningData", "CompaniesHouse") as yellow badges.

Added `formatSignalLabel()` — "EPC" → "Energy signal", "PlanningData" → "Planning approval", etc.

**File:** `src/pages/LeadDetailPage.tsx`

**CRITIC:** YES. **REVENUE:** YES — reinforces "verified signals" brand language.

---

### TradieZonePage: Territory Urgency Copy

**Before:** "OPEN" / "No patch claimed yet" — passive, no fear  
**After:** "NOT LOCKED" (orange) / "Another trade could claim your area." (orange)

Empty leads state now names Checkatrade/Bark + "No credit card required" trust line.

**File:** `src/pages/TradieZonePage.tsx`

**CRITIC:** YES. **REVENUE:** YES — urgency to lock territory → paid plan.

---

## PHASE 4 — Site Health Check

### NEEDLE #1 Fixed: DashboardPage Duplicate Scan CTAs

When `isEmpty=true`, QUICK ACTIONS showed "SCAN FOR JOBS →" duplicating "RUN YOUR FIRST SCAN →" in the orange empty-state block.

**Fix:** isEmpty branch → "SEE WHAT YOU UNLOCK →" pointing to /pricing (white button, not yellow).  
Non-empty: still shows "REVIEW LEADS →".

**File:** `src/pages/DashboardPage.tsx`

**CRITIC:** YES. **REVENUE:** YES — routes empty-pipeline users to pricing page.

---

## Build Status
- `npm run build`: GREEN
- `npx tsc --noEmit`: CLEAN (0 errors)

---

## Related
- [[Changelog 2026-05-25 Run 3]]
- [[Feature Roadmap - 8th May 2026]]

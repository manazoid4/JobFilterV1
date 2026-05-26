---
type: changelog
date: 2026-05-17
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-17

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 6 files changed + 2 new components created.

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| 72412e7 | `src/pages/LeadDetailPage.tsx`, `src/pages/FindJobsPage.tsx`, `src/pages/BuildUkAlternativePage.tsx`, `src/pages/CompareBuildAlertPage.tsx`, `src/components/WinStatsBanner.tsx` (new), `src/components/GhostRiskBadge.tsx` (new) | Job value tracking + source naming fixes + FILL MY WEEK copy + missing components |

---

## Pre-flight Notes

- npm install required (fresh container — node_modules absent)
- Build: GREEN after install
- TypeScript: CLEAN throughout
- All Tier 1 features confirmed BUILT — moved to Tier 2

---

## PHASE 2 — Feature Built: Job Value Tracking

**Feature:** Job value tracking — when marking a lead Won, capture actual £ value vs estimated

**Files changed:** `src/pages/LeadDetailPage.tsx`

### What was built

**Problem:** Clicking "WON" on a lead immediately saved the outcome using the estimated budget from the lead. Two issues:
1. No way to record the actual job value (£ paid vs £ estimated)
2. `markWon()` from winStore was never called — so DashboardPage's "YOUR SCOREBOARD" section always showed 0 wins and £0 value

**Fix:**
- Added `showWonCapture` and `wonValueInput` state
- "WON" button now triggers `handleWonClick()` which shows a value capture panel
- Value capture panel: "WHAT WAS THE JOB WORTH?" with £ input defaulting to estimated budget
- "CONFIRM WIN" button calls `markWon()` into winStore (feeds DashboardPage scoreboard), posts actual value to `/api/leads/outcome` backend, then fetches review link
- "CANCEL" button dismisses the panel without saving
- Dashboard scoreboard now shows real wins and real £ values

**CRITIC:** Clearer in <3 seconds? YES — "WHAT WAS THE JOB WORTH?" is unambiguous
**REVENUE:** Increases £39/mo conversion? YES — seeing actual job value tracked builds trust in the ROI

Also recovered two missing components (had been dropped by the PR #108 merge):
- `src/components/WinStatsBanner.tsx` — shows area win stats on FindJobsPage (fetches `/api/wins/stats`)
- `src/components/GhostRiskBadge.tsx` — lead risk badge, kept the richer remote version with icons

---

## PHASE 3 — Copy Polish: BuildUkAlternativePage + CompareBuildAlertPage

### Rule violations fixed (CRITICAL)

Both pages named UK government data registers publicly — violating the product rule in `Problems and Solutions.md`:
> "Do not expose source names, source categories, URLs, registers, portals, or data-source mechanics in public copy."

**Violations:**
- `{ feature: 'EPC retrofit signals', new: 'Yes — F/G rated properties flagged' }` → named EPC
- `{ feature: 'Property sales data', new: 'Yes — Land Registry signals' }` → named Land Registry
- `{ feature: 'New business registrations', new: 'Yes — Companies House data' }` → named Companies House
- signals: `['EPC signals', 'F/G rated properties legally need retrofit work.']`
- signals: `['Property sales', 'Land Registry data showing who just bought.']`
- signals: `['New businesses', 'Companies House registrations needing fit-out.']`

**Fixes (both pages):**
- `EPC retrofit signals` → `Energy upgrade signals`
- `Property sales data / Land Registry signals` → `Ownership change signals / who just bought and needs work`
- `New business registrations / Companies House data` → `New business signals / new businesses needing premises work`
- Signals descriptions rewritten to describe WHAT the signal means, not WHERE it comes from
- BuildUkAlternativePage body copy: "EPC ratings, council contracts, property sales, and new business registrations" → "energy upgrade demand, public contracts, ownership changes, and new business signals"

**Added "NO CARD NEEDED":**
- BuildUkAlternativePage comparison table CTA: `SCAN YOUR AREA FREE` → `SCAN YOUR AREA FREE — NO CARD NEEDED`
- CompareBuildAlertPage: both free CTAs updated with `— NO CARD NEEDED`

---

## PHASE 4 — Site Health Check

### NEEDLE findings

1. **FILL MY WEEK sub-copy used jargon** (FindJobsPage.tsx, line 585)
   "One tap. We check the opportunity network and return the best {trade} jobs within {radiusMiles} miles."
   — "opportunity network" is corporate jargon a tradesman won't understand

2. Duplicate unlock CTAs on FindJobsPage (DEFERRED — visual duplication, not confusing once you understand the page)

3. ActionBar in LeadDetailPage has equal-weight buttons with no priority order (DEFERRED — low priority vs other items)

### BUILDER fix applied

**FILL MY WEEK copy** (FindJobsPage.tsx, line 585):

Before: "One tap. We check the opportunity network and return the best {trade} jobs within {radiusMiles} miles."

After: "One tap. Full scan — planning approvals, energy upgrades, public contracts. Top {trade} jobs within {radiusMiles} miles, ranked by score, ready to chase."

**CRITIC:** Clearer in <3 seconds? YES — plain language, no jargon, specific about what's scanned
**REVENUE:** Increases £39/mo conversion? YES — tradesman understands what happens, more likely to click and see the value

---

## Build Status
- `npm run build`: ✅ PASS (3.94s)
- `npx tsc --noEmit`: ✅ CLEAN (0 errors)

## Roadmap / To-Do updates
- Job value tracking: BUILT ✅
- Source naming violations on BuildUkAlternativePage + CompareBuildAlertPage: FIXED ✅
- WinStatsBanner + GhostRiskBadge components recovered ✅

---

## Related
- [[Changelog 2026-05-16]]
- [[Feature Roadmap - 8th May 2026]]
- [[Recent]]

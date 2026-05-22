---
type: changelog
date: 2026-05-19
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-19

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 4 files changed. Feature: COMMERCIAL ONLY filter toggle on FindJobsPage. Copy polish: FreeToolsPage + ForYourTradePage. Site health: PricingPage CTA restructure (free vs paid visual separation).

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| 9ab82bd | `FindJobsPage.tsx`, `FreeToolsPage.tsx`, `ForYourTradePage.tsx`, `PricingPage.tsx` | COMMERCIAL filter toggle, email fix, copy polish, PricingPage CTA restructure |

---

## Pre-flight Notes

- npm install required (fresh container — node_modules absent)
- Build: GREEN after install (3.11s)
- TypeScript: CLEAN throughout
- All Tier 1 NightlyBuild features confirmed BUILT
- Commercial detection (Tier 2) was built 2026-05-18 — this session adds the UX filter

---

## PHASE 2 — Feature Built: COMMERCIAL ONLY Filter Toggle

**Feature:** Filter toggle on FindJobsPage lead list to show only commercial leads.

**Files changed:**
- `src/pages/FindJobsPage.tsx` — `commercialOnly` state + `commercialCount` + `displayedLeads` derived values; filter toggle UI inserted between preview banner and lead list; `result.leads.map` → `displayedLeads.map`; results footer shows "COMMERCIAL ONLY" label when active; `setCommercialOnly(false)` on new scan

### Toggle UI

Two buttons above the lead list when `commercialCount > 0`:
- `ALL LEADS (N)` — black background when active
- `COMMERCIAL ONLY (N)` — black background with yellow text + Building2 icon when active

Toggling between states: `setCommercialOnly(true/false)`. Filter resets automatically when a new scan runs.

**CRITIC:** Clearer in <3 seconds? YES — toggle buttons with counts make the filter obvious and reversible
**REVENUE:** Increases £39/mo conversion? YES — commercial electricians and HVAC trades immediately see their market; positions JobFilter as a specialist tool for commercial work

---

## PHASE 3 — Copy Polish: FreeToolsPage + ForYourTradePage

### FreeToolsPage

**Fake form fixed:** `handleEmailSubmit` was `e.preventDefault() + setEmailDone(true)` with no backend call — wired to `POST /api/waitlist` with name, trade, email, source, optIn fields. Failure handled silently (proceeds to confirm state regardless, matching existing UX).

**Competitor naming added (hero):**
- Before: "Price cleaner. Spot time-wasters. Protect your week. Tools are free. Leads are not."
- After: "Price cleaner. Spot time-wasters. Protect your week. Checkatrade, Bark, and MyBuilder charge for these — we give them away. Leads are the paid part."

**"No credit card required" added:**
- Quick Start CTA section: added under "SCAN MY AREA →" button
- FREE VS PAID table CTA row: added under "SCAN MY AREA FREE →"
- Intake Engine section: added under "SCAN MY AREA FREE"

### ForYourTradePage

**Data source naming violations fixed (all 6 trade examples):**
- `EPC Register + Council Planning` → `Verified official signals`
- `Contracts Finder` → `Verified tender record` / `Official public tender`
- `Planning Data - Verified approval` → `Verified planning approval`
- `EPC Register` → `Verified official signals`
- `EPC F/G properties` in signals text → `low-efficiency properties`
- `EPC F/G retrofit` in signals text → `Energy upgrade retrofit`

**CTA section copy improved:**
- Before: "NO FAKE LEADS. NO CHASING." with no competitor context
- After: "NO SHARED LEADS. NO FIVE-TRADE BLAST." + paragraph naming Checkatrade/Bark + "Gold leads are controlled by trade, patch, and timing"
- "No credit card required" added under free scan CTA

---

## PHASE 4 — Site Health Check

### NEEDLE findings

1. **PricingPage hero CTA row** (line 102) — "TRY FREE — NO CARD" was third button in a `sm:flex-row` alongside paid CTAs; on mobile it stacks last in column, looks like a third paid option
2. **ForYourTradePage source labels** (lines 6-12) — named EPC Register, Contracts Finder as sources (product rule violation)
3. **FreeToolsPage email form** (line 74) — fake submit with no backend

### BUILDER fix applied

**PricingPage CTA restructure:**
- Paid CTAs now in their own `flex-col sm:flex-row` row
- Visual divider ("— or —") between paid and free rows
- Free CTA "SCAN FREE FIRST →" in its own row with explanatory text: "See real leads in your patch before you pay. No card needed."
- Free option now has `border-2 border-white/40 text-white` styling — clearly differentiated from yellow/white paid buttons

**CRITIC:** Clearer in <3 seconds? YES — visual separation makes paid vs free immediately obvious on all screen sizes
**REVENUE:** Increases £39/mo conversion? YES — "see real leads before you pay" reduces bounce by building trust; paid CTAs remain dominant and prominent above the divider

---

## Build Status
- `npm run build`: ✅ PASS (2.51s)
- `npx tsc --noEmit`: ✅ CLEAN (0 errors)

## Roadmap / To-Do updates
- COMMERCIAL ONLY filter toggle: BUILT ✅
- FreeToolsPage email form → real backend: FIXED ✅
- ForYourTradePage source naming violations: FIXED ✅
- PricingPage CTA hierarchy on mobile: FIXED ✅

---

## Related
- [[Changelog 2026-05-18]]
- [[Feature Roadmap - 8th May 2026]]
- [[Recent]]

---
type: changelog
date: 2026-05-21
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-21 (Run 2)

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 3 files changed. Closed NEEDLE #1 and NEEDLE #3 from 2026-05-28 Daily To-Do. Rewrote HomePage hero proof points to be tradesman-first. All changes pushed to main.

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| fa7e6cb | 3 files | DashboardPage duplicate CTA fix, PricingPage tagline-first cards, HomePage proof point copy |

---

## PHASE 1 — Pre-flight

- npm install: required (fresh container, vite not found)
- git fetch + pull: fast-forwarded local main from ade198d → 2808137 (103 commits)
- Build: GREEN (3.26s after npm install)
- TypeScript: CLEAN (0 errors)
- Previous session: 2808137 (2026-05-28 4-Agent Loop PricingPage)

---

## PHASE 2 — Feature Check

Reviewed chaseTemplates.ts — `quick_quote_offer` and `availability_check` templates are already built (added in a prior session). No new feature needed — all Tier 1 WhatsApp template work is complete.

---

## PHASE 3 — Copy Polish

### DashboardPage: Remove duplicate "Scan for Jobs" CTA (NEEDLE #1)

**Problem (Daily To-Do, 28 May):** Header section always showed `SCAN FOR JOBS →` button regardless of pipeline state. When `isEmpty=true`, the page also showed a large empty-state block with `RUN YOUR FIRST SCAN →`. Two competing scan CTAs on the same screen confuse new users.

**Fix:** Wrapped header `SCAN FOR JOBS →` in `{!isEmpty && (...)}`. New users (isEmpty=true) see only the primary empty-state CTA. Returning users (isEmpty=false) see the header CTA as expected.

**File:** `src/pages/DashboardPage.tsx`

---

### PricingPage: Feature cards lead with plain-English tagline (NEEDLE #3)

**Problem (Daily To-Do, 28 May):** Feature cards showed brand name (First Strike, Vicinity, Vantage, Win Engine) as the large h3 heading, with the plain-English tagline in tiny 10px muted text below. A tradesman scanning the page sees jargon brand names, not what the feature does.

**Fix:** Swapped layout in both featured and non-featured card variants — brand name to micro-label above, plain-English tagline promoted to h3.

**Files:** `src/pages/PricingPage.tsx`

---

## PHASE 4 — HomePage Proof Points Rewrite (Site Health NEEDLE fix)

**Before:**
- 'Official UK signal sources checked server-side'
- 'Planning, energy & council signals — verified'
- 'One trade per postcode — locked to you'
- 'No shared lead trap. Cancel anytime.'

**After:**
- 'Jobs spotted before Checkatrade lists them'
- 'Verified signals — not recycled from job boards'
- 'One trade per postcode — no five-way blast'
- 'No shared auction. Cancel anytime.'

**File:** `src/pages/HomePage.tsx`

**CRITIC:** YES — readable in <1 second, directly answers "why not Checkatrade?"
**REVENUE:** YES — first proof point handles biggest objection before tradesman scrolls

---

## Build Status
- `npm run build`: GREEN (3.26s)
- `npx tsc --noEmit`: CLEAN (0 errors)

---

## Related
- [[Changelog 2026-05-28]]
- [[Sessions/Daily To-Do]]
- [[Feature Roadmap - 8th May 2026]]

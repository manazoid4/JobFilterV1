---
type: changelog
date: 2026-05-24
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-24

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. Dashboard visual hierarchy fixed. EPC naming violations fixed across HomePage + PricingPage. LeadListPage empty state overhauled for new-user clarity. Site health check: LeadListPage empty state was highest-impact issue — fixed.

## Commit Pushed

| Commit | Files | Change |
|--------|-------|--------|
| b585cd2 | 4 files | Dashboard box accents, EPC copy fixes, LeadListPage empty state |

---

## PHASE 1 — Pre-flight

- Build: GREEN (3.16s)
- TypeScript: CLEAN (0 errors)
- Previous session: 0ae16bd → a9d2746 (remote had 7 commits ahead from PRs)

---

## PHASE 2 — Feature / UI Fix

### DashboardPage: TRACKING and RESULTS box visual distinction

Open to-do item from 2026-05-23: "TRACKING and RESULTS boxes still plain white — add left border accent (orange/green) to visually distinguish from SCAN yellow box."

**Change:** Applied `borderLeftColor` + `borderLeftWidth: 4px` inline styles to all 4 affected boxes:
- Pipeline grid: TRACKING box → orange left border, RESULTS box → green left border
- Detail section: YOUR PIPELINE (TRACKING) → orange, YOUR SCOREBOARD (RESULTS) → green

**File:** `src/pages/DashboardPage.tsx`

**CRITIC:** Clear in <3 seconds? YES — orange = in-progress, green = won. Yellow = scan. No training needed.
**REVENUE:** YES — clearer visual hierarchy makes the dashboard feel finished and trustworthy.

---

## PHASE 3 — Copy Polish

### HomePage — EPC naming violations

| Location | Before | After |
|----------|--------|-------|
| Hero body | "planning, EPC and council data" | "planning, energy and council signals" |
| proofPoints[1] | "Planning, EPC & council data where available" | "Planning, energy & council signals — verified" |

### PricingPage — EPC naming violations + missing CTA label

| Location | Before | After |
|----------|--------|-------|
| included list | "Keyword search across planning, EPC & council signals" | "Keyword search across planning, energy & council signals" |
| Patch Watch description | "new planning, EPC, tender, and fit-out signals" | "new planning, energy upgrade, tender, and fit-out signals" |
| Patch Watch items | "Planning and EPC alerts" | "Planning and energy upgrade alerts" |
| Free Scan CTA | No sub-label | "No credit card required." added below button |

---

## PHASE 4 — Site Health Check

### NEEDLE findings (top 3)

1. **LeadListPage: search bar shows before any leads exist** — "Search leads — job type, area, postcode" placeholder implies data is present when there are no leads. NEW user lands here with no leads, sees a search box, and is confused. HIGH IMPACT — first-time user experience killer.

2. **"FILL MY WEEK" CTA unclear** — tradesman doesn't know if it runs another scan or opens a different result set. Looks like duplicate of SCAN NOW. MEDIUM IMPACT.

3. **LeadDetailPage loss reason flow** — must pick reason before clicking LOST, but UI says "DID YOU WIN IT?" — binary phrasing doesn't match multi-step flow. LOW-MEDIUM IMPACT (edge case, only affects chase phase users).

### BUILDER fix

**LeadListPage empty state overhaul** (`src/pages/LeadListPage.tsx`):

**Before:**
- Search bar + tabs always visible, even with 0 leads
- "Search leads — job type, area, postcode" placeholder when empty (implies leads exist)
- Empty state CTA: navy text on white (`text-[var(--navy)]`) — low visual weight

**After:**
- When `stored.length === 0`: show yellow SCAN FOR JOBS NOW CTA directly — no search box, no tabs
- When `stored.length > 0` but `visible.length === 0` (tab/search filter): show "NO GOLD LEADS MATCH" + CLEAR FILTER button
- When `stored.length > 0`: show search + tabs + lead cards as before
- Empty state upgraded: yellow box (`bg-[var(--yellow)]`), ink button, "No credit card required"

**CRITIC:** Clear in <3 seconds? YES — first-time users see one yellow CTA: SCAN FOR JOBS NOW. No confusion about missing data vs empty search.
**REVENUE:** YES — removing the false "search implies leads exist" signal reduces drop-off before first scan.

---

## Build Status
- `npm run build`: GREEN (3.14s)
- `npx tsc --noEmit`: CLEAN (0 errors)

---

---

## MasterBuildAgent Session — 2026-05-24 (afternoon)

**Root cause found and fixed:** `next.config.ts` had `distDir: 'dist'` conflicting with `vercel.json` `outputDirectory: '.next'`. Vercel was serving the old Vite `dist/index.html` (empty body + union-flag favicon) instead of the Next.js app — hence "only shows a British flag."

**Fix:** Removed `distDir: 'dist'` from next.config.ts. Next.js now outputs to `.next/` matching Vercel config.

**Commit:** `d2c79c2 fix: restore broken JobFilter website`

**Verification:** `curl https://jobfilter.uk` returns full SSR HTML with hero, nav, all page content. CSS variables load correctly. API routes return data.

**Session also launched:**
- Agent system build (10 agents with prompts/schedules)
- Vault GitHub migration to private repo
- Vault cleanup and MOC creation
- Daily/weekly/monthly run scripts

---

## Vault Reorganisation Session — 2026-05-24

- Created private GitHub repo: `manazoid4/JobFilter-Obsidian-Vault`
- Created vault root folder structure: `00_Inbox/` through `99_Archive/`
- Created vault root `README.md` and `.gitignore`
- Created MOC files: `JobFilter HQ.md`, `Product Map.md`, `Agent System Map.md`
- Created subfolder README.md index files for: Marketing/, Sessions/, System/, Design/, Sisyphus/, Prompts 1/, 07_Logs/
- No files deleted or moved — vault content preserved
- Secrets scan: CLEAN
- See: [[07_Logs/Vault Cleanup Log - 2026-05-24]]

## Related
- [[Changelog 2026-05-23]]
- [[Feature Roadmap - 8th May 2026]]
- [[Recent]]
- [[07_Logs/Vault Cleanup Log - 2026-05-24]]

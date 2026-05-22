---
type: changelog
date: 2026-05-22
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-22

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. Comprehensive EPC source naming violation sweep across 10 files (CityPage component, EpcPage, Footer, TradeElectricians, CompareBuildAlertPage, CompareCheckatradePage, BuildUkAlternativePage, BlueprintPage, signalGenerator.ts). FindJobsPage: pre-scan UX fixed + scan counter now visible to new users before first scan.

## Commit Pushed

| Commit | Files | Change |
|--------|-------|--------|
| 37cae54 | 10 files | EPC naming violations cleared + FindJobsPage pre-scan UX fix |

---

## PHASE 1 — Pre-flight

- Build: GREEN (4.34s)
- TypeScript: CLEAN (0 errors)
- Previous session: 535ba89 ci: trigger Firebase redeploy with CSS cascade fix
- All Tier 1 features confirmed BUILT per changelog 2026-05-21

---

## PHASE 2 — Build Tier 1 Features

All Tier 1 features are BUILT. No new feature built this session — focus was on comprehensive EPC naming violation sweep across all public pages (discovered during phase 3 scan).

---

## PHASE 3 — Copy Polish

### EpcPage.tsx

| Location | Before | After |
|----------|--------|-------|
| micro-label | `EPC LEADS` | `RETROFIT LEADS` |
| h1 | `EPC ENERGY UPGRADES — FLAGGED BEFORE ANYONE KNOCKS.` | `ENERGY UPGRADES — FLAGGED BEFORE ANYONE KNOCKS.` |
| Vicinity heading | `VICINITY: HYPER-LOCAL EPC ADS.` | `VICINITY: HYPER-LOCAL RETROFIT ADS.` |
| GET EPC ALERTS micro-label | `GET EPC ALERTS` | `GET RETROFIT ALERTS` |
| CTA body | `Join the EPC lead list` | `Join the retrofit lead list` |
| Hero body | weak single sentence | added Checkatrade competitor naming + no-shared-auction copy |

### CityPage.tsx (affects 6 city pages: Birmingham, London, Manchester, Bristol, Leeds, Glasgow)

| Location | Before | After |
|----------|--------|-------|
| Birmingham heroSub | `EPC data, and council contract notices` | `verified energy signals, and council contract notices` |
| Birmingham localAngleBody | `every EPC rating` | `every energy signal` |
| London localAngleBody | `every EPC assessment` | `every energy signal` |
| Manchester heroH1 | `planning, EPC and council contracts` | `planning, energy signals and council contracts` |
| Manchester heroSub | `every EPC rating` | `every energy signal` |
| Manchester localAngleBody | `EPC upgrades` | `energy upgrades` |
| Bristol heroSub | `every EPC assessment` | `every energy signal` |
| Bristol localAngleBody | `EPC upgrades` / `every F/G-rated property` | `retrofit upgrades` / `every low-rated property` |
| Leeds heroSub | `EPC signals` | `energy signals` |
| Leeds localAngleBody | `every EPC upgrade` | `every energy upgrade` |
| Glasgow heroSub | `every EPC assessment` | `every energy signal` |
| Glasgow statsNote | `its own EPC regulations` | `its own energy efficiency regulations` |
| Glasgow localAngleBody | `EPC regulations are different` / `EPC upgrades` | `Energy regulations are different` / `energy upgrades` |
| Page title | `Planning, EPC & Council Contracts` | `Planning, Energy & Council Contracts` |
| Meta description | `EPC data, and council contracts` | `verified energy signals, and council contracts` |
| Stats card | `EPC F/G PROPERTIES` | `LOW-RATED PROPERTIES` |
| Step 02 | `EPC ratings for every property` | `energy signals for every property` |
| Sample lead | `EPC LEAD` / `Efficiency Upgrade: Rating F` | `RETROFIT LEAD` / `Efficiency Upgrade: Low-Rated Property` |
| Coverage text | `EPC data, and council contracts` | `energy signals, and council contracts` |
| Other Cities section | `EPC, and council data` | `energy signals, and council data` |
| JobFilter comparison | `Three data sources — planning, EPC, council contracts` | `Three data sources — planning, energy signals, council contracts` |
| Other Cities card | `F/G properties` | `retrofit properties` |

### Footer.tsx

| Location | Before | After |
|----------|--------|-------|
| Nav link | `EPC Leads` | `Retrofit Leads` |

### TradeElectricians.tsx

| Location | Before | After |
|----------|--------|-------|
| painPoints[3] | `planning and EPC data` | `planning approvals and verified energy signals` |
| metaDescription | `EPC data, and council contracts` | `verified energy signals, and council contracts` |

### CompareBuildAlertPage.tsx

| Location | Before | After |
|----------|--------|-------|
| Problem list | `No EPC signals — misses F/G retrofit demand` | `No energy signals — misses retrofit demand entirely` |
| Timeline copy | `Signal detected — planning, EPC, or contract` | `Signal detected — planning, energy, or contract` |
| Trust card | `Official sources only / EPC registers. Not forms. Not ads.` | `Verified signals only / Planning approvals, public contracts, verified energy signals.` |

### CompareCheckatradePage.tsx

| Location | Before | After |
|----------|--------|-------|
| Feature table | `EPC signals` | `Energy signals` |
| Signals array | `EPC signals / F/G rated properties` | `Energy signals / Low-rated properties` |
| CTA list | `Official data — planning, EPC, contracts` | `Verified signals — planning, energy, contracts` |

### BuildUkAlternativePage.tsx

| Location | Before | After |
|----------|--------|-------|
| Trust card | `Official sources only / EPC registers` | `Verified signals only / verified energy signals` |

### BlueprintPage.tsx

| Location | Before | After |
|----------|--------|-------|
| Homeowner Retrofit signal | `EPC F/G rating` | `Energy efficiency rating` |
| Renovation Cascade signal | `Low EPC` | `Low energy rating` |
| Signal Scoreboard | `EPC F/G retrofit clusters` | `Retrofit clusters (low-rated)` |
| Data sources list | `EPC registers` | `Energy efficiency signals` |
| Pipeline step | `EPC registered, permit filed` | `Energy signal filed, permit issued` |
| Feature bullets | `Flag EPC F/G ratings as retrofit opportunities` | `Flag low-rated properties as retrofit opportunities` |
| Example lead | `EPC F rated, detached, M20 2AR` | `Low-rated property, detached, M20 2AR` |
| Hero body | `EPC records` in sources list | `energy signals` |
| Fusion moat | `planning application plus low EPC` | `planning application plus low energy rating` |

### signalGenerator.ts

| Location | Before | After |
|----------|--------|-------|
| RSS description | `EPC ratings, council contracts` | `energy signals, council contracts` |

---

## PHASE 4 — Site Health Check

### NEEDLE findings (top 3)

1. **FindJobsPage pre-scan state buttons** — "TRY A DIFFERENT POSTCODE" and "WIDEN YOUR TRADE SEARCH" both imply the user has already scanned and got no results. A brand-new tradesman who hasn't scanned yet sees these and gets confused about what state they're in. **HIGH IMPACT** — scan is the entry to the conversion funnel.

2. **FindJobsPage scan counter hidden for new users** — `weeklyScansUsed > 0` condition meant a first-time user never saw "3 free scans this week — no credit card required" before their first scan. They didn't know they had free capacity.

3. **EpcPage EPC naming throughout** — Named the data source on every section of the dedicated /epc page, which is a public marketing page. Fixed comprehensively above.

### BUILDER fixes

#### Fix 1: FindJobsPage pre-scan buttons

**Before:**
- `TRY A DIFFERENT POSTCODE` → `onClick: submit()` (before any scan has happened!)
- `WIDEN YOUR TRADE SEARCH` → sets building trade and scans
- Body: "No signup needed"

**After:**
- `SCAN MY AREA →` → same action, correct framing
- `SCAN BUILDING WORK` → same action, clearer label
- Body: "No credit card required" (matches product rules)

**CRITIC:** Clearer in <3 seconds? YES — "SCAN MY AREA →" is an instruction, not an error recovery action.
**REVENUE:** YES — first scan starts the conversion funnel. Removing confusion at this step increases scan rate.

#### Fix 2: FindJobsPage scan counter visibility

**Before:** `{!OPEN_ACCESS && weeklyScansUsed > 0 && (` — hidden for new users

**After:** `{!OPEN_ACCESS && (` — always shows with:
- New users (0 scans): "3 free scans left this week — no credit card required" + "Resets Monday" hint
- Existing users (1-2 scans): remaining count with "no credit card required"
- Depleted users: "Weekly free scans used. Upgrade for unlimited." + UNLOCK link

**CRITIC:** Clearer in <3 seconds? YES — new users immediately see they have 3 free scans.
**REVENUE:** YES — telling users they have free capacity before they've committed to scanning removes the "what does this cost me?" barrier.

---

## Build Status
- `npm run build`: GREEN (4.15s)
- `npx tsc --noEmit`: CLEAN (0 errors)

---

## Related
- [[Changelog 2026-05-21]]
- [[Feature Roadmap - 8th May 2026]]
- [[Recent]]

---

# Run 2 — NightlyBuildAgent

## Summary
buildReasons() stub wired for free-tier. FindJobsPage EPC violations from "Works Starting Now" commit fixed. Copy polish on VantagePage, VicinityPage, DashboardPage. Build: GREEN. TypeScript: CLEAN.

## Commit Pushed
| Commit | Files | Change |
|--------|-------|--------|
| 3df9775 | 6 files | buildReasons wired, EPC violations fixed, copy polish |

---

## Phase 1 — Bug Fixes

### server/routes/leadsSearch.ts — buildReasons() stub replaced

**Root cause:** `buildReasons()` returned `['Paid preview - unlock buyer, deadline, exact value, and action route']` as a catch-all. `parseTradeReasons()` in FindJobsPage never matched this pattern, so all free-tier users always saw "Verified signal" fallback — never trade-specific reasons even when `scoreReasons` had them.

**Fix:** Filter `lead.scoreReasons` for safe-to-show patterns only (max 5):
- `Trade match:`, `Related:`, `High intent keywords:`
- `Urgent timeline`, `Medium urgency`, `Fresh lead`
- `pay-worthy range`, `value acceptable`, `Commercial project`

### src/pages/FindJobsPage.tsx — EPC violations in Works Starting Now mode

New commit `7d4f1fe` had introduced three EPC violations:
- "Broad scan across planning, contracts, EPC and property signals." → "energy signals and property data"
- "Start Signal mode ranks …EPC, Companies House and property signals." → "energy signals and property data"
- "Paid monthly access keeps checking planning, EPC, tender…" → "planning, energy, tender…"

Also resolved rebase conflict: kept origin/main's `hasDevUnlock()` localStorage pattern and `weeklyLimit` vs WEEKLY_SCAN_LIMIT calculation; kept NightlyBuild's EPC copy fixes.

### src/pages/PostJobPage.tsx

"Planning, EPC, patch demand" → "Planning approvals, energy signals, patch demand"

---

## Phase 3 — Copy Polish

### DashboardPage.tsx
Scan counter now shows paywall limit clearly:
- 0 scans: "None yet — run your first scan"
- 1-2 scans: "${n} of 3 free used"
- 3+ scans: "${n} of 3 used — upgrade for unlimited"

### VantagePage.tsx
- DEMO PREVIEW badge (navy bg, yellow text, absolute top-right) over fake upload UI
- Hero sub-copy: vague "professional proposals" → "Drop your tender documents. Get a properly structured bid deck in under a minute — no copy-paste, no blank-page terror."

### VicinityPage.tsx
- Hero sub-copy: names Checkatrade subscription threat — "cancel your subscription and they're gone. Vicinity turns every finished job into local proof you own."
- Price CTA: "GET FOUNDING 30" → "LOCK MY £39/MO PATCH" (was wrong price, £30 vs actual £39 founder rate)

---

## Infrastructure
- src/pages/CityIntelligencePage.tsx: DU conflict resolved (staged deletion — file removed on main)
- Git stash dropped
- Build: GREEN, TypeScript: CLEAN

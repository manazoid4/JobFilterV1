# Changelog 2026-07-30

PR: #412 — nightly/2026-07-30-trade-scoring-ux

## PRE-FLIGHT

- Build: PASS (after npm install — node_modules was absent in fresh container)
- TypeScript: CLEAN (0 errors)
- Vault files: not present in repo — ran without product strategy docs

## PHASE 1 — FIX BROKEN

- Fixed: `vercel.json` cron `0 * * * *` (hourly) → `0 8 * * *` (daily 08:00 UTC)
  — Vercel Hobby does not allow sub-daily crons; this was blocking every deploy preview
  — Root cause: introduced in PR #383 "Transition to FTS & Commercial Workflows"

## PHASE 2 — FEATURE BUILT

**Trade-specific scoring UX** (`server/routes/leadsSearch.ts`)

- Added `TRADE_TITLE_KEYWORDS` constant: 8-trade map of job-type keywords per trade
  (e.g. electrical → EV CHARGER, REWIRE, CONSUMER UNIT, EICR, SOLAR PV...)
- `buildPreviewReasons()` now has a 5th fallback: scan the original (unmasked) lead
  title for trade keywords when scoreReasons yield no Trade match / Related / High
  intent / Commercial / Urgent reason
- Effect: free-tier users on PlanningData, CompaniesHouse, LandRegistry, EPC, and
  DirectorySignal leads now see specific trade reasons ("EV CHARGER", "BOILER") rather
  than "Verified signal" — more trust, better relevance signal before upgrade

## PHASE 3 — COPY POLISH

**HomePage** (`src/pages/HomePage.tsx`)
- Hero sub-paragraph: rewrote to fear→proof→control structure
  Before: "JobFilter scans current Find a Tender notices and shows the evidence..."
  After: "Most firms waste days on tenders that never fitted them. JobFilter checks
  each Find a Tender notice against your trade, region, and contract range — and gives
  you a clear BID, WATCH, SUBCONTRACT, or SKIP verdict with the evidence behind it."

**PricingPage** (`src/pages/PricingPage.tsx`)
- Added FAQ entry: "How is this different from Planning Pipe or BuildAlert?"
  Distinguishes source type (planning signals vs live public tenders) and call to action

## PHASE 4 — SITE HEALTH

**NEEDLE** — top 3 UX issues found:
1. Scan-limit exhausted message was confusing ("Scanning remains free" undersells upgrade)
2. Upgrade CTA when scans run out was tiny inline text-xs — easy to miss on mobile
3. Hard-coded "SCAN BUILDING WORK" button appears regardless of user's selected trade

**BUILDER** — fixed issues 1 + 2 (`src/pages/FindJobsPage.tsx`):
- Zero-scans state: split into own bordered section with orange border
- New message: "3 scans used this week — buyer names, deadlines, and full lead values are locked. Resets Monday. Upgrade to scan unlimited and unlock all details."
- Full-width yellow UNLOCK CTA replaces the previous tiny inline button

**CRITIC**: Clearer in <3 seconds? YES
**REVENUE**: Increases likelihood of paying £39/month? YES

## STATUS

- Build: PASS
- TypeScript: CLEAN
- PR #412 open and pushed to branch

## NEXT RUN PRIORITIES

1. **Cron delivery verification** — check `/api/alerts/send` is working once-daily; confirm no other sub-daily schedules remain in vercel.json or elsewhere
2. **SCAN BUILDING WORK button** (NEEDLE issue #3) — replace with trade-aware secondary scan button that uses the user's selected trade, not hard-coded "building"
3. **WinStatsBanner empty state** — when `wonCount === 0` for a postcode, nothing renders; consider showing a "No tracked wins yet — mark a job as won to see your stats" nudge for logged-in users

# Changelog 2026-05-30 Run 2 — NightlyBuildAgent

**Commit:** `addcbcf`
**Branch:** nightly-build-2026-05-30
**PR:** #228
**Build:** GREEN (95 pages) | TypeScript: CLEAN

---

## Pre-Flight

- `npm install` required (fresh container — no node_modules)
- `npm run build` → GREEN (95 pages)
- `npx tsc --noEmit` → CLEAN
- All Tier 1 features confirmed BUILT from prior runs (scan counter, calendar ICS, WinStatsBanner, WhatsApp templates including quick_quote_offer + availability_check, trade-specific scoring)
- No broken form submissions found — all setSubmitted/setEmailDone calls are wired to real endpoints

---

## Phase 1 — No Broken Patterns Found

- All forms wire to real backend endpoints: `/api/waitlist`, `/api/intake/score`, `/api/waitlist`
- No dead `href="#"` links (except legitimate same-page anchors like TradieStackPage `#buy`)
- Server-side scan limit confirmed implemented in `leadsSearch.ts` (FREE_WEEKLY_SCAN_LIMIT = 3, Supabase-backed per-user weekly counter)

---

## Phase 2 — Tier 1 All Built; Verified APIs

- All listed Tier 1 features confirmed built and wired:
  - Scan counter: FindJobsPage, localStorage-based + server-side enforcement
  - Google Calendar ICS: `/api/leads/calendar.ics` route in `calendarExport.ts`, LeadDetailPage ADD TO CALENDAR + COPY CALENDAR LINK buttons
  - WinStatsBanner: `/api/wins/stats?postcode=` route in `outcomeReport.ts`, component on FindJobsPage
  - WhatsApp templates: 6 total in chaseTemplates.ts including quick_quote_offer + availability_check
  - Trade-specific scoring: parseTradeReasons() in FindJobsPage + buildReasons() in leadsSearch.ts

---

## Phase 3a — Copy Polish: TradeSolar

### `src/pages/TradeSolar.tsx`

**EPC naming violations fixed (7 total):**
- `sub`: "EPC data" → "energy signals"
- `painPoints[0]`: "comparison platforms" → "Checkatrade, Bark, and MCS consumer sites" (specific competitor naming)
- `painPoints[2]` label: "EPC-driven demand is hard to track" → "Energy upgrade demand is hard to track"
- `painPoints[2]` body: "energy performance data" kept (no raw EPC)
- `signals[1]` label: "EPC energy signals" → "Energy signals"
- `howItWorks[0]`: "EPC data" → "energy signals"
- `tradeLeadExample` signal row: "EPC D rating" → "low energy rating"
- `comparisonOld[0]`: "comparison platforms" → "Checkatrade, Bark, or MCS"
- `comparisonOld[1]`: "EPC lists" → "energy upgrade lists"
- `comparisonNew[3]`: "EPC signals" → "Energy signals"
- `metaDescription`: "EPC data"/"EPC-flagged" → "energy signals"/"energy-flagged"

---

## Phase 3b — Copy Polish: TradeStructuralEngineers

### `src/pages/TradeStructuralEngineers.tsx`

**Changes:**
- `painPoints[2]` body: "But no platform tracks this demand — it sits in planning portals, unread" → "But nobody tracks this demand and routes it to engineers — it sits unread until the client starts Googling" (removes "platform" corporate word; more human)
- `comparisonOld[4]`: "every other structural engineer when the homeowner finally searches online" → "every other engineer on Bark or Google — race to the bottom on fees" (specific competitor naming)
- `comparisonOld[5]`: "staff utilisation" → "quote load" (plain trade language)

---

## Phase 4 — Site Health: DashboardPage NEEDLE-2

### `src/pages/DashboardPage.tsx`

**NEEDLE-2 (flagged in Run 1 as next-run priority):** When a user had pipeline data (`!isEmpty`), the header showed a yellow "SCAN FOR JOBS →" CTA AND the pipeline SCAN card showed "SCAN AGAIN →" — two identical scan CTAs in the same view.

**Fix:** Removed the header "SCAN FOR JOBS →" block (`{!isEmpty && <Link ...>SCAN FOR JOBS →</Link>}`) — 5 lines deleted.

**CRITIC:** Clearer in <3 seconds? YES — one scan entry point (pipeline card) vs two competing buttons.
**REVENUE:** YES — reduces friction for returning users who already have data; they can scan from the pipeline card without second-guessing which button to use.

---

## Bonus: CityIntelligencePage Stale Date Fix

### `src/pages/CityIntelligencePage.tsx`

- Added `currentWeekLabel()` function that computes the Monday-anchored current week label from `new Date()`
- `{intel.weekOf}` → `{currentWeekLabel()}` in the render — week label now always shows the current week, not hardcoded "Week of 19 May 2026"
- Footer text: "Live briefings pull from real planning, EPC and tender feeds" → "...verified planning, energy, and tender signals" (removes EPC naming)

---

## Metrics

- Files changed: 4 source files
- Build: GREEN (95 pages)
- TypeScript errors: 0
- PR: #228 (nightly-build-2026-05-30 → main)

---

## Next Run Priorities

1. **Stripe live test** — wire end-to-end with test key (4242 4242 4242 4242), confirm `/dashboard?welcome=1` and `profiles.plan` flip in Supabase. Blocked on test keys in Vercel env.
2. **TradeDampProofers + TradeFireSafety copy** — check for source naming violations and competitor naming gaps (not yet reviewed this run)
3. **DashboardPage "last scan" card improvement** — the pipeline SCAN card shows raw `scansUsed` count; consider showing the most recent scan's lead count (e.g. "8 leads found") from localStorage scan history for more meaningful feedback

# Changelog 2026-05-31 Run 2 — NightlyBuildAgent

**Commit:** `c0584fa`
**Branch:** main (pushed directly)
**Build:** GREEN (98 pages) | TypeScript: CLEAN

---

## Pre-Flight

- `npm install` required (fresh container — no node_modules)
- `npm run build` → GREEN (98 pages, no TypeScript errors)
- All Tier 1 features confirmed BUILT from prior runs
- WhatsApp templates "Quick quote offer" + "Availability check" confirmed in chaseTemplates.ts

---

## Phase 1 — Fix Broken

No broken builds or TypeScript errors on start. Build was clean after `npm install`.

---

## Phase 2 — Build Tier 1 Features

All 5 Tier 1 features from the agent prompt confirmed BUILT:
- Scan counter: BUILT
- Google Calendar ICS export: BUILT (GET /api/leads/:id/calendar.ics + COPY CALENDAR LINK)
- Won leaderboard: BUILT (WinStatsBanner + outcomes.jsonl)
- WhatsApp templates (+2 new): BUILT (quick_quote_offer + availability_check in chaseTemplates.ts)
- Trade-specific scoring UX: BUILT

No new Tier 1 feature was required this run.

---

## Phase 3 — Copy Polish (EPC Naming Sweep)

### `src/pages/TradeDampProofers.tsx` — 14 violations fixed

All EPC references replaced with energy-equivalent language:
- `sub`: "JobFilter scans EPC data" → "energy signals"
- `stats[2]`: "planning, EPC, and transaction signals" → "planning, energy signals, and property data"
- `signals[0]` label: "EPC moisture signals" → "Energy moisture signals"
- `signals[0]` body: "EPC flags for ventilation" → "energy flags for ventilation"
- `howItWorks[0]`: "We scan EPC data" → "We scan energy signals"
- `howItWorks[1]`: "EPC moisture flags" → "Energy moisture flags"
- `howItWorks[2]`: "with EPC moisture flags" → "with moisture signals"
- `tradeLeadExample` Urgency: "EPC survey data updated" → "Energy signals updated"
- `tradeLeadExample` Signal type: "Verified EPC signal" → "Verified energy signal"
- `tradeLeadExample` Signal: "EPC surveys flagging" → "energy signals flagging"
- `whatsappMessage`: "EPC cluster identified" → "Energy signals identified"
- `comparisonOld[1]`: "cross-referencing EPC data" → "cross-referencing energy signals"
- `comparisonNew[0]`: "unlimited EPC and planning scans" → "unlimited energy and planning scans"
- `comparisonNew[1]`: "EPC moisture flags" → "Energy moisture flags"
- `comparisonNew[4]`: "within minutes of EPC update" → "within minutes of energy update"
- `metaDescription`: "JobFilter scans EPC data" → "energy signals"

### `src/pages/TradeGasEngineers.tsx` — 15 violations fixed

- `painPoints[2]` heading: "EPC-driven replacement demand" → "Energy-driven replacement demand"
- `painPoints[2]` body: "EPC F and G-rated properties" → "low energy-rated properties"
- `stats[3]`: "Councils scanned for EPC" → "energy and planning signals"
- `signals[0]` label: "EPC energy signals" → "Energy efficiency signals"
- `signals[0]` body: "Properties rated EPC F and G" → "Properties with low energy ratings"
- `howItWorks[0]`: "We scan EPC data" → "energy signals"
- `howItWorks[1]`: "EPC F/G properties" → "Low energy-rated properties"
- `howItWorks[2]`: "six EPC G-rated terraces" → "six low-rated terraces"
- `tradeLeadExample.title`: "EPC G-rated terrace cluster" → "Low-efficiency terrace cluster"
- `tradeLeadExample` Urgency: "EPC data updated" → "Energy signals updated"
- `tradeLeadExample` Signal type: "Verified EPC signal" → "Verified energy signal"
- `tradeLeadExample` Signal: "EPC G cluster identified" → "Low-efficiency cluster"
- `whatsappMessage`: "EPC data flagged" + "EPC G cluster" → "Energy signals updated" + "Low-efficiency cluster"
- `comparisonOld[2]`: "EPC-flagged properties" → "energy-flagged properties"
- `comparisonNew[1]`: "EPC signals go to you" → "Energy signals go to you"
- `comparisonNew[4]`: "within minutes of EPC update" → "energy update"
- `metaDescription`: "JobFilter scans EPC data" + "EPC F/G properties" → "energy signals" + "Low-rated properties"

### `src/pages/CompareRatedPeoplePage.tsx` — 4 violations fixed

- comparison table "Lead source": "Planning data, public contracts, EPC, land registry" → "Planning approvals, public contracts, energy signals, property data"
- comparison table "Energy upgrade signals": "retrofit demand mapped from EPC data" → "verified retrofit demand signals"
- hero body: "JobFilter scans planning data, council contracts, and EPC signals" → "planning approvals, council contracts, and energy signals"
- JOBFILTER SOURCE list: "Government planning, council tenders, land registry, EPC data" → "property ownership data, energy signals"

### `src/pages/NewsPage.tsx` — 2 violations fixed

- trend label: "EPC-driven quote requests" → "Energy upgrade quote requests"
- hero body: "EPC compliance." → "Energy compliance."

### `src/pages/TradeSolar.tsx` — 1 violation fixed

- whatsappMessage: "existing EPC D" → "low energy rating"

---

## Phase 4 — Site Health Check (NEEDLE)

### NEEDLE scan found 3 issues:
1. **Duplicate UNLOCK CTAs** — 4× "UNLOCK FOR £39/MO →" on FindJobsPage (decision fatigue)
2. **Jargon wall** — "source-fused evidence", "PATCH PULSE" confuse tradespeople
3. **FILL MY WEEK progress** — no estimated time or cancel option during fill phase

### BUILDER fix — Issue #2 (highest-impact, quickest fix):

**`src/pages/FindJobsPage.tsx` line 485:**

**Problem:** When user selects "Works Starting Now" scan mode, they see:
`"Start Signal mode ranks source-fused evidence like planning approvals..."`

"Start Signal mode" doesn't match the button label ("Works Starting Now"). "Source-fused evidence" is pure jargon — a plumber has no idea what it means.

**Fix:** `"Start Signal mode ranks source-fused evidence like planning approvals, building-control movement, energy signals, business registrations, and property data. Verify source links before contacting anyone."`
→ `"Works Starting Now shows jobs with the strongest timing signals — planning approvals, building-control movement, energy upgrades, and business activity. Check the source link before contacting anyone."`

**CRITIC:** Clearer in <3 seconds? YES — label matches the button, no unexplained jargon.
**REVENUE:** YES — reduces confusion at the moment a tradesman is most engaged with live results.

---

## Metrics

- Files changed: 6 source files
- Lines: 39 insertions, 39 deletions (surgical, zero net additions)
- Build: GREEN (98 pages)
- TypeScript errors: 0 found, 0 remaining
- Naming violations fixed: 36 (across 5 trade/comparison pages)
- Jargon fixes: 1 (FindJobsPage — "source-fused evidence")

---

## Next Run Priorities

1. **Duplicate UNLOCK CTAs on FindJobsPage** — 4 instances causing decision fatigue. Consolidate to max 2 strategic placements (banner + one per locked lead card, not both).
2. **FILL MY WEEK progress UX** — Add estimated time ("takes ~10 seconds") or progress indicator. Currently opaque — looks broken to a tradesman on a slow connection.
3. **Stripe live test** — 4242 4242 4242 4242, confirm `/dashboard?welcome=1` and `profiles.plan` flip. Still blocked on test keys in environment.

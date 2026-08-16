# Changelog 2026-08-16

## NightlyBuildAgent Run

### Build status
- Build: PASS
- TypeScript: PASS (0 errors)
- npm audit: PASS (0 vulnerabilities — after fixing pre-existing highs)

---

### Feature built — Trade-specific scoring badges

**File:** `src/pages/FindJobsPage.tsx`

Added `TRADE_SPECIFIC_SIGNALS` map with ~10 keywords per trade:

| Trade | Example keywords shown on badges |
|---|---|
| electrical | EV CHARGER, REWIRE, CONSUMER UNIT, EICR, SOLAR PV |
| plumbing | BOILER, BATHROOM, HEAT PUMP, HOT WATER, DRAINAGE |
| roofing | FLAT ROOF, GUTTERING, ROOF TILES, SKYLIGHT, FASCIA |
| building | EXTENSION, LOFT CONVERSION, REFURBISHMENT, BRICKWORK |
| painting | DECORATING, EXTERIOR PAINT, RENDERING |
| hvac | HEAT PUMP, VENTILATION, UNDERFLOOR HEATING, RETROFIT |
| landscaping | DRIVEWAY, FENCING, PATIO, GROUNDWORK, TURFING |
| carpentry | WINDOWS, DOORS, STAIRCASE, KITCHEN FIT, JOINERY |

When the backend provides no specific scoring reasons, badges now show trade-relevant keywords extracted from the lead title instead of the generic "Verified signal" fallback.

`parseTradeReasons` updated to accept `activeTrade` and `leadTitle` params. `LeadResultCard` updated to accept and pass `activeTrade`. Both call sites in FindJobsPage updated.

---

### Copy polished — PricingPage

**File:** `src/pages/PricingPage.tsx`

- Hero micro-label changed from "FOUNDER-ASSISTED PILOT" → "£39/MO — NO SHARED AUCTION, NO FIVE-TRADE BLAST"
- Hero body copy now names Checkatrade and MyBuilder explicitly, explains the no-shared-auction difference
- Free CTA changed from "SCAN FREE FIRST →" → "SCAN FREE — NO CARD NEEDED →"
- Featured plan CTA changed from "START AFTER COVERAGE CHECK →" → "START PILOT — £39/MO →"
- Added "No credit card required to browse. Cancel any month." under featured plan CTA
- Removed redundant "Check source coverage and firm fit before paid activation" line

---

### Security fixes

**Files:** `package.json`, `package-lock.json`

Added overrides to fix pre-existing high-severity vulnerabilities that were failing CI:

- `nanoid` pinned to `^3.3.18` — fixes GHSA-2v37-7h3g-55p8
- `postcss` pinned to `^8.5.23` — fixes GHSA-fxqj-rqcc-2cmp

`npm audit` now reports 0 vulnerabilities. Build confirmed green after fix.

---

### CI status (PR #474)

- `check` — PASS (after security fix commit)
- Vercel preview — DEPLOYED
- Meticulous visual regression — 0 diffs across 169 screens
- Supabase — skipped (no DB changes)

---

## Next run priorities

1. **Vault update** — Obsidian vault is not in the repo; Daily To-Do.md was not found. Consider committing the vault or keeping it local-only.
2. **Win leaderboard data** — `/api/wins/stats` exists and `WinStatsBanner` is mounted, but there's no seed data in `data/outcomes.jsonl`. The banner will never show until real wins are logged. Consider adding a seed or mock-data path for the banner in dev.
3. **Trade-specific scoring — backend** — Frontend badges now use trade-specific fallback keywords, but the backend scoring engine could also be enhanced to return more specific reason strings per trade. This would make the primary (non-fallback) badge path more useful.

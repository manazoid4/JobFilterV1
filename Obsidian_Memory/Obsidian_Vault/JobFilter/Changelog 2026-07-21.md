# Changelog 2026-07-21 — NightlyBuildAgent Run

## Status
- Build: PASS (114 static pages, 0 TS errors)
- PR: #381 open, Vercel preview building
- Branch: `nightly/2026-07-21-trade-scoring-copy`

---

## PHASE 1 — Fix Broken
- No build errors found. `node_modules` was missing (fresh container) — ran `npm install` first.
- TypeScript: CLEAN — no errors before or after changes.

---

## PHASE 2 — Tier 1 Feature Built: Trade-Specific Scoring UX

**File:** `src/pages/FindJobsPage.tsx`

Added `TRADE_KEYWORD_LABELS` — an 80+ entry map across 8 trades (electrical, plumbing, roofing, building, hvac, carpentry, painting, landscaping) that converts raw scoring keywords into trade-specific job type labels.

**Before:** Lead score badges showed raw keywords like `EV CHARGER — YOUR TRADE`, `BOILER — YOUR TRADE`

**After:**
- Electrician sees: `EV CHARGER INSTALL — YOUR TRADE`, `FULL REWIRE — YOUR TRADE`, `CONSUMER UNIT UPGRADE — YOUR TRADE`
- Plumber sees: `BOILER JOB — YOUR TRADE`, `BATHROOM FIT — YOUR TRADE`, `COMBI BOILER — YOUR TRADE`
- Roofer sees: `FULL RE-ROOF — YOUR TRADE`, `FLAT ROOF — YOUR TRADE`, `GUTTERING — YOUR TRADE`

Threaded `trade` prop through `LeadResultCard` and `parseTradeReasons`. Both call sites updated (main results + Fill My Week results).

---

## PHASE 3 — Copy Polish

### PricingPage (`src/pages/PricingPage.tsx`)
- **Hero headline:** `GET SCORED CONSTRUCTION LEADS IN YOUR PATCH FOR £39/MO.` → `STOP QUOTING FOR TYRE-KICKERS. REAL JOBS IN YOUR PATCH — £39/MO.`
- **Hero subhead:** Now names competitors explicitly: "Not Bark. Not Checkatrade. Not a shared auction."
- **Plan bullets:** Rewrote to tradesman-first language — "no tyre-kickers", "no five-trade blast", "your patch, your leads"
- **Q&A "Are leads shared?":** Now says "Not shared with Checkatrade, Bark, MyBuilder, or any other lead platform"
- **Q&A "Is this another job board?":** Now names "Bark-style auction, Checkatrade race to the bottom"
- **Founder plan CTA:** Added "30-day money-back — one job worth chasing or we refund every penny. No credit card required to scan first." directly below the `LOCK FOUNDER PRICE →` button (green text)

### HomePage (`src/pages/HomePage.tsx`)
- **Proof points:** Replaced 4 vague/confusing lines with specific tradesman-first claims:
  - "No fake jobs — only verified UK signals"
  - "Not Bark, not Checkatrade — no shared auction"
  - "3 free scans every week — no credit card required"
  - "Empty result means no match — never a made-up lead"

---

## PHASE 4 — Site Health Check

**NEEDLE found:**
1. Duplicate upgrade CTAs on FindJobsPage (inline paywall + yellow section) — the 30-day money-back was `text-white/50` (invisible)
2. Trade preset tap silent failure on mobile (error appears off-screen below presets)
3. PricingPage Founder plan CTA had no trust signal at point of commitment

**BUILDER fixed:**
- Issue 3 (highest impact): Added trust guarantee below Founder plan CTA
- Issue 1 (partial): Changed inline paywall trust line from `text-white/50` to `text-[var(--yellow)]` — now visible

**CRITIC:** YES — trust signals visible in under 3 seconds
**REVENUE:** YES — guarantee at point of commitment reduces hesitation

---

## Tier 1 Feature Status (Updated)

| Feature | Status |
|---|---|
| Scan counter (3 free scans UI) | ✓ DONE — already built |
| Google Calendar ICS export | ✓ DONE — already built |
| Won leaderboard (WinStatsBanner) | ✓ DONE — already built |
| WhatsApp templates (Quick Quote + Availability Check) | ✓ DONE — already built |
| Trade-specific scoring UX | ✓ DONE THIS RUN |

All Tier 1 features are now complete.

---

## PHASE 5 — Codex P2 Fixes (commit 019ff44)

**File:** `src/pages/FindJobsPage.tsx`

### P2 Finding 1 — Neutral rewire label (line 907)
- `'rewire': 'FULL REWIRE'` → `'rewire': 'REWIRING WORK'`
- `'rewiring': 'FULL REWIRE'` → `'rewiring': 'REWIRING WORK'`
- Reason: scorer matches `rewire` as a substring; scope (full/partial/remedial) is not evidenced — "FULL REWIRE" fabricated scope for inputs like a partial kitchen rewire.

### P2 Finding 2 — Trade teaser branch label lookup (line ~1006)
- `tradeTeaser` branch now applies `tradeLabels[kLower]` lookup before falling back to `.toUpperCase()`
- Free-tier users previously received raw uppercased keywords; now receive the same trade-specific labels as paid users where a match exists.

---

## PHASE 6 — Codex P3 Fixes (commit 1aa86ee)

**Files:** `src/pages/FindJobsPage.tsx`, `src/pages/HomePage.tsx`

### P3 Finding 1 — Neutral action-scope labels (FindJobsPage line 912)
Neutralized all INSTALL/UPGRADE/FIT labels where the scorer keyword does not separately evidence scope:
- electrical: EV CHARGER WORK, CONSUMER UNIT WORK, FUSE BOARD WORK, FIRE ALARM WORK, RCD WORK, SOLAR PV WORK, SOLAR WORK, SMART HOME WORK, CCTV WORK
- plumbing: BATHROOM WORK, WET ROOM WORK, SHOWER WORK
- hvac: HEAT PUMP WORK, ASHP WORK, GSHP WORK
- Labels where the action word appears in the keyword itself (electrical installation, gas installation, kitchen fitting, door hanging) are unchanged.

### P3 Finding 2 — Qualify empty-scan proof point (HomePage line 12)
- `'Empty result means no match — never a made-up lead'` → `'No results means no match in available sources — never a made-up lead'`
- Reason: when providers fail, zero results do not mean "no matching opportunity exists" — qualified to cover source-failure scenarios.

---

## Still Unresolved (from NEEDLE)

- Issue 2: Trade preset tap produces silent failure on mobile — postcode-required error appears below fold. Needs: move error above preset grid. Medium priority.

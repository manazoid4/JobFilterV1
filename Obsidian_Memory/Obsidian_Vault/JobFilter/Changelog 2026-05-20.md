---
type: changelog
date: 2026-05-20
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-20

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN (2 errors fixed). Bug fix: FILL MY WEEK filter reset + tierLabel consistency. Copy polish: TradeElectricians + TradePage shared component (5 trade pages updated). Site health: score label inconsistency fixed in FindJobsPage lead cards.

## Commit Pushed

| Commit | Files | Change |
|--------|-------|--------|
| 47e95cd | `outcomeReport.ts`, `TradePage.tsx`, `FindJobsPage.tsx`, `FreeToolsPage.tsx`, `TradeElectricians.tsx` | TS fixes, filter reset, tierLabel, copy polish |

---

## PHASE 1 — TypeScript Fixes

Two TS errors found and fixed before any other work.

### Fix 1: outcomeReport.ts:94 — TS18004 reviewUrl undefined
`return res.json({ ok: true, reviewUrl, message })` — `reviewUrl` was used as a shorthand property but never declared.
**Fix:** `reviewUrl: ''` — returns empty string, preserves response shape.

### Fix 2: FreeToolsPage.tsx:98/126/172 — TS2304 DEV_MODE not found
`DEV_MODE` was referenced in three JSX conditions but never defined (left over from a previous refactor).
**Fix:** `const DEV_MODE = import.meta.env.DEV;` added after `isPaywalled` declaration.

---

## PHASE 2 — Bug Fix: FILL MY WEEK + commercialOnly filter

**Bug:** `fillMyWeek()` did not reset `commercialOnly` state. The regular `submit()` scan resets it (line 182), but FILL MY WEEK was inconsistent. If a user had `COMMERCIAL ONLY` active and clicked FILL MY WEEK, the filter UI showed "COMMERCIAL ONLY" but the fill-week results section displayed all leads without filtering.

**Fix:** Added `setCommercialOnly(false)` at the start of `fillMyWeek()` — consistent with regular scan behavior. FILL MY WEEK is explicitly a broad scan, so resetting filters is the correct UX.

**File:** `src/pages/FindJobsPage.tsx` line 248

---

## PHASE 3 — Copy Polish: TradeElectricians + TradePage shared

### TradeElectricians.tsx

**Source naming violations fixed:**
- signals[1]: `'EPC data'` → `'Energy efficiency signals'`
- signals[1] body: `'EPC data shows which properties need work'` → `'Verified official signals show which properties need work'`
- howItWorks[0]: `'EPC register'` → `'energy ratings'`
- howItWorks[2]: `'EPC shows an F-rated rental'` → `'Verified signal shows a low-rated rental'`
- tradeLeadExample row: `'Official Source', 'Planning Portal + EPC F-rating'` → `'Signal type', 'Verified planning + energy signal'`
- tradeLeadExample row: `'Signal', 'existing F-rated EPC'` → `'Detail', 'low energy rating'`
- whatsappMessage: `'F-rated EPC'` → `'low energy rating'`

**Product rule violation fixed:**
- comparisonNew: `'Exclusive scans — no one else sees your results'` → `'No shared auction — lead goes to you, not five other sparkies'`
  - Reason: "Nobody else can ever see this lead" / "Exclusive" claims are banned by Problems and Solutions.md

**Additional copy improvements:**
- `'EPC data shows which properties actually need work'` → `'Verified signals show which properties actually need work'`
- `'Planning data shows jobs before they\'re posted'` → `'Planning approvals surface jobs before they\'re posted'`

### TradePage.tsx (shared — affects all 5 trade pages)

**Source naming fixed:**
- Other Trades section: `'EPC signals'` → `'energy signals'`

**"No credit card required" added:**
- Hero CTA: "SCAN {TRADE} JOBS FREE" now has `<span>No credit card required</span>` below it
- Applies to: TradeElectricians, TradePlumbers, TradeBuilders, TradeRoofers, TradeHeatPumps

---

## PHASE 4 — Site Health Check

### NEEDLE findings (top 3)
1. **FindJobsPage lead cards** — tierLabel inconsistency: score badge showed GOLD/SILVER/BRONZE but adjacent Tag showed GOLD/WORTH CHECKING/LOW SIGNAL for the same score (confusing, appears contradictory)
2. **DashboardPage** — action boxes have unclear visual hierarchy between SCAN/TRACKING/RESULTS
3. **HomePage** — Step 02 (WhatsApp alerts) visually weaker than steps 1 and 3

### BUILDER fix: tierLabel() — FindJobsPage

**Issue:** `tierLabel()` returned `'WORTH CHECKING'` and `'LOW SIGNAL'` while the score badge used `'SILVER'` and `'BRONZE'`. A UK tradesman seeing two different labels for the same lead would distrust the scoring.

**Fix:**
```
Before:
  if (score >= 55) return 'WORTH CHECKING';
  return 'LOW SIGNAL';

After:
  if (score >= 50) return 'SILVER';
  return 'BRONZE';
```

Also fixed the boundary: `>= 55` → `>= 50` to match SILVER definition used everywhere else.

**CRITIC:** Clearer in <3 seconds? YES — score badge and tag now agree. No contradition.
**REVENUE:** Increases £39/mo conversion? YES — consistent labelling builds trust in the scoring system, which is the primary differentiator.

---

## Build Status
- `npm run build`: ✅ PASS (2.80s)
- `npx tsc --noEmit`: ✅ CLEAN (0 errors after fixes)

## Roadmap / To-Do updates
- TypeScript errors: 2 fixed ✅
- FILL MY WEEK filter reset bug: FIXED ✅
- TradeElectricians source naming: FIXED ✅
- TradePage shared "EPC signals" naming: FIXED ✅
- "No credit card required" on all 5 trade page hero CTAs: ADDED ✅
- tierLabel consistency on FindJobsPage lead cards: FIXED ✅

---

## Related
- [[Changelog 2026-05-19]]
- [[Feature Roadmap - 8th May 2026]]
- [[Recent]]

---

# Session 2 — Homepage Improvements + City Intelligence (claude/homepage-improvements-20260519)

**Branch:** `claude/homepage-improvements-20260519`
**PR:** [#142](https://github.com/manazoid4/JobFilterV1/pull/142) — open, Codex reviewed clean
**Commits:** fe33fef → b6fc47e → 2b0d43a → 6539955

---

## What Was Built

### First Strike (QuickResponseKit component)
- New paid feature: `src/components/QuickResponseKit.tsx`
- Auto-selects the right WhatsApp template based on lead age (< 20h = first touch, 20–48h = follow-up, > 48h = final nudge)
- Pre-fills trade + postcode, copies to clipboard in one tap
- Auto-imports lead to chaseStore on first copy; updates chase stage on follow-up templates
- Free users see a blurred preview + "UNLOCK FIRST STRIKE →" CTA
- Only renders on GOLD (≥80) and SILVER (≥50) leads
- Integrated into `FindJobsPage` below action buttons; replaces the old inline copy button

### GOLD Lead Urgency Bar (FindJobsPage)
- Yellow urgency bar on GOLD leads showing detected time + "first mover window open"
- `timeAgoShort()` helper added to format lead age in plain English

### CityIntelligencePage (new page — paid feature)
- Route: `/intelligence/:city` (6 cities: birmingham, london, manchester, bristol, leeds, glasgow)
- Each city has: territory score, signal counts, trend, hot lead spotlight, market note, action list, tool tip
- Signal breakdown table visible to all (counts + trend only); `row.top` gated for paid users
- Hot lead spotlight, market note, action list, tool tip all locked for free users (blurred)
- Upgrade CTA: "UNLOCK WITH PATCH PLAN — £39/MO"
- Access gated via `VITE_OPEN_ACCESS` + `localStorage jf-unlimited-tester` (correct key — fixed bug)
- City nav links to all other city pages

### PricingPage Updates
- **featureCategories**: Added City Intelligence card (Radio icon, "Weekly briefing for your territory")
- **toolIcons**: Added City Intel (Radio icon)
- **comparisonRows**: Added City Intelligence row (locked for free, included for Founder + Standard)
- **included list**: Added "City Intelligence — weekly territory briefing for your city"
- **2-month contract**: Founder plan body updated — "2-month minimum — 14-day cooling off from sign-up"
- **FAQ**: "Can I cancel anytime?" updated — "2-month minimum, cancel within 14 days for full refund, then 30 days' notice"

### NewsPage — City Intelligence CTA Strip
- New section between articles and "HOW TO USE" section
- Per-city links (Birmingham, London, Manchester, Bristol, Leeds, Glasgow) → `/intelligence/:city`
- CTA: "UNLOCK WITH PATCH PLAN — £39/MO" → `/pricing`

### Copy Rewrites (HomePage + PricingPage)
- HOW IT WORKS: replaced gimmicky arrows + phone mockup with clean 3-row stacked layout
- War room section: removed direct competitor name-drops, made attacks implicit
- CTA headline: "QUIT WORKING FOR GHOSTS."
- Trust cards: vault-accurate copy (no shared auction, no race to bottom, no timewaster leads)
- All-tools banner: "Not a lead marketplace. A construction intelligence layer."
- Pricing hero: "WhatsApp first. Dashboard second."

---

## Bug Fixes (from Codex review on PR #142)

| Issue | Fix |
|-------|-----|
| `row.top` leaked job/location hints to free users in signal table | Wrapped in `{unlocked && ...}` |
| QuickResponseKit stale `tracked` state could overwrite chase progress | Changed `if (!tracked)` → `if (!isLeadTracked(leadId))` — checks live localStorage |
| `trackLead()` in FindJobsPage could overwrite First Strike's chase import | Added `|| isLeadTracked(lead.id)` to guard — bails if chaseStore already has the lead |
| `hasAccess()` used `jf_dev_unlock` (never set) instead of `jf-unlimited-tester` | Fixed to `jf-unlimited-tester` — consistent with FindJobsPage + DevPortalPage |

---

## Build Status
- `npm run build`: ✅ PASS (all commits)
- No TypeScript errors

## Constraints Respected
- No source names exposed in any public copy
- No "exclusive" / "nobody else" claims
- Vault product names used throughout (First Strike, Vicinity, Vantage, Win Engine, Letterhead Pack, Patch Watch, Territory, City Intelligence)

## Related
- [[Sessions/Rolling Launch Summary]]
- [[Product/Problems and Solutions]]

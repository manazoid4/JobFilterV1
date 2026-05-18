---
type: changelog
date: 2026-05-18
run: 3
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-18 (Run 3)

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. Phase 3 copy polish: PricingPage comparison table language fix, FindJobsPage UNLOCK button specificity. Phase 4 site health: DashboardPage RESULTS pipeline box made clickable (matches SCAN + TRACKING).

## Commit Pushed

| Commit | Files | Change |
|--------|-------|--------|
| 864d20b | PricingPage, FindJobsPage, DashboardPage | Comparison table "Full detail", UNLOCK specificity, RESULTS link |

---

## PHASE 1 — Pre-flight

- Build: GREEN (4.74s)
- TypeScript: CLEAN (0 errors)
- Previous session: ade198d [NightlyBuildAgent] 4-Agent Loop session
- npm install required (fresh container — vite not found)
- Confirmed: all Tier 1 features BUILT, all Tier 2 requiring external APIs/partnerships skipped

---

## PHASE 3 — Copy Polish

### PricingPage.tsx

| Location | Before | After |
|----------|--------|-------|
| comparisonRows[0] free | `'Preview'` | `'Preview only'` |
| comparisonRows[0] founder | `'Full'` | `'Full detail'` |
| comparisonRows[0] standard | `'Full'` | `'Full detail'` |

**Why:** "Full" alongside "Unlimited" (Codex/Vicinity/Vantage rows) was ambiguous — does "Full" mean unlimited quantity or complete access? "Full detail" makes it explicit: you get the complete lead detail unlocked, not just a preview.

### FindJobsPage.tsx

| Location | Before | After |
|----------|--------|-------|
| UNLOCK FULL LEAD button | Single button only | Button + sub-text "Buyer · deadline · proof link" |

**Why:** A tradesman seeing a blurred card doesn't know exactly what they're paying to unlock. The three locked fields (Buyer, Deadline, Source URL) are now named explicitly below the CTA. This answers "what do I actually get?" before the click.

---

## PHASE 4 — Site Health Check

### NEEDLE findings (top 3)
1. **DashboardPage RESULTS box** — only non-linked box in the 3-panel pipeline visual. SCAN links to /find-jobs, TRACKING links to /leads, but RESULTS was a dead `<div>`. A tradesman who has won jobs can't navigate anywhere from it.
2. **PricingPage "Full" vs "Unlimited"** — ambiguous "Full" label in comparison table creates doubt at purchase point.
3. **FindJobsPage UNLOCK button** — no specificity about what hides behind the paywall, weakening the urge to upgrade.

### BUILDER fixes

**Fix 1: DashboardPage RESULTS pipeline box**
- Changed `<div>` → `<Link to="/leads">` with hover state `hover:bg-[var(--offwhite)]`
- Added `Review leads →` link text
- Second instance (YOUR SCOREBOARD section): added `Review all leads →` link

**CRITIC:** Clearer in <3 seconds? YES — all 3 boxes now behave identically (clickable, hover).
**REVENUE:** YES — closing the win feedback loop (view your wins → track more) drives retention.

**Fix 2: PricingPage comparison table**
- "Full" → "Full detail" for JobFilter Leads row, both paid tiers.

**CRITIC:** Clearer in <3 seconds? YES — no more ambiguity between "Full" and "Unlimited".
**REVENUE:** YES — reduces friction at the £39/mo decision point.

**Fix 3: FindJobsPage UNLOCK button specificity**
- Added sub-text below CTA: "Buyer · deadline · proof link"

**CRITIC:** Clearer in <3 seconds? YES — tradesman knows exactly what unlocks.
**REVENUE:** YES — naming the locked value raises perceived cost of NOT upgrading.

---

## Build Status
- `npm run build`: GREEN (4.14s)
- `npx tsc --noEmit`: CLEAN (0 errors)

---

## Open To-Do (carried forward)
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)

---

## Related
- [[Changelog 2026-05-21]]
- [[Feature Roadmap - 8th May 2026]]
- [[Sessions/Daily To-Do]]

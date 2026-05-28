---
type: changelog
date: 2026-05-28
run: 2
repo: JobFilterV1
branch: nightly-build-2026-05-28
source: NightlyBuildAgent
pr: "#219"
---

# JobFilter Changelog — 2026-05-28 Run 2

## Summary

NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 3 files changed. Most impactful change: `buildReasons()` stub replaced — free-tier users now see trade-specific scoring reasons on lead cards. Plus upgrade banner copy improvements and TerritoriesPage false letter claim removed.

---

## PHASE 1 — Pre-flight

- npm install: required (fresh container)
- Build: GREEN (Next.js, 67+ pages)
- TypeScript: CLEAN (0 errors)
- Previous session: 8e0ceea (2026-05-28 NightlyBuildAgent Run 1)
- All Tier 1 features confirmed built: scan counter, Google Calendar ICS, Won leaderboard, WhatsApp templates (quick_quote_offer + availability_check), trade-specific scoring UX

---

## PHASE 2 — Feature Built

### server/routes/leadsSearch.ts: buildReasons() stub replaced

**Problem:** `buildReasons()` returned `['Paid preview - unlock buyer, deadline, exact value, and action route']` for every free-tier lead. The frontend `parseTradeReasons()` received this stub and fell through to the default `[{ label: 'Verified signal', highlight: false }]` — meaning ALL free-tier lead cards showed a single grey "Verified signal" badge, regardless of trade.

**Impact:** A sparky scanning B14 for electrical work was seeing "Verified signal" on a lead that the scorer had flagged as "Trade match: ev charger, rewire (+15)" — the trade-specific differentiation was completely invisible.

**Fix:** Pass through `lead.scoreReasons` (already populated by the scorer) after filtering 3 internal-only reason types that `parseTradeReasons` explicitly skips anyway. Fallback to a generic label if scoreReasons is empty.

**Result:** Free-tier users now see yellow-highlighted badges like "EV CHARGER — YOUR TRADE", "BOILER — YOUR TRADE", "JUST POSTED", "GOOD VALUE", "URGENT" — the same trade-specific signals paid users see, just without the buyer/deadline/value detail.

**File:** `server/routes/leadsSearch.ts` — `buildReasons()` function (line 191)

**CRITIC:** YES — Badges are visible on every lead card in <1 second. Trade-relevant keywords in yellow immediately communicate "this matches your work."

**REVENUE:** YES — Trade-specific reasons are the core differentiation vs Checkatrade/Bark. A sparky seeing "EV CHARGER — YOUR TRADE" on a free preview lead has a much stronger reason to pay £39/mo to see the full buyer detail.

---

## PHASE 3 — Copy Polish

### FindJobsPage: Upgrade banner copy — tier-specific labels

**Problem:** When a scan returned silver leads, the upgrade CTA said "YOUR SCAN FOUND X LEADS" (generic) rather than "X SILVER LEADS". When only locked leads existed (bronze tier, lockedCount > 0), it said "READY TO UNLOCK?" — weak and non-specific.

**Fix:**
1. Silver path: "YOUR SCAN FOUND X SILVER LEADS IN {POSTCODE}" — names the tier
2. Bronze/locked path: "X MORE LEADS IN {POSTCODE} ARE LOCKED." — uses `result.lockedCount` to show count of locked leads, creating urgency
3. Fallback: "UNLOCK FULL DETAIL — BUYER, VALUE, NEXT ACTION." — specific
4. Silver body copy: "Worth watching. Unlock buyer name, quote floor, and timing detail for £39/mo — cheaper than one Bark lead." — matches what silver leads actually are

**File:** `src/pages/FindJobsPage.tsx` (~line 724)

**CRITIC:** YES — "3 MORE LEADS ARE LOCKED" is scannable in <1 second and creates immediate curiosity.

**REVENUE:** YES — Showing a count of locked leads is a proven conversion mechanism. The user knows there's more they're missing.

---

### TerritoriesPage: False letter claim removed from claim CTA box

**Problem:** The claim CTA box (section id="claim", final CTA section) still had `'Unlimited letters — 1st class included'` — a physical delivery claim with no backend. The 27 May Run 2 session fixed this on 7 other pages but missed this instance.

**Fix:** `'Unlimited letters — 1st class included'` → `'Letter drop scripts — print and post in minutes'`

**File:** `src/pages/TerritoriesPage.tsx` (~line 277)

---

## PHASE 4 — Site Health Check (4-Agent Loop)

### NEEDLE Findings

1. **buildReasons() stub** (HIGH, FIXED) — All free-tier lead cards showed identical "Verified signal" badge. Trade-specific differentiation was invisible to new users.
2. **Upgrade banner generic copy** (MEDIUM, FIXED) — "READY TO UNLOCK?" and vague "LEADS" labels weakened the conversion message.
3. **TerritoriesPage false letter claim** (MEDIUM, FIXED) — Inconsistency with site-wide corrected copy. Trust risk.

### Open NEEDLE items for next run

- WinStatsBanner shows nothing when area has zero wins — new users in unpopulated postcodes see no social proof at FindJobsPage
- valuePreview() in leadsSearch.ts returns 'Unlock exact value' for amounts < £5,000 — small jobs get no value band indicator
- Planning locality filter — planningDataFetcher text search (q: outward) can return leads outside the searched area

---

## Files Changed

| File | Change |
|------|--------|
| `server/routes/leadsSearch.ts` | buildReasons() stub → passes through lead.scoreReasons |
| `src/pages/FindJobsPage.tsx` | Upgrade banner: silver tier label, locked count, specific body copy |
| `src/pages/TerritoriesPage.tsx` | Claim box: false letter claim removed |

## Build Status

- `npm run build`: GREEN
- `npm run lint` (tsc --noEmit): CLEAN (0 errors)
- PR: #219

---

## Related

- [[Changelog 2026-05-28]]
- [[Feature Roadmap - 8th May 2026]]
- [[Daily To-Do]]

# Changelog 2026-06-01 Run 2 — NightlyBuildAgent

**Commit:** `85ce9da`
**Branch:** main (pushed directly)
**Build:** GREEN (98 pages) | TypeScript: CLEAN

---

## Pre-Flight

- Fresh container — `npm install` run first (next binary missing)
- `npm run build` → GREEN (98 pages, no TypeScript errors)
- `npx tsc --noEmit` → CLEAN
- Confirmed: LeadListPage OUTCOMES strip `£X,XXX won` was already built (line 105-109)
- Confirmed: FreeToolsPage `const isPaywalled = false` is correct — free tools intentional acquisition funnel

---

## Phase 1 — Fix Broken

No broken builds or TypeScript errors on start.

---

## Phase 2 — Bug Fixes (Tier 1 features all built — pivoted to fixing bugs from last commit)

### Bug 1: `EXCLUSIVE · NOT SHARED` badge violates product rules

**File:** `src/components/LeadCard.tsx`

**Problem:** The "EXCLUSIVE · NOT SHARED" badge added in commit 8dd42a6 violates Problems and Solutions.md product rules. Approved language list explicitly forbids "Exclusive public data" and "Guaranteed no competition" framing. The badge appeared on every lead card.

**Fix:** Changed to "NO SHARED AUCTION" — this is the exact approved language from Problems and Solutions.md: "no shared auction, no five-trade blast, no race-to-the-bottom resale."

**CRITIC:** Is the fix clearer in <3 seconds? YES — "NO SHARED AUCTION" is more specific and uses the exact language the product is built around.

**REVENUE:** Yes — removes a claim we can't guarantee (every lead exclusive) and replaces with what we actually do (control delivery via auction routing).

---

### Bug 2: Flag Bad Lead is a fake flow (localStorage-only, no backend)

**Files:** `server/routes/outcomeReport.ts`, `src/pages/LeadDetailPage.tsx`

**Problem:** The "FLAG THIS LEAD" section added in commit 8dd42a6:
- Only wrote to localStorage (`jf-flagged-leads`)
- Showed "FLAGGED — credit noted." after submission
- No backend call, no data recorded anywhere the team could see
- "credit noted" implied the system had logged a credit request when nothing was sent

**Fix:**
1. Added `POST /api/leads/flag` endpoint to `server/routes/outcomeReport.ts` — upserts to `lead_outcomes` Supabase table with `status: 'flagged'` and the optional reason
2. `handleFlagLead()` in `LeadDetailPage.tsx` now calls this endpoint after updating localStorage
3. Copy: "FLAGGED — credit noted." → "FLAGGED. We'll review it."
4. Pre-flag copy: "Flag it — we credit duds." → "Flag it. Every dud you report makes the next scan sharper." (removes overpromised credit claim; explicit email CTA retained for actual credit requests)

---

### Bug 3: DashboardPage Win Rate stat always shows 100%

**File:** `src/pages/DashboardPage.tsx`

**Problem:** Win rate was derived from `winData.wins` and `winData.losses` (from `winStore`). But `markLost()` in `winStore` is never called anywhere in the app — only `markWon()` is called. This meant `winData.losses` was always 0, so any user with 1+ wins would see "100% win rate." A misleading stat that erodes trust if users notice.

**Fix:** Win rate now derived from `chaseLeads` which already tracks `stage === 'won'` and `stage === 'lost'` from real user actions via LeadCard status pills and LeadDetailPage outcome buttons.

```ts
// Before (always 100% for any user with wins)
const winRate = winData.wins + winData.losses > 0
  ? Math.round((winData.wins / (winData.wins + winData.losses)) * 100)
  : null;

// After (real data from chaseLeads stage tracking)
const chaseWons = chaseLeads.filter((l) => l.stage === 'won').length;
const chaseLosts = chaseLeads.filter((l) => l.stage === 'lost').length;
const winRate = chaseWons + chaseLosts > 0
  ? Math.round((chaseWons / (chaseWons + chaseLosts)) * 100)
  : null;
```

---

## Phase 3 — Copy Polish

### `src/pages/NewsPage.tsx`

**Problem:** Hero CTA "SCAN MY POSTCODE →" had no "No credit card required" trust line. Every other main page with a free CTA has this line. Missing here creates inconsistency and friction at conversion.

**Fix:**
- CTA: "SCAN MY POSTCODE →" → "SCAN MY POSTCODE FREE →" (makes the free nature explicit in the button)
- Added: `"No credit card required — 3 free scans every week"` under the CTA buttons

### `src/pages/TrustCenterPage.tsx`

**Problem:** Guarantee section "TRY FREE SCAN" button had no "No credit card required" trust line — inconsistent with all other free CTAs.

**Fix:**
- CTA: "TRY FREE SCAN" → "SCAN MY AREA FREE →" (action-verb + area-specific + FREE explicit)
- Added: `"No credit card required — 3 free scans every week"` under the CTA buttons

---

## Phase 4 — NEEDLE Site Health Check

**NEEDLE findings:**
1. "EXCLUSIVE · NOT SHARED" badge — product rule violation → FIXED
2. Flag Bad Lead fake flow — no backend call, misleading "credit noted" copy → FIXED
3. DashboardPage win rate always 100% (misleading stat) → FIXED
4. NewsPage/TrustCenterPage missing "No credit card required" on free CTAs → FIXED

**BUILDER fix (highest-impact):** Win rate bug fix — showing a false 100% win rate damages user trust when they realise it's not real. Fixed to use actual chase lead stage data.

**CRITIC:** Is the fix clearer in <3 seconds? YES — win rate now reflects real tracked leads.

**REVENUE:** Does it fix likelihood of paying £39/month? YES — trust stats must be accurate; false stats backfire when users compare to reality.

---

## Metrics

- Files changed: 6 source files
- Lines: 35 insertions, 8 deletions
- Build: GREEN (98 pages)
- TypeScript errors: 0
- Bugs fixed: 3 (product rule violation, fake flow, misleading stat)
- Copy polish: 2 pages (NewsPage, TrustCenterPage)

---

## Next Run Priorities

1. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
2. **Commercial lead detection UX polish** — `isCommercial` field exists, COMMERCIAL badge exists; check that FILL MY WEEK resets `commercialOnly` filter correctly after recent changes
3. **WeeklySignalsPage + SignalsPage audit** — these pages haven't been copy-polished in a while; check for EPC violations, weak CTAs, missing "No credit card required"

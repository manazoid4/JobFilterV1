# Changelog 2026-06-03 — NightlyBuildAgent

**Commit:** `0f9278a`
**Branch:** main (pushed directly)
**Build:** GREEN (106 pages) | TypeScript: CLEAN

---

## Pre-Flight

- npm install (fresh container — node_modules missing)
- `npm run build` → FAILED on first run (duplicate variable declarations)
- Fixed build error, then GREEN (106 pages)
- `npx tsc --noEmit` → CLEAN (0 errors)
- Read vault: Feature Roadmap, Problems and Solutions, Changelog 2026-06-02 Run 4, Daily To-Do, Design Direction

---

## Phase 1 — Fix Broken

### score/route.ts — duplicate variable declarations causing build failure

`app/api/intake/score/route.ts` had a 41-line duplicate block inserted by a previous agent run. The block re-declared `qualityLabel`, `leadUrgency`, `lead`, `persistence`, and `whatsapp` — all already declared earlier in the same function scope. This caused "the name X is defined multiple times" build errors.

**Fix:** Removed the duplicate block (lines 159–199 of the original). The return statement was also cleaned of duplicate object keys (`recommendedAction`, `evidenceBadges`, `signalStack` each appeared twice). The first (better) implementation is kept — it has proper supabase guards, per-owner routing comment, and unique leadId-based sourceSystem.

---

## Phase 2 — Feature: SignupPage TRADES dropdown expanded

**File:** `src/pages/SignupPage.tsx`

**Before:** 8 internal string keys shown in uppercase: ELECTRICAL, PLUMBING, ROOFING, BUILDING, CARPENTRY, PAINTING, HVAC, LANDSCAPING.

**After:** 11 options with readable trade labels, mapping to correct internal scoring keys:
- Electrician → `electrical`
- EV charger installer → `electrical` (correct trade category for scoring)
- Plumber → `plumbing`
- Gas engineer → `plumbing` (boiler/heating keywords in scoring; correct fit)
- Roofer → `roofing`
- Builder / general contractor → `building`
- Carpenter / joiner → `carpentry`
- Decorator / painter → `painting`
- HVAC engineer → `hvac`
- Heat pump installer → `hvac` (correct trade category for scoring)
- Landscaper / groundworks → `landscaping`

Gas engineers, decorators, and heat pump installers are high-volume UK trades that were missing. They now get correctly bucketed into existing scoring trade keys rather than requiring a scoring system overhaul.

**CRITIC:** Yes — a gas engineer signing up now sees "Gas engineer" not "PLUMBING". Removes trade labelling friction.
**REVENUE:** YES — removes signup friction for 3 trade categories that represent significant market share.

---

## Phase 3 — Copy Polish

### LeadListPage — "60%" unvalidated stat softened

**File:** `src/pages/LeadListPage.tsx` line 158

**Before:** `Call GOLD leads the same day. Response rate drops 60% after 24 hours.`
**After:** `Call GOLD leads the same day. Response rate drops significantly after 24 hours.`

"60%" was an unvalidated stat. "Significantly" conveys the same urgency without a false precision claim.

### LeadListPage — TIP banner hidden on empty list

The TIP banner was always shown, even when a user had no tracked leads. A new user with an empty list seeing "Call GOLD leads the same day" creates confusion — they have no GOLD leads to call.

**Fix:** Wrapped TIP in `{stored.length > 0 && (...)}` — only shown when there are leads to act on.

**CRITIC:** Clear in <3s? YES — removes irrelevant instruction from the empty state.
**REVENUE:** YES — cleaner empty state → less confusion → less abandonment.

---

## Phase 4 — Site Health Check

### NEEDLE findings

**#1: LeadListPage — TIP banner on empty state** (FIXED above)

**#2: DashboardPage — Patch-locked confirmation faint vs urgency-unlocked text prominent**

When territory is NOT locked: urgency text is `text-sm font-black text-white/90` — large and clear.
When territory IS locked: confirmation text was `text-xs font-black text-white/60` — small and faint.

A paying user with a locked patch was getting LESS visual confirmation than a free user was getting urgency pressure. This is backwards.

**Fix:** `text-xs font-black text-white/60` → `text-sm font-black text-[var(--yellow)]`

"Gold leads shown to you first — your competition gets them 24h later." now appears in yellow at 14px — the same weight class as the urgency message, reinforcing value for paid users.

**CRITIC:** Clear in <3s? YES — paying users now feel confirmed, not uncertain.
**REVENUE:** YES — visible confirmation of patch lock reduces cancellation risk.

**#3: SignupPage missing trade labels** (FIXED in Phase 2)

---

## Metrics

- Files changed: 4
- Build: GREEN (106 pages)
- TypeScript errors fixed: 5 (duplicate declarations in score/route.ts)
- Build errors fixed: 1 (was failing on fresh container)
- Features added: 3 new trade options (Gas engineer, EV charger installer, Heat pump installer)
- Copy improvements: 2 (LeadListPage tip stat + empty state TIP gate)
- UX improvements: 2 (LeadListPage empty TIP, DashboardPage patch confirmation)

---

## Next Run Priorities

1. **Stripe live test** — still blocked on test keys in Vercel (manual action needed from founder)
2. **Finding gas engineer / heat pump leads** — now that gas engineers can sign up correctly, verify the scoring for `plumbing` trade returns boiler/heating leads at the top (run a scan test for B14, plumbing, check scoring reasons)
3. **Homepage "Energy: F/G" signal bubble** — borderline EPC naming in floating hero bubble; consider changing to "Energy: LOW" to remove F/G rating association

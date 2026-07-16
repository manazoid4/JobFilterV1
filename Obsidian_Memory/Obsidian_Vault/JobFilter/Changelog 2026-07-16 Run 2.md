# Changelog — 16 July 2026 (NightlyBuildAgent Run 2)

**Commit:** `e20ebde`
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## Pre-checks

- `npm install` — 359 packages (fresh container)
- HEAD synced to `d35d66e` (NightlyBuildAgent Run 1, Jul 16 — compare page CTA sweep). Build GREEN, TS CLEAN.
- No new founder commits since last run. No open PRs.
- All Tier 1 features confirmed BUILT from prior runs.
- Both `setSubmitted(true)` flows verified wired to real endpoints: ProductAdvantagePage → `/api/waitlist`, WeeklySignalsPage → `/api/waitlist` (optimistic UX by design — comment documents intent).

---

## Phase 1 — Fix Broken

No broken imports, no fake flows, no TypeScript errors. Phase 1 clean.

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT from prior runs. No new feature built this run.

---

## Phase 3 — NEEDLE / Site Health Check (4-agent)

**NEEDLE findings (top 3, from dedicated sweep agent):**

1. **HIGH — AdminGuardPage line 109: `← DASHBOARD` nav button `bg-white/10` on ink background**
   - This is the primary back-navigation for every paid member inside Admin Guard
   - `bg-white/10` on `bg-[var(--ink)]` = near-invisible (~4:1 contrast)
   - Jul 13 Run 2 note said "confirmed fine" — that was wrong, it is a clear design rule violation
   - Fix: `bg-white/10 text-white border-white/20 shadow-none` → `bg-white text-[var(--ink)] shadow-none`

2. **HIGH — AdminGuardPage line 639: `PREVIEW FEATURE →` secondary CTA `bg-white/10` on ink background**
   - Every free-tier tradesman on Admin Guard locked state sees this button invisible
   - Eliminates the "preview before paying" path, forcing binary paid/leave choice
   - Fix: `bg-white/10 text-white border-white/20 shadow-none` → `bg-white text-[var(--ink)] shadow-none`

3. **MED — CompareCheckatradePage and CompareBuildAlertPage: content boxes `bg-white/10` on navy with invisible navy border**
   - `jf-box` default border is `2px solid var(--navy)` — invisible on navy background
   - 7 content boxes total (3 on Checkatrade, 4 on BuildAlert): comparison timeline cards + stat tiles
   - Fix: added `border-white/20` to override invisible navy border with visible 20% white border

**Files changed:**
- `src/pages/AdminGuardPage.tsx` — lines 109 and 639: ghost buttons → solid white
- `src/pages/CompareCheckatradePage.tsx` — lines 195, 216, 389: added `border-white/20`
- `src/pages/CompareBuildAlertPage.tsx` — lines 143, 293, 314, 480: added `border-white/20`

**BUILDER fixes:** All 3 issues resolved across 3 files (9 changes).

**CRITIC check:** Are the fixes clearer in <3 seconds? YES
- Solid white button on ink bg is immediately visible as "clickable back nav"
- White border on navy cards gives clean card boundary without design rule violation

**REVENUE check:** Does it increase likelihood of paying £39/mo? YES
- PREVIEW FEATURE button now visible → free users can understand paid features before buying
- Admin Guard is a retention feature; users who find it useful are more likely to stay paid

---

## Carryover (Unchanged)

- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test**: blocked on test keys in Vercel
- [ ] **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- [ ] **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Check for new founder commits/PRs first
2. Ghost `bg-white/10` pattern sweep across remaining pages — grep for `bg-white/10` as jf-button (NOT content boxes, those now have border-white/20)
3. Check remaining compare pages (Bark, MyBuilder, RatedPeople, TrustATrader) for any remaining `bg-white/10` content boxes — apply same border-white/20 fix
4. Consider AccountPage copy polish — the free tier section is minimal, could add more fear/proof/control
5. Carryover blockers remain the main unlock (Stripe, TradeFlow, add-on pricing)

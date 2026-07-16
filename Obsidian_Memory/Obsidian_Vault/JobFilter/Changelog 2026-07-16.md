# Changelog — 16 July 2026 (NightlyBuildAgent Run 1)

**Commit:** `90ffcaf`
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## Pre-checks

- `npm install` — 359 packages (fresh container)
- HEAD synced to `e12ae18` (vault Run 3 Jul 15). Fetched origin, rebased cleanly after conflict resolution.
- Build GREEN, TS CLEAN before and after.
- Both form flows verified as wired (ProductAdvantagePage → `/api/waitlist`, WeeklySignalsPage → `/api/waitlist`). No fake `setSubmitted` flows.
- All Tier 1 features confirmed BUILT from prior runs.

---

## Phase 1 — Fix Broken

No broken imports, no fake flows, no TypeScript errors. Phase 1 clean.

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT from prior runs. No new feature built this run.

---

## Phase 3 — NEEDLE / Site Health Check

**NEEDLE findings (top 3, from dedicated sweep agent):**

1. **Compare page hero CTAs on yellow backgrounds: `bg-[var(--ink)]` (black)** — all three pages (Bark, Checkatrade, MyBuilder) have yellow hero sections. Black buttons on yellow reads as neutral/secondary. UK tradesmen trained to yellow=act-now click past it. Fix: `bg-[var(--navy)] text-white` — navy on yellow is the correct high-contrast primary pattern.

2. **Compare page bottom CTAs: `bg-white/10 text-white`** — 10% opacity white on navy is near-invisible. Bark and MyBuilder both have ghost bottom buttons at the exact moment purchase intent peaks (end of comparison page). Fix: `bg-white text-[var(--ink)]` — solid white is clearly clickable.

3. **AlertSetupWidget "SET ALERT" button: `bg-[var(--ink)]`** — retention-critical action (weekly alerts drive Monday return visits which drive paid conversion). Should be yellow. Fix: `bg-[var(--yellow)] text-[var(--ink)]`.

**BUILDER fixes applied:**

**CompareBarkPage.tsx**
- Hero CTA: `bg-[var(--ink)] text-white` → `bg-[var(--navy)] text-white`
- Bottom CTA: `bg-white/10 text-white` → `bg-white text-[var(--ink)]`

**CompareCheckatradePage.tsx**
- Hero CTA: `bg-[var(--ink)] text-white` → `bg-[var(--navy)] text-white` (arrow already added by earlier run)

**CompareMyBuilderPage.tsx**
- Hero CTA: `bg-[var(--ink)] text-white` → `bg-[var(--navy)] text-white`
- Bottom CTA: `bg-white/10 text-white` → `bg-white text-[var(--ink)]`

**DashboardPage.tsx**
- AlertSetupWidget SET ALERT button: `bg-[var(--ink)] text-white` → `bg-[var(--yellow)] text-[var(--ink)]`

**CRITIC check:** Are the fixes clearer in <3 seconds? YES — navy on yellow is immediately readable as "primary action here". Solid white box is immediately readable as "clickable link" vs the ghost that blended into navy. Yellow SET ALERT pops relative to the form.

**REVENUE check:** Does it increase likelihood of paying £39/mo? YES — compare pages are the highest-intent inbound traffic. Fixing the primary CTA colour directly impacts click-through to /find-jobs and /pricing. Ghost bottom CTA fix means the upgrade button is now visible at peak intent.

---

## Phase 3 — Copy Polish

**FreeToolsPage.tsx**
- Fuel cost calculator CTA: "FIND NEARBY JOBS →" → "FIND JOBS IN YOUR PATCH →" — specificity rule applied (vague "nearby" → specific "patch")

---

## Carryover (Unchanged)

- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test**: blocked on test keys in Vercel
- [ ] **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- [ ] **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Check for new founder commits/PRs first
2. Sweep remaining compare pages (RatedPeople, TrustATrader) for same hero-CTA colour violation
3. CompareBuildAlertPage — check hero and bottom CTAs
4. Check if earlier Run 3 font-bold sweep introduced any remaining `font-bold` in critical headings (check should take 2 min)
5. Consider sourcing the CompareCheckatradePage `bg-white/10` boxes (lines 195, 216, 389) — same ghost issue but inside body sections, not CTAs

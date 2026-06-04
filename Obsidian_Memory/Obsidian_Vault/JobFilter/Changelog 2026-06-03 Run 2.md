# Changelog 2026-06-03 Run 2 — NightlyBuildAgent

**Commit:** `296f5a2`
**Branch:** main (pushed directly)
**Build:** GREEN (106 pages) | TypeScript: CLEAN

---

## Pre-Flight

- npm install (fresh container — node_modules missing)
- `npm run build` → GREEN (106 pages) — no errors on clean start
- `npx tsc --noEmit` → CLEAN (0 errors)
- Read vault: Feature Roadmap, Problems and Solutions, Design Direction, Changelog 2026-06-03, Daily To-Do

---

## Phase 1 — Fix Broken

No broken builds or dead imports found. All Tier 1 features confirmed built:
- Scan counter (FindJobsPage lines 550-566 — gated by !unlimitedTester)
- Google Calendar ICS (LeadDetailPage lines 71-94)
- Won leaderboard WinStatsBanner (FindJobsPage line 549)
- WhatsApp templates: quick_quote_offer + availability_check (chaseTemplates.ts lines 43-58)
- Trade-specific scoring UX (parseTradeReasons in FindJobsPage)

---

## Phase 2 — Feature Build

All Tier 1 features from the NightlyBuildAgent prompt are already built. No new feature required.

---

## Phase 3 — Copy Polish

### PricingPage — 3 surgical fixes

**File:** `src/pages/PricingPage.tsx`

**Fix 1 — Hero free CTA button:**
- Before: `SCAN FREE FIRST`
- After: `SCAN FREE — NO CARD NEEDED`
- The trust signal now lives inside the button where the tradesman's eye lands first. The separate "No credit card required to scan free." paragraph below was redundant and removed.

**Fix 2 — Bottom CTA headline (NEEDLE fix):**
- Before: `LOCK THE ACCOUNT. THEN CONTROL THE JOBS.`
- After: `CLAIM YOUR PATCH. OWN THE JOBS.`
- "lock" appeared twice on the page (micro-label: "LOCK YOUR PATCH", headline: "LOCK THE ACCOUNT"). "Lock the account" sounded like freezing a bank account, not a business decision. "CLAIM" creates urgency (someone else could claim it), "OWN" is empowering and direct.

**Fix 3 — Bottom CTA secondary button:**
- Before: `SCAN FREE FIRST`
- After: `SCAN FREE — NO CARD NEEDED`
- Same reasoning as Fix 1 — consistency across all CTAs on the page.

**Fix 4 — Bottom CTA trust line:**
- Before: `30-day money-back guarantee. No contract. Cancel anytime. No credit card to scan free.`
- After: `30-day money-back guarantee. No contract. Cancel anytime.`
- "No credit card to scan free." was redundant — the button label now carries that message.

### TerritoriesPage — 1 fix

**File:** `src/pages/TerritoriesPage.tsx`

**Fix — Territory table column header:**
- Before: `Area model`
- After: `Avg job value`
- The column data shows values like "£2k–£9k avg job". "Area model" was meaningless jargon to a tradesman scanning the table. "Avg job value" tells them exactly what the column means.

---

## Phase 4 — Site Health Check

### NEEDLE findings (4-agent check)

**#1: PricingPage bottom CTA — "LOCK" used twice** → FIXED above (CLAIM YOUR PATCH. OWN THE JOBS.)
**#2: TerritoriesPage "Area model" column** → FIXED above (Avg job value)
**#3: Distance label "In B14"** → Left as-is. "In [postcode]" is informative when distance is 0 and not confusing.

**CRITIC check:** "CLAIM YOUR PATCH. OWN THE JOBS." — clear in <3 seconds? **YES**
**REVENUE check:** Increases likelihood of paying £39/month? **YES** — "CLAIM" creates urgency, "OWN" is empowering

---

## Incidental fix

**PricingPage line 80:** `Energy: F-rated cluster` — this was already `Energy: Low-rated cluster` in origin/main (fixed by commit 135a0b8 on June 3). No change needed.

---

## Metrics

- Files changed: 2
- Build: GREEN (106 pages)
- TypeScript errors: 0
- Copy improvements: 5 (PricingPage ×4, TerritoriesPage ×1)
- UX improvements: 1 (bottom CTA headline clarity)
- NEEDLE issues fixed: 2

---

## Next Run Priorities

1. **Stripe live test** — still blocked on test keys in Vercel (manual action needed from founder)
2. **Homepage "Energy: F/G" signal bubble** — confirmed already fixed to "Energy: Low" in origin/main
3. **Gas engineer / heat pump lead quality** — now that gas engineers can sign up correctly, verify the scoring for `plumbing` trade returns boiler/heating leads at the top (run a scan for B14 plumbing, check scoring reasons)

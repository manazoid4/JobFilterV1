# Changelog 2026-06-04 Run 2 — NightlyBuildAgent

## Build Status
- npm run build: GREEN (all pages)
- npx tsc --noEmit: CLEAN (no errors)
- Pushed to main: 8fdd9bb

---

## Phase 1 — Pre-flight

- npm install needed (fresh container, node_modules missing)
- Build and TypeScript both clean after install

---

## Phase 2 — Feature Built

### ActivationPendingPage: Trades alignment fix

**File:** `src/pages/ActivationPendingPage.tsx`

**Problem:** TRADES was a flat string array `['Electrical', 'Plumbing', 'Heat Pumps', ...]` while SignupPage used `{value, label}` objects. The backend received raw label strings ("Heat Pumps") instead of normalized trade codes ("hvac"). Gas engineer, EV charger installer, and Decorator/painter were missing entirely.

**Fix:** Replaced flat array with matching `{value, label}` structure from SignupPage. All 11 trade options now present. Select option uses `value` (e.g., 'hvac') not label string.

---

## Phase 3 — Copy Polish

### FaqPage

**File:** `src/pages/FaqPage.tsx`

Changes:
1. Added free scan CTA block (black background) above "STILL HAVE QUESTIONS?" — "SEE REAL LEADS IN YOUR AREA — FREE." with SCAN MY AREA FREE + SEE PRICING CTAs + "No credit card required — 3 free scans every week" trust line. FAQ-convinced visitors now have a direct conversion path.
2. Q37 renamed "How does territory exclusivity work?" → "How does the territory lock work?" (product rule compliance — "exclusive" language removed per Problems and Solutions.md)
3. "What trades do you cover?" updated to include EV charger installers, gas engineers, decorators/painters (matches SignupPage expanded TRADES list)

### SmartQuotePage

**File:** `src/pages/SmartQuotePage.tsx`

Changes:
1. Hero micro-label: "SMART QUOTING" → "FREE TOOL — NO SIGNUP NEEDED"
2. Hero body: replaced generic "pick your trade and job type" opener with Fear → Proof → Control structure. Now names Bark + Checkatrade: "Bark and Checkatrade make you compete on price. Walk in with a proper written proposal and you compete on quality. Pick your trade and job type — get a professional quote opener in 30 seconds. No blank page. No guesswork."

---

## Phase 4 — Site Health Check

**NEEDLE (top 3 UX issues found):**
1. FindJobsPage: paywall banner appears BEFORE lead cards — HIGH impact
2. PricingPage: dual competing CTAs (START £39/MO vs SCAN FREE) — HIGH impact (CRITIC: existing pattern is standard, deferred)
3. DashboardPage: YOUR INTAKE + SCOREBOARD sections conflated — MEDIUM impact (complex refactor, deferred)

**BUILDER fix — FindJobsPage paywall position:**

**File:** `src/pages/FindJobsPage.tsx`

Problem: Free-tier upgrade banner ("SIGNALS FOUND. BUYER DETAIL IS LOCKED.") appeared as the FIRST element in results, before users could see any lead cards. Cold paywall kills trial-to-paid conversion.

Fix: Removed free-tier branch from the top ternary (DEV/unlimited banners stay at top — they're access confirmations not paywalls). Added new free-tier upgrade section AFTER lead cards, Patch Pulse, and before results footer. New copy: "SEEN ENOUGH? UNLOCK BUYER DETAIL ON EVERY LEAD." with "Pro unlocks who needs the work, what it's worth, and when to call — for every lead above." — contextually positioned AFTER users have seen the evidence.

**CRITIC:** Clearer in <3 seconds — YES. Users see lead quality before the ask.
**REVENUE:** Increases £39/month conversion — YES. Leads-first > paywall-first.

---

## Still Open

- [ ] Stripe live test (blocked on Vercel test keys)
- [ ] Gas engineer / heat pump lead quality verification
- [ ] DashboardPage YOUR INTAKE sections conflation (NEEDLE #3 — medium complexity refactor)
- [ ] TradeFlow (blocked on partnership)
- [ ] n8n workflow 16 (blocked on SMTP)

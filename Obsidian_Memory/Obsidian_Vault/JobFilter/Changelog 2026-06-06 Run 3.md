# Changelog 2026-06-06 — NightlyBuildAgent Run 3

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

---

## Pre-flight

- Fresh container — `npm install` required, completed cleanly
- Build confirmed GREEN (106 pages), TypeScript CLEAN before changes
- Read vault: Feature Roadmap, Problems and Solutions, Design Direction, Daily To-Do, Changelog Run 2
- All Tier 1 features confirmed built
- Open To-Do items from Run 2: FILL MY WEEK copy, free/paid value prop alignment

---

## Phase 1 — Fix Broken

No broken builds, TypeScript errors, or fake form submissions found.

---

## Phase 2 — Feature Work

No new Tier 1 features unbuilt. All were confirmed built in prior runs. Moved directly to copy polish.

---

## Phase 3 — Copy Polish (Two Pages)

### Page 1: FindJobsPage

**FILL MY WEEK section copy:**
- **Before:** "Broader than SCAN — searches all sources out to {X} miles. [mode text]. Ranked for {Trade}, ready to chase."
- **Problem:** Didn't explain the key differentiator — FILL MY WEEK does NOT use the weekly scan allowance (fillMyWeek() never calls recordWeeklyScan()). This was a hidden selling point.
- **After:** "Doesn't use your scan allowance. Searches {X} miles — wider than your regular scan — across [all active/imminent jobs or planning/contracts]. Auto-ranked for {Trade}."
- **Button:** "FILL MY WEEK →" → "EXPAND SCAN — 25MI →" (dynamic radius, distinguishes from regular scan headline)

**"TRACKING IN CHASE" jargon:**
- **Before:** Tracked leads showed "TRACKING IN CHASE" button (disabled, navy)
- **Problem:** "CHASE" is an internal product concept — tradespeople have no context for it
- **After:** "ALREADY TRACKING" — plain English, clearly communicates the state

**Lead card complianceRisk jargon:**
- **Before:** "Next action: whatsapp · low risk" (shows complianceRisk from contactPath)
- **Problem:** Tradesperson doesn't think in compliance risk levels. "Low risk" next to a job contact action is confusing.
- **After:** "Best approach: whatsapp" — removed compliance risk label entirely

**Lead card evidenceCount copy:**
- **Before:** "{N} evidence items · source links required before purchase/contact decisions"
- **Problem:** "source links required before purchase/contact decisions" is corporate/legal language
- **After:** "{N} verified signals backing this lead" — plain and informative

### Page 2: DashboardPage

**Territory-locked value prop alignment:**
- **Before:** "Gold leads shown to you first — your competition gets them 24h later."
- **Problem:** Only mentioned timing advantage. FindJobsPage leads with detail-gate (buyer name, job value, contact link). Two different value props with no connection.
- **After:** "Gold leads to you first — buyer name, job value, and direct WhatsApp routing included. Your competition gets them 24h later." — merges both value props into one coherent sentence.

**No-territory copy (free/unpaid user):**
- **Before:** "No patch locked — you're racing every other trade for the same leads. Another trade could claim your area today." + single "LOCK YOUR PATCH NOW →" CTA
- **Problem:** Only mentioned territory urgency, not the detail unlock reason to upgrade. Free users have TWO reasons to pay: unlock buyer details AND get timing priority.
- **After:** "No patch locked — leads are visible but buyer name, job value, and contact details stay hidden until you upgrade. Another trade could claim your area today." + two CTAs:
  - Primary (yellow): "UNLOCK BUYER DETAILS →" → /pricing
  - Secondary (white/outline): "LOCK YOUR PATCH →" → /territories

---

## Phase 4 — Site Health Check

### NEEDLE: Top 3 Issues Found

1. **"TRACKING IN CHASE" jargon** (HIGHEST) — every tracked lead card showed internal product language. Fixed this session.
2. **FILL MY WEEK copy didn't surface free scan allowance benefit** (HIGH) — tradespeople didn't know the button ran a wider scan without using their weekly quota. Fixed this session.
3. **FaqPage "pipeline is light"** (MEDIUM) — internal jargon in BRONZE description. Fixed.

### BUILDER Fix Applied
All three issues fixed. Primary was "TRACKING IN CHASE" → "ALREADY TRACKING" — visible on every tracked lead for every user.

### CRITIC
- "ALREADY TRACKING" — clear in <3 seconds. Yes.
- "Doesn't use your scan allowance" — clear in <3 seconds. Yes.
- Combined value prop on Dashboard — "Gold leads to you first — buyer name, job value, and direct WhatsApp routing included" — clear in <3 seconds. Yes.

### REVENUE
- Detail+timing combined message on Dashboard: Yes — free users now see both reasons to pay in one place.
- "Doesn't use your scan allowance" on FILL MY WEEK: Yes — removes a friction reason not to click.

---

## Next Run Priorities

1. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (blocked on test keys in Vercel)
2. **Free/paid story consistency audit** — check remaining pages (PricingPage, SignupPage, HomePage) to confirm the "buyer details locked until paid" message is consistently present wherever free users might be making the upgrade decision
3. **DashboardPage mobile check** — the new two-button row (UNLOCK BUYER DETAILS + LOCK YOUR PATCH) on the dark header — verify this renders cleanly at 375px

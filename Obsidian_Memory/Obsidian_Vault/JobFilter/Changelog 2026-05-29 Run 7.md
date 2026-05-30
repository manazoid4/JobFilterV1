# Changelog 2026-05-29 Run 7 — NightlyBuildAgent

**Commit:** `0f4423a`
**Branch:** main
**Build:** GREEN (95 pages) | TypeScript: CLEAN

---

## Pre-Flight

- `npm install` required (fresh container — no node_modules)
- `npm run build` → GREEN (95 pages, 95/95 compiled)
- `npx tsc --noEmit` → CLEAN
- sms.ts stub verified already fixed (returns `triggered: false` + `reason: 'no_twilio_config'` when no Twilio env — not a stub-success issue)
- All Tier 1 features confirmed BUILT from prior runs

---

## Phase 2 — Commercial Lead Scoring Boost

### `leadEngine/scorer.ts`

**Problem:** Commercial leads only got +5 (hvac/building/electrical) or +2 (all others) commercial bonus. Too small to materially push commercial leads to GOLD tier for trades that regularly win commercial contracts.

**Fix — tiered commercial bonus by trade:**
- hvac/electrical: +14 (was +5) — these trades win 30–50% revenue from commercial
- building: +12 (was +5) — commercial refurbs/fitouts are high-value
- plumbing/landscaping/carpentry: +6 (was +2) — occasional commercial work
- others: +3 (was +2)

**Why it matters:** A commercial school electrical contract worth £20k now reliably scores GOLD for an electrician. Previously it might be SILVER due to the small bonus being swamped by other factors.

---

## Phase 3a — FaqPage Copy Polish

### `src/pages/FaqPage.tsx`

**Problems fixed:**
1. FAQ #2 said "Serious Buyer Score" — this term does not exist in the product UI. Leads show GOLD/SILVER/BRONZE. Stale terminology breaks trust if a user checks the FAQ after seeing the app.
2. No FAQ explaining what GOLD/SILVER/BRONZE means — the most visible product element had no explanation.
3. FAQ on freshness didn't mention competitors being slower.

**Changes:**
- "How does the Serious Buyer Score work?" → "How does the lead scoring work?" — plain language, accurate description of 0–100 + GOLD/SILVER/BRONZE labels
- New FAQ: "What does GOLD, SILVER, BRONZE mean?" — actionable guidance per tier (GOLD: send WhatsApp today; SILVER: 2-min call to confirm timing; BRONZE: quiet-week list)
- Freshness FAQ updated: "before they appear on Checkatrade, Bark, or MyBuilder" — names competitors at the most credible data point (speed advantage)
- £39/mo FAQ: replaced "letter drop scripts" with "six pre-written WhatsApp templates" (more specific, more modern), names the money-back guarantee

---

## Phase 3b — PostJobPage Copy Polish

### `src/pages/PostJobPage.tsx`

**Problems fixed:**
1. Hero sub-copy was generic ("routes it to a serious firm instead of blasting your details around a shared lead market") — didn't name Checkatrade/Bark
2. Proof cards were vague: "No quote circus", "Matched by trade", "Local patch fit" — fine on their own but don't explain the problem they solve
3. Aside section used "Smarter match over time" (jargon) and didn't name competitors

**Changes:**
- Hero sub-copy: "No Checkatrade auction. No five tradesmen phoning at once. JobFilter checks local fit and routes your job to one serious firm — not a queue of bidders."
- Proof cards: "One trade, not five bidders" / "Matched by trade and postcode" / "Local — not a national agency"
- Aside section: fear→proof→control per item. Now names Bark and Checkatrade explicitly in item #1. Item #2 explains WHY the first call is better (trade gets full context before calling). Item #3 addresses the trust concern (local firms only, no call centres).

---

## Phase 4 — Site Health: FindJobsPage Unlock CTA Fix

**NEEDLE finding:** The yellow "FREE SCAN — SIGNAL IS REAL" banner (lines 682–688) had NO CTA button. A free user who saw their results and read the copy had to scroll past all leads to find the upgrade action in the dark section below. This is a dead conversion moment.

### `src/pages/FindJobsPage.tsx`

**Fix:**
- H2 rewritten: "THE JOB IS REAL. THE NAME, PHONE, AND JOB DETAIL ARE LOCKED." — plain English instead of "buyer detail, quote floor" jargon
- Body copy tightened: "Your free scan found live signals near you. To see who needs the work, how much it's worth, and when to call — unlock for £39/mo."
- Added `<Link href="/pricing" className="jf-button ...">UNLOCK FOR £39/MO →</Link>` button directly in the yellow section
- Added "No credit card required to scan" micro-label inline with button

**CRITIC:** Clearer in <3 seconds? YES — name/phone/job detail is immediately understood. Button removes all ambiguity about next action.
**REVENUE:** YES — converts the most visible conversion moment from passive copy to an active CTA.

---

## Metrics

- Files changed: 4 source files
- Lines: 25 insertions, 16 deletions (surgical)
- Build time: GREEN (9.4s)
- TS errors: 0
- Pages: 95

---

## Next Run Priorities

1. **Stripe live test** — wire end-to-end with test key (4242 4242 4242 4242), confirm `/dashboard?welcome=1` and `profiles.plan` flip in Supabase. Blocked on test keys in environment.
2. **WhatsApp delivery hardening** — sms.ts stub now correctly returns `triggered: false` for no-Twilio config. Remaining: verify Twilio response status field is checked correctly (`status: 'queued'|'sent'|'failed'`) before production launch.
3. **Commercial lead detection consistency** — detectCommercial() keywords cover offices/retail/industrial/schools. Consider adding: "apartment block", "block of flats", "HMO", "student accommodation" as commercial signals (these are high-value for plumbers and electricians especially).

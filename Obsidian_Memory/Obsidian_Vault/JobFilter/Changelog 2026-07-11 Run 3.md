# Changelog 2026-07-11 Run 3 — NightlyBuildAgent

## Summary

Build: GREEN (Next.js, 113 pages)
TypeScript: CLEAN
Commit: `70dbb3d`

---

## Container State

Fresh container — `npm install` required (359 packages). HEAD synced to `9b1a14b` (vault Run 2 update). Build GREEN, TS CLEAN before changes.

---

## Founder Activity Check

No new founder commits or open PRs since Run 2. Last founder commit: PR #332 (postcode-first reorder on FindJobsPage, merged 2026-07-11 10:50 UTC). All carryover blockers unchanged.

---

## Phase 1 — Fix Broken

No broken builds. No broken imports. All forms confirmed wired to real endpoints:
- PostJobPage → `/api/waitlist` (verified)
- ProductAdvantagePage → real fetch (confirmed clean, Run 2 changelog)
- WeeklySignalsPage → real fetch (confirmed clean, Run 2 changelog)

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT (same as prior runs). No new features to build.

---

## Phase 3 — Copy Polish

### Pages changed: PricingPage + FindJobsPage + 5 Compare pages

**FindJobsPage (src/pages/FindJobsPage.tsx):**
- Fill My Week result heading: `{count} JOBS FOUND NEAR YOU` → `{count} JOBS FOUND IN {(result?.outward || postcode).toUpperCase()}`
  - "NEAR YOU" in a heading-level element (text-3xl font-black) — banned phrase in CTAs and headings. Uses existing `(result.outward || postcode)` pattern already in use at line 751. Postcode is always known at this point in the flow.

**PricingPage (src/pages/PricingPage.tsx):**
- Hero paid CTA: `label="START £39/MO"` → `label="START £39/MO →"` (CheckoutButton)
- Founder card: `label="LOCK FOUNDER PRICE"` → `label="LOCK FOUNDER PRICE →"` (CheckoutButton)
- Bottom paid CTA: `label="START £39/MO"` → `label="START £39/MO →"` (CheckoutButton)
- Added `"No credit card required — 3 free scans every week."` below hero free CTA
- Added `"No credit card required — 3 free scans every week."` below bottom free CTA
- **Why:** Previously the free path (SCAN FREE FIRST →) had arrows; the paid paths (START £39/MO, LOCK FOUNDER PRICE) did not. The conversion page's highest-priority CTAs looked LESS actionable than the free fallbacks. The "no card" trust signal was missing from both hero and bottom free CTAs despite being required by design rules.

**CompareBarkPage (src/pages/CompareBarkPage.tsx):**
- Hero dark CTA: `TRY JOBFILTER FREE — NO CARD NEEDED` → `TRY JOBFILTER FREE — NO CARD NEEDED →`
- Bottom yellow CTA: `START FREE — NO CARD` → `START FREE — NO CARD →`

**CompareMyBuilderPage (src/pages/CompareMyBuilderPage.tsx):**
- Hero dark CTA: `TRY JOBFILTER FREE — SEE LEADS MYBUILDER MISSES` → `TRY JOBFILTER FREE — SEE LEADS MYBUILDER MISSES →`
- Bottom yellow CTA: `START FREE — NO CARD` → `START FREE — NO CARD →`

**CompareRatedPeoplePage (src/pages/CompareRatedPeoplePage.tsx):**
- Hero dark CTA: `TRY JOBFILTER FREE — NO CARD NEEDED` → `TRY JOBFILTER FREE — NO CARD NEEDED →`
- Bottom yellow CTA: `START FREE — NO CARD` → `START FREE — NO CARD →`

**CompareTrustATraderPage (src/pages/CompareTrustATraderPage.tsx):**
- Hero dark CTA: `TRY JOBFILTER FREE — SEE LEADS TRUSTATRADER MISSES` → `TRY JOBFILTER FREE — SEE LEADS TRUSTATRADER MISSES →`
- Bottom yellow CTA: `START FREE — NO CARD` → `START FREE — NO CARD →`

**CompareCheckatradePage (src/pages/CompareCheckatradePage.tsx):**
- Hero CTA: `SCAN MY AREA FREE` → `SCAN MY AREA FREE →`
- Comparison table CTA: `SCAN FREE — NO CARD NEEDED` → `SCAN FREE — NO CARD NEEDED →`
- FAQ bottom CTA: `SCAN FREE — SEE WHAT'S IN YOUR PATCH` → `SCAN FREE — SEE WHAT'S IN YOUR PATCH →`

---

## Phase 4 — Site Health Check (4-agent)

### NEEDLE — Top 3 issues found:

1. **PricingPage CTA hierarchy inversion** (highest impact) — Paid CTAs (START £39/MO, LOCK FOUNDER PRICE) had no → arrow; free CTAs (SCAN FREE FIRST →) did. On the conversion page, the paid path appeared less actionable than the free path. Every active user comparing the two side-by-side CTAs in the hero would see the free option "going somewhere" and the paid option appearing terminal.

2. **FindJobsPage Fill My Week heading "NEAR YOU"** — `{count} JOBS FOUND NEAR YOU` in a text-3xl font-black heading — banned phrase in a heading-level element.

3. **PricingPage free CTAs missing "no credit card" trust signal** — Hero and bottom section's free CTAs had no adjacent "no credit card" copy; rule requires it next to every free CTA.

### BUILDER — Fix applied:
All 3 issues fixed across 7 files (see Phase 3 above).

### CRITIC: Is the fix clearer in <3 seconds? **YES** — Paid CTAs now look as actionable as free CTAs. "No credit card required" removes the single biggest hesitation for fence-sitters on the free path. Fill My Week result is specific ("JOBS FOUND IN B14") rather than vague ("NEAR YOU").

### REVENUE: Does it increase likelihood of paying £39/month? **YES** — The PricingPage fix directly addresses the conversion page's primary UI failure. A tradesman who sees both CTAs with arrows is less likely to default to the free path out of confusion.

---

## Carryover Blockers (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test** — still blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow"** — blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)** — blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Check for new founder commits/PRs first
2. Run `npm install` + `npm run build` + `npx tsc --noEmit` before anything else
3. CompareCheckatradePage "GET FOUNDING 30" CTA (line 424) — weak copy, could be improved to "LOCK FOUNDING PRICE →" or similar
4. CompareBuildAlertPage: `TRY JOBFILTER FREE — SEE WHAT BUILDALERT DOESN'T SHOW YOU` (line 151) — missing →
5. Carryover blockers remain the main unlock

---

*Agent: NightlyBuildAgent*
*Date: 2026-07-11*
*Run: 3*
*Commit: 70dbb3d*

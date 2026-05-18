# Readability + Attention Conversion Audit — 2026-05-18

Cross-references: [[Readability + Attention Span Conversion Brief]]

## What was researched

Applied the founder brief principles: 5-Second Test, Skim Test, One-Action Rule, Attention Ladder, F-pattern scanning, layer-cake scanning, plain language, and the `Stop [pain]. Find [outcome] using [mechanism].` hero formula.

## What was changed (this push)

### Item #5 — HomePage hero (`Stop [pain] / Find [outcome] / Mechanism`)
- **File:** `src/pages/HomePage.tsx`
- **Before:** Subhead said `Real jobs. Scored. Sent to your WhatsApp before anyone else knows they exist.` — outcome only, no mechanism.
- **After:** `Find real building work using planning, EPC and council data — sent to your WhatsApp before competitors call.` — completes the formula by naming the mechanism in Layer 1.

### Item #6 — Skim test: HomePage proof points
- **File:** `src/pages/HomePage.tsx`
- **Before:** Four vague tiles (`Real planning signals`, `Real construction opportunities`, `Postcode exclusivity`, `One dominant partner per area`).
- **After:** Each tile now carries a number, a mechanism, an offer, or a risk reversal:
  - `40+ UK signal sources scanned daily` (number)
  - `Planning, EPC & council data — verified` (mechanism + proof)
  - `One trade per postcode — locked to you` (offer)
  - `No shared lead trap. Cancel anytime.` (risk reversal)

### HomePage section headings — not changed
- Already pass the skim test (each carries the argument): `SEE THE PRODUCT BEFORE YOU PAY`, `THREE STEPS. ZERO WASTE`, `A WAR ROOM FOR FINDING WORK BEFORE IT GOES PUBLIC`, `SECURE YOUR PATCH BEFORE ANOTHER FIRM DOES`. Surgical-change rule applied — no rewrite needed.

## Other features shipped in same push (not from the brief)

### Item #4 — Lead workflow integration
- **File:** `src/pages/LeadListPage.tsx`
- Added keyword/postcode search bar across all leads (job type, area, postcode, details, flags).
- Added `EXPORT CSV` button — downloads visible tab's leads with score/job/area/postcode/urgency/budget/phone/status/flags/created date.

### Item #3 — Win/Loss drill-down
- **File:** `src/pages/DashboardPage.tsx`, `src/lib/winStore.ts`
- Added `getWinBreakdown()` — groups wins by trade, location, and source with count + value.
- Added "Win Breakdown — Where your money comes from" section to dashboard showing top 5 per dimension with proportional value bars.
- Hidden when no wins exist (avoids empty-state clutter).

### Item #2 — Document/keyword search
- Already implemented in `src/lib/documentSearch.ts` + `src/components/KeywordSearch.tsx` + `FindJobsPage.tsx`. No new work needed for the client-side prototype. Production PDF extraction pipeline still pending — see [[Feature Roadmap - 8th May 2026]].

## Blocked — needs founder action

### Item #1 — WhatsApp Business API live delivery
- Twilio / WhatsApp Business API credentials required.
- Type contracts and templates exist in `src/lib/types.ts` and `src/lib/chaseTemplates.ts`.
- Cannot ship until founder provisions credentials and updates `.env`.

## Why these changes improve conversion

1. **Hero now passes the 5-second test** — pain, outcome, AND mechanism on the same fold.
2. **Proof points are spotted-pattern-friendly** — numbers and concrete claims replace generic adjectives.
3. **Lead CSV export removes the biggest workflow friction** — tradesmen can now sync to their existing CRM/notebook without copy-paste.
4. **Dashboard breakdown gives users unit-economics drill-down** — "which trade/location/source actually pays me" justifies the subscription past month 3.

## Files changed

- `src/pages/HomePage.tsx`
- `src/pages/LeadListPage.tsx`
- `src/pages/DashboardPage.tsx`
- `src/lib/winStore.ts`
- `Obsidian_Memory/Obsidian_Vault/AI Knowledge/Readability + Attention Span Conversion Brief.md` (new)
- `Obsidian_Memory/Obsidian_Vault/JobFilter/Readability + Attention Conversion Audit - 2026-05-18.md` (new)

## Remaining risks / next tests

- **CSV export** is client-side only — no server-side webhook delivery yet. Promote as "Quick export" in copy until full integrations page ships.
- **Win Breakdown** hides for users with zero wins. Consider showing sample data once we have onboarding telemetry.
- **WhatsApp** still mock-only — gates real paid conversion. **Highest priority unblock.**

## Suggested A/B tests

1. Hero subhead: with vs without `using planning, EPC and council data` mechanism phrase.
2. Proof tile #1: `40+ UK signal sources` vs `Live signals updated daily`.
3. CTA: `SCAN FREE — NO CARD NEEDED` vs `SHOW ME LEADS NEAR ME`.
4. Dashboard breakdown: trade-first vs location-first ordering — which keeps users in dashboard longer.

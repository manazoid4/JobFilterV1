# Changelog 2026-08-11

## NightlyBuildAgent Run

### BUILD STATUS
- TypeScript: PASS (0 errors)
- Next.js build: PASS

### FEATURE BUILT — Trade-Specific Scoring UX
**File:** `src/pages/FindJobsPage.tsx`

Added `TRADE_WORK_TYPES` map and updated `parseTradeReasons()` to accept a `leadTrade` parameter. When the backend returns generic reasons ("Verified signal"), the function now supplements with trade-specific highlight badges:

- Electrician → EV CHARGER · REWIRE
- Plumber → BOILER · BATHROOM
- Roofer → FLAT ROOF · GUTTERING
- Builder → EXTENSION · LOFT CONVERSION
- HVAC → VENTILATION · AIR CON
- Landscaper → FENCING · PAVING

`LeadResultCard` now passes `lead.trade || lead.tradeMatch` to `parseTradeReasons`.

### COPY FIXED

**Page 1: FindJobsPage — EmptyScanReport**
- Removed confusing "Alert delivery is available only after the selected provider and account configuration have been verified" text
- Added honest explanation: "An empty result is honest — it means no verified public notices matched your trade and area today"
- Changed CTA to "SEE COVERAGE & PRICING — NO CARD NEEDED"

**Page 2: HomePage — WHAT YOU GET tiles**
- Sharpened all 8 feature tile bodies from vague jargon to specific tradesperson-relevant copy
- "Firm-aware fit" → "Trade and area match" with concrete description
- "Requirement gaps" → "Missing requirements shown" with "Saves hours per opportunity"
- Trust strip: Added "Not Checkatrade. Not MyBuilder. Public tenders." competitor contrast

### SITE HEALTH FIX — TopNav CTA

**File:** `src/components/TopNav.tsx`

NEEDLE issue: "CHECK FTS FREE" / "CHECK FIND A TENDER FREE" used government procurement jargon no tradesperson recognises.

- Desktop CTA: "CHECK FTS FREE" → "SCAN FREE — NO CARD"
- Mobile menu label: "CHECK FTS" → "FIND JOBS"
- Mobile bottom CTA: "CHECK FIND A TENDER FREE" → "SCAN FREE — NO CARD NEEDED"

CRITIC verdict: Clearer in <3 seconds — YES.
REVENUE impact: HIGH — every first-time visitor sees the nav CTA before anything else.

### PR
#456 — https://github.com/manazoid4/JobFilterV1/pull/456

---

## NEXT RUN — Top 3 Priorities

1. **Duplicate upgrade CTA** (NEEDLE Issue 2): "SEE BUYER DETAILS — £39/MO →" appears 3× in FindJobsPage results section with identical wording. Keep only the bottom upgrade block; replace inline repetitions with brief lock indicators.

2. **LeadDetailPage duplicate WhatsApp CTAs** (NEEDLE Issue 3): Two WhatsApp send paths at lines ~437 and ~599 cause decision paralysis. Remove the quick-send from "WHY THIS LEAD" panel, add anchor link jumping to the main WhatsApp section.

3. **Verify FTS coverage with real live scan**: Run a real scan against the current Find a Tender feed (e.g. `B14 7QH, electrical, 25 miles`) to confirm the scoring engine returns meaningful results and the new trade-hint badges display correctly.

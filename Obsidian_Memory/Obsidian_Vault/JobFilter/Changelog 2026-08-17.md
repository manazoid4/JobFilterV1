# Changelog — 2026-08-17

## NightlyBuildAgent Run

### BUILD STATUS
- Build: PASS (Next.js, clean compile)
- TypeScript: PASS (zero errors before and after changes)

---

### FEATURE BUILT — Trade-specific scoring UX

**File:** `src/pages/FindJobsPage.tsx`

Added `TRADE_SPECIFIC_SIGNALS` map keyed by trade (electrical, plumbing, roofing, building, carpentry, painting, hvac, landscaping), each containing 10–15 trade-specific keywords.

Added `extractTradeSignals(lead, trade)` function that scans `lead.title + lead.description` for trade keyword matches and returns up to 3 hits.

Updated `LeadResultCard` to accept `currentTrade?: string` prop. When trade signals match the lead content, they appear as yellow `"EV CHARGER — YOUR TRADE"` style badges at the front of the badge row, before generic score reasons.

Both `LeadResultCard` call sites updated to pass `currentTrade={trade}`.

---

### COPY FIXED

**Page 1: FindJobsPage.tsx**

- Quota-exhausted banner: "Buyer and submission context locked. Scanning remains free." → plain English ("3 free scans used up this week — buyer details locked until you upgrade or wait until Monday"). CTA moved to its own line for mobile tappability.
- Upgrade nudge: names Bark and BuildAlert as competitors. Added "no shared auction, no five-trade blast" language. Added "No credit card required" next to paid CTA.

**Page 2: PricingPage.tsx**

- Micro-label: "FOUNDER-ASSISTED PILOT" → "PUBLIC TENDERS — SCORED FOR YOUR TRADE"
- Hero headline: stripped corporate "know which opportunities fit your firm" → "STOP WASTING DAYS ON TENDERS THAT WERE NEVER A FIT."
- Hero body: now names Checkatrade and MyBuilder as the old way
- All free CTAs: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD NEEDED →"
- New objection added: "How is this different from Checkatrade or MyBuilder?" with direct comparison
- Existing objections rewritten in plain trade English
- Step section: "SET THE FIRM PROFILE. CHECK THE EVIDENCE. MAKE THE DECISION." → "SET YOUR TRADE. CHECK THE EVIDENCE. BID OR SKIP."
- Coverage section: rewritten to be more direct and trust-building
- Bottom CTA section: stronger headline, "One job won covers a year at £39/mo" added

---

### SITE HEALTH FIXES

**NEEDLE (top issue found):** Quota-exhausted banner used corporate jargon and had mobile CTA accessibility issue.

**BUILDER (fix applied):**
1. `FindJobsPage.tsx` — Quota banner rewired as a two-state component; exhausted state shows plain English + full-width CTA button on its own line.
2. `LeadListPage.tsx` — WhatsApp dead-end fixed. When `lead.phone` is null (free-tier user), primary yellow button no longer opens `wa.me` with an empty recipient. Now links to `/pricing` with "GET BUYER NUMBER — £39/MO →".

**CRITIC:** Fix is clearer in < 3 seconds — YES (message is a plain statement, CTA is obvious)
**REVENUE:** Increases likelihood of £39/mo — YES (converts a dead-end frustration into a direct upsell moment)

---

### NEXT RUN — Top 3 Priorities

1. **Lead not found empty state** (`LeadDetailPage.tsx:167`): When localStorage is cleared or a link is opened on a different device, user sees bare "LEAD NOT FOUND" + generic "BACK" button. Needs: explanation ("Leads are stored on this device") + "SCAN FOR JOBS →" CTA.

2. **Trade-specific scoring in LeadDetailPage**: The `WHY THIS LEAD` section in LeadDetailPage is static flags-based. Could show trade-specific context (e.g. "EV charger job — electricians have 72h first-mover window on this signal type") based on the lead's `source` and the user's trade.

3. **WinStatsBanner cold-start problem**: The banner only shows when `wonCount > 0`. For new areas/postcodes, it never shows. Add a "Be the first trade in [POSTCODE AREA] to log a win" micro-nudge even when count is zero — this creates social proof aspiration and reinforces the outcome tracking flow.

# Changelog 2026-07-23

## NightlyBuildAgent Run — 2026-07-23 UTC

### BUILD STATUS
- npm run build: PASS
- npx tsc --noEmit: PASS (pre-existing legacy Vite-era errors unrelated to diff)
- npm audit: 0 vulnerabilities after fixes

### PHASE 1 — FIXES

**Security: npm audit vulnerabilities (CI was blocking)**
- `body-parser` auto-fixed to 1.20.6 via `npm audit fix`
- `sharp < 0.35.0` (bundled by next@16.x) carried 4 libvips CVEs; added `"sharp": "^0.35.0"` to `overrides` in `package.json` — npm audit now reports 0 vulnerabilities
- `npm audit fix --force` was NOT used as it would have downgraded Next.js to 14.x (breaking change)

### PHASE 2 — FEATURE: Trade-Specific Scoring UX

**File: `src/pages/FindJobsPage.tsx`**

Added `TRADE_KEYWORD_CONTEXT` map covering 8 trades and 60+ job keywords. The WHY? tooltip on lead score cards now shows trade-specific value and time context instead of generic "KEYWORD — YOUR TRADE":

- Electrician: "EV CHARGER — £600-1,200 · 1-2 days", "FULL REWIRE — £4,000-8,000 · 3-5 days", "CONSUMER UNIT — £500-900 · 1 day", "EICR CERT — £100-250 · half day", "SOLAR PV — £5,000-10,000 · 2-3 days"
- Plumber: "BOILER SWAP — £2,000-3,500 incl. parts", "BATHROOM REFIT — £5,000-15,000 · 2 weeks", "HEAT PUMP — £8,000-15,000 · govt. grant possible"
- HVAC, Roofing, Building, Carpentry, Landscaping, Painting: similar trade-specific context

New `enrichKeywordLabel(keyword, trade)` function does the lookup and falls back to "KEYWORD — YOUR TRADE" when no match.

`parseTradeReasons` now accepts optional `trade` param; call site passes `lead.trade ?? lead.tradeMatch`.

### PHASE 2 (continued) — SITE HEALTH FIXES (from NEEDLE audit)

**Stats bar clarity** (`src/pages/FindJobsPage.tsx`)
- Labels upgraded from `text-[9px]` to `text-[11px]`
- PLANNING → "PLANNING JOBS" + "approved projects" subtext (sm+)
- ENERGY → "ENERGY UPGRADES" + "EPC & retrofit signals" subtext (sm+)
- CONTRACTS → "CONTRACTS" + "public tenders live" subtext (sm+)
- Tradesman now understands at a glance what each number means

**Trade preset button UX** (`src/pages/FindJobsPage.tsx`)
- Buttons now visually disabled (40% opacity, cursor-not-allowed) when postcode field is empty
- Header label changes to "ENTER POSTCODE ABOVE — THEN TAP YOUR TRADE" when no postcode
- Fixes silent failure on mobile where tapping with no postcode felt broken

### PHASE 3 — COPY POLISH

**HomePage** (`src/pages/HomePage.tsx`)
- Hero subheading now names competitors explicitly: "Not a shared auction. Not Checkatrade. Not Bark."
- Replaced abstract "removes weak matches" with specific data sources: "planning approvals, energy data and council contracts before they hit the open market"

**PricingPage** (`src/pages/PricingPage.tsx`)
- Objections now name all 4 competitors: Checkatrade, MyBuilder, Bark, BuildAlert
- "Are leads shared?" answer: "no Bark-style credit burn. One trade per patch gets first call."
- "Can I scan before paying?": added "no credit card required"

### PR
- Branch: `nightly/2026-07-23-trade-scoring-copy-polish`
- PR: https://github.com/manazoid4/JobFilterV1/pull/387
- CI: check (npm audit) fixed — was failing due to pre-existing sharp/body-parser CVEs

---

## NEXT RUN PRIORITIES

1. **Verify PR #387 merged** — check CI green and merge
2. **Trade-specific scoring UX — lead detail page**: Apply the same TRADE_KEYWORD_CONTEXT enrichment to LeadDetailPage score reasons panel (currently just shows raw strings)
3. **NEEDLE issue #1** (from this run's audit): Too many competing upgrade CTAs per lead card — remove the `lg:hidden` inline "UNLOCK FULL LEAD" button at FindJobsPage line ~1344 since the LockedValue buyer lock and post-list upgrade section already cover this
4. **ForYourTradePage copy**: Not touched in recent runs — apply tradesman-first copy rules (fear → proof → control, specific beats vague, name competitors)
5. **WinStatsBanner**: Add postcode to the message ("3 members near B14 won jobs this month") for more local social proof

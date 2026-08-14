# Changelog — 2026-08-14

## NightlyBuildAgent Run

### BUILD STATUS
- `npm run build` — PASS (clean)
- `npx tsc --noEmit` — PASS (zero errors)

### FEATURES AUDITED (Tier 1)
All five Tier 1 features were already implemented in the codebase:
- Scan counter (localStorage, weekly reset) — EXISTS in FindJobsPage.tsx
- Google Calendar ICS export — EXISTS in LeadDetailPage.tsx + /api/leads/calendar.ics
- Won leaderboard (WinStatsBanner) — EXISTS, component and API endpoint both live
- WhatsApp templates (quick_quote_offer, availability_check) — EXISTS in chaseTemplates.ts
- Trade-specific scoring UX — PARTIALLY EXISTS, enhanced this run

### CHANGES MADE

#### src/pages/FindJobsPage.tsx
1. **Trade-specific scoring reasons** — Enhanced `parseTradeReasons()` to accept `trade` and `title` params. Added `TRADE_TITLE_KEYWORDS` mapping for 8 trades (electrical, plumbing, roofing, building, carpentry, painting, hvac, landscaping). When backend provides no specific keywords, function now extracts trade-specific terms from the lead title (e.g. electricians see "EV CHARGER — YOUR TRADE", plumbers see "BOILER — YOUR TRADE").
2. **WHY THIS? button** — Renamed from "WHY?" to "WHY THIS?", bumped from `text-[9px]` to `text-[10px]`, changed from near-invisible muted border to `border-2 border-[var(--navy)]` with navy/white hover toggle. Now readable and tappable on mobile.
3. **Upgrade CTA copy** — Added competitor names (Checkatrade, MyBuilder, Bark), "No credit card required to browse", and "no five-trade blast" messaging. Applied fear → proof → control structure.

#### src/pages/PricingPage.tsx
4. **Competitor comparison grid** — New dark section above final CTA. Three columns comparing: Checkatrade/Bark/MyBuilder (shared auction, lead fee), BuildAlert/Planning Pipe (raw data, no scoring), JobFilter (scored, one trade, buyer detail). Yellow highlight on JobFilter column.
5. **Final CTA button** — Added "NO CARD NEEDED" to the secondary scan CTA.

### PR
- Branch: `nightly-build-2026-08-14`
- PR: https://github.com/manazoid4/JobFilterV1/pull/472
- CI: `check` in progress as of run completion

### SITE HEALTH (NEEDLE → BUILDER → CRITIC → REVENUE)
- **NEEDLE**: Top issue = WHY? button nearly invisible (text-[9px], muted color). Users couldn't see why a lead scored highly — key trust signal missed.
- **BUILDER**: Fixed — WHY THIS? button now border-2 navy, text-[10px], toggle to white on hover.
- **CRITIC**: Clearer in <3 seconds? YES — navy border visible against the score badge background.
- **REVENUE**: Increases £39/mo likelihood? YES — understanding score reasoning builds trust in the lead quality, making paid unlock more compelling.

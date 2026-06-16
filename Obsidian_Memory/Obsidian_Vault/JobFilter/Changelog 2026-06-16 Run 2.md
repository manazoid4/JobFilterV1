# Changelog — 16 June 2026 (NightlyBuildAgent — Run 2)

## Container state
- `npm install` (fresh container); build GREEN (110 pages), TypeScript CLEAN before and after changes.

## Phase 1 — verified
- Build GREEN, TypeScript CLEAN.
- No `setSubmitted(true)` without real fetch (confirmed from previous run and re-audited).
- No broken imports found.

## Phase 2 — Tier 1 feature audit
All Tier 1 features confirmed built from Run 1 (scan counter, calendar ICS, WinStatsBanner, WhatsApp templates, trade-specific scoring, job value tracking, commercial detection).

Pending items from Run 1 verified:
- **WA_TEMPLATE_KEYS**: confirmed all 5 keys present in QuickResponseKit line 37.
- **WinStatsBanner**: confirmed component renders correctly when `wonCount > 0`; correct to not render when no wins exist.
- **getChannels('none')** already returns `['portal', 'canvass', 'letter', 'email']` — multi-channel for planning leads is implemented.

## Phase 2 — Feature built: ForYourTradePage trade selector expansion

### ForYourTradePage (`src/pages/ForYourTradePage.tsx`)
- Trade selector expanded from **6 → 12 trades**.
- Added: Gas Engineer, Solar PV, EV Charger, Heat Pumps, Decorating, Scaffolding.
- Each new trade has: trade-specific signals description (names Checkatrade/Bark/MyBuilder timing), value range, and an example lead with specific area/value/urgency/source.
- Hero subtitle updated: "See what gets flagged — before Checkatrade, Bark, or MyBuilder list the same job."
- **Rationale**: Gas engineers, solar installers, EV charger specialists, decorators, and scaffolders visiting this page previously saw no relevant trade and would bounce. Now 12 trades covered.

## Phase 3 — Copy polish

### FaqPage (`src/pages/FaqPage.tsx`)
- **"How fresh are the leads?"**: Added "3–5 days ahead of Checkatrade, Bark, or MyBuilder" to the timing claim. Now consistent with HomePage/PricingPage copy. Added "The first call wins. That gap is the product." — makes the value explicit.
- **"30-day money-back guarantee"**: Tightened to "not a single job worth quoting — not one". More emphatic, clearer risk reversal.
- **"What trades do you cover?"**: Expanded from 11 → 15 trades (scaffolders, solar PV installers, fire safety engineers, groundworkers, data cabling added) to match the dedicated trade pages on the site.

## Phase 4 — Site health (NEEDLE/BUILDER/CRITIC/REVENUE)
- **NEEDLE issue found**: ForYourTradePage only showed 6 of 15+ trades. A solar installer, gas engineer, EV charger specialist, decorator, or scaffolder landing on this page saw nothing relevant.
- **BUILDER fix**: Expanded to 12 trades with specific signal descriptions and example leads.
- **CRITIC**: Clearer in <3 seconds? YES — tradesmen can now find their specific trade immediately.
- **REVENUE**: More tradesmen see relevant example leads → more signups → higher likelihood of £39/month conversion. YES.

## Build status
- `npm run build` GREEN (110 pages), `npx tsc --noEmit` CLEAN.
- Pushed to `main` (`29c8870`).

## Next run priorities
1. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel).
2. **TerritoriesPage mobile check** — `max-lg:hidden` columns on desktop fine; verify "Avg job value" and "Signals/mo" fields appear clearly on mobile article card view.
3. **WinStatsBanner real-data test** — log a win via BuyerOutcomePicker, verify WinStatsBanner renders on FindJobsPage.
4. **ForYourTradePage — add remaining trades** — Fire Safety, Data Cabling, CCTV, Groundworkers, Structural Engineers, Quantity Surveyors could be added to reach all 21 trade pages.
5. **Compare pages freshness** — CompareBark/CheckatradePage compare tables look solid; check RatedPeoplePage and TrustATraderPage for any stale copy.

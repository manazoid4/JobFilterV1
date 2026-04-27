# SESSION LOG — 2026-04-27

## Session goal
Upgrade JobFilter codebase per strategy brief: postcode-first homepage, demo locked leads, lead scoring engine, data pipeline display, free tools, module linking, commit + push.

---

## Changes made

### src/App.tsx
- **Imports**: Added `useNavigate`, `useSearchParams`, `FormEvent` from react/react-router-dom
- **NAV_ITEMS**: Added `Free Tools → /tools`
- **Lead scoring engine**: Added `parseLeadValue()`, `scoreLeadTier()` → returns `{ tier: HIGH|MED|LOW|JUNK, reason: string }` based on urgency + value + sourceConfidence
- **TIER_STYLE**: Badge colours for each tier
- **FreeScanInput component**: Postcode form that navigates to `/demo?postcode=X`
- **LeadCard**: Now shows tier badge + reason string; accepts `showModuleLinks` prop — first lead shows "Win this job → Vantage / More nearby → Vicinity / Close faster → Codex"
- **HomePage hero**: Replaced link buttons with `FreeScanInput` — postcode input above the fold
- **DemoPage**: Reads `?postcode=` from URL params (set by homepage form); reverted TEST MODE — shows 2 free leads, rest locked behind email gate
- **DemoPage**: Added pipeline banner: `SCRAPE → NORMALISE → SCORE → FILTER → DELIVER · Detects jobs before marketplaces`
- **FreeToolsPage** (new export): 4 inline tools, no login required
  - `ProfitCalc` — job value / materials / hours / rate → profit + margin
  - `TyreKickerDetector` — 5-question scoring → Solid/Borderline/Tyre-kicker verdict
  - `QuickQuoteGenerator` — trade + job size → ballpark range
  - `AreaDemandChecker` — postcode prefix → planning volume score + link to live scan

### src/main.tsx
- Added `FreeToolsPage` import
- Added `<Route path="/tools" element={<FreeToolsPage />} />`

---

## Reasoning
- Postcode-first homepage = single clear CTA above fold, reduces drop-off
- Locked leads (2 free) = restore email gate conversion mechanic disabled in TEST MODE
- Lead scoring = differentiates from raw scrapers; gives signal quality context inline
- Pipeline banner = shows intelligence layer, builds trust in data source
- Module links on first lead = contextual Vantage/Vicinity/Codex upsell at moment of intent
- Free tools = no-login entry point, each upsells to Intake Engine after use

---

## Next steps
- Wire real planning/EPC data sources to backend scan endpoint
- Add source tags: `planning_portal`, `building_control`, `epc_signal` to lead cards
- A/B test 1 vs 2 free leads on conversion rate
- Add WhatsApp share button to Vicinity example posts

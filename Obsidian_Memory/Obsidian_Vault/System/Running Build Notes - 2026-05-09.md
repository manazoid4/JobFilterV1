# Running Build Notes - 2026-05-09

## Scope

Ultra work pass focused on turning JobFilter from a broad SaaS landing page into a tactical construction intelligence and territory acquisition system.

## Research Inputs

- Claude Design research: strongest lesson is design-system extraction and strict reuse, not generic AI dashboard output.
- Tactical dashboards: dense status surfaces, hard borders, clear state labels, and immediate next action.
- Construction field systems: mobile simplicity matters more than decorative UI; crews need scan, status, action.
- Official source strategy confirmed around Planning Data, EPC domestic API, Contracts Finder, Companies House, Land Registry, and public procurement sources.

## Decisions

- Homepage now prioritises two actions: scan area and claim territory.
- Navigation moved from generic SaaS sections to acquisition flow: Scan Area, Territories, Signals, Pipeline, Free Tools, Pricing.
- Territory grid added as the new psychological centre of the product.
- Avoided fake lead claims. Homepage signal board is framed as a live-style product surface, while backend lead fetchers remain the source of truth.
- Kept data pipeline code untouched in this pass because lead quality changes need separate regression checks.

## Implementation Log

- Updated `src/index.css` tokens to tactical black, DeWalt yellow, steel greys, sharp edges, and operation panel utilities.
- Rebuilt `src/components/TopNav.tsx` around territory acquisition and fixed the mobile quick-action grid.
- Replaced overloaded `src/pages/HomePage.tsx` with a shorter tactical homepage.
- Added `src/pages/TerritoriesPage.tsx` with searchable controls, territory cards, status labels, heatmap-style grid, and claim CTA.
- Registered `/territories`, `/claim`, `/trade-map`, and `/uk-grid` routes in `src/App.tsx`.

## Verification

- `npm run lint` passed.
- `npm run build` passed and generated `dist`.
- Dev server returned HTTP 200 for `/`, `/territories`, `/claim`, and `/uk-grid`.
- Local dev URL: `http://127.0.0.1:3000`.

## Follow-Up Risks

- Lead engine sidecar found directory signals can outrank official sources; scoring gates need a dedicated backend pass.
- Dev sandbox requirements still need a dedicated internal panel and feature-flag pass.
- Waitlist modal still fires too early and should be moved to intent-based timing.

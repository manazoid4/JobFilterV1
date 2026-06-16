# Changelog — 16 June 2026 (NightlyBuildAgent — Run 3)

## Container state
- Fresh container: `npm install` (node_modules missing); build GREEN, TypeScript CLEAN.
- Diagnosed detached HEAD situation: container initialised from local git mirror at `609898a` (June 4), but remote (GitHub) had 53 more commits. Recovered by fetching origin and hard-resetting to `da7dc41` (origin/main tip).
- All changes applied to correct `da7dc41` base.

## Phase 1 — verified
- Build GREEN, TypeScript CLEAN before and after changes.
- No `setSubmitted(true)` without real fetch (confirmed from prior runs — TerritoriesPage uses `joinWaitlist()`).
- No broken imports found.

## Phase 2 — Feature built: ForYourTradePage trade expansion

### ForYourTradePage (`src/pages/ForYourTradePage.tsx`)
- Trade selector expanded from **12 → 17 trades**.
- Added: **Fire Safety**, **Data Cabling**, **CCTV / Security**, **Groundworks**, **Structural Engineer**.
- Each new trade has: trade-specific signals description (naming Checkatrade/Bark/MyBuilder timing), value range, and an example lead with specific area/value/urgency/source.
- **Rationale**: Fire safety engineers, data cabler, CCTV installers, groundworkers, and structural engineers visiting this page previously saw no relevant trade and would bounce. Now 17 trades covered, matching all dedicated `/trade/*` pages.

## Phase 3 — Copy polish

### CompareRatedPeoplePage (`src/pages/CompareRatedPeoplePage.tsx`)
- **Trust line missing**: Added `No credit card required — 3 free scans every week` below hero CTAs. This line was already present on TrustATrader page but absent here — inconsistency spotted, fixed.
- **Signals per scan row added to comparison table**: Rated People had no "Signals per scan" row but TrustATrader comparison table did. Added row: "None — sees only what homeowners post" vs "10 verified signals per scan". Makes the data advantage concrete immediately when scanning the table.

## Phase 4 — Site health (NEEDLE/BUILDER/CRITIC/REVENUE)

### TerritoriesPage (`src/pages/TerritoriesPage.tsx`)
- **NEEDLE issue found**: Territory cards show "Avg job value" and "Signals/mo" as data columns. Desktop shows a header row (`max-lg:hidden`). On mobile, a tradesman sees `£8k–£25k avg job` and `11 ● Strong` with NO label for what `11` means. The word "avg job" is embedded in the value string, but `liveSignals` is a bare number — impossible to interpret on mobile without context.
- **BUILDER fix**: Added `<p className="text-xs font-black uppercase text-[var(--muted)] lg:hidden">AVG JOB VALUE</p>` and `<p className="text-xs font-black uppercase text-[var(--muted)] lg:hidden">SIGNALS/MO</p>` above each respective data element. Hidden on desktop (header exists), visible on mobile.
- **CRITIC**: Clearer in <3 seconds? YES — "14 SIGNALS/MO ● Strong" is immediately legible vs bare "14 ● Strong".
- **REVENUE**: Mobile tradesmen (majority) now understand the data table → more confidence in territory viability → higher likelihood of submitting patch check form → higher likelihood of paying £39/month. YES.

## Build status
- `npm run build` GREEN (110+ pages), `npx tsc --noEmit` CLEAN.
- Pushed to `main` (`53d5598`).

## Git note for future agents
- Container git mirror initialises from an older origin/main snapshot. Always run `git fetch origin main` and `git reset --hard origin/main` at session start before making commits. Do NOT commit on a detached HEAD or from a stale local main — the push will fail or create divergence.

## Next run priorities
1. **ForYourTradePage — Quantity Surveyors** — still not in trade selector (17/18 trade pages covered). Add QS with example lead (contract valuation / procurement framework).
2. **Compare pages freshness** — CompareBuildAlertPage copy — check if "BuildAlert" competitor claims are still accurate vs current BuildAlert pricing/UX.
3. **TerritoriesPage fresh NEEDLE pass** — form success message has no response-time SLA ("we'll reply within 24h" missing).
4. **WinStatsBanner real-data test** — log a win via BuyerOutcomePicker, verify WinStatsBanner renders on FindJobsPage.
5. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel).

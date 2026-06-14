# Changelog — 12 June 2026 (NightlyBuildAgent)

## Setup
- `node_modules` empty again in this fresh container — `npm install` (359 packages, no vuln blockers).
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN

## Audit — Tier 1 / Tier 2 re-confirmed still built and wired
Re-grepped all 5 Tier 1 brief items plus Tier 2 #12/#16/#17 — all present and unchanged from last run's audit:
- Scan counter (`weeklyScansRemaining`) on FindJobsPage
- `/api/leads/calendar.ics` (server/routes/calendarExport.ts) + ADD TO CALENDAR on LeadDetailPage
- `WinStatsBanner` wired on FindJobsPage, reads `/api/wins/stats`
- WhatsApp templates `quick_quote_offer` / `availability_check` present in chaseTemplates.ts
- Trade-specific scoring (`TRADE_KEYWORDS` in leadEngine/scorer.ts)

No regressions found. Tier 2 #15 (multi-channel follow-up) remains correctly out of rotation per last run's analysis — blocked on a real contact-data source, which is Tier 4 #22 (DO NOT BUILD, GDPR risk).

## NEEDLE / Phase 4 fixes (BUILDER)
1. **SignalsPage.tsx — "URGENT TAKEOVER" signal badge** used raw `bg-red-700 text-white` while every other signal-type badge in the same map (`LEGAL TRIGGER`, `COMPLIANCE WORK`, etc.) uses brutalist `var(--orange)`/`var(--navy)`/`var(--yellow)` tokens. Fixed to `bg-[var(--orange)] text-white` — matches the rest of the SIGNAL TYPES legend.
2. **CityPage.tsx — "THE OLD WAY" label** referenced an undefined `--red` CSS variable (`text-[var(--red)]`) that was immediately overridden by an inline `style={{ color: 'var(--orange)' }}`. Removed the dead class — same visual result, no broken/unused token reference.

- CRITIC check: clearer in <3s? Yes for #1 — badge colour now consistent with the rest of the legend (no jarring pure-red against the brutalist yellow/navy/orange palette). #2 is a code-cleanliness fix with no visible change.
- REVENUE check: low direct impact (both are visual consistency fixes on SignalsPage / city landing pages), but removes inconsistency a visiting tradesman would notice on a page used to explain "how scoring works."

## Other checks this run
- Phase 1: confirmed no `setSubmitted(true)` fake-flow forms remain (ProductAdvantagePage, WeeklySignalsPage both wired to real `fetch()`).
- Searched for remaining jargon ("moat", "signal engine", "Trade Command Centre", "Patch Plan", "EXCLUSIVE", "pipeline") across `src/pages` and `src/components` — none found outside internal data keys already rendered as "Edge".
- Spot-checked Trade*.tsx data files (20 pages) — confirmed "No credit card required" + CTA structure live in shared `TradePage.tsx` component, not duplicated per-trade (false alarm from initial grep).
- Reviewed PostJobPage, MyLinkPage, MaterialPriceEnginePage, DevPortalPage, HealthPage — all clean, no design-system or naming violations.
- `/test` (TestConsolePage) integration-health labels ("EPC register", "Companies House") left as-is — this is an operator diagnostics console, not customer-facing marketing copy, so the "never name data sources publicly" rule doesn't apply here.

## Commit
- `9c41512` `[NightlyBuildAgent] Design system fix — SignalsPage URGENT TAKEOVER badge + CityPage dead CSS var` — pushed to `main`.

## NEXT RUN — top 3 priorities
1. **All Tier 1 + Tier 2 (#12, #16, #17) features remain confirmed built; jargon sweep and design-system token sweep both now exhausted across `src/pages`** — next run should look at `src/components/*.tsx` more broadly (only CityPage/TradePage/SignalsPage/AccountPage checked closely so far) for any remaining raw-Tailwind color/shadow/radius drift.
2. **Spot-check "EMAIL ME THIS LEAD" live** — still blocked, no `RESEND_API_KEY` in this container.
3. **Stripe live test** — 4242 4242 4242 4242, confirm `/dashboard?welcome=1` and `profiles.plan` flip (still blocked on test keys in Vercel, carried over ~3 weeks).

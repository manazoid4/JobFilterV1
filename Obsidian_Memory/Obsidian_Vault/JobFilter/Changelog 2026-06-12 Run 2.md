# Changelog — 12 June 2026 (NightlyBuildAgent — Run 2)

## Setup
- Fresh container — `node_modules` missing again, `npm install` (359 packages).
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN
- Local `main` ref was stale (pointing at `609898a`, 52 commits behind `origin/main`); `git fetch` + `git checkout main && git reset --hard origin/main` resolved it before committing.

## Audit
- Re-confirmed Tier 1 + Tier 2 #12/#16/#17 all still built and wired (no regressions) — same set re-verified by Run 1 earlier today.
- Phase 1: no `setSubmitted(true)` fake-flow forms (ProductAdvantagePage, WeeklySignalsPage both wired to real `fetch()`).
- Design-system token sweep on `src/components/*.tsx` — checked all raw-Tailwind color/rounded/shadow patterns across all 33 components. Remaining hits (`EpcSignalCard` EPC-rating swatches, `TradePage` WhatsApp mockup `#0B141A`, modal close-button `rounded-sm`) are intentional (EPC band colours / WhatsApp UI mockup / small icon buttons) — not brutalist-palette violations. Sweep is exhausted.

## Bug found and fixed (BUILDER)
Ran the lead-engine regression suite (`codex-output/lead-engine-quality-regression.mjs`) — found it **flaky** (~1/3 failures): `B15 1AA/building top score must be pay-worthy` (score 80, needs ≥85).

**Root cause:** `directorySignalFetcher.ts` assigned every internal fallback lead a `rawPublished` date of `Date.now() - Math.random() * 7 days` — recomputed fresh on every scan. The freshness-decay scorer gives a one-off `+5` "Fresh lead" bonus only when age ≤3 days, so the *same* internal lead's score (and its "Fresh"/"Stale" reason text) randomly swung by 5 points scan-to-scan.

**Production impact:** for postcodes/trades where the real data sources return nothing (common in this container, and possible in production during source outages), the DirectorySignal fallback leads are what the user sees. A tradesman re-running the same scan could see a lead's score — and potentially its GOLD/SILVER/BRONZE label — change for no reason. That's a trust problem given "lead quality" is the core promise.

**Fix:** `leadEngine/fetchers/directorySignalFetcher.ts` — `rawPublished` is now deterministic per lead, derived from `urgency` + index: high-urgency leads are 0-2 days old (fresh bonus), medium 4-6 days (neutral), low 8-10 days (slight decay). Same lead = same age = same score across scans.

- Build GREEN, TypeScript CLEAN, `lead-engine-quality-regression.mjs` now passes consistently (5/5 runs).
- Commit `d5b5539` pushed to `main`.

## Other checks
- `codex-output/unified-find-jobs-regression.mjs` — PASS
- `codex-output/lead-engine-source-config-regression.mjs` — PASS
- `codex-output/free-scanner-redaction-regression.mjs` — pre-existing failure (`missing lock copy: "Free scan confirms the signal is live"`), confirmed failing on `origin/main` *before* this run's change too (stale test expectation vs current UI copy) — not a regression from tonight, left for a future run to triage separately.

## NEXT RUN — top 3 priorities
1. **`codex-output/free-scanner-redaction-regression.mjs`** — pre-existing failure, unrelated to tonight's fix. Check whether the asserted copy ("Free scan confirms the signal is live") still exists anywhere in the free-scanner UI, or whether the test needs updating to match current copy.
2. **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container.
3. **Stripe live test** — 4242 4242 4242 4242, confirm `/dashboard?welcome=1` and `profiles.plan` flip (still blocked on test keys in Vercel, carried over ~3 weeks).

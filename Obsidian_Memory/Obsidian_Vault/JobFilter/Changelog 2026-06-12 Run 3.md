# Changelog — 12 June 2026 (NightlyBuildAgent — Run 3)

## Setup
- Container started detached at `2d9e43e` (== `origin/main`, no real divergence); `git checkout main` resolved it.
- Fresh container — `node_modules` empty again, `npm install` (359 packages).
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN

## Carryover fix (Run 2's top priority)
- **`codex-output/free-scanner-redaction-regression.mjs`** — was failing on a stale assertion: the FindJobsPage no longer contains the literal string "Free scan confirms the signal is live" (this copy was rewritten in earlier jargon/copy sweeps). Confirmed the *behaviour* the test was protecting — free-tier leads still show blurred `LockedValue` placeholders (Buyer/Deadline/Source URL) plus a real "N verified signal(s) backing this lead" line that proves the lead is genuine without leaking details. Updated the test's required-copy check from the old literal string to `'verified signal'`, which matches the current UI. Regression now PASSES.

## NEEDLE pass (Phase 4)
Ran an Explore-agent NEEDLE pass across less-trafficked pages (Admin Guard, Vantage, Vicinity, Compare*, Trade*, etc.) looking for new design-system violations, dead links, vague copy, and source-naming leaks. Two of the three flagged items were false positives (NewsPage's ECO4/GBIS/Ofgem references are legitimate trade-news content about government schemes, not JobFilter's internal lead sources — left unchanged; a site-wide "Planning Data" rename across 30+ Trade*.tsx pages was too broad for one run and not clearly a violation — left unchanged, flagged for product review if needed).

**Fixed (BUILDER):**
- `src/pages/IntakeTestPage.tsx:125` — error state used raw Tailwind `bg-red-100`/`text-red-800` (design-system violation, same class as prior sweeps). Changed to `border-2 border-[var(--orange)] bg-[var(--orange)]/10 text-[var(--ink)]`.

**CRITIC check:** error state is now visually consistent with the rest of the brutalist palette in <3 seconds — yes.
**REVENUE check:** /test is a dev/QA page, not a conversion surface — neutral, but removes a visible inconsistency if shown to anyone.

## Copy polish (Phase 3) — "specific beats vague"
- `src/pages/FindJobsPage.tsx:1070` — CompaniesHouse lead card line "New business nearby — commercial fit-out likely" → "New business {distance label} — commercial fit-out likely", reusing the existing `distLabel` (e.g. "8 miles from B14" / "In B14") already computed for the card. Matches the "8 miles from you beats nearby" copy rule.
- `src/pages/TrustCenterPage.tsx:9` — "Recent property ownership changes nearby" → "...in your patch", consistent with sibling bullet copy ("in your postcode cluster", "across your patch").

## Verification
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN
- `node codex-output/free-scanner-redaction-regression.mjs` — PASS (was failing)
- `npx tsx codex-output/lead-engine-quality-regression.mjs` — PASS
- `npx tsx codex-output/unified-find-jobs-regression.mjs` — PASS
- Commit `e938865` pushed to `main`.

## Other test-suite notes (not fixed this run — flagged for triage)
Ran the full `codex-output/*.mjs` suite. Several other regressions fail with **stale copy assertions** unrelated to tonight's changes (pattern: old marketing copy was rewritten in past sweeps, test was never updated):
- `package-copy-regression.mjs` — expects "FOUNDING 30" on homepage (renamed in a past pricing sweep)
- `launch-polish-regression.mjs` — expects "What You Get" in top nav (renamed)
- `free-access-daily-tools-regression.mjs` — expects "FREE DAILY TOOLS" on FreeToolsPage (renamed)

These three are all the **same class of issue** as tonight's fix (test copy assertions drifted from current UI copy after legitimate rewrites) — none indicate the underlying feature is broken, just that the test strings are outdated. Also failing, unrelated to copy:
- `free-preview-live-contract-test.mjs` — requires a live server on `localhost:3000` (ECONNREFUSED) — needs `npm run dev`/`next start` running, not a code bug.
- `intake-test-mode-regression.mjs` / `news-link-regression.mjs` — `ENOENT src/App.tsx` — these tests reference a file removed during the Next.js App Router migration; need rewriting against current `app/` structure or retiring.
- `lead-engine-50-plus-quality-test-fixed.mjs` / `ten-postcode-source-smoke.mjs` — long-running live-network smoke tests against real government data sources; inconclusive in this container without checking output fully.

## NEXT RUN — top 3 priorities
1. **Stale copy-assertion regressions (3 files)** — `package-copy-regression.mjs`, `launch-polish-regression.mjs`, `free-access-daily-tools-regression.mjs` all fail on copy strings that were intentionally changed in past sweeps. For each: confirm the new copy still satisfies the *intent* of the test, then update the assertion (same pattern as tonight's `free-scanner-redaction-regression.mjs` fix).
2. **`intake-test-mode-regression.mjs` / `news-link-regression.mjs`** — both `ENOENT src/App.tsx`, a file that no longer exists post-Next.js-migration. Decide: rewrite against `app/` structure, or retire if superseded by `unified-find-jobs-regression.mjs` / `site-conversion-quality-test.mjs`.
3. **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container.
4. **Stripe live test** — 4242 4242 4242 4242, confirm `/dashboard?welcome=1` and `profiles.plan` flip (still blocked on test keys in Vercel, ~3 weeks carried over).

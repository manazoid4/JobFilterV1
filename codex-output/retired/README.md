# Retired regressions

These tests asserted copy from an earlier homepage/pricing/nav rewrite
(£49 pricing, "STOP FUNDING TYRE-KICKERS" hero, "Pro unlocks"/"Free shows
the signal" gate copy, "What You Get / Testing Stage / Blueprint" nav,
and a news page that named raw data sources like "Planning Data" /
"GOV.UK Building Materials"). All of that copy has since been
deliberately rewritten across many NightlyBuildAgent runs, and the
public-source-naming assertions now directly contradict the current
product rule ("NEVER name data sources publicly").

Retired 2026-06-13 rather than rewritten — the assertions encoded a
specific (now superseded) version of the copy rather than a stable
product invariant, so there is nothing meaningful left to "fix forward".
Current copy is covered by `unified-find-jobs-regression.mjs`,
`site-conversion-quality-test.mjs`, and `package-copy-regression.mjs`.

- `launch-polish-regression.mjs`
- `free-access-daily-tools-regression.mjs`

## ENOENT src/App.tsx (post-Next.js migration)

Both of these asserted route registration via `src/App.tsx`
(`path="/news"` / `path="/intake-test"`), which was removed when routing
moved to the Next.js App Router (`app/**/page.tsx`). `/news` is alive and
working (`app/news/page.tsx` -> `NewsPage`), but the test's content
assertions ("Federation of Master Builders", "sourceUrl", etc.) match an
earlier NewsPage rewrite that no longer exists. `/intake-test` was never
ported to the App Router — `IntakeTestPage.tsx` is now an orphaned
component with no route. Retired rather than rewritten for the same
reason as the copy regressions above: the assertions describe a
superseded version of the page, not a stable invariant.

- `intake-test-mode-regression.mjs`
- `news-link-regression.mjs`

Note for a future run: `src/pages/IntakeTestPage.tsx` is dead code (no
route imports it). Either give it a real `app/intake-test/page.tsx` route
or delete the component — flagged here, not actioned tonight.

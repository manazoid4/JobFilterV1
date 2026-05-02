# Rolling Launch Summary

## 2 May 2026

Focus:

- Organised data-source status.
- Captured competitor research.
- Saved one-lead-per-week payment scenarios.
- Added website intake test mode at `/intake-test`.
- Added useful trade signals/news route at `/news`.
- Fixed PlanningData source gating.
- Reverted lead-engine free tier limit from 25 to 5.
- Ran 10-postcode source smoke test.
- Implemented scenario learning into the visible scanner: `/find-jobs` now uses the unified lead engine instead of Contracts Finder only.
- Free preview still locks buyer, URL, deadline, exact value, contact signal, and action route.
- Improved planning leads with source URL, buyer, and deadline to count as strong action signals.
- One-lead-rule pass rate is now 42/42.
- Added intake outcome tracking: won, lost, no answer.
- Confirmed WhatsApp gold-lead path works in stub mode. Real Twilio keys are missing.

What changed:

- `src/pages/IntakeTestPage.tsx`
- `src/pages/NewsPage.tsx`
- `src/App.tsx`
- `src/components/TopNav.tsx`
- `codex-output/intake-test-mode-regression.mjs`
- `codex-output/news-link-regression.mjs`
- `codex-output/lead-engine-source-config-regression.mjs`
- `codex-output/ten-postcode-source-smoke.mjs`
- `codex-output/unified-find-jobs-regression.mjs`
- `server/routes/leadsSearch.ts`
- `src/lib/types.ts`
- `src/pages/LeadDetailPage.tsx`
- `src/pages/LeadListPage.tsx`
- `server/services/sms.ts`
- `leadEngine/normaliser.ts`
- `functions/leadEngine/normaliser.ts`
- `codex-output/planning-contact-signal-regression.mjs`
- `codex-output/outcome-tracking-regression.mjs`
- `codex-output/whatsapp-env-regression.mjs`
- [[Data Sources]]
- [[Launch Scenarios]]
- [[Competitor Research - 2 May 2026]]

Test result:

- 10/10 postcodes returned non-empty structured leads.
- Free tier limit held at 5 leads.
- Contracts Finder, FTS, PCS, and DirectorySignal worked across the smoke test.
- PlanningData worked in the final smoke run for all 10 cases.
- Companies House skipped because no API key is set.

Verification:

- `npm run lint` passed.
- `npm run build` passed.
- Intake test mode regression passed.
- News link regression passed.
- Lead-engine source config regression passed.
- Postcode filter regression passed.
- Free scanner redaction regression passed.
- Free preview live contract test passed against local server.
- Unified find-jobs regression passed.
- Lead-engine quality regression passed.
- 50+ lead quality script returned 42/42 valid scans with no empty outputs, no schema failures, no duplicate IDs, clean junk rejection, and one-lead-rule overall true: 42/42.
- Live `/find-jobs` free preview contract passed after switching to the unified engine.
- 10-postcode smoke after the route change returned structured leads for all 10 test postcodes with the free limit held at 5.

Next work:

- Add real Twilio WhatsApp keys and test one live gold-lead delivery.
- Re-run full site conversion script after local rate limit resets.
- Start storing lead outcomes server-side instead of only localStorage.

## Rolling Rule

Keep this file short.

Every agent should be able to see:

- what changed
- what was tested
- what is blocked
- what to do next

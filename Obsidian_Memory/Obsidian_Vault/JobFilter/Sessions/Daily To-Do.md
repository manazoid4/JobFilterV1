# Daily To-Do

Last updated: 2026-07-30 (NightlyBuildAgent run)

## DONE (this run)

- [x] Trade-specific scoring UX: `buildPreviewReasons()` now scans lead title for trade keywords as a fallback — free-tier users see relevant reasons (EV CHARGER, BOILER, etc.) rather than "Verified signal"
- [x] Scan-limit exhausted UX: redesigned zero-scans state with clear copy + full-width yellow CTA; removed confusing "Scanning remains free" language
- [x] HomePage hero copy: rewrote sub-paragraph with fear→proof→control structure
- [x] PricingPage FAQ: added Planning Pipe / BuildAlert comparison entry
- [x] Vercel cron fix: changed `0 * * * *` (hourly, blocked on Hobby) to `0 8 * * *` (daily 8am UTC)

## PENDING — next session priorities

- [ ] NEEDLE issue #3: Replace hard-coded "SCAN BUILDING WORK" secondary button with a trade-aware button using the user's currently selected trade
- [ ] WinStatsBanner empty state: show a nudge for logged-in users when no wins are tracked for the postcode yet
- [ ] Cron delivery check: verify `/api/alerts/send` is actually delivering daily email alerts — check Supabase logs for recent alert deliveries
- [ ] Confirm Vercel deploy preview is green after cron fix (PR #412)
- [ ] Consider promoting `SHOW_ADVANCED_TOOLS` flag to true once multi-source adapters are verified — currently hidden behind flag in FindJobsPage

## STANDING RULES

- No blog, no new pages (21 is enough)
- No homeowner contact enrichment (GDPR risk)
- No Rightmove/Zoopla (too expensive)
- No change to GOLD/SILVER/BRONZE scoring labels
- No change to route paths unless broken
- Design: White/black/yellow only. border-2 border-[var(--line)]. No blue gradients.

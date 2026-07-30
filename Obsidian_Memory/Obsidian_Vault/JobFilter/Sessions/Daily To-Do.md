# Daily To-Do

Last updated: 2026-07-30 (NightlyBuildAgent run — context 2)

## DONE (this run)

- [x] Trade-specific scoring UX: `buildPreviewReasons()` now scans lead title for trade keywords as a fallback — free-tier users see relevant reasons (EV CHARGER, BOILER, etc.) rather than "Verified signal"
- [x] Scan-limit exhausted UX: redesigned zero-scans state with clear copy + full-width yellow CTA; removed confusing "Scanning remains free" language
- [x] HomePage hero copy: rewrote sub-paragraph with fear→proof→control structure
- [x] PricingPage FAQ: added Planning Pipe / BuildAlert comparison entry
- [x] Vercel cron fix: changed `0 * * * *` (hourly, blocked on Hobby) to `0 8 * * *` (daily 8am UTC)
- [x] Instant→daily alert migration: GET endpoint aggregates and migrates legacy instant rows (grouped by trade+postcode, merging active/radius/timestamps)
- [x] Sender-side dedup (send/route.ts): instant rows with a daily sibling are skipped after merging active, radius_miles, last_checked_at, last_sent_at into sibling — prevents duplicate sends for dashboard-averse users
- [x] Null-postcode guard: GET migration skips instant rows with null postcode_outward to avoid collapsing distinct location variants under one key
- [x] CRON_TOLERANCE = 0.9: allows 10% early delivery so daily crons firing slightly before 24h are not skipped
- [x] PR #412 all CI clean (Vercel ✅, Meticulous ✅; Codex quota exhausted after 12 rounds with no new findings on final commit)

## PENDING — next session priorities

- [ ] NEEDLE issue #3: Replace hard-coded "SCAN BUILDING WORK" secondary button with a trade-aware button using the user's currently selected trade
- [ ] WinStatsBanner empty state: show a nudge for logged-in users when no wins are tracked for the postcode yet
- [ ] Cron delivery check: verify `/api/alerts/send` is actually delivering daily email alerts — check Supabase logs for recent alert deliveries
- [ ] Consider promoting `SHOW_ADVANCED_TOOLS` flag to true once multi-source adapters are verified — currently hidden behind flag in FindJobsPage
- [ ] MERGE PR #412 — nightly/2026-07-30-trade-scoring-ux — all checks clean, Codex quota exhausted
- [ ] Replenish Codex review credits (ChatGPT Codex settings → usage dashboard)

## STANDING RULES

- No blog, no new pages (21 is enough)
- No homeowner contact enrichment (GDPR risk)
- No Rightmove/Zoopla (too expensive)
- No change to GOLD/SILVER/BRONZE scoring labels
- No change to route paths unless broken
- Design: White/black/yellow only. border-2 border-[var(--line)]. No blue gradients.

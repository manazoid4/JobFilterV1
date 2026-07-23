# Daily To-Do — JobFilter

Last updated: 2026-07-23

## Done This Run ✅

- [x] Fix build (npm install required on fresh container)
- [x] Confirm TypeScript clean
- [x] Confirm all Tier 1 features already built (scan counter, calendar ICS, win leaderboard, WhatsApp templates, trade scoring)
- [x] PricingPage: flip bottom CTA order (free scan primary on "verify before paying" section)
- [x] PricingPage: standardise checkout button label
- [x] PricingPage: add competitor comparison FAQ (Checkatrade/BuildAlert/Bark)
- [x] PricingPage: "NO CARD NEEDED" on hero free-scan CTA
- [x] FindJobsPage: "UNLOCK BUYER DETAILS" upgrade CTA
- [x] Fix Vercel cron — changed hourly to daily (0 7 * * *) to unblock Hobby plan deployments
- [x] PR #390 opened and pushed

## Priority Queue — Next Run

- [ ] **Trade-specific scoring labels**: Add trade-to-keyword hint map so electricians see "EV CHARGER", "REWIRE", "EICR" as highlighted reasons; plumbers see "BOILER", "BATHROOM", "HEAT PUMP". Currently parseTradeReasons() is trade-agnostic.
- [ ] **Signals page copy audit**: Check for "nearby", "platform", "leverage", "utilise" language. Apply specificity rule ("8 miles" > "nearby").
- [ ] **Competitor comparison pages**: Still reference old consumer product (planning data, WhatsApp, HMO licensing, Gold/Silver/Bronze scoring). Need B2B pivot or disclaimer — currently creates trust gap if a visitor comes from /vs/checkatrade then visits /pricing.
- [ ] **WinStatsBanner API data**: Verify /api/wins/stats has real data behind it (reads from Supabase lead_outcomes table). If no outcomes recorded yet, banner never shows. Consider seeding with test data or adding a "Be the first to log a win" fallback state.
- [ ] **Mobile nav audit**: Check TopNav on mobile — if "Find Jobs" and "Pricing" are not immediately visible on mobile, that's a revenue leak.

## Discovered Issues (Log)

- 2026-07-23: Vercel Hobby plan blocks hourly cron — was silently failing every deployment. Fixed to daily.
- 2026-07-23: Vault files missing from repo (removed in clean commit 13b5241) — recreated this run.
- 2026-07-23: Competitor comparison pages (/vs/*) still use old consumer product messaging. Not urgent but creates brand inconsistency post-B2B pivot.

# Daily To-Do

## Today - 26 July 2026 (NightlyBuildAgent)

- [x] **Container state** — fresh container, `npm install` (183 packages); HEAD at `f96ace7` (FTS & Commercial Workflows #383). Build GREEN, TS CLEAN.
- [x] **Phase 1** — no broken builds, no broken imports, no fake flows. All good.
- [x] **Phase 2** — all Tier 1 features confirmed BUILT (scan counter, ICS export, wins leaderboard, WhatsApp templates, trade-specific scoring tags). No new feature needed this run.
- [x] **Phase 3 — ActivationPendingPage done state**: removed corporate jargon "cadence and channels you explicitly enable"; named Bark and Checkatrade explicitly; applied fear→proof→control structure.
- [x] **Phase 3 — DashboardPage empty state**: replaced process copy with fear→proof→control ("Most trades miss them — they don't have time to read the feed").
- [x] **NEEDLE #1 — PricingPage**: added `SCAN FREE — NO CARD NEEDED →` CTA button to dead-end "SCAN BEFORE YOU PAY" section.
- [x] **NEEDLE #2 — FindJobsPage**: "Buyer and submission context locked. Scanning remains free." → "Free scans used — upgrade to see buyer, deadline and source link."
- [x] **NEEDLE #3 — HomePage**: removed "Not ready yet? Drop your email below." + WaitlistForm from inside conversion CTA panel; moved to standalone section below.
- [x] **CRITIC:** YES — all 3 fixes read clearly in <3 seconds.
- [x] **REVENUE:** YES — PricingPage CTA and HomePage conversion panel fix directly increase £39/month likelihood.
- [x] **Build GREEN, TypeScript CLEAN.** PR #396 created. CI passed (`check` job: success).
- [ ] **DECISION NEEDED — Vercel cron**: `vercel.json` has `0 * * * *` (hourly) which requires Vercel Pro. Vercel bot failing on every PR. Options: change to `0 6 * * *` (daily, free) or upgrade to Pro. Current blocker is pre-existing but noisy.
- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown on pricing page.
- [ ] **Stripe live test** — still blocked on test keys in Vercel.
- [ ] **Next run priorities:**
  1. Vercel cron decision (daily vs Pro) — fix or note the trade-off
  2. Trade-specific scoring UX: could make trade-match badges on lead CARDS larger/more visible (currently small `badge` class)
  3. PricingPage copy: apply fear→proof→control to plan description bullets; name Checkatrade/MyBuilder/Bark in comparison

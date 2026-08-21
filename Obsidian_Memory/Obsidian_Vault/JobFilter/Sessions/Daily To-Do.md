# Daily To-Do

## 2026-08-21 (NightlyBuildAgent)

### Completed Today
- [x] Build verified green (Next.js + TypeScript clean)
- [x] All Tier 1 features confirmed built (scan counter, ICS export, WinStats, WhatsApp templates, trade scoring)
- [x] FindJobsPage: Empty state SVG removed, copy made trade-first, competitor contrast added
- [x] FindJobsPage: Scan limit message rewritten to plain English
- [x] FindJobsPage: Upgrade nudge made more specific with competitor contrast + "No credit card required"
- [x] PricingPage: Hero persona fixed (electricians/plumbers/roofers, not "5-25 person contractors")
- [x] PricingPage: Competitor FAQ added (Checkatrade/Bark vs JobFilter)
- [x] DashboardPage: FTS jargon removed from 3 key locations
- [x] PR opened: https://github.com/manazoid4/JobFilterV1/pull/492

### Next Run — Top 3 Priorities
1. **Trade-specific alert copy** — When a user sets up a trade alert, the confirmation message is generic. Make it trade-specific: "You'll get notified when new electrician jobs come in near B14" rather than generic alert confirmation.
2. **LeadDetailPage upgrade path** — When a free user views a lead, the paywall copy could be stronger. Check if "FULL ACCESS" locked fields have specific value proof ("This job has a published value of £X — see who to call").
3. **CompareCheckatradePage copy audit** — Verify the Checkatrade comparison page uses the current product positioning (public tenders, not just domestic leads). Update any stale copy about the product being purely a domestic marketplace.

### Ongoing Watch Items
- Main branch is protected — all changes must go via PR
- Package-lock.json has drift from local npm install — don't commit it
- OPEN_ACCESS env var: if set, removes scan limits (dev/testing only)
- DEV_MODE flag in FindJobsPage: set to false in prod

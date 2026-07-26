# Changelog 2026-07-26 (NightlyBuildAgent)

## Build Status
- **BUILD:** GREEN (117/117 static pages)
- **TYPESCRIPT:** CLEAN (0 errors)
- **CI:** PASSED (GitHub Actions `check` job — conclusion: success)
- **PR:** [#396](https://github.com/manazoid4/JobFilterV1/pull/396) — nightly/2026-07-26-needle-fixes
- **Vercel note:** Pre-existing cron conflict (`0 * * * *` requires Pro plan). Not introduced this run. Non-blocking for CI.

## Phase 1 — Fix Broken
- Fresh container. `npm install` (183 packages). HEAD at `f96ace7` (FTS & Commercial Workflows #383).
- Build failed initially: `next: not found`. Fixed with `npm install`. Build GREEN. TypeScript CLEAN. No broken imports or fake flows found.

## Phase 2 — Tier 1 Features (All Already Built)
- **Scan counter** — BUILT. `weeklyScansRemaining` displayed in real-time banner with green/orange state. Resets Monday midnight via localStorage.
- **Google Calendar ICS** — BUILT. `/api/leads/calendar.ics` endpoint in `server/routes/calendarExport.ts`. ADD TO CALENDAR link wired in `LeadDetailPage.tsx`.
- **Won leaderboard** — BUILT. `/api/wins/stats` endpoint reads Supabase `lead_outcomes`. `WinStatsBanner` component shown on `FindJobsPage`.
- **WhatsApp templates** — BUILT. `quick_quote_offer` and `availability_check` both present in `chaseTemplates.ts`.
- **Trade-specific scoring UX** — BUILT. `parseTradeReasons()` in `FindJobsPage.tsx` converts raw scorer output into yellow-highlighted trade-match badges on each lead card.

No new feature built this run — all Tier 1 items were confirmed complete.

## Phase 3 — Copy Polish (2 Pages)

### ActivationPendingPage.tsx — Done state copy
**Before:** "Your qualification profile is ready. Run a scan now; optional alerts follow the cadence and channels you explicitly enable."
**After:** "Profile set. Run your first scan now — every current public tender in your trade and area, scored and ranked. No Bark credits. No Checkatrade auction. Just real jobs."
- Removed "cadence and channels you explicitly enable" (corporate jargon)
- Named competitors explicitly (Bark, Checkatrade) as required by copy rules
- Fear → proof → control structure applied

### DashboardPage.tsx — Empty state body copy
**Before:** "Find a Tender is free and public. JobFilter helps you qualify what fits; it does not promise opportunity volume, awards or early access."
**After:** "Public tender notices are live right now. Most trades miss them — they don't have time to read the feed. JobFilter reads it for you, scores what fits your trade and patch, and tells you where your bid time belongs."
- Changed from process-description to fear→proof→control structure
- "Most trades miss them" creates urgency without false scarcity
- More specific about the value: reads, scores, tells you where bid time belongs

## Phase 4 — NEEDLE Site Health

### NEEDLE found top 3 issues:
1. **PricingPage** — "SCAN FREE BEFORE YOU PAY" section had no CTA button (dead end)
2. **FindJobsPage** — Jargon copy "submission context locked" at scan limit moment
3. **HomePage** — "Not ready yet?" opt-out invitation embedded in conversion CTA panel

### BUILDER fix (highest-impact: Issue 1 — PricingPage):
Added `SCAN FREE — NO CARD NEEDED →` link (jf-button, ink bg) after the coverage-before-commitment section body paragraph. Previously the section ended with no action; tradesman had nowhere to go.

### Also fixed Issue 2 and Issue 3:
- **FindJobsPage:** "Buyer and submission context locked. Scanning remains free." → "Free scans used — upgrade to see buyer, deadline and source link."
- **HomePage:** Removed `<p>Not ready yet?...</p>` and `<WaitlistForm>` from inside the yellow CTA panel. Moved `WaitlistForm` to a standalone section with its own heading: "NOT READY TO ACTIVATE? Get a heads-up when coverage improves in your area."

### CRITIC: YES — All 3 fixes read clearly in <3 seconds. Jargon removed. Action is obvious.
### REVENUE: YES — Removing the opt-out from the conversion panel and adding the PricingPage CTA directly increase likelihood of £39/month payment.

## Carried Items (not yet built)
- Founder decision — add-on service pricing (14 add-ons have no £ shown)
- Stripe live test — blocked on test keys in Vercel
- n8n workflow 16 — blocked on SMTP creds
- Vercel cron `0 * * * *` requires Pro plan — decision needed: downgrade to `0 6 * * *` or upgrade Vercel plan

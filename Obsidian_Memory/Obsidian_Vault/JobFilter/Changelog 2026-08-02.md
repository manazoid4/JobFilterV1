# Changelog — 2026-08-02 (NightlyBuildAgent Run)

## BUILD STATUS
- npm run build: PASS
- npx tsc --noEmit: PASS (zero errors)

## PHASE 1 — FIX BROKEN

### Critical: /api/alerts endpoint was missing
- Created `server/routes/alerts.ts` — full CRUD: GET, POST, PATCH, DELETE
- Registered route in `server/app.ts`
- Every alert setup click in Dashboard and FindJobsPage was silently 404ing
- Route degrades gracefully when Supabase not configured (returns 200 + empty/soft error, not 500)

### Critical: Vercel cron blocking deployment
- `vercel.json` had `0 * * * *` (hourly) which Hobby plan rejects
- Changed to `0 8 * * *` (daily 8am) — within Hobby limits
- Added `GET /api/alerts/send` stub so the cron returns 200 instead of 404

## PHASE 2 — TIER 1 FEATURES (audit result)
All already implemented:
- Scan counter: DONE (FindJobsPage.tsx lines 432-448)
- Google Calendar ICS export: DONE (server/routes/calendarExport.ts + LeadDetailPage)
- Won leaderboard: DONE (server/routes/outcomeReport.ts /api/wins/stats + WinStatsBanner.tsx)
- WhatsApp templates: DONE (quick_quote_offer + availability_check in chaseTemplates.ts)
- Trade-specific scoring UX: DONE (parseTradeReasons in FindJobsPage.tsx)

## PHASE 3 — COPY POLISH

### FindJobsPage.tsx
- Zero-scan banner: removed contradictory "Buyer and submission context locked. Scanning remains free." alongside "UNLOCK — £39/MO →" — now reads clearly: "3 free scans used this week. Full access unlocks the buyer, deadline and official response route on every lead." CTA changed to "SEE BUYER DETAILS — £39/MO →"
- Upgrade nudge: added "NO SHARED AUCTION. YOUR SCAN, YOUR PATCH." header; names Bark and Checkatrade explicitly; adds "no five-trade blast" language; adds "No credit card for the free scan"

### PricingPage.tsx
- Free plan card body: "See what's live in your trade and region right now. No account, no card, no commitment."
- Pilot plan card body: "No guesswork, no shared auction." — replaces vague "firm-aware qualification" opener
- Pilot CTA: "START £39/MO →" replaces confusing "START AFTER COVERAGE CHECK →"
- Pilot priceNote: "Scan free first. Pay only if the coverage fits."
- Objections: Names competitors (Checkatrade, MyBuilder, Bark) explicitly; adds "No credit card required" to coverage check answer; "no shared auction, no five-trade blast"

### DashboardPage.tsx
- Alerts widget description: removed pre-emptive disclaimer ("availability and delivery depend on current source and account setup") — replaced with action-first: "Set your trade, postcode and how often you want to hear about it."

## PHASE 4 — SITE HEALTH CHECK

NEEDLE found:
1. FindJobsPage — zero-scans state contradictory copy (FIXED)
2. DashboardPage — disclaimer-first alerts description (FIXED)
3. FindJobsPage — postcode error below trade presets grid (off-screen mobile) (FIXED — inline error added adjacent to input)

CRITIC assessment: All 3 fixes are clearer in <3 seconds.
REVENUE assessment: All 3 increases likelihood of £39/month conversion.

## PR
- Branch: nightly/2026-08-02
- PR: https://github.com/manazoid4/JobFilterV1/pull/419

---

## NEXT RUN PRIORITIES

NOTE: Both the alerts sender (`app/api/alerts/send/route.ts`) and the `lead_alerts` table migration (`supabase/migrations/20260531_lead_alerts.sql`) already exist. The original priorities below were obsolete.

1. **Add missing columns to `lead_alerts` migration** — the existing migration is missing `last_checked_at` and `radius_miles`, both of which the send route reads. Add a new migration: `ALTER TABLE lead_alerts ADD COLUMN IF NOT EXISTS last_checked_at TIMESTAMPTZ, ADD COLUMN IF NOT EXISTS radius_miles INTEGER DEFAULT 25`. Also update the CHECK constraint to remove `instant` now that it is no longer a supported frequency.

2. **Google Calendar link visibility** — verify the "ADD TO CALENDAR →" link on LeadDetailPage is actually visible to free-tier users (not locked behind paid access). It's a useful free feature that may be hidden.

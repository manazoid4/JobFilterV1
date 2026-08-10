# Changelog 2026-08-10

## NightlyBuildAgent Run

### Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (zero errors)

### Features Built

#### GET /api/wins/stats (new file)
`app/api/wins/stats/route.ts`
- Queries `lead_outcomes` Supabase table for wins within 90 days, filtered by postcode outward and area prefix
- Returns `{ ok, wonCount, totalValueFormatted, message }` — no PII
- Feeds the existing `WinStatsBanner` component on `FindJobsPage` (was returning null with no backend)

#### GET /api/leads/calendar.ics (new file)
`app/api/leads/calendar.ics/route.ts`
- Returns a `.ics` file from URL query params (leadId, jobType, postcode, area, score, urgency, details)
- Content-Disposition: attachment header for direct download
- Feeds the `CalendarCopyLink` component in `LeadDetailPage` (was linking to a 404)

### Copy Polish

#### PricingPage (`src/pages/PricingPage.tsx`)
- Micro-label: "FOUNDER-ASSISTED PILOT" → "PILOT ACCESS — £39/MO — NO CONTRACT"
- Plan card body: removed passive "activation follows coverage and delivery checks" hedge
- Plan card CTA: "START AFTER COVERAGE CHECK →" → "START PILOT — £39/MO →"
- Plan card priceNote: added "No contract — cancel anytime."
- Hero note: removed "Current results can be sparse or empty." (defeatist) → "No contract — cancel anytime. Check coverage against your trade and region before activating."
- Secondary CTA: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD NEEDED →"
- Q&A "Who is JobFilter for?": now names specific trades (electricians, builders, roofers, plumbers, HVAC)

#### HomePage (`src/pages/HomePage.tsx`)
- proofPoints updated to be specific: named CPV match, buyer/deadline evidence, "No credit card required"
- Hero sub-headline: added "No shared auction. No five-trade blast." positioning line

### Site Health Fix

#### FindJobsPage (`src/pages/FindJobsPage.tsx`)
- When free scans are exhausted: replaced jargon "Buyer and submission context locked. Scanning remains free." with plain English "Free previews used — subscribe at £39/mo to see who to call, the deadline, and the official bid route."
- CRITIC: passes (<3 second read) — YES
- REVENUE: names exact value unlocked at conversion moment — YES

### PR
https://github.com/manazoid4/JobFilterV1/pull/452

---

## Next Run Priorities

1. **Mobile unlock CTA placement** — On mobile, the "UNLOCK FULL LEAD" button appears before the locked Buyer/Deadline/Source URL fields rather than after them. Move it to appear directly after `LockedValue` rows for higher conversion at the intent moment.
2. **Duplicate trade selector UX** — Form has both a `<select>` dropdown and preset buttons for trade selection. Users who tap a preset without a postcode, get the error, then type a postcode and hit SCAN NOW, may scan the wrong trade. Consolidate to preset buttons only.
3. **WinStatsBanner seed data** — `data/outcomes.jsonl` doesn't exist and the Supabase `lead_outcomes` table may be empty in early days. Consider seeding anonymised aggregate wins data or showing the banner once any live outcome is recorded.

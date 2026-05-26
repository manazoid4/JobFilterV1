---
type: changelog
date: 2026-05-16
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-16

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 6 files changed (1 new server route, 5 page edits).

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| f6b4479 | `server/routes/calendarExport.ts`, `server/app.ts`, `src/pages/LeadDetailPage.tsx`, `src/pages/TrustCenterPage.tsx`, `src/pages/PricingPage.tsx`, `src/pages/FindJobsPage.tsx` | ICS server route + source naming fix + upgrade prompt + mobile CTA |

---

## Pre-flight Notes

- npm install required — node_modules not present in fresh container
- Build: GREEN after install
- TypeScript: CLEAN throughout

---

## Key Changes Detail

### server/routes/calendarExport.ts — NEW: GET /api/leads/calendar.ics (PHASE 2)

This was the one remaining unbuilt Tier 1 feature from the roadmap.

**Route:** `GET /api/leads/calendar.ics?jobType=...&postcode=...&area=...&score=...&urgency=...&details=...&leadId=...`

- Accepts query params (no DB required — lead data lives in localStorage on client)
- Returns valid RFC 5545 ICS file with VEVENT for next-day 9am reminder
- `Content-Type: text/calendar; charset=utf-8` + `Content-Disposition: attachment`
- Works with Google Calendar, Apple Calendar, Outlook
- Most valuable use: WhatsApp notification can include shareable calendar link

### server/app.ts — Register calendarExport route
- Import + `registerCalendarExportRoute(app)` added after stripe routes

### src/pages/LeadDetailPage.tsx — CalendarCopyLink component
- New `CalendarCopyLink` component added: builds the `/api/leads/calendar.ics?...` URL from the current lead object and copies it to clipboard
- "COPY CALENDAR LINK" button added alongside existing "ADD TO CALENDAR" download button in the FOLLOW-UP REMINDER section
- State: `copied` toggles to "LINK COPIED" for 2.5s confirmation
- Enables sharing the calendar event via WhatsApp/SMS by pasting the link

### src/pages/TrustCenterPage.tsx — Product rule violation fixed (CRITICAL)

**Problem:** `dataSources` array named specific government registers publicly:
- 'Planning applications and approvals'
- 'Energy Performance Certificates (EPC)'
- 'Land Registry property transactions'
- 'Companies House business registrations'

This violates the rule in `Problems and Solutions.md`: "Do not expose source names, source categories, URLs, registers, portals, or data-source mechanics in public copy."

**Fix:**
- `dataSources` array renamed to `verifiedSignals` — now describes signal TYPES from the trade's perspective, not the data source
- Examples: 'Planning approvals in your postcode cluster', 'Energy upgrade demand across your patch', 'Recent property ownership changes nearby'
- Section header: "DATA SOURCES" → "VERIFIED SIGNALS"
- Section subheading: removed "Open Government Licence" reference → "verified official UK sources"
- Legal note: removed OGL v3.0 citation → "We do not share which signals we monitor — that is how the filter stays private"
- HOW SCORING WORKS paragraph: "Planning approval date. Property sale timing. EPC rating." → "Approval timing. Sale recency. Energy demand."
- TRANSPARENCY NOTE: same fix — removed specific register names
- Anti-ghost step 03: "Planning dates. Sale timings. EPC ratings." → "Approval timing. Sale recency. Energy demand level."
- Hero: added competitor naming (Checkatrade/Bark/MyBuilder) + no-shared-auction promise

### src/pages/PricingPage.tsx — Competitor naming in hero (PHASE 3)

Added paragraph before the value prop:
> "Checkatrade charges £200+/mo and blasts the same lead to five other trades. Bark sells you a name and makes you fight for it. BuildAlert sends a postcode, not a plan. Here, Gold leads are controlled by trade, patch, and timing — no shared auction, no five-trade blast."

Rule applied: name competitors explicitly (Checkatrade, MyBuilder, Bark, BuildAlert, Planning Pipe).

### src/pages/FindJobsPage.tsx — Empty scan state + mobile lead CTA (PHASE 4)

**Empty scan state upgrade prompt (HIGH priority from to-do):**
Previously: WIDEN RADIUS buttons appeared immediately after the stats. The "GET WHATSAPP ALERTS" link was buried as the 3rd button.

Now:
- Navy-bordered upgrade panel appears FIRST: "Pro users get WhatsApp alerts the moment a matching signal appears in their patch — no need to re-scan manually." + "GET WHATSAPP ALERTS — FROM £39/MO" CTA
- WIDEN RADIUS buttons appear BELOW (now 2-wide grid, not 3-wide)
- Result: tradesman who scans and finds nothing sees the paid path BEFORE the free-tier workarounds

**CRITIC:** Clearer in <3 seconds? YES — upgrade prompt is now the first thing after "no results"
**REVENUE:** Increases £39/mo conversion? YES — path to paid appears before frustration sets in

**Mobile lead card CTA (MEDIUM priority from to-do):**
Previously: UNLOCK FULL LEAD button was at the bottom of the lead card (third section in the grid). On mobile, the user had to scroll past the title, stats grid, and reason badges to find the CTA.

Now:
- Inline CTA added within the main content div after the reason badges: `<Link to="/pricing" className="... lg:hidden">UNLOCK FULL LEAD</Link>`
- Only shows on `< lg` screens (hidden on lg where the right panel sidebar is visible)
- Only shows when `!OPEN_ACCESS` (not in dev mode)
- Right panel (Buyer/Deadline/Source URL + UNLOCK button) unchanged — still present for OPEN_ACCESS mode and lg screens

---

## PHASE 4 — Site Health Check

**NEEDLE findings this session:**
1. TrustCenterPage named government registers publicly (CRITICAL rule violation) → FIXED ✅
2. Empty scan state buried upgrade path below WIDEN RADIUS buttons (HIGH) → FIXED ✅
3. Mobile lead card: UNLOCK CTA buried at bottom, invisible without scrolling (MEDIUM) → FIXED ✅

**CRITIC:** Empty scan upgrade prompt clearer in <3 seconds? YES
**REVENUE:** Increases £39/mo conversion likelihood? YES — tradesman sees paid path before free workarounds

---

## Build Status
- `npm run build`: ✅ PASS (3.70s)
- `npx tsc --noEmit`: ✅ CLEAN (0 errors)

## Roadmap Updates
- Google Calendar ICS server route: BUILT ✅ (completes the Tier 1 feature)

---

## Related
- [[Changelog 2026-05-15]]
- [[Feature Roadmap - 8th May 2026]]
- [[Recent]]

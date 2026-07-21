# JobFilter Daily To-Do

_Last updated: 2026-07-21 by NightlyBuildAgent (P2 fixes applied, commit 019ff44)_

---

## COMPLETED THIS RUN (2026-07-21) — including P2 Codex fixes

- [x] Trade-specific scoring UX — `TRADE_KEYWORD_LABELS` map, 80+ entries, 8 trades wired through `LeadResultCard`
- [x] PricingPage copy — hero headline, plan bullets, competitor callout in Q&A, trust signal below CTA
- [x] HomePage copy — proof points rewritten, competitor named, "no credit card required" added
- [x] Inline paywall trust text — changed from invisible `text-white/50` to yellow full-opacity
- [x] Founder plan CTA trust signal — 30-day money-back added directly below buy button
- [x] Codex P1 — softened plan bullet + restored pilot qualifier (PricingPage)
- [x] Codex P2 — neutral rewire label + teaser branch label lookup (FindJobsPage)

---

## ALL TIER 1 FEATURES — COMPLETE

- [x] Scan counter (3 free scans UI with reset Monday)
- [x] Google Calendar ICS export (`/api/leads/calendar.ics`)
- [x] Won leaderboard (`WinStatsBanner` + `/api/wins/stats`)
- [x] WhatsApp templates (quick_quote_offer + availability_check already in chaseTemplates.ts)
- [x] Trade-specific scoring UX (THIS RUN)

---

## NEXT RUN — TOP 3 PRIORITIES

### 1. Mobile: trade preset silent failure (MEDIUM — quick fix)
**What:** Tapping a trade preset without a postcode scrolls up but shows the error message below the preset grid — off-screen on mobile. User sees nothing happen.
**Fix:** Move the `postcodeRequired` error div (FindJobsPage.tsx ~line 554) to render ABOVE the preset grid, not below. Also add a brief red shake animation to the postcode field.
**File:** `src/pages/FindJobsPage.tsx` ~line 523-558

### 2. Leads Page — trade-specific empty state copy (LOW — copy only)
**What:** When scan returns 0 results, the empty state (`EmptyScanReport`) uses generic copy regardless of trade.
**Fix:** Show trade-specific empty state copy. Electrician: "No rewires or EV charger approvals near you this week." Plumber: "No boiler jobs or planning approvals near you this week."
**File:** Look for `EmptyScanReport` in FindJobsPage.tsx

### 3. LeadDetailPage — ADD TO CALENDAR needs trade-specific ICS summary (LOW)
**What:** The calendar export currently generates a generic summary "Follow up: {jobType} – {postcode}". Should be more specific when trade is known.
**File:** `server/routes/calendarExport.ts` + `src/pages/LeadDetailPage.tsx`

---

## BACKLOG (from prior runs)

- [ ] WinStatsBanner — only shows when `wonCount > 0` from Supabase; needs seed data or demo mode for first-time visitors
- [ ] LeadDetailPage — confirm "ADD TO CALENDAR" button links to `/api/leads/calendar.ics` and passes correct params
- [ ] Duplicate upgrade CTA on FindJobsPage — the yellow upgrade section (lines 766-781) is redundant with inline paywall; consider removing
- [ ] Pricing page — "WHAT ONE MONTH LOOKS LIKE" examples could show trade-specific examples (show roofer examples to someone who searched roofing)

---

## DO NOT TOUCH

- Blog / new pages (21 is enough)
- Homeowner contact enrichment (GDPR)
- Rightmove/Zoopla sources
- GOLD/SILVER/BRONZE scoring labels
- Route paths (unless broken)

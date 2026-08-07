# Daily To-Do

## 2026-08-07 — NightlyBuildAgent

### Completed
- [x] Build health check — npm install + build pass
- [x] TypeScript clean pass
- [x] Trade-specific scoring UX — 60-keyword label map, trade-friendly badge labels
- [x] FindJobsPage copy — no-scan empty state, competitor callouts (Checkatrade/MyBuilder/Bark)
- [x] PricingPage copy — competitor comparison section, FAQ sharpening, clearer CTAs
- [x] TopNav CTA jargon fix — "CHECK FTS FREE" → "SCAN FREE — NO CARD" on desktop and mobile
- [x] PR #447 opened and pushed to nightly/2026-08-07

### Already Built (confirmed in codebase)
- Scan counter (weeklyScansRemaining shown in FindJobsPage) — DONE
- Google Calendar ICS export (`/api/leads/calendar.ics` + CalendarCopyLink component) — DONE
- Won leaderboard (`/api/wins/stats` in outcomeReport.ts + WinStatsBanner component) — DONE
- WhatsApp templates (quick_quote_offer + availability_check in chaseTemplates.ts) — DONE

## Next Run Priorities

1. **Trade-specific lead card description** — The "whyThisIsAJob" field on lead cards could be enriched with trade-specific language. Currently it's generic. Add a post-processing step that injects trade context into the explanation (e.g. "EPC shows this property needs rewiring — strong fit for electricians").

2. **Share/referral mechanic on WinStatsBanner** — When a tradesperson sees "3 trades near B14 won £12,400 via JobFilter", add a one-click share link so they can forward to a mate. This is a growth loop.

3. **LeadDetailPage calendar link prominence** — The ADD TO CALENDAR button exists but is buried. Surface it higher on the card, possibly as the second CTA after "TRACK THIS LEAD".

4. **Mobile card layout audit** — Lead cards at <375px may have badge overflow. Run a mobile scan to verify the trade badge chips don't wrap badly on small screens.

5. **Footer competitor links** — The /vs/checkatrade, /vs/mybuilder pages exist but aren't linked from Footer or PricingPage. Add "vs Competitors" section to footer.

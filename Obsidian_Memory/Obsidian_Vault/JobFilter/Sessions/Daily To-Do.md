# Daily To-Do

Last updated: 2026-08-02 (NightlyBuildAgent run)

## Completed This Run ✓ (including context-continuation fixes)
- [x] Trade-specific scoring UX — TRADE_KEYWORDS map + extractTopJobTypes(leads, trade)
- [x] FindJobsPage pre-scan copy — fear→proof→control structure
- [x] FindJobsPage trade preset label — conditional based on postcode presence
- [x] PricingPage hero rewrite — "STOP WASTING DAYS ON BIDS YOU CANNOT WIN"
- [x] PricingPage CTA fix — removed "START AFTER COVERAGE CHECK →" backward label
- [x] HomePage — removed waitlist from conversion panel
- [x] vercel.json — fixed hourly cron → daily (Vercel Hobby plan compliance)
- [x] Codex P1 resolved — instant-alert labels updated: "HOURLY SOURCE CHECK" → "DAILY PRIORITY CHECK"; POST message updated; replied to Codex thread
- [x] Codex P2 ×2 resolved — both outdated (fixed in earlier commit: scan-feed accuracy + free-tier copy)

## Previously Built (No Action Needed)
- [x] Scan counter — localStorage, resets Monday midnight
- [x] Google Calendar ICS export — /api/leads/calendar.ics + client-side download
- [x] Won leaderboard — WinStatsBanner + /api/wins/stats (reads Supabase lead_outcomes)
- [x] WhatsApp templates — quick_quote_offer + availability_check in chaseTemplates.ts

## Next Run — Top 3 Priorities
1. **Win tracking: connect localStorage wins to Supabase** — markWon() in winStore.ts only saves to localStorage, so WinStatsBanner never shows. Wire it to POST /api/leads/outcome with status:'won' so wins appear in the aggregate stats.
2. **LeadDetailPage: surface the ADD TO CALENDAR button more prominently** — the downloadIcs() function exists and works, but the button is buried below the fold. Move it to the action bar alongside Track and WhatsApp.
3. **LeadListPage copy** — review the empty-state copy and the upgrade nudge; apply fear→proof→control; check that "No credit card required" appears near free CTAs.

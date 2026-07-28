# Daily To-Do — JobFilter

## Completed ✓

- [x] Scan counter (localStorage, weekly reset, resets Monday midnight) — BUILT
- [x] Google Calendar ICS export backend + ADD TO CALENDAR link on LeadDetailPage — BUILT
- [x] WinStatsBanner component + /api/wins/stats endpoint — BUILT
- [x] WhatsApp templates: quick_quote_offer + availability_check — BUILT (in chaseTemplates.ts)
- [x] Trade-specific scoring UX (parseTradeReasons shows EV charger / rewire for electrician etc) — BUILT
- [x] Copy polish: FindJobsPage scan limit jargon → plain English — DONE 2026-07-28
- [x] Copy polish: pre-scan empty state h2 → tradesman-first language — DONE 2026-07-28
- [x] Copy polish: upgrade nudge body → competitor fear + proof — DONE 2026-07-28
- [x] Fix Pricing CTA contradiction ("START AFTER COVERAGE CHECK" vs "START £39/MO") — DONE 2026-07-28
- [x] Fix Vercel cron (hourly → daily) to unblock deployment — DONE 2026-07-28

## In Progress

- [ ] PR #402 waiting for CI green + merge

## Next Run — Top 3 Priorities

1. **LeadListPage / Dashboard conflict** (NEEDLE issue #3): The Lead Tracker (GOLD/SILVER/BRONZE, WhatsApp chase) and the FTS qualification tool (BID/WATCH/SKIP) are surfaced through the same nav. A plumber cannot tell if they are chasing a homeowner or a public contract. Needs a clear separation or unified flow explanation.

2. **Pricing page "pilot" language**: The word "pilot" appears throughout PricingPage and implies you can't start immediately. Either rename to "Starter" or add a clear activation timeline so contractors know what happens after they pay.

3. **WinStatsBanner needs real data**: The banner only shows when `data.ok && data.wonCount > 0`. With no wins logged yet in Supabase, the banner never shows. Either seed some anonymised data or add a "be the first in your area" state that shows even with 0 wins.

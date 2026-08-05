# Daily To-Do

## 2026-08-05 (NightlyBuildAgent)

### Completed Today ✅
- [x] Build passing (npm run build + tsc --noEmit clean)
- [x] Trade-specific scoring UX: visible badge below score showing matched job type (EV charger install, boiler replacement, etc.)
- [x] Paywall placement fix: moved from mid-list to after all leads with gold count summary
- [x] Copy: zero-scans message names Checkatrade explicitly
- [x] Copy: PricingPage competitor comparison section (Checkatrade, MyBuilder, Bark, Planning Pipe)
- [x] PR #436 opened and Vercel preview deployed

### Confirmed Already Built ✅
- [x] Scan counter (localStorage-based, resets Monday midnight, only shows for free tier)
- [x] Google Calendar ICS export (/api/leads/calendar.ics + LeadDetailPage button)
- [x] Won leaderboard (WinStatsBanner + /api/wins/stats endpoint)
- [x] WhatsApp templates: quick_quote_offer + availability_check (in chaseTemplates.ts)

### Next Run Priorities 🔜
1. **Audience alignment (PricingPage/FindJobsPage)**: The NEEDLE agent flagged that the scanner targets sole-trader electricians/plumbers but PricingPage says "5-25 person contractors for public works." These should either be reconciled or the pages should have trade-specific copy paths.
2. **Duplicate scan triggers on mobile**: Two scan paths exist (form submit button + 8 trade chip buttons). Trade chips should only update the trade dropdown, not trigger a scan — a mobile user who taps a chip before entering a postcode gets an error. Consider making chips update-only with one clear SCAN NOW button.
3. **Won leaderboard data**: WinStatsBanner works but needs real won data in Supabase to show. Consider seeding a few example wins or making the banner show a "Be the first in your area" CTA more prominently when empty.
4. **WhatsApp templates UX**: Verify templates are surfaced in LeadDetailPage with clear channel labels (WhatsApp vs Email vs Portal vs Canvass vs Letter).

### Blocked / Not Doing ❌
- No blog, no new pages
- No homeowner contact enrichment (GDPR risk)
- No Rightmove/Zoopla
- No change to GOLD/SILVER/BRONZE scoring labels

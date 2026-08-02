# Daily To-Do — JobFilter

## 2026-08-02 — NightlyBuildAgent

### Completed This Run
- [x] Build passes clean — npm run build ✓
- [x] TypeScript clean — npx tsc --noEmit ✓
- [x] Trade-specific scoring UX — parseTradeReasons now trade-aware with title extraction
- [x] FindJobsPage copy polish — pre-scan empty state, scan limit copy, trade preset label
- [x] PricingPage copy polish — bullets, FAQ, CTA labels, competitor callout
- [x] DashboardPage NEEDLE fix — header rewritten to tradesman language
- [x] PR #422 created and watching: https://github.com/manazoid4/JobFilterV1/pull/422

### Fixed This Run (Follow-up)
- [x] Vercel cron schedule — changed from `0 * * * *` (hourly, Hobby plan reject) to `0 9 * * *` (daily 09:00 UTC). Committed f845fd4. Vercel now building successfully. Upgrade to Pro restores hourly if needed.

### Next Run Priorities
1. **Merge PR #422** if CI passes — review and merge
2. **Google Calendar ICS link visible test** — verify ADD TO CALENDAR button renders on LeadDetailPage for a real lead
3. **WinStatsBanner data** — the component is wired but needs real outcome data in Supabase to show. Consider seeding anonymised sample wins to verify the banner triggers.
4. **Mobile audit** — check FindJobsPage trade preset grid on 375px screen (grid-cols-2 may cause overflow with longer trade labels)
5. ~~**Vercel cron decision**~~ — fixed: changed to `0 9 * * *` daily. Upgrade to Pro if hourly alerts needed.
6. **FaqPage competitor copy** — add Checkatrade/MyBuilder/Bark to FAQ with specific price callouts
7. **WhatsApp templates display** — verify QuickResponseKit shows quick_quote_offer and availability_check templates in the UI and they're selectable

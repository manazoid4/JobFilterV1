# Daily To-Do

## Done (2026-07-30)
- [x] Fixed `vercel.json` cron: hourly → daily (was blocking all Vercel PR deployments)
- [x] PricingPage copy: unified CTA labels to "ACTIVATE PILOT — £39/MO →", removed confusing "AFTER COVERAGE CHECK" wording
- [x] PricingPage copy: "No credit card required" now visible directly below featured plan CTA
- [x] FindJobsPage: exhausted-scan message now shows specific upgrade value instead of generic "locked" copy
- [x] Confirmed all Tier 1 features are built (scan counter, calendar export, won leaderboard, WhatsApp templates, trade-specific scoring)

## Next Run — Priority Order

1. **Check /api/alerts/send exists** — the vercel.json cron hits this path. Confirm the route is registered in server/app.ts; if not, it's a silent cron failure.
2. **Competitor comparison on PricingPage** — copy rules say name Checkatrade, MyBuilder, Bark, BuildAlert explicitly. Add a "Why not X?" FAQ entry to the objections section.
3. **Trade-specific scoring reasons** — `parseTradeReasons` is generic. Electricians should see EV charger / rewire / EICR specifically; plumbers see boiler / bathroom. Improve the keyword extraction to be trade-aware.
4. **LeadDetailPage audit** — confirm the ADD TO CALENDAR link works end-to-end (queries correct params from lead object)
5. **WinStatsBanner test** — banner only shows if `data.wonCount > 0`. With no real win data, it silently hides. Check if the Supabase `lead_outcomes` table has any data; if not, the banner never shows for new users.

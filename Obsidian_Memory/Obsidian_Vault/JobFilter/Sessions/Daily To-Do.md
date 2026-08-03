# Daily To-Do

## 2026-08-03 — NightlyBuildAgent

### Completed this run
- [x] Trade-specific scoring UX — lead cards show "EV CHARGER — YOUR TRADE" etc.
- [x] Copy polish — scan-exhausted message plain language fix
- [x] Copy polish — upgrade nudge names competitors (Checkatrade, Bark)
- [x] Copy polish — "SCAN FREE — NO CARD →" on first-visit CTA
- [x] Vercel cron bug fixed — hourly → daily (Hobby account limit)
- [x] P1 fix — removed `instant` alert frequency from all layers (DashboardPage, alerts API, send cron, regression test)
- [x] P2 fix — CRON_BUFFER_MS (30 min) prevents daily alerts skipping due to sub-24h elapsed time
- [x] P2 fix — legacy `instant` DB rows aliased to daily cadence (not silently dropped to weekly)
- [x] P2 fix — `scannedTrade` state prevents trade-badge relabeling on dropdown change after scan
- [x] P2 fix — `scannedTrade` set atomically with `setResult` to handle concurrent Recent Scans clicks
- [x] P2 fix — negative-keyword guard prevents scorer-rejected keywords appearing as "YOUR TRADE" badges
- [x] P2 fix — frequency validation error message generated from `VALID_FREQUENCIES` (no stale `instant` mention)
- [x] P2 fix — `dailyCombos` dedup prevents duplicate daily emails when user has both instant + daily rows
- [x] P2 fix — `dailyCombos` key includes `radius_miles` so different-radius rows are not incorrectly deduplicated
- [x] P2 fix — email upgrade CTA updated from "instant/daily alerts" → "daily alerts"

### Next run priorities
1. **Wins leaderboard data** — WinStatsBanner component and API both exist but need real outcome data flowing (outcomes.jsonl or Supabase). Consider seeding test data to verify the banner actually shows for UK postcode areas.
2. **Trade-specific scoring: extend to LeadDetailPage** — `parseTradeReasons` improvement applies to FindJobsPage cards only. LeadDetailPage has its own scoring display; apply the same TRADE_TITLE_KEYWORDS fallback there.
3. **PricingPage competitor section** — Add an explicit "Why not Checkatrade/MyBuilder/Bark?" FAQ entry; those are domestic marketplaces while JobFilter targets public tenders — clearer differentiation increases conversion.
4. **Cron alert endpoint audit** — `/api/alerts/send` now runs once daily (7am UTC). Verify the endpoint handles a daily cadence properly (deduplication, last-sent tracking) and doesn't re-alert the same user for the same lead.
5. **Google Calendar ICS — verify in LeadDetailPage** — ICS export exists both client-side and via `/api/leads/calendar.ics`. Confirm the "ADD TO CALENDAR →" button is visible and working for pro users on the LeadDetailPage.

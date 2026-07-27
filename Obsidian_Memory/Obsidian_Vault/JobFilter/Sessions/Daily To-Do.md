# Daily To-Do — JobFilter

## 2026-07-27 (NightlyBuildAgent)

### Completed this run
- [x] Fix SignupPage misleading copy ("Gold leads coming through from day one" → accurate scan description)
- [x] Make WhatsApp field optional on SignupPage (was blocking form completion)
- [x] Standardise PricingPage CTA labels (3 buttons now all say "START £39/MO →")
- [x] Add trade-specific score tag fallback on FindJobsPage lead cards (TRADE_TITLE_KEYWORDS map)
- [x] Fix Vercel Hobby plan cron error (hourly → daily schedule in vercel.json)
- [x] Verified build passes + TypeScript clean

### For next run (priority order)
- [ ] Gate `SHOW_ADVANCED_TOOLS = true` behind `unlimitedTester` check so paid users see Document Search
- [ ] Verify `/api/alerts/send` deduplication — daily cron could re-send the same tender if not deduplicated
- [ ] FTS result quality audit: scan as electrician (B14) and as plumber (M20) — verify CPV trade codes are returning relevant tenders
- [ ] Add "No credit card required" text next to the Free Scan CTA on PricingPage hero
- [ ] DashboardPage: "YOUR OPPORTUNITIES. YOUR DECISIONS." header — add a quick stat bar below showing scans this week / decisions made / outcomes tracked
- [ ] Check LeadListPage for broken or empty state copy

### Known intentionally disabled features (do NOT enable without review)
- `SHOW_ADVANCED_TOOLS = false` — Document Search + scan mode toggles; adapters not all verified
- `SHOW_FILL_MY_WEEK = false` — experimental batch scan; procurement dates don't prove start dates
- `DEV_MODE = false` — keep off in production

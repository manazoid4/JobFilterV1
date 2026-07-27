# Daily To-Do

## 2026-07-27

### COMPLETED ✅
- [x] Fix PricingPage contradictory CTA labels (START AFTER COVERAGE CHECK → consistent START PILOT — £39/MO →)
- [x] Fix FindJobsPage scan-limit zero-state copy (plain English, no "submission context" jargon)
- [x] Fix LeadDetailPage domestic trade language on public tender leads (source-aware urgency blocks)
- [x] Fix vercel.json hourly cron → daily (Hobby plan compatibility, was blocking all PR deploys)

### OPEN — NEXT RUN 🔲
- [ ] Trade-specific scoring UX: electrician sees CPV/EV charger/rewire-relevant reasons, plumber sees M&E/heating/bathroom-relevant reasons on lead cards
- [ ] Compare pages copy audit: /vs/checkatrade, /vs/bark, /vs/mybuilder — still reference homeowner-review model. Update to reflect B2B FTS positioning.
- [ ] Verify /api/alerts/send endpoint is functional (now cron is daily — confirm the route exists in server/routes/)
- [ ] Check if WinStatsBanner is showing correctly on FindJobsPage (requires data in lead_outcomes table)

### DISCOVERED THIS RUN 🔍
- vercel.json had hourly cron (`0 * * * *`) — Hobby accounts only support daily. Was silently blocking all PR deployments.
- LeadDetailPage uses `lead.decision` field to distinguish public tender from domestic lead — reliable proxy for FTS source.
- All Tier 1 features from the roadmap appear already built (scan counter, calendar ICS, wins banner, WhatsApp templates, trade scoring). Focus has shifted to copy quality and conversion polish.

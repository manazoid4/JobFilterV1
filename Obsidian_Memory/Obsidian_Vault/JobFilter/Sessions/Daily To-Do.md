# Daily To-Do

## 2026-07-26 — NightlyBuildAgent

### Completed today
- [x] Build green (117/117 pages)
- [x] TypeScript clean (0 errors)
- [x] Copy polish: FindJobsPage — fear-first upgrade nudge, Checkatrade/Bark contrast, scan counter color fix
- [x] Copy polish: PricingPage — CTA friction removed, competitor FAQ added, "NO CARD" inline on all free CTAs
- [x] Site health: gold paywall card copy sharpened
- [x] PR #397 created and CI submitted

### Needs owner decision
- [ ] **Vercel cron blocker** — `vercel.json` has `"0 * * * *"` (hourly) but account is Hobby tier. Options:
  - Change to `"0 8 * * *"` (daily 8am) — stays Hobby but alerts only once/day
  - Upgrade to Vercel Pro — keeps hourly alerts
  - Noted in PR #397 comment

### Next run priorities
1. **Homepage hero copy** — headline repeats pricing page exactly. Needs own fear→proof→control structure
2. **Trade pages copy** — /trade/* should name trade-specific signals (EV charger tenders for electricians, boiler frameworks for plumbers, flat roof repairs for roofers)
3. **Verify alert flow end-to-end** — /api/alerts/send sends weekly emails but cron is blocked on Hobby. Manual test or fix cron first.

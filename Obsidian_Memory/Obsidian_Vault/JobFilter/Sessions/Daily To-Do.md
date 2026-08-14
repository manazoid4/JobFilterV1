# Daily To-Do — JobFilter

## 2026-08-14 (NightlyBuildAgent Run)

### Completed ✅
- [x] Trade-specific scoring UX — lead card badges now show trade-relevant labels (EV CHARGER FIT, BOILER WORK, FLAT ROOF, etc.) when generic fallback would have shown "Verified signal"
- [x] Stats bar extended to 4 columns: MATCHES / GOLD / SILVER / CONTRACTS
- [x] Copy polish on FindJobsPage: scanner label, h1, empty state headline + body
- [x] Build clean (npm run build + tsc --noEmit both pass)

### Next Run Priorities

1. **Pricing page copy rewrite** — currently written for 5-25 person commercial contractors. Needs tradesman-first language: fear→proof→control, name Checkatrade/MyBuilder/Bark as alternatives, explicit "No credit card required" on free CTA.

2. **LeadDetailPage mobile UX** — test that the bottom ActionBar (CALL / IGNORE / SAVE) clears the system navigation bar on iOS/Android. May need `pb-safe` or similar.

3. **Trade scoring — server side** — ensure the scoring engine passes enough trade-specific reasons even on free-tier (non-Gold) leads so the client-side fallback is less needed. Audit what `parseTradeReasons` receives from API for a Bronze lead.

4. **Competitor pages** — /vs/checkatrade, /vs/mybuilder, /vs/bark exist. Check they use strong comparative copy and explicit CTAs.

5. **Alert quick-setup** — currently requires sign-in. Consider allowing email capture without full sign-in for alert setup (reduces friction for free-tier users).

# Daily To-Do

## 2026-08-06 (NightlyBuildAgent run)

### Completed ✓
- [x] Build passing clean (120 pages, no errors)
- [x] TypeScript clean (0 errors)
- [x] Trade-specific scoring UX — TRADE_LABEL_MAP added to FindJobsPage
- [x] Pricing page copy — tradesman-first, competitors named, CTAs consistent
- [x] Scan-exhaustion copy fixed — jargon removed
- [x] PR #442 created and Vercel CI green (DEPLOYED)
- [x] Vault changelog written

### Pending / Next Run
- [ ] Merge PR #442 (waiting on required status check "check")
- [ ] Expand TRADE_LABEL_MAP with FTS/commercial tender keywords (RESPONSIVE REPAIRS, ESTATE MAINTENANCE, etc.)
- [ ] WinStatsBanner: auto-fill postcode from last scan result rather than requiring manual entry
- [ ] Pricing page social proof row: "X tradespeople scanned this week in [region]"
- [ ] LeadDetailPage: verify ADD TO CALENDAR link works end-to-end in production
- [ ] Consider score reason display for bronze leads (currently shows "Verified signal" fallback — could be more specific)
- [ ] Alert quick-setup: test that /api/alerts endpoint returns ok:true for authenticated users

### Deferred (not this run)
- WinStatsBanner reads from Supabase — needs real outcome data to show anything meaningful
- Google Calendar ICS: backend + frontend both exist, no changes needed
- WhatsApp templates: quick_quote_offer + availability_check already shipped

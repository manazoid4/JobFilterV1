# Daily To-Do

## 2026-08-21

### Completed
- [x] Build verified green (npm run build + tsc --noEmit)
- [x] Copy polish: PricingPage CTAs and plan bullets
- [x] Copy polish: HomePage proof points and hero sub-copy
- [x] Copy polish: FindJobsPage scan-exhausted banner message
- [x] Site health fix: homepage proof points (NEEDLE → BUILDER → CRITIC/REVENUE pass)
- [x] PR #494 created: https://github.com/manazoid4/JobFilterV1/pull/494

### Pre-flight findings (all already built — no Tier 1 work needed)
- Scan counter: live in FindJobsPage with localStorage + Monday reset
- ICS calendar export: live in LeadDetailPage
- WinStatsBanner: live with /api/wins/stats endpoint
- WhatsApp templates quick_quote_offer + availability_check: live in chaseTemplates.ts
- Trade-specific scoring UX (parseTradeReasons): live, shows "EV CHARGER — YOUR TRADE" etc.

## Next Run Priorities

1. **Compare pages consistency audit** — CompareCheckatradePage references "territory-routed" and "GOLD/SILVER/BRONZE" from the old domestic product model. The current product is FTS/public-tender qualified. Need to audit all 6 compare pages (bark, buildalert, checkatrade, mybuilder, rated-people, trustatrader) to check whether the comparison table rows still match the actual product.

2. **Pricing page "Pilot" body text** — Still says "Pilot access follows a coverage and fit check; delivery features activate only when..." — this is overly qualified/lawyerly. Consider a single concrete sentence about what you get.

3. **FindJobsPage empty-state UX** — When a scan returns no results, the empty state needs to be more useful: show what to try next (different trade, wider radius, or explain that FTS coverage varies by region/timing). Currently unclear if empty means "no match" or "scan failed".

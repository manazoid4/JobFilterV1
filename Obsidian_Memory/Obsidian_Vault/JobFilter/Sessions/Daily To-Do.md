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

1. **Wire paid subscription entitlement** (Codex P1 — pre-existing architectural gap): `FindJobsPage.submit` sends `/api/leads/search` with no bearer token, so `resolveAccessContext` always returns free preview for paying users too. `LeadResultCard` unlocks via `isOwnerEmail` only. Need to: (a) send auth token in search request, (b) check paid tier in `resolveAccessContext`, (c) pass that through to `cardOpenAccess` in `LeadResultCard`. This is the core monetisation unlock.

2. **Enforce three-scan limit server-side** (Codex P2 — pre-existing): Client localStorage counter is cosmetic — the server applies a rate limiter (20 req/min) but no weekly quota for anon users. Fix: add an IP-keyed weekly counter (resets Monday midnight) in the search route, return 429 with `scansExhausted: true` after scan 3 for unauthenticated requests.

3. **Compare pages consistency audit** — CompareCheckatradePage references "territory-routed" and "GOLD/SILVER/BRONZE" from the old domestic product model. Current product is FTS/public-tender qualified. Audit all 6 compare pages (bark, buildalert, checkatrade, mybuilder, rated-people, trustatrader) for accuracy.

4. **FindJobsPage empty-state UX** — When a scan returns no results, show what to try next (different trade, wider radius, explain FTS coverage varies by region/timing). Currently ambiguous whether empty = no match or scan failed.

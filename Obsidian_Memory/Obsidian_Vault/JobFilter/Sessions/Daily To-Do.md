# Daily To-Do

## Last updated: 2026-07-27 NightlyBuildAgent Run (continuation — Codex fixes)

---

## COMPLETED THIS RUN ✅

- [x] Fix WhatsApp "SEND TO WHATSAPP" fake flow — now calls /api/leads/whatsapp (real route) and only marks sent on success
- [x] Fix Vercel cron: hourly `0 * * * *` → daily `0 8 * * *` (Hobby plan limit)
- [x] PricingPage: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD NEEDED →" (2 CTAs)
- [x] PricingPage: FAQ answers sharpened with competitor names + plain language
- [x] FindJobsPage: Pre-scan prompt sharpened (fear → proof → control)
- [x] FindJobsPage: Remove ambiguous "SCAN BUILDING WORK" second button
- [x] FindJobsPage: EmptyScanReport "Alert delivery available only after..." → tradesman-first copy
- [x] PR #398 created and pushed
- [x] Vault changelog written
- [x] Codex P1: WhatsApp double-click guard — `whatsappPending` state disables button during in-flight fetch
- [x] Codex P2: WhatsApp error parsing — 401/409 → "Add your WhatsApp number in Account"; body.error otherwise
- [x] Codex P1: EmptyScanReport FTS outage copy — checks `result.sources['fts'].failed`, shows "Data source temporarily unavailable" instead of claiming nothing was published
- [x] Codex P2: EmptyScanReport alert CTA — replaced `/pricing` Link with `AlertQuickSetup` component (posts to `/api/alerts`)
- [x] Build and `npx tsc --noEmit` clean after Codex fixes
- [x] Pushed commit `4c2c286` to `nightly/2026-07-27-fixes`

---

## TIER 1 FEATURES — STATUS

- [x] Scan counter — BUILT (FindJobsPage lines 33-76, 432-448)
- [x] Google Calendar ICS export — BUILT (LeadDetailPage + server/routes/calendarExport.ts)
- [x] WinStatsBanner — BUILT (component exists, /api/wins/stats exists, rendered on FindJobsPage)
- [x] WhatsApp templates (quick_quote_offer + availability_check) — BUILT (chaseTemplates.ts)
- [x] WhatsApp delivery route — BUILT (app/api/leads/whatsapp/route.ts) — FIXED this run to wire FindJobsPage to it

---

## NEXT RUN PRIORITIES

1. **Trade-specific scoring UX** — electrician should see EV charger / rewire reasons, plumber should see boiler / bathroom. The `parseTradeReasons` function in FindJobsPage already extracts trade-match keywords but doesn't apply trade-specific display rules. Add a trade→keyword map so scoring reasons on lead cards show the most relevant job types for that trade prominently.

2. **WhatsApp opt-in flow in Account page** — the /api/leads/whatsapp route checks `whatsapp_opt_in_at` from the profiles table, but there's no UI for the user to set their phone and consent. Check if Account page has a WhatsApp number field and opt-in checkbox; if not, add them so the newly-fixed WhatsApp button can actually work for users.

3. **Pricing page plan bullets** — `planBullets` array is still generic. Replace with concrete, trade-specific benefits: "See which tender notices match your CPV trade codes", "Buyer name and official submission URL for every Gold lead", "SKIP recommendations stop you wasting days on unwinnable bids".

---

## KNOWN ISSUES TO WATCH

- CI "check" job: was in_progress at time of this vault write. Monitor for pass/fail.
- Vercel deployment was building at time of write (after cron fix). If it fails again, check deployment logs.
- data/outcomes.jsonl approach (for WinStatsBanner) was replaced with Supabase lead_outcomes table — ensure WinStatsBanner /api/wins/stats is returning real data from Supabase.

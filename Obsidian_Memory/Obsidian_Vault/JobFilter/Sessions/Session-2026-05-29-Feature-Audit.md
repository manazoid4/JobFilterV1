# Session 2026-05-29 — Broken Features Audit

## Scope
Non-auth, non-Stripe audit. Other agents own Supabase session and Stripe checkout.

## Top 3 Fixes
1. **Planning locality** — `leadEngine/fetchers/planningDataFetcher.ts`. Postcode text search was matching unrelated records that only mentioned the outward in a reference number. Now requires the address to contain a UK postcode or the outward as a word. Geo lookups (lat/lon) still trusted as inherently local. `rawLocation` no longer falls back to bare outward on text-search results.
2. **Delivery lock key** — `server/services/sms.ts`. Key was using full postcode lowercased, so `B14 7AB` and `B14` would not collide. Now normalises via `getOutward()` to match the `trade + postcodeOutward + sourceSystem` spec from `AGENT_RUNNING_MODEL.md`.
3. **leadNotify forwarding** — `server/routes/leadNotify.ts` now passes `sourceSystem` (`leadData.source`) into `triggerGoldLeadWhatsApp`, so the patch lock actually engages on `/api/leads/notify` deliveries.

## Audit Findings
- `EpcPage` letter copy already fixed to "PRINT & POST TEMPLATE" — no live letter service claim remains.
- `/dashboard`, `/find-jobs`, `/login`, `/account` page wrappers all delegate to live SPA pages.
- No dead `href="#"` in `app/` or `src/`. No `/contact` route exists.
- WhatsApp stub safety was already in place (`hasRequiredEnv` gate, no false "triggered: true" in stub mode).

## Verification
- New regression `codex-output/planning-locality-regression.mjs` — passes.
- `whatsapp-env-regression.mjs` + `planning-contact-signal-regression.mjs` — pass.
- `npm run build` — GREEN.

## Still Open
- TradeFlow URL scheme (founder blocker).
- n8n workflow 16 SMTP creds + activation (env blocker).

## PR
Branch `fix/broken-features-audit`. PR opened against main.

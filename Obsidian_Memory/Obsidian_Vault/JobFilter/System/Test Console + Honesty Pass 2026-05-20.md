# Test Console + Honesty Pass — 2026-05-20

## Why
After PR #150 merged, ran a full audit of what's real vs. mocked. The audit caught me overselling features that don't have backends yet, and confirmed City Intelligence is hardcoded sample data presented as live. This session fixes the deception and gives the owner a real way to verify what works.

## What's real today (confirmed)
- `/api/health` — Express app boots.
- `/api/leads/search` — REAL UK signal aggregation (ContractsFinder, Planning Data API, EPC, Companies House, Find a Tender). Requires `COMPANIES_HOUSE_API_KEY` and `EPC_BEARER_TOKEN` for full coverage.
- `/api/waitlist` — saves in-memory; persists to Supabase if configured; sends email via Resend if configured.
- `/api/create-checkout-session` — real Stripe SDK; works once `STRIPE_SECRET_KEY` + price IDs are set.
- Free Tools (Quote Floor, Profit Check, Tyre-Kicker, Travel Cost, Time-Waster) — pure browser math.
- Lead store / win store / chase store — all localStorage only (lost on browser clear).

## What's NOT real (and now honestly labelled)
- **MEES Deadline Watch / Chase Nudge / Profit Proof** — zero backend code. Was previously badged "live now / beta / rolling out". Now badged "IN BUILD — Target Q3 2026" on HomePage and "Q3 2026" in PricingPage comparison.
- **City Intelligence** — hardcoded sample data for 6 cities (Birmingham, London, Manchester, Bristol, Leeds, Glasgow). Now carries a clear `SAMPLE BRIEFING` badge + disclaimer in the header.
- **WhatsApp delivery (Twilio)** — code path real, but env vars almost certainly not set; sends to console.log only when not configured.
- **Letter pack / 1st class postage** — claimed but no print/postage integration in code (left as-is for now; flagged for follow-up).
- **One trade per postcode** — marketing claim, no enforcement constraint in DB (flagged for follow-up).
- **No login.** Everything anonymous + localStorage. Paying users can lose access on browser cache clear. This is the biggest single risk.

## What this session shipped
1. **New `/api/status` endpoint** (`server/routes/status.ts`) — returns booleans only (no secrets) for each integration: Stripe, Supabase, Resend, Twilio, Companies House, EPC. Also exposes `NODE_ENV`, `VERCEL`, `FULL_ACCESS_TEST_MODE` flags.
2. **New `/test` page** (`src/pages/TestConsolePage.tsx`) — Test Console:
   - Reads `/api/status` and shows a card per integration (green = configured, orange = not).
   - Live probe buttons: `/api/health`, `/api/leads/search` (with postcode + trade inputs), `/api/waitlist/count`, `/api/waitlist` (with test email), `/api/create-checkout-session` (creates Stripe session, opens checkout in new tab if session url returned).
   - Latency + response detail for every probe.
   - Bottom: explicit 7-step manual end-to-end checklist.
3. **Honesty pass on HomePage** — renamed "NEW IN 2026 — INCLUDED" to "2026 ROADMAP — IN BUILD"; changed each badge from NEW to IN BUILD; reworded copy from "Watches…" to "Will watch…"; replaced "Live now / Beta / Rolling out" footnotes with "Target: Q3 2026"; removed the line "No other UK lead tool ships all three at this price band. Checked May 2026" (could not back it).
4. **Honesty pass on PricingPage** — three roadmap features now read "(roadmap)" with "Q3 2026" cells instead of "Included".
5. **Honest label on CityIntelligencePage** — added `SAMPLE BRIEFING` chip and explicit disclaimer: "Sample briefing showing the format. Live briefings pull from real planning, EPC and tender feeds — only delivered to founder-patch subscribers in covered postcodes."

## How to use the Test Console
Visit `/test` in the browser. It will:
1. Auto-load `/api/status` and show what's configured.
2. Let you click each probe to verify the endpoint live.
3. Show the actual Stripe checkout URL (test mode) — click to complete a test purchase with `4242 4242 4242 4242`.
4. Walk the 7-step checklist at the bottom to verify the full purchase flow end-to-end.

## Build status
- `npm run lint` clean.
- `npm run build` clean (~6s).

## Remaining issues / next session
- Build MEES Deadline Watch, Chase Nudge, Profit Proof backends (or kill them from the roadmap).
- Add auth so paying users don't lose access on browser clear.
- Wire City Intelligence to a real feed (or remove the page until it's real).
- Standardise "data sources" count across pages (currently mixed between 3, 5, and 7).
- Investigate the "letter pack with 1st class postage" claim — either integrate a print partner or remove.

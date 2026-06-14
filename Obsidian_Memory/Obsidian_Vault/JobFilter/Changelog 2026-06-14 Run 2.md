# Changelog — 14 June 2026 Run 2 (NightlyBuildAgent)

## Container state
- Fresh container, `node_modules` missing — `npm install` (359 packages)
- Build GREEN (107 pages), TypeScript CLEAN before changes

## Phase 1 — Broken flow check
- Re-confirmed both `setSubmitted(true)` forms (ProductAdvantagePage ServiceForm, WeeklySignalsPage AlertSubscribeModal) wired to real `fetch()` with `res.ok` checks — no fake flows. No broken imports/routes found (audited all `Link href` against `app/` route tree).

## Phase 2/4 — NEEDLE/BUILDER fix: Vantage/Vicinity misrepresented as live (same class as #257)
Run 1 today (PR #257) fixed HomePage's ADD-ON SERVICES cards which said "Open Vantage ->" / "Open Vicinity ->" while both tools are still disabled/Coming Soon. Found the same misrepresentation in two more places:

- **`src/pages/FreeToolsPage.tsx`** — FREE VS PAID comparison table listed "Vantage bid decks" and "Vicinity proof generator" with a ✓ under FOUNDING 30, implying paying £39/mo unlocks a working self-serve generator. Changed both cells to "Coming soon".
- **`src/pages/TradieZonePage.tsx`** — YOUR TOOLS grid had Vantage ("Generate bid decks") and Vicinity ("Social proof from photos") tiles with "OPEN ->", same implication. Added `comingSoon: true` flag, an orange "Coming soon" badge (matches PR #257's HomePage badge style), and changed the CTA label to "JOIN WAITLIST ->" for these two tiles only.

## Verification
- Build GREEN (107 pages), TypeScript CLEAN
- `package-copy-regression.mjs` PASS
- Pushed to main (`6bc387a`)

## NEXT RUN priorities
1. **VicinityPage "Generate Proof" tool** — still Coming Soon/disabled; real build = wire photo upload + job summary + template selection into an actual image-generation flow (multi-run project, needs image-gen API)
2. **VantagePage "Generate Bid Deck" tool** — same as above for tender-to-bid-deck (needs image/PDF-gen API)
3. **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
4. **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
5. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks)
6. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
7. n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

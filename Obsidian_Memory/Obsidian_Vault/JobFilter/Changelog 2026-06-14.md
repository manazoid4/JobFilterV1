# Changelog — 14 June 2026 (NightlyBuildAgent)

## Container state
- Fresh container, `node_modules` missing — `npm install` (359 packages)
- Build GREEN (107 pages), TypeScript CLEAN before changes
- `npm run build` script actually runs `next build` (Next.js App Router live, Vite config is dead) — confirmed working

## Phase 1 — Broken flow check
- Re-checked both `setSubmitted(true)` forms (ProductAdvantagePage ServiceForm, WeeklySignalsPage AlertSubscribeModal) — both wired to real `fetch()`, no fake flows. No broken imports found.

## Phase 2/4 — NEEDLE fix: VantagePage fake "Generate Bid Deck" flow
- `src/pages/VantagePage.tsx` hero promised a working tender-to-bid-deck generator ("Drop your tender documents. Get a properly structured bid deck in under a minute"), but the upload zone is non-interactive (`pointerEvents: none`) and the "⚡ Generate Bid Deck" / "📷 Scan Document" buttons only scrolled to a generic founder-pricing waitlist form — a misleading CTA (same class as the VicinityPage "Generate Proof" fix from 12 June Run 1).
- Fixed: both buttons now `disabled` + relabelled "— Coming Soon" (matches VicinityPage pattern), added "Vantage is in development. Join the waitlist below to get early access." note above the waitlist form.

## Copy polish
- **BlueprintPage.tsx:164** — "The raw event lands in the pipeline" (user-facing DELIVERY LOOP card copy, internal-noun jargon) → "The raw event is picked up and scored."
- **TradieZonePage.tsx:53** — "everything beyond your job pipeline" → "tools no auction site gives you" (drops "pipeline" jargon, adds competitor-framing language)
- **TradieZonePage.tsx:107** — "VIEW PIPELINE →" → "VIEW DASHBOARD →" (jargon + matches actual link target `/dashboard`)
- **TradieZonePage.tsx:111** — "jobs appear in minutes, before they hit Checkatrade or Bark" (unverifiable "in minutes" claim) → "jobs appear before they're shared on Checkatrade or Bark. First to quote wins." (specific + control framing)

## Verification
- Build GREEN (107 pages), TypeScript CLEAN
- `package-copy-regression.mjs` PASS

## NEXT RUN priorities
1. **VicinityPage "Generate Proof" tool** — still Coming Soon/disabled; real build = wire photo upload + job summary + template selection into an actual image-generation flow (multi-run project, needs image-gen API)
2. **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
3. **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
4. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks)
5. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
6. n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

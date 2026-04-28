---
type: meta
status: developing
created: 2026-04-28
updated: 2026-04-28
links:
  - "[[design-system]]"
---
# Current State — 2026-04-28

## What Exists
- **Site live**: Firebase Hosting, custom domain, deploy via GitHub Actions
- **Backend**: Firebase Functions handling `/api/**` (Stripe + lead scan endpoints) — recently fixed self-contained `functions/` dir + node engine
- **Frontend**: Two apps — Alpine (`/src/main.ts`, live entry) + React 19/Vite/TS/Tailwind (built but NOT entry point)
- **Copy**: Full messaging rewrite delivered (Stripe/Linear voice). Hero: "The jobs worth quoting land in your WhatsApp. The rest don't."
- **Design system**: Cobalt Blue `#2563EB`, Slate 950 bg, Inter + JetBrains Mono. See [[design-system]]
- **Stripe**: Wired but not validated end-to-end

## What's Broken / Stale
- ~~**Lead data**~~: ✅ FIXED `ca2876c` — Contracts Finder + FTS pipeline shipped via `functions/leadEngine/`
- ~~**Brand phrases**~~: ✅ FIXED `7cb18bd` — all 9 phrases on hero
- ~~**Hero copy**~~: ✅ Already had messaging-rewrite copy ("jobs worth quoting land in your WhatsApp")
- ~~**Stripe trial**~~: ✅ FIXED `7cb18bd` — 7-day trial added to checkout
- **Trust signals**: Testimonials feel made up. No real source citations
- **Codex/Intake Engine**: Codex now has own page at `/codex` ✓ (split done)
- **Demo polish**: Skeleton loaders, live counter, pulse dot — pending
- **End-to-end Stripe flow**: Trial code shipped but not tested signup → trial → charge → access
- **WhatsApp delivery**: No MVP yet — leads land in scan API, not on tradesman's phone

## What Matters Now (priority order)
1. **Real lead pipeline** — replace placeholder data with actual scraped/API leads
2. **Homepage rewrite shipped** — copy exists, must land in code
3. **Demo feels real** — skeleton loaders, live counter, hot-lead pulse dot
4. **Stripe → trial flow working** — paid wall on Intake Engine subscription
5. **WhatsApp delivery MVP** — even one trade, one postcode, daily message

## Stack Snapshot
- Frontend: Alpine.js (live) + React 19 (queued)
- Backend: Firebase Functions (Node)
- Payments: Stripe
- Hosting: Firebase Hosting
- CI: GitHub Actions

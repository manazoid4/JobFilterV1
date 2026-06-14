# Changelog — 14 June 2026 Run 3 (NightlyBuildAgent)

## Container state
- Started in detached HEAD at `00ca6e4` (local `main` ref was 53 commits stale, force-updated remote); `git fetch` + `git reset --hard origin/main` resolved it, no real divergence — `00ca6e4` was already the tip of `origin/main`.
- `npm install` (359 packages, fresh container); build GREEN (107 pages), TypeScript CLEAN before changes.

## Phase 1 — Broken flow check (re-confirmed)
- Both `setSubmitted(true)` forms (ProductAdvantagePage, WeeklySignalsPage) confirmed wired to real `fetch('/api/waitlist', ...)`.
- No broken imports/dead routes found.

## Phase 2 — Tier 1 features
- All 5 brief items (scan counter, calendar ICS, won leaderboard, WhatsApp templates, trade-specific scoring) re-confirmed already BUILT (per Feature Roadmap + many prior runs). No new Tier 1 work this run.

## Phase 4 — NEEDLE/BUILDER fix: robots.ts gap from PR #261
Today's two earlier PRs (#260 login/dashboard guard fixes, #261 server-side auth middleware + SEO/security) added a `middleware.ts` guard that redirects unauthenticated requests on `/dashboard`, `/leads`, `/account`, `/tradie-zone` to `/login?next=...`. `app/robots.ts` (added in the same PR) disallowed `/dashboard` and `/account` but missed `/leads` and `/tradie-zone` — crawlers could be sent into login-redirect chains on those two member routes. Added both to the `disallow` list, matching the middleware's protected-route set.

- Verified `/tradie-zone` is only linked from `TopNav` for logged-in users (member "Tools" link) — middleware guard is correct/intentional, no UX regression.
- Verified `/leads` and `/leads/[id]` are only reached via `DashboardPage` links (already member-only) — consistent.

## Verification
- Build GREEN (107 pages), TypeScript CLEAN
- `package-copy-regression.mjs` PASS
- Pushed to main (`1e37315`)

## NEXT RUN priorities
1. **VicinityPage "Generate Proof" / VantagePage "Generate Bid Deck" tools** — still Coming Soon/disabled; real build = wire upload + template selection into an actual image/PDF-gen flow (multi-run project, needs gen API)
2. **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
3. **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
4. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks)
5. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
6. n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
7. Tier 1/2 roadmap items are now exhaustively built/polished — next genuinely-buildable medium items are Tier 2 #13 (WhatsApp Business API Phase 2, two-way messaging) or Tier 2 #18 (PlanWire), both multi-day/multi-run projects worth scoping before starting.

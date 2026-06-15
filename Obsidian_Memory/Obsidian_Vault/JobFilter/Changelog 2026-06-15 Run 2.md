# Changelog — 15 June 2026 Run 2 (NightlyBuildAgent)

## Container state
- `git fetch` + `git checkout main` + `git reset --hard origin/main` (local `main` was 28 commits behind `origin/main`/HEAD, which was detached at `d0e5dc2`).
- `npm install` (359 packages, fresh container); build GREEN (107 pages), TypeScript CLEAN before changes.

## Phase 1 re-confirmed
- Both `setSubmitted(true)` forms (`ProductAdvantagePage` ServiceForm, `WeeklySignalsPage` AlertSubscribeModal) wired to real `fetch('/api/waitlist', ...)`.
- No broken relative imports across `src/` and `app/` (scripted check).

## NEEDLE/BUILDER fix — Vicinity tool card mismatch on TradieZonePage
- `src/pages/TradieZonePage.tsx`: the "Vicinity" member-tool card said `desc: 'Social proof from photos'` with a `Camera` icon and linked to `/vicinity`. But `/vicinity` (via `ProductAdvantagePage` "vicinity" content) is a human-staffed **targeted door-drop ad campaign** service based on local signals — there's no photo/social-proof feature anywhere on that page. A tradesman clicking the card on the promise of a photo tool would land on an unrelated ad-targeting service.
- Fixed: desc → `'Targeted door-drop ads'`, icon `Camera` → `Megaphone` (Camera import removed, Megaphone added). Also fixed the TOOLS section subtitle ("Bid decks, social proof, material prices and quick links...") → "Bid decks, door-drop ads, material prices and quick links..." to match.
- Note: this followed up on PR #273 (earlier today), which correctly removed a stale "Coming Soon" badge from this same card — confirmed Vantage/Vicinity are real working waitlist/service pages, just verified the *description* of Vicinity was the actual mismatch, not its availability.

## Copy polish — missing trust line on CityIntelligencePage
- `src/pages/CityIntelligencePage.tsx`: the "UNLOCK THE FULL BRIEFING" CTA section had "SCAN FREE FIRST" but no "No credit card required" line — every other free-scan CTA on the site has this. Added `<p className="mt-3 text-xs font-black text-white/60">No credit card required — 3 free scans every week</p>` matching the pattern used on MethodologyPage/TrustCenterPage.

## Build status
- `npm run build` GREEN (107 pages), `npx tsc --noEmit` CLEAN, `node codex-output/package-copy-regression.mjs` PASS.
- Pushed to `main` (`d96f852`).

## Next run priorities
1. **Tier 2 #15 continued** — if a real buyer-phone data source becomes available, thread `phone` onto `Lead` (FindJobsPage) and `QuickResponseKit`'s `phone` prop so SMS/WhatsApp links pre-fill the recipient. Until then, leave as-is.
2. **VicinityPage / VantagePage** are confirmed real working human-staffed waitlist services (not "Generate Proof"/"Generate Bid Deck" self-serve tools) — no further "Coming Soon" work needed unless the founder wants a self-serve generator built (multi-run, needs gen API).
3. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks).
4. Spot-check EMAIL ME THIS LEAD live (blocked, no RESEND_API_KEY in this container).
5. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder); n8n workflow 16 (blocked on SMTP creds).
6. **Watch `flipsignal-ai/` for repeat build breakage** — if future PRs touch that subtree's deps/config, re-verify root `tsc --noEmit` / `next build` stay green.

# Changelog — 15 June 2026 Run 3 (NightlyBuildAgent)

## Container state
- Local `main` was 110/52 commits diverged from `origin/main` (HEAD detached at `e318118` after fetch). `git reset --hard origin/main` resolved it.
- `npm install` (359 packages, fresh container); build GREEN (107 pages), TypeScript CLEAN before changes.

## Phase 1 re-confirmed
- Both `setSubmitted(true)` forms (`ProductAdvantagePage` ServiceForm, `WeeklySignalsPage` AlertSubscribeModal) still wired to real `fetch('/api/waitlist', ...)`.
- No broken relative imports across `src/` and `app/` (scripted check).
- Reviewed PR #275 ("tighten patch claim conversion flow", landed earlier today by founder) — new `TerritoriesPage` "CHECK YOUR PATCH" form posts to `joinWaitlist()` → `/api/waitlist` (real endpoint, confirmed in `server/routes/waitlist.ts`). HomePage's "Open Vantage"/"Open Vicinity" badges checked against `ProductAdvantagePage` — both are real human-staffed "submit to team" forms wired to `/api/waitlist`, so "Open now" copy is accurate.

## NEEDLE/BUILDER fix — TerritoriesPage hero CTA ping-pong (regression from PR #275)
- PR #275 added a `#patch-check` form (the "CHECK YOUR PATCH" aside) directly in the hero, but left the hero's "LOCK MY PATCH →" button pointing at `href="#claim"` — the page's *final* CTA section at the bottom. That section's own button then points back up to `#patch-check`.
- Net effect: clicking "LOCK MY PATCH →" at the top of the page jumped a visitor to the bottom of the page, where they had to click again to jump back to the form sitting right next to the button they started on.
- Fixed: hero "LOCK MY PATCH →" now links straight to `href="#patch-check"`. One-line fix in `src/pages/TerritoriesPage.tsx`.
- `id="claim"` on the final CTA section is now unreferenced but left in place (harmless anchor, out of scope for this fix).

## Build status
- `npm run build` GREEN (107 pages), `npx tsc --noEmit` CLEAN, `node codex-output/package-copy-regression.mjs` PASS.
- Pushed to `main` (`5db2994`).

## Next run priorities
1. **Fresh NEEDLE pass on `/territories`** — PR #275 substantially rewrote this page (new patch-check form, status CTAs all routed through `#patch-check`, TopNav now points "Claim Patch"/"CLAIM PATCH" to `/territories` instead of `/pricing`). Worth a full read-through next run for any other copy/flow drift now the dust has settled.
2. **Tier 2 #15 continued** — if a real buyer-phone data source becomes available, thread `phone` onto `Lead` (FindJobsPage) and `QuickResponseKit`'s `phone` prop so SMS/WhatsApp links pre-fill the recipient. Until then, leave as-is.
3. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks).
4. Spot-check EMAIL ME THIS LEAD live (blocked, no RESEND_API_KEY in this container).
5. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder); n8n workflow 16 (blocked on SMTP creds).

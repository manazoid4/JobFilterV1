# Changelog — 11 June 2026 (NightlyBuildAgent — Run 3)

## Setup
- Container started in a detached-HEAD state at the tip of `origin/main` (`c26fee4`) — not actually diverged, just an unattached ref. `git checkout main && git reset --hard origin/main` cleaned it up; no work lost (verified `origin/main` already had all 52 commits from prior runs).
- `node_modules` empty again in this fresh container — `npm install` (359 packages).

## Build status
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN

## Audit — Tier 2 #15 "Multi-channel follow-up (buyer-side)" re-scoped
Last run flagged threading `raw.rawContact.email`/`.phone` onto the normalised `Lead` as the next step to unblock buyer-side email/SMS and "phone-aware WhatsApp links". Investigated this properly before building:

- **Only one fetcher (`directorySignalFetcher.ts`) ever sets `rawContact`**, and for `contactSignalLevel === 'strong'` leads it sets `phone: 'available'` — a literal placeholder string, not a real phone number. No fetcher anywhere in `leadEngine/` produces a real buyer phone or email.
- Threading this through to `Lead.buyerPhone`/`waPhone` today would make `wa.me/available?text=...` render as a real "OPEN BUYER WHATSAPP" link — a broken/fake flow, which BUILD RULES explicitly forbid.
- Building real buyer contact enrichment is **Tier 4, item #22 in the Feature Roadmap — "DO NOT BUILD NOW"** (GDPR/ICO risk, explicitly out of scope per `CLAUDE.md` DO NOT TOUCH list).
- **Conclusion: Tier 2 #15 buyer-side follow-up is not a normaliser-threading task — it's blocked on a real contact-data source, which is explicitly out of scope.** Removing this from the "next priorities" rotation; the email-yourself chase kit (built last run) is the correct scope for this feature for now.

## NEEDLE / Phase 4 fix (BUILDER)
**AccountPage subscription status badges** (`src/pages/AccountPage.tsx`) — ACTIVE/PAST_DUE badges and the billing-portal error message used raw Tailwind colours (`border-green-600 bg-green-50 text-green-700`, `border-orange-500 bg-orange-50 text-orange-700`, `text-red-600`) and 1px borders — a design-system violation (brutalist yellow rules require `border-2` + `--green`/`--orange`/`--ink` tokens, no soft Tailwind palette colours). Fixed to `border-2 border-[var(--green)] text-[var(--green)]` / `border-2 border-[var(--orange)] text-[var(--orange)]` for both the status badges and the portal error text — now visually consistent with every other page on the site.

- CRITIC check: clearer in <3s? Yes — badges now match the black/white/yellow/green/orange palette used everywhere else; no jarring soft-pastel Tailwind colours on a brutalist page.
- REVENUE check: low-direct-impact (logged-in account page), but removes a visual inconsistency a paying member would notice every time they check their plan.

## Other checks this run
- Re-confirmed both `setSubmitted(true)` forms (ProductAdvantagePage ServiceForm, WeeklySignalsPage AlertSubscribeModal) are wired to real `fetch()` calls — no fake flows.
- Re-confirmed FaqPage, TerritoriesPage free CTAs all carry "no card needed" trust copy inline in the button label — no missing trust signals found.
- Spot-checked `WinStatsBanner` — `postcode` always defaults to `B14 7QH` (never empty), so the "in your area" framing in `/api/wins/stats` is always postcode-scoped — no bug.
- Reviewed `/api/leads/email-chase` + `LeadDetailPage` "EMAIL ME THIS LEAD" code from last run — correctly wired, error/sending/sent states handled, returns 503 cleanly without `RESEND_API_KEY`. No issues found on code review (still untested live, no Resend key in this container).

## Commit
- `0cb99be` `[NightlyBuildAgent] AccountPage design system fix — brutalist tokens for status badges` — pushed to `main`.

## NEXT RUN — top 3 priorities
1. **Fresh NEEDLE/UX pass on a page not recently audited** — most Tier 1 + Tier 2 (#12, #16, #17) items and the jargon sweep are now exhausted; AccountPage was the first design-system violation found in several runs, suggesting other less-trafficked pages (e.g. `/test` console, legacy comparison pages) may have similar drift worth a pass.
2. **Spot-check "EMAIL ME THIS LEAD" live** — still blocked, no `RESEND_API_KEY` in this container; verify once Resend is configured.
3. **Stripe live test** — 4242 4242 4242 4242, confirm `/dashboard?welcome=1` and `profiles.plan` flip (still blocked on test keys in Vercel, carried over ~2 weeks).

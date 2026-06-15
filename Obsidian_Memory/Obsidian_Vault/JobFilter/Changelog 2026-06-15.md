# Changelog — 15 June 2026 (NightlyBuildAgent)

## Container state
- `npm install` (359 packages, fresh container); build GREEN (107 pages), TypeScript CLEAN before changes.
- Phase 1 re-confirmed: both `setSubmitted(true)` forms (ProductAdvantagePage, WeeklySignalsPage) wired to real `fetch()`; no broken imports.

## Note — build broken mid-session by PR #269, fixed in parallel by PR #270
- While this run was in progress, PR #269 "Add FlipSignal AI: full Next.js SaaS scaffold for marketplace arbitrage" merged to `main`. It added a separate Next.js project at `flipsignal-ai/` (own `package.json`/`tsconfig.json`, Clerk/Prisma/Trigger.dev deps) without excluding it from the root `tsconfig.json`, so the root `include: ["**/*.ts", "**/*.tsx"]` picked up `flipsignal-ai/**` and broke both `npx tsc --noEmit` and `npm run build` (`Cannot find module '@clerk/nextjs/server'` etc.).
- This agent independently diagnosed the same issue and prepared the same one-line `tsconfig.json` fix (`exclude: [..., "flipsignal-ai"]`), but PR #270 "Fix root build: exclude flipsignal-ai from root TypeScript project" landed first with an identical fix — rebased onto it, dropped the duplicate commit.
- Build GREEN (107 pages) + TypeScript CLEAN confirmed on top of #270's fix.
- **Flag for founder**: `flipsignal-ai/` is an unrelated marketplace-arbitrage SaaS scaffold now living in the JobFilterV1 repo root. Worth checking whether this monorepo layout is intentional — as long as it stays excluded from the root tsconfig it won't break JobFilter builds, but it adds repo weight and confusion for future agents.

## Feature built — Tier 2 #15 "Multi-channel follow-up" first slice (SMS fallback)
- `src/lib/chaseTemplates.ts`: added `toSmsHref(phone, body)` — builds an `sms:<digits>?body=<message>` link from an optional phone number and a filled template body.
- `src/components/QuickResponseKit.tsx`: added a new `phone?: string` prop and an "OPEN SMS" button next to "COPY MESSAGE" whenever the active channel is WhatsApp. Tapping it auto-tracks the lead (same as copy) and opens the device's SMS composer with the message pre-filled. When no phone number is known, the link still opens the composer with no recipient — copy under the button explains the user picks the contact themselves.
- No backend changes, no fake flow — `sms:` is a standard browser URI scheme, degrades the same way the existing `wa.me` links already do when no buyer phone is known.
- This is a real (if partial) slice of Roadmap Tier 2 #15. Full SMS personalisation (auto-filling the buyer's number) remains blocked on the same issue noted in the 11 June Run 3 changelog — `directorySignalFetcher` only ever sets a placeholder `phone: 'available'`, not a real number, so `Lead.phone` was deliberately NOT added to the `Lead` type this run.

## NEEDLE/BUILDER fix
- `src/pages/SmartQuotePage.tsx:132` — removed a stray Tailwind `rounded` class on the QUOTE STARTER PREVIEW blur-overlay wrapper. Brutalist design system uses square corners (`jf-box`/`jf-button`/`border-2 border-[var(--line)]`); this was the only rounded-corner outlier on the page.

## Copy polish
- Audited `SmartQuotePage.tsx` and `ProductAdvantagePage.tsx` (powers `/swmp-template`, `/wayleave-pack`, `/dno-brief`, etc.) against tradesman-first copy rules (Fear → Proof → Control, named competitors, "No credit card required" near free CTAs, no corporate jargon). Both already compliant — no changes needed.
- Searched all of `src/pages/*.tsx` for "leverage/utilise/solution/platform" — remaining "platform" hits are all accurate descriptions of competitor products (Checkatrade, Bark, etc.) in comparison tables, not JobFilter self-description. No violations found.

## Build status
- `npm run build` GREEN (107 pages), `npx tsc --noEmit` CLEAN after changes.

## Next run priorities
1. **Tier 2 #15 continued** — if a real buyer-phone data source becomes available, thread `phone` onto `Lead` (FindJobsPage) and `QuickResponseKit`'s `phone` prop so SMS/WhatsApp links pre-fill the recipient. Until then, leave as-is (avoids fake `wa.me//available`-style links).
2. **VicinityPage "Generate Proof" / VantagePage "Generate Bid Deck" tools** — still Coming Soon/disabled; real build = wire upload + template selection into an actual image/PDF-gen flow (multi-run project, needs gen API).
3. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks).
4. Spot-check EMAIL ME THIS LEAD live (blocked, no RESEND_API_KEY in this container).
5. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder); n8n workflow 16 (blocked on SMTP creds).
6. **Watch `flipsignal-ai/` for repeat build breakage** — if future PRs touch that subtree's deps/config, re-verify root `tsc --noEmit` / `next build` stay green.

# JobFilter Vercel Supabase Migration - 2026-05-22

## Current Firebase Setup Found

- Root Firebase hosting/config files: `firebase.json`, `.firebaserc`, `firestore.rules`, `firebase-blueprint.json`.
- Firebase Functions app under `functions/`, including `firebase-functions`, `firebase-admin`, Firestore waitlist/delivery writes, Stripe webhook handling, and duplicated lead engine code.
- Firebase deployment helpers: `deploy-titan.js`, `deploy-titan.py`.
- GitHub Actions Firebase workflows: `.github/workflows/firebase-hosting-merge.yml`, `.github/workflows/firebase-hosting-pr-preview.yml`.
- Environment template contained `FIREBASE_PROJECT_ID` and `FIREBASE_SERVICE_ACCOUNT`.
- Docs and memory references found in `AGENTS.md`, `AUDIT-REPORT.md`, `JOBFILTER_LAUNCH_CHECKLIST.txt`, handoff notes, build logs, and lead-engine architecture notes.

## Migration Plan

1. Keep the working React UI intact as a client-only app inside Next.js.
2. Move deployment from Firebase Hosting/Vite output to Vercel/Next.js.
3. Keep existing Express API behavior available through a Next API catch-all adapter.
4. Add App Router route handlers for Stripe, n8n, and AI scoring entry points.
5. Archive Firebase files under `legacy/firebase/` until Vercel production is confirmed.
6. Use Supabase Postgres/Auth/Storage as the source of truth, with service-role writes only from server code.

## Files Moved

- `firebase.json` -> `legacy/firebase/firebase.json`
- `.firebaserc` -> `legacy/firebase/.firebaserc`
- `firestore.rules` -> `legacy/firebase/firestore.rules`
- `firebase-blueprint.json` -> `legacy/firebase/firebase-blueprint.json`
- `functions/` -> `legacy/firebase/functions/`
- `deploy-titan.js` -> `legacy/firebase/deploy-titan.js`
- `deploy-titan.py` -> `legacy/firebase/deploy-titan.py`
- `.github/workflows/firebase-hosting-merge.yml` -> `legacy/firebase/.github/workflows/firebase-hosting-merge.yml`
- `.github/workflows/firebase-hosting-pr-preview.yml` -> `legacy/firebase/.github/workflows/firebase-hosting-pr-preview.yml`

## Files Changed

- `package.json`, `package-lock.json`: switched scripts to Next.js and added Next/Supabase SSR dependencies.
- `app/`: added Next App Router shell, no-SSR legacy UI wrapper, and new API route handlers.
- `pages/api/[[...path]].ts`: preserves existing Express API routes for current free tools.
- `src/lib/supabase/`: added browser and service-role client helpers.
- `server/lib/supabase.ts`: accepts Vercel/Supabase env names.
- `server/routes/status.ts`: reports Vercel/Supabase env readiness.
- `server/routes/stripe.ts`: added null-safe Supabase handling under strict Next type checks.
- `.env.example`: replaced Firebase envs with Vercel/Supabase/Stripe/Resend/n8n/AI envs.
- `vercel.json`: changed to Next.js framework config.
- `next.config.ts`: pins Turbopack root to this repo.
- `AGENTS.md`: deployment rule updated from Firebase Hosting to Vercel.
- `.gitignore`: added `.next/`.

## New Architecture

`FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER`

- Frontend: Next.js App Router on Vercel, currently preserving the existing React Router UI as a client island.
- API: Next route handlers for new SaaS integrations plus existing Express routes through a Next API catch-all.
- Database/Auth/Storage: Supabase.
- Payments: Stripe Checkout and webhook-ready route.
- Automation: n8n webhook route placeholders.
- Email: Resend env wiring retained.
- AI scoring: `/api/ai/score-lead` server route with rules fallback and Gemini-ready env.

## Env Vars Needed

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_FOUNDING`
- `STRIPE_PRICE_PRO`
- `STRIPE_PRICE_BUSINESS`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `N8N_WEBHOOK_URL`
- `N8N_API_KEY`
- `GEMINI_API_KEY`
- Optional/source-specific: `OPENAI_API_KEY`, `COMPANIES_HOUSE_API_KEY`, `EPC_BEARER_TOKEN`, Twilio WhatsApp vars.

## Supabase Setup Steps

1. Confirm the linked Supabase project is the private production JobFilter project.
2. Run `supabase/migrations/20260522_vercel_supabase_saas.sql` in Supabase SQL Editor or via Supabase CLI.
3. Confirm RLS is enabled on all new public tables.
4. Confirm Data API exposure/grants for tables that the app needs through Supabase client access.
5. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only in Vercel env vars.
6. Do not upload the Obsidian vault yet. Better route: create a private Supabase Storage bucket or `vault_documents` table with owner-only RLS after production auth is confirmed.

## Vercel Setup Steps

1. Confirm project root is `JobFilterV1`.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Add env vars in Vercel Project Settings for Production, Preview, and Development as needed.
5. Deploy this branch as preview first.
6. Promote to production only after home page, free tools, lead search, Stripe checkout, and n8n routes are verified.

## Stripe Setup Steps

1. Add secret and publishable keys in Vercel.
2. Add price IDs for Founding, Pro, and Business.
3. Configure webhook endpoint: `https://jobfilter.uk/api/stripe/webhook`.
4. Add webhook secret to Vercel.
5. Test checkout in Stripe test mode before production keys.

## n8n Setup Steps

1. Add `N8N_WEBHOOK_URL` to Vercel.
2. Add `N8N_API_KEY` if the webhook requires bearer auth.
3. Test `/api/n8n/lead-created`.
4. Test `/api/n8n/tool-used`.
5. Store event results in `n8n_events`.

## Errors / Blockers

- First build failed due wrong catch-all API import path. Fixed.
- Next warned about parent lockfiles. Fixed by setting `turbopack.root`.
- Build failed on Supabase insert inference without generated DB types. Fixed by typing the service client as `SupabaseClient`.
- Build failed on existing nullable Supabase assumptions in Stripe route. Fixed with null guards.
- Build failed on prerender because legacy SPA referenced browser globals. Fixed by loading the React Router app as a no-SSR client island.
- npm audit reports 19 vulnerabilities. Not force-fixed during migration to avoid unrelated dependency churn.
- Real production wiring still needs Vercel/Supabase/Stripe/Resend/n8n keys verified in Vercel.

## Verification

- `npm install`: passed.
- `npm run build`: passed.
- `npm run lint`: passed.
- Local smoke on `http://localhost:3000`: home page, `/api/health`, `/api/status`, `/api/leads/search`, `/api/ai/score-lead`, `/api/n8n/lead-created`, `/api/n8n/tool-used` all responded.

## Next Tasks

1. Confirm Vercel env vars are present and scoped correctly.
2. Run Supabase migration in production project.
3. Test Stripe checkout with configured price IDs.
4. Test n8n webhook delivery from Vercel preview.
5. After confirmed, remove Firebase project/link and archived deployment dependency permanently.

# JobFilter Supabase + Vercel Migration

## Decision
- Use Vercel for the React/Vite site and existing Express API.
- Use Supabase Postgres for data.
- Keep Firebase files only as rollback until Vercel is live.

## What You Need To Do
1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy these values:
   - Project URL -> `SUPABASE_URL`
   - Project URL -> `VITE_SUPABASE_URL`
   - Service role key -> `SUPABASE_SERVICE_ROLE_KEY`
   - Publishable/anon key -> `VITE_SUPABASE_PUBLISHABLE_KEY`
5. Create a Vercel project from this GitHub repo.
6. Add env vars in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `APP_URL`
   - WhatsApp/Twilio keys when ready
7. Deploy with Vercel.

## Local Test
```powershell
npm run lint
npm run build
npx tsx codex-output/postcode-filter-regression.mjs
node codex-output/free-scanner-redaction-regression.mjs
node codex-output/free-preview-live-contract-test.mjs
node codex-output/supabase-vercel-migration-regression.mjs
npm run dev
```

Check:
- `http://localhost:3000/api/health`
- `/pricing` waitlist form
- `/find-jobs`

## Firebase Cost Cut
- GitHub Firebase auto-deploy is disabled.
- Firebase workflow is manual rollback only.
- Root app no longer depends on Firebase packages.
- Do not delete Firebase project until Vercel production is verified.

## Security
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code.
- Only use `VITE_SUPABASE_PUBLISHABLE_KEY` in browser code.
- `waitlist` table has RLS enabled and service-role-only writes.

# Supabase Vercel Migration - 2 May 2026

## Decision
- Move active app path away from Firebase billing.
- Use Vercel for site/API.
- Use Supabase Postgres for data.
- Keep Firebase as rollback until Vercel is live.

## Current Change
- Root Firebase packages removed.
- `server/app.ts` exports Express app.
- `api/index.ts` exposes Vercel API entry.
- `server/routes/waitlist.ts` writes to Supabase when env vars exist.
- `supabase/schema.sql` creates `waitlist`.
- Firebase GitHub deploy workflows are manual rollback only.

## User Setup
- Create Supabase project.
- Run `supabase/schema.sql`.
- Add Supabase env vars to Vercel.
- Connect Vercel to GitHub repo.

## Saved Test
- `node codex-output/supabase-vercel-migration-regression.mjs`

## Links
- [[System Index]]
- [[Agent Running Model]]

# Supabase CLI Access - 2 May 2026

## Project
- JobFilter Supabase project: `nfjwuwsuaapufmkppoeo`
- Linked work: [[Supabase Vercel Migration - 2 May 2026]]

## Token Rule
- Do not store raw Supabase access tokens in Obsidian.
- Use Supabase Account Tokens for CLI auth.
- Store tokens only in the Supabase CLI login store or a real secret manager.

## Deploy Commands
```powershell
npx supabase login --token "<personal-access-token>"
npx supabase link --project-ref nfjwuwsuaapufmkppoeo --password "<database-password>" --yes
npx supabase db push --yes
```

## Current Status
- Personal access token created for Codex/Claude CLI use.
- Raw token intentionally not saved here.
- Supabase CLI login completed.
- Project linked to `nfjwuwsuaapufmkppoeo`.
- Migration `20260502013730_init_jobfilter_core` applied to remote.

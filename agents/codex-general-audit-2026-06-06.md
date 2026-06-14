# Codex General Code Audit — JobFilter — 2026-06-06

## Your Role
General code quality + correctness auditor. Find bugs, broken features, dead code, missing deps. Output: fixes applied + report.

## Project
`C:\Users\manaz\Desktop\jobfilter\jobfilterv1`

## Known Issues to Fix
1. `resend` used in `server.ts:11` but missing from `package.json` → add `"resend": "^3.0.0"` to dependencies
2. `@google/genai` in `package.json` but imported nowhere → remove
3. `.firebaserc` (untracked but safe) → commit it
4. `src/App.tsx` (+87/-27 uncommitted) → commit pending work
5. `src/data/jobs.ts` (untracked) → commit it

## New Checks
- `npm install` — any unresolved deps or peer conflicts?
- `npx tsc --noEmit` — TypeScript errors?
- `npm run build` — clean build?
- All 6 nav routes render (HOME / DEMO / CODEX / VANTAGE / VICINITY / PRICING)?
- `POST /api/leads/scan` returns JSON for valid + invalid postcodes?
- Fallback leads appear when scan returns 0?
- Dead imports in `server.ts`, `src/App.tsx`, `leadEngine/*.ts`
- Console errors on dev server start
- Any `TODO` / `FIXME` blocking production
- `.github/workflows/*.yml` reference correct build commands?

## Commit Strategy
- Fix `resend` + remove `@google/genai` → commit: "fix: add resend dep, remove unused genai"
- Commit `.firebaserc` + `src/App.tsx` + `src/data/jobs.ts` → commit: "chore: commit pending tracked files"
- Additional clean fixes → separate descriptive commits

## Output
Save to: `C:\Users\manaz\Desktop\jobfilter\jobfilterv1\GENERAL-AUDIT-2026-06-06.md`

Format:
```
| # | Type | File | Issue | Status |
```
Status values: FIXED / NOTED / NEEDS DECISION

Save session note to: `C:\Users\manaz\claude-obsidian\wiki\sessions\2026-06-06-jobfilter-codex-general.md`

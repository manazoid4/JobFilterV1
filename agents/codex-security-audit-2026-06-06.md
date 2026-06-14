# Codex Security Audit — JobFilter — 2026-06-06

## Your Role
Security auditor. Find every exploitable vulnerability. Output: verified issues with severity + exact fix.

## Project
`C:\Users\manaz\Desktop\jobfilter\jobfilterv1`

## Known Critical Issues (confirm + fix)
1. Firebase API key in `firebase-applet-config.json` (tracked in git) — rotate key, gitignore file, use env var
2. PII logged in `server.ts:289` and `server.ts:341` (email, name to stdout) — redact
3. No auth on `POST /api/leads/scan` — no rate limiting, anyone can hammer it
4. `server.ts:252` returns `{status:'ok'}` even when Firestore write fails
5. `GEMINI_API_KEY` baked into client bundle via `vite.config.ts:11`

## New Areas to Audit
- All `server.ts` routes: auth gaps, injection vectors, header validation
- `firestore.rules`: read/write rules, any public write paths
- `leadEngine/fetchers/*.ts`: external API calls — SSRF risk, error handling leaks
- `.env.example` / tracked files: any secrets committed
- GitHub Actions workflows (`.github/workflows/`): secrets exposure, supply chain
- `package.json` dependencies: known CVEs in used versions
- CORS headers on API routes
- Input validation on postcode + trade params (injection/abuse vectors)

## Output
Save to: `C:\Users\manaz\Desktop\jobfilter\jobfilterv1\SECURITY-AUDIT-2026-06-06.md`

Format:
```
| # | Severity | File:Line | Issue | Fix |
```

Fix all CRITICAL issues in-place. Flag HIGH for user decision. Document all in output file.
Save session note to: `C:\Users\manaz\claude-obsidian\wiki\sessions\2026-06-06-jobfilter-codex-security.md`

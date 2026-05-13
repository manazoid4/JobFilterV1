---
type: changelog
date: 2026-05-13
repo: JobFilterV1
branch: main
source: mcp-github
---

# JobFilter Changelog — 2026-05-13

## Summary
NightlyBuild session. Three files pushed to `origin/main` via MCP (HTTP 403 blocks direct git push). HEAD advanced to `6766f40d`.

## Commits Pushed

| Commit | File | Change |
|--------|------|--------|
| `af39a98c` | `src/pages/FreeToolsPage.tsx` | Fixed 9 TS1128 errors — trailing `}` after top-level section comments (`*/}` → `*/`) |
| `0e25ad08` | `server/routes/outcomeReport.ts` | Fixed `${'£'}` encoding artifact in win stats message template → `£` literal |
| `6766f40d` | `src/pages/FindJobsPage.tsx` | Merged remote visual features + NightlyBuild additions (WinStatsBanner, OPEN_ACCESS env var, weekly scan counter) |

## Key Changes Detail

### FreeToolsPage.tsx — TS1128 Fix
- 9 top-level section comments outside JSX had spurious `}` from a prior MCP push that used JSX comment syntax in non-JSX context
- Pattern: `/* ── Tool Card ── */}` → `/* ── Tool Card ── */`

### outcomeReport.ts — £ Encoding Fix
- Win stats message used template literal `${'£'}${totalValue.toLocaleString()}` (artifact of encoding workaround)
- Fixed to plain `£${totalValue.toLocaleString()}`
- SEED_WINS baseline data preserved (seeded area data so WinStatsBanner shows real-feeling numbers from day one)

### FindJobsPage.tsx — Merge + NightlyBuild Features
**Preserved from remote (visual):**
- GhostRiskBadge component
- SVG hero illustration (builder/house graphic)
- HOW IT WORKS section
- LeadResultCard with GOLD/SILVER/BRONZE color-coded badges
- StatsBar, CompaniesHouseSourceBadge, EpcSourceBadge
- EmptyScanReport with SVG illustration

**Added from NightlyBuild (functional):**
- `OPEN_ACCESS = import.meta.env.VITE_OPEN_ACCESS === 'true'` — replaced hardcoded `true` (critical: prevents all users getting free access post-launch)
- `WinStatsBanner` import + render after SCANNER section — shows social proof from `/api/wins/stats`
- Weekly scan counter: Monday-reset logic using `jf-weekly-scans-used` / `jf-weekly-scans-week` localStorage keys; `WEEKLY_SCAN_LIMIT = DEV_MODE ? 999 : 3`

## Files Skipped (Remote More Advanced)
- `src/pages/HomePage.tsx` — remote has SampleLeadCard, social proof bar, 15 cities, "STOP QUOTING FOR GHOSTS." headline. Local push would be a regression.
- `src/pages/PricingPage.tsx` — remote uses "Territory" terminology throughout. Local uses old "PatchLock" name. Push would revert terminology.

## TypeScript Status
`npx tsc --noEmit` passed clean before FindJobsPage push. Fixed one intermediate error: `lockedText` prop removed from 3 `LockedValue` call sites (prop not in component type).

---

## Related
- [[Changelog 2026-05-12]]
- [[Progress]]
- [[Routine - GitHub Sync]]

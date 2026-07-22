# Handoff

## Current Position
- Master Plan and Task Queue created.
- T001 dispatched to OpenCode to fix stale regression tests and commit untracked narrative changes.

## Completed Work
- Repository inspected.
- `MASTER_PLAN.md` created.
- Control files established.

## Open Branches
- `agents/jobfilter-find-a-tender`

## Failing Tests
- `alert-delivery-contract-regression.mjs` (OpenCode fixing)
- `whatsapp-env-regression.mjs` (OpenCode fixing)
- `backend-contract-regression.mjs` (OpenCode fixing)
- `planning-locality-regression.mjs` (OpenCode fixing)

## Unresolved Risks
- CPV mapping precision might fall below 80% on live data.
- The pipeline relies on NUTS/delivery postcodes which may be missing from some FTS notices.

## Exact Next Command
Wait for OpenCode process (proc_d56e5657db2d) to complete, then verify `npm run lint && npm run test:fts`.

## Recommended Next Worker
Claude CLI (for T002).

## Next 3 Tasks
1. T002: Harden Find a Tender ingestion and remove Contracts Finder from live path (#380)
2. T003: Benchmark Validation (#382)
3. T004: Commercial Workflow and Red-Team Review
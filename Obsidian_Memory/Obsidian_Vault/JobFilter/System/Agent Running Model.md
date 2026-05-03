# Agent Running Model

## Purpose
- Shared working model for Claude, Codex, and other agents.
- Keeps every session focused on JobFilter revenue, lead quality, and paid value protection.
- Repo source: `AGENT_RUNNING_MODEL.md`

## Mission
- Build JobFilter as a UK trades lead intelligence system.
- Prioritise [[Intake Engine]] and paid lead quality.
- Keep [[Free Tools]] useful without giving away paid lead depth.

## Operating Order
1. Lead quality.
2. Data reliability.
3. Speed.
4. Monetisation.
5. Simple UX.

## Rules
- One strong lead per week must still feel worth paying for.
- Free users get tools and previews, not full contact signals.
- Paid users get full lead access, priority work, and stronger conversion flow.
- All meaningful changes need short linked notes.

## Current Handoff
- Tell new agents to read `AGENTS.md`, `AGENT_RUNNING_MODEL.md`, and [[Vault Map]] first.
- Current risk: free preview must not leak buyer, URL, deadline, exact value, exact score/source detail, contact signal, or searchable title.
- Current postcode rule: accept full, no-space, and outward-only formats like `B10`, `L10`, `SY11`, `SW17`; reject junk like `X10`, `ZZ99 9ZZ`, `NOTREAL`.
- Core tests: `npm run lint`, `npm run build`, `npx tsx codex-output/postcode-filter-regression.mjs`, `node codex-output/free-scanner-redaction-regression.mjs`, `node codex-output/free-preview-live-contract-test.mjs`, lead-engine quality tests.

## Links
- [[System Index]]
- [[Product Index]]
- [[Free Access Audit - 1 May 2026]]
- [[Lead Engine 50+ Quality Test - 1 May 2026]]
- [[Free Preview Gate Test - 1 May 2026]]

# JobFilter Agent Running Model

This file is for Claude, Codex, and any other agent working in this repo.

## Mission
- Build JobFilter into a UK trades lead intelligence system.
- Prioritise lead quality, paid conversion, and delivery reliability.
- Do not turn this into a generic job board.

## Operating Order
1. Protect paid lead value.
2. Improve lead quality and data integrity.
3. Keep the intake and scanner fast.
4. Add monetisation hooks only when they strengthen the offer.
5. Keep UX simple and trade-focused.

## Product Rule
- Free tools can be useful.
- Free tools must not reveal paid lead value.
- Paid users should get full lead depth, priority jobs, and clear action.

## Lead Engine Rule
- Use `FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER`.
- No fake leads.
- No empty lead objects.
- Keep the fixed lead schema intact.
- Rank higher value, urgent, local, complete leads first.

## Tradesman POV
- Would one strong lead per week still feel worth paying for?
- If the answer is no, improve quality before adding features.
- Copy must speak to money, time, trust, and control.

## Agent Workflow
- Read `AGENTS.md` first.
- Read this file second.
- Check `Obsidian_Memory/Obsidian_Vault/Vault Map.md` for memory.
- Always read `Obsidian_Memory/Obsidian_Vault/JobFilter/Product/Problems and Solutions.md` before product copy, pricing, lead delivery, lead gating, or customer trust changes.
- Add short Obsidian notes for meaningful changes.
- Link notes into the right folder index.
- Instagram saved-post inspiration memory lives in `Obsidian_Memory/Obsidian_Vault/AI Knowledge/Instagram Saved Posts Memory.md`; raw media stays private under `data/instagram-saved/`.
- For Obsidian visual maps, create native `.canvas` boards first. Only use Excalidraw when the plugin is installed and enabled.
- Run targeted tests before claiming work is done.
- Push only intentional changes.

## Copy Rules
- Use plain trade language.
- Avoid tech jargon and AI buzzwords.
- Prefer: REAL LEADS, NO CHASING, NO COMPETING, CONTROL THE JOBS, STAY IN CONTROL.
- Every sentence must earn its place.

## Do Not
- Do not expose paid lead details in free flows.
- Do not fetch planning data in the frontend.
- Do not add placeholder data to production paths.
- Do not overbuild dashboards before lead quality is proven.
- Do not leave Obsidian notes orphaned.

## Current Handoff Prompt
Use this when sending another agent into the repo:

```text
You are working on JobFilter in C:\Users\manaz\Desktop\JobFilter\JobFilterV1.

Read AGENTS.md, AGENT_RUNNING_MODEL.md, and Obsidian_Memory/Obsidian_Vault/Vault Map.md first.
Also read Obsidian_Memory/Obsidian_Vault/JobFilter/Product/Problems and Solutions.md before product copy, pricing, lead delivery, lead gating, or customer trust changes.

Context:
- JobFilter is a UK trades lead intelligence SaaS, not a job board.
- Priority is lead quality, data reliability, paid conversion, then simple UX.
- Free tools may be useful, but free flows must never expose paid lead value.
- Paid value includes buyer, URL, deadline, exact value, exact score/source detail, contact signal, and searchable lead title.
- Recent bug: /find-jobs free preview leaked buyer/deadline/value. Fixes now lock those in server/routes/leadsSearch.ts, functions/index.ts, and src/pages/FindJobsPage.tsx.
- Postcodes must support full format, no-space format, and outward-only format like B10, L10, SY11, SW17. Junk like X10, ZZ99 9ZZ, NOTREAL must fail.

Before claiming done, run:
npm run lint
npm run build
npx tsx codex-output/postcode-filter-regression.mjs
node codex-output/free-scanner-redaction-regression.mjs
node codex-output/free-preview-live-contract-test.mjs
npx tsx codex-output/lead-engine-quality-regression.mjs
npx tsx codex-output/lead-engine-50-plus-quality-test-fixed.mjs

Keep changes scoped. Add short linked Obsidian notes for meaningful changes. Do not stage unrelated .obsidian workspace noise or .claude worktree files.
```

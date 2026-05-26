---
type: lint-report
project: vault
created: 2026-05-22
status: complete
tags: [vault, lint, health, maintenance]
---

# Vault Lint Report — 2026-05-22

## Summary

- Pages scanned: 257
- Files with frontmatter: 42 (16%)
- Files missing frontmatter entirely: 215 (84%)
- Dead wikilinks: 44
- Orphan pages (0 inbound links): 103
- Duplicate filenames (same name, different folders): 9 base names across 22 files
- Near-empty files: 2
- Stale notes (>90 days, 0 inbound): 0 (all content post-April 2026)
- Security risk: 1 (plaintext credential file)
- Missing required folders: 5 (now created this run)
- Vault Map missing AGENTS.md reference: fixed this run

---

## Critical (must fix)

### C1 — Plaintext credential in vault
- File: `JobFilter/SupaBase DB password.md`
- Content is a raw database password string with no frontmatter or context.
- Fix: delete the file. Store in a password manager or .env. Never commit secrets to vault.

### C2 — Dead wikilinks (44 total)

| Dead link | Source file(s) | Count |
|-----------|---------------|-------|
| `[[Sessions/Daily To-Do]]` | Changelogs 2026-05-14 through 2026-05-28 | 15 |
| `[[UI UX Agent]]` | ForgeOS/Agents/Agent Index.md, ForgeOS/Prompts/Prompts Index.md | 2 each |
| `[[Infrastructure Agent]]` | same | 2 each |
| `[[Terminal Systems Agent]]` | same | 2 each |
| `[[Mobile Agent]]` | same | 2 each |
| `[[Research Agent]]` | same | 2 each |
| `[[Product Agent]]` | same | 2 each |
| `[[Brutalist Design Agent]]` | same | 2 each |
| `[[Sessions/Rolling Launch Summary]]` | Changelog 2026-05-20.md | 1 |
| `[[Product/Problems and Solutions]]` | Changelog 2026-05-20.md | 1 |
| `[[System/System]]` | Changelog 2026-05-11.md | 1 |
| `[[feedback_obsidian_first]]` | AGENTS.md line 77 | 1 |
| `[[iLoveAllah]]` | khutba.io/khutba.io Map.md | 1 |
| `[[Youtube Journey]]` | Projects Master Tracker.md | 1 |
| `[[JobFilterV1\]]` | Projects Master Tracker.md (backslash typo) | 1 |
| `[[AI Builder]]`, `[[ForgeOS]]` | Projects Master Tracker.md | 1 each |
| `[[JobFilter]]`, `[[Founder Perks & Money Moves]]`, `[[Media Brand]]` | PostEngine/00_Project Overview.md | 1 each |

Fixes:
- `[[Sessions/Daily To-Do]]` — create `JobFilter/Sessions/Daily To-Do.md` or bulk-update changelogs to bare `[[Daily To-Do]]`.
- ForgeOS agent links in Agent Index / Prompts Index — create stub pages or remove the links.
- `[[feedback_obsidian_first]]` in AGENTS.md — lives in Claude project memory, not vault. Remove link or create a vault stub.
- `[[JobFilterV1\]]` — backslash typo, remove it.
- `[[AI Builder]]`, `[[ForgeOS]]` — these are folders, not files. Link to their index files (`AI Builder - Index`, `ForgeOS Map`) instead.

### C3 — 215 files have no frontmatter (84% of vault)

All files in these folders are fully bare:

- `AgentDock/` — 31 files
- `AI Builder/` — 6 files
- `AI Knowledge/` — 10 files
- `Airdrop Bot/` — 2 files
- `Founder Perks & Money Moves/` — 1 file
- `HANDOFF - 8th May 2026.md` — root level
- `JobFilter/Product/` — most files
- `JobFilter/System/` — most files
- `khutba.io/` — most files
- `System/` root — all files
- `PostEngine/` — 6 files
- `Media Brand/` — 2 files

Any LLM agent relying on `type:` or `tags:` to route context will fail for 84% of this vault. Priority order for patching: JobFilter/Product, JobFilter/System, AI Knowledge, then side projects.

---

## Warnings (should fix)

### W1 — 103 orphan pages (0 inbound links)

Key orphans that break the agent contract:

| File | Why it matters |
|------|---------------|
| `JobFilter/n8n Agent Roster.md` | Primary agent contract — now in Vault Map but no project map links it |
| `AGENTS.md` | LLM contract — now in Vault Map but still orphaned from project files |
| `JobFilter/PersistentMemory.md` | 294 lines of core context, zero inbound |
| `JobFilter/Product/Chase Engine.md` | Core product feature, not reachable |
| `JobFilter/Product/Companies House Signal.md` | Core signal source |
| `JobFilter/Product/Land Registry Signal.md` | Core signal source |
| `JobFilter/Product/Free Tools Strategy.md` | Strategic doc |
| `JobFilter/Product/Document Search Spec.md` | Feature spec |
| `System/JobFilter_Research/` | All 16 deep-research files orphaned |
| `System/Health_Brand_Project/` | All 15 files orphaned (entire project) |
| `PostEngine/` | All 6 files orphaned (entire project) |
| `AI Builder/` | All 6 files orphaned |

Fix: add links from `JobFilter Map.md`, `AgentDock Map.md`, and project index files to these pages.

### W2 — Duplicate filenames (Obsidian resolves by first match — ambiguous for LLMs)

| Filename | Conflicting paths |
|----------|------------------|
| `Competitor Intel - 8th May 2026.md` | AgentDock/Product, JobFilter/System, khutba.io |
| `Research Briefs - 8th May 2026.md` | AgentDock/Product, JobFilter/System, khutba.io |
| `Launch Checklist.md` | AgentDock/Product, JobFilter/Product |
| `Launch Scenarios.md` | AgentDock/Product, JobFilter/Product |
| `MVP Scope.md` | AgentDock/Product, ForgeOS/Product |
| `PersistentMemory.md` | ForgeOS, JobFilter |
| `Pricing.md` | AgentDock/Product, JobFilter/Product |
| `Progress.md` | ForgeOS, JobFilter |
| `Prompts Index.md` | AgentDock/Prompts, ForgeOS/Prompts, JobFilter/Prompts 1 |

Fix: prefix with project slug (e.g. `AgentDock - Launch Checklist.md`) or always use path-qualified links (`[[AgentDock/Product/Launch Checklist]]`).

### W3 — `JobFilter/Daily Brief.md` does not exist

Referenced in AGENTS.md step 3 and roster agent 16 as the canonical LLM entry point. File is missing. LLMs following AGENTS.md read order hit a dead end.

Fix: create a stub or run agent 16 once to bootstrap it.

### W4 — `JobFilter/Agent Schedule.md` does not exist

Agent 00 (Master Orchestrator) reads this to trigger child workflows. Missing.

Fix: create stub with intended schedule table before agent 00 is built.

### W5 — Vault-root `System/` mixes unrelated concerns

Current contents: Health_Brand_Project (a separate product with 15 files), JobFilter_Research (16 deep-research dumps), Agent Prompts (1 file), and one-off 2026-05-09 build notes. Nothing is linked from any map.

Recommended split (pending approval):
- `System/Health_Brand_Project/` → `Health Brand/` (top-level project folder)
- `System/JobFilter_Research/` → `JobFilter/Research/`
- `System/Agent Prompts/` → `JobFilter/System/Build Agent Prompts/`
- Remaining `System/` files → keep (vault-level build notes)

### W6 — `JobFilter/System/` mixes concerns

Contains: competitor research, build notes, test logs, design inspiration, integration maps, and system infrastructure. Per AGENTS.md section 4, competitor intel belongs in `JobFilter/Intel/` (now created).

Recommended migration (pending approval):
- Files matching `*Competitor*`, `*Intel*`, `*Research*` → `JobFilter/Intel/`
- Keep `System Index.md`, `Agent Running Model.md`, `Stripe Keys Reference.md`, `Code Graph.md` in place

### W7 — `HANDOFF - 8th May 2026.md` is stale and was the old primary LLM entry point

Old `Vault Map.md` directed LLMs here first. Now superseded by `AGENTS.md`. File has no frontmatter.

Fix: add a one-line deprecation note at the top pointing to `[[AGENTS]]`. Do not delete — it has historical context.

---

## Suggestions (worth considering)

### S1 — `JobFilter/Prompts 1/` folder name
Inconsistent with `AgentDock/Prompts/` and `ForgeOS/Prompts/`. Rename to `JobFilter/Prompts/`.

### S2 — 18 Changelog files missing `tags:` frontmatter
All have `type: changelog` but no `tags:`. Agent 16 reads changelogs to build daily brief — tags help filter.
Suggested: `tags: [jobfilter, changelog, YYYY-MM]`

### S3 — ForgeOS: 17 files have frontmatter but missing `type:`
LLM agents cannot classify them. Add `type: product-note` or specific types.

### S4 — `Learnings.md` at vault root
Used as append target per AGENTS.md section 6. Has no frontmatter, 0 inbound links. Add frontmatter, link from Vault Map.

### S5 — `Recent.md` at vault root
Near-empty, no frontmatter, no clear purpose. Populate as "recently updated" index or delete.

### S6 — `Projects Master Tracker.md` link rot
`[[JobFilterV1\]]` — backslash typo in wikilink. `[[Youtube Journey]]` — target does not exist.

---

## Actions Taken This Run

| Action | Status |
|--------|--------|
| Created `JobFilter/Agent Runs/README.md` | Done |
| Created `JobFilter/Outcomes/README.md` | Done |
| Created `JobFilter/Revenue/README.md` | Done |
| Created `JobFilter/Territory/README.md` | Done |
| Created `JobFilter/Intel/README.md` | Done |
| Updated `Vault Map.md` — AGENTS.md as step 1, n8n Agent Roster as step 2 | Done |

## Requires User Approval Before Execution

1. Delete `JobFilter/SupaBase DB password.md`
2. Rename 22 duplicate-named files with project prefixes
3. Fix `[[Sessions/Daily To-Do]]` dead link in 15 changelogs
4. Create `JobFilter/Daily Brief.md` stub
5. Create `JobFilter/Agent Schedule.md` stub
6. Move `System/Health_Brand_Project/` to top-level `Health Brand/`
7. Move `System/JobFilter_Research/` to `JobFilter/Research/`
8. Rename `JobFilter/Prompts 1/` to `JobFilter/Prompts/`
9. Mass-add frontmatter to 215 files (needs template and batch agent approval)

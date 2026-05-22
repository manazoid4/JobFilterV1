---
type: llm-contract
purpose: Entry-point for any LLM agent reading this vault
created: 2026-05-22
tags: [agents, contract, vault-index]
---

# LLM Agent Contract — How to Read This Vault

Any LLM agent (Claude, n8n LLM nodes, GPT, local models) entering this vault MUST:

## 1. Read order

1. This file (`AGENTS.md`)
2. `Vault Map.md` — folder layout
3. `JobFilter/Daily Brief.md` — today's canonical context (rebuilt 6:50am by agent 16)
4. Project file for task at hand

## 2. Project entry points

| Project | Entry file |
|---------|-----------|
| JobFilter | `JobFilter/n8n Agent Roster.md` |
| AgentDock | `AgentDock.md` |
| Khutba.io | `khutba.io/` |
| Media Brand | `Media Brand/` |
| ForgeOS | `ForgeOS/` |
| PostEngine | `PostEngine/` |
| Airdrop Bot | `Airdrop Bot/` |

## 3. Canonical file format

Every machine-written note:

```yaml
---
type: <agent-run|roster|brief|outcome|...>
agent: <name>
run_at: <ISO 8601>
status: success|failure
tags: [project, type, ...]
---

# Title

## Summary
≤3 lines plain English. LLM reads first.

## Raw payload
```json
{ ... }
```
```

## 4. Where things live

| Concern | Folder |
|---------|--------|
| n8n agent runs | `JobFilter/Agent Runs/YYYY-MM-DD/` |
| Lead outcomes | `JobFilter/Outcomes/` |
| Revenue / Stripe | `JobFilter/Revenue/` |
| Territory reports | `JobFilter/Territory/` |
| Competitor intel | `JobFilter/Intel/` |
| Daily brief | `JobFilter/Daily Brief.md` |
| Changelogs | `JobFilter/Changelog YYYY-MM-DD.md` |
| Vault map | `Vault Map.md` |
| AI knowledge | `AI Knowledge/` |
| Build specs | `AI Builder/` |

## 5. Write rules

- Filenames kebab-case lowercase (new files)
- Frontmatter first, always
- Link related w/ `[[wikilink]]`
- Never overwrite — append or version w/ timestamp
- Save proactively, no permission ask (per [[feedback_obsidian_first]])

## 6. Save targets

| What | Where |
|------|-------|
| Agent run output | `JobFilter/Agent Runs/<date>/<agent>-<HHmm>.md` |
| Outcome log | `JobFilter/Outcomes/<lead-id>.md` |
| New learning | `Learnings.md` (append) |
| Decision record | `<Project>/Decisions/<date>-<slug>.md` |

## 7. LLM pre-flight checklist (JobFilter task)

- [ ] Read `JobFilter/Daily Brief.md`
- [ ] Read `JobFilter/n8n Agent Roster.md`
- [ ] Check last 3 `JobFilter/Changelog *.md`

## Related
- [[Vault Map]]
- [[JobFilter/n8n Agent Roster]]
- [[Learnings]]

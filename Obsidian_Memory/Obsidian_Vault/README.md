# JobFilter Obsidian Knowledge Vault

This is the central knowledge vault for the JobFilter project — a UK trade lead intelligence platform. All product thinking, research, agent outputs, marketing strategy, and operational logs live here.

## Folder Structure

| Folder | Purpose |
|--------|---------|
| `00_Inbox` | Unprocessed notes, quick captures, items to triage |
| `01_Company` | Company strategy, mission, positioning, investor materials |
| `02_Product` | Product roadmap, features, specs, design decisions |
| `03_Marketing` | Marketing strategy, copy, campaigns, social content |
| `04_Sales` | Sales pipeline, lead intelligence, pricing, revenue |
| `05_Research` | Market research, competitor analysis, data sources |
| `06_Agents` | Agent system definitions, prompts, orchestration maps |
| `07_Logs` | Daily changelogs, session logs, agent run logs |
| `08_Video_Notes` | Video script notes, video-based research |
| `99_Archive` | Superseded notes, old drafts — kept for reference |
| `JobFilter/` | Primary working folder (legacy structure, actively maintained) |

## How Agents Interact With This Vault

Claude Code agents (and n8n automation agents) read and write to this vault as their persistent memory layer:

- **Read**: Agents load context from `JobFilter/PersistentMemory.md`, changelogs, and MOC files before starting work
- **Write**: Agents append session logs to `JobFilter/07_Logs/`, update changelogs in `JobFilter/`, and store research outputs in the appropriate subfolders
- **Orchestration**: The `JobFilter/Agent Schedule.md` and `JobFilter/n8n Agent Roster.md` define which agents run when
- **Maps**: `JobFilter/JobFilter HQ.md`, `JobFilter/Product Map.md`, and `JobFilter/Agent System Map.md` serve as navigation hubs

## Vault Rules

- Never store secrets, API keys, or credentials in this vault
- Raw agent outputs go to `07_Logs/` or `06_Agents/` before being distilled
- Superseded content moves to `99_Archive/` rather than being deleted
- Commit after every significant session with a descriptive message

## Repo

Private GitHub repo: `manazoid4/JobFilter-Obsidian-Vault`

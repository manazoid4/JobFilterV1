---
type: agent-roster
project: JobFilter
stack: n8n community edition (self-hosted, free)
status: planned
created: 2026-05-22
tags: [n8n, agents, automation, jobfilter]
related:
  - "[[JobFilter Control Map.canvas]]"
  - "[[Vault Map]]"
---

# JobFilter — n8n Agent Roster

Single source of truth. All JobFilter automation runs via n8n community edition. Workflows live in `JobFilterV1/n8n-workflows/`.

## Setup (once)

```bash
npm install -g n8n && n8n start
```

http://localhost:5678 → import workflows.

## API surface

| Endpoint | Method | Body | Tier |
|----------|--------|------|------|
| `/api/leads/search` | POST | `{ postcode, trade, radiusMiles }` | free preview |
| `/api/start-signals/search` | POST | same | paid (or `FULL_ACCESS_TEST_MODE=true`) |
| `/api/start-signals/:id/feedback` | POST | `{ status }` | open |
| `/api/intake-score` | POST | scoring input | open |
| `/api/lead-notify` | POST | notification | open |
| `/api/chase-check` | POST | follow-up | open |
| `/api/outcome-report` | POST | outcome | open |
| `/api/territory-summary` | GET | — | open |
| `/api/material-prices` | GET | — | open |
| `/api/waitlist-count` | GET | — | open |
| `/api/calendar-export` | GET | — | open |
| `/api/status` | GET | health | open |

Trades: `plumbing electrical roofing building carpentry painting hvac landscaping`.
Feedback statuses: `won lost too_early not_real real_but_uncontactable ignored`.

## Agents

Built (in `n8n-workflows/`):

| # | Agent | Cron | Endpoint |
|---|-------|------|----------|
| 01 | Daily Lead Digest | Mon–Fri 7am | `/api/leads/search` |
| 02 | READY Signal Alert | every 2h | `/api/start-signals/search` |
| 03 | Multi-Trade Weekly Sweep | Mon 8am | `/api/leads/search` ×N |

To build (priority order):

| # | Agent | Cron | Purpose |
|---|-------|------|---------|
| 04 | Vault Writer | sub-workflow | Reusable node block — writes any payload to `JobFilter/Agent Runs/YYYY-MM-DD/<agent>-<HHmm>.md` |
| 05 | Lead Dedup Memory | sub-workflow | Reads `JobFilter/Agent Runs/.seen-lead-ids.json`, filters seen IDs, writes back |
| 06 | Outcome Logger | webhook | Inbound "won/lost" → `/api/start-signals/:id/feedback` → vault `JobFilter/Outcomes/` |
| 07 | Material Price Watcher | daily 6am | `/api/material-prices` diff vs snapshot, alert on >5% spike |
| 08 | Territory Summary | Sun 9am | `/api/territory-summary` → vault `JobFilter/Territory/` |
| 09 | Waitlist Health | hourly | `/api/waitlist-count` → alert on 10/50/100/500 milestones |
| 10 | Stripe Webhook → Vault | webhook | Stripe events → `JobFilter/Revenue/YYYY-MM-DD.md` |
| 11 | Chase Check Reminder | daily 10am | Leads aged 3/7/14d no outcome → `/api/chase-check` + email |
| 12 | Intake Score Triage | webhook | New intake → `/api/intake-score` → routes gold/silver/bronze folder |
| 13 | Calendar Sync | daily 6pm | `/api/calendar-export` → push ICS to Google/Outlook |
| 14 | Source Health Watchdog | every 4h | `/api/status` → alert on source down |
| 15 | Competitor Watch | weekly | `/api/leads/search` on competitor postcodes → diff weekly |
| 16 | LLM Brief Builder | daily 6:50am | Reads last 7d of `JobFilter/Agent Runs/` → builds `JobFilter/Daily Brief.md` = canonical context entry point for LLMs |
| 00 | Master Orchestrator | every 1min | Reads `JobFilter/Agent Schedule.md` from vault, triggers child workflows. Edit vault → schedule updates. |

## Vault save convention (every agent must follow)

Path:

```
JobFilter/Agent Runs/{{yyyy-MM-dd}}/{{agentSlug}}-{{HHmm}}.md
```

Body template:

```markdown
---
agent: <agent-name>
run_at: <ISO 8601>
trigger: cron|webhook|manual
status: success|failure
counts: { leads: N, ready: N, gold: N }
tags: [jobfilter, agent-run, <agent-slug>]
---

# <Agent> — <date>

## Summary
Plain English, ≤3 lines. LLM reads this first.

## Raw payload
```json
<full API response>
```

## Actions taken
- bullet
```

## LLM-readability rules

1. Frontmatter first. Required: `agent run_at status tags`
2. Summary section second. ≤3 lines plain English
3. Raw payload in fenced ```json block — no truncation
4. No binaries in vault — links only
5. Filenames kebab-case lowercase
6. Folder per concern: `Agent Runs/ Outcomes/ Revenue/ Territory/ Intel/`
7. One `JobFilter/Daily Brief.md` rebuilt every morning = canonical LLM entry point

## Reusable n8n blocks

| Block | Node type | Use |
|-------|-----------|-----|
| Write Vault Note | Filesystem `Write Binary File` | Save md to vault |
| Read Vault Note | Filesystem `Read Binary File` | Prior-run diff/dedup |
| Format Frontmatter | Code | YAML header builder |
| Slack Push | Slack webhook | Alt notify |
| Telegram Push | Telegram bot | Mobile alt |
| Stripe Webhook | Webhook trigger | Inbound payment |

## n8n Variables (Settings → Variables)

```
JOBFILTER_SERVER_URL = http://localhost:3000
JOBFILTER_POSTCODE   = M1 1AA
JOBFILTER_RADIUS     = 20
JOBFILTER_TRADES     = ["plumbing","electrical","roofing"]
VAULT_PATH           = C:/Users/manaz/Desktop/JobFilter/JobFilterV1/Obsidian_Memory/Obsidian_Vault
NOTIFY_EMAIL         = manazoid4@gmail.com
```

Every HTTP node references `{{ $vars.JOBFILTER_SERVER_URL }}`. Change once → all agents update.

## Related
- [[JobFilter Control Map.canvas]]
- [[Vault Map]]
- Workflows folder: `JobFilterV1/n8n-workflows/`
- Setup: `JobFilterV1/n8n-workflows/SETUP.md`

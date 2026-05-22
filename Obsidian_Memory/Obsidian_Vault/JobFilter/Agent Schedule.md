---
type: agent-schedule
project: JobFilter
updated: 2026-05-22
status: live
tags: [jobfilter, schedule, n8n]
related: ["[[n8n Agent Roster]]", "[[n8n Workflow IDs]]"]
---

# JobFilter — Agent Schedule

Edit to change triggers. Future agent 00 reads this and pushes via n8n API.

| Agent | Cron (UTC) | Type | n8n ID |
|-------|-----------|------|--------|
| 01 Daily Lead Digest | `0 7 * * 1-5` | cron | `hlT2YtrEBHMS0mwt` |
| 02 READY Signal Alert | `0 */2 * * *` | cron | `DbfARpb9uVhOdie7` |
| 03 Multi-Trade Sweep | `0 8 * * 1` | cron | `67CVueXovSGu1l50` |
| 04 Vault Writer | — | sub-workflow | `KPPRqOtDhPJhe7Kc` |
| 05 Lead Dedup Memory | — | sub-workflow | `XbhFFSqPXg7OT48c` |
| 06 Outcome Logger | — | webhook `/jobfilter-outcome` | `2Oar5tVrrKQWxyN3` |
| 07 Material Price Watcher | `0 6 * * *` | cron | `wK1QMco772GKXSQl` |
| 08 Territory Summary | `0 9 * * 0` | cron | `mJ2jqkaEcljpAG3a` |
| 09 Waitlist Health | `0 * * * *` | cron | `XylHASk4kvRZmsLt` |
| 10 Stripe Webhook | — | webhook `/jobfilter-stripe` | `2f4zmgH6jVn5ekhZ` |
| 11 Chase Check Reminder | `0 10 * * *` | cron | `93yhO5CYnzrGdq92` |
| 12 Intake Score Triage | — | webhook `/jobfilter-intake` | `NMO8gGyB1vy6jHcW` |
| 13 Calendar Sync | `0 18 * * *` | cron | `enCGdpU5usm1Hy84` |
| 14 Source Health Watchdog | `0 */4 * * *` | cron | `u5sWqnbh4gXY7oKj` |
| 15 Competitor Watch | `0 7 * * 2` | cron | `zxjXt1x1yZA1YGN9` |
| 16 LLM Brief Builder | `50 6 * * *` | cron | `dkeRwtZ1lygxeY0w` |

## Wiring to-do after push
- 06 webhook URL → share w/ CRM / alert click-through
- 10 webhook URL → paste into Stripe dashboard
- SMTP credential → attach to email nodes in 01/02/03

## Refresh
```
node scripts/n8n-push.mjs
```

## Related
- [[n8n Agent Roster]]
- [[n8n Workflow IDs]]
- [[RALPH_PLAN]]
- [[AGENTS]]

---
type: n8n-registry
project: JobFilter
updated: 2026-05-22
status: live
tags: [n8n, ids, registry, jobfilter]
related:
  - "[[n8n Agent Roster]]"
  - "[[RALPH_PLAN]]"
---

# n8n Workflow IDs (Live)

Pushed via `scripts/n8n-push.mjs` against `http://localhost:5678`. IDs needed when one workflow calls another (Execute Workflow node).

## Active registry

| File | Name | ID | Type |
|------|------|----|------|
| `01-daily-lead-digest.json` | JobFilter — Daily Lead Digest | `hlT2YtrEBHMS0mwt` | cron |
| `02-ready-signal-alert.json` | JobFilter — READY Signal Alert | `DbfARpb9uVhOdie7` | cron |
| `03-multi-trade-sweep.json` | JobFilter — Multi-Trade Weekly Sweep | `67CVueXovSGu1l50` | cron |
| `04-vault-writer.json` | JobFilter — 04 Vault Writer (sub-workflow) | `KPPRqOtDhPJhe7Kc` | sub-workflow |
| `16-llm-brief-builder.json` | JobFilter — 16 LLM Brief Builder | `dkeRwtZ1lygxeY0w` | cron |

## Wire-up needed (cross-workflow calls)

Any workflow w/ `Log Run via Vault Writer` node → set `workflowId` to:
```
KPPRqOtDhPJhe7Kc
```

## Refresh

```bash
node scripts/n8n-push.mjs
```

Result log: `n8n-workflows/.last-push.json`

## Notes
- Workflows pushed as **inactive** by default. Activate in n8n UI (toggle top-right) or via PATCH after credentials wired.
- Email send nodes need SMTP credential attached before activation.
- Any JSON change → re-run `n8n-push.mjs` → idempotent update by workflow name.

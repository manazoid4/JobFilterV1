---
type: folder-readme
project: JobFilter
purpose: Stores n8n agent run outputs
tags: [jobfilter, agent-runs, automation]
created: 2026-05-22
---

# JobFilter / Agent Runs

One subfolder per date: `YYYY-MM-DD/`. Each run file follows the convention:

```
YYYY-MM-DD/<agent-slug>-<HHmm>.md
```

Required frontmatter per file: `agent`, `run_at`, `trigger`, `status`, `tags`.
Required sections: `## Summary` (<=3 lines), `## Raw payload` (fenced json), `## Actions taken`.

LLM agents: read the most recent subfolder to get current state before acting.
See [[JobFilter/n8n Agent Roster]] for agent definitions.

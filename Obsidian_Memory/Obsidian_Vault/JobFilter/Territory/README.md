---
type: folder-readme
project: JobFilter
purpose: Weekly territory intelligence reports by postcode/region
tags: [jobfilter, territory, intel]
created: 2026-05-22
---

# JobFilter / Territory

One file per weekly report: `YYYY-MM-DD-territory.md`.
Written by agent 08 (Territory Summary) every Sunday 9am from `/api/territory-summary`.

Required frontmatter: `type: territory-report`, `week`, `tags`.

LLM agents: read the most recent file for active territory coverage before generating regional lead briefs.
See [[JobFilter/n8n Agent Roster]] for agent 08 definition.

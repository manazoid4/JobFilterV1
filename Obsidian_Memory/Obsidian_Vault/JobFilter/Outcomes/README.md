---
type: folder-readme
project: JobFilter
purpose: Lead outcome records (won/lost/chased)
tags: [jobfilter, outcomes, leads]
created: 2026-05-22
---

# JobFilter / Outcomes

One file per lead: `<lead-id>.md`.
Written by agent 06 (Outcome Logger) when a won/lost/feedback event arrives via webhook.

Required frontmatter: `type: outcome`, `lead_id`, `status` (won|lost|too_early|ignored), `tags`.

LLM agents: scan this folder to understand conversion rate and lead quality before making scoring decisions.
See [[JobFilter/n8n Agent Roster]] for agent 06 definition.

---
type: folder-readme
project: JobFilter
purpose: Stripe payment events and revenue snapshots
tags: [jobfilter, revenue, stripe]
created: 2026-05-22
---

# JobFilter / Revenue

One file per date: `YYYY-MM-DD.md`.
Written by agent 10 (Stripe Webhook -> Vault) on each payment event.

Required frontmatter: `type: revenue-snapshot`, `date`, `tags`.

LLM agents: read the latest file for current MRR/ARR context before pricing or conversion decisions.
Stripe keys live in [[JobFilter/System/Stripe Keys Reference]] — do not store keys here.

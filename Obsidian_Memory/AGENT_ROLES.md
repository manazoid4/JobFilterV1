---
type: meta
status: developing
created: 2026-04-28
updated: 2026-04-28
links:
  - "[[coordinator-agent-codex-loop]]"
  - "[[CURRENT_STATE]]"
  - "[[SYSTEM_ARCHITECTURE]]"
  - "[[TODO_NEXT]]"
---
# Agent Roles

## Builder
**Purpose**: Ship code that moves product toward revenue.
**Reads**: [[TODO_NEXT]], [[SYSTEM_ARCHITECTURE]], current repo state.
**Writes**: code, commits, PRs.
**Constraint**: No refactors during conversion sprint. Surgical edits only.
**Skills**: `/wiki`, direct Edit/Write tools.

## Researcher
**Purpose**: Pull external knowledge — APIs, libraries, market data — into wiki.
**Reads**: web, docs, GitHub repos.
**Writes**: `wiki/concepts/`, `wiki/sources/` pages with citations.
**Constraint**: Cite sources. No invented facts.
**Skills**: WebSearch, WebFetch, `/autoresearch`.

## Reviewer
**Purpose**: Catch regressions before ship. Audit quality.
**Reads**: PR diff, [[CURRENT_STATE]], lint output.
**Writes**: review notes, audit reports.
**Constraint**: Block on conversion-killers (broken CTA, fake data leak, paywall bypass). Approve everything else.
**Skills**: code-reviewer, security-reviewer subagents.

## Coordinator
**Purpose**: Orchestrate the loop. Read outputs, prioritise, dispatch.
**Reads**: `codex-output/`, [[TODO_NEXT]], [[CURRENT_STATE]].
**Writes**: next-cycle task prompts in `claude-notes/`.
**Constraint**: Priority order — clarity → structure → conversion. Never write code directly.
**Pattern**: See [[coordinator-agent-codex-loop]].

## Loop
```
Coordinator -> Builder -> Reviewer -> Coordinator
                   ^
              Researcher (on demand)
```

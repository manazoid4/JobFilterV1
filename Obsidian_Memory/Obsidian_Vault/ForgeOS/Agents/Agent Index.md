---
tags: [forgeos, agents, index]
created: 2026-05-11
project: ForgeOS
---

# ForgeOS — Agent Index

← [[ForgeOS Map]]

## Agent Roster

| Agent | Domain | Owned Files |
|-------|--------|-------------|
| [[UI UX Agent]] | Interface design | frontend/components/ |
| [[Infrastructure Agent]] | Backend, WebSocket, tmux | backend/src/ |
| [[Terminal Systems Agent]] | xterm.js, PTY | Terminal components |
| [[Mobile Agent]] | Responsive UI, touch | mobile CSS |
| [[Research Agent]] | Competitor analysis | research/ |
| [[Product Agent]] | Positioning, copy | MVP_SCOPE.md |
| [[Brutalist Design Agent]] | Visual language | design/ |

## Activity Feed Parser (Infrastructure Agent)

Parses PTY stdout into structured events:

```
Modified <path>    → file_edit
$ <command>        → command
Build passed       → build_pass
Build failed       → build_fail
Deployed to        → deploy_success
? / (Y/n)          → agent_waiting
```

## Voice Control Prep (Phase 3)

All actions map to REST endpoints now:
- "Resume JobFilter session" → POST /api/workspaces/:id/resume
- "Show active builders" → GET /api/workspaces?status=active
- "Stop all" → POST /api/workspaces/stop-all

## Connected Notes

[[ForgeOS Map]] · [[Design System]] · [[Session Architecture]] · [[Prompts Index]]

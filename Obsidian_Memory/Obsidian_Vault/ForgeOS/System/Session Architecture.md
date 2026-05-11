---
tags: [forgeos, system, architecture, sessions]
created: 2026-05-11
project: ForgeOS
---

# ForgeOS — Session Architecture

← [[ForgeOS Map]] · [[MVP Scope]]

## Core Principle

Every Workspace = tmux session + WebSocket bridge.
Client is stateless. Server holds all state.
Disconnect loses nothing.

## Stack

```
Client (React/Next.js + xterm.js)
    ↕ WebSocket + REST
Forge Server (Node.js/Fastify)
  - Session Manager
  - WebSocket Hub
  - PTY Manager (node-pty)
  - Activity Parser
  - Notification Engine
  - Persistence (JSON → Supabase Phase 2)
    ↕ exec/spawn
tmux (named sessions per Workspace)
```

## Session Lifecycle

1. Create: POST /api/workspaces → tmux new-session → node-pty → WebSocket
2. Stream: PTY output → WebSocket → xterm.js
3. Disconnect: tmux keeps running · buffer scrollback · status = IDLE
4. Resume: WebSocket reconnect → attach → replay 2000 lines → ACTIVE
5. Stop: tmux kill-session → status = STOPPED

## WebSocket Messages

Server → Client: terminal_data · activity_event · status_change · notification · scrollback
Client → Server: terminal_input · terminal_resize · ping

## Activity Parser

Parses stdout for: file_edit · command · build_pass · build_fail · deploy_success · agent_waiting

## Phase 2: Multi-Node

Tailscale mesh + forge-agent daemon on each remote node

## Connected Notes

[[MVP Scope]] · [[Tech Stack]] · [[Build Log - 11 May 2026]] · [[ForgeOS Map]]

---
tags: [forgeos, memory, persistent]
created: 2026-05-11
project: ForgeOS
---

# ForgeOS — Persistent Memory

This file is read by AI agents at the start of every session to restore context.

## Project Identity

**Name:** ForgeOS
**Codename:** FORGE / RELAY / THREAD
**Vision:** Spotify Connect for AI workspaces
**Phase:** 1 — MVP
**Location:** C:\Users\manaz\Desktop\ForgeOS

## Core Architecture (Always Load)

- Backend: Node.js + Fastify + WebSockets + node-pty + tmux
- Frontend: React + Next.js + Tailwind + Framer Motion + xterm.js
- Session persistence: tmux sessions + JSON workspace store
- Activity feed: stdout regex parser (not LLM inference)
- Phase 1: single-user, local network only

## Key Decisions (Do Not Revisit)

1. Phase 1 persistence: JSON on disk (not Supabase — added Phase 2)
2. Mobile: PWA first, native app Phase 3 only
3. Activity parser: regex not LLM — fast, cheap, deterministic
4. tmux session naming: forge-<workspaceId> prefix
5. No auth in Phase 1 — single user, local

## Vocabulary Lock

| Never say | Always say |
|-----------|-----------|
| tmux session | Workspace |
| terminal pane | Task |
| SSH host | Node |
| reconnect | Resume |

## File Ownership

See [[Agent Index]] for which agent owns which files.

## Session Log

See [[Build Log - 11 May 2026]] for most recent work.

## Connected Notes

[[ForgeOS Map]] · [[Progress]] · [[Agent Index]] · [[Session Architecture]]

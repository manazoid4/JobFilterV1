---
tags: [forgeos, product, overview]
created: 2026-05-11
project: ForgeOS
---

# ForgeOS — Product Overview

← [[ForgeOS Map]] | Related: [[MVP Scope]] · [[Roadmap]] · [[Design System]]

## What It Is

ForgeOS is the operating system for AI operators.

Not another SSH client. Not another terminal emulator. Not another remote desktop.

**"Spotify Connect for AI workspaces."**

## The Problem

Modern AI operators work across desktop · laptop · phone · remote servers · cloud GPUs.

Current workflow to resume an AI session: SSH → find tmux session → attach → hope context survived.

This is avoidable friction.

## The Solution

| What it is | What you see |
|------------|-------------|
| tmux session | **Workspace** |
| terminal pane | **Task** |
| SSH host | **Node** |
| stdout stream | **Activity Feed** |
| tmux attach | **Resume** |

## Core Features

See [[MVP Scope]] for Phase 1 detail.

1. Session Dashboard — workspace cards with live AI status
2. Persistent Sessions — survive disconnects, device changes
3. Mobile-First UI — actually good on a phone
4. Live Terminal Streaming — WebSocket, xterm.js
5. AI Activity Feed — file edits · builds · deploys · waiting states
6. Notifications — push when build fails or agent waits
7. Resume Anywhere — 1 tap, any device

## Target User

AI builders running autonomous agents. Founders deploying from multiple locations. Anyone who has lost a Claude Code session.

## Market Position

See [[Market Gaps]] for full analysis. No competitor does this.

## Related Projects

[[JobFilter Product overview]] · [[AgentDock Product Overview]]

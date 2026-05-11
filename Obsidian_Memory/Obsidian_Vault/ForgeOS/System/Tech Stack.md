---
tags: [forgeos, system, tech, stack]
created: 2026-05-11
project: ForgeOS
---

# ForgeOS — Tech Stack

← [[ForgeOS Map]] · [[Session Architecture]]

## Frontend

- **React + Next.js** — framework
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **xterm.js** — terminal rendering (with fit addon)
- **WebSocket client** — built-in browser API

## Backend

- **Node.js + Fastify** — HTTP server (faster than Express, better TypeScript)
- **ws (WebSocket)** — WebSocket server
- **node-pty** — PTY spawning and management
- **tmux** — session persistence layer (system dependency)

## Phase 2 Additions

- **Supabase** — PostgreSQL + Auth
- **Tailscale** — secure multi-node mesh networking
- **Docker** — containerized node agents

## Dev Tools

- TypeScript throughout
- Vitest for testing
- ESLint + Prettier

## Why Fastify over Express

- 2x faster request throughput
- Built-in TypeScript support
- Schema validation built-in
- Better WebSocket plugin ecosystem

## Connected Notes

[[Session Architecture]] · [[ForgeOS Map]] · [[MVP Scope]]

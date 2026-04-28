---
type: meta
status: developing
created: 2026-04-28
updated: 2026-04-28
links:
  - "[[AGENT_ROLES]]"
---
# System Architecture

## Product Flow

```
[UK planning portals + contract notices]
            |
            v  (scrape / API)
     [Lead Ingestion Service]
            |
            v
     [Filter & Score Engine]
            |
            v  (qualified leads)
     [Subscriber DB]  <--  [Stripe paywall]
            |
            v  (daily 7am)
     [WhatsApp Delivery]
            |
            v
        [Tradesman]
```

## Code Layers

| Layer | Stack | Status |
|---|---|---|
| Hosting | Firebase Hosting | live |
| Frontend (live) | Alpine.js + Vite + TS + Tailwind 4 | live |
| Frontend (queued) | React 19 + Vite + TS + Tailwind 4 | built, not entry |
| API | Firebase Functions (Node) | wired |
| Payments | Stripe | wired, not validated e2e |
| Lead Source | TBD | **missing** |
| Delivery | TBD (Twilio / Whapi) | **missing** |
| CI/CD | GitHub Actions | working |

## Agent System

| Agent | Trigger | Reads | Writes |
|---|---|---|---|
| Coordinator | queue every 30min | `codex-output/` | `claude-notes/` task prompts |
| Codex Builder | Coordinator prompt | task prompt + repo | code commits |
| Audit | sprint directive | full repo | `AUDIT-REPORT.md` |
| Researcher | on demand | docs / web | wiki pages |
| Reviewer | post-PR | diff + tests | review notes |

See [[AGENT_ROLES]] for full role definitions.

## Wiki Vault
Path: `Obsidian_Memory/wiki/`
- `concepts/` — domain definitions
- `systems/` — tech stack pages
- `sessions/` — Claude conversation digests
- `agents/` — sub-agent task digests
- `sources/` — raw JSONL conversation logs
- `meta/` — dashboards, lint reports

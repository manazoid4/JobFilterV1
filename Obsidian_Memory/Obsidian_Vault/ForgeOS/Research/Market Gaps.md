---
tags: [forgeos, research, market, competitors]
created: 2026-05-11
project: ForgeOS
---

# ForgeOS — Market Gaps

← [[ForgeOS Map]] | Full report: MARKET_GAPS_REPORT.md in ForgeOS project

## Verdict: Gap Confirmed

11 competitors researched. None have AI session continuity.

## Competitor Snapshot

| Tool | Type | Gap |
|------|------|-----|
| Termius | SSH client | Syncs credentials, not sessions |
| Warp | Terminal | Desktop only, no mobile, no persistence |
| Tabby | Terminal | No AI, no persistence |
| VSCode Remote | IDE | Requires active connection, no mobile |
| tmux | Multiplexer | Correct backend, terrible UX, no mobile |
| OpenCode | AI CLI | No persistence, no mobile |
| Claude Code | AI Agent | THE use case — CLI only, no mobile feed |
| Codespaces | Cloud IDE | Browser only, no mobile-first |
| Replit | Online IDE | Not for power users |
| Cursor | AI Editor | Desktop only, agent blind from outside |
| Zed | Editor | Fast, no session management |

## Five Confirmed Gaps

1. No mobile-first AI supervision — nobody built it
2. No modern UX on tmux — unusable for non-Linux experts
3. No AI activity feed — what did the AI actually DO?
4. No cross-device notifications — nobody tells you when build fails
5. No cross-device continuity — Spotify Connect doesn't exist for AI sessions

## Positioning

Not competing with: Cursor, Zed, VSCode (run INSIDE ForgeOS workspaces)
Not competing with: Claude Code, Codex (AI providers ForgeOS connects to)
Competing with: raw tmux + SSH friction stack

## Connected Notes

[[Product Overview]] · [[MVP Scope]] · [[ForgeOS Map]]

---
type: session-note
date: 2026-05-28
tags: [session, skills, ultrawork, claude-code]
---

# Session 2026-05-28 - Skills Install + Ultrawork Mode

## What Happened

Installed 10 custom Claude Code skills from ComposioHQ/awesome-claude-skills into ~/.claude/skills/. Created /ultrawork meta-skill that chains them all.

## Skills Installed

All skills live at C:\Users\manaz\.claude\skills\<skill-name>\SKILL.md

| Skill | Purpose |
|-------|---------|
| lead-research-assistant | Find trade business leads, B2B targets |
| competitive-ads-extractor | Analyze Checkatrade/Bark/Rated People ads |
| content-research-writer | SEO blog posts, trade page copy |
| changelog-generator | Weekly release notes from git |
| webapp-testing | Playwright E2E verification |
| twitter-algorithm-optimizer | Optimize tweets for reach |
| mcp-builder | Build UK data source MCP servers |
| internal-comms | 3P updates, incident reports |
| canvas-design | Visual assets, posters, graphics |
| ultrawork | Chains all of the above - invoke with /ultrawork |

## Ultrawork Protocol

Say "ultrawork" -> all relevant skills activate based on context. No confirmation prompts. Autonomous end-to-end execution. Always ends with: Obsidian vault update + GitHub push.

## PRs Confirmed Merged

All prior PRs (#196-#205) merged. Zero open PRs at time of this session.

## TODO - Meta-Skill (Rebelytics)

Reddit user u/rebelytics shared a highly-upvoted meta-skill that observes your work and automatically improves your other skills over time. The GitHub repo was shared in comments but URL not captured. Need to:
- Find the repo (search GitHub for rebelytics or check r/ClaudeAI thread)
- Install it as a Claude Code skill
- Add to ultrawork chain

## Context

Research-backed trade page updates (PR #205) pushed stats for Solar, Gas, HVAC, CCTV, EV Charger pages using MCS, Gas Safe register, REFCOM, IBISWorld, OZEV data. Vault digest GitHub Action also added (.github/workflows/vault-digest.yml).

---
type: session
status: complete
created: 2026-04-26
updated: 2026-04-28
links:
  - "[[Caveman Mode]]"
  - "[[GitHub Actions]]"
  - "[[Remote Agents]]"
  - "[[Scheduled Routines]]"
---
# Remote Agent Scheduling via /schedule Command

## Summary
User invoked `/schedule` from outside the git repo (cwd: `C:\Users\manaz`). The schedule skill loads a full workflow for creating, listing, updating, or running remote CCR (Claude Code Remote) agents on Anthropic's cloud infrastructure. No MCP connectors were connected at the time.

## Key Decisions
- Remote agents run in Anthropic's cloud — cannot access local files or env vars
- Minimum cron interval is 1 hour (`*/30 * * * *` is rejected)
- User timezone: Europe/London — all cron expressions converted to UTC
- Three cloud environments available: `env_017oFn41cpMcnJnVFsRb4mHc`, `env_011GwhQxaSXnyTioo6Ym9jBQ`, `env_01BVh6SoGLpATmkjTdNxh4n8`
- Session NOT inside a git repo — repo URL must be specified manually for any routine

## Concepts Touched
[[Remote Agents]] | [[Scheduled Routines]] | [[Caveman Mode]]

## Systems Touched
[[GitHub Actions]]

## Output
Schedule skill loaded and workflow options presented to user. Scheduling intent outcome not visible in ingested lines.

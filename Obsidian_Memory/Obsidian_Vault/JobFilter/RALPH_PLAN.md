---
type: ralph-plan
project: JobFilter
created: 2026-05-22
updated: 2026-05-22
status: active
loop: autonomous-dynamic
north_star: "One strong lead per week worth paying for. Lead quality > UI. Push to paid intake subscription."
tags: [ralph, plan, autonomous, jobfilter]
---

# JobFilter Ralph Loop — Master Plan

Read top to bottom. Do next unchecked item. Commit + push every iteration. Update this file. Repeat.

## North star (every decision must serve)
1. Lead quality beats volume
2. One paid-tier-worthy lead per week minimum
3. Free tier stays useful — real value locked behind subscription
4. All automation saves to vault for LLM continuity

## Iteration queue

### Foundation (unblocks everything)
- [x] n8n workflows folder + 3 starter agents (01-03)
- [x] Write `AGENTS.md` LLM contract
- [x] Write `n8n Agent Roster.md` (16 agents planned)
- [x] Agent 04 — Vault Writer sub-workflow
- [x] Agent 16 — LLM Brief Builder (daily LLM context refresh)
- [ ] Agent 05 — Lead Dedup Memory (kills repeat-alert noise)

### Lead-quality core (drives paid conversion)
- [ ] Agent 02v2 — READY signal alert w/ dedup wired
- [ ] Agent 06 — Outcome Logger (closes feedback loop)
- [ ] Agent 11 — Chase Check Reminder (recovers warm leads)
- [ ] Agent 14 — Source Health Watchdog (dead sources = junk)

### Revenue surface
- [ ] Agent 10 — Stripe Webhook → Vault
- [ ] Agent 09 — Waitlist Health milestones
- [ ] Agent 12 — Intake Score Triage (gold/silver/bronze)

### Intel + context
- [ ] Agent 07 — Material Price Watcher
- [ ] Agent 08 — Territory Summary
- [ ] Agent 13 — Calendar Sync
- [ ] Agent 15 — Competitor Watch
- [ ] Agent 00 — Master Orchestrator

### Polish
- [ ] Centralise n8n Variables config
- [ ] Slack + Telegram swap-in docs
- [ ] `FULL_ACCESS_TEST_MODE` toggle helper
- [ ] Update `Vault Map.md`

## Loop rules

1. Each wake: pick top unchecked item
2. Build it. Validate JSON.
3. Save to `n8n-workflows/`
4. Update this file (check item, add notes)
5. Commit `[ralph] <item>` + push
6. Schedule next wake
7. Token-limit pause: resume on next wake (vault holds state)

## Vault-as-memory contract

Survives token resets:
- This file = checklist
- `JobFilter/Agent Runs/` = execution log
- `JobFilter/Daily Brief.md` = current snapshot
- Git history = code state

Resuming agent reads top 3 → knows where to continue.

## Done log

- 2026-05-22 — n8n folder + workflows 01/02/03 shipped
- 2026-05-22 — AGENTS.md + Agent Roster shipped
- 2026-05-22 — Vault lint agent dispatched
- 2026-05-22 — Agent 04 Vault Writer sub-workflow built
- 2026-05-22 — Agent 16 LLM Brief Builder built (rebuilds Daily Brief.md daily)

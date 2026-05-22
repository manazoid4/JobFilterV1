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

### URGENT — vault security + integrity (from lint report 2026-05-22)
- [ ] **SECURITY: delete `JobFilter/SupaBase DB password.md`** — plaintext credential leak (needs user approval)
- [x] Create `JobFilter/Daily Brief.md` stub (agent 16 entry point — must exist or first run fails)
- [x] Create `JobFilter/Agent Schedule.md` stub (agent 00 master orchestrator depends on it)
- [ ] Fix `[[Sessions/Daily To-Do]]` dead link in 15 changelogs

### Foundation (unblocks everything)
- [x] n8n workflows folder + 3 starter agents (01-03)
- [x] Write `AGENTS.md` LLM contract
- [x] Write `n8n Agent Roster.md` (16 agents planned)
- [x] Agent 04 — Vault Writer sub-workflow
- [x] Agent 16 — LLM Brief Builder (daily LLM context refresh)
- [x] Agent 05 — Lead Dedup Memory (kills repeat-alert noise)

### Lead-quality core (drives paid conversion)
- [ ] Agent 02v2 — READY signal alert w/ dedup wired (rewire 02 to call 05)
- [x] Agent 06 — Outcome Logger (closes feedback loop)
- [x] Agent 11 — Chase Check Reminder (recovers warm leads)
- [x] Agent 14 — Source Health Watchdog (dead sources = junk)

### Revenue surface
- [x] Agent 10 — Stripe Webhook → Vault
- [x] Agent 09 — Waitlist Health milestones
- [x] Agent 12 — Intake Score Triage (gold/silver/bronze)

### Intel + context
- [x] Agent 07 — Material Price Watcher
- [x] Agent 08 — Territory Summary
- [x] Agent 13 — Calendar Sync
- [x] Agent 15 — Competitor Watch
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
- 2026-05-22 — `scripts/n8n-push.mjs` written + all 5 workflows pushed live to n8n via public API
- 2026-05-22 — Vault writer ID wired into agent 16, re-pushed
- 2026-05-22 — `JobFilter/Daily Brief.md` stub created (agent 16 entry point)
- 2026-05-22 — `JobFilter/n8n Workflow IDs.md` registry created
- 2026-05-22 — Iter 3 max-effort burst: shipped agents 05/06/07/08/09/10/14 (7 new workflows live via API). Agent Schedule.md stub created.
- 2026-05-22 — Iter 4 continued burst: shipped agents 11/12/13/15. **16/16 workflows now live in n8n**. Only agent 00 (Master Orchestrator) + 02v2 dedup-wire + polish items remaining.

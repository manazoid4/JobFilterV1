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
- [x] **SECURITY: delete `JobFilter/SupaBase DB password.md`** — done 2026-05-22
- [x] Create `JobFilter/Daily Brief.md` stub (agent 16 entry point — must exist or first run fails)
- [x] Create `JobFilter/Agent Schedule.md` stub (agent 00 master orchestrator depends on it)
- [x] Fix `[[Sessions/Daily To-Do]]` dead link in 15 changelogs — done 2026-05-22

### Foundation (unblocks everything)
- [x] n8n workflows folder + 3 starter agents (01-03)
- [x] Write `AGENTS.md` LLM contract
- [x] Write `n8n Agent Roster.md` (16 agents planned)
- [x] Agent 04 — Vault Writer sub-workflow
- [x] Agent 16 — LLM Brief Builder (daily LLM context refresh)
- [x] Agent 05 — Lead Dedup Memory (kills repeat-alert noise)

### Lead-quality core (drives paid conversion)
- [x] Agent 02v2 — READY signal alert w/ dedup wired (inlined dedup, done 2026-05-22)
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
- [x] Agent 00 — Master Orchestrator (`scripts/n8n-sync-schedule.mjs` — vault-driven cron sync, done 2026-05-22)

### Polish
- [x] Centralise n8n Variables config — documented in SETUP.md §8
- [x] Slack + Telegram swap-in docs — SETUP.md §7
- [x] `FULL_ACCESS_TEST_MODE` toggle helper — `scripts/test-mode.mjs`
- [x] Update `Vault Map.md` — LLM read-order added at top

### From Atlassian-layoff video digest (2026-05-22)
See [[2026-05-22-atlassian-layoff-syrakis]] for full reasoning.
- [ ] **J1 XDS-style lead source control plane** — dynamic source config endpoint, replace hardcoded fetchers. Highest leverage.
- [ ] **J2 Edge pre-filter for free-tier requests** — Vercel Edge / CF Workers junk-filter
- [ ] **J6 Source-health as paid product surface** — promote agent-14 output as upsell
- [ ] **J8 "Layoff-proof trade" marketing copy pass** — landing page angle, zero engineering
- [ ] **A1 Extend vault-driven config beyond crons** — push endpoint URLs, body params, thresholds
- [ ] J3 Trade catalog (each trade = catalog entry w/ weights)
- [ ] J5 Edge middleware consolidation (auth + rate-limit + region + A/B)
- [ ] J7 Weekly source-quality ralph slot — kill/fix worst

## Next iteration: do these in order, stop when context budget hits 30%

**Status: 16/16 workflow JSONs written + pushed to n8n. Inactive. Awaiting user activation + SMTP creds.**

Smart next moves (NOT building more agents — already enough):

1. **Verify chain works** — once user activates workflow 16 in n8n UI and runs it manually, confirm:
   - `JobFilter/Daily Brief.md` regenerated (timestamp changes)
   - `JobFilter/Agent Runs/<today>/llm-brief-builder-*.md` exists
   - If yes → vault chain proven. If no → debug.

2. **Wire 02v2** — edit `02-ready-signal-alert.json` to insert Execute Workflow → 05 Lead Dedup Memory (ID `XbhFFSqPXg7OT48c`) between "Extract READY Signals" and "Has READY Signals?". Then `node scripts/n8n-push.mjs`.

3. **Agent 00 Master Orchestrator** — design first, code second:
   - Reads `Agent Schedule.md` table (parse markdown rows)
   - For each row: if cron differs from n8n's current → PATCH via API
   - Cron field name in n8n payload: `parameters.rule.interval[0].expression`
   - Tricky: PATCH endpoint needs the entire workflow JSON. So either pull → modify cron → PUT, OR mark this as "out of scope for community API" and just keep updating JSON files + re-pushing.
   - Smart fallback: skip agent 00 entirely. Editing JSON files + `n8n-push.mjs` is already the orchestrator.

4. **Vault hygiene** — pick 1 lint finding per iter:
   - Iter A: delete `JobFilter/SupaBase DB password.md` (needs user approval)
   - Iter B: fix 15× `[[Sessions/Daily To-Do]]` dead links — bulk replace w/ `[[Recent]]` or remove
   - Iter C: add frontmatter template to 215 bare files (use a small node script `scripts/vault-frontmatter-batch.mjs`)

5. **Stop building agents.** 16 covers the JobFilter surface. Future iters = polish + verification.

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
- 2026-05-22 — Iter 5: SupaBase password deleted, 15 changelogs dead-link fixed, 02 dedup inlined, scripts/n8n-activate.mjs written, 13/16 workflows activated via API (01/02/03 await SMTP).
- 2026-05-22 — Iter 6: Agent 00 Master Orchestrator shipped as `scripts/n8n-sync-schedule.mjs`. Vault-driven scheduling live.
- 2026-05-22 — Video digest: Atlassian layoff retrospective digested + cross-project actions added (J1-J8, A1-A3, K1-K2, M1-M2, F1-F2).
- 2026-05-22 — Iter 7 polish burst: SETUP.md §7-10 (Slack/Telegram swap, Variables, test-mode, full endpoint map), scripts/test-mode.mjs, Vault Map.md LLM read-order. 4 polish boxes ticked.
- 2026-05-26 — Comprehensive audit session: fixed DirectorySignal double-penalty bug in scan.ts (-16→-8), fixed 5 zombie regression tests (dead Firebase paths, stale copy assertions, sourceConfig architecture mismatch), added OUTCOMES summary strip to LeadListPage. 6/6 regressions green. Build + lint clean.
- 2026-05-26 — CRITICAL production CSS fix: installed @tailwindcss/postcss + created postcss.config.mjs. Site was 100% unstyled (wrong Tailwind v4 package for Next.js: @tailwindcss/vite instead of @tailwindcss/postcss, no PostCSS config). Merged to main → Vercel rebuilding.

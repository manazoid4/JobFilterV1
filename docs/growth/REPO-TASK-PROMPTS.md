# Repo Task Prompts — finish Agent Nudge & MazOS

Standalone, copy-paste prompts to execute the remaining work in the other repos.
Run each in a session that has the target repo attached (they are NOT in the JobFilter
session's scope). Recommended model: **Sonnet 5** for execution. Each prompt already
carries the context it needs — paste it and go.

Every prompt enforces the **feature-launch rule** (see `.claude/skills/feature-launch/SKILL.md`):
a shipped feature must land a changelog entry, be surfaced across the site, and have launch
assets drafted. If a repo has no changelog, add a lightweight one on its live site — same
spirit as JobFilter's `/whats-new`, distinct enough not to be confusing.

---

## ═══ AGENT NUDGE — repo `manazoid4/agent-nudge` ═══

```text
# AGENT NUDGE — EXECUTE (run on Sonnet 5). Attach repo manazoid4/agent-nudge first.

## WHAT IT IS
MIT open-source, local-first, provider-neutral COORDINATION + receipts layer for running
MULTIPLE AI coding agents (Claude Code, Codex, OpenCode, Aider, Cline) on one repo without
collisions. Tagline: "Context assurance for your coding agents." Stack: Node 20+, Electron UI,
local daemon, SQLite ledger, MCP. V0.5 MVP, Windows-first. Position as the COORDINATION LAYER,
never "another coding agent". Do NOT claim features that aren't shipped (cross-platform, cloud
sync, payments are not production-ready).

## PRIORITY QUEUE (highest first)
1. #8 LAUNCH BLOCKER — publish verified Windows releases + a guided first-run onboarding. A
   broken install kills a Show HN. This must be solid before any launch.
2. #6 — sole-writer ledger, transactions, and crash recovery (reliability foundation).
3. #21 — dogfood ritual: every multi-agent session runs on agent-nudge itself (also the best
   build-in-public content source).
4. #22 — automate connector stale-lock and hard-kill recovery.
5. #11 — worktree-aware claims + Conflict Escrow.
6. #9 — Shadow Mode, outcome metrics, deterministic Nudge Replay Lab.
7. #23 — ingest external facts (CI, review comments, merge conflicts) into the nudge protocol.
8. #10 — provider hook conformance matrix + connector test kit.
9. Epics #13 (competitive synthesis / OpenCode-first assurance) and #20 (dogfood-first roadmap)
   — treat as the roadmap frame, break into shippable slices.

## LAUNCH ASSETS (build alongside #8)
- README-as-landing: hero line, an animated demo GIF/asciinema of a REAL collision caught
  (HOLD/REVIEW/CLEAR), 60-second quickstart, "why local-first", provider matrix, honest limits.
- The Vercel marketing/demo site: one screen, the demo video, one install command, GitHub CTA,
  email capture.
- Repo discovery hygiene: GitHub topics (present), `good first issue` labels, CONTRIBUTING, a
  clear v0.x roadmap; submit to awesome-mcp / awesome-ai-agents / MCP directories.
- Show HN + Product Hunt copy drafts (author present all day for Show HN).

## FEATURE-LAUNCH RULE
Agent Nudge has no customer changelog page yet — ADD a lightweight "What's New" page to the
Vercel site (distinct from JobFilter's). Every shipped item: changelog entry + surfaced in
README/site + a build-in-public post draft. Verify with the repo's own gates before PR.

## RULES
Branch per task; commit clear; open PR mirroring any PR template; drive CI green; run the repo's
lint/build/test; never fabricate; escalate irreversible/pricing decisions to Maz. END with:
what shipped + changelog entries + PR links + open decisions for Maz.
```

---

## ═══ MAZOS — repos `manazoid4/mazos-site` (portfolio) + `manazoid4/mazos-ui` (MAZos) ═══

```text
# MAZOS — EXECUTE (run on Sonnet 5). Attach manazoid4/mazos-site (and mazos-ui) first.

## WHAT IT IS
MazOS = the personal-brand HUB of Manazir "Maz" Hussain, applied-AI / agent engineer who ships
production products solo by orchestrating AI agents. `mazos-site` = the portfolio / candidate
identity (open to roles, contracts, partnerships). `mazos-ui` / "MAZos" = an early local operator
console for supervising agent runs. Voice: professional, technically specific, transparent about
limitations. UVP (not a title): "I ship production products end-to-end, solo, orchestrating AI
agents — here's the live app, the code, the receipts."

## PRIORITY QUEUE — mazos-site
1. #2 — truth-align and harden the engineering portfolio: each project with status, live link,
   code link, honest limitations, and a one-line "what I actually did". Truthful = differentiated.
2. #3 — complete candidate identity + external proof: GitHub profile README as a mini-portfolio;
   consistent handle/bio/UVP across LinkedIn, X, GitHub; frictionless hire/commission/collaborate
   contact routes; portfolio SEO for "Manazir Hussain" + "applied AI engineer UK".
Do these BEFORE amplifying — don't promote a brand that isn't buttoned up.

## PRIORITY QUEUE — mazos-ui
3. #53 — repair the packaged desktop runtime before v1.0.1 (no release until independent
   acceptance testing confirms the packaged app runs without dev infrastructure).

## FEATURE-LAUNCH RULE
mazos-site has no changelog — ADD a lightweight "What's New" / "Shipping log" page (distinct from
JobFilter's) that doubles as build-in-public content. Every shipped item: changelog entry +
surfaced on the site + a LinkedIn/X post draft for the hub.

## RULES
Branch per task; commit clear; open PR mirroring any PR template; drive CI green; run the repo's
gates (the portfolio ships typecheck/build/smoke tests); never fabricate proof (this is the whole
brand); escalate irreversible decisions to Maz. END with: what shipped + changelog + PR links +
open decisions for Maz.
```

---

## Reminder: the two upstream planning prompts
For the research + copy that feeds these build prompts, see `HANDOFF.md` (Session 1 = plan on
Opus → Session 2 = execute on Sonnet 5). These per-repo prompts are the execution end of that
relay, scoped to each repo's real open issues.

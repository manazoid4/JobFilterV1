# Repo Task Prompts — finish Agent Nudge & MazOS (one-shot)

Two self-contained, copy-paste prompts. **How to run each:** open a new session with the
target repo attached, pick **Sonnet 5**, paste the whole block, send. Each is one-shot —
it does the priority work, updates the changelog, fixes any errors, gets CI green, and
opens PRs, without further input.

Both enforce the same standing rules (from `.claude/skills/feature-launch/SKILL.md`):
**update the changelog in the same PR as every change; fix every build/type/lint/test
error you hit — don't stop at the first red; get CI green before each PR.**

---

## AGENT NUDGE — attach `manazoid4/agent-nudge`, then paste:

```
You are executing on the manazoid4/agent-nudge repo. It is MIT open-source, local-first, and
provider-neutral: a coordination + receipts layer for running MULTIPLE AI coding agents
(Claude Code, Codex, OpenCode, Aider, Cline) on one repo without collisions. Tagline: "Context
assurance for your coding agents." Always position it as the COORDINATION LAYER, never "another
agent", and never claim features that aren't shipped (cross-platform, cloud sync, payments).

Do these in order, opening one PR per chunk:
1. Issue #8 (LAUNCH BLOCKER): publish a verified Windows release + a guided first-run onboarding.
2. Issue #6: sole-writer SQLite ledger, transactions, and crash recovery.
3. Issue #21: dogfood ritual — every multi-agent session runs on agent-nudge itself.
4. README-as-landing: hero line, a demo GIF/asciinema of a real collision caught
   (HOLD/REVIEW/CLEAR), a 60-second quickstart, provider matrix, and honest limitations.
5. Add a lightweight "What's New" page to the Vercel site (there is none yet) — distinct in
   layout/name from JobFilter's — and record every shipped change there.

Rules: fix every build/type/lint/test error you hit; run the repo's gates and get CI green before
each PR; update the What's New page in the SAME PR as each shipped change; branch per chunk;
mirror any PR template; never fabricate. Finish with: what shipped, changelog entries added,
PR links, and any decisions you need from Maz.
```

---

## MAZOS — attach `manazoid4/mazos-site` (and `manazoid4/mazos-ui`), then paste:

```
You are executing on the manazoid4/mazos-site repo (personal-brand portfolio of Manazir "Maz"
Hussain, applied-AI / agent engineer; live at mazos-site.vercel.app) and, for the last task,
manazoid4/mazos-ui. Voice: professional, precise, honest about limitations — never fabricate
proof, it is the whole brand. The live site currently has no changelog, no dates, no shipping log.

Do these in order, opening one PR per chunk:
1. Issue #2: truth-align and harden the portfolio — each project gets status, live link, code
   link, one honest limitation, and a one-line "what I actually did".
2. Issue #3: complete candidate identity + external proof — GitHub profile README as a
   mini-portfolio; consistent handle/bio/UVP across LinkedIn, X and GitHub; frictionless
   hire/commission/collaborate contact; portfolio SEO for "Manazir Hussain" and "applied AI
   engineer UK".
3. Add a "Shipping Log" / What's New page (the site has none) with dates, linked in the nav and
   footer, and record every shipped change there.
4. mazos-ui issue #53: repair the packaged desktop runtime before v1.0.1 (no release until it
   runs without dev infrastructure).

Rules: fix every build/type/lint/test error you hit; run the repo's gates and get CI green before
each PR; update the Shipping Log in the SAME PR as each change; branch per chunk; mirror any PR
template; never fabricate proof. Finish with: what shipped, changelog entries added, PR links,
and any decisions you need from Maz.
```

---

## (Bonus) JOBFILTER continuation — already in scope here:
```
Continue the JobFilter microsite: (1) move it from /pro/{slug} to clean root URLs
jobfilter.uk/{business} with DB-backed slug reservation + a dashboard generator tied to /vicinity;
(2) extend ?ref= attribution from the Post-a-Job form to every signup/waitlist form. Add a What's
New entry per shipped change, fix all errors, get CI green, open a PR each.
```

Upstream research + copy for these builds: see `HANDOFF.md` (Session 1 plan on Opus → Session 2
build on Sonnet 5).

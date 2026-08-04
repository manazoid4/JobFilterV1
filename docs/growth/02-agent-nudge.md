# 02 — Agent Nudge: Open-Source Developer-Audience Growth

**Goal:** build an audience of developers who run multiple AI coding agents, and convert them
into installs, GitHub stars, and an engaged community around Agent Nudge.

**Product truth (from repo):** local-first, provider-neutral coordination + assurance layer
for multiple AI coding agents (Claude Code, Codex, OpenCode, Aider, Cline). MIT open source.
V0.5 MVP, Windows-first, Electron + local daemon + SQLite ledger + MCP. Tagline:
**"Context assurance for your coding agents."**

---

## 1. Positioning — create a category, don't enter one

Agent Nudge must **not** compete as "another coding agent." It loses that fight and confuses
the buyer. Position it one layer up:

> **"You already run Claude Code, Codex and Aider. Agent Nudge is the coordination layer that
> stops them stepping on each other — local-first, provider-neutral, with a receipt for every
> change."**

- **Category:** multi-agent coordination / assurance (new lane; see `00-research.md §B`).
- **Three sticky hooks:** *local-first* (nothing leaves your machine), *provider-neutral*
  (works across all the agents you already use), *evidence/receipts* (audit trail + provenance).
- **Ideal early user:** the power user already running 2+ agents in parallel and getting
  burned by collisions and stale context. Small niche today, fast-growing.

---

## 2. Assets to nail before any launch (foundations)

A developer's first impression is the GitHub repo. Fix these first:

1. **README as landing page:** hero line, an animated **demo GIF/asciinema** of a real
   collision being caught (HOLD/REVIEW/CLEAR), 60-second quickstart, "why local-first",
   provider matrix, honest limitations. Devs reward honesty.
2. **A crisp 30–60s demo video** (the collision → nudge → resolve moment). This is the single
   most shareable asset — it goes on the landing page, PH, HN comments, X, YouTube.
3. **`agent-nudge` landing site** (Vercel already used for demo): one screen, the video, one
   install command, GitHub CTA, email capture. No fluff.
4. **Frictionless first-run:** issue #8 ("verified Windows releases + guided first-run
   onboarding") is a *launch blocker* — a broken install kills a Show HN. Ship it first.
5. **Repo hygiene for discovery:** GitHub topics (`ai-agents`, `mcp`, `developer-tools`,
   `local-first` — already present), `good first issue` labels, CONTRIBUTING, a clear
   `v0.x` roadmap. Submit to `awesome-mcp` / `awesome-ai-agents` / MCP directories.
6. **De-risk the Windows-only optics:** be explicit about the roadmap to macOS/Linux, or
   frame Windows-first as deliberate. Much of the AI-coding crowd is on Mac; set expectations.

---

## 3. Channels & discovery (ranked)

1. **GitHub (home base):** stars are the currency. Great README, active issues, visible
   dogfooding (issue #21 — "every multi-agent session runs on agent-nudge itself" — is *the*
   credibility story: the tool coordinates its own multi-agent development).
2. **Hacker News — "Show HN":** the highest-leverage single launch for a local-first dev
   tool. Needs a working install, a clear one-liner, and the author present all day to reply.
3. **Product Hunt:** schedule a launch day; developer-tool + AI category. Coordinate with the
   email list and X for first-hours upvotes.
4. **Reddit:** r/programming, r/ExperiencedDevs, r/ChatGPTCoding, r/ClaudeAI, r/LocalLLaMA —
   value-first posts ("I got tired of my agents overwriting each other, so I built…").
5. **X/Twitter (AI-eng community):** build-in-public thread cadence; clip the demo; engage
   with agent-tooling accounts. This is where the multi-agent power users actually are.
6. **dev.to / Hashnode:** long-form — "Coordinating multiple AI coding agents on one repo."
7. **YouTube:** short demo + a "how I run 3 agents in parallel safely" walkthrough; pitch
   AI-coding creators to feature it.
8. **Discord/community:** a small Agent Nudge Discord for early adopters + a presence in
   existing AI-coding-tool servers (MCP, Claude/Codex communities).

---

## 4. Content engine (build-in-public)

The dogfooding ritual is a content goldmine — narrate it:
- **Weekly "dogfood log":** what broke when N agents worked on Agent Nudge itself, what the
  nudge protocol caught. Ship as an X thread + dev.to post + short clip.
- **Teardown format:** "Here's a real collision between Claude Code and Codex, and the receipt
  Agent Nudge produced." Mirrors JobFilter's bid/no-bid teardown format — reuse the muscle.
- **Roadmap-in-public:** the existing epics (#13 competitive synthesis, #20 dogfood-first
  roadmap, #9 Shadow Mode / Nudge Replay Lab) are great "what we're building and why" posts.
- **Opinion pieces:** "Why multi-agent coding needs a coordination layer" — category-defining
  thought leadership that makes Agent Nudge the reference for the problem.

---

## 5. Launch sequence

**Pre-launch (2–4 weeks)**
- Ship issue #8 (verified releases + onboarding). Record the demo. Stand up the landing +
  email capture. Post build-in-public teasers on X. Line up 5–10 devs to try it and give
  quotes/feedback. Prepare the Show HN and PH copy.

**Launch week**
- Day 1: **Show HN** in the morning (US time), author present all day. Same day: X launch
  thread + demo clip. Cross-post the writeup to dev.to.
- Mid-week: **Product Hunt** launch, mobilise email list + X for first-hours momentum.
- End of week: Reddit value-first posts in 2–3 subreddits (staggered, not spammed).

**Post-launch (sustained)**
- Weekly dogfood log + one teardown. Ship visibly (releases, changelog). Convert issues from
  the launch into a public roadmap. Nurture the Discord. Re-launch on PH for major versions.

---

## 6. KPIs

| Metric | Why | Early target |
| --- | --- | --- |
| GitHub stars | Social proof + discovery flywheel | first 100 → 500 trajectory |
| Installs / release downloads | Real usage | verified releases + growth |
| Show HN / PH performance | Launch reach | front-page HN attempt; PH top-of-day |
| Weekly active dogfood/community | Retention | small but real, growing |
| Email subscribers | Owned reach for next release | list live and growing |
| Inbound issues/contributors | Community health | first external PRs/issues |

## 7. Guardrails / do-not
- Don't claim cross-platform, cloud sync, or payment features that aren't shipped — the repo
  already flags these as not production-ready; keep marketing truthful (brand = trust).
- Don't launch on HN/PH with a broken install — one bad first-run tanks the launch.
- Don't position as a coding agent. Coordination layer, always.
- Don't spam subreddits/Discords — value-first, disclose you're the author.

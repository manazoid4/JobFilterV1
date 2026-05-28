---
type: quickstart
title: AGENT QUICKSTART
updated: 2026-05-28
tags: [agent, quickstart, context, critical]
---

# AGENT QUICKSTART — JobFilter

> Load this first. Single file. All critical context. Updated 2026-05-28.

---

## Repo & Stack

| Item | Value |
|------|-------|
| **Local repo** | `C:\Users\manaz\Desktop\JobFilter\JobFilterV1-main-direct` |
| **GitHub** | `manazoid4/JobFilterV1` |
| **Live site** | https://jobfilter.uk |
| **Framework** | Next.js 14 (App Router) |
| **DB** | Supabase (Postgres) |
| **Payments** | Stripe |
| **WhatsApp** | Twilio |
| **Email** | Resend |
| **Deploy** | Vercel (auto on push to main) |
| **Obsidian vault** | `Obsidian_Memory/Obsidian_Vault/JobFilter/` |

> NOTE: Firebase is legacy/archived. Stack is now Next.js + Supabase. Do not reference Firebase in new code.

---

## Current State (2026-05-28)

### Live
- 21 trade landing pages (Gas, Solar, HVAC, CCTV, EV Charger, Plumbing, Roofing, Scaffolding, Groundworks, Electrical, Damp Proofing, Bricklaying, Landscaping, Carpentry, Painting, Drainage, Fencing, Plastering, Rendering, Structural Engineers, Fire Safety)
- 11 trade add-on pages (e.g. O&M Builder, CCTV Compliance Pack)
- WhatsApp lead delivery (Twilio)
- Stripe pricing + checkout
- Free scan limit gate (localStorage)
- Supabase auth + profiles
- Daily vault digest GitHub Action (runs 7:30 AM UTC)

### PRs — All Merged (up to #207)
Latest PRs: #196 (lead engine fix), #197-#204 (site cleanup, audit, advanced tools), #205 (research trade updates + vault digest agent), #206 (vault session notes), #207 (task-observer + CLAUDE.md).

### Known Launch Blockers (from Audit #202)
1. **Delivery lock key** — `deliveryLockKey = trade + postcodeOutward + sourceId` not implemented
2. **Stripe E2E** — live test checkout + webhook not verified end-to-end
3. **WhatsApp truth** — `sms.ts` stub success not safe for production
4. **Planning locality** — `planningDataFetcher` broad fallback can stamp non-local leads
5. **NEXT_PUBLIC_OPEN_ACCESS=false** — must be confirmed in Vercel prod env
6. **Free scan limit** — in localStorage (client-side), not Supabase (bypassable)
7. **Legal pages** — Privacy Policy/ToS/cookie banner status to verify

---

## Agent Rules (CRITICAL)

- **Always branch + PR** — never push directly to main
- **Vault update required** — after every session, write/update a note in `Sessions/`
- **Build check** — run `npm run build` before creating any PR
- **No fake leads** — if no data, show clean empty state
- **No source names in public copy** — no portal/register names visible to users
- **task-observer** — invoke `/task-observer` at start of every task session
- **ultrawork** — invoke `/ultrawork` for full-stack sessions

---

## Skills Installed (2026-05-28)

All at `C:\Users\manaz\.claude\skills\`:

| Skill | Invoke |
|-------|--------|
| task-observer (meta-skill, observes + improves all skills) | `/task-observer` |
| ultrawork (chains all skills) | `/ultrawork` |
| lead-research-assistant | `/lead-research-assistant` |
| competitive-ads-extractor | `/competitive-ads-extractor` |
| content-research-writer | `/content-research-writer` |
| changelog-generator | `/changelog-generator` |
| webapp-testing | `/webapp-testing` |
| twitter-algorithm-optimizer | `/twitter-algorithm-optimizer` |
| mcp-builder | `/mcp-builder` |
| internal-comms | `/internal-comms` |
| canvas-design | `/canvas-design` |

---

## Vault Structure

```
JobFilter/
├── AGENT_QUICKSTART.md         ← YOU ARE HERE
├── JobFilter HQ.md             ← main navigation hub
├── PersistentMemory.md         ← agent memory + briefing
├── Progress.md                 ← current progress state
├── Daily Brief.md              ← daily agent context
├── Sessions/                   ← session notes + rolling summary
│   ├── Rolling Launch Summary.md
│   ├── Daily To-Do.md
│   └── Session-2026-05-28-*.md
├── Product/                    ← product notes, specs, roadmap
├── System/                     ← architecture, code graph, agent model
├── Intel/                      ← market intelligence, competitor research
├── Marketing/                  ← copy, ads, social media strategy
├── 06_Agents/                  ← individual agent definitions
└── Changelog 2026-05-*.md     ← daily changelogs
```

---

## Product Positioning (Do Not Deviate)

- JobFilter sells **signal intelligence** to UK tradespeople
- "Win the job before it's advertised" — signal-before-demand
- Sources: planning portals, HMO registers, licensed premises applications, Land Registry
- Price: £39/month founder rate
- Delivery: WhatsApp-first (Gold leads within minutes of signal detection)
- Target: Gas Safe engineers, REFCOM HVAC, MCS solar, NSI/SSAIB security, OZEV EV installers, plumbers, roofers, builders
- Never: "exclusive", "nobody else sees this" — use "before open-market demand"

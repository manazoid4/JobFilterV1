---
type: daily-brief
project: JobFilter
run_at: 2026-05-28
for_date: 2026-05-28
status: active
tags: [jobfilter, daily-brief, launch-readiness, llm-context]
---

# JobFilter Daily Brief - 2026-05-28

> Canonical morning context for JobFilter agents. Build the lead engine first; UI polish is secondary.
> See AGENT_QUICKSTART.md for full stack, blockers, and skill list.

## North Star

- Lead quality > volume.
- Data pipeline reliability > speed > monetisation > UX.
- One paid-tier-worthy lead per user per week beats lots of noisy scans.
- Do not expose raw source names, categories, URLs, registers, or portals in public/product copy.

## What Changed In The Last 24 Hours (2026-05-28)

- PR #205: Research-backed trade pages — Solar, Gas, HVAC, CCTV, EV Charger stats updated with MCS/Gas Safe/REFCOM/IBISWorld/OZEV data. Vault daily digest GitHub Action added.
- PR #206: Vault session notes (Session-2026-05-28-Skills-Install.md + Intel/Meta-Skill-Rebelytics.md)
- PR #207: task-observer meta-skill activation added to CLAUDE.md. Intel note updated.
- 10 skills installed locally: task-observer, ultrawork, lead-research-assistant, competitive-ads-extractor, content-research-writer, changelog-generator, webapp-testing, twitter-algorithm-optimizer, mcp-builder, internal-comms, canvas-design
- bypassPermissions enabled in ~/.claude/settings.json — no more permission prompts

## Verified Green (2026-05-28)

- All PRs #196-#207 merged, zero open PRs
- Site live: https://jobfilter.uk
- 21 trade landing pages with research-backed market stats
- Build: Next.js on Vercel, auto-deploy on main push

## Launch Blockers (Do Not Ship Without These)

1. **Delivery lock key** — `deliveryLockKey = trade + postcodeOutward + sourceId` not implemented
2. **Stripe E2E** — live checkout + webhook not verified
3. **WhatsApp truth** — `sms.ts` stub success not production-safe
4. **Planning locality** — `planningDataFetcher` broad fallback stamps non-local leads
5. **NEXT_PUBLIC_OPEN_ACCESS=false** — confirm in Vercel prod env
6. **Free scan limit** — in localStorage (bypassable), should be Supabase
7. **Legal pages** — Privacy Policy/ToS/cookie banner

## Current Best Actions (Priority)

1. Fix planning locality — remove broad fallback from paid lead output
2. Wire paid gating server-side — auth -> profile -> subscription -> lead depth
3. Fix WhatsApp delivery — verified phone only, real Twilio response, no stub success
4. Stripe test checkout + webhook end-to-end
5. Move free scan counter to Supabase

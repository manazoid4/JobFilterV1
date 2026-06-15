# OpenCode Deep Research Task — JobFilter — 2026-06-06

## Your Role
You are a senior product researcher + technical architect. Your output is ONE deliverable: a concrete, prioritized BUILD PROMPT that the next agent (Codex) can execute immediately.

## Context: What JobFilter Is
JobFilter is a UK B2B SaaS for tradespeople. It scans public data sources (ContractsFinder, FTS, PlanningData, Companies House, DirectorySignal) to surface qualified job leads. Tradies pay for full contact unlock + filtering.

**Stack:** Vite + React (parallel dev) / Alpine.js (live production), Express/Node server, Firebase Hosting + Firestore, TypeScript, Stripe (not yet wired), deployed via GitHub Actions.

**Live site entry point:** `index.html` loads Alpine app (758 lines). React app (`src/App.tsx` 1102 lines) exists in parallel but NOT live yet.

**Business model:**
- Free: scan + 5 blurred leads
- Paid: full lead unlock, alerts, smart quoting, payment chaser, review harvester

## Known Issues (from prior audit — do not re-discover, build on these)
- `resend` dep missing from package.json → deploy blocker
- Firebase API key committed in tracked file → critical security leak
- No rate limiting on `/api/leads/scan`
- 1/9 brand phrases present on live site
- No mobile nav hamburger
- No offer bar
- 1-step onboarding (needs 3-step)
- React app exists but not live (Alpine is live)
- Stripe not wired

## Research Tasks

### 1. Competitor Deep Dive (UK trade lead gen, 2026)
Research and find exploitable gaps vs:
- Checkatrade, MyBuilder, Rated People (aggregator model)
- TradifyHQ, Fergus, ServiceBro (job management)
- WeBuildTrades, Buildmyservice.co.uk (agency lead gen)
- TradeHalo, Trademore.uk (AI receptionist)
- eaziquote, mybuildestimate.co.uk (quoting tools)

For each: pricing model, conversion hook, key differentiator, one thing JobFilter undercuts.

### 2. UK Tradesperson Pain Points (2026)
- What frustrates solo traders + small crews (1-5 people) most about job acquisition?
- What makes a lead feel trustworthy vs spam?
- What justifies £29-49/month for a filtering tool?

### 3. Conversion Priority Ranking
Given the 8 missing phrases, no mobile nav, no offer bar, and 1-step onboarding — rank the highest-impact fixes by conversion lift potential.

### 4. Minimum Viable Production Sprint
What's the shortest path to production-safe + first paying customer ready?

### 5. 30-Day Feature Sprint (revenue-first)
From the competitor landscape, which 3 features generate the most revenue fastest?

## Output

Save to: `C:\Users\manaz\Desktop\jobfilter\jobfilterv1\agents\BUILD-PROMPT-2026-06-06.md`

Structure:
```
# JobFilter Build Prompt — 2026-06-06

## Executive Summary (3 sentences max)

## Critical Fixes (ship before any marketing)
1. [Issue] → [File:line] → [Exact fix] → [Why blocking]

## Conversion Sprint (highest ROI changes)
1. [Change] → [File to edit] → [Expected impact]

## Feature Sprint (30-day paid growth)
1. [Feature] → [Approach] → [Revenue link]

## Competitive Position Statement (1 paragraph)

## Ready-to-Paste Codex Prompt
[Full prompt Codex can execute immediately for top 5 fixes]
```

Also save session note to:
`C:\Users\manaz\claude-obsidian\wiki\sessions\2026-06-06-jobfilter-opencode.md`

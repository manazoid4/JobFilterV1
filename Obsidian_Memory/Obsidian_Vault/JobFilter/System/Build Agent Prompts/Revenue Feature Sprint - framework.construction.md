# Build Agent Prompt — Revenue Feature Sprint
*Based on competitor research: framework.construction + Buildertrend gap analysis*
*Obsidian ref: `JobFilter/System/Competitor Deep Dive - 2026-05-19.md`*

---

## COPY-PASTE AGENT PROMPT

---

```
You are a senior full-stack engineer working on JobFilter — a UK construction lead-gen SaaS for tradesmen.

Stack: React + TypeScript + Vite frontend, Express.js backend, Supabase (PostgreSQL), Firebase Hosting.
Design system: Tailwind CSS v4, CSS vars (--ink #080808, --yellow #E3B72A, --orange #C5462A, --green #22C55E, --paper #FFFDF4, --muted #2F2F2A), Barlow Condensed font, brutalist/DeWalt aesthetic.
Branch to develop on: claude/admin-guard-paid-feature-GSg4U
Vault competitor research: Obsidian_Memory/Obsidian_Vault/JobFilter/System/Competitor Deep Dive - 2026-05-19.md
Signal Graph: leadEngine/scorer.ts — qualityLabel (GOLD/SILVER/BRONZE/CHECK/SKIP), leadReadiness (READY/MAYBE/WASTE)

Goal: implement the 5 revenue features below. Every feature should increase perceived value of the paid tier (Patch plan) so tradesmen are more inclined to pay or stay subscribed. Do not build speculative extras. Each feature has a clear success criterion.

---

## FEATURE 1 — Planning Document AI Q&A (highest value, implement first)

Competitors: framework.construction charges $20–120/mo just for this. We get it free with Claude API.

What to build:
- On any lead card in FindJobsPage.tsx, if the lead has a `documentUrl` or `planningRef`, show a small "Ask about this job" button (GOLD/SILVER leads only — SKIP/BRONZE = locked/blurred).
- Clicking opens a slide-in panel. User types a plain-English question ("Does this need an architect?", "Is drainage mentioned?", "What's the build value?").
- POST to `/api/leads/:id/ask` — server fetches the planning doc text (from Supabase `leads.document_text` column if indexed, else extract from PDF URL using pdf-parse), sends to Claude API (claude-haiku-4-5-20251001 to keep cost low) with system prompt: "You are a construction lead analyst. Answer questions about planning applications concisely for UK tradesmen. Return max 3 sentences."
- Response streamed back into the panel.
- Gate: only paid users (Patch plan). Free users see "Upgrade to ask questions about this job →".

Success: a tradesman on GOLD lead can ask "is this a loft or extension?" and get an answer without opening the PDF.

Files to touch: src/pages/FindJobsPage.tsx, server/routes/ (new file: leadAsk.ts), server/index.ts (register route).

---

## FEATURE 2 — Win Source Attribution (retention + upsell data)

What to build:
- After a lead moves to "Won" state (or user marks it manually), show a one-tap modal: "How did you win this job?"
  Options: JobFilter Lead / Word of Mouth / Google / Repeat customer / Other
- Store in Supabase: `won_jobs` table (lead_id, user_id, won_at, source, value_estimate).
- In the user dashboard (or a new /stats page), show: "Your best lead source this month" + "Jobs won via JobFilter: X".
- This makes the JobFilter value visible in hard numbers — directly addresses churn ("is this worth £X/mo?").

Success: user can see "3 jobs won via JobFilter = £4,200 est. value" on dashboard.

Files to touch: src/pages/FindJobsPage.tsx (won modal), src/pages/DashboardPage.tsx or new StatsPage.tsx, server/routes/ (new: wonJobs.ts), Supabase migration for won_jobs table.

---

## FEATURE 3 — Automated Chase Nudges for GOLD Leads (reduces lost jobs)

What to build:
- chaseStore.ts already exists. Extend it: if a GOLD or SILVER lead has been saved/starred but not marked won/lost for 5 days, send a push notification or in-app badge: "⚡ You haven't chased [Applicant Name] in 5 days — GOLD lead still open."
- In-app: red badge on the lead card. Notification copy: brutal and short. No fluff.
- Optionally: WhatsApp reminder via existing chaseCheck.ts route if user has WhatsApp set up.
- Gate: paid users only. Free users see the badge but clicking it says "Upgrade to get chase alerts."

Success: GOLD leads saved by paid users trigger a visible nudge after 5 days of inactivity.

Files to touch: leadEngine/chaseStore.ts, src/pages/FindJobsPage.tsx (badge render), server/routes/chaseCheck.ts (schedule nudge logic).

---

## FEATURE 4 — Postcode Heat Map (visual proof of lead density = conversion tool)

What to build:
- New section on /find-jobs page or a tab: "Lead activity in your area."
- Simple visual: a list of postcode sectors (e.g. "SW12, SW11, SW9") with a bar or pill showing lead count + average quality score for each.
- Data: query Supabase leads table grouped by postcode_sector, count, avg signal score.
- NOT a real map (no Google Maps API cost). Just a ranked list styled like a leaderboard table.
- Use case: tradesman in SW London sees "SW12 — 14 leads this month, avg SILVER" → subscribes to that patch.
- Gate: free users see top 3 postcodes blurred/locked. Paid users see full list.

Success: /find-jobs shows a postcode activity table that makes patch value tangible.

Files to touch: src/pages/FindJobsPage.tsx or new PostcodeHeatMap component, server/routes/ (new: heatmap.ts), Supabase query.

---

## FEATURE 5 — Client Progress Portal Link (high perceived value, zero ongoing cost)

What to build:
- When a tradesman marks a lead as "Won", generate a unique shareable URL: `/job/:token`
- That URL shows a simple read-only page: job address (partial), trade type, status stages (Quoted → Accepted → In Progress → Complete), last updated timestamp.
- Tradesman updates the stage from their dashboard. Client/homeowner visits the link to check progress.
- Buildertrend charges £270/mo just for this. We offer it free with Patch plan.
- Store: `job_portals` table (token UUID, lead_id, user_id, stage, updated_at). Token generated server-side on win.

Success: tradesman can send a WhatsApp link to a homeowner and they see live job status without calling.

Files to touch: new src/pages/JobPortalPage.tsx, server/routes/ (new: jobPortal.ts), App.tsx (add route /job/:token), Supabase migration for job_portals table.

---

## IMPLEMENTATION ORDER

1. Chase Nudges (lowest effort, uses existing chaseStore.ts)
2. Win Source Attribution (medium effort, builds retention data)
3. Postcode Heat Map (medium effort, strong conversion tool)
4. Planning Doc AI Q&A (highest value, needs Claude API integration)
5. Client Progress Portal (medium effort, biggest perceived value for homeowners)

## RULES

- Match existing design system exactly. No new colour vars. No new fonts.
- Paid gate pattern: blur + "Upgrade" CTA for free users. Do NOT show raw data to free tier.
- Use claude-haiku-4-5-20251001 for AI calls (cheap). Never use Opus on per-request paths.
- Commit after each feature. Push to branch: claude/admin-guard-paid-feature-GSg4U.
- Run `npm run build` before final push to confirm no TypeScript errors.
- After all pushes, create a PR to main.

Start with Feature 1 (Chase Nudges). Read chaseStore.ts first.
```

---

*Last updated: 2026-05-19*
*Competitor vault: `JobFilter/System/Competitor Deep Dive - 2026-05-19.md`*

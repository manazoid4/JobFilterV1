# JobFilter Competitor Playbooks

Updated: 2026-06-24  
Repo: `manazoid4/JobFilterV1`  
Purpose: turn competitor research into buildable product, growth, and agent execution playbooks.

---

## 0) North Star

JobFilter should not become another agency, job board, CRM, FSM suite, AI receptionist, quote template app, or homeowner renovation planner.

JobFilter should own one painful decision:

> Is this job worth my time right now?

That is the wedge.

The winning product promise:

> **Real leads. No chasing. No competing. Stay in control.**

Expanded line:

> Marketing gets the phone ringing. CRMs run the job after you win it. JobFilter decides what is worth touching before it steals your day.

---

## 1) Competitor Map

| Category | Examples already researched | What they sell | Their strength | Their weakness | JobFilter response |
|---|---|---|---|---|---|
| Trade marketing / lead gen agencies | WeBuildTrades, Buildmyservice, Timetoscale, Trade Scale variants | More enquiries, better website, GBP, reviews, SEO, ads | Simple growth promise | More enquiries can mean more bad enquiries | Own lead quality, not lead volume |
| FSM / job management | Tradify, Fergus, Workpal, Servicebro | Diary, jobs, invoicing, team ops | Sticky once adopted | Heavy before a solo trade knows the job is worth taking | Be the front-door decision layer |
| AI receptionist / call handling | Trademore / Checkatrade AI angle, Cyberstaff AI, TradeHalo | Answer missed calls, book enquiries | Speed and capture | Capturing everything creates a bigger inbox | Capture, score, then alert only when worth it |
| Estimating / quoting | Eaziquote, MyBuildEstimate | Faster quotes | Saves admin after qualification | Bad jobs still waste quote time | Quote the right jobs faster, not every job faster |
| Website / AI presence | hereismywork.com | Portfolio / website / proof | Trust surface | Website still lets weak leads through | Intake link + filter attached to website |
| Homeowner renovation planning | BAM Renovate / Bricks & Mortar | Homeowner project control | Structured scope, budget, docs | Built for homeowner, not tradesman | Convert preparedness into a trade-side score |
| Maintenance request apps | Fixt Maintenance | Repair request tracking | Photos, status, mobile flow | Property maintenance workflow, not trade growth | Copy intake clarity, avoid full maintenance portal |
| Communications agencies | Copper Lane Communications | Messaging and relationship clarity | Clear positioning | Not trade/product specific | Borrow message simplicity only |

### Strategic read

The market is crowded around **getting work**, **managing work**, and **answering enquiries**.

The white space is still the decision layer between enquiry and effort:

1. Should I call?
2. Should I quote?
3. Is there budget?
4. Is it close enough?
5. Is the customer ready?
6. Is this a waste of time?
7. What should I do next?

JobFilter must make that decision obvious in seconds.

---

## 2) Product Doctrine

### Build around these truths

- Trades do not want another dashboard.
- Trades want their week filled with better work.
- A bad lead has a real tax: travel, calls, quote time, chasing, stress, no-shows.
- The user does not need more data. They need a decision.
- GOLD alerts should feel rare enough to trust.
- Every score needs plain-English reasons.
- Every lead needs a next action.

### Do not build

- Full CRM before export proves demand.
- Full field-service management before repeat user pull.
- Generic voice agent before scoring is trusted.
- Agency retainers as the core product.
- Homeowner-first renovation planning.
- Huge analytics dashboards that trades will not use.

---

## 3) Current Repo Fit

The current repo already has product primitives that support the strategy:

- `score`
- `scoreReasons`
- `qualityLabel`
- `ghostRisk`
- `leadReadiness`
- `recommendedAction`
- `quoteFloor`
- `followUpCadence`
- `evidenceBadges`
- `signalStack`
- `signalClass`
- `contactPath`
- `sourceHealth`
- `persistence`
- `WinJob`
- `LostJob`
- `LostReason`
- `MessageTemplate`

This means the next move is not a rebuild. It is packaging the existing primitives into clear playbooks and product flows.

---

# 4) Build Playbooks

Each playbook below has: competitor lesson, what to ship, acceptance criteria, and a copy-paste build prompt.

---

## Playbook 1 — Lead Decision Card

### Competitor lesson

Agencies sell more leads. FSM tools manage accepted jobs. Quoting tools speed up estimates. None of them make the first decision instantly clear.

### JobFilter move

Make every lead card answer:

> Call now, quote later, check first, or skip?

### Ship

- Big quality label: `GOLD`, `SILVER`, `BRONZE`, `CHECK`, `SKIP`.
- Plain-English verdict at top of card.
- 3-5 reason codes.
- One next action button.
- Visible risk flags: distance, budget, vague scope, weak contact, timing, source quality.

### Acceptance criteria

- A user can understand why a lead is ranked within 5 seconds.
- The lead card shows score, label, readiness, risk, and recommended action.
- No lead appears as just raw data.
- The system avoids over-alerting weak leads.

### Build prompt

```text
You are working in the JobFilterV1 repo. Improve the lead decision card so every lead answers: call now, quote later, check first, or skip.

Inspect the existing types in src/lib/types.ts and leadEngine/types.ts. Use existing fields where possible: score, scoreReasons, qualityLabel, ghostRisk, leadReadiness, recommendedAction, quoteFloor, followUpCadence, evidenceBadges, signalStack, signalClass, contactPath.

Tasks:
1. Find the current lead card/component rendering path from FindJobsPage.
2. Redesign the card hierarchy around a decision-first layout:
   - top badge: GOLD/SILVER/BRONZE/CHECK/SKIP
   - one-line verdict
   - reason codes
   - risks
   - next action CTA
3. Add a helper that converts score + reason fields into plain-English verdicts.
4. Preserve current behaviour and do not break existing imports.
5. Add lightweight tests or type checks if the repo has a test setup.
6. Run lint/build/typecheck and fix failures.

Output a concise implementation summary and list every changed file.
```

---

## Playbook 2 — Customer Preparedness Score

### Competitor lesson

BAM Renovate shows that homeowners value structure: budget, scope, documents, timing, planning, and control. JobFilter should not become a homeowner app, but it should convert that structure into a tradesman-side quality signal.

### JobFilter move

Score whether the customer is actually ready.

### Ship

Preparedness score inputs:

- photos or video attached
- clear scope
- budget present
- timeline present
- decision maker confirmed
- access/postcode present
- urgency believable
- job type matches trade

### Acceptance criteria

- Preparedness appears as `READY`, `MAYBE`, or `WASTE`.
- Preparedness affects the lead verdict.
- The UI explains missing info in plain English.
- SILVER/GOLD jobs with missing info show what to ask next.

### Build prompt

```text
Implement Customer Preparedness Score in JobFilterV1.

Goal: convert homeowner/customer organisation into a tradesman-side lead quality signal. Do not build a homeowner portal.

Inspect src/lib/types.ts, leadEngine/types.ts, lead scoring helpers, FindJobsPage, and current lead card components.

Ship:
1. A preparedness scoring helper that checks for photos/evidence, clear scope, budget/value, timeline/deadline, decision maker/contact, access/postcode, urgency, and trade match.
2. Map output to READY/MAYBE/WASTE and short reason text.
3. Display preparedness on lead cards.
4. For missing info, generate a suggested question such as: "Can you send photos and rough budget before I price this?"
5. Ensure it works with existing lead fields and does not require backend schema changes unless already supported.
6. Run build/typecheck and fix errors.

Prioritise simple, robust logic over clever AI.
```

---

## Playbook 3 — Source Quality + Bad Lead Tax

### Competitor lesson

Marketing agencies focus on enquiry volume, Google Business Profile, websites, ads, and reviews. Their weak point is lead quality by source.

### JobFilter move

Show which sources create useful work, not just enquiries.

### Ship

- Source quality field: planning, EPC, contracts, Google, referral, directory, Facebook, website, unknown.
- Track outcomes by source: won, lost, no answer, ignored, quoted.
- Bad Lead Tax calculator.
- Homepage section: "More enquiries means nothing if half of them waste your time."

### Acceptance criteria

- Source label is visible on every lead.
- Source quality improves after outcome feedback.
- Bad Lead Tax can be used as a free acquisition tool.
- Paid users see source insights by win rate.

### Build prompt

```text
Build Source Quality and Bad Lead Tax into JobFilterV1.

Goal: beat marketing agencies by proving that lead quality matters more than enquiry volume.

Tasks:
1. Find current source fields, sourceHealth/sourceStats, win/loss tracking, and lead persistence.
2. Normalise source labels into clear user-facing categories.
3. Add source quality display to lead cards and/or lead detail view.
4. Create a Bad Lead Tax calculator component:
   - bad enquiries per week
   - minutes wasted per enquiry
   - hourly value
   - travel/quote cost optional
   - monthly wasted value output
5. Add homepage/landing copy using the calculator as a free tool.
6. If outcome data exists, show simple source win-rate stats. If not, create the UI in a way that degrades gracefully.
7. Run build/typecheck and fix failures.

Keep it practical for a sole trader. No bloated analytics dashboard.
```

---

## Playbook 4 — Missed-Call to Intake Link

### Competitor lesson

AI receptionists win on speed and missed-call capture, but they risk capturing weak enquiries and creating more admin.

### JobFilter move

Capture first, filter second, alert only if worth it.

### Ship

- Missed-call SMS copy generator.
- Trade-specific intake link.
- GOLD-only WhatsApp alert concept.
- Weak leads stay in inbox, not the tradesman's head.

### Acceptance criteria

- User can copy a missed-call reply in one tap.
- Intake link asks only the minimum useful questions.
- Captured lead is scored before alerting.
- The product avoids pretending to be a full AI receptionist.

### Build prompt

```text
Add a lightweight Missed-Call to Intake flow to JobFilterV1.

Goal: copy the best part of AI receptionist products without becoming a generic voice bot.

Tasks:
1. Inspect current intake/search/chase/message template code.
2. Add a reusable missed-call reply template:
   "Hi, I’m on a job. Send photos, postcode, rough budget and when you need it here: [intake link]. I’ll check if I can help."
3. Add a small UI surface where a trade can copy/share the message.
4. Create or reuse an intake link flow that captures: trade/job type, postcode, photos/evidence, budget, timeframe, contact details, decision maker.
5. Route submitted/captured details through existing scoring/readiness logic where possible.
6. Only recommend WhatsApp/urgent alerts for high-confidence leads.
7. Run build/typecheck and fix errors.

Do not build live phone answering or voice AI in this pass.
```

---

## Playbook 5 — Smart Quote Fast-Start

### Competitor lesson

Quoting tools save admin, but they do not stop users quoting bad jobs.

### JobFilter move

Only generate quote help after a lead passes the filter.

### Ship

- Smart Quote only for GOLD/SILVER.
- Quote floor estimate if available.
- Risk notes included in the quote starter.
- Follow-up schedule generated from urgency/readiness.

### Acceptance criteria

- SKIP/CHECK leads do not get full quote prompts by default.
- Quote starter includes risk and missing info.
- User gets a message they can paste into WhatsApp/email.
- Quote text is short and trade-specific.

### Build prompt

```text
Improve Smart Quote Fast-Start in JobFilterV1.

Goal: do not quote everything faster; quote the right jobs faster.

Tasks:
1. Inspect existing QuickResponseKit, LeadValueKit, ChaseLead, MessageTemplate and quote-related code.
2. Gate quote fast-start behind GOLD/SILVER or READY/MAYBE states.
3. Generate short quote-starter copy using title, trade, location, estimatedValue, scoreReasons, quoteFloor, risks and missing info.
4. Add follow-up cadence suggestions using urgency and readiness.
5. Add a fallback "ask for missing info first" response for CHECK leads.
6. Keep generated copy plain, UK tradesman-friendly, and pasteable.
7. Run build/typecheck and fix failures.
```

---

## Playbook 6 — Review Harvester

### Competitor lesson

Agencies use reviews as a trust engine. JobFilter can make review capture part of the workflow after a won job.

### JobFilter move

Use completed work to create the next better lead.

### Ship

- After `won`, show review request copy.
- Store whether review message was sent.
- Google review link field in settings or local profile.
- Optional before/after photo reminder.

### Acceptance criteria

- User can mark a job won and immediately copy review request.
- Review request text is friendly and short.
- The UI does not ask for a review before a job is won.
- Review harvesting is positioned as trust-building, not spam.

### Build prompt

```text
Build the Review Harvester workflow in JobFilterV1.

Goal: help trades turn won jobs into proof, because agencies win by selling reputation and local trust.

Tasks:
1. Inspect win/loss tracking, WinJob, reviewMessageSent, chase store and message templates.
2. When a lead/job is marked won, show a review request module.
3. Add copy templates for WhatsApp/SMS:
   - short thank-you
   - review request
   - optional before/after photo permission
4. Allow a user to save/paste their Google review link if a settings/profile surface exists; otherwise use a placeholder field/local storage.
5. Track reviewMessageSent where supported.
6. Run build/typecheck and fix failures.

Keep it simple and mobile-first.
```

---

## Playbook 7 — Weekly Foreman Digest

### Competitor lesson

FSM tools win by becoming operational memory. JobFilter should not become a full FSM, but it should show a weekly summary that proves value.

### JobFilter move

Give the user a weekly "what happened and what to do next" digest.

### Ship

Weekly digest sections:

- leads scanned
- GOLD/SILVER found
- quotes sent
- follow-ups due
- won/lost/no-answer
- best source by win rate
- estimated bad lead time saved

### Acceptance criteria

- Digest can be generated from local/store data.
- Digest is readable in under 60 seconds.
- Digest pushes the user toward next actions.
- Digest reinforces paid value.

### Build prompt

```text
Create a Weekly Foreman Digest in JobFilterV1.

Goal: make JobFilter feel like the trade's decision memory without building a full FSM.

Tasks:
1. Inspect lead store, chase store, win/loss store, source stats and persistence.
2. Build a digest helper that summarises the last 7 days:
   - scans run
   - leads found
   - GOLD/SILVER count
   - contacted/quoted/won/lost/no answer
   - follow-ups due
   - best source if outcome data exists
   - rough time saved by skipped weak leads
3. Add a simple UI card/page for the digest.
4. Include copyable WhatsApp/self-note summary.
5. Degrade gracefully if there is not enough data.
6. Run build/typecheck and fix failures.
```

---

## Playbook 8 — Outcome Learning Loop

### Competitor lesson

Competitors talk about leads, quotes, jobs, and workflows. The moat is knowing which signals actually turned into money.

### JobFilter move

Every result teaches the scoring engine.

### Ship

- Outcome buttons: won, lost, no answer, ignored, no quote.
- Lost reason: price, timing, competition, not interested, went elsewhere, other.
- Score calibration notes.
- Source and job-type win rate.

### Acceptance criteria

- User can update outcome in one tap.
- Outcome is used in digest/source quality.
- Future scoring can later use outcome data.
- UI never makes feedback feel like admin homework.

### Build prompt

```text
Strengthen the Outcome Learning Loop in JobFilterV1.

Goal: build the moat by learning which sources, trades, job types and reason codes become paid work.

Tasks:
1. Inspect existing lead status, ChaseLead, WinJob, LostJob, LostReason and stores.
2. Add or improve one-tap outcome actions: won, lost, no answer, ignored, no quote.
3. Capture lost reason when lost is selected.
4. Feed outcomes into source quality and weekly digest helpers.
5. Add a tiny "why this matters" line: "This teaches JobFilter what work to prioritise next time."
6. Avoid heavy forms.
7. Run build/typecheck and fix failures.
```

---

## Playbook 9 — Export, Not FSM

### Competitor lesson

FSM platforms are strong, but trying to clone them will slow JobFilter down.

### JobFilter move

Let users move good leads into their existing workflow.

### Ship

- CSV export.
- Email copy/export.
- Webhook later.
- Tradify/Fergus/Workpal integrations only after user demand.

### Acceptance criteria

- User can export GOLD/SILVER leads.
- Export includes verdict, reasons, contact path, source, and next action.
- No heavy scheduling/invoicing rebuild.

### Build prompt

```text
Add lightweight lead export to JobFilterV1.

Goal: compete with FSM tools by handing off qualified leads, not by rebuilding their whole product.

Tasks:
1. Inspect lead data shape and any existing export/download utilities.
2. Add CSV export for filtered leads, especially GOLD/SILVER.
3. Include: title, trade, location, postcode, score, qualityLabel, readiness, source, sourceUrl, scoreReasons, recommendedAction, contact channel, quoteFloor.
4. Add copyable email/plain-text export for one lead.
5. Keep integration hooks simple and documented for future webhook support.
6. Run build/typecheck and fix failures.
```

---

## Playbook 10 — Pricing + Packaging

### Competitor lesson

Agencies sell retainers. FSM tools sell seats. Homeowner apps sell low monthly planning. JobFilter should sell time saved and better jobs found.

### JobFilter move

Package around lead control, not software features.

### Recommended packaging

#### Free Scan

- 3 scans/week
- locked full record limit
- Bad Lead Tax calculator
- lead quality preview
- basic intake link

#### Scout Pro

- unlimited full records
- GOLD/SILVER alerts
- smart quote fast-start
- customer preparedness score
- follow-up nudges
- weekly foreman digest
- review harvester
- outcome learning

#### Hammer Add-On

- concierge setup
- profile/intake setup
- review link setup
- optional outbound/admin support
- keep separate so core product does not become an agency

### Acceptance criteria

- Free gives the user a real taste, not a dead demo.
- Pro is obvious: alerts, quotes, follow-ups, digest, review capture.
- Add-on is service, not the main moat.

### Build prompt

```text
Improve JobFilter pricing and packaging surfaces.

Goal: sell lead control and time saved, not generic SaaS features.

Tasks:
1. Inspect landing/pricing/auth/paywall components.
2. Reframe Free as "Free Scan" and paid as "Scout Pro".
3. Add feature grouping around:
   - Find better jobs
   - Filter time-wasters
   - Quote/follow up faster
   - Learn which sources pay
4. Add Bad Lead Tax calculator as a free conversion tool.
5. Add Hammer Add-On as an optional service/concierge tier without making it the core product.
6. Ensure copy is direct, UK trades-focused, and mobile-friendly.
7. Run build/typecheck and fix failures.
```

---

# 5) Master Build Prompt

Use this when you want one agent to execute the whole strategy in sequence.

```text
You are the lead product engineer and growth strategist for JobFilterV1.

Mission: turn JobFilter into the UK trade lead control layer. Do not make it a generic CRM, agency dashboard, all-in-one FSM, AI receptionist, or homeowner renovation planner.

Read COMPETITOR_STRATEGY_PLAYBOOK.md fully first. Then inspect the repo, especially:
- src/lib/types.ts
- leadEngine/types.ts
- src/pages/FindJobsPage.tsx
- lead card components
- chase/follow-up store
- win/loss store
- pricing/landing components
- any scoring helpers

Core product promise:
Real leads. No chasing. No competing. Stay in control.

Implement in priority order:
1. Lead Decision Card: decision-first layout with verdict, quality label, reason codes, risks, and next action.
2. Customer Preparedness Score: READY/MAYBE/WASTE based on scope, photos, budget, timeline, contact, access and decision maker.
3. Source Quality + Bad Lead Tax: show source quality and add a free calculator proving wasted lead cost.
4. Smart Quote Fast-Start: only for GOLD/SILVER or ready leads; include risk notes and missing-info questions.
5. Outcome Learning Loop: one-tap won/lost/no-answer/ignored/no-quote feedback and lost reasons.
6. Weekly Foreman Digest: last 7 days summary with leads, GOLD/SILVER, follow-ups, wins/losses, best source, time saved.
7. Review Harvester: after won jobs, generate review request copy and track if sent.
8. Lightweight Export: CSV/plain-text handoff for qualified leads.
9. Pricing copy: Free Scan, Scout Pro, Hammer Add-On.

Rules:
- Use existing types and stores before creating new schema.
- Keep every UI mobile-first.
- Every feature must help a tradesman decide faster, avoid waste, quote better, or follow up.
- No huge dashboards.
- No fake integrations.
- No full voice AI.
- No full FSM clone.
- Preserve existing behaviour.
- Run build/typecheck/lint and fix errors.

Deliver:
- changed files list
- implementation summary
- remaining risks
- next 3 commits after this one
```

---

# 6) Multi-Agent Build Prompts

## Agent A — Product Surface

```text
You are Agent A for JobFilterV1. Own the product surface.

Read COMPETITOR_STRATEGY_PLAYBOOK.md and inspect the current UI. Build or improve:
- Lead Decision Card
- Customer Preparedness display
- Smart Quote Fast-Start UI
- Review Harvester UI
- Weekly Foreman Digest UI

Constraints:
- mobile-first
- decision-first
- plain English
- no dashboard bloat
- use existing fields where possible

Run checks and report changed files.
```

## Agent B — Scoring + Data

```text
You are Agent B for JobFilterV1. Own scoring, stores, and outcome loops.

Read COMPETITOR_STRATEGY_PLAYBOOK.md and inspect types/stores/scoring.

Build or improve:
- preparedness scoring helper
- source quality normalisation
- outcome learning loop
- source win-rate summary
- weekly digest data helper
- CSV/plain-text export data mapping

Constraints:
- avoid unnecessary backend/schema changes
- degrade gracefully with missing data
- keep logic deterministic and readable
- run build/typecheck

Report changed files and any recommended future schema changes.
```

## Agent C — Growth + Pricing

```text
You are Agent C for JobFilterV1. Own landing, packaging, and conversion.

Read COMPETITOR_STRATEGY_PLAYBOOK.md and inspect homepage/pricing/paywall copy.

Build or improve:
- Bad Lead Tax calculator
- Free Scan / Scout Pro / Hammer Add-On packaging
- competitor-aware copy around lead quality over lead volume
- homepage section: "More enquiries is not control"
- CTAs for scan, intake link, and paid upgrade

Constraints:
- UK trades language
- direct and punchy
- no hype
- no agency-style bloat
- run build/typecheck

Report changed files and final copy changes.
```

---

# 7) 90-Day Execution Order

## Week 1-2 — Trust the Score

- Lead Decision Card
- reason codes
- preparedness score
- recommended action
- risk flags

Success signal:

- user understands each lead in seconds
- weak leads are visibly filtered
- GOLD feels trustworthy

## Week 3-4 — Convert the Good Leads

- Smart Quote Fast-Start
- follow-up cadence
- one-tap contact copy
- missing-info prompts

Success signal:

- user contacts more GOLD/SILVER leads
- user stops quoting obvious weak leads

## Week 5-6 — Prove the Value

- Bad Lead Tax calculator
- outcome buttons
- source quality
- weekly foreman digest

Success signal:

- product can show time saved and best sources
- paid tier has obvious ongoing value

## Week 7-8 — Build Trust Loop

- Review Harvester
- Google review link storage
- won-job review workflow
- proof prompts

Success signal:

- won jobs produce more reputation proof

## Week 9-10 — Capture More Without Noise

- missed-call reply template
- intake link flow
- score-before-alert concept

Success signal:

- user captures missed enquiries without increasing admin noise

## Week 11-13 — Handoff and Scale

- CSV/plain-text export
- webhook planning
- first integration decision only if users ask

Success signal:

- JobFilter improves existing workflow without becoming FSM software

---

# 8) Sales Battlecards

## Against marketing agencies

They bring in enquiries. JobFilter stops bad enquiries wasting the day.

**Use when user says:** "I need more leads."

**Response:**

> More leads only helps if they are worth quoting. JobFilter filters the time-wasters before you spend half your day chasing them.

## Against FSM tools

They run jobs after acceptance. JobFilter decides what is worth accepting.

**Use when user says:** "I already use Tradify/Fergus/etc."

**Response:**

> Keep it. JobFilter sits before it. We help you choose which jobs deserve to enter the diary in the first place.

## Against AI receptionists

They answer everything. JobFilter filters what deserves attention.

**Use when user says:** "I miss calls while on site."

**Response:**

> Capture the details, then filter hard. Answering every call is not control if half the calls are rubbish.

## Against quoting tools

They speed up quotes. JobFilter protects quote time.

**Use when user says:** "I spend ages quoting."

**Response:**

> Do not quote bad jobs faster. Use JobFilter to decide what deserves a quote, then use smart quote copy only on the good ones.

## Against homeowner apps

They organise the homeowner. JobFilter protects the tradesman.

**Use when user says:** "Customers are messy."

**Response:**

> JobFilter checks whether the customer is prepared before you spend your evening dragging details out of them.

---

# 9) Homepage Copy Blocks

## Hero

**Real leads. No chasing. No competing. Stay in control.**

JobFilter scans for trade opportunities, scores the job, explains the risk, and tells you what to do next — before another bad lead steals your day.

CTA: **Scan my area**  
Secondary CTA: **Calculate my bad lead tax**

## Problem

More enquiries does not mean more money.

It can mean more missed calls, weak budgets, vague messages, wasted quotes, long drives, no-shows, and customers who were never ready.

JobFilter is built for the moment before you waste time.

## Product

Every lead gets:

- a quality score
- GOLD/SILVER/BRONZE/CHECK/SKIP label
- plain-English reasons
- risk flags
- customer preparedness score
- next action
- quote/follow-up helper when it is worth pursuing

## Paid value

Scout Pro helps you:

- unlock full records
- catch high-quality jobs faster
- quote good leads quickly
- follow up without chasing chaos
- learn which sources actually pay
- harvest reviews from won jobs

---

# 10) Source Notes Preserved From Previous Report

- Trade Scale (`tradescale.cc`): positioned as marketing systems for trades, including websites, review reactivation, local SEO, and more enquiries.
- TradeScale (`tradescale.io`): positioned as a marketing agency for trade and service businesses, including brand, website, Google ads, social, and lead strategy.
- TradeScale USA (`tradescaleusa.com`): lists Google Business Profile, social media marketing, reputation management, website design, content creation, paid ads, analytics, and targeted lead research.
- TradeScale (`thetradescale.com`): positioned around bespoke technology, AI systems, automations, integrations, delivery handovers, reporting, and business control for trade/construction businesses.
- BAM Renovate / Bricks & Mortar (`bamrenovate.co.uk`): UK renovation project management app for homeowners with planning, budgeting, documents, expert guidance, and low monthly pricing after a trial.
- Fixt Maintenance (`fixt.app`, Google Play, Apple App Store): maintenance request creation, photos/videos, technician assignment, scheduling/status notifications, and repair visibility.
- Copper Lane Communications (`gocopperlane.com`): communications strategy, message development, partner relationships, crisis comms, copywriting, media relations, content marketing, executive visibility, and social strategy. Closest match previously found for the ambiguous "Anne Copper Lane Agency" name.

---

# 11) Final Product Rule

Whenever a feature idea appears, ask:

> Does this help a tradesman decide faster, avoid a bad lead, quote a good lead, follow up at the right time, or learn what work actually pays?

If no, park it.

If yes, ship the smallest version that makes the next job easier to judge.

# Feature Roadmap — 8 May 2026

**Owner:** Product
**Status:** Prioritised — ready for build
**Next review:** 22 May 2026
**Model:** Triple Engine (Find → Chase → Win)

---

## SCORING METHOD

| Metric | Scale |
|--------|-------|
| Conversion Impact | 1-10 (how much does this drive free → paid?) |
| Retention Impact | 1-10 (how much does this reduce churn?) |
| Implementation Effort | 1-10 (10 = hardest, most expensive) |
| **Priority Score** | **(Conversion + Retention) / Effort** |

Higher score = build first.

---

## ALL FEATURES — RANKED BY PRIORITY SCORE

### TIER 1: BUILD NOW (Score 3.0+)

| # | Feature | Engine | Conv | Ret | Effort | Score | Status |
|---|---------|--------|------|-----|--------|-------|--------|
| 1 | Trade-specific scoring | Find | 8 | 8 | 2 | **8.0** | BUILT |
| 2 | Radius-based alerts | Find | 8 | 8 | 2 | **8.0** | BUILT |
| 3 | "Fill My Week" button | Chase | 7 | 7 | 2 | **7.0** | BUILT |
| 4 | WhatsApp message templates | Chase | 7 | 7 | 2 | **7.0** | ALREADY BUILT |
| 5 | Auto-nudge (2h no contact) | Chase | 7 | 7 | 2 | **7.0** | ALREADY BUILT |
| 6 | "Did you win this job?" follow-up | Win | 6 | 8 | 2 | **7.0** | ALREADY BUILT |
| 7 | Monthly ROI summary | Win | 7 | 8 | 2 | **7.5** | ALREADY BUILT |
| 8 | Review link generator | Win | 5 | 7 | 2 | **6.0** | ALREADY BUILT |
| 9 | Google Calendar integration | Integration | 5 | 6 | 2 | **5.5** | BUILT (GET /api/leads/calendar.ics + COPY CALENDAR LINK in LeadDetailPage) |
| 10 | Companies House signals | Integration | 6 | 6 | 2 | **6.0** | Built (key-gated) |
| 11 | Document/keyword search | Find | 9 | 8 | 4 | **4.25** | Prototype built |

### TIER 2: BUILD NEXT (Score 1.5–2.9)

| # | Feature | Engine | Conv | Ret | Effort | Score | Status |
|---|---------|--------|------|-----|--------|-------|--------|
| 12 | Commercial lead detection | Find | 6 | 7 | 4 | **3.25** | Not built |
| 13 | WhatsApp Business API (deeper) | Integration | 7 | 8 | 4 | **3.75** | Partial (basic alerts) |
| 14 | TradeFlow UK integration | Integration | 6 | 8 | 4 | **3.5** | Not built (partnership) |
| 15 | Multi-channel follow-up | Chase | 6 | 7 | 4 | **3.25** | Not built |
| 16 | Won job leaderboard | Win | 5 | 6 | 3 | **3.67** | BUILT (WinStatsBanner + outcomes.jsonl persistence) |
| 17 | Job value tracking | Win | 6 | 7 | 4 | **3.25** | Not built |
| 18 | PlanWire integration | Find | 6 | 6 | 4 | **3.0** | Not built |

### TIER 3: BUILD LATER (Score 1.0–1.4)

| # | Feature | Engine | Conv | Ret | Effort | Score | Status |
|---|---------|--------|------|-----|--------|-------|--------|
| 19 | Property value data (Rightmove) | Find | 5 | 5 | 7 | **1.43** | Not built |
| 20 | Xero/FreeAgent integration | Integration | 4 | 5 | 6 | **1.5** | Not built |
| 21 | Land Registry signals | Find | 4 | 5 | 6 | **1.5** | BUILT (DEMO_MODE) |
| 24 | Charity Commission signals | Find | 5 | 6 | 3 | **3.67** | BUILT (DEMO_MODE) — new charity registrations signal premises work |
| 25 | Forestry Commission felling licences | Find | 4 | 5 | 3 | **3.0** | BUILT (DEMO_MODE) — tree clearance leads for landscapers |
| 26 | Freshness decay scorer | Find | 7 | 7 | 1 | **14.0** | BUILT — older leads lose score (3d bonus, 7d neutral, 14d+ penalty) |
| 27 | Fuzzy dedup (title+postcode) | Find | 6 | 6 | 1 | **12.0** | BUILT — prevents duplicate leads from overlapping sources |

### TIER 4: DO NOT BUILD NOW (Score < 1.0)

| # | Feature | Engine | Conv | Ret | Effort | Score | Reason |
|---|---------|--------|------|-----|--------|-------|--------|
| 22 | Homeowner contact enrichment | Chase | 7 | 6 | 8 | **1.63** | Legal/privacy risk, GDPR exposure, reputational damage if mishandled |
| 23 | Rightmove/Zoopla API | Integration | 4 | 4 | 8 | **1.0** | Enterprise pricing (£1,000+/mo), overkill for individual trades |

> **Note on #22:** Homeowner contact enrichment scores 1.63 — technically above the "don't build" threshold. But it goes here anyway because the legal risk (GDPR, ICO complaints, reputational damage) outweighs the benefit at our current scale. Revisit at 1,000+ paying users with legal counsel.

---

## WHAT TO BUILD NOW (Quick Wins — Days 1-30)

These are low effort, high impact. Most are already built or need minimal work.

### Week 1-2: Activate What Exists

| Feature | Engine | Action |
|---------|--------|--------|
| Companies House signals (unlock) | Find | Remove key-gate, make it a Pro feature. Auto-enrich commercial leads. 2-3 days. |
| WhatsApp message templates | Chase | Already built. Polish UI, add 2 more templates (quick quote, availability check). 1 day. |
| Auto-nudge (2h) | Chase | Already built. Verify it fires reliably. Add "snooze" option. 1 day. |
| "Did you win this job?" | Win | Already built. Add lost-reason analysis to close the loop. 1 day. |
| Monthly ROI summary | Win | Already built. Add "share your wins" button (generates image for social). 1 day. |
| Review link generator | Win | Already built. Add auto-prompt 24h after "Won" status. 1 day. |

### Week 2-3: Build Trade-Specific Scoring

**Feature:** Trade-specific scoring
**Engine:** Find
**Effort:** 2 days
**Impact:** HIGH — this is the single biggest differentiator vs postcode scanners

**What it does:**
- User sets their trade (plumber, electrician, roofer, builder, etc.)
- Scoring weights adjust: a plumber sees "bathroom renovation" and "boiler replacement" leads scored GOLD
- An electrician sees "rewire" and "EV charger" leads scored GOLD
- Same lead, different score, different trade

**Why it matters:**
- Every competitor shows the same leads to everyone
- JobFilter shows YOUR leads to YOU
- This is the "NO COMPETING" promise in action

**Implementation:**
```
Trade weights config:
  plumber: { bathroom: 1.0, boiler: 1.0, kitchen: 0.7, rewire: 0.3, extension: 0.2 }
  electrician: { rewire: 1.0, ev_charger: 1.0, solar: 0.8, kitchen: 0.6, bathroom: 0.4 }
  roofer: { velux: 1.0, flat_roof: 1.0, loft: 0.8, extension: 0.6, solar: 0.5 }
  builder: { extension: 1.0, new_build: 1.0, loft: 0.8, garage: 0.7, kitchen: 0.5 }
```

### Week 3-4: Build Radius-Based Alerts

**Feature:** Radius-based alerts
**Engine:** Find
**Effort:** 2 days
**Impact:** HIGH — trades think in miles, not postcodes

**What it does:**
- User sets home postcode + radius (5, 10, 15, 25, 50 miles)
- WhatsApp alert fires when ANY lead appears within that radius
- "NEW: Loft conversion in Solihull — 8 miles from you. Planning ref P2026/0847."

**Why it matters:**
- Trades don't want to set up alerts for 10 different postcodes
- "Alert me for anything within 15 miles" is the natural language they use
- Competitors make you manually add each postcode area

### Week 4: Build "Fill My Week" Button

**Feature:** "Fill My Week" button
**Engine:** Chase
**Effort:** 2 days
**Impact:** HIGH — solves the quiet week problem

**What it does:**
- One button. Aggressive scan across all 3 data sources (planning, EPC, contracts)
- Returns 5+ jobs within user's radius and trade
- Ranked by score, ready to chase immediately
- "Your quiet week isn't a skills problem. It's a pipeline problem."

**Why it matters:**
- Quiet weeks kill cashflow
- This is the pain → solution → control loop in one button
- Trades will screenshot this and share it

---

## WHAT TO BUILD NEXT (Medium Effort, High Impact — Days 31-60)

### Week 5-6: Document Search (Prototype → Production)

**Feature:** Document/keyword search
**Engine:** Find
**Effort:** 4 weeks (phased)
**Impact:** HIGHEST — this is Buildscout's most defensible feature

**Current status:** Prototype with mock data is built. Needs real data pipeline.

**Phase 1 (Week 5-6):** PDF extraction pipeline
- Build scraper for 5 pilot councils (Birmingham, Solihull, Walsall, Sandwell, Dudley)
- Hybrid extraction: PDF.js for text-based (80%), Textract fallback for scanned (20%)
- Store in Supabase with full-text search index
- Cost: £8-15/mo to run

**Phase 2 (Week 7-8):** Search + auto-tagging
- Connect frontend to real API
- Keyword auto-tagging (extension → building, heat pump → hvac, etc.)
- Free tier: 3 searches/week. Pro: unlimited. Pro+: WhatsApp alerts for saved keywords

**Why it matters:**
- Without this, we're a postcode scanner — not a precision tool
- Buildscout charges £239/mo for this. We can run it for £15/mo and charge £49/mo
- This is the Pro+ tier anchor feature

### Week 6-7: Commercial Lead Detection

**Feature:** Commercial lead detection
**Engine:** Find
**Effort:** 3 days
**Impact:** MEDIUM-HIGH — opens commercial trades as a market segment

**What it does:**
- Auto-flag leads that are commercial projects (offices, retail, industrial)
- Combine with Companies House data for company details
- Show estimated project scale (larger = multiple trades needed = bigger opportunity)

**Why it matters:**
- Commercial jobs are higher value, longer duration
- Nobody else does this at £29/mo
- Differentiator for electricians, HVAC, commercial builders

### Week 7-8: WhatsApp Business API (Phase 2)

**Feature:** Deeper WhatsApp integration
**Engine:** Chase + Integration
**Effort:** 2 weeks
**Impact:** HIGH — trades live in WhatsApp

**What it does:**
- Two-way messaging: reply ACCEPT, SKIP, VISIT, QUOTE from WhatsApp
- Auto-log responses in JobFilter
- Template messages for status updates
- Trade can manage leads without opening the app

**Why it matters:**
- 89% of UK trades use WhatsApp daily
- If JobFilter lives in WhatsApp, leaving means losing their lead pipeline
- Creates daily habit → reduces churn to 4-6%

### Week 8: Won Job Leaderboard

**Feature:** Won job leaderboard
**Engine:** Win
**Effort:** 2 days
**Impact:** MEDIUM — social proof drives engagement

**What it does:**
- Anonymised: "Trades in B postcode won 47 jobs worth £184,000 this month via JobFilter"
- User sees their rank: "You're in the top 20% this month"
- Opt-in to share: "I won 3 jobs worth £12,000 this month via JobFilter"

**Why it matters:**
- Trades are competitive. Show them the scoreboard.
- Social proof for marketing ("real results from real trades")
- Low effort, high engagement

---

## WHAT TO BUILD LATER (High Effort or Lower Impact — Days 61-90)

### Week 9-10: TradeFlow UK Integration (Partnership)

**Feature:** TradeFlow UK integration
**Engine:** Integration
**Effort:** 1 day (Option A) to 6 weeks (Option C)
**Impact:** HIGH — completes the Find → Chase → Win pipeline

**Approach:**
- Start with Option A: "Send to TradeFlow" button with pre-filled URL params (1 day)
- If partnership agreed: build webhook integration (1-2 weeks)
- Co-branded: "JobFilter finds it. TradeFlow closes it."

**Why later:** Requires partnership negotiation. Technical build is fast once agreed.

### Week 10-11: Multi-Channel Follow-Up

**Feature:** Multi-channel follow-up (WhatsApp + SMS + email)
**Engine:** Chase
**Effort:** 1 week
**Impact:** MEDIUM — redundancy for when WhatsApp fails

**What it does:**
- If WhatsApp not delivered, fall back to SMS
- If no response after 48h, send email
- All use same template language, different channels

**Why later:** WhatsApp covers 89% of cases. This is for the remaining 11%.

### Week 11-12: Job Value Tracking

**Feature:** Job value tracking
**Engine:** Win
**Effort:** 3 days
**Impact:** MEDIUM — helps trades understand actual vs estimated value

**What it does:**
- When marking a job as Won, enter actual job value
- Compare estimated vs actual over time
- "Your extension jobs average £18,500. Heat pump jobs average £8,200."

**Why later:** Nice-to-have analytics. Not core to finding/chasing/winning.

### Week 12: PlanWire Integration

**Feature:** PlanWire fresh planning alerts + webhooks
**Engine:** Find
**Effort:** 1 week
**Impact:** MEDIUM — additional data source

**What it does:**
- PlanWire provides planning application data via API/webhooks
- Faster detection than scraping council portals
- More councils covered

**Why later:** Our current 3 data sources are sufficient for launch. PlanWire is a scale play.

---

## WHAT NOT TO BUILD (And Why)

### Homeowner Contact Enrichment

**Score:** 1.63 (technically viable, strategically dangerous)

**Why not:**
- GDPR risk: pulling personal phone/email from planning data without consent
- ICO complaint magnet: one angry homeowner = investigation
- Reputational damage: "creepy" factor outweighs convenience
- Competitors who do this get labelled as lead mills, not tools

**When to revisit:** At 1,000+ paying users, with legal counsel, and only for commercial contacts (not residential).

### Rightmove/Zoopla Property Value Data

**Score:** 1.0-1.43

**Why not:**
- Enterprise pricing (£1,000+/mo) — kills unit economics at our scale
- Individual trades don't need AVM-level property valuations
- Overkill for qualifying a £5,000 bathroom job

**When to revisit:** At 1,000+ paying users when we can negotiate volume pricing or build our own estimation model.

### Xero/FreeAgent Integration

**Score:** 1.5

**Why not now (but yes later):**
- 2-3 weeks build time for OAuth, invoice creation, edge cases
- Trades already have their own invoicing process
- Not a retention driver at this stage — it's a convenience

**When to build:** Day 61-90 or when users start asking for it.

### Land Registry Signals

**Score:** 1.5

**Why not:**
- Data is in the vault but the use case is unclear
- Land Registry data is about ownership, not construction intent
- Low signal-to-noise ratio for trades

**When to revisit:** If we find a specific use case (e.g., "this property changed hands 6 months ago — new owner likely to renovate").

---

## 30/60/90 DAY BUILD PLAN

### DAYS 1-30: QUICK WINS

**Goal:** Activate everything that exists. Build the two highest-scoring features.

| Week | Deliverable | Engine | Effort |
|------|------------|--------|--------|
| 1 | Companies House unlocked + polished | Find | 2 days |
| 1 | WhatsApp templates polished + 2 new | Chase | 1 day |
| 1 | Auto-nudge verified + snooze option | Chase | 1 day |
| 1 | Win Engine follow-ups tightened | Win | 2 days |
| 2 | **Trade-specific scoring** (BUILD) | Find | 2 days |
| 2 | Google Calendar integration | Integration | 3 days |
| 3 | **Radius-based alerts** (BUILD) | Find | 2 days |
| 3 | TradeFlow partnership outreach sent | Integration | 1 day |
| 4 | **"Fill My Week" button** (BUILD) | Chase | 2 days |
| 4 | Document search: PDF pipeline started | Find | 3 days |

**Day 30 deliverable:**
- 6 existing features polished and live
- 3 new features built (trade scoring, radius alerts, fill my week)
- Google Calendar live
- Document search pipeline in progress
- TradeFlow outreach sent

### DAYS 31-60: CORE FEATURES

**Goal:** Ship document search. Deepen WhatsApp. Add commercial detection.

| Week | Deliverable | Engine | Effort |
|------|------------|--------|--------|
| 5 | Document search: PDF pipeline complete | Find | 5 days |
| 5 | Commercial lead detection (BUILD) | Find | 3 days |
| 6 | Document search: search API + frontend | Find | 5 days |
| 6 | WhatsApp Business API Phase 2 started | Integration | 3 days |
| 7 | Document search: auto-tagging + gating | Find | 3 days |
| 7 | WhatsApp Business API Phase 2 complete | Integration | 2 days |
| 8 | **Won job leaderboard** (BUILD) | Win | 2 days |
| 8 | TradeFlow integration (if partnership agreed) | Integration | 1-5 days |

**Day 60 deliverable:**
- Document search live (5 councils, Pro+ feature)
- Commercial lead detection live
- WhatsApp two-way messaging live
- Won job leaderboard live
- TradeFlow integration live (if partnership agreed)

### DAYS 61-90: DEPTH & SCALE

**Goal:** Expand document search. Build integrations. Measure retention.

| Week | Deliverable | Engine | Effort |
|------|------------|--------|--------|
| 9 | Document search: expand to 20 councils | Find | 5 days |
| 9 | Multi-channel follow-up (BUILD) | Chase | 5 days |
| 10 | Job value tracking (BUILD) | Win | 3 days |
| 10 | Xero integration started | Integration | 5 days |
| 11 | PlanWire integration (BUILD) | Find | 5 days |
| 11 | Xero integration complete | Integration | 3 days |
| 12 | Integration dashboard (user settings) | Integration | 3 days |
| 12 | Retention analysis: integration impact | All | 2 days |

**Day 90 deliverable:**
- Document search: 20 councils, full feature
- 3 new integrations live (multi-channel, job tracking, Xero)
- PlanWire data source added
- Integration dashboard for users
- Retention data: do users with 2+ integrations churn less?

---

## PRIORITY DECISIONS SUMMARY

### If you can only build THREE things:

1. **Trade-specific scoring** (Score: 8.0) — 2 days, massive differentiation
2. **Radius-based alerts** (Score: 8.0) — 2 days, solves the postcode problem
3. **"Fill My Week" button** (Score: 7.0) — 2 days, solves the quiet week problem

These three together make JobFilter feel like a system, not a tool.

### If you can only build ONE thing:

**Trade-specific scoring.** It's the "NO COMPETING" promise delivered in code. Every other feature is an improvement. This is a transformation.

### What NOT to touch until Day 60:

- Document search pipeline (important but 4 weeks of build)
- Rightmove/Zoopla (too expensive, too early)
- Homeowner enrichment (legal risk)
- Xero/FreeAgent (convenience, not core)

---

## RETENTION HYPOTHESIS

| Features Active | Expected Monthly Churn | Rationale |
|-----------------|----------------------|-----------|
| Basic scan only | 8-12% | Easy to cancel, no switching cost |
| + Trade scoring + radius alerts | 6-8% | Leads feel personalised |
| + WhatsApp templates + auto-nudge | 4-6% | Daily habit formed |
| + Document search + Calendar | 3-5% | Precision tool + workflow lock-in |
| + TradeFlow + Xero (3+ integrations) | 2-4% | Breaking the workflow costs more than £29/mo |

**Target:** Get 40% of Pro users to use 3+ engine features within 90 days.

---

*Saved: 8th May 2026*
*Owner: Product*
*Next review: 22nd May 2026*

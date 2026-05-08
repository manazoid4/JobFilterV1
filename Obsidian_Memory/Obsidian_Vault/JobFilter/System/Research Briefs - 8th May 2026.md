# Research Briefs — 8 May 2026

Purpose: Open research questions and strategic experiments for JobFilter. Each brief is actionable, has a clear owner (product, growth, or partnerships), and a success metric.

---

## BRIEF 1: Trade Body Partnership Strategy

**Owner:** Growth / Partnerships
**Priority:** HIGH
**Deadline:** Research complete by 15 May 2026

**Context:** Buildscout partnered with FMB (12,000 members) and got exclusive supplier directory placement, co-branded landing page, and direct access to member email list. This is their biggest distribution advantage.

**Research questions:**
1. Which UK trade bodies have the most engaged membership and the weakest lead-gen offering for their members?
2. What does a partnership look like — revenue share, exclusive discount, co-branded tool?
3. Which bodies are most likely to say yes to a Birmingham-built, £29/mo tool vs a £239/mo competitor?

**Targets to research:**
- NAPIT (electrical, 20,000+ members)
- NICEIC (electrical, 25,000+ members)
- Gas Safe Register (not a body but 120,000+ engineers — can we target their network?)
- Federation of Plumbing Contractors (FPC)
- National Federation of Roofing Contractors (NFRC)
- Electrical Contractors' Association (ECA)
- Construction Plant-hire Association (CPA)
- Federation of Master Builders (already with Buildscout — but is the deal exclusive?)

**Deliverable:** Partnership target list ranked by (1) member count, (2) lead-gen gap, (3) likelihood of yes. Draft outreach email template for top 3.

---

## BRIEF 2: Document Search Feature Specification

**Owner:** Product / Build
**Priority:** HIGH
**Deadline:** Spec complete by 12 May 2026

**Context:** Buildscout's document text search is their most defensible feature. Trades can search planning documents for keywords like "timber frame", "velux windows", "two storey extension". This lets them hyper-target jobs that match their exact capability.

**Research questions:**
1. Can we extract text from planning documents (PDFs, images) at scale? What's the cost per document?
2. What are the top 20 keywords trades would search for? (extension, loft, heat pump, solar, EV charger, bathroom, kitchen, etc.)
3. Should this be a Pro-only feature or available on free tier (limited searches)?
4. Can we auto-tag leads by detected keywords instead of requiring manual search?

**Deliverable:** Technical feasibility assessment + feature spec with user flow: "Search keyword → see matching leads → WhatsApp alert for new matches."

---

## BRIEF 3: Pricing Experiments to Increase Conversion

**Owner:** Growth
**Priority:** HIGH
**Deadline:** Design experiments by 15 May 2026

**Context:** Current pricing is £29/mo Founding 30. We need to test what converts best and what the market will bear.

**Experiments to design:**

### Experiment A: Weekly vs Monthly framing
- Control: "£29/month"
- Variant: "£6.99/week"
- Hypothesis: Weekly framing reduces perceived cost by 40%+

### Experiment B: Annual lock-in discount
- Control: £29/mo monthly only
- Variant: "£249/year — save £98. Lock the founding price forever."
- Hypothesis: Annual option increases LTV by 3x even if conversion rate drops 10%

### Experiment C: Tiered pricing test
- Free: 3 scans/week, title + rough location
- Pro (£29/mo): unlimited scans, full card, WhatsApp alerts, source proof
- Pro+ (£49/mo): everything in Pro + document search + property value data + priority scoring
- Hypothesis: Pro+ captures higher-value users who would otherwise choose Buildscout at £239/mo

### Experiment D: Risk reversal
- Control: current messaging
- Variant: "30-day money-back. If you don't see at least one job worth chasing, we refund every penny."
- Hypothesis: Explicit refund guarantee increases free-to-paid conversion by 20%+

**Deliverable:** Experiment design doc with traffic split, success metrics, and implementation timeline.

---

## BRIEF 4: Integration Partnerships — Making JobFilter Stickier

**Owner:** Product / Partnerships
**Priority:** MEDIUM
**Deadline:** Partnership map by 22 May 2026

**Context:** JobFilter finds the lead. But what happens next? Integrations that connect JobFilter to the tools trades already use increase retention and reduce churn.

**Integration targets to research:**

### Immediate (build or partner within 60 days):
- **TradeFlow UK** — downstream enquiry handling. JobFilter GOLD alert → "Create job ticket" button. Revenue share opportunity.
- **WhatsApp Business API** — deeper integration: two-way messaging from alerts, auto-responses, lead status updates via WhatsApp.
- **Google Calendar** — "Add site visit to calendar" from lead card.

### Medium-term (90-180 days):
- **BuildScope / Quotable / PriceUp** — quoting tools. JobFilter finds the lead → one-tap "Generate quote" opens quoting tool with pre-filled project details.
- **Tradify / ServiceM8** — job management. JobFilter won lead → auto-create job in their system.
- **Xero / FreeAgent** — invoicing. Won job → pre-populated invoice.

### Long-term (6+ months):
- **Rightmove / Zoopla API** — property value data per lead (Buildscout does this). Helps trades qualify job value.
- **Companies House API** — for commercial leads, pull company details automatically.

**Deliverable:** Integration priority matrix: (impact on retention) x (implementation cost). Top 3 with outreach templates.

---

## BRIEF 5: Content/SEO Plays for Organic Growth

**Owner:** Growth / Content
**Priority:** HIGH
**Deadline:** Content calendar by 15 May 2026

**Context:** BuildAlert and Buildscout both prove that city-specific + trade-specific content ranks for low-competition keywords. JobFilter has three data sources (not one) and can produce better content.

**Content plays to execute:**

### Play 1: "2BuildUK Alternative" landing page
- URL: `/2builduk-alternative`
- Target keyword: "2builduk alternative", "2builduk shut down"
- Copy: direct, empathetic, solution-focused
- CTA: "Scan your postcode — free"
- Google Ads budget: £50/week for 4 weeks

### Play 2: City pages (5 priority cities)
- Birmingham, Manchester, London, Leeds, Bristol
- Template: "Construction Leads in [City] — Planning + EPC + Council Contracts"
- Include real data: planning apps per week, EPC context, local council tender info
- Pre-fill postcode on scan page
- Target: "construction leads [city]", "builder leads [city]"

### Play 3: Trade-specific pillar pages
- "How Plumbers Find Work Before It Hits MyBuilder"
- "How Electricians Find Planning-Approved Jobs Before Anyone Quotes"
- "How Builders Win Extension Jobs From Planning Data"
- "How Heat Pump Installers Find EPC Retrofit Work Before the Deadline"

### Play 4: Comparison pages (high commercial intent)
- `/vs/checkatrade` — "Checkatrade Alternatives for Tradesmen 2026"
- `/vs/buildalert` — "BuildAlert vs JobFilter: Which Finds Better Leads?"
- `/vs/buildscout` — "Buildscout vs JobFilter: £239/mo vs £29/mo"
- Include real data, not opinion. Trades can smell marketing.

### Play 5: "Signals This Week" — weekly automated content
- Not a blog. A data feed.
- "This week: 347 planning applications in Greater Manchester. 12 match your trade. 3 are GOLD."
- Auto-generated from JobFilter's own data.
- Shareable on social. Linkable from other sites.
- Builds authority + drives recurring visits.

**Deliverable:** 90-day content calendar with publication dates, target keywords, and responsible owner.

---

## BRIEF 6: Untested Messaging Angles

**Owner:** Growth / Copy
**Priority:** MEDIUM
**Deadline:** Copy variants by 19 May 2026

**Context:** Current messaging focuses on "find jobs before directories." These angles have not been tested and may resonate with different segments.

### Angle A: "The Quiet Week Problem"
- Pain: Trades have boom/bust cycles. Quiet weeks kill cashflow.
- Message: "Your quiet week isn't a skills problem. It's a pipeline problem. JobFilter fills it before it starts."
- Test on: homepage hero, Facebook ads targeting trades

### Angle B: "The First-Mover Advantage"
- Pain: Whoever quotes first wins 70%+ of jobs (Time To Scale data).
- Message: "The builder who turns up first gets the job. JobFilter tells you where to turn up."
- Test on: landing pages, comparison pages

### Angle C: "Stop Paying for Other People's Leads"
- Pain: Checkatrade sells the same lead to 5-8 trades. You're funding your competitor's pipeline.
- Message: "Every lead you buy on Checkatrade goes to 4 other blokes. You're paying to compete with yourself."
- Test on: homepage comparison table, Google Ads

### Angle D: "Your Competitor Is Already Using This"
- Pain: FOMO. If another builder in their area is getting leads first, they're losing jobs.
- Message: "Someone in your postcode area is already seeing these jobs before they hit Checkatrade. It could be you."
- Test on: retargeting ads, email sequences

### Angle E: "Built in Birmingham, Not London"
- Pain: Trades distrust London tech startups building tools they've never needed.
- Message: "Built in Birmingham by people who know how trades work. Not a London startup guessing."
- Test on: about page, homepage trust section

**Deliverable:** 5 messaging angle test plan with A/B test design, target audience, and success metrics.

---

## BRIEF 7: Feature Prioritisation — What to Build Next

**Owner:** Product
**Priority:** HIGH
**Deadline:** Prioritised roadmap by 22 May 2026

**Context:** Every feature must fit the Triple Engine model (Find / Chase / Win). Below are candidate features ranked by impact.

### Find Engine candidates:
1. **Document/keyword search** — lets trades filter planning docs by project type (HIGH impact, MEDIUM effort)
2. **Property value data per lead** — Rightmove integration for job value context (MEDIUM impact, MEDIUM effort)
3. **Trade-specific scoring** — plumber sees plumbing-relevant leads scored higher (HIGH impact, LOW effort — adjust scoring weights)
4. **Radius-based alerts** — "Alert me for anything within 15 miles of [postcode]" (HIGH impact, LOW effort)
5. **Commercial lead detection** — flag larger projects that need multiple trades (MEDIUM impact, MEDIUM effort)

### Chase Engine candidates:
1. **WhatsApp message templates** — pre-written outreach messages per lead type (HIGH impact, LOW effort)
2. **Auto-nudge if lead not contacted in 2h** — "You haven't acted on this GOLD lead yet" (HIGH impact, LOW effort)
3. **"Fill My Week" button** — aggressive scan for 5+ jobs on demand (MEDIUM impact, MEDIUM effort)
4. **Homeowner contact enrichment** — find phone/email from planning data (HIGH impact, HIGH effort — legal/privacy considerations)

### Win Engine candidates:
1. **"Did you win this job?" follow-up** — 24h after alert, ask for outcome (HIGH impact, LOW effort)
2. **Monthly ROI summary** — "You won X jobs worth ~£Y this month" (HIGH impact, LOW effort)
3. **Review link generator** — auto-create Google/Trustpilot review request after Won (MEDIUM impact, LOW effort)
4. **Won job leaderboard** — anonymised, "Trades in your area won £X this month" (MEDIUM impact, LOW effort — social proof)

**Deliverable:** Prioritised roadmap with effort/impact scoring and 30/60/90 day build plan.

---

## BRIEF 8: Reddit & Community Intelligence Gathering

**Owner:** Growth
**Priority:** MEDIUM
**Deadline:** Ongoing — first report by 22 May 2026

**Context:** Reddit is blocked to automated scraping. Manual research needed on UK trade communities.

**Communities to monitor:**
- r/ukelectricians
- r/DIYUK
- Screwfix Community Forum (screwfix.com/community)
- MyBuilder forum
- Checkatrade Trustpilot reviews (read the 1-2 star reviews from trades, not homeowners)
- Facebook groups: "UK Builders Network", "UK Electricians", "UK Plumbers Forum"

**What to track:**
- Complaints about existing lead platforms (Checkatrade, MyBuilder, Bark, BuildAlert, Buildscout)
- Requests for lead generation tools
- Pricing sensitivity ("too expensive", "worth every penny")
- Feature requests ("I wish it could...", "Why doesn't it...")
- Sentiment shifts after competitor changes (price increases, feature launches, shutdowns)

**Deliverable:** Monthly intelligence report with verbatim quotes, sentiment trends, and actionable product insights.

# Competitor Deep Dive — 2026-05-19

*Deep research on 5 competitors: FrameworkBuilt, Procore, Buildertrend, Housecall Pro, ServiceTitan.*
*Researched via WebSearch + WebFetch across Capterra, G2, Trustpilot, GetApp, vendor websites, Reddit threads.*

---

## IMPORTANT NOTE: FrameworkBuilt Does Not Exist

After exhaustive searching — direct URL checks (`frameworkbuilt.com`), site-specific searches, Crunchbase, LinkedIn, ProductHunt, and broad construction tech databases — **no company called "FrameworkBuilt" exists** as a verifiable entity. No results, no listings, no press coverage, no domain. This name does not correspond to any real competitor.

**What was found instead:** The closest real company using "Framework" branding in construction are:
- `framework.construction` — AI document analysis (PDF Q&A for estimators, US-focused)
- `frameworkai.ca` — Custom AI software for construction teams (Toronto, Canada)
- `frameworkecm.com.au` — Client & workflow management for residential builders (Australia)

None are UK-focused, none do lead generation, none compete with JobFilter. The section below covers `framework.construction` as the most prominent "Framework" brand, since it was likely what was intended.

---

---

# 1. Framework (framework.construction) — PRIORITY

*Note: Covered here as the best match for "FrameworkBuilt." This is Framework, an AI document analysis tool for construction teams.*

## A) Feature Matrix

| Feature | Framework Has It | JobFilter Has It | Gap / Opportunity |
|---|---|---|---|
| AI document Q&A (PDFs, drawings) | Yes — core product | No | Irrelevant to JobFilter's mission |
| Planning application monitoring | No | Yes — core product | JobFilter wins here |
| Lead generation / new project signals | No | Yes | No competition |
| Construction drawing analysis | Yes | No | Not a JobFilter gap — different category |
| Takeoff / estimate generation from drawings | Yes | No | Not relevant |
| EPC data integration | No | Yes | JobFilter advantage |
| WhatsApp lead delivery | No | Yes | JobFilter advantage |
| Lead scoring / SBS | No | Yes | JobFilter advantage |
| Pricing transparency | Yes (£17–£100/mo) | Yes | Parity |
| Free tier | Yes (1 project, limited) | Free tools available | Parity |
| UK focus | No — US enterprise focus | Yes | JobFilter wins |
| Mobile-first for tradesmen | No | Yes | JobFilter wins |

## B) Pricing

| Plan | Cost | Limits |
|---|---|---|
| Hobby | Free | 1 project, ~10 conversations/month |
| Starter | $20/mo (~£16) | Extended AI usage, unlimited storage |
| Pro | $40/mo (~£32) | 3 active projects, 3x usage |
| Pro+ | $120/mo (~£95) | Unlimited projects, 20x usage |

No free trial in the traditional sense. Free tier is permanently available but heavily capped. No contract; cancel anytime. Overage: $0.01 per 1,000 tokens.

## C) Top 3 Complaints

1. **PDF-only workflow:** Cannot ingest live CAD/Revit files — users must export to PDF first, adding friction and risk of outdated drawings.
2. **Not a decision-maker:** Framework is a search tool, not a project intelligence tool. It finds information in documents you already have; it cannot surface new opportunities you don't know about yet.
3. **Early-stage limitations:** Team permissions, advanced export options, and clash detection are absent. Feature roadmap is thin for complex multi-stakeholder projects.

## D) Killer Feature

**AI visual reading of construction drawings with inline citations.** Every answer Framework gives links directly to the exact page and drawing it sourced from. Estimators can interrogate multi-hundred-page drawing packs in seconds instead of hours. Users report saving 14+ hours per week on document research.

## E) Fatal Weakness (JobFilter should attack)

**Framework finds information in documents you already have — it cannot find you new work.** It is a document search tool masquerading as construction intelligence. Once a project lands in Framework, it's already awarded, contracted, and active. JobFilter surfaces the signal before the project is awarded — before competitors even know it exists. Framework is a back-office efficiency tool; JobFilter is a revenue generator.

**Attack line:** *"Framework searches documents. JobFilter finds the jobs before the documents exist."*

## F) Build Prompt (Killer Feature → JobFilter)

```
Build a "Document Intelligence" feature for JobFilter's lead detail page (src/pages/LeadDetailPage.tsx).

When a planning application lead is surfaced, attach any publicly available planning documents 
(submitted PDFs from council portals) and allow the user to ask plain-English questions:
"What type of extension is this?" / "What materials are specified?" / "How many units?"

Use OpenAI vision API to parse the attached PDFs. Return answers with inline source references 
(page number, document name). Cache results per lead ID in leadStore.ts.

Add a "Planning Docs" tab on LeadDetailPage, next to the existing signal cards. Show a chat-style 
interface. Restrict to paid users (check adminGuard.ts tier). This turns each lead from a data 
point into a briefing — letting trades quote more accurately without site visits.
```

---

---

# 2. Procore

## A) Feature Matrix

| Feature | Procore Has It | JobFilter Has It | Gap / Opportunity |
|---|---|---|---|
| Project management (scheduling, tasks, RFIs) | Yes — class-leading | No | Different category; not a gap |
| Document management (drawings, specs, revisions) | Yes — core strength | No | Not JobFilter's market |
| Budget / cost tracking | Yes | No | Not JobFilter's market |
| Lead generation (finding new work) | **No** | Yes | JobFilter wins completely |
| Planning application monitoring | No | Yes | JobFilter wins |
| EPC data integration | No | Yes | JobFilter wins |
| CRM / bid management | Via marketplace (third-party) | Lightweight lead tracking | Neutral |
| Mobile app for field workers | Yes | Yes (mobile-first) | Parity |
| Subcontractor management | Yes | No | Not relevant |
| UK localisation | Yes (Procore UK exists) | Yes | Parity |
| Small trades pricing | No — prohibitive | Yes — £0–£39/mo | JobFilter dominates |
| Free tier / entry level | No | Yes | JobFilter wins |
| Transparent pricing | No — custom quote only | Yes | JobFilter wins |

## B) Pricing

Procore does not publish pricing. All costs require a custom quote. Based on independently verified user reports:

| Company Size | Estimated Annual Cost |
|---|---|
| Small (~$4M ACV) | $6,000–$10,000/year (~£4,700–£7,900) |
| Mid-size ($10M–$50M ACV) | $12,000–$36,000/year |
| Enterprise ($50M+ ACV) | $60,000–$100,000+/year |

- Pricing model: percentage of Annual Construction Volume (ACV), roughly 0.05–0.2% of hard construction costs
- No free tier. No free trial.
- Annual contracts. Multi-year discounts available.
- Add-on modules (financial, bidding, quality/safety) priced separately.
- One Reddit-sourced example: $59M project volume → ~$80,000/year in Procore fees.
- UK quote received by one 12-person, £6M firm: £12,000+/year — refused on value grounds.

## C) Top 3 Complaints

1. **Cost vs value for small contractors:** The platform "rarely justifies its cost for contractors under $10M revenue." Small UK firms report feeling the pricing is designed for GCs managing £50M+ portfolios. One UK user: "The cost was not made for small businesses — when it came to renewal they weren't very accommodating, and we got the impression they were moving to bigger companies than ours."

2. **Complexity and learning curve:** "At times the system can be quite slow and hard to navigate." Subcontractors specifically complain about being forced to use Procore for every GC they work with, creating redundant data entry across multiple portals. Implementation alone takes 3–6 months before proficiency.

3. **No lead generation whatsoever:** Procore is a project delivery tool. Once you're in Procore, you already have the job. There is no feature — not even a marketplace integration — that helps contractors find new work, surface planning opportunities, or score incoming project signals.

## D) Killer Feature

**Unlimited users, unlimited data, unlimited support — one flat annual price per company.** Procore doesn't charge per seat. For a 50-person GC firm, this is transformative: no per-user billing anxiety, no hiding licenses from project managers, full adoption without financial penalty. Combined with their drawing management system (automatic revision tracking, markup tools, RFI threading), Procore is genuinely the best-in-class tool for managing a project you already have.

## E) Fatal Weakness (JobFilter should attack)

**Procore assumes you already have a job.** It is a project delivery tool that starts at contract award and ends at handover. It has zero capability to help a contractor win their next job. No lead gen, no planning data, no EPC signals, no early-warning system. A sole trader or small builder who uses Procore still has to find their own work through directories, Bark credits, and word of mouth. JobFilter exists entirely in the gap Procore doesn't fill — and never will.

**Attack line:** *"Procore runs your jobs. JobFilter finds them. You need both — but you can't afford Procore without JobFilter first."*

## F) Build Prompt (Killer Feature → JobFilter)

```
Build a "Project Pipeline" view in JobFilter — a Gantt-light board that lets a tradesperson 
track active quotes and won jobs alongside incoming leads.

Add a new page: src/pages/PipelinePage.tsx
Three columns: "New Leads" | "Quoted" | "Won/Active"

Drag-and-drop cards (use @dnd-kit/core). Card shows: lead address, trade type, SBS score, 
quote value (user-entered), expected start date (user-entered).

Store pipeline state in a new Supabase table: pipeline_items (user_id, lead_id, stage, 
quote_value, start_date, notes). Sync via api.ts.

Gate behind paid tier via adminGuard.ts. Add "Pipeline" nav item to TopNav.tsx.
This lets tradespeople see their entire workload — leads and live jobs — in one place.
JobFilter becomes a revenue dashboard, not just a lead finder.
```

---

---

# 3. Buildertrend

## A) Feature Matrix

| Feature | Buildertrend Has It | JobFilter Has It | Gap / Opportunity |
|---|---|---|---|
| Project scheduling (Gantt, dependencies) | Yes — class-leading | No | Different category |
| Client portal (homeowner-facing) | Yes — praised as killer feature | No | Opportunity to add |
| Lead management (CRM for leads you have) | Yes — built-in | Lightweight | Buildertrend ahead on CRM depth |
| Email marketing to past clients | Yes | No | Gap for retention plays |
| Proposal creation | Yes | No | Gap |
| Budget vs actual tracking | Yes | No | Not JobFilter's core |
| Lead generation (finding new work proactively) | **No** | Yes | JobFilter wins |
| Planning application monitoring | No | Yes | JobFilter wins |
| EPC data | No | Yes | JobFilter wins |
| WhatsApp lead delivery | No | Yes | JobFilter wins |
| Lead scoring | No | Yes | JobFilter wins |
| UK localisation | Partial (no UK-specific lead sources) | Yes | JobFilter wins |
| Pricing transparency | No — custom quote required | Yes | JobFilter wins |
| Entry-level pricing for sole traders | No (£270+/mo minimum) | Yes (£0–£39/mo) | JobFilter wins |
| Subcontractor invite (free) | Yes | No | Buildertrend advantage for GCs |
| QuickBooks / Xero sync | Yes | No | Gap for mature users |

## B) Pricing

Buildertrend requires a custom quote — no public pricing. Based on independently verified user reports (2026):

| Plan | Approximate Monthly Cost (Annual) | Approximate Monthly Cost (Monthly) |
|---|---|---|
| Essential | ~$339/mo (~£270) | ~$399/mo (~£315) |
| Advanced | ~$699/mo (~£555) | ~custom |
| Complete | ~$1,099/mo (~£870) | ~custom |

- Unlimited users on all plans. No per-seat charges.
- Unlimited projects on all plans.
- Annual discount: ~10% off.
- No free tier. No free trial (demo only).
- Price history: early adopters paid $99–199/mo in 2018–2019. Verified renewal hikes of 50–65% reported.
- **Critical complaint:** No self-serve bulk data export. Leaving Buildertrend requires manually extracting every file, photo, proposal, and record one by one.

## C) Top 3 Complaints

1. **Price escalation with no cap:** "Pricing has climbed dramatically over the past several years, with some long-term customers now paying two to five times their original rate for comparable features." No stated policy limiting future increases. Users become too embedded to leave without painful data migration.

2. **Atrocious UX on mobile and desktop:** "The product user experience is absolutely awful. It's a hard product to learn how to use, and there is like 10x more clicking than there needs to be." Cumbersome job-switching while clocked in, excessive daily email notifications that cannot be disabled, and a mobile app that shows unclear which job you're viewing vs clocked into.

3. **QuickBooks integration is broken for many:** "The QuickBooks integration was god awful and constantly f***ing things on the accounting end." Accounting functions described as "rather simplistic" — a serious gap given that financial management is central to the product promise.

## D) Killer Feature

**Client portal with automated homeowner notifications.** Buildertrend's client portal is repeatedly praised as the single feature that reduces client communication overhead dramatically. Homeowners log in to see photos, schedule updates, and approve change orders digitally. Multiple reviewers say it "dramatically reduces homeowner call volume" — one user said it cut client calls from 20/week to 3. For residential builders managing multiple jobs simultaneously, this is the feature they cannot give up.

## E) Fatal Weakness (JobFilter should attack)

**Buildertrend only activates once you already have a job — and then charges £270+/mo.** It's a sophisticated project delivery tool for established residential builders. It cannot find you work, has no UK planning data, no EPC signals, no early-warning on upcoming projects. A sole trader or two-person trades firm can't justify £270/mo before they've even won the job. JobFilter finds the jobs that fill the Buildertrend calendar — and costs a fraction of the price.

**Attack line:** *"Buildertrend organises the jobs on your calendar. JobFilter puts them there."*

## F) Build Prompt (Killer Feature → JobFilter)

```
Build a lightweight "Client Portal" for won leads in JobFilter.

When a user marks a lead as "Won" in the pipeline board (PipelinePage.tsx), generate a 
shareable link: /client/{job_id} — accessible without login.

The client-facing page (src/pages/ClientPortalPage.tsx) shows:
- Job address and trade type
- A progress status bar (Planning → Started → In Progress → Complete) — set by the tradesperson
- A photo upload section (tradesperson uploads from phone, client sees)
- A simple message thread (no accounts needed — client enters email to reply)

Store in Supabase: client_portal table with job_id, status, photos[], messages[].

Add "Share with client" button to PipelinePage. Auto-generates the link.
Gate portal creation behind paid tier (adminGuard.ts).
This gives JobFilter users a lightweight Buildertrend client portal for free — massive 
perceived value add at zero extra cost to the user.
```

---

---

# 4. Housecall Pro

## A) Feature Matrix

| Feature | Housecall Pro Has It | JobFilter Has It | Gap / Opportunity |
|---|---|---|---|
| Scheduling / dispatching | Yes — core, drag-and-drop | No | Gap for field service plays |
| Invoicing / payments | Yes — excellent | No | Not JobFilter's core |
| Online booking widget | Yes | No | Gap — customer self-book |
| GPS fleet tracking | Yes (add-on, unreliable) | No | Not JobFilter's core |
| Lead generation (finding new work) | **No** — Thumbtack integration only | Yes | JobFilter wins |
| Planning application monitoring | No | Yes | JobFilter wins |
| EPC data | No | Yes | JobFilter wins |
| WhatsApp delivery | No | Yes | JobFilter wins |
| Lead scoring | No | Yes | JobFilter wins |
| CRM (manage existing customers) | Yes | Light version | Housecall Pro ahead |
| Automated follow-up campaigns | Yes (Pipeline add-on) | No | Gap for retention |
| Review management | Yes | No | Gap |
| QuickBooks integration | Yes (Essentials+) | No | Gap |
| UK availability | Technically yes, but US-first | Yes, UK-native | JobFilter wins |
| Entry-level pricing | $59/mo (~£47) solo | £0–£39/mo | JobFilter wins on free tier |
| Free trial | 14-day | Free tier permanent | JobFilter wins |
| No long-term contract | Yes | Yes | Parity |

## B) Pricing

| Plan | Monthly (Annual) | Monthly (Month-to-Month) | Users |
|---|---|---|---|
| Basic | $59/mo (~£47) | $79/mo (~£63) | 1 user |
| Essentials | $149/mo (~£118) | $189/mo (~£150) | Up to 5 users |
| MAX | $299/mo (~£237) | $329/mo (~£261) | Up to 8 users |

- Additional users on MAX: $35/user/month
- No long-term contracts. Cancel anytime.
- 14-day free trial.
- Key add-ons (each priced separately): Sales Proposals ($40/mo), Vehicle GPS ($20/vehicle/mo), Recurring Service Plans ($40/mo), Price Book ($149/mo), Pipeline CRM (pricing unclear), HCP Assist call answering (pricing unclear).
- **Add-on cost creep is the #1 complaint** — essential features require separate purchases that inflate the real monthly cost well beyond the headline tier price.

## C) Top 3 Complaints

1. **Add-on cost creep:** "Cost creep from paid add-ons is the single most common reason businesses stop using Housecall Pro." Features that users expect to be included — GPS, proposals, recurring service plans, a proper price book — all require separate monthly fees. A user on Essentials who adds GPS + proposals + price book is paying £270+/mo for what looked like a £118/mo product.

2. **Support degraded to AI-only:** "A major complaint is that users can no longer talk to a human for tech support, only through AI." This change rolled out in early 2025. Multiple reviews cite being unable to resolve billing disputes, cancellations, or technical issues because AI support cannot handle complex cases. Users report feeling trapped.

3. **Billing and cancellation predation:** Reports of refusing to cancel accounts, charging after trials without consent, and offering discounts only after users threaten legal action. "Predatory behavior" appears across multiple Trustpilot reviews. The platform scored 3.1/5 on UK Trustpilot (593 reviews) — significantly below its Capterra rating, suggesting the gap between sales experience and lived experience is wide.

## D) Killer Feature

**Drag-and-drop scheduling + dispatch board.** Housecall Pro's scheduling interface is consistently the most praised feature: a real-time visual board showing which technician is where, what job is next, and whether they're running late. Dispatchers can drag jobs between technicians in seconds. For multi-tech field service businesses (plumbing firms, HVAC companies, electricians with 3–5 vans), this is the feature that saves hours daily.

## E) Fatal Weakness (JobFilter should attack)

**Housecall Pro manages the jobs you already have — it cannot find you new ones.** It integrates with Thumbtack for leads, but Thumbtack leads are shared (5+ trades per job) and cost-per-lead. There is no mechanism to spot a homeowner before they post on Thumbtack — before they've decided to get quotes at all. Housecall Pro is also fundamentally US-built and US-priced; UK trades pay USD prices for a product with no UK planning data, no council records integration, and support that has now moved to AI-only.

**Attack line:** *"Housecall Pro dispatches your team. JobFilter gives them jobs to go to."*

## F) Build Prompt (Killer Feature → JobFilter)

```
Build a "Today's Board" view for JobFilter — a dispatching/scheduling overlay for active leads.

Add src/pages/TodayPage.tsx

Show a timeline view (8am–6pm, hourly slots) where users can drag won leads onto time slots 
to create a day plan. Each slot card shows: address, job type, trade, estimated duration 
(user sets), and a "Navigate" button (opens Google Maps).

Allow users to set duration estimates on lead cards in LeadDetailPage.tsx.
Store schedule in Supabase: daily_schedule table (user_id, lead_id, date, start_time, duration).

Add "Today" to TopNav.tsx. On mobile, render as a stacked list (not Gantt).
Gate behind paid tier.

This adds dispatching capability to JobFilter — the feature Housecall Pro charges £118+/mo for — 
without requiring a separate tool. Especially useful for small trades managing 2–3 daily jobs.
```

---

---

# 5. ServiceTitan

## A) Feature Matrix

| Feature | ServiceTitan Has It | JobFilter Has It | Gap / Opportunity |
|---|---|---|---|
| Call recording + call source tracking | Yes — core to Marketing Pro | No | Significant gap for attribution |
| Campaign ROI tracking (ad → revenue) | Yes — Marketing Pro | No | Gap |
| Lead scoring (call quality) | Yes — call scoring | Yes (SBS score on signals) | Different approach; parity |
| Geographic heat mapping of ad spend | Yes | No | Gap — visual territory planning |
| CRM (full customer lifecycle) | Yes — very deep | Light | ServiceTitan far ahead |
| Automated technician dispatching | Yes | No | Different category |
| Scheduling / field ops | Yes — enterprise-grade | No | Different category |
| Lead generation (finding new work proactively) | **No** — only manages inbound | Yes | JobFilter wins |
| Planning application monitoring | No | Yes | JobFilter wins |
| EPC data | No | Yes | JobFilter wins |
| WhatsApp delivery | No | Yes | JobFilter wins |
| UK presence | Minimal — US-primary | Yes, UK-native | JobFilter wins |
| Small trades pricing | **No** — $245–$500/tech/month | Yes — £0–£39/mo | JobFilter wins decisively |
| Free tier | No | Yes | JobFilter wins |
| Transparent pricing | No — sales-only | Yes | JobFilter wins |
| No long-term contract | No — 12-month minimum | Yes | JobFilter wins |
| Implementation burden | High ($5k–$50k, 2–12 months) | None | JobFilter wins |

## B) Pricing

ServiceTitan does not publish pricing publicly. Based on independently verified user reports (2026):

| Plan | Per Technician / Month | 10-Tech Team / Year | 20-Tech Team / Year |
|---|---|---|---|
| Starter | ~$245–$300 | ~$29,400–$36,000 | ~$58,800–$72,000 |
| Essentials | ~$300–$400 | ~$36,000–$48,000 | ~$72,000–$96,000 |
| The Works | ~$400–$500 | ~$48,000–$60,000 | ~$96,000–$120,000 |

**Additional mandatory costs:**
- Implementation fees: $5,000–$50,000 (most common: $10,000–$30,000)
- Marketing Pro add-on: ~$2,000+/month (separate quote)
- Phones Pro, Dispatch Pro, Fleet Pro, Pricebook Pro: all additional monthly fees
- Contract: 12-month minimum. Early termination fees: $24,000–$50,000+ reported via BBB complaints.

**Year 1 total for a 10-tech team:** ~$57,000–$63,000+ before add-ons.

ServiceTitan has explicitly stated: *"Our platform is not optimised for companies with 3 or fewer technicians."* Best fit is 20+ technicians.

## C) Top 3 Complaints

1. **Implementation failure and non-onboarding:** "We have NEVER BEEN ONBOARDED. We have currently paid for 1 year of ServiceTitan even though we do not use the software." (BBB complaint). Multiple users report 6–12 month rollouts where staff are still not fully operational and the subscription clock is running throughout. One user said staff were "scared to dive in and learn."

2. **Data hostage:** Multiple contractors report that extracting their own business data after leaving ServiceTitan requires legal intervention. "Several contractors have reported needing lawyers just to retrieve their own records." ServiceTitan has been reported to BBB for this specifically. Contract termination fees of $24,000–$50,000+ have been imposed on businesses trying to exit.

3. **Built for enterprise, sold to small trades:** "It seems they are here to destroy small businesses to make more room for larger franchise." (November 2025 review). ServiceTitan's roadmap, pricing, and support model are all calibrated for franchise operations with 50–200 technicians. Small firms (under 10 techs) pay enterprise prices for a product that was never designed for their workflows.

## D) Killer Feature

**Marketing Pro: full-funnel ad attribution from campaign click to closed job revenue.** ServiceTitan's Marketing Pro assigns unique trackable phone numbers to every ad campaign (Google, Facebook, direct mail, etc.), records every inbound call, scores call quality (booked vs unbooked), and attributes closed job revenue back to the originating campaign. A plumbing company can see: "Our Google Ads campaign generated 47 calls this month, 31 were booked, average job value £380, campaign ROI: 340%." This level of attribution is genuinely enterprise-grade and not available in any UK trades tool at any price.

## E) Fatal Weakness (JobFilter should attack)

**ServiceTitan is an enterprise product with enterprise pricing, enterprise implementation burden, and enterprise lock-in — sold to small trades who can't afford or sustain it.** A 5-person electrical firm in Birmingham does not need a $30,000/year platform with a $15,000 implementation fee and 12-month minimum contracts. More critically: ServiceTitan only handles inbound calls — it assumes marketing is generating leads to your phone. It has zero capability to proactively surface projects before they become phone calls. JobFilter starts at £0, activates in minutes, and finds jobs before they ever generate a phone call.

**Attack line:** *"ServiceTitan costs more to implement than most tradespeople earn in a month. And it still won't find you work."*

## F) Build Prompt (Killer Feature → JobFilter)

```
Build "Lead Attribution Tracking" for JobFilter — a lightweight version of ServiceTitan's 
Marketing Pro attribution dashboard.

Add src/pages/AttributionPage.tsx

Allow users to tag each lead with how they first heard about JobFilter OR how they plan to 
approach the lead (cold letter, WhatsApp, referral, return client).

When a lead moves to "Won" in PipelinePage, prompt: "How did you win this job?" 
(dropdown: Planning lead, EPC signal, referral, direct approach).

Store in Supabase: win_attribution table (user_id, lead_id, source, quote_value, won_value, date).

Show a simple monthly summary on AttributionPage:
- Leads surfaced by source type
- Quote win rate by source
- Estimated revenue by source
- "Your best lead source this month: Planning applications (62% win rate)"

This gives tradespeople the ROI clarity that ServiceTitan charges £2,000+/mo for via Marketing Pro.
Gate behind paid tier. Add "Stats" link to TopNav.tsx.
```

---

---

# Summary: Competitor Landscape Position

| Competitor | Price Floor | Lead Gen? | UK-Native? | Small Trades Fit? | Direct Threat? |
|---|---|---|---|---|---|
| Framework.construction | $20/mo | No — doc analysis | No (US) | Not targeted | No |
| Procore | ~£400/mo equivalent | No | Partial | No | No |
| Buildertrend | ~£270/mo | No | No | Marginal | No |
| Housecall Pro | £47/mo | No (Thumbtack only) | No (US-first) | Partial | Marginal |
| ServiceTitan | £195+/tech/mo | No (inbound only) | No (US-primary) | No | No |

**Key finding:** None of the 5 competitors do proactive lead generation from UK planning, EPC, or council data. JobFilter has no direct competitor in the segment it occupies. The competitive threat is not product displacement — it is budget allocation (trades spending money on Bark/Checkatrade instead of JobFilter).

---

---

# Top 5 Features To Steal

## 1. Planning Document AI Q&A (from Framework.construction)

**Build it because:** Framework charges $40–$120/mo purely for the ability to ask questions about PDFs. JobFilter already has the planning application — adding AI Q&A on the attached planning documents (site plans, design statements, elevations) turns each lead from a data point into a briefing. A roofer can ask "what's the roof pitch?" A builder can ask "how many units?" before driving to quote.

**How to build:** Add a "Planning Docs" tab to `src/pages/LeadDetailPage.tsx`. Fetch planning PDFs from the council portal URL already stored per lead. Pass PDFs to OpenAI vision API. Return answers with page-level citations. Cache per `lead_id` in `leadStore.ts`. Gate behind paid tier via `adminGuard.ts`. No new infrastructure — just OpenAI API + a chat UI component.

---

## 2. Lightweight Client Portal for Won Jobs (from Buildertrend)

**Build it because:** Buildertrend's client portal is the single feature their users cannot give up — it eliminates homeowner phone calls. A shareable link per job where the client sees photos, progress status, and can message the tradesperson directly is genuinely high-value. Buildertrend charges £270–£870/mo for this. JobFilter can offer it as a paid-tier add-on — or as the "killer" feature that justifies upgrading from free.

**How to build:** New page `src/pages/ClientPortalPage.tsx` — public, no login required. Tradesperson generates a link from `PipelinePage.tsx` (to be built). Page shows job status (4-stage progress bar), photos (uploaded from phone), and a simple threaded message input. Store in Supabase `client_portal` table. The shareable URL format: `/client/{job_id}`. Gate portal *creation* behind paid tier; the portal *viewing* is public. This adds enormous perceived value for zero marginal cost.

---

## 3. Campaign Attribution / Win Source Tracking (from ServiceTitan Marketing Pro)

**Build it because:** ServiceTitan charges £2,000+/mo for Marketing Pro, whose core value is showing which lead source generates the most revenue. JobFilter can deliver 80% of that value at zero additional cost — just by asking users to tag how they won each job. Over time, this generates powerful data: "Your planning leads have a 58% win rate. Your EPC leads have a 41% win rate. You should prioritise planning." This is a retention feature — users who see ROI data never cancel.

**How to build:** Add win attribution prompt when a lead status moves to "Won" in the pipeline. Dropdown: "Planning lead / EPC signal / Cold letter / Referral / Return client / Other." Store in Supabase `win_attribution`. New page `src/pages/AttributionPage.tsx` showing win rate, average job value, and revenue estimate by source. Monthly email digest: "Here's what JobFilter found you this month." Link from `TopNav.tsx` as "Stats" or "My ROI."

---

## 4. AI-Scored Automated Follow-Up Sequences (from Housecall Pro Pipeline + ServiceTitan)

**Build it because:** Both Housecall Pro (Pipeline add-on) and ServiceTitan (Marketing Pro) charge significant fees for automated follow-up sequences. In both cases, the flow is: lead arrives → system sends automated outreach → tracks response → prompts next action. JobFilter already scores leads (SBS score). The natural next step is automated follow-up suggestions: "You haven't chased this 9/10 lead in 5 days. Want to send a WhatsApp follow-up?" This moves JobFilter from a lead-finder to a lead-closer.

**How to build:** Add a `chase_status` field to the lead store (already partially exists via `src/lib/chaseStore.ts`). Build a cron-style check (Supabase Edge Function): if a lead has SBS ≥ 7, was surfaced more than 3 days ago, and has no chase record — trigger a push notification or email: "Have you chased [address]? It's a strong lead." Add a "Remind me" button on `LeadCard.tsx`. Store chase timestamps and outcomes. Feed wins back into attribution.

---

## 5. Geographic Heat Map of Lead Density (from ServiceTitan Marketing Pro)

**Build it because:** ServiceTitan's geographic heat map — showing which postcodes generate the most revenue — is cited as one of Marketing Pro's most used features. JobFilter already has geographic lead data (planning applications by postcode, EPC data by postcode, council boundaries). A heat map showing "where the work is this month" in a tradesperson's radius is genuinely novel, useful, and visually compelling — exactly the kind of thing that converts free users to paid and drives social sharing.

**How to build:** Add a "Heat Map" tab to `src/pages/SignalsPage.tsx` or a standalone `src/pages/HeatMapPage.tsx`. Use Mapbox GL JS (or Leaflet, lighter weight) with a postcode polygon layer. Colour each postcode by lead volume this month (gradient: low = grey, high = red). Filter by trade type. Let user zoom to their working radius. On click: show lead count and average SBS score for that postcode. Data source: existing lead signals already in Supabase. Gate behind paid tier. Build prompt on free tier: "See where the work is → upgrade to unlock the map."

---

*Research completed: 2026-05-19*
*Next review recommended: 2026-06-16*
*Sources: Capterra UK, GetApp UK, G2, Trustpilot, Reddit (r/HVAC, r/plumbing, r/electricians, r/construction), vendor websites, independent pricing analysis sites (ITQlick, projul.com, fieldcamp.ai, downtobid.com, stackvett.com)*

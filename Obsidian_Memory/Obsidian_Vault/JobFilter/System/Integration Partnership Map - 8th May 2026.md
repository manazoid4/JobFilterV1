# Integration Partnership Map — 8 May 2026

**Owner:** Product / Partnerships
**Status:** Research complete — ready for outreach
**Next review:** 22 May 2026

---

## PRINCIPLE

JobFilter finds the lead. The integration layer decides what happens next.

Every integration must answer one question: does this make it harder for a trade to leave JobFilter?

If the answer is no, don't build it.

---

## INTEGRATION PRIORITY MATRIX

### Impact (retention) × Cost (implementation effort)

| Integration | Retention Impact | Implementation Cost | Priority Score | Tier |
|---|---|---|---|---|
| **WhatsApp Business API (deeper)** | HIGH | LOW | 9/10 | BUILD NOW |
| **Google Calendar** | MEDIUM | LOW | 7/10 | BUILD NOW |
| **TradeFlow UK** | HIGH | MEDIUM | 7/10 | PARTNER |
| **Companies House API** | MEDIUM | LOW | 7/10 | BUILD NOW |
| **Xero** | MEDIUM | MEDIUM | 5/10 | BUILD LATER |
| **ServiceM8** | MEDIUM | MEDIUM | 5/10 | BUILD LATER |
| **FreeAgent** | LOW | MEDIUM | 4/10 | BUILD LATER |
| **Tradify** | MEDIUM | MEDIUM | 4/10 | BUILD LATER |
| **Rightmove Data Services** | LOW | HIGH | 3/10 | EVALUATE |
| **Zoopla API** | LOW | HIGH | 3/10 | EVALUATE |
| **BuildScope / Quotable / PriceUp** | MEDIUM | HIGH | 3/10 | EVALUATE |

### Scoring logic

- **Retention Impact**: How much harder does this make it to cancel JobFilter?
- **Implementation Cost**: Dev time + API complexity + ongoing maintenance
- **Priority Score**: Impact minus Cost friction. Higher = do it first.

---

## TOP 5 INTEGRATIONS — TECHNICAL SPECS

### 1. WhatsApp Business API (Deeper Integration)

**What it is:** Meta's official API for business messaging. JobFilter already uses WhatsApp for alerts. This expands to two-way messaging, status updates, and automated responses.

**Who uses it:** 89% of UK trades use WhatsApp daily. It's the primary communication channel for self-employed trades.

**API availability:**
- Meta Cloud API (direct, no BSP required for basic use)
- WhatsApp Business Platform API v2.0+
- Documentation: https://developers.facebook.com/docs/whatsapp/
- Webhook-based message delivery
- Template messages for outbound alerts
- Two-way messaging support

**Integration complexity: LOW**

- JobFilter already sends WhatsApp alerts
- Adding two-way = webhook listener + message routing
- Template messages for: job accepted, job declined, site visit booked, quote sent
- Estimated build: 1-2 weeks

**Retention impact: HIGH**

- Trades live in WhatsApp. If JobFilter lives there too, leaving means losing their lead pipeline
- Two-way messaging means trades can manage leads without opening the app
- Becomes the default communication layer for their business

**Revenue share potential:** None directly. But enables premium WhatsApp features (auto-responses, lead status tracking) as a Pro+ upsell.

**Technical approach:**
```
JobFilter GOLD alert → WhatsApp template message
Trade replies "ACCEPT" → mark lead as contacted in JobFilter
Trade replies "VISIT [date]" → create calendar event + confirm via WhatsApp
Trade replies "QUOTE [amount]" → log quote value, trigger Win Engine follow-up
Trade replies "SKIP" → mark lead as declined, log reason
```

**Key endpoints:**
- `POST /v21.0/{phone-number-id}/messages` — send messages
- Webhook: `messages` event — receive replies
- Template management via Meta Business Suite

---

### 2. Google Calendar

**What it is:** Add site visits, follow-ups, and quote appointments directly to a trade's calendar from a lead card.

**Who uses it:** Most trades with smartphones use Google Calendar (Android default, widely used on iPhone too).

**API availability:**
- Google Calendar API v3 (REST)
- OAuth 2.0 authentication
- Documentation: https://developers.google.com/calendar/api
- Quickstarts for Node.js, Python, JavaScript
- Free tier: generous rate limits for this use case

**Integration complexity: LOW**

- Standard OAuth flow (user grants calendar access once)
- Create events via simple API call
- Event data: title (lead type), location (property address), description (lead details + JobFilter link), reminder
- Estimated build: 3-5 days

**Retention impact: MEDIUM**

- Not a dealbreaker on its own
- But combined with WhatsApp, it creates a "lead-to-calendar" workflow that feels complete
- Trades who schedule site visits through JobFilter are less likely to switch

**Revenue share potential:** None. Google doesn't do revenue share.

**Technical approach:**
```
Lead card → "Add to Calendar" button
OAuth popup → user grants calendar access
POST /calendar/v3/calendars/{calendarId}/events
{
  "summary": "Site Visit — [Lead Type] at [Postcode]",
  "location": "[Property Address]",
  "description": "JobFilter lead: [details]\nSource: [planning/EPC/contract]\nView full lead: [URL]",
  "start": { "dateTime": "[user-selected-time]" },
  "end": { "dateTime": "[user-selected-time + 1hr]" },
  "reminders": { "useDefault": false, "overrides": [
    { "method": "popup", "minutes": 60 }
  ]}
}
```

---

### 3. TradeFlow UK (Partnership)

**What it is:** TradeFlow Assist (tradeflowuk.com) handles enquiry management for UK trades. It captures customer enquiries via branded forms and AI phone lines, filters time-wasters, and delivers job tickets to WhatsApp/email. Operated by TF Assist Ltd (Company #16713090).

**Who uses it:** UK trades across electrical, plumbing, joinery, roofing. Plans: Starter (email only), Complete (email + WhatsApp), Complete + AI Phone Line. Rolling monthly, cancel anytime with 30 days notice.

**API availability:** NO PUBLIC API

- WordPress-based site (Elementor)
- No developer portal or documented API
- Enquiry handling is form-based → email/WhatsApp delivery
- ICO registered (ZC043097), GDPR compliant

**Integration complexity: MEDIUM**

- No API means this is a partnership, not a technical integration
- Options:
  - **Option A (simple):** JobFilter "Create job ticket" button opens TradeFlow enquiry form with pre-filled lead data (URL params)
  - **Option B (medium):** Custom webhook integration — JobFilter pushes lead data to TradeFlow's form submission endpoint
  - **Option C (deep):** Co-branded feature — TradeFlow adds JobFilter as a lead source in their system
- Estimated build: Option A = 1 day, Option B = 1-2 weeks, Option C = 4-6 weeks + partnership negotiation

**Retention impact: HIGH**

- TradeFlow handles what happens AFTER the lead is contacted
- Combined: JobFilter finds the lead → TradeFlow manages the enquiry → trade wins the job
- This is the complete Find → Chase → Win pipeline
- If a trade uses both, leaving JobFilter breaks their entire workflow

**Revenue share potential: HIGH**

- TradeFlow plans are rolling monthly (undisclosed pricing, likely £30-80/mo based on tier)
- Referral model: JobFilter users get 14-day free trial + 10% discount, JobFilter gets 20% rev share on converted users
- Co-marketing: "JobFilter finds it. TradeFlow closes it."

**Contact approach:**
- Company: TF Assist Ltd
- Registered: 60 Tottenham Court Road, Fitzrovia, London, W1T 2EW
- Social: Facebook (tradeflowassist), Instagram (@tradeflowassist)
- Website contact form: tradeflowuk.com/#enquiry
- No public founder name — reach out via website form + social DM

**Partnership proposal:**
- JobFilter GOLD alert includes "Send to TradeFlow" button
- Pre-fills: lead type, location, estimated value, source
- TradeFlow handles customer enquiry capture from there
- Revenue share: 20% of first 3 months for referred users
- Co-branded landing page: "Find leads. Close jobs. One system."

---

### 4. Companies House API

**What it is:** UK government API for retrieving company information. Free, public, REST-based. Pull company details for commercial leads automatically.

**Who uses it:** Any developer building B2B tools in the UK. Used by credit checkers, KYC platforms, and business intelligence tools.

**API availability:**
- REST API, fully documented
- Free to use (no rate limit concerns for our volume)
- Authentication: Basic Auth with API key
- Documentation: https://developer.company-information.service.gov.uk/
- Developer forum: https://forum.aws.chdev.org/
- No OAuth needed — simple API key registration

**Integration complexity: LOW**

- Register for API key (free, instant)
- Simple GET requests: `/company/{company_number}`
- Returns: company name, status, registered address, officers, SIC codes, filing history
- Estimated build: 2-3 days

**Retention impact: MEDIUM**

- Adds commercial lead qualification — trades can see company size, status, and history before chasing
- Differentiator vs competitors (nobody else does this at £29/mo)
- Makes JobFilter useful for commercial trades, not just domestic

**Revenue share potential:** None. Government API, free to use.

**Technical approach:**
```
Commercial lead detected → auto-enrich with Companies House data
GET https://api.company-information.service.gov.uk/company/{number}
Response: {
  "company_name": "ABC Builders Ltd",
  "company_status": "active",
  "registered_office_address": { ... },
  "sic_codes": ["41201 - Construction of commercial buildings"],
  "date_of_creation": "2015-03-12",
  "accounts": { "next_due": "2026-12-31" }
}
Display on lead card: company age, status, trade classification
```

**Use cases:**
- Verify commercial lead is a real, active company
- Show company age (older = more established = better lead)
- SIC code matching (does this company do work relevant to the trade?)
- Auto-flag dissolved companies as BIN

---

### 5. Xero

**What it is:** UK's most popular cloud accounting for small businesses. 2.5M+ subscribers globally, strong UK trade adoption. Invoicing, payroll, expenses, bank reconciliation.

**Who uses it:** Small trade businesses (1-10 employees), especially electricians, plumbers, builders who need proper invoicing and tax compliance.

**API availability:**
- Xero Accounting API (OAuth 2.0)
- Documentation: https://developer.xero.com/documentation/
- SDKs: Node.js, .NET, Java, PHP, Python, Ruby
- Xero App Marketplace for listing integrations
- Preferred App Partner programme available
- Rate limits: 60 calls/minute per tenant

**Integration complexity: MEDIUM**

- OAuth 2.0 flow with token refresh
- Create contacts, invoices, quotes via API
- Need to handle: tenant selection (users may have multiple orgs), token expiry, rate limits
- Estimated build: 2-3 weeks

**Retention impact: MEDIUM**

- Won job → pre-populated invoice in Xero saves 10-15 minutes per job
- Trades who invoice through JobFilter → Xero are less likely to switch
- But Xero is already sticky on its own — this is a convenience, not a lock-in

**Revenue share potential: LOW-MEDIUM**

- Xero App Marketplace listing drives visibility
- No direct revenue share
- But Xero has a partner programme — could explore co-marketing

**Technical approach:**
```
Trade marks lead as "WON" → "Create Invoice in Xero" button
OAuth flow → user connects Xero account
POST /api.xro/2.0/Contacts (if new customer)
POST /api.xro/2.0/Invoices
{
  "Type": "ACCREC",
  "Contact": { "Name": "[Customer Name]" },
  "LineItems": [
    { "Description": "[Job type from lead] — [Address]", "Quantity": 1, "UnitAmount": "[Quote amount]" }
  ],
  "Date": "[Today]",
  "DueDate": "[Today + 30 days]"
}
Redirect to Xero invoice URL for review/send
```

---

## INTEGRATIONS TO EVALUATE (NOT YET PRIORITIZED)

### ServiceM8

- **What:** Job management for trades & services. Scheduling, quoting, invoicing, payments, forms. £25-269/mo.
- **API:** Yes — developer portal at developer.servicem8.com. Add-on store with revenue share (set monthly fee, ServiceM8 collects payment).
- **Complexity:** MEDIUM — REST API, OAuth, add-on framework
- **Impact:** MEDIUM — good for trades already on ServiceM8, but it's a smaller user base than Xero
- **Revenue share:** YES — ServiceM8 add-on store handles billing, you set the price
- **Verdict:** Build after Xero. The add-on store model is attractive but the user base is smaller.

### FreeAgent

- **What:** Accounting software for freelancers and small businesses. £10-33/mo. Owned by NatWest. Strong UK presence.
- **API:** Yes — REST API at dev.freeagent.com. OAuth 2.0. Integration requests: integrationsrequests@freeagent.com
- **Complexity:** MEDIUM — standard OAuth, well-documented
- **Impact:** LOW-MEDIUM — smaller trade adoption than Xero
- **Revenue share:** None directly. Partner programme exists for accountants, not app developers
- **Verdict:** Build alongside Xero if demand emerges. Lower priority due to smaller trade user base.

### Tradify

- **What:** Job management app for trades. Quoting, scheduling, invoicing. Australia-based, growing UK presence.
- **API:** Limited public information. No developer portal found.
- **Complexity:** UNKNOWN — likely requires partnership discussion first
- **Impact:** MEDIUM — if they gain UK traction
- **Verdict:** Monitor. Reach out when UK user base is clearer.

### Rightmove Data Services

- **What:** Property data services — valuations, market intelligence, risk alerts. API available for Surveyors Comparable Tool and Automated Valuation Model.
- **API:** Yes — but enterprise-only. Contact form at rightmove.co.uk/property-data/contact-us/
- **Complexity:** HIGH — enterprise sales process, likely expensive, bespoke contracts
- **Impact:** LOW for individual trades (they don't need AVM-level data)
- **Cost:** Likely £1,000+/mo based on enterprise positioning
- **Verdict:** Not viable at current stage. Revisit when JobFilter has 1,000+ paying users and can justify enterprise data costs.

### Zoopla API

- **What:** Property data and valuations. Previously had a public developer API.
- **API:** Developer page returns 403 — API may be deprecated or restricted
- **Complexity:** HIGH — unclear if API is still available
- **Verdict:** Monitor. If Rightmove is too expensive, explore Zoopla as alternative. But current API status is uncertain.

### BuildScope / Quotable / PriceUp

- **What:** Quoting tools for construction trades.
- **API:** No public APIs found for any of these
- **Complexity:** HIGH — would require partnership negotiations with each
- **Verdict:** Low priority. Quoting is adjacent to JobFilter's core (finding leads). Build native quoting before partnering.

---

## OUTREACH TEMPLATES

### Template 1: TradeFlow UK (Partnership)

**Subject:** Partnership: JobFilter leads → TradeFlow enquiries

**Channel:** Website contact form + Instagram DM (@tradeflowassist)

---

Hi TradeFlow team,

I run JobFilter — we find construction leads for UK trades from planning applications, EPC data, and council contracts. Trades get WhatsApp alerts when a job matches their trade and area.

Your enquiry handling system is exactly what our users need after they find a lead. Right now they get the alert, then switch to their own messy process to follow up. Together it would be:

JobFilter finds the lead → TradeFlow handles the enquiry → trade wins the job.

I'd like to explore a partnership:
- JobFilter adds a "Send to TradeFlow" button on lead cards
- Pre-fills lead data (type, location, estimated value) into TradeFlow
- Revenue share on referred users (we'd promote TradeFlow to our user base)
- Co-branded messaging: "Find leads. Close jobs."

We're Birmingham-built, £29/mo, and growing fast. Our users are exactly your target market — UK trades who want a proper system without hiring admin staff.

Are you open to a quick call next week?

Best,
[Name]
JobFilter

---

### Template 2: ServiceM8 (Add-on Partnership)

**Subject:** JobFilter integration — lead-to-job pipeline for UK trades

**Channel:** developer.servicem8.com + partner enquiry form

---

Hi ServiceM8 partnerships team,

I'm building JobFilter — a lead finding platform for UK trades that scans planning applications, EPC data, and council contracts to find jobs before they hit directories.

We'd like to build a JobFilter add-on for ServiceM8:
- When a trade wins a JobFilter lead, one tap creates a job in ServiceM8
- Pre-populated with: customer details, job type, location, estimated value, source reference
- Trades skip the manual data entry and go straight to scheduling/quoting

Your developer programme and add-on store model is exactly what we're looking for. We'd list JobFilter as a paid add-on and let ServiceM8 handle billing.

Our users are UK electricians, plumbers, builders, and roofers — the same trades who use ServiceM8. This makes JobFilter the front end of the ServiceM8 pipeline.

Can we get a developer account set up and discuss the add-on approval process?

Best,
[Name]
JobFilter

---

### Template 3: FreeAgent (Integration Request)

**Subject:** Integration request: JobFilter → FreeAgent invoice automation for trades

**Channel:** integrationsrequests@freeagent.com

---

Hi FreeAgent integrations team,

I'd like to request an integration between JobFilter and FreeAgent.

JobFilter finds construction leads for UK trades (planning applications, EPC data, council contracts). When a trade wins a job through JobFilter, we'd like to auto-create a pre-populated invoice in FreeAgent:
- Customer name and address from the lead
- Job description (type of work, location)
- Estimated value
- Link back to the original lead for reference

This saves trades 10-15 minutes per job on admin. Our users are sole traders and small trade businesses — exactly the FreeAgent customer profile.

We're happy to build and maintain the integration ourselves via your API. We'd just need to be listed on your integrations page so users can discover and connect it.

Can you share the process for getting listed as a FreeAgent integration partner?

Best,
[Name]
JobFilter

---

## IMPLEMENTATION TIMELINE

### Days 1-30: Quick Wins

**Week 1-2: Google Calendar Integration**
- Set up Google Cloud project + OAuth consent screen
- Build "Add to Calendar" button on lead cards
- Implement event creation with lead data
- Test with internal team
- Deploy to Pro users

**Week 2-3: Companies House API Integration**
- Register for API key (free, instant)
- Build company enrichment for commercial leads
- Auto-detect company status (active/dissolved)
- Display company info on commercial lead cards
- Deploy

**Week 3-4: WhatsApp Business API (Phase 1)**
- Set up Meta Cloud API access
- Add reply handling for existing alerts
- Implement: ACCEPT, SKIP, VISIT reply keywords
- Log responses in JobFilter database
- Deploy to Pro users

**Deliverable at Day 30:**
- Google Calendar: live
- Companies House: live
- WhatsApp replies: live (basic)
- TradeFlow outreach: sent

---

### Days 31-60: Partnership Builds

**Week 5-6: WhatsApp Business API (Phase 2)**
- Template messages for lead status updates
- Two-way messaging: trade can query lead details via WhatsApp
- Auto-reminders: "You haven't contacted this lead in 2 hours"
- Deploy to all users

**Week 6-7: TradeFlow Partnership**
- Follow up on outreach
- Negotiate revenue share terms
- Build Option A integration (URL param pre-fill) — 1 day if they agree
- Co-branded landing page
- Launch to users

**Week 7-8: Xero Integration (Start)**
- Register as Xero developer
- Build OAuth flow
- Implement contact + invoice creation
- Internal testing

**Deliverable at Day 60:**
- WhatsApp two-way: live
- TradeFlow integration: live (if partnership agreed)
- Xero: beta testing

---

### Days 61-90: Depth & Scale

**Week 9-10: Xero Integration (Complete)**
- Complete OAuth + invoice creation
- Handle edge cases (multiple orgs, token refresh, rate limits)
- App Marketplace listing application
- Deploy to Pro+ users

**Week 10-11: ServiceM8 Developer Account**
- Register developer account
- Build add-on skeleton
- Implement lead → job creation
- Submit for add-on store review

**Week 11-12: Integration Dashboard**
- Build user-facing settings page: "Connected Apps"
- Show which integrations are active
- Allow users to connect/disconnect each integration
- Usage stats per integration

**Week 12-13: Retention Measurement**
- Track: do users with 2+ integrations churn less?
- Measure: which integration correlates with highest retention?
- Report: integration adoption rates by user segment
- Plan: next integration based on data

**Deliverable at Day 90:**
- 5 integrations live or in beta
- Integration dashboard for users
- Retention data on integration impact
- Clear roadmap for next quarter

---

## RETENTION HYPOTHESIS

| Integrations Connected | Expected Monthly Churn | Rationale |
|---|---|---|
| 0 (JobFilter only) | 8-12% | Easy to cancel, no switching cost |
| 1 (Calendar or Companies House) | 6-8% | Minor convenience, easy to replace |
| 2 (WhatsApp + one other) | 4-6% | WhatsApp creates daily habit |
| 3+ (WhatsApp + Calendar + TradeFlow/Xero) | 2-4% | Breaking the workflow costs more than £29/mo |

**Target:** Get 40% of Pro users to connect 2+ integrations within 90 days.

---

## RISK REGISTER

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| WhatsApp API policy changes | Medium | High | Build fallback to email alerts; diversify delivery channels |
| TradeFlow partnership rejected | Medium | Medium | Build native enquiry handling as backup; approach Commusoft instead |
| Xero app review rejection | Low | Low | Follow guidelines strictly; build clean OAuth flow |
| Companies House API rate limits | Low | Low | Cache responses; rate limit is generous for our volume |
| Rightmove/Zoopla data too expensive | High | Low | Not critical path; skip until 1,000+ users |
| Integration maintenance overhead | Medium | Medium | Build monitoring; alert on API failures; document all integrations |

---

## NEXT ACTIONS

1. **This week:** Register Google Cloud project + Companies House API key
2. **This week:** Send TradeFlow partnership outreach
3. **This week:** Apply for Meta Cloud API access
4. **Next week:** Start Google Calendar integration build
5. **Next week:** Send ServiceM8 developer registration
6. **By 22 May:** Review integration adoption metrics from first 30 days

---

*Saved: 8th May 2026*
*Owner: Partnerships*
*Next review: 22nd May 2026*

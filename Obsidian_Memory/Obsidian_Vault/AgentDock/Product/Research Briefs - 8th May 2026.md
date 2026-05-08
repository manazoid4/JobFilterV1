# Research Briefs — 8th May 2026

## Connector Strategy

### Phase 1: ServiceNow First (Weeks 1-6)

**Why ServiceNow first:**
- Highest ACV customers run ServiceNow ($100-300/user/month already invested)
- ServiceNow customers have compliance requirements (audit, approval, SLA)
- No competitor has a ServiceNow-first agent operations product
- Complaint management is a native ServiceNow workflow (CSM module)

**What to build:**
- REST API connector with OAuth 2.0 authentication
- Read: incidents, cases, complaints, SLA definitions
- Write: create records, update status, add work notes, assign agents
- Webhook listener: real-time trigger on new/updated tickets
- Data mapping: ServiceNow ticket → AgentDock task card

**Validation metric:** Can we pull a live ServiceNow complaint, triage it with an agent, draft a response, require human approval, and update the record — all visible in the Operations Dock?

### Phase 2: Zendesk (Weeks 7-10)

**Why Zendesk second:**
- Second-largest ticketing platform in target market
- SMB/mid-market customers who can't afford ServiceNow
- Validates multi-system orchestration claim

**What to build:**
- API connector with OAuth/token authentication
- Read: tickets, users, organizations, SLA policies
- Write: create tickets, update status, add comments, change priority
- Webhook listener: real-time trigger on new/updated tickets

### Phase 3: Jira + Email (Weeks 11-14)

**Why Jira third:**
- Dev/IT teams running Jira Service Management
- Completes the "big three" ticketing platforms

**What to build:**
- Jira REST API connector
- Email connector (IMAP/SMTP) for non-ticketing workflows
- Generic webhook connector for custom systems

### Connector Architecture Decision

**Build as plugins, not monolith:**
```
connectors/
  servicenow/
    auth.py
    mapper.py
    actions.py
    webhook.py
  zendesk/
    auth.py
    mapper.py
    actions.py
    webhook.py
```

Each connector implements a standard interface:
- `authenticate()` — connect to system
- `fetch_tickets(query)` — pull work items
- `create_record(data)` — write back
- `update_record(id, data)` — modify existing
- `listen_webhook()` — real-time triggers

This enables third-party connector SDK (future revenue stream).

---

## Pricing Experiments

### Experiment 1: Founding 10 Price Lock

**Hypothesis:** Service managers will pay £349/mo for compliance-ready agent operations if we prove value in 30 days.

**Design:**
- Offer first 10 customers £349/mo locked for life
- Include free custom connector build (£2,500 value)
- Require 30-day pilot with success criteria
- Collect testimonials and case study rights

**Success metric:** 7/10 convert to paying after pilot.

### Experiment 2: Per-Agent Overage

**Hypothesis:** Customers will pay £25/agent/mo beyond plan limit because each agent delivers measurable ROI.

**Design:**
- Business tier includes 15 agents
- Charge £25/agent/mo for 16-30 agents
- Enterprise: unlimited

**Success metric:** 40% of Business customers add 1-5 extra agents within 90 days.

### Experiment 3: Compliance Add-On

**Hypothesis:** Compliance teams will pay £99/mo extra for extended audit retention + export + compliance reports.

**Design:**
- Starter: 30-day audit (included)
- Business: 1-year audit (included)
- Compliance add-on: unlimited retention + CSV/PDF export + quarterly compliance reports
- Target: regulated industries (finance, healthcare, telecom)

**Success metric:** 30% of Business customers add compliance pack within 60 days.

### Experiment 4: Custom Connector Pricing

**Hypothesis:** Customers will pay £2,500 one-off for custom connectors to their specific systems.

**Design:**
- Offer to every prospect during sales call
- 2-week delivery SLA
- Includes API integration, data mapping, action templates, webhook listeners
- Ongoing maintenance included in subscription

**Success metric:** 50% of Enterprise prospects request custom connector.

### Experiment 5: Annual Prepay

**Hypothesis:** 20% annual discount will drive 40% of customers to annual billing.

**Design:**
- Monthly: £349/mo
- Annual: £279/mo (£3,348 billed upfront)
- Offer during onboarding and at 6-month renewal

**Success metric:** 40% choose annual at signup.

---

## Messaging Angles

### Primary Message (Homepage Hero)

> **AI agents in your service desk. Without replacing your service desk.**
>
> Drop agents into ServiceNow, Zendesk, or Jira. See everything they do. Control every action. Keep your tools.

### Secondary Messages

**For Service Managers:**
> "Your team doesn't need more tickets. It needs better signals."
>
> SLA risk, complaint risk, churn risk. One clean view. Agents handle the work. You handle the decisions.

**For Compliance Teams:**
> "Every agent action logged. Every critical action approved. Every audit ready."
>
> Immutable audit trails. Approval gates. Export-ready reports. AI that passes compliance review.

**For IT Leaders:**
> "Plug agents into your existing systems. No custom integration projects. No rip and replace."
>
> ServiceNow, Zendesk, Jira — connected in hours, not months. Agents do the work. You see everything.

**For CFOs:**
> "Reduce ticket handling time by 40%. Prevent revenue-leaking credits and churn. Scale without hiring."
>
> £349/mo for the operations layer that makes AI agents safe, visible, and accountable.

### Competitive Positioning Statements

**vs Relevance AI:**
> "Relevance AI automates your sales pipeline. AgentDock controls your service operations. Different problem, different product."

**vs LangGraph/CrewAI:**
> "LangGraph and CrewAI give developers tools to build agents. AgentDock gives service managers control over agents that are already built."

**vs ServiceNow Now Assist:**
> "Now Assist works inside ServiceNow. AgentDock works across ServiceNow, Zendesk, Jira, and email — with visibility and control Now Assist can't provide."

**vs n8n:**
> "n8n is workflow automation for technical teams. AgentDock is agent operations for service managers. Different buyer, different outcome."

---

## Feature Roadmap

### MVP (Months 1-3)

**Must ship:**
- [x] Operations Dock dashboard
- [x] Agent Board with status cards
- [x] Pipeline View (complaint management workflow)
- [x] ServiceNow connector (REST API)
- [x] Review Gate (human approval)
- [x] Handoff Log with audit trail
- [x] OpenAI + Anthropic support
- [x] Seed data for testing

**Success criteria:** Can run 2-3 agents on a live ServiceNow dev instance with full visibility and approval gates.

### V1 (Months 4-6)

**Ship:**
- [ ] Zendesk connector
- [ ] Pipeline templates (triage, escalation, response drafting, report generation)
- [ ] Per-agent memory notes
- [ ] Workflow context files (rules, escalation paths)
- [ ] Run history
- [ ] Conflict warnings (two agents on same ticket)
- [ ] Email connector (IMAP/SMTP)
- [ ] Webhook connector (generic)
- [ ] Audit log export (CSV)

**Success criteria:** 3 paying customers running production workflows.

### V2 (Months 7-9)

**Ship:**
- [ ] Jira connector
- [ ] Compliance mode (all actions logged, approval required)
- [ ] Role-based access (admin, operator, viewer)
- [ ] Escalation rules (auto-escalate if no human response in X hours)
- [ ] SLA risk scoring
- [ ] Churn warning signals
- [ ] Dashboard: "What's at risk today" view
- [ ] Audit log export (PDF)

**Success criteria:** 10 paying customers. First enterprise deal.

### V3 (Months 10-12)

**Ship:**
- [ ] SSO / SAML
- [ ] Custom compliance rules (GDPR, SOC 2 alignment)
- [ ] Connector SDK (third-party developers)
- [ ] Custom pipeline builder
- [ ] Multi-tenant enterprise features
- [ ] Department-level permissions
- [ ] White-glove onboarding flow
- [ ] API for external integrations

**Success criteria:** 25 paying customers. £10K MRR.

---

## Go-To-Market Strategy

### Phase 1: Direct Outreach (Months 1-3)

**Target:** Service managers at telecom, broadband, managed services companies (50-500 employees)

**Tactic:**
- LinkedIn outreach to "Head of Customer Operations", "Service Manager", "Customer Experience Director"
- Message: "We built an operations layer for AI agents in ServiceNow. Can I show you a 10-min demo?"
- Offer: Free 30-day pilot with custom connector

**Goal:** 50 conversations → 10 pilots → 3 paying customers

### Phase 2: Content + SEO (Months 4-6)

**Target:** Service managers searching for AI solutions

**Content:**
- "How to deploy AI agents in ServiceNow without replacing it"
- "AI compliance checklist for service operations"
- "ServiceNow + AI: what works, what doesn't"
- Case study: first customer results

**Goal:** 1,000 monthly visitors → 50 demo requests → 10 paying customers

### Phase 3: Partnerships (Months 7-12)

**Target:** ServiceNow implementation partners, MSPs, IT consultancies

**Tactic:**
- Partner program: 20% revenue share for referrals
- Co-sell with ServiceNow partners who need AI capabilities
- White-label option for MSPs managing multiple client instances

**Goal:** 5 partners → 25 customers → £10K MRR

---

## Key Problems AgentDock Solves (Top 3)

### 1. Invisible Agent Work
**Problem:** Agents operate in terminals, chat windows, and scattered logs. Service managers can't see what agents are doing without reading technical logs.

**Competitor gap:** LangSmith shows traces (developer debugging). CrewAI shows deployments (engineer metrics). Relevance AI shows activity (GTM metrics). None show service operations.

**AgentDock solution:** Operations Dock — real-time view of every agent, every workflow, every system. Status visible without opening logs.

### 2. Uncontrolled Agent Autonomy
**Problem:** Agents make decisions without human oversight. Critical actions (credits, escalations, data changes) happen without approval. Compliance teams block AI adoption because of this risk.

**Competitor gap:** Relevance AI pushes toward L4 self-driving autonomy. CrewAI pushes autonomous crews. LangGraph has HITL but as a debugging feature. None have approval gates designed for business workflows.

**AgentDock solution:** Review Gate — human checkpoint before every critical action. Configurable per workflow, per action type. Escalation rules if no response.

### 3. No Cross-System Audit Trail
**Problem:** Agents work across ServiceNow, Zendesk, email, and custom systems. No single audit trail spans all of them. Compliance teams can't produce evidence of what agents did, when, and why.

**Competitor gap:** Relevance AI has audit logs but GTM-focused. n8n has execution logs but not compliance-ready. SmythOS has log retention but infrastructure-focused. None offer immutable, export-ready audit trails for ITSM operations.

**AgentDock solution:** Handoff Log — every action logged with timestamp, agent, action, system, and outcome. CSV/PDF export for auditors. Immutable by design.

---

## The Wedge

**ServiceNow complaint management.**

Why:
- Complaints are high-risk (regulatory, financial, reputational)
- ServiceNow is the system of record for complaints in target market
- Complaint workflows require human judgment (perfect for Review Gate)
- Compliance teams care about complaint handling (perfect for audit trail)
- Service managers feel the pain daily (perfect buyer)

**Beachhead:** Telecom/broadband companies with 50-500 employees running ServiceNow CSM.

**Expansion:** From complaint management → ticket triage → response drafting → escalation → full service operations.

**Platform play:** From ServiceNow → Zendesk → Jira → custom systems → connector marketplace.

---

## What the MVP Must Prove

1. **Agents can work inside ServiceNow without custom code** — connector proves plug-and-play claim
2. **Service managers can see agent work without reading logs** — Operations Dock proves visibility claim
3. **Human approval gates don't slow down workflows** — Review Gate proves control-without-friction claim
4. **Audit trails satisfy compliance teams** — Handoff Log export proves compliance-ready claim
5. **Customers will pay £349/mo for this** — Founding 10 pricing experiment proves willingness to pay

If all 5 are proven, AgentDock has product-market fit. If any fail, pivot before building more.

---

## Connections

- [[Competitor Intel - 8th May 2026]]
- [[MVP Scope]]
- [[Pricing]]
- [[Service Manager Persona]]

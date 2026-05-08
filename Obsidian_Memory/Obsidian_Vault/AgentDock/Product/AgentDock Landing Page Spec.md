# AgentDock Landing Page Spec

Created: 8 May 2026

## Positioning

**Headline:** "See every agent. Control every action."

**Sub:** "Visual command centre for multi-agent work"

**Target buyer:** Service managers in telecom/broadband (50-500 employees) running ServiceNow, Zendesk, or Jira.

**Primary CTA:** "See it in action" — demo request form

**Secondary CTA:** "Open Dashboard" — links to live demo with mock data

## Design Principles

- Enterprise B2B — dark theme, clean lines, no playful elements
- Visibility-first — the hero shows a live dock preview, not abstract illustrations
- Trust through specificity — real agent names, real ticket refs, real compliance clocks
- No jargon — "agents" not "LLMs", "tickets" not "entities"

## Page Structure

### 1. Navigation
- Logo (AD mark + AgentDock wordmark)
- Anchor links: How It Works, Agents, Trust, Scenarios
- CTA button: "Open Dashboard"

### 2. Hero
- Headline: "See every agent. Control every action."
- Sub: AgentDock drops AI agents into your existing ServiceNow, Zendesk, or Jira workflows — without replacing them. Every action is visible, traceable, and requires human approval before it matters.
- CTAs: "See it in action" + "Open Dashboard →"
- Trust row: ServiceNow-first, Human review gates, Audit trail by design, Read-only demo
- Visual: Live dock preview showing agent statuses, task counts, and a mini operations floor

### 3. Problem Section
- Headline: "Agents are powerful. But they work in the dark."
- 4 cards:
  - Invisible work — agents in separate terminals, managers blind without logs
  - Lost context — handoffs drop information, next agent starts blind
  - No audit trail — compliance teams need evidence, agent logs are not built for auditors
  - Hidden autonomy — agents can act without human checkpoint

### 4. How It Works
- Headline: "Six stages. Zero mystery."
- Pipeline strip: TRIGGER → TRIAGE → DRAFT → REVIEW → SEND → LOG
- Each stage shows number, label, and one-line description

### 5. Agent Roles
- Headline: "Each agent owns one job. You see all of them."
- 4 agent cards with live status LED:
  - Complaint Triage Agent (ServiceNow, running)
  - Response Draft Agent (Zendesk, waiting)
  - Escalation Agent (ServiceNow, idle)
  - Compliance Agent (Zendesk, running)

### 6. Scenarios
- Headline: "Built against real failure modes, not demo theatre."
- 4 scenario items:
  - P1 broadband outage misclassified as P3
  - Same customer complains via email and ticket within 10 minutes
  - Credit request exceeds policy without manager approval
  - Complaint reaches day 47 with no final-response owner

### 7. Trust & Compliance
- Headline: "Early-stage, but not careless."
- 8 trust tokens with checkmarks:
  - Human approval before every critical action
  - Immutable audit trail — every action timestamped
  - Read-only demo mode available
  - No source system replacement required
  - ServiceNow-first connector architecture
  - CSV audit export for compliance teams
  - GDPR-ready data handling posture
  - Conflict detection when agents overlap

### 8. Demo CTA (Founding 10)
- Headline: "Bring one messy workflow. We turn it into an agent office."
- Email capture form with "Request a pilot" button
- Success state after submission
- Link to explore live dashboard

### 9. Footer
- Logo + "AgentDock"
- Tagline: "Keep your systems. See every agent. Control every action."

## Technical Implementation

- React + TypeScript + Vite + Tailwind CSS
- CSS variables from index.css (GitHub-dark inspired palette)
- Responsive: mobile, tablet, desktop breakpoints
- Landing page styles in App.css (scoped to `.lp` class)
- Dashboard styles use existing component CSS

## Messaging Angles

1. **"Your agents are invisible. We make them visible."** — targets service managers who cannot see what AI is doing
2. **"Every action approved. Every change logged. Every audit ready."** — targets compliance teams blocking AI adoption
3. **"Drop agents into ServiceNow without replacing ServiceNow."** — targets IT leaders who invested millions in ServiceNow
4. **"Built for the person who manages the work, not the person who builds the agents."** — targets service managers (primary persona)
5. **"No hidden autonomy. No black boxes. No surprises."** — targets risk-averse enterprises

## Competitor Differentiation

| Dimension | AgentDock | Competitors |
|-----------|-----------|-------------|
| Operations Dashboard | Real-time, cross-system | Technical traces only |
| Approval Gates | Per-action Review Gate | Debugging-only or binary |
| Audit Export | CSV, compliance-ready | Not available or dev-focused |
| Target User | Service manager | Developer or GTM operator |
| Positioning | Control layer | Build/automate platform |

## Links

- [[MVP Scope]]
- [[AgentDock Product Overview]]
- [[Competitor Intel - 8th May 2026]]
- [[Project Outline - AgentDock]]

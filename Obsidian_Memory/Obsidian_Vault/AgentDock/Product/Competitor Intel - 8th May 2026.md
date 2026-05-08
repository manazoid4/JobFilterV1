# Competitor Intel — 8th May 2026

## Executive Summary

The agent platform space is splitting into three distinct categories:

1. **Developer infrastructure** (LangGraph, CrewAI, SmythOS, n8n) — building blocks for engineers
2. **GTM automation** (Relevance AI, Lindy) — AI workforces for sales and marketing
3. **Workflow automation + AI** (Zapier, Make) — rule-based tools with AI bolted on

**No one owns the service operations layer.** This is AgentDock's gap.

---

## Threat Matrix

### HIGH THREAT — Could pivot into our space

| Competitor | Why | Timeline | Mitigation |
|---|---|---|---|
| **Relevance AI** | SOC 2 + audit logs + 2,000 integrations. Could add ServiceNow and reposition from GTM to operations. | 6-12 months | Lock in ServiceNow-first positioning. Build compliance features they can't match (immutable audit, approval gates, cross-system trails). |
| **CrewAI AMP** | 60% Fortune 500, massive funding, enterprise push. Could build ITSM connectors and target service managers. | 12-18 months | Move fast on ServiceNow connector. Own the "compliance-ready" narrative before they do. |
| **n8n** | 186K GitHub stars, self-hostable, SOC 2, ServiceNow/Zendesk nodes exist. Could add agent operations UI. | 6-12 months | Differentiate on operations UX, not technical capability. n8n is for builders; AgentDock is for operators. |

### MEDIUM THREAT — Adjacent but different focus

| Competitor | Why | Timeline | Mitigation |
|---|---|---|---|
| **LangSmith Fleet** | Moving toward no-code agent building. Strong observability. | 12+ months | They're developer-focused. Service managers won't use LangSmith. |
| **SmythOS** | Enterprise infrastructure with compliance tailoring. US Air Force customer. | 12+ months | Infrastructure vs operations. Different buyer. |
| **ServiceNow Now Assist** | Native AI in the platform customers already pay for. | Already here | They can't orchestrate across systems. Multi-system businesses need AgentDock. |

### LOW THREAT — Different category

| Competitor | Why | Mitigation |
|---|---|---|
| **Lindy** | Personal assistant, not enterprise operations. | Ignore. |
| **Zapier Central** | Automation-first, not agent-operations-first. No compliance. | Ignore. |
| **Make AI** | Workflow automation with AI bolted on. | Ignore. |
| **AutoGen** | Research framework, not commercial product. | Monitor Microsoft's moves. |

---

## Key Findings by Dimension

### 1. Ticketing System Integration

| Platform | ServiceNow | Zendesk | Jira | Notes |
|---|---|---|---|---|
| AgentDock | ✅ (MVP) | ✅ (Should) | ✅ (Should) | Built as first-class connectors |
| LangGraph | ❌ Custom | ❌ Custom | ❌ Custom | Developers write HTTP calls |
| CrewAI | ❌ Custom | ❌ Custom | ❌ Custom | Custom tools required |
| Relevance AI | ❌ Via API | ✅ Native | ❌ Via API | 2,000+ integrations but ServiceNow not listed |
| SmythOS | ❌ Via API | ❌ Via API | ❌ Via API | Generic HTTP/OpenAPI only |
| n8n | ✅ Node | ✅ Node | ✅ Node | Pre-built nodes but not agent-context aware |
| Zapier | ✅ Trigger/Action | ✅ Trigger/Action | ✅ Trigger/Action | Automation triggers, not agent operations |
| Make | ✅ Module | ✅ Module | ✅ Module | Workflow modules, not agent operations |

**Gap**: No one has ServiceNow connectors designed for agent operations context (ticket → task card → handoff → audit trail). n8n and Zapier have connectivity but not the operations layer.

### 2. Compliance & Audit Features

| Platform | Audit Log | Export | Approval Gates | SOC 2 | Immutable | Retention |
|---|---|---|---|---|---|---|
| AgentDock | ✅ Built-in | ✅ CSV/PDF | ✅ Review Gate | Target | Target | Configurable |
| LangSmith | Traces only | ❌ | Annotation queue | ❌ | ❌ | 14-400 days |
| CrewAI AMP | Tracing | ❌ | HITL input | ❌ | ❌ | Not specified |
| Relevance AI | ✅ Audit logs | ❌ | Smart escalations | ✅ Type II | ❌ | 30-90 days |
| SmythOS | Log retention | ❌ | ❌ | ❌ | ❌ | 7-90 days |
| n8n | Execution logs | ❌ | Manual approval node | ✅ | ❌ | 7-365 days |
| Lindy | ✅ Enterprise | ❌ | ❌ | ✅ Type II | ❌ | Not specified |

**Gap**: No one offers immutable, compliance-ready audit trails with export capabilities designed for auditors. Relevance AI is closest with SOC 2 + audit logs, but their logs are GTM-focused, not ITSM operations-focused.

### 3. Human-in-the-Loop

| Platform | Approval Gates | Configurable | Per-Action | Escalation Rules |
|---|---|---|---|---|
| AgentDock | ✅ Review Gate | ✅ Per workflow | ✅ Per action type | ✅ Planned |
| LangSmith | Annotation queue | ❌ Debugging only | ❌ | ❌ |
| CrewAI AMP | HITL input | ❌ Binary | ❌ | ❌ |
| Relevance AI | Smart escalations | ✅ | ✅ | ✅ |
| SmythOS | ❌ | N/A | N/A | N/A |
| n8n | Manual approval node | ✅ | ✅ | ❌ |

**Gap**: Relevance AI has the most mature escalation system, but it's designed for sales pipelines, not service operations. AgentDock's Review Gate is purpose-built for service manager workflows (approve response, approve credit, approve escalation).

### 4. Visibility & Operations UI

| Platform | Operations Dashboard | Agent Status | Cross-System View | Pipeline View |
|---|---|---|---|---|
| AgentDock | ✅ Operations Dock | ✅ Real-time | ✅ All systems | ✅ Pipeline View |
| LangSmith | Observability dashboard | Trace status | ❌ Single app | ❌ |
| CrewAI AMP | Usage dashboard | Deployment status | ❌ Single crew | ❌ |
| Relevance AI | Activity center | Task status | ❌ Single workforce | ❌ |
| SmythOS | Agent Studio | Agent status | ❌ Single space | ❌ |
| n8n | Execution dashboard | Workflow status | ❌ Single instance | ✅ Visual workflow |

**Gap**: No one has a cross-system operations dashboard designed for service managers. Every competitor shows technical metrics (traces, executions, deployments) — not business metrics (tickets resolved, SLA risk, approval queue).

---

## Pricing Intelligence

### AgentDock vs Competitors — Value Comparison

| Metric | AgentDock Business | Relevance AI Team | n8n Business | CrewAI Enterprise |
|---|---|---|---|---|
| Price | £349/mo | $234/mo (~£185) | €667/mo (~£570) | Custom |
| Users | Basic RBAC | 5 build + 45 end | Unlimited | Custom |
| Systems | 5 connected | Unlimited apps | Unlimited | Custom |
| Agents | 15 active | Unlimited | Unlimited | Unlimited |
| Audit | 1 year | 90 days | 30 days | Not specified |
| Compliance | ✅ Mode | SOC 2 | SOC 2 | FedRAMP |
| Approval Gates | ✅ Review Gate | Escalations | Manual node | HITL |
| Connectors | ServiceNow, Zendesk, Jira | 2,000+ apps | 500+ nodes | Custom tools |

**Pricing insight**: AgentDock is positioned between Relevance AI (cheaper, GTM-focused) and n8n Business (more expensive, technical). The £349/mo price point is defensible if we deliver ServiceNow-first compliance that Relevance AI can't match.

### Pricing Experiments to Run

1. **Founding 10 at £349/mo** — lock early adopters, validate price sensitivity
2. **Add per-agent overage** — £25/agent/mo beyond plan limit (predictable revenue)
3. **Compliance add-on** — £99/mo for extended audit retention + export + compliance reports
4. **Connector marketplace** — £2,500 one-off for custom connectors (validated demand)
5. **Annual prepay discount** — 20% off (standard SaaS, improves cash flow)

---

## Messaging Angles That Competitors Can't Counter

### 1. "Your agents are invisible. We make them visible."
- Targets: Service managers who can't see what AI is doing
- Competitors can't counter: LangSmith shows traces (developer tool), CrewAI shows deployments (engineer tool). Neither shows business operations.

### 2. "Every action approved. Every change logged. Every audit ready."
- Targets: Compliance teams blocking AI adoption
- Competitors can't counter: Relevance AI has SOC 2 but no immutable audit export. n8n has logs but not compliance-ready format.

### 3. "Drop agents into ServiceNow without replacing ServiceNow."
- Targets: IT leaders who've invested millions in ServiceNow
- Competitors can't counter: ServiceNow Now Assist only works inside ServiceNow. Relevance AI doesn't have native ServiceNow.

### 4. "Built for the person who manages the work, not the person who builds the agents."
- Targets: Service managers (our primary persona)
- Competitors can't counter: Every competitor's UI is built for developers or GTM operators.

### 5. "No hidden autonomy. No black boxes. No surprises."
- Targets: Risk-averse enterprises burned by autonomous agents
- Competitors can't counter: Relevance AI pushes L4 self-driving. CrewAI pushes autonomous crews. AgentDock pushes controlled autonomy.

---

## Strategic Recommendations

### What to Build First (Next 90 Days)

1. **ServiceNow connector with full CRUD** — read tickets, create records, update status, add work notes. This is the wedge.
2. **Operations Dock dashboard** — real-time view of all agents, workflows, and connected systems. This is the product.
3. **Review Gate** — human approval before sending responses or updating records. This is the differentiator.
4. **Audit log with export** — every action logged with timestamp, agent, action, and outcome. CSV export for compliance. This is the moat.

### What to Delay

1. **Zendesk connector** — build after ServiceNow proves the model.
2. **Jira connector** — lower priority than ServiceNow/Zendesk.
3. **Custom connector builder UI** — sell custom builds at £2,500 first, validate demand.
4. **Marketplace** — premature. Build 5-10 connectors yourself first.

### What to Monitor

1. **Relevance AI adding ServiceNow** — if they do, accelerate compliance features.
2. **CrewAI AMP adding ITSM connectors** — if they do, double down on service manager UX.
3. **n8n adding agent operations UI** — if they do, emphasize compliance and approval gates.
4. **ServiceNow Now Assist expanding** — monitor their cross-platform capabilities.

---

## Connections

- [[Competitor Research]]
- [[MVP Scope]]
- [[Research Briefs - 8th May 2026]]

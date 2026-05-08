# Competitor Research — AgentDock

## Landscape

The enterprise AI space has three types of players:

1. **Platform vendors** — ServiceNow, Zendesk, Salesforce building their own AI
2. **Agent frameworks** — LangChain, CrewAI, AutoGen for building agents
3. **Orchestration tools** — Dify, Open WebUI, SmythOS, n8n for managing AI workflows
4. **No-code agent platforms** — Relevance AI, Lindy, Zapier Central, Make.com AI

AgentDock is different. It doesn't replace your systems. It makes agents safe and manageable inside them.

---

## Enterprise Platform AI

### ServiceNow — Now Assist
- Built-in AI for ITSM, CSM, HR workflows
- Case summarization, response suggestions, routing
- **Weakness**: Only works inside ServiceNow. Can't orchestrate agents across multiple systems. No human approval layer. Locked into their ecosystem.
- **Threat level**: High. They're building this natively. But only for ServiceNow customers who want single-vendor AI.
- **Pricing**: Bundled into Now Platform subscriptions (typically $100-300/user/month for ITSM Pro + AI add-ons)

### Zendesk — AI Agents
- Automated ticket routing, response generation, deflection
- **Weakness**: Zendesk-only. No cross-system orchestration. No audit trail export. No human-in-the-loop for critical actions.
- **Threat level**: Medium. Good for Zendesk-only shops. Useless for multi-system businesses.
- **Pricing**: AI Agents add-on ~$50/agent/month on top of Zendesk subscriptions

### Salesforce — Einstein AI / Agentforce
- AI for CRM, service, sales workflows
- **Weakness**: Salesforce ecosystem lock-in. Expensive. Complex setup. Not designed for agent orchestration across platforms.
- **Threat level**: Medium-High. Agentforce launched with full agent builder, but still Salesforce-only.
- **Pricing**: Agentforce ~$2/user/conversation or $500/month for 1,000 conversations

### Atlassian — Jira Service Management AI
- AI for ticket triage, summarization, auto-response
- **Weakness**: Jira-only. No cross-platform orchestration. Limited approval workflows.
- **Threat level**: Medium. Strong in dev/IT teams but limited scope.
- **Pricing**: AI features included in Premium/Enterprise tiers

---

## Agent Frameworks

### LangChain / LangGraph / LangSmith
- **What it is**: Code framework (LangGraph) + observability/deployment platform (LangSmith)
- **Ticketing integration**: None built-in. Developers must write custom connectors to ServiceNow, Zendesk, etc. using HTTP nodes or custom tools.
- **Compliance/audit**: LangSmith provides tracing (5k-10k traces/mo on free/plus plans), annotation queues for human feedback, deployment logging. But these are developer debugging tools, not compliance-ready audit trails. No immutable logs, no approval gates, no export for auditors.
- **Pricing**:
  - Developer: Free (5k traces/mo, 1 seat)
  - Plus: $39/seat/mo + pay-as-you-go for traces/deployments
  - Enterprise: Custom (SSO, RBAC, self-hosted, SLA)
- **Weakness**: Developer-only. No business-user UI. No enterprise system connectors. No human approval layer for production workflows. Tracing is for debugging, not compliance.
- **Threat level**: Low-Medium. Framework, not product. But LangSmith Fleet is moving toward no-code agent building.
- **Latest (May 2026)**: LangSmith Fleet launched — no-code agent builder with MCP server support, prebuilt templates, and API triggers. Still developer-focused but closing the gap on usability.

### CrewAI
- **What it is**: Multi-agent framework (open source) + AMP enterprise platform (cloud/on-prem)
- **Ticketing integration**: Tools for Gmail, Slack, Salesforce, HubSpot, Notion, Microsoft Teams. No native ServiceNow or Zendesk connectors. Developers must build custom tools.
- **Compliance/audit**: Tracing, OpenTelemetry, guardrails, human-in-the-loop input, hallucination scores, deployment history. Good for engineering teams. Not compliance-ready for regulated industries.
- **Pricing**:
  - Free: 50 workflow executions/mo, visual editor, GitHub integration
  - Enterprise: Custom pricing ($0.50/execution beyond free tier, 50 hrs dev/mo included, SSO, RBAC, FedRAMP, SAM certified)
- **Weakness**: Enterprise pricing is opaque and execution-based (expensive at scale). No native ITSM connectors. No audit export for compliance teams. Built for engineers, not service managers.
- **Threat level**: Medium. Growing enterprise traction (DocuSign, PwC, IBM). AMP platform is their answer to the operations layer problem.
- **Latest (May 2026)**: CrewAI AMP launched on Product Hunt. 450M+ agentic workflows/month. 60% of Fortune 500. Studio visual editor + AI copilot. Serverless containers. Strong enterprise push.

### AutoGen (Microsoft)
- **What it is**: Multi-agent conversation framework from Microsoft Research
- **Ticketing integration**: None. Research-grade framework.
- **Compliance/audit**: None.
- **Pricing**: Open source, free.
- **Weakness**: Research-grade. No production UI. No enterprise connectors. No compliance features.
- **Threat level**: Low. Microsoft may productise this via Azure AI Foundry but not yet a commercial product.
- **Latest (May 2026)**: AutoGen 0.4+ released with improved multi-agent orchestration. Still primarily a research/developer tool.

---

## No-Code Agent Platforms

### Relevance AI
- **What it is**: AI workforce platform focused on GTM (sales, marketing, support)
- **Ticketing integration**: 2,000+ integrations including Zendesk, Freshdesk, HubSpot, Salesforce. No native ServiceNow connector listed. Connects via API/custom actions.
- **Compliance/audit**: SOC 2 Type II, GDPR, SSO (SAML), RBAC, audit logs, version control, agent evaluations. Strongest compliance story of no-code platforms.
- **Pricing**:
  - Free: 200 actions/mo, 1 workforce, 1 user
  - Pro: $19/mo (annual) / $29/mo (monthly) — 2,500 actions/mo, 2 build users
  - Team: $234/mo (annual) / $349/mo (monthly) — 7,000 actions/mo, 5 build users, 45 end users
  - Enterprise: Custom — unlimited users, custom credits, dedicated AM
- **Weakness**: GTM-focused, not ITSM/operations-focused. No ServiceNow-first positioning. Autonomy levels (L1-L4) push toward self-driving agents, opposite of AgentDock's control-first approach. No cross-system audit trail that spans multiple ticketing platforms.
- **Threat level**: Medium-High. Well-funded, strong enterprise customers (Canva, Autodesk, Databricks, KPMG). SOC 2 + audit logs are closest to AgentDock's compliance story.
- **Latest (May 2026)**: Programmatic GTM launched — Claude Code + Codex integration for agent building. Strong push into agent autonomy (L4 self-driving).

### Lindy
- **What it is**: Personal AI work assistant for inbox, meetings, calendar, follow-ups
- **Ticketing integration**: HubSpot, Salesforce, Slack, Notion, Gmail, Outlook, Teams. No ServiceNow or Zendesk.
- **Compliance/audit**: SOC 2 Type II, HIPAA, GDPR, PIPEDA. Enterprise includes SSO, SCIM, audit logs.
- **Pricing**:
  - Plus: $49.99/mo — 2 connected inboxes
  - Pro: $99.99/mo — 3 inboxes, computer use
  - Max: $199.99/mo — 5 inboxes
  - Enterprise: Custom — team controls, SSO, SCIM, audit logs
- **Weakness**: Individual productivity tool, not enterprise operations platform. No ticketing system integration. No multi-agent orchestration. No workflow builder.
- **Threat level**: Low. Different category — personal assistant, not operations platform.
- **Latest (May 2026)**: 400K+ users. Lindy 3.0 with Agent Builder, Autopilot (cloud computer), Team Accounts. Enterprise launch with SSO, SCIM, audit logs, HIPAA.

### SmythOS
- **What it is**: Open-source agent infrastructure — visual studio, runtime, SDK, deployments
- **Ticketing integration**: HubSpot, Slack, Zapier, generic HTTP/OpenAPI. No native ServiceNow or Zendesk connectors.
- **Compliance/audit**: Encryption, key vault, role management, space-based permissions, log retention (7-90 days depending on plan). Enterprise: custom retention, compliance tailoring, on-prem/VPC deployment.
- **Pricing**:
  - Free: $0 — public agents, visual IDE, local deployment
  - Builder: $39/seat/mo — private agents, 100 fast API calls/day
  - Startup: $399/mo — 10 spaces/3 seats, RAG agents, 5,000 API calls/day
  - Scaleup: $1,499/mo — 50 spaces/5 seats, forward deployed engineer
  - Enterprise: $4,955/mo+ — unlimited, on-prem/VPC, OEM, compliance tailoring
- **Weakness**: Infrastructure-first, not operations-first. Targets developers building agent products, not service managers running operations. No ticketing connectors. No human approval gates for business workflows.
- **Threat level**: Low-Medium. Strong technical platform but wrong audience. Used by US Air Force, Hyundai, Tenet Healthcare — but as infrastructure, not operations layer.
- **Latest (May 2026)**: Gartner AI Category Leader. Computer automation (browser agents). Agent marketplace in development. Strong enterprise push with forward-deployed engineers.

### Zapier Central / Zapier Agents
- **What it is**: AI agents built on top of Zapier's 7,000+ app integrations
- **Ticketing integration**: ServiceNow, Zendesk, Jira, HubSpot, Salesforce — all available via Zapier's existing integration library.
- **Compliance/audit**: Basic logging. No audit trail export. No approval gates. No compliance certifications advertised.
- **Pricing**: Bundled into Zapier plans ($20-70+/month). Agents are an add-on feature.
- **Weakness**: Rule-based automation with AI layer on top. No multi-agent orchestration. No visibility into agent reasoning. No approval gates. No audit trails. Not built for compliance.
- **Threat level**: Low-Medium. Massive integration library but wrong architecture for enterprise agent operations.
- **Latest (May 2026)**: Zapier Agents GA. Natural language agent building on top of existing Zapier triggers/actions. Still fundamentally automation-first, not agent-operations-first.

### Make.com AI
- **What it is**: Visual workflow automation with AI agent capabilities
- **Ticketing integration**: ServiceNow, Zendesk, Jira — available via Make's integration catalog.
- **Compliance/audit**: Basic execution logs. No audit export. No approval gates for AI decisions. No compliance certifications.
- **Pricing**:
  - Core: $9/mo — 10,000 operations
  - Pro: $19/mo — 25,000 operations
  - Teams: $39/mo — 50,000 operations
  - Enterprise: Custom
- **Weakness**: Workflow automation platform adding AI. Not agent-native. No multi-agent orchestration. No human-in-the-loop for AI decisions. No compliance features.
- **Threat level**: Low. Different category — workflow automation, not agent operations.

### n8n AI Agents
- **What it is**: Source-available workflow automation with AI agent builder
- **Ticketing integration**: ServiceNow, Zendesk, Jira — available via n8n's 500+ node library. HTTP Request node for any API.
- **Compliance/audit**: SOC 2 compliant. Execution logging, error workflows, debugging tools. Manual approval nodes available. Self-hostable for full data control. No compliance-ready audit export.
- **Pricing**:
  - Starter: €20/mo — 2,500 executions, unlimited users
  - Pro: €50/mo — 10,000 executions, workflow history
  - Business: €667/mo — 40,000 executions, SSO/SAML/LDAP, Git version control, self-hosted
  - Enterprise: Custom — unlimited, dedicated support, 365-day insights
  - Self-hosted community edition: Free (faircode license)
- **Weakness**: Developer/technical team focus. Workflow automation first, AI second. No agent operations dashboard. No multi-agent visibility. No compliance-ready audit trails for business users.
- **Threat level**: Medium. 186K+ GitHub stars. Strong technical community. Self-hostable is attractive for compliance-conscious teams. But not an operations product.
- **Latest (May 2026)**: AI Agent Builder GA. Multi-agent systems, planning agents, RAG agents. Strong push into "predictable in prod" positioning with guardrails and human-in-the-loop.

---

## What Nobody Does Well

1. **Cross-system agent orchestration** — agents that work across ServiceNow, Zendesk, Jira, email simultaneously with a single operations view
2. **Human-in-the-loop at scale** — approval gates that don't slow down workflows but catch critical actions (Relevance AI has escalations, n8n has approval nodes — neither is operations-first)
3. **Compliance-ready audit trails** — immutable logs that satisfy auditors without extra work (Relevance AI has audit logs but GTM-focused; SmythOS has log retention but infrastructure-focused)
4. **Plug-and-play ITSM connectors** — drop agents into ServiceNow/Zendesk without custom integration projects (n8n and Zapier have connectors but not agent-operations context)
5. **Visual agent operations for non-technical managers** — seeing what every agent is doing across all systems in one view (CrewAI AMP has tracing but for engineers; LangSmith has observability but for developers)
6. **Model flexibility with operations context** — switching agent providers without rebuilding workflows (most platforms lock you into their model routing)
7. **Service manager as the primary user** — every competitor targets developers, GTM teams, or IT admins. None target the service manager who needs operational truth.

---

## Competitor Pricing Summary

| Platform | Entry Price | Enterprise | Pricing Model | Target User |
|---|---|---|---|---|
| AgentDock | £99/mo | Custom | Per seat/agent | Service Manager |
| LangSmith | Free | Custom | Per seat + traces | Developer |
| CrewAI AMP | Free | Custom ($0.50/exec) | Per execution | Engineer |
| Relevance AI | Free | Custom | Per action | GTM Team |
| SmythOS | Free | $4,955/mo | Per seat + API calls | Developer |
| Lindy | $50/mo | Custom | Per user | Individual |
| n8n | €20/mo | Custom | Per execution | Technical Team |
| Zapier Agents | $20/mo | Custom | Per task | Operations |
| Make AI | $9/mo | Custom | Per operation | Operations |

---

## AgentDock's Edge

- **System-agnostic** — works with your existing tools, doesn't replace them
- **Compliance-ready** — audit trails, approval gates, immutable logs built in
- **Visual operations** — see every agent action across all systems in one dashboard
- **Plug-and-play** — connectors for ServiceNow, Zendesk, Jira out of the box
- **Human control** — approval gates before critical actions, no hidden autonomy
- **Model flexible** — OpenAI, Anthropic, local models — swap without rebuilding
- **Service manager first** — built for the person who needs operational truth, not the developer who builds agents

---

## Connections

- [[Product Index]]
- [[AgentDock Product Overview]]
- [[Competitor Intel - 8th May 2026]]

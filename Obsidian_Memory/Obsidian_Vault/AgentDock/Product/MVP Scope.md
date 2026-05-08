# MVP Scope

Updated: 8 May 2026

## Must Have

- Operations Dock dashboard — all agents, workflows, and system connections visible.
- Agent Board — cards showing role, model, status, connected system, last action.
- Pipeline View — complaint management workflow: Trigger → Triage → Draft → Review → Send → Log.
- Manual workflow trigger and agent assignment.
- Live status updates from connected systems.
- Handoff summaries with audit trail (timestamp, agent, action, system, outcome).
- Ticket/case reference tracking (ServiceNow, Zendesk).
- Human approval checkpoints before sending responses or updating records.
- ServiceNow connector (REST API) — read tickets, create records, update status, add work notes.
- Support for OpenAI and Anthropic as agent providers.
- Audit log export (CSV) — compliance-ready format for auditors.
- Conflict warnings when two agents work on the same ticket.

## Should Have

- Pipeline templates:
  - Complaint management
  - Ticket triage & routing
  - Response drafting + approval
  - Escalation handling
  - Report generation
- Per-agent memory notes.
- Workflow-level context files (rules, escalation paths, compliance notes).
- Run history.
- Zendesk connector.
- Email connector (IMAP/SMTP) for non-ticketing workflows.
- Generic webhook connector.
- SLA risk indicator on task cards.

## Not MVP

- Fully autonomous agent behaviour.
- Custom connector builder UI.
- SSO / SAML.
- Role-based access control.
- Compliance rule engine.
- Marketplace of connectors.
- Multi-tenant enterprise features.
- Custom model hosting.
- Jira connector (V1).
- PDF audit export (V1).

## First Build Milestone

Build a local dashboard that can:

- Connect to a ServiceNow dev instance.
- Run 2–3 agents on a complaint management workflow.
- Show agent status, actions, and handoffs.
- Require human approval before sending responses.
- Log all actions for audit with CSV export.

Deliverables:

- Operations Dock page
- Agent Board
- Pipeline View (complaint management workflow)
- Handoff Log with audit trail
- Review Gate
- ServiceNow connector
- Seed data for testing
- CSV audit export

## Validation Criteria

MVP succeeds when:

1. A service manager can see all agent activity without opening logs
2. A compliance officer can export an audit trail and understand it
3. A critical action (response send, record update) requires human approval
4. Two agents working on the same ticket trigger a conflict warning
5. A prospect will pay £349/mo after a 30-day pilot

## Next Decisions

- ServiceNow connector first (validated — no competitor owns this wedge).
- Self-hosted MVP for data control (compliance requirement for target market).
- OpenAI first, Anthropic in V1 (simplifies initial build).
- Build connector SDK after 5 built-in connectors (validate demand with £2,500 custom builds first).

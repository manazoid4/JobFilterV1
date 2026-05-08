# AgentDock Product Overview

## Position

AgentDock is a plug-and-play agent operations platform for businesses that run workflows through ServiceNow, Jira, Zendesk, or custom ticketing systems.

It drops agents into your existing processes without replacing them.

## Core Idea

Businesses already have systems: ServiceNow for IT, Zendesk for support, Jira for projects, custom CRMs for sales.

AI agents can handle parts of these workflows — triage complaints, route tickets, draft responses, escalate issues, generate reports.

But deploying agents into enterprise systems is messy:
- No visibility into what agents are doing
- No control over when they act
- No audit trail for compliance
- No handoff structure between agent steps
- No way to plug them in without rewriting everything

AgentDock solves this. It sits between your agents and your systems.

You keep your tools. Agents do the work. You see and control everything.

## Product Category

Enterprise agent orchestration layer.

Not a replacement for ServiceNow.
Not a chatbot.
Not a developer tool.

AgentDock is the control plane that connects AI agents to business workflows.

## Target Users

- **SMBs** — 50–500 employees, running ServiceNow/Zendesk/Jira, want to automate repetitive work without hiring a dev team.
- **Mid-market** — 500–5,000 employees, multiple departments using different systems, need agents that work across all of them.
- **Enterprise** — 5,000+ employees, compliance requirements, need audit trails, approval gates, and role-based access for agent actions.

## Problem

Businesses want AI agents but:
- Each system has its own API, auth, and data model.
- Agents operate in silos — no visibility across departments.
- Compliance teams need audit trails that agents don't produce.
- Managers can't see what agents are doing without reading logs.
- Critical decisions (refunds, escalations, data changes) need human approval.
- Deploying agents requires custom integration work every time.

## Promise

Plug agents into your existing systems.
See everything they do.
Control every action.
Keep your tools.

## Core Workflow

```
TRIGGER -> TRIAGE -> ACT -> ESCALATE -> RESOLVE -> LOG
```

## Main Concepts

### Dock

The workspace where all active agents, workflows, and system connections are visible.

Shows real-time status across all connected platforms.

### Agent

A worker with a defined role, model, tool access, and workflow scope.

Examples:

- Complaint Triage Agent
- Ticket Routing Agent
- Response Draft Agent
- Escalation Agent
- Report Generation Agent
- Data Sync Agent
- Compliance Audit Agent

### Pipeline

A repeatable workflow that moves work between agents and systems.

Example — Complaint Management:

```
Zendesk ticket -> Triage Agent -> Response Draft Agent -> Human Review -> Send -> Log to ServiceNow
```

### Task Card

A visible unit of work with:

- owner (which agent)
- status
- source system (ServiceNow, Zendesk, etc.)
- ticket/case reference
- input brief
- output summary
- approval state
- audit trail

### Handoff

The structured output one agent passes to another or to a system.

Every handoff includes:

- what was done
- what changed
- what needs human review
- what system to update next
- compliance notes

## Key Product Screens

### 1. Operations Dock

Shows every active agent, connected system, and current workflow status.

### 2. Agent Board

Cards for each active agent:

- name
- role
- model
- current workflow
- status
- last action
- connected system

### 3. Pipeline View

Workflow progression:

```
Trigger -> Triage -> Action -> Review -> Resolve -> Log
```

### 4. Handoff Log

Timeline of agent actions with audit trail.

### 5. Review Gate

Human checkpoint before sending responses, updating records, or escalating.

### 6. System Connectors

Manage connections to ServiceNow, Zendesk, Jira, custom APIs.

## System Connectors

### Built-in (MVP)

- ServiceNow (REST API)
- Zendesk (API)
- Jira (REST API)
- Email (IMAP/SMTP)
- Webhook (generic)

### Future

- Salesforce
- HubSpot
- Slack / Teams
- SAP
- Oracle
- Custom API connector builder

## Data Model

### Project (Workflow Group)

- id
- name
- connectedSystems
- status
- activePipelines
- complianceRules

### Agent

- id
- name
- role
- provider
- model
- status
- currentWorkflowId
- permissions
- connectedSystem

### Task

- id
- title
- sourceSystem
- sourceRef (ticket/case number)
- assignedAgentId
- status
- priority
- createdAt
- updatedAt
- resolvedAt

### Handoff

- id
- taskId
- agentId
- action
- summary
- systemUpdate
- auditTrail
- approvalRequired
- approvedBy
- approvedAt

## Technical Direction

**Frontend:** React, TypeScript, Vite, Tailwind

**Backend:** Node.js service with plugin architecture for system connectors.

**Storage:** Postgres for multi-tenant SaaS. SQLite for local dev/testing.

**Agent execution:** Agents connect via API (OpenAI, Anthropic, local models). AgentDock manages the orchestration, not the model inference.

**Connectors:** Each system connector is a plugin with:
- Authentication config
- Data mapping (tickets -> tasks)
- Action templates (create, update, resolve)
- Webhook listeners for real-time triggers

## UX Rules

- Every agent must show status without opening logs.
- Every action must be traceable in an audit log.
- Every critical action needs human approval.
- No hidden autonomy.
- Visibility beats cleverness.
- Compliance-ready by default.

## Differentiation

AgentDock is not trying to replace ServiceNow or any existing system.

It is the layer that makes AI agents safe and manageable inside those systems.

The advantage is control:

- visible work across all platforms
- clear ownership and audit trails
- clean handoffs between agents and systems
- model flexibility
- compliance-ready approval gates
- plug-and-play connectors

## Success Metric

AgentDock succeeds when a business can:

- deploy agents into their existing workflows in hours, not months
- see every agent action across all systems in one view
- approve or reject critical actions before they execute
- produce audit trails that satisfy compliance teams
- scale agent count without losing control

## First Build Milestone

Build a local dashboard that can:

- connect to one system (ServiceNow or Zendesk dev instance)
- run 2–3 agents on a complaint management workflow
- show agent status, actions, and handoffs
- require human approval before sending responses
- log all actions for audit

Deliverables:

- Operations Dock page
- Agent Board
- Pipeline View (complaint management workflow)
- Handoff Log with audit trail
- Review Gate
- ServiceNow or Zendesk connector
- Seed data for testing

## Next Decisions

- Which system connector to build first (ServiceNow or Zendesk).
- Whether MVP is self-hosted or cloud.
- Which agent provider to support first (OpenAI, Anthropic, or both).
- Whether to build a connector marketplace or ship built-in only.

## Links

- [[AgentDock Map]]
- [[Vault Map]]

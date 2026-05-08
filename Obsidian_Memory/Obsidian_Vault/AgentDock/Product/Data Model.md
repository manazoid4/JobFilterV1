# Data Model

## Project (Workflow Group)

- id
- name
- connectedSystems (array of system configs)
- status
- activePipelines
- complianceRules
- createdAt
- updatedAt

## Agent

- id
- name
- role
- provider (openai, anthropic, local)
- model
- status (idle, running, waiting, error)
- currentWorkflowId
- permissions (read, write, approve, delete)
- connectedSystem
- createdAt
- updatedAt

## Task

- id
- title
- sourceSystem (servicenow, zendesk, jira, email, webhook)
- sourceRef (ticket/case/incident number)
- projectId
- assignedAgentId
- status (triggered, triaged, in-progress, awaiting-approval, resolved, logged)
- priority (low, medium, high, critical)
- createdAt
- updatedAt
- resolvedAt

## Handoff

- id
- taskId
- agentId
- action (triage, draft, update, escalate, resolve, log)
- summary
- systemUpdate (what was changed in the connected system)
- auditTrail (timestamped log of all actions)
- approvalRequired (boolean)
- approvedBy (user id or null)
- approvedAt (timestamp or null)
- createdAt

## System Connector

- id
- type (servicenow, zendesk, jira, email, webhook, custom)
- name
- config (auth, endpoints, mappings)
- status (connected, disconnected, error)
- lastSync
- createdAt

## Workflow (Pipeline)

- id
- name
- projectId
- stages (array of stage definitions)
- trigger (webhook, schedule, manual, system-event)
- status (active, paused, archived)
- createdAt
- updatedAt

## Audit Log

- id
- taskId
- agentId
- action
- details
- timestamp
- userId (if human action)
- systemAffected

## Technical Direction

**Frontend:** React, TypeScript, Vite, Tailwind

**Backend:** Node.js service with plugin architecture for system connectors. Each connector is a module with:
- Authentication handler
- Data mapper (system fields -> AgentDock task fields)
- Action executor (create, update, resolve, escalate)
- Webhook listener (real-time triggers from external systems)

**Storage:** Postgres for multi-tenant SaaS. SQLite for local dev/testing.

**Agent execution:** Agents connect via API (OpenAI, Anthropic, local models). AgentDock manages orchestration, not model inference.

**Security:** API keys encrypted at rest. Audit logs immutable. Approval actions require authenticated user.

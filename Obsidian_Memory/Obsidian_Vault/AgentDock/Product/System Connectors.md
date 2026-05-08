# System Connectors

Manage connections to external business systems.

## Built-in Connectors

### ServiceNow
- REST API integration
- Read incidents, cases, changes
- Create and update records
- Webhook listeners for real-time triggers
- Data mapping: incidents → tasks, agents → assignment groups

### Zendesk
- API integration
- Read tickets, users, organizations
- Create tickets, add comments, update status
- Webhook triggers for new/updated tickets
- Data mapping: tickets → tasks, tags → priority

### Jira
- REST API integration
- Read issues, projects, boards
- Create issues, add comments, transition status
- Webhook listeners for issue events
- Data mapping: issues → tasks, projects → workflow groups

### Email (IMAP/SMTP)
- Read incoming emails
- Send responses
- Parse email content into tasks
- Template-based response drafting

### Webhook (Generic)
- Receive events from any system
- Configurable payload mapping
- Trigger workflows on incoming data

## Connector Architecture

Each connector is a plugin with:

- **Authentication config** — API keys, OAuth, basic auth
- **Data mapper** — system fields ↔ AgentDock task fields
- **Action templates** — create, update, resolve, escalate
- **Webhook listeners** — real-time triggers from external systems
- **Error handler** — retry logic, fallback, alerting

## Custom Connectors

- £2,500 one-off build for any system
- Delivered within 2 weeks
- Includes testing on customer's dev instance
- Ongoing maintenance included in subscription

## UX rule

Connection status must be visible at a glance. Errors should be actionable, not cryptic.

# Pipeline View

Workflow progression for enterprise agent operations.

## Stages

```
Trigger → Triage → Action → Review → Resolve → Log
```

## What it shows

- Tasks moving through stages
- Which agent owns each stage
- Source system and ticket reference
- Blockers and approvals needed
- Time in each stage (SLA tracking)

## Example: Complaint Management

```
Zendesk ticket received
  → Triage Agent classifies severity and route
  → Response Draft Agent writes reply
  → Human reviews and approves
  → Response sent via Zendesk
  → Action logged to ServiceNow + audit trail
```

## UX rule

Every task must show status, owner, and time-in-stage without opening details.

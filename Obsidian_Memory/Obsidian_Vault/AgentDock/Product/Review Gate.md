# Review Gate

Human checkpoint before sending responses, updating records, or escalating.

## What it does

- Shows what the agent wants to do
- Shows what will change in the connected system
- Shows the agent's reasoning
- Requires explicit approve, reject, or modify
- Logs the decision with timestamp and user identity

## Approval types

- **Auto-approve** — low-risk actions (data sync, status updates)
- **Review required** — medium-risk (response drafts, ticket reassignments)
- **Block until approved** — high-risk (refunds, escalations, data deletion)

## Escalation rules

- If no human response in X hours → escalate to manager
- If rejected twice → flag for process review
- If approved pattern detected → suggest auto-approve rule

## UX rule

Critical actions require approval. No hidden autonomy. The review gate should take under 15 seconds for routine approvals.

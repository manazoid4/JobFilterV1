# Launch Scenarios

Updated: 6 May 2026

## Purpose

Run these simulations to find where AgentDock breaks, misleads, or fails to deliver value.
Each scenario exposes a specific product weakness. Fix what surfaces.

---

## S1 — High-priority complaint arrives

Situation: A P1 complaint lands in ServiceNow — customer threatening to leave, £50k contract at risk.

Run: Does the Triage Agent correctly classify it as critical? Does the workflow escalate immediately? Does the human get alerted?

Product question: If the agent misclassifies a critical complaint, we lose trust instantly. What's the safety net?

---

## S2 — Same complaint in two systems

Situation: Customer emails support AND logs a ServiceNow ticket for the same issue. Both arrive within 10 minutes.

Run: Does deduplication catch it? Do two agents work on the same problem? Does the customer get duplicate responses?

Product question: Duplicate agent actions on the same issue looks unprofessional. Is cross-system dedup working?

---

## S3 — Agent drafts a response with wrong information

Situation: Response Draft Agent pulls outdated policy info and promises something the company no longer offers.

Run: Does the Review Gate catch this? Does the human operator spot the error before it goes out? Is there a policy reference check?

Product question: Wrong responses destroy credibility. How do we keep agents current on company policy?

---

## S4 — Agent takes too long on a simple ticket

Situation: A routine password reset ticket sits in "in-progress" for 20 minutes. Should take 30 seconds.

Run: Does the pipeline show time-in-stage? Does it flag slow agents? Does it auto-reassign or escalate?

Product question: Slow agents are worse than no agents. Is performance monitoring built in?

---

## S5 — Compliance audit request

Situation: Auditor asks for a log of all agent actions on customer data in the last quarter.

Run: Can we produce this from the Handoff Log? Is it complete? Is it exportable? Does it meet GDPR requirements?

Product question: If we can't produce audit trails on demand, enterprise customers can't use us.

---

## S6 — Agent escalates a ticket that didn't need escalation

Situation: Triage Agent marks a low-priority ticket as critical and escalates to senior management.

Run: Does this create noise? Do humans start ignoring escalations? Is there a feedback loop to correct the agent?

Product question: False escalations waste time and erode trust in the system. How does the agent learn?

---

## S7 — ServiceNow API goes down

Situation: ServiceNow has an outage. AgentDock can't read or write tickets.

Run: Does the system detect this? Does it queue actions for retry? Does it alert the operator? Does it degrade gracefully?

Product question: Dependency on external APIs means failures will happen. Is resilience built in?

---

## S8 — Two agents update the same ticket

Situation: Response Draft Agent and Escalation Agent both try to update the same ServiceNow ticket simultaneously.

Run: Does the system detect the conflict? Does one action overwrite the other? Is there a lock or queue mechanism?

Product question: Conflicting agent actions on the same record create data corruption. How is this prevented?

---

## S9 — New user, first session, no context

Situation: Operations manager lands on AgentDock for the first time. No account, no prior context.

Run: What do they see in 10 seconds? Do they understand what the product does? Can they connect their first system? Does a demo workflow run to show value?

Product question: First impression = adoption or abandonment. Does the cold user experience communicate value before requiring setup?

---

## S10 — Agent resolves a ticket incorrectly

Situation: Agent marks a complaint as resolved, but the customer's issue wasn't actually fixed. Customer re-opens the ticket, angry.

Run: Does the system detect re-opened tickets? Does it flag the agent's previous action? Does it prevent the same mistake next time?

Product question: Incorrect resolutions are worse than no resolution. Is there a quality feedback loop?

---

## S11 — Manager wants to change a workflow mid-flight

Situation: A complaint management workflow is running 50 tickets. Manager wants to add a new approval step.

Run: Can workflows be modified without stopping active tasks? Do existing tasks pick up the new step? Or do they finish on the old flow?

Product question: Business processes change. Can AgentDock adapt without disrupting active work?

---

## S12 — Agent suggests a refund that exceeds policy

Situation: Response Draft Agent offers a £500 refund. Company policy caps refunds at £200 without manager approval.

Run: Does the Review Gate enforce policy limits? Does it flag the overage? Does it route to the right approver?

Product question: Agents must operate within business rules. Is policy enforcement built into the approval layer?

---

## Run Route

`/dock` → `/pipelines` → `/handoffs` → `/review`

Each scenario surfaces a real product gap. Fix the gap, not just the workflow.

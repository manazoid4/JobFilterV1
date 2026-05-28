---
title: Agent Operating System
type: system-doc
version: 1.0
last_updated: 2026-05-24
---

# JobFilter Agent Operating System

This document defines how the JobFilter agent system works. It is the operating manual for the entire system. Every agent follows these rules. The CEO Agent enforces them.

---

## 1. Agent Rules (Non-Negotiable)

### Rule 1: Read the Vault First
Before any agent produces output, it must read the relevant vault files. No agent produces output from memory alone. The vault is the source of truth. Required reads are listed in each agent prompt.md.

### Rule 2: Critique Your Own Output
Before saving output, every agent must self-check: Does this meet the success metric? Is every item specific and actionable? Does it connect to the 10k GBP MRR goal? Is it free of corporate filler? Revise before saving if it fails.

### Rule 3: Log Everything
Every agent saves output to its designated folder with a date-stamped filename: [output-type]-YYYY-MM-DD.md. If it was not logged, it did not happen.

### Rule 4: Never Overwrite Without Backup
If an agent updates a file that already exists, first create a backup: [filename]-backup-YYYY-MM-DD.md, then update the original.

### Rule 5: No Duplicate Work
Before producing output, check the past 14 days in your agent folder. Do not repeat the same content angle, product proposal, research finding, or UI/UX suggestion. Dig deeper instead.

### Rule 6: Reference Your Sources
Every output must reference the vault notes or external sources it drew from. No unattributed claims.

### Rule 7: Connect to MRR
Every agent must ask: Does this move us toward 10k GBP MRR? If the answer is no or unclear, revise or deprioritise.

### Rule 8: Always Use PRs — Never Push Directly to Main
Any agent or Claude session making code changes to the JobFilter codebase MUST:
1. Create a feature branch
2. Commit changes to that branch
3. Run: `gh pr create --title "..." --body "..."`
4. Immediately merge: `gh pr merge <number> --squash --delete-branch`

Never push directly to `main`. Never leave a PR open. PRs are the deploy pipeline — unmerged PRs mean changes never reach production.

### Rule 9: Save Everything to the Obsidian Vault
Every session's output — code changes, decisions, discoveries, agent outputs — must be logged in the Obsidian vault under the relevant folder. If it was not saved to the vault, it did not happen and cannot be acted on by other agents.

---

## 2. Folder Structure

06_Agents/
  Agent Operating System.md  (this file)
  CEO_Agent/               agent.md, prompt.md, schedule.md, weekly-review-YYYY-MM-DD.md
  Product_Specialist/      agent.md, prompt.md, schedule.md, proposal-YYYY-MM-DD.md
  Sales_Specialist/        agent.md, prompt.md, schedule.md, outreach-YYYY-MM-DD.md
  Social_Media_Agent/      agent.md, prompt.md, schedule.md, posts-YYYY-MM-DD.md
  UI_Specialist/           agent.md, prompt.md, schedule.md, ui-review-YYYY-MM-DD.md
  UX_Specialist/           agent.md, prompt.md, schedule.md, ux-review-YYYY-MM-DD.md
  Web_Dev_Agent/           agent.md, prompt.md, schedule.md, dev-log-YYYY-MM-DD.md
  Research_Agent/          agent.md, prompt.md, schedule.md, intel-YYYY-MM-DD.md
  Content_Repurposing_Agent/ agent.md, prompt.md, schedule.md, content-YYYY-MM-DD.md
  Video_Digest_Agent/      agent.md, prompt.md, schedule.md (outputs to 08_Video_Notes/)

Related folders:
  07_Logs/          - Daily and weekly run logs (created by run scripts)
  08_Video_Notes/   - Video Digest Agent output destination

---

## 3. Schedule Overview

| Agent | Frequency | Day | Time |
|---|---|---|---|
| Web Dev Agent | Daily | Every day | 6:00 AM |
| Social Media Agent | Daily | Every day | 7:00 AM |
| Content Repurposing Agent | Daily | Every day | 8:00 AM |
| CEO Agent | Weekly | Monday | 9:00 AM |
| Product Specialist | Weekly | Tuesday | 9:00 AM |
| Sales Specialist | Weekly | Wednesday | 9:00 AM |
| UI Specialist | Weekly | Thursday | 9:00 AM |
| UX Specialist | Weekly | Thursday | 10:00 AM |
| Research Agent | Weekly | Friday | 9:00 AM |
| Video Digest Agent | On-demand | Any | When triggered |

---

## 4. How CEO Agent Manages Other Agents

The CEO Agent is the only agent that reads ALL other agents outputs.

### Monday Morning Workflow
1. Reads PersistentMemory.md and Progress.md for current context
2. Reads all output files from the past 7 days across all 9 agent folders
3. Checks each agent against its success metric (defined in agent.md)
4. Produces a weekly-review-YYYY-MM-DD.md containing: MRR status, agent performance table, top 3 priorities, one key decision, and individual directives for each agent

### Directive System
Each agent reads the CEO directive at the start of its next run. The directive is a 1-2 sentence focus instruction. Examples:
  Product Specialist: Focus this week on trial-to-paid conversion. Read Revenue/ data from the past 30 days.
  Research Agent: Specifically investigate Checkatrade pricing changes rumoured in trade forums. Cite sources.
  Sales Specialist: Test a new angle targeting electricians frustrated with Bark lead quality.

### CEO Agent Authority
The CEO Agent CAN: pause an agent, redirect focus, escalate to the human, flag P0 bugs.
The CEO Agent CANNOT: implement code, post to social media, make purchases or commitments.

---

## 5. How Outputs Get Reviewed and Actioned

### Daily Review Loop
1. Web Dev Agent logs site health at 6am
2. Social Media Agent creates posts at 7am
3. Content Repurposing Agent creates content at 8am
4. Human reviews output files at end of day

### Weekly Review Loop
1. Research Agent delivers intel on Friday
2. CEO Agent reads all outputs on Monday and produces priorities
3. Each specialist agent reads their Monday directive before running
4. Outputs from Tuesday-Thursday feed into the following Monday review

### Actioning Outputs

| Agent Output | Who Actions It | How |
|---|---|---|
| Social posts | Human or scheduler | Copy-paste to platform |
| Sales outreach | Human | Send via chosen platform |
| Product proposals | Human + Web Dev Agent | Implement if approved |
| UI/UX suggestions | Web Dev Agent | Implement in code |
| Research intel | CEO Agent + human | Inform decisions |
| Dev logs | Human | Fix P0/P1 bugs immediately |
| Content pieces | Human | Publish or schedule |
| Video notes | Auto-saved | Reference in future work |

---

## 6. How to Avoid Duplicate Work

### Before Each Agent Run
1. Check your output folder for the past 14 days
2. List the angles, topics, or suggestions already covered
3. Actively choose something different or deeper

### Deduplication Rules by Agent
- Social Media Agent: No repeated angle within 7 days. Rotate 8 angles listed in prompt.
- Content Repurposing Agent: No repeated source note within 14 days. Track in output header.
- Research Agent: No repeated intel item. Check Research/ folder before running.
- Product Specialist: No repeated proposal topic within 30 days. Check proposal history.
- UI Specialist: Do not suggest a change already in implementation by Web Dev Agent.
- UX Specialist: Do not duplicate UI Specialist Thursday suggestions (read their output first).

### Cross-Agent Deduplication
CEO Agent checks for duplication across agents during Monday review. If two agents produce overlapping work, CEO Agent directs one to change focus.

---

## 7. Output Quality Standards

### Specificity
Every item must be specific enough to act on without a follow-up question.
Rejected: Improve the onboarding experience
Accepted: Remove the company name field from the signup form to reduce friction for sole traders

### Completeness
Every required section in the output template must be filled. If a section does not apply, explain why in one sentence.

### Source Traceability
Every insight must reference where it came from: vault note, URL, Reddit thread, or changelog entry.

### Length Discipline
- Social posts: specified word limits apply
- Proposals and reviews: as long as needed, no longer
- Dev logs: concise but complete
- Research intel: 3 items minimum with all 4 fields (source, finding, implication, action)

### MRR Connection
Every output must have a visible line of sight to 10k GBP MRR. CEO Agent rejects outputs that do not connect to retention, conversion, or new revenue.

---

## 8. System Health Checks

### Weekly (by CEO Agent)
- [ ] All 9 agents produced output this week
- [ ] No P0 bugs exist
- [ ] MRR is tracked and direction noted
- [ ] At least 1 decision made that changes agent focus

### Monthly (by human)
- [ ] All agent outputs reviewed for quality
- [ ] Implemented changes measured for impact
- [ ] Agent schedule adjusted if needed
- [ ] Vault cleaned of stale or outdated notes
- [ ] Prompts updated if agent outputs are consistently off-target

---

Last updated: 2026-05-24 | Version 1.0

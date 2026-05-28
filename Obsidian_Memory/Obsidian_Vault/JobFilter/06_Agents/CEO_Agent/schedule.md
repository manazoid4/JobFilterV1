---
agent: CEO_Agent
file: schedule.md
last_updated: 2026-05-24
---

# CEO Agent Schedule

## Frequency
**Weekly -- every Monday**

## Time
**9:00 AM**

## Trigger
Time-based. Runs at start of every week.

## Pre-conditions
Before the CEO Agent can run, these must be available:
- All agent output files from the past 7 days (in `06_Agents/[Agent]/`)
- `PersistentMemory.md` has been updated
- `Progress.md` is current

## Duration
Estimated 15-20 minutes to read vault + produce review.

## Output Location
`06_Agents/CEO_Agent/weekly-review-YYYY-MM-DD.md`

## Dependencies
Reads output from ALL other agents. Should run AFTER all other weekly agents have submitted their Friday outputs.

## Ideal Run Order (Monday)
1. Confirm all weekly agent outputs are present
2. Run CEO Agent
3. CEO Agent produces directives for all agents
4. Directives inform the following week's agent runs

## Escalation
If an agent did not produce output two weeks in a row, CEO Agent must flag it and decide: fix the trigger, replace the agent, or pause it.

## Review Cycle
CEO Agent's own performance is reviewed monthly as part of the monthly agent review.

---
agent: Web_Dev_Agent
file: schedule.md
last_updated: 2026-05-24
---

# Web Dev Agent Schedule

## Frequency
**Daily**

## Time
**6:00 AM** (runs before Social Media and Content Repurposing agents)

## Trigger
Time-based. Runs every morning at 6am, 7 days a week.

## Pre-conditions
- Access to production logs
- `PersistentMemory.md` is accessible
- Previous day's dev-log is available for bug status comparison

## Duration
Estimated 10-15 minutes for daily check. Longer if bugs are found.

## Output Location
`06_Agents/Web_Dev_Agent/dev-log-YYYY-MM-DD.md`

## Weekly Technical Review
In addition to daily checks, on Thursdays the Web Dev Agent should:
1. Read UI Specialist and UX Specialist outputs (both run Thursday)
2. Assess implementation effort for their suggestions
3. Add top 2 most-impactful suggestions to the build queue

## P0 Protocol
If site is DOWN (P0):
1. Log immediately in dev-log
2. Flag in `Daily Brief.md` as EMERGENCY
3. All other agent tasks pause until site is restored

## Output Feeds Into
- CEO Agent (daily health visible in weekly review)
- UI Specialist and UX Specialist (implementation feedback)

## Monthly Review
Review all bugs logged in the past month: P0/P1/P2/P3 counts. How quickly were P0s and P1s resolved? What categories keep appearing? What refactor would prevent the most recurring bugs?

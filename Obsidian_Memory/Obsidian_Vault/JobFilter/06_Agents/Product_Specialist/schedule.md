---
agent: Product_Specialist
file: schedule.md
last_updated: 2026-05-24
---

# Product Specialist Schedule

## Frequency
**Weekly -- every Tuesday**

## Time
**9:00 AM**

## Trigger
Time-based. Runs every Tuesday morning.

## Pre-conditions
- CEO Agent weekly review from Monday is available
- `PersistentMemory.md` is current
- `Product/` folder has been checked for new notes

## Duration
Estimated 20-30 minutes.

## Output Location
`06_Agents/Product_Specialist/proposal-YYYY-MM-DD.md`

## Input From CEO Agent
Check Monday's CEO weekly review for any directive to Product_Specialist before running.

## Output Feeds Into
- Web Dev Agent (for implementation planning)
- UI Specialist and UX Specialist (for design implications)
- CEO Agent (reviewed next Monday)

## Escalation
If the proposal is rated "Low priority" by CEO Agent two weeks in a row, the Product Specialist must change its research approach and read deeper into user pain points.

## Monthly Review
Product proposals are audited monthly: how many were implemented, what was the measured impact?

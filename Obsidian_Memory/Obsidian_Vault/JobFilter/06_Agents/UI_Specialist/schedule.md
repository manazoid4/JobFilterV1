---
agent: UI_Specialist
file: schedule.md
last_updated: 2026-05-24
---

# UI Specialist Schedule

## Frequency
**Weekly -- every Thursday**

## Time
**9:00 AM**

## Trigger
Time-based. Runs every Thursday morning.

## Pre-conditions
- CEO Agent weekly review from Monday is available
- Product Specialist proposal from Tuesday is available
- `Design/` folder is accessible
- `PersistentMemory.md` is current

## Duration
Estimated 20-30 minutes.

## Output Location
`06_Agents/UI_Specialist/ui-review-YYYY-MM-DD.md`

## Input From CEO Agent
Check Monday's CEO weekly review for any directive to UI_Specialist before running.

## Input From Product Specialist
Review Tuesday's proposal for any new features that need UI design input.

## Coordination With UX Specialist
UI Specialist and UX Specialist both run on Thursday. Their outputs should complement each other:
- UI Specialist: visual design (colours, typography, spacing, component styling)
- UX Specialist: flow, readability, conversion, mobile behaviour
They should not duplicate suggestions.

## Output Feeds Into
- Web Dev Agent (for implementation)
- CEO Agent (reviewed next Monday)

## Monthly Review
Review all UI suggestions from the past month: how many were implemented? What was the visual impact? Update the design system document accordingly.

---
agent: UX_Specialist
file: schedule.md
last_updated: 2026-05-24
---

# UX Specialist Schedule

## Frequency
**Weekly -- every Thursday**

## Time
**10:00 AM** (runs after UI Specialist to avoid overlap)

## Trigger
Time-based. Runs every Thursday morning, after UI Specialist has run.

## Pre-conditions
- CEO Agent weekly review from Monday is available
- Product Specialist proposal from Tuesday is available
- UI Specialist output from earlier Thursday is available (to avoid duplicating suggestions)
- `PersistentMemory.md` is current

## Duration
Estimated 20-30 minutes.

## Output Location
`06_Agents/UX_Specialist/ux-review-YYYY-MM-DD.md`

## Input From CEO Agent
Check Monday's CEO weekly review for any directive to UX_Specialist before running.

## Coordination With UI Specialist
Both run on Thursday. UX Specialist should read UI Specialist's output before running to avoid overlap.
- UI Specialist: visual design (colours, typography, spacing)
- UX Specialist: flow, conversion, onboarding, mobile behaviour

## Output Feeds Into
- Web Dev Agent (for implementation)
- Product Specialist (conversion insights inform product roadmap)
- CEO Agent (reviewed next Monday)

## Monthly Review
Review all UX suggestions from past month: how many were implemented? Did conversion metrics improve? What flows still need work?

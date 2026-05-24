---
agent: Research_Agent
file: schedule.md
last_updated: 2026-05-24
---

# Research Agent Schedule

## Frequency
**Weekly -- every Friday**

## Time
**9:00 AM**

## Trigger
Time-based. Runs every Friday morning.

## Pre-conditions
- CEO Agent weekly review from Monday is available (for focus areas)
- Previous week's research output is available (to avoid duplicating findings)
- `Research/` folder is accessible

## Duration
Estimated 30-45 minutes (research takes longer than other agents).

## Output Location
`06_Agents/Research_Agent/intel-YYYY-MM-DD.md`

## Input From CEO Agent
Check Monday's CEO weekly review for any directive to Research_Agent. CEO may specify:
- A specific competitor to focus on
- A specific pain point to investigate
- A pricing question to research

## Why Friday?
Friday output feeds the CEO Agent's Monday review. CEO reads Research Intel alongside all other agent outputs. Research findings also feed:
- Sales Specialist (Wednesday next week -- new sales angles)
- Product Specialist (Tuesday next week -- market-informed proposals)
- Social Media Agent (daily -- pain points become posts)

## Output Feeds Into
- CEO Agent (Monday review)
- Sales Specialist (Wednesday)
- Product Specialist (Tuesday)
- Social Media Agent (daily)

## Monthly Review
Review all 4 weeks of intel: what themes keep appearing? What competitor keeps being mentioned? What pain point is most commonly cited? Use this to set the next month's research focus.

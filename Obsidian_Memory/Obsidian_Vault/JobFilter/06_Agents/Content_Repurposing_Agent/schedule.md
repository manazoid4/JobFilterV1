---
agent: Content_Repurposing_Agent
file: schedule.md
last_updated: 2026-05-24
---

# Content Repurposing Agent Schedule

## Frequency
**Daily**

## Time
**8:00 AM** (runs after Web Dev Agent at 6am and before Social Media Agent distributes at 7am -- note: Content Repurposing feeds Social Media Agent's next day queue)

## Trigger
Time-based. Runs every morning at 8am, 7 days a week.

## Pre-conditions
- Vault notes from past 48 hours are accessible
- Previous 14 days of content output is accessible (to check for angle repetition)
- `Marketing/` folder is accessible

## Duration
Estimated 15-20 minutes.

## Output Location
`06_Agents/Content_Repurposing_Agent/content-YYYY-MM-DD.md`

## Weekly Format Mix Target
Across 7 days, produce at least:
- 4 social posts (short form)
- 2 carousel scripts
- 2 email/ad copy pieces
- 2 landing page sections or case study snippets

## Output Feeds Into
- Social Media Agent (content pieces ready to post)
- CEO Agent (reviewed weekly for content pipeline health)
- Marketing/ folder (assets archived for future use)

## Escalation
If no vault notes were updated in the past 48 hours:
1. Pull from the past 7 days of vault notes
2. If still nothing useful, draw from `Research/` folder findings
3. Log this gap in the daily output file

## Monthly Review
Review content produced: which formats performed best? Which source notes generated the most reusable content? What gaps in the vault mean certain content angles can't be produced?

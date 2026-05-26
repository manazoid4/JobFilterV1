---
agent: Video_Digest_Agent
file: schedule.md
last_updated: 2026-05-24
---

# Video Digest Agent Schedule

## Frequency
**On-demand**

## Trigger
Manual. Run whenever a YouTube video is watched and worth capturing.

## How to Trigger
1. Open `06_Agents/Video_Digest_Agent/prompt.md`
2. Paste in the YouTube URL or transcript
3. Include the video title and date
4. Run the agent
5. Output is saved automatically to `08_Video_Notes/`

## Target Completion Time
**5 minutes from trigger to saved note**

## Output Location
`08_Video_Notes/YYYY-MM-DD - Video Title.md`

## When to Run
Run this agent after watching any video that contains:
- Sales or marketing insights applicable to JobFilter
- Product or UX frameworks
- Competitor or market intelligence
- Trade industry insights
- Growth, pricing, or retention strategies
- Any content that could inform the roadmap

## When NOT to Run
- Entertainment content with no business application
- Videos already digested (check `08_Video_Notes/` first)
- Short clips under 5 minutes with no frameworks or key ideas

## Output Feeds Into
- Content Repurposing Agent (video insights become content)
- Research Agent (market intel from videos feeds weekly research)
- Product Specialist (frameworks inform product proposals)
- CEO Agent (reviewed monthly -- how many videos digested, what was actioned)

## Monthly Review
Review all video notes created in the past month:
- How many Action Items were actually completed?
- Which videos generated the most reusable content?
- Are the Linked Notes connections being maintained?

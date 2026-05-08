# Chase Engine

Updated: 8 May 2026

## Position

> WhatsApp job bodyguard — it chases so the tradesman does not have to.

## Core Function

Auto-nudge system for leads that go cold. Three-touch escalation with pre-written message templates in tradesman language.

## How It Works

| Touch | Timing | Trigger | Purpose |
|-------|--------|---------|---------|
| **1st** | 2h after lead detected | Lead not contacted | Quick intro — "I saw your job, I'm local" |
| **2nd** | 24h after first contact | No response | Gentle reminder — "Still available this week" |
| **3rd** | 48h after first contact | Still no response | Final nudge — "Booking up, last chance" |

After 3rd nudge: lead marked as cold unless tradesman updates status.

## Status Flow

```
NOT CONTACTED → CONTACTED → FOLLOWING UP → WON / LOST
```

- **Not Contacted**: Lead detected but no outreach yet. 2h countdown starts.
- **Contacted**: First message sent. 24h countdown to follow-up.
- **Following Up**: Second or third nudge sent. 48h final window.
- **Won**: Job secured. Triggers Win Engine (review link, ROI tracking).
- **Lost**: Job gone. Removed from active chase.

## Message Templates

All templates use tradesman language. No corporate speak. Variables auto-filled from lead data.

| Key | Label | Stage | Purpose |
|-----|-------|-------|---------|
| `first_touch_2h` | First touch | Not Contacted | Quick intro — let them know you saw the job |
| `follow_up_24h` | 24h follow-up | Following Up | Gentle reminder — still interested |
| `final_nudge_48h` | 48h final nudge | Following Up | Last attempt — create urgency |
| `won_thanks` | Won — thanks | Won | Professional thanks |
| `quick_quote_offer` | Quick quote offer | Not Contacted | Alternative first touch — lead with speed |
| `availability_check` | Availability check | Following Up | Frame around your diary, not their delay |

## Files

- `src/pages/ChaseEnginePage.tsx` — Main Chase Engine page
- `src/components/ChaseStatus.tsx` — Status badge component
- `src/lib/chaseStore.ts` — localStorage persistence for chase state
- `src/lib/chaseTemplates.ts` — Message template definitions
- `src/lib/types.ts` — ChaseLead, ChaseStage, NudgeEvent, MessageTemplate types

## Integration Points

- **Find Engine**: Leads flow from Find Jobs scan into Chase Engine via "Import Leads" button
- **Win Engine**: When status changes to "Won", Win Engine triggers review link generation
- **WhatsApp**: Templates copy to clipboard → one-tap opens WhatsApp with pre-filled message

## Design Rules

- Brutalist yellow/black/white — same as rest of JobFilter
- Board view (Kanban-style) and List view toggle
- Overdue nudges shown in red
- Every nudge has clear purpose and timing
- Status badges are colour-coded
- Chase history visible per lead

## Competitive Edge

Time To Scale charges £197-497/mo for agency-managed follow-up. JobFilter does it automatically at £29-49/mo. Agency cannot scale. Software can.

## See Also

- [[Competitor Product Lessons#Triple Engine Model]]
- [[Intake Engine]]
- [[Win Engine]]

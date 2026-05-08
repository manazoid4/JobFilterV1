# Win Engine

Updated: 8 May 2026

Purpose: The retention moat. Proves JobFilter value after every win. Keeps users subscribed.

Part of the **Triple Engine** model: Find → Chase → Win.

---

## What It Does

1. **Won Job Tracking** — When a lead is marked Won (in Chase Engine or manually), capture job value, date, trade
2. **Monthly ROI Dashboard** — "You've won X jobs worth £Y this month"
3. **Review Link Generator** — Auto-create Google/Checkatrade review request message, one-tap copy for WhatsApp
4. **Won Job History** — Timeline of wins with values
5. **Lost Job Analysis** — Why was it lost? (price, timing, competition, not interested, went elsewhere, other)
6. **Yearly Trend** — Bar chart of jobs won per month (last 12 months)

---

## Why It Matters

- **Retention**: Trades love seeing their wins. A scoreboard keeps them coming back
- **Proof of Value**: "You've won £12,000 this month via JobFilter" — that's a no-brainer subscription
- **Reviews**: Happy customers leave reviews → reviews bring more leads → flywheel
- **Learning**: Lost job analysis shows patterns. If 60% of losses are price, adjust quoting strategy

---

## Data Model

```
WinJob {
  id, leadId, title, trade, location, value, wonAt, source
}

LostJob {
  id, leadId, title, trade, location, estimatedValue, lostAt, reason, notes, source
}
```

Stored in `localStorage` key: `jobfilter.win`

---

## Integration Points

- **Chase Engine**: When a lead stage changes to `won` or `lost`, Win Engine detects untracked entries and prompts to log them
- **WinSummary Component**: Homepage widget showing monthly stats — links to `/win`
- **TopNav**: "Win" link between Chase and Signals

---

## Files

- `src/pages/WinEnginePage.tsx` — Main page
- `src/lib/winStore.ts` — Data layer
- `src/components/WinSummary.tsx` — Homepage widget
- `src/lib/types.ts` — WinJob, LostJob, LostReason types

---

## Design Principles

- **Scoreboard feel**: Big numbers, yellow/black, trades love seeing their wins
- **One-tap actions**: Copy review message, log a win, tap loss reason
- **No fluff**: Show the numbers. Let the wins speak.
- **Brutalist**: DeWalt yellow, black borders, no pastels

---

## Future Enhancements

- Auto-WhatsApp review request on win (with user opt-in)
- Export wins as PDF for tax/accounting
- Compare win rate vs previous month
- Trade-specific breakdown (which trades win most)
- Team mode (multiple users, shared scoreboard)

---

## Competitor Context

No competitor does post-win tracking well. Checkatrade focuses on reviews but doesn't track ROI. MyBuilder shows lead volume (junk signal). Time To Scale bundles this into an agency retainer at £197-497/mo.

JobFilter does it in software at £29-49/mo. That's the structural advantage.

**See also:** [[Competitor Product Lessons#Triple Engine Model (from Time To Scale, 5 May 2026)]]

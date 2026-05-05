# Problems and Solutions

## Rule

Agents must check this note before changing product copy, pricing, lead delivery, lead gating, or customer trust messaging.

This note captures customer objections that matter enough to become product rules.

---

## Problem 1 - How do we make sure leads do not go to other people?

### Customer Fear

Tradesmen do not want another shared lead platform.

They worry that:

- the same job has gone to five other trades
- they will be forced into a price war
- fast response matters less than being cheapest
- JobFilter becomes Checkatrade/MyBuilder with better branding

### Honest Constraint

Official source data is public.

JobFilter cannot honestly claim that nobody else in the world can find a public planning application, public tender, or EPC signal.

Do not promise impossible exclusivity over public records.

### JobFilter Solution

JobFilter should protect distribution, not pretend to own public data.

The product rule:

- Do not resell the same unlocked Gold lead as a shared auction.
- Do not send the same Gold lead to a queue of competing trades in the same trade and patch.
- Use trade + postcode patch + time window controls before WhatsApp delivery.
- If a signal is already crowded, mark it down or block it.
- Show customers the source proof, but make clear JobFilter is not a bid marketplace.

### Website Copy Direction

Use:

> Public records are public. The protection is what JobFilter does after it finds them: no shared auction, no five-trade blast, no race-to-the-bottom resale.

Use:

> Gold leads are controlled by trade, patch, and timing before they hit WhatsApp.

Use:

> If a lead looks crowded, it gets marked down or blocked.

Avoid:

- "Nobody else can ever see this lead."
- "Exclusive public data."
- "Guaranteed no competition."
- "We own the lead."

### Implementation Direction

Needed in the lead engine:

- `deliveryLockKey = trade + postcodeOutward + sourceId`
- Lock Gold delivery for a trade/patch window.
- Track who received each unlocked lead.
- Suppress duplicate same-trade same-patch blasts.
- Add `competitionRisk` or `crowdingSignal` to scoring.
- Expose "No shared auction" in paid trust copy.

### Success Test

A paying trade should understand:

- public source data can still be found elsewhere
- JobFilter does not sell the same Gold lead like a shared lead marketplace
- the value is speed, filtering, delivery control, and proof

## Links

- [[JobFilter Product overview]]
- [[Intake Engine]]
- [[Data Sources]]
- [[Product Index]]

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

Data-source strategy is private.

JobFilter should not tell customers or competitors exactly where signals come from.

Do not expose source names, source categories, URLs, registers, portals, or data-source mechanics in public copy.

### JobFilter Solution

JobFilter should protect distribution and keep the signal stack private.

The product rule:

- Do not resell the same unlocked Gold lead as a shared auction.
- Do not send the same Gold lead to a queue of competing trades in the same trade and patch.
- Use trade + postcode patch + time window controls before WhatsApp delivery.
- If a signal is already crowded, mark it down or block it.
- Show customers confidence, timing, proof level, and action detail without naming the source stack.

### Website Copy Direction

Use:

> JobFilter keeps the filter private. Gold leads are controlled before they hit WhatsApp: no shared auction, no five-trade blast, no race-to-the-bottom resale.

Use:

> Gold leads are controlled by trade, patch, and timing before they hit WhatsApp.

Use:

> If a lead looks crowded, it gets marked down or blocked.

Avoid:

- "Nobody else can ever see this lead."
- "Exclusive public data."
- "Guaranteed no competition."
- "We own the lead."
- Naming the data source.
- Linking to source portals.
- Explaining the source pipeline publicly.

### Implementation Direction

Needed in the lead engine:

- `deliveryLockKey = trade + postcodeOutward + sourceId`
- Lock Gold delivery for a trade/patch window.
- Track who received each unlocked lead.
- Suppress duplicate same-trade same-patch blasts.
- Add `competitionRisk` or `crowdingSignal` to scoring.
- Expose "No shared auction" in paid trust copy.
- Never expose source names on marketing pages, pricing, lead previews, legal copy, or public examples.

### Success Test

A paying trade should understand:

- JobFilter keeps its data-source strategy private
- JobFilter does not sell the same Gold lead like a shared lead marketplace
- the value is speed, filtering, delivery control, and proof

## Links

- [[JobFilter Product overview]]
- [[Intake Engine]]
- [[Data Sources]]
- [[Product Index]]

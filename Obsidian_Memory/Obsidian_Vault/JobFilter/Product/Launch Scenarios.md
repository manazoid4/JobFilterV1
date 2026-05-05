# Launch Scenarios

Updated: 5 May 2026

## Purpose

Run these simulations to find where JobFilter breaks, misleads, or fails to convert.
Each scenario exposes a specific product weakness. Fix what surfaces.

---

## S1 — Good lead, missing one field

Situation: Strong lead comes in — urgent, local, clear job — but no budget mentioned.

Run: Does engine score it fairly or bin it for missing budget? Does the display tell the tradesperson enough to act?

Product question: Are we penalising real leads because customers don't volunteer budget upfront?

---

## S2 — Same lead arrives from two sources

Situation: Identical job posted on two platforms. Both get ingested within 12 hours.

Run: Does deduplication catch it? Does one tradesperson see it twice? Does it inflate the lead count?

Product question: If dedup fails, we're selling the same junk twice. Is that happening?

---

## S3 — Strong lead, free user sees it

Situation: High-value job (£4k bathroom refit, clear budget, urgent) surfaces in free tier.

Run: What does a free user see? Enough to feel the pain of not having contact details? Does it create the conversion moment?

Product question: Is the paywall friction in the right place — tantalising, not blocking?

---

## S4 — Stale lead (3 days old) still showing

Situation: Lead was strong when submitted. Now 3 days old, probably already quoted by 5 trades.

Run: Is it still scoring HIGH? Still shown prominently? Does freshness decay correctly?

Product question: Stale leads destroy trust. Are we surfacing them as if fresh?

---

## S5 — Tyre-kicker with convincing language

Situation: "Looking to get my kitchen done, budget around £8k, South London, probably next month."

Run: Engine likely scores HIGH. But "probably next month" + no urgency + no planning = soft buyer.

Product question: Can the engine distinguish committed buyer from someone just fishing? What signals give it away?

---

## S6 — High-value lead, no contact path

Situation: £30k extension job, strong signals — but submitted with fake email and disconnected number.

Run: Does the engine surface it anyway? Does the tradesperson pay to unlock it then find nothing?

Product question: If contact validation is missing, we're selling uncontactable leads. Where does validation live?

---

## S7 — Tradesperson views lead 3 times without converting

Situation: Free user views the same teased lead repeatedly. Doesn't pay.

Run: Does the product respond? Does messaging change? Does urgency increase? Or does it just sit there?

Product question: What's the conversion nudge when interest is clear but payment hasn't happened?

---

## S8 — Oversupplied trade category

Situation: 40 plumbers in one city. Only 3 decent leads this week.

Run: Does the product surface this scarcity honestly? Or does it pad with weak leads to look full?

Product question: Padding kills trust. Is supply vs demand visible — or hidden?

---

## S9 — Lead that improves after initial intake

Situation: Customer submits vague job. Follows up the next day with full budget and timeline.

Run: Does the engine re-score it? Does the tradesperson's view update? Is the improvement reflected?

Product question: Static scoring misses signal evolution. Does the intake engine update on new data?

---

## S10 — Perfect lead, perfect score, tradesperson still doesn't convert

Situation: Best possible lead. Tradesperson sees it, unlocks it, then... silence.

Run: What happened after unlock? Did the lead go cold? Did the tradesperson not follow up? Did the contact info bounce?

Product question: Conversion doesn't end at payment. What's the post-unlock experience — and is it failing?

---

## S11 — Wrong trade category tagged on intake

Situation: Homeowner describes a job vaguely. Engine tags it as "plumber." It's actually an electrician job.

Run: Does the wrong tradesperson see it? Does the right tradesperson miss it? Does the category re-classify on re-score?

Product question: Mis-tagging wastes a tradesperson's time and erodes trust. How often is this happening?

---

## S12 — Gold lead arrives at 11pm

Situation: Strong planning approval ingested at 23:15. Engine scores it GOLD.

Run: Does the WhatsApp alert fire immediately? Does it fire in the morning instead? Does it fire at all?

Product question: "Before everyone else" only works if delivery is instant. Is timing logic correct?

---

## S13 — Two tradespeople in same postcode unlock same lead

Situation: Two plasterers, both in SE1. Both pay to unlock the same £6k job.

Run: Do they both get the same contact details? Does the product tell them this lead has been unlocked by others? Does scarcity language update?

Product question: "No shared leads" is our brand promise. If two people unlock the same job, we're breaking it. Are we?

---

## S14 — Planning permission lead, no homeowner contact

Situation: Strong planning approval found — extension approved, real address, high value. No direct contact for the homeowner.

Run: Does the engine score it HIGH despite no contact signal? Does the display make the source clear (official record, not a form submission)?

Product question: Planning leads are real but cold. Does the product frame them honestly — "find them yourself from this signal" vs "here's a ready lead"?

---

## S15 — Brand new user, first session, no context

Situation: Tradesperson lands on JobFilter for the first time. No account, no prior context.

Run: What do they see in 10 seconds? Do they understand what the product does? Does a real-looking lead appear in the free preview? Does the paywall feel like a reward or a wall?

Product question: First impression = conversion or bounce. Does the cold user experience communicate value before asking for money?

---

## Run Route

`/intake-test` → `/api/intake/score`

Each scenario surfaces a real product gap. Fix the gap, not just the score.

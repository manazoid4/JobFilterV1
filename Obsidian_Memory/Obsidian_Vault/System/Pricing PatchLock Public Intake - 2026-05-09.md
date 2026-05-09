# Pricing PatchLock Public Intake - 2026-05-09

## Source Of Truth Update

GitHub remains the deployment/history source. Obsidian is the product memory source and should track positioning, pricing, revenue hooks, and data strategy decisions.

## Pricing Direction

- Monthly-first pricing across high-conversion pages.
- Founder price: GBP 39/month, first 30 active firms.
- Standard price: GBP 79/month.
- Founder annual: GBP 390/year, roughly two months free.
- Standard annual: GBP 790/year, discounted against monthly.
- Stop leading with weekly pricing.
- User explicitly wanted pricing closer to a tenner a week while preserving a tradesman-friendly founder discount.

## Product Wording

- Replace PQQ-Sieve with `Money Filter`.
- Replace raw source-name sales copy with `verified job signals`, `verification proof`, `public work notices`, `compliance triggers`, `property movement`, and `new business signals`.
- Keep raw source detail in internal docs and backend diagnostics, not hero/sales copy.

## PatchLock

- Strongest territory name: `PatchLock`.
- Meaning: one trade, one postcode cluster, first call on Gold leads while the plan is active.
- Founder monthly includes one PatchLock.
- Extra patch add-on: +GBP 19/month.
- Extra trade add-on: +GBP 15/month.

## Direct Letters

- Paid plans include company-branded lead letters for selected Gold leads.
- Letter pack includes company details, job-specific angle, WhatsApp-ready PDF, and optional print/post add-on.
- Done-for-you direct letter setup: GBP 49 one-off.
- Extra Buyer Pack/letter: GBP 5 per lead.

## Public Demand Engine

- Added `/post-job` as public intake: homeowners/property owners submit a job once.
- This creates owned demand rather than only relying on upstream signal detection.
- Positioning to tradesmen: JobFilter finds demand and pulls new local demand into your patch.

## TradieStack Direction

- TradieStack is no longer just website/CRM.
- It is the capture system for public demand: website, public intake, CRM, WhatsApp inbox, review engine, quotes, invoices, and neighbour campaigns.
- First-month guerilla/sticker/local direct campaigns become monetisation hooks.

## Add-On Revenue Hooks

- Hotlist: GBP 9/month.
- Buyer Pack Plus: GBP 5/lead.
- Vantage Fast Pack: GBP 49 each.
- Neighbour Signal campaign: from GBP 99.
- First-month guerilla kit: from GBP 99.
- Direct letter setup: GBP 49 one-off.

## Implementation Log

- Rebuilt `PricingPage` around GBP 39 founder / GBP 79 standard monthly pricing.
- Updated Stripe server and Firebase Functions price constants to match.
- Added `/post-job` public job intake route.
- Added `/activation-pending` checkout success route.
- Rebuilt `TerritoriesPage` from game-like grid into a serious PatchLock register.
- Rebuilt `TradieStackPage` as a public-demand capture system with first-month marketing add-ons.
- Added homepage public-demand section.
- Updated visible waitlist/nav/footer pricing copy to GBP 39 founder and GBP 79 standard.

## Verification

- `npm run lint` passed.
- `npm run build` passed.
- Local route checks returned 200 for `/pricing`, `/post-job`, `/territories`, `/tradiestack`, and `/activation-pending`.

## 2026-05-09 Feedback, Nav, Signals Patch

- Added visible feedback prompts to homepage, pricing, and footer.
- Feedback message: JobFilter is not a detached tech company; we want tradesmen to tell us what wastes time, what leads are rubbish, and what would make the product worth paying for.
- Feedback action is one-click email to `contact@jobfilter.uk` with a prefilled structure:
  - trade
  - area
  - biggest problem
  - what would make JobFilter worth paying for
  - optional phone number for reply
- Top navigation issue fixed:
  - shortened labels to reduce crowding
  - prevented desktop nav words from wrapping/breaking
  - tightened brand spacing
  - hid secondary strapline until wide screens
  - changed mobile founder slot text away from green
- Signals page expanded from five to ten signal classes:
  - HMO licensing
  - building control
  - auction property
  - insolvency / void works
  - retrofit grants
- Added visible notes under expansion signals where manual/API setup is still needed so the product does not imply automation that is not wired yet.
- Pricing page visual pass:
  - reduced heavy bright-yellow usage
  - kept yellow as accent/CTA colour
  - improved Standard GBP 79/month card contrast so wording is readable

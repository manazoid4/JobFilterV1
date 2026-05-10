# Growth Playbook - Worldwide and UK

## Executive Summary

JobFilter should not become another review site, generic job board, or shared-lead marketplace.

The winning model is a UK construction intelligence layer:

`official signals -> UPRN/company normalization -> enrichment -> scoring -> WhatsApp/direct delivery -> feedback loop`

Worldwide construction lead platforms are converging on the same operating model: collect project signals early, normalize them into a project graph, enrich them with decision-maker and site context, score them, and push them into sales workflows before the work reaches crowded bid boards or consumer marketplaces.

## Strategic Conclusion

**Build a UPRN-centered project intelligence graph, not a marketplace.**

Use UPRN as the property join key, then layer:

- planning events
- local planning weekly lists
- Planning London Datahub
- Scottish building warrants
- procurement notices
- EPC records
- HM Land Registry price-paid history
- streetworks
- skip, scaffold, hoarding, and permit signals
- Companies House events
- outreach and conversion history

This creates three advantages:

- lower marginal data cost because many sources are official or low-cost
- compounding coverage because every scan enriches the graph
- earlier and more exclusive leads than quote marketplaces

## UK Connector Strategy

UK-only must not mean England-only.

England has Planning Data API coverage, but planning-application coverage is incomplete and still developing. London has a stronger dedicated Planning London Datahub. Scotland has separate building-warrant and weekly-list signals. Public procurement is split across Contracts Finder, Find a Tender, Public Contracts Scotland, Sell2Wales, and eTendersNI.

JobFilter therefore needs a connector strategy, not a single master source.

## Channel Positioning

| Channel | JobFilter Reading |
|---|---|
| Consumer marketplaces | Fast but crowded, low exclusivity, shared lead pressure |
| Project intelligence | Higher-quality and earlier, but usually expensive and enterprise-weight |
| Public procurement | Strong for commercial/public works, heavier bid process |
| Planning and permit intelligence | Highest early-signal potential if normalized correctly |
| Streetworks/site-activity signals | Strong evidence work is moving from intent to action |
| SEO/PPC/social | Useful distribution, weak exclusivity |

JobFilter should sit between marketplaces and enterprise intelligence:

- cheaper and narrower than Barbour ABI / Glenigan
- earlier and more exclusive than Checkatrade / MyBuilder
- more data-native than manual planning-list vendors

## Regulatory Guardrail

The safest moat is official data plus compliant outreach.

Publicly available personal data can still be personal data under UK GDPR. PECR still matters for electronic marketing.

Default posture:

- prefer official/public data sources
- prefer company-level outreach, direct mail, and opt-out discipline
- document legitimate interest where outreach is used
- avoid indiscriminate cold-emailing of named individuals scraped from pages
- keep raw source mechanics internal

## Product Implication

The product should sell:

- earlier job discovery
- better filtering
- PatchLock territory control
- WhatsApp delivery
- less chasing
- higher conversion per lead

Do not sell:

- a generic job board
- raw planning spam
- a review-site clone
- a shared lead auction

## Architecture

```mermaid
flowchart LR
    A[Official and public signals] --> B[Normalize UPRN, postcode, company number]
    B --> C[Enrich EPC, price paid, constraints, Companies House, trade fit]
    C --> D[Score value, urgency, rarity, distance, win probability]
    D --> E[Route WhatsApp, dashboard, direct mail, call tasks]
    E --> F[Feedback open, reply, quote, win, value]
    F --> C
```

## Next Build Direction

1. Create UPRN/property graph schema.
2. Add official connectors by region and signal class.
3. Score signal fusion, not single records.
4. Store feedback from scans, WhatsApp sends, quotes, and wins.
5. Use the feedback loop to improve ranking and territory value.

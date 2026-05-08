# Companies House Signal

Updated: 8 May 2026

Status: **Built, key-gated** — mock data active, live API pending

- [[Data Sources]]

## What It Is

UK Companies House registers every new company in the UK. Each registration includes:

- Company name
- SIC code (what the business does)
- Registered address
- Date of incorporation
- Officer details

New company = new premises = trade work needed.

## Why It Matters

When someone registers a restaurant, hotel, tech company, or retail store, they need fit-out work before they open:

- Plumbing and gas for kitchens
- Electrical for commercial premises
- HVAC for server rooms and offices
- Carpentry for shop fittings
- Building work for conversions

The tradesman who knows about the company on day one gets the contract. Everyone else waits until it's on MyBuilder.

## Three Signals

### Signal 1: New Trade Contractor
A plumbing, electrical, or building firm incorporates. They'll need subcontractors or overflow partners.

**Value:** Subcontract pipeline, project partnerships

### Signal 2: Premises Fit-Out
Restaurant, hotel, retail, or tech company registers. They need full commercial fit-out.

**Value:** £15k–£600k depending on sector

### Signal 3: Growth Sector
Cleantech, esports, data centres — new SIC codes from 2026 framework. High-value specialist work.

**Value:** £30k–£2M

## SIC Code Mapping

| SIC | Sector | Trades Needed | Value Range |
| --- | --- | --- | --- |
| 43210 | Electrical contractor | Electrical | £8k–£60k |
| 43220 | Plumbing & heating | Plumbing | £6k–£40k |
| 43290 | Specialist installer | Building, HVAC | £10k–£80k |
| 43320 | Joinery/flooring | Carpentry | £5k–£30k |
| 43341 | Painting/decorating | Painting | £3k–£20k |
| 41100 | Property developer | All trades | £40k–£250k |
| 41201 | Residential builder | All trades | £30k–£180k |
| 41202 | Commercial builder | All trades | £60k–£500k |
| 55100 | Hotel/B&B | All trades | £80k–£600k |
| 56101 | Licensed restaurant | Plumbing, Electrical, HVAC | £15k–£80k |
| 56102 | Café/unlicensed | Plumbing, Electrical | £8k–£45k |
| 62011 | Tech company | Electrical, HVAC | £20k–£90k |
| 35111 | Renewable energy | Electrical | £30k–£200k |
| 93112 | Esports facility | All trades | £100k–£600k |
| 26200 | Data centre | Electrical, HVAC, Building | £200k–£2M |

## API Details

- **Endpoint:** `https://api.company-information.service.gov.uk/advanced-search/companies`
- **Auth:** HTTP Basic — API key as username, no password
- **Free key:** https://developer.company-information.service.gov.uk/get-started
- **Rate limit:** 600 requests per 5 minutes
- **Search params:** `sic_codes`, `incorporated_from`, `company_status`, `location`

## Implementation

Fetcher: `leadEngine/fetchers/companiesHouseFetcher.ts`

- Batches SIC codes in groups of 4 (API limit)
- Filters by trade relevance
- Scores by incorporation recency (< 60 days = high urgency)
- Links to Companies House company page

Mock mode: Active when `COMPANIES_HOUSE_API_KEY` not set. Generates realistic company registrations for the scanned postcode area.

## Scoring

- Source confidence: **72%** (official government data)
- Urgency bias: incorporation age (< 60 days = high, < 150 = medium)
- Value range: derived from SIC code signal mapping
- Proximity: matched to outward postcode area

## Pipeline Position

```
FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER
```

Companies House runs in parallel with Contracts Finder, Planning Data, EPC, and Land Registry. Results merge into the same scored lead pool.

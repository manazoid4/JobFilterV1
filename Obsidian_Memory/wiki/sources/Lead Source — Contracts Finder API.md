---
type: source
status: chosen
created: 2026-04-28
updated: 2026-04-28
links:
  - "[[Intake Engine]]"
---
# Lead Source — Contracts Finder API

## Decision
Contracts Finder picked as MVP lead source for [[Intake Engine]].

## Why
- Free — no API key, no quota, public data
- JSON + Atom feeds — clean to ingest
- UK government-stable — contractsfinder.service.gov.uk
- Includes: title, value, location (postcode/region), CPV codes, posted date, deadline, organisation, contact where provided
- Beats alternatives:
  - Planning Portal — paid + rate-limited
  - Direct LA scraping — 49+ portals = 49+ failure modes
  - Find a Tender — only >£139K threshold (too narrow for trades)

## Endpoint
`https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search`

Public REST. Search by location, CPV, value range, status (Open/Awarded). Returns OCDS-compliant JSON.

## Trade-relevant CPV Codes
- `45000000` — Construction work
- `45100000` — Site preparation
- `45200000` — Civil engineering
- `45300000` — Building installation (electrical, plumbing, HVAC)
- `45400000` — Building completion (joinery, plastering, painting)
- `50800000` — Repair and maintenance services

## Lead Schema (target for `src/data/jobs.ts`)
```ts
{
  id: string,           // OCDS notice ID
  trade: string,        // mapped from CPV code
  title: string,
  postcode: string,
  region: string,
  value_min: number,    // GBP
  value_max: number,
  posted_at: string,    // YYYY-MM-DD
  deadline: string,     // YYYY-MM-DD
  source_url: string,
  contact?: { name?: string, email?: string, phone?: string }
}
```

## Risks
- Some notices lack postcode — geocode from org address
- CPV -> trade mapping needs lookup table (joinery vs electrical vs plumbing)
- Public-sector lean — fewer small private trade jobs (mitigation: pair with planning data later)

## Next Action
Step 2 of 5: build minimal Node fetcher hitting Search endpoint with `cpv=45000000&status=Open&limit=50`, normalise to schema above, dump JSON.

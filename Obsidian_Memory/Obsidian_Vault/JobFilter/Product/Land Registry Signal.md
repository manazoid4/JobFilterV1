# Land Registry Signal

Updated: 8 May 2026

## What It Is

UK Land Registry publishes **Price Paid Data** — every property sale in England and Wales. Open data, free, monthly updates.

Each record contains:
- Full address (including outward postcode)
- Sale price
- Sale date
- Property type (detached, semi-detached, terraced, flat)
- Tenure (freehold / leasehold)
- Locality

Source: https://publishing.prh.gov.uk/price-paid-data

## Why It Matters for Trades

**New owner = renovation work.**

When someone buys a house, within 6-18 months they typically need:
- Bathroom refit or full replumb
- Rewire or consumer unit upgrade
- Kitchen replacement
- Extension or loft conversion
- Roof repairs or replacement
- Garden landscaping / driveway
- Full redecoration

The homeowner hasn't posted on MyBuilder yet. They haven't called anyone. But the sale is public record. JobFilter sees it first.

## Signal Strength by Property Type

| Property Type | Avg Sale Price | Renovation Likelihood | Typical Spend | Best Trades |
| --- | --- | --- | --- | --- |
| Detached | £450k | 85% | £25k-£60k | Building, Roofing, Landscaping, All |
| Semi-Detached | £280k | 75% | £15k-£40k | Building, Electrical, Plumbing |
| Terraced | £195k | 65% | £10k-£25k | Building, Electrical, Plumbing |
| Flat | £150k | 45% | £5k-£15k | Electrical, Plumbing, Decorating |
| Bungalow | £220k | 70% | £12k-£30k | Building, Roofing, Landscaping |

## How It Works in JobFilter

```
FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER
```

1. **Fetch**: Monthly CSV downloaded, filtered by user's outward postcode
2. **Normalise**: Sale records become RawLead entries with estimated renovation value
3. **Filter**: Only property types relevant to user's trade pass through
4. **Score**: Higher price + recent sale + relevant property type = higher score
5. **Deliver**: "New owner nearby — [trade] renovation likely" alert

## Scoring Logic

- **Recency**: Sale in last 7 days = +20, 14 days = +15, 30 days = +10
- **Price**: Higher sale price = bigger renovation budget = higher score
- **Property type**: Detached/semi = more work than flat
- **Trade match**: Does this property type typically need this trade's work?
- **Source confidence**: 70% (official government data, but no direct contact signal)

## Current Status

**Mock data** — realistic property sales generated per postcode area.

Real implementation needs:
- CSV parser for Price Paid Data (large files, ~100k rows/month)
- Local storage or cache of recent sales by outward code
- Monthly refresh job

## Files

- `leadEngine/fetchers/landRegistryFetcher.ts` — fetcher (mock)
- `leadEngine/config.ts` — SOURCE_LR env flag
- `leadEngine/scan.ts` — integrated into scan pipeline
- `leadEngine/normaliser.ts` — 70% source confidence
- `server/routes/leadsSearch.ts` — preview title and reasons

## Related

- [[Data Sources]]
- [[Problems and Solutions]]

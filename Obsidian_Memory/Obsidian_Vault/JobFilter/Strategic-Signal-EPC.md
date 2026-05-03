# STRATEGIC SIGNAL: EPC Energy Upgrades

## Overview
Properties with low Energy Performance Certificate (EPC) ratings (F, G) represent high-intent leads for tradesmen (insulation, solar, heat pumps, boilers). 

## Implementation Status
- **Fetcher**: `leadEngine/fetchers/epcFetcher.ts` (Implemented but pending live credentials).
- **Scoring**: Integrated into `leadEngine/scorer.ts`.
- **UI**: `epc_signal` tag support added to `LeadCard.tsx` and `FindJobsPage.tsx`.

## Critical Transition Note
- **API Migration**: The legacy `epc.opendatacommunities.org` API is scheduled for retirement on **30 May 2026**.
- **New Portal**: [Get Energy Performance Data](https://get-energy-performance-data.service.gov.uk/).
- **Required Auth**: HTTP Basic Auth using `email:api_key`.

## Next Steps for Future Agents
1. Obtain registered email for API Key `e3754124...`.
2. Update `.env` with `EPC_API_KEY` and `EPC_EMAIL`.
3. Enable `epcData: true` in `leadEngine/config.ts` (currently toggled via env var).
4. Verify the `domestic/search` endpoint on the new `service.gov.uk` domain.

## Potential ROI
Targeting "F" rated homeowners with specific retrofit solutions is a primary "Moat" for JobFilter as it moves beyond generic scrapers.

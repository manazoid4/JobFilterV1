# Lead Engine Architecture - 2026-05-09

Sidecar inspection of `C:\Users\manaz\Desktop\JobFilter\JobFilterV1`.

## Executive Read

JobFilter already has the correct pipeline shape:

`FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER`

But the current engine still behaves more like a mixed live-source scanner plus internal fallback than a paid lead intelligence system.

Highest-value work is not more UI. It is tightening source quality, separating real official signals from demo/internal leads, and turning scoring into a stored, auditable delivery pipeline.

## Current Repo Architecture

Primary local engine:

- `leadEngine/scan.ts`
- `leadEngine/types.ts`
- `leadEngine/normaliser.ts`
- `leadEngine/scorer.ts`
- `leadEngine/fetchers/*`

Firebase copy:

- `functions/leadEngine/*`
- `functions/index.ts`

Server/API copy:

- `server/routes/leadsSearch.ts`
- `server/services/leadNormalizer.ts`
- `server/services/leadScoring.ts`

Risk: lead logic is duplicated across root, Firebase functions, and server routes. The root and Firebase engines look aligned now, but drift risk is high. Do not keep adding scoring fixes in three places.

## Live Scan Evidence

Command run:

`npx tsx leadEngine/scan.ts "B15 1AA" building paid`

Observed:

- Contracts Finder fetched 50.
- FTS fetched 80.
- PCS fetched 126.
- PlanningData returned entities but final visible passed count became 0 after ranking/filtering.
- EPC disabled because credentials are missing.
- Land Registry, Charity Commission, Forestry Commission disabled unless demo mode.
- DirectorySignal placed 3 internal leads above most official sources.

Important quality issue: paid ranking can put `DirectorySignal` above official live sources. That is acceptable as a structured fallback for no-empty-output, but not as a paid lead source unless clearly labelled as internal/estimated and excluded from GOLD WhatsApp delivery.

## Source Reality Check

### 1. Planning Data - Must Fix First

Official docs:

- `https://www.planning.data.gov.uk/docs`
- `https://www.planning.data.gov.uk/dataset/planning-application`

What docs say:

- Planning API supports `entity.json`.
- Recent planning applications should be queried with `start_date_*` filters and pagination.
- Spatial search should use `geometry`/polygon or `geometry_entity`, not just outward postcode text.
- The planning application dataset is incomplete, has only 6 data providers, and is explicitly not ready as full UK coverage.

Current repo target:

- `leadEngine/fetchers/planningDataFetcher.ts`
- `functions/leadEngine/fetchers/planningDataFetcher.ts`

Current problem:

- Uses `period=current`, `q={outward}`, optional point lookup, then broad fallback.
- Does not use `start_date_year/month/day + start_date_match=since`.
- Does not paginate.
- Does not use local authority boundaries or radius polygons.
- Generates artificial deadlines 30 days out, which makes urgency look more precise than it is.

Implementation target:

1. Replace broad fallback with recent-application query:
   - `dataset=planning-application`
   - `start_date_year`
   - `start_date_month`
   - `start_date_day`
   - `start_date_match=since`
   - `limit=100`
   - `offset` pagination
2. For postcode scans, use postcode.io lat/lon already available in `lookupPostcode`, then build a small WGS84 bounding polygon for radius search.
3. Keep `sourceConfidence` capped around 55-65 until coverage improves.
4. Add `planningCoverageWarning` to source stats when dataset coverage is sparse.
5. Do not invent urgency deadlines. Use real application dates/status where present; otherwise score urgency from freshness only.

### 2. Local Planning Portals - Best Lead Quality, Official APIs Only

Planning.data.gov.uk is not enough for a UK SaaS today because coverage is incomplete.

Recommendation:

- Add targeted official portal adapters for high-value launch regions.
- Do not scrape HTML where restricted.
- Start with councils that expose official JSON/open-data feeds or Idox/Northgate APIs through permitted endpoints.

Target repo shape:

- Add `leadEngine/fetchers/localPlanningFetcher.ts`
- Add `leadEngine/fetchers/localPlanning/adapters/*.ts`
- Add config mapping outward postcode/authority to adapter.

MVP authorities:

- Birmingham / West Midlands first.
- Manchester / Greater Manchester second.
- Leeds / West Yorkshire third.
- London boroughs only where official feeds are stable.

Lead value:

- Extensions, loft conversions, dormers, garage conversions, HMOs, change of use, commercial fit-outs.
- These are more actionable for trades than national tenders.

### 3. EPC - Strong Monetisation Source, Needs Credentialed Real Mode

Official docs:

- `https://epc.opendatacommunities.org/docs/api/domestic`

What docs say:

- Domestic search endpoint exists at `/api/v1/domestic/search`.
- Uses Basic auth.
- `size` can go up to 5,000.
- `from` pagination is deprecated; use `search-after`.
- Supports filtering by `postcode`, `uprn`, `property-type`, and `energy-band`.

Current repo target:

- `leadEngine/fetchers/epcFetcher.ts`
- `functions/leadEngine/fetchers/epcFetcher.ts`

Current problem:

- Requires `EPC_API_KEY` and `EPC_EMAIL`, which is fine.
- Uses `postcode={outward}` and `size=50`.
- Compares ratings lexically (`rating > 'D'`), which works only accidentally for A-G order and should be explicit.
- Does not query `energy-band=f&energy-band=g`.
- Does not parse recommendations, expiry, property type, lodgement age, floor area, or potential rating.
- Uses flat `rawValue=2500`, underpricing retrofit jobs.

Implementation target:

1. Query by full postcode when available, and outward only for cluster scan.
2. Add `energy-band=f` and `energy-band=g` for paid EPC signal.
3. Implement search-after pagination.
4. Score:
   - F/G rating high.
   - D/E medium only if certificate is expiring or recommendations are trade-matched.
   - Larger floor area increases value.
   - High gap between current and potential rating increases opportunity.
5. Add trade-specific recommendation matching:
   - insulation -> building/roofing
   - boiler/heating controls -> plumbing/HVAC
   - lighting/solar -> electrical
6. Keep EPC as a separate source product and Pro bundle hook.

### 4. Contracts Finder / FTS / PCS - Useful But Too Noisy For Individual Trades

Official docs:

- Contracts Finder API: `https://www.contractsfinder.service.gov.uk/apidocumentation`
- FTS endpoint currently used: `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages`
- PCS API: `https://api.publiccontractsscotland.gov.uk/v1`

Current repo target:

- `leadEngine/fetchers/contractsFetcher.ts`
- `leadEngine/fetchers/pcsS2wFetcher.ts`

Current problem:

- CPV matching catches large frameworks and unrelated public-sector work.
- Example scan surfaced influenza vaccination, professional services, and billion-pound frameworks as building leads.
- These should not outrank local domestic/commercial planning leads for tradesmen.

Implementation target:

1. Add `buyerFit` and `contractAccessibility` filters.
2. Penalise:
   - frameworks above 250k for individual trades unless explicit small-lot/subcontract terms exist.
   - professional services.
   - nationwide only notices.
   - non-works CPV even if text contains generic words like construction or maintenance.
3. Boost:
   - local authority housing repairs.
   - schools, HMOs, small works, voids, roofing, heating, electrical maintenance.
   - deadline within 7-21 days.
   - named buyer + URL + value + local delivery address.
4. Add a `sourceClass`:
   - `domestic_intent`
   - `commercial_fitout`
   - `public_small_works`
   - `public_framework`
   - `internal_fallback`

### 5. Companies House - Good Fit-Out Signal, Needs Enrichment

Official docs:

- `https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/search/advanced-company-search`

Current repo target:

- `leadEngine/fetchers/companiesHouseFetcher.ts`

Current problem:

- Good SIC logic exists.
- Needs API key.
- Current value/urgency is inferred from incorporation, but contact/action path is weak.

Implementation target:

1. Keep as enrichment, not primary lead.
2. Cross-link with planning applications and EPC/land registry before promoting to GOLD.
3. Add strong signals:
   - new hospitality company + planning/change-of-use nearby.
   - property developer + recent land/property transaction.
   - new office/tech company + commercial premises address.
4. Use Companies House as a multiplier, not a standalone paid alert unless there is a clear premises address.

### 6. Land Registry - Good Trigger, But Not Real-Time

Official docs:

- `https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads`

What docs say:

- Price Paid Data covers England and Wales property sales lodged with HM Land Registry.
- Updated monthly.
- Full CSV is about 5GB; yearly files are 115-230MB.

Current repo target:

- `leadEngine/fetchers/landRegistryFetcher.ts`

Current problem:

- Demo-only.
- Uses random mock sales.
- Should not be surfaced as real leads.

Implementation target:

1. Add a scheduled ingestion job, not per-scan live CSV parsing.
2. Store monthly filtered rows by outward postcode.
3. Score recent sale as renovation likelihood:
   - 0-45 days strongest.
   - detached/semi/terrace higher than flat.
   - high purchase price increases value.
   - not new-build increases retrofit/refurb likelihood.
4. Pair with planning/EPC for confidence.

## Scoring Architecture Targets

Current scorer:

- Source confidence: 20 pts.
- Urgency: 20 pts.
- Proximity: 30 pts.
- Contact signal: 15 pts.
- Value: 25 pts.
- Trade keyword bonus.
- Freshness decay.

Problem:

- Scores can exceed 100 before clamp, making reasons misleading.
- Proximity is partly random when exact coordinates are missing.
- DirectorySignal can win because it has strong fabricated contact/value/urgency.
- Public tenders with bad trade fit can still score high because source confidence and value carry them.

Implementation target:

1. Add hard gates before score:
   - valid trade fit
   - allowed source class
   - real source URL or structured internal fallback flag
   - local/proximity fit
2. Replace random `distanceMiles` in `leadEngine/scan.ts` with deterministic distance:
   - use postcode lat/lon if available.
   - otherwise return null and do not radius-filter by fake distance.
3. Add `qualityBand`:
   - GOLD: real source, local, trade matched, actionable contact/source route, value/urgency present.
   - SILVER: real source, trade matched, missing one action field.
   - WATCH: useful signal but needs enrichment.
   - BIN: do not deliver.
4. GOLD WhatsApp should require real source, not DirectorySignal.
5. Store score version on every lead for regression tracking.

## Storage / Delivery Gap

Current:

- `/api/leads/scan` returns leads.
- `/api/leads/search` creates redacted preview.
- `/api/leads/notify` sends an ad hoc WhatsApp message from caller-provided `leadData`.
- Firestore is used for waitlist, not lead storage.

Problem:

- No durable scan records.
- No source run telemetry.
- No dedupe across days.
- No lead lifecycle for paid users.
- WhatsApp delivery is not attached to stored scored leads.

Implementation target:

Collections:

- `sourceRuns/{runId}`
- `leads/{leadId}`
- `leadDeliveries/{deliveryId}`
- `userLeadRules/{userId}`
- `leadOutcomes/{outcomeId}`

Required fields for `leads`:

- fixed lead schema fields.
- `score`
- `qualityBand`
- `scoreVersion`
- `sourceClass`
- `sourceRunId`
- `dedupeKey`
- `firstSeenAt`
- `lastSeenAt`
- `deliveryEligible`

WhatsApp flow:

`scheduled scan -> store scored leads -> select GOLD per user -> create delivery record -> send Twilio WhatsApp -> mark delivered/failed -> outcome tracking`

Do not let frontend call notify with arbitrary lead data.

## Concrete Priority Order

### P0 - Stop Paid Quality Leaks

Files:

- `leadEngine/scan.ts`
- `leadEngine/scorer.ts`
- `leadEngine/fetchers/directorySignalFetcher.ts`
- matching `functions/leadEngine/*`

Targets:

- Add `sourceClass`.
- Exclude `DirectorySignal` from GOLD and paid WhatsApp delivery.
- Remove random distance from radius filtering.
- Add hard gate against generic/non-trade public tenders.

### P1 - Make Planning Real

Files:

- `leadEngine/fetchers/planningDataFetcher.ts`
- `functions/leadEngine/fetchers/planningDataFetcher.ts`
- `leadEngine/config.ts`

Targets:

- Use recent planning API filters.
- Add pagination.
- Add radius polygon or local authority geometry.
- Add launch-region local planning adapters for official feeds.

### P2 - Make EPC Monetisable

Files:

- `leadEngine/fetchers/epcFetcher.ts`
- `functions/leadEngine/fetchers/epcFetcher.ts`
- `.env.example`

Targets:

- Use `energy-band=f/g`.
- Implement search-after.
- Score recommendations and expiry.
- Stop flat value estimate.

### P3 - Store Before Deliver

Files:

- `functions/index.ts`
- add `functions/leadEngine/store.ts`
- add `functions/leadEngine/delivery.ts`
- Firestore rules/indexes as needed.

Targets:

- Store source run telemetry.
- Store scored leads.
- Dedupe across source runs.
- Send WhatsApp only from stored eligible leads.

### P4 - Convert Source Diagnostics Into Operator Dashboard Later

Do not prioritise UI yet.

Only after P0-P3:

- Show source health.
- Show paid lead quota.
- Show delivered/won/lost outcomes.

## Dataset Recommendations

Best immediate sources for money-making construction leads:

1. Local planning portals with official feeds/API where available.
2. EPC domestic API for F/G retrofit clusters.
3. Contracts Finder/FTS/PCS filtered down to small works, housing, schools, maintenance, and local authority frameworks only.
4. Land Registry monthly Price Paid Data as renovation-likelihood enrichment.
5. Companies House advanced search as commercial fit-out enrichment.
6. HMO/licensing registers where councils expose official datasets.
7. Building control registers if official/public API or open data exists.

Avoid for now:

- Unrestricted scraping of planning portals.
- Generic directory/listing leads.
- Demo sources in paid output.
- Billion-pound frameworks for solo tradesmen.
- Any source that cannot produce a source URL, date, location, and action route.

## Final Architecture Target

Lead quality rule:

No lead reaches WhatsApp unless it has:

- fixed schema,
- real source or clearly marked internal fallback,
- trade fit,
- local/proximity fit,
- value signal,
- urgency/freshness signal,
- source URL or action route,
- score version,
- delivery eligibility flag.

JobFilter should sell `GOLD leads`, not `search results`.


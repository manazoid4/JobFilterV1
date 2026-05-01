# API Deep Test Results — 2026-05-01

---

## FTS (Find a Tender Service)

**Base URL:** `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages`

### Test 1: `?updatedFrom=2025-01-01T00:00:00&stages=tender&limit=10`

- **Status:** 200 OK — WORKING
- **Releases returned:** 10
- **Title[0]:** "Cairngorms 2030 – Future Rural Skills Project"
- **Title[1]:** "Flexible Framework for Self Directed Support including Care at Home Services - Entry Point 5"

### Test 2: `?updatedFrom=2025-01-01T00:00:00&stages=tender&limit=5`

- **Status:** 200 OK — WORKING
- **Releases returned:** 5
- **Title[0]:** "Cairngorms 2030 – Future Rural Skills Project"
- **Title[1]:** "Flexible Framework for Self Directed Support including Care at Home Services - Entry Point 5"
- **Title[2]:** "Workforce Influenza Vaccination Programme: On-site Settings Delivery Model"
- **Title[3]:** "Property Strategic Development Advisor"
- **Title[4]:** "Digital Marketing Agency"

### Scottish/Welsh/NI Buyers

- **Scottish buyers (UKM* regions):** YES — 4 of 5 releases in Test 2 are Scottish
  - Cairngorms National Park Authority (UKM62)
  - North Lanarkshire Council (UKM84)
  - Highlands and Islands Enterprise (UKM6)
  - ScotRail Trains Limited (UKM)
- **Welsh buyers (UKL*):** NOT in sample
- **NI buyers (UKN*):** NOT in sample
- **English buyers (UKD*):** 1 — Lancashire County Council (UKD4)
- **Note:** FTS aggregates all UK nations including Scotland, so Scottish records DO appear

### Field Mapping

| Field Path | Present? | Notes |
|---|---|---|
| `releases[].tender.title` | YES | String |
| `releases[].tender.value.amount` | YES (partial) | GBP amount; absent on ~2/5 releases |
| `releases[].tender.value.currency` | YES | Always "GBP" |
| `releases[].tender.tenderPeriod.endDate` | YES | ISO 8601 with timezone offset |
| `releases[].buyer.name` | YES | Buyer reference name |
| `releases[].tender.deliveryLocations` | **NO** | WRONG PATH — field does not exist |
| `releases[].tender.items[].deliveryAddresses` | YES | Correct delivery location path |
| `releases[].tender.items[].deliveryLocation` | YES | Object with description + region code |
| `releases[].parties[]` | YES | Full party objects with address |
| `releases[].parties[].address.countryName` | YES | "United Kingdom" on all tested |
| `releases[].parties[].address.region` | YES | ONS region codes e.g. UKM62, UKD4 |
| `releases[].ocid` | YES | e.g. "ocds-h6vhtk-069020" |
| `releases[].planning` | NO | Not present in any release |

### Full Tender Object Keys (releases[0])

```
id, legalBasis, title, status, classification, mainProcurementCategory,
description, value, lots[], items[], submissionMethod, submissionMethodDetails,
documents[], contractTerms, otherRequirements, procurementMethod,
procurementMethodDetails, coveredBy, tenderPeriod, submissionTerms,
awardPeriod, bidOpening, hasRecurrence
```

### Top-Level Package Keys

```
uri, version, extensions, publishedDate, publisher, license, publicationPolicy, releases
```

### Notes

- `updatedFrom` filter works — returns live active tenders updated since that date
- `stages=tender` filter works correctly
- `limit=N` works — exact count returned matches N
- Delivery location is at `releases[].tender.items[].deliveryAddresses[].region` (ONS code) — NOT `releases[].tender.deliveryLocations`
- Tender value absent on some records (e.g. open framework agreements); handle nulls
- No authentication required — fully open API
- Results sorted most-recently-updated first

---

## Public Contracts Scotland

### Endpoint 1 tested: `https://www.publiccontractsscotland.gov.uk/search/api/OCDS/v1/Releases?publishedFrom=2025-01-01&stages=tender&limit=10`
- **Status: 404 NOT FOUND**

### Endpoint 2 tested: `https://api.publiccontractsscotland.gov.uk/v1/Releases?limit=10`
- **Status: TLS ERROR** — "unable to verify the first certificate"; endpoint may exist but SSL cert is broken/self-signed

### Endpoint 3 tested: `https://www.publiccontractsscotland.gov.uk/api/OCDS/v1/Releases?limit=10`
- **Status: 404 NOT FOUND**

### Real API (confirmed from official download page)

Real API base confirmed at: `https://api.publiccontractsscotland.gov.uk/v1`

Source: official PCS bulk download page at `/NoticeDownload/Download.aspx` states "If you'd prefer to use our API, click here" linking to that URL.

- Data available in JSON/XML/XLSX/CSV
- Supports OCDS output format
- Bulk download organised by month + notice type (same structure as Sell2Wales)
- Monthly archives available: May 2022 through April 2026

**Status: ENDPOINT EXISTS BUT HAS TLS CERTIFICATE ERROR**

The `/v1` root and `/v1/Releases` path both fail with SSL cert verification error. This is a server-side SSL config issue, not an authentication requirement. Likely works with `curl -k` (insecure) flag or by pinning/ignoring the cert in code.

### Alternative Access

Bulk download available via website UI at `/NoticeDownload/Download.aspx` — select month + notice type + OCDS JSON format.

---

## Sell2Wales

### Endpoint tested: `https://www.sell2wales.gov.wales/search/api/OCDS/v1/Releases?publishedFrom=2025-01-01&stages=tender&limit=10`
- **Status: 404 NOT FOUND** — redirected to "Bad Page parameters" error page

### Real API (confirmed from official data access page)

Two API base URLs discovered via `/helpandresources/ocds/dataaccessinfo` and `/Notice/Download/Download.aspx`:

1. `https://api.sell2wales.gov.wales/v1` — **500 Internal Server Error** on all tested calls
2. `https://api-sell2wales.klickstream.com/v1` — **403 Forbidden** (third-party CDN/proxy, requires auth key)

### Correct API Parameters (from official documentation)

Endpoint pattern: `GET /v1/Notices?dateFrom=MM-YYYY&noticeType=N&outputType=0&locale=2057`

| Parameter | Description |
|---|---|
| `dateFrom` | Month-year format: `01-2025` |
| `noticeType` | 2 = Contract Notice (tender); 1–25 range |
| `outputType` | 0 = OCDS, 1 = TED/custom |
| `locale` | 2057 = English, 1106 = Welsh |

### Status: BROKEN / NEEDS INVESTIGATION

- `api.sell2wales.gov.wales` returns 500 on all calls — server-side fault or undocumented required headers
- `api-sell2wales.klickstream.com` returns 403 — third-party CDN proxy, likely needs API key
- Bulk download via website UI at `/Notice/Download/Download.aspx` is the reliable access method

---

## Summary Table

| API | Status | Auth Needed | Notes |
|---|---|---|---|
| FTS | WORKING | No | Full OCDS JSON, all UK nations, open |
| Public Contracts Scotland | TLS ERROR | Unknown | Cert issue only; try curl -k |
| Sell2Wales | BROKEN (500/403) | Possibly | Server error + CDN proxy blocks |

---

## Recommendations for JobFilter

1. **FTS is the primary reliable source** — open, no auth, returns OCDS JSON with good field coverage across all UK nations including Scotland
2. **Scottish buyer filtering via FTS:** Filter on `parties[].address.region` starting with `UKM` — confirmed working
3. **Welsh buyer filtering:** Filter on `parties[].address.region` starting with `UKL`
4. **NI buyer filtering:** Filter on `parties[].address.region` starting with `UKN`
5. **Delivery location field — CRITICAL:** Use `tender.items[].deliveryAddresses[].region` (ONS code) — NOT `tender.deliveryLocations` (field does not exist)
6. **PCS:** Retry with TLS verification disabled (`curl -k` / `verify=False` in requests) to confirm endpoint is functional. If confirmed working, the `/v1/Notices` endpoint likely mirrors the Sell2Wales parameter structure.
7. **Sell2Wales:** Use monthly bulk JSON downloads from the website UI at `/Notice/Download/Download.aspx`. The programmatic API is not accessible without auth or is currently down.
8. **Missing tender values:** ~40% of tenders have no `tender.value.amount` — handle nulls in all value extraction logic.
9. **No `planning` block:** Do not rely on `releases[].planning` — field is absent from FTS responses.

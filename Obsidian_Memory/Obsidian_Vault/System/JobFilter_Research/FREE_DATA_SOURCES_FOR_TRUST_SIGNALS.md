# Free Data Sources for Trust Signals

## Tier 1: High Trust Value, Low Implementation Difficulty

| Source | Available Data | Access Method | Trust Feature | Difficulty | Value | Legal Basis |
|--------|---------------|---------------|---------------|------------|-------|-------------|
| **Companies House** | Company registration, directors, filing history, SIC codes, dissolved status | REST API (free, API key). 600 req/5min. `api.company-information.service.gov.uk` | Company Verified badge, trading history, fraud prevention | LOW | HIGH | Open Government Licence v3.0 |
| **EPC Register (Domestic)** | Energy ratings (A-G), property type, construction age, floor area, heating type | REST API (free, registration required). `epc.opendatacommunities.org` | EPC rating badge, retrofit trigger, property age context | LOW | HIGH | Open Government Licence v3.0 |
| **Planning.data.gov.uk** | Planning applications, approvals, refusals, appeal decisions, documents | REST API (free, no key). `www.planning.data.gov.uk` | Planning Verified badge, approval timeline, project type | LOW | VERY HIGH | Open Government Licence v3.0 |
| **Land Registry (Price Paid)** | Property sale prices, dates, postcode, property type | REST API (free, no key for price paid). `landregistry.data.gov.uk` | Ownership Confidence, Recent Purchase badge, price context | LOW | HIGH | Open Government Licence v3.0 |

---

## Tier 2: High Trust Value, Medium Implementation Difficulty

| Source | Available Data | Access Method | Trust Feature | Difficulty | Value | Legal Basis |
|--------|---------------|---------------|---------------|------------|-------|-------------|
| **Contracts Finder** | UK government and council contracts, tenders, awards, contract values | REST API (free, no key). `www.contractsfinder.service.gov.uk` | Tender Verified badge, council work alerts, contract size | MEDIUM | HIGH | Open Government Licence v3.0 |
| **Find a Tender** | High-value public sector tenders (£ threshold) | REST API (free). `www.find-tender.service.gov.uk` | Large Contract Alert, public sector opportunity | MEDIUM | HIGH | Open Government Licence v3.0 |
| **Building Control** | Notices, approvals, inspections | Varies by local authority. Some APIs, some email lists. | Site Movement badge, active project signal | MEDIUM | HIGH | Local authority OGL |
| **HMO Licensing** | Licence applications, renewals, enforcement | Varies by council. Some publish registers. | Compliance Work badge, landlord activity | MEDIUM | MEDIUM | Local authority OGL |

---

## Tier 3: Medium Trust Value, Medium Implementation Difficulty

| Source | Available Data | Access Method | Trust Feature | Difficulty | Value | Legal Basis |
|--------|---------------|---------------|---------------|------------|-------|-------------|
| **Retrofit Schemes (GBIS, ECO4)** | Grant approvals, installer registrations, postcode eligibility | Ofgem/DLUHC data portals (free) | Funded Upgrade badge, grant deadline alert | MEDIUM | MEDIUM | Open Government Licence |
| **Insolvency Notices** | Company insolvencies, administrations, liquidations | The Gazette API (free) + Insolvency Service | Urgent Takeover badge, premises vacancy signal | MEDIUM | MEDIUM | Open Government Licence |
| **Auction Listings** | Property auction results, prices, dates | Aggregator APIs or RSS feeds (varies) | Fast Turnaround badge, refurb opportunity | MEDIUM | MEDIUM | Varies by source |
| **Empty Homes** | Council empty property registers | Local authority data (varies) | Vacancy Signal, potential refurb | MEDIUM | LOW | Local authority OGL |

---

## Tier 4: Lower Priority / Higher Difficulty

| Source | Available Data | Access Method | Trust Feature | Difficulty | Value | Legal Basis |
|--------|---------------|---------------|---------------|------------|-------|-------------|
| **Flood Risk (Environment Agency)** | Flood zones, historical flood data | REST API (free, no key) | Risk indicator for groundworks | MEDIUM | LOW | Open Government Licence |
| **Conservation Zones** | Listed building status, conservation areas | Planning.data.gov.uk or local APIs | Restricted Work badge, specialist opportunity | MEDIUM | LOW | Open Government Licence |
| **Streetworks Notices** | Road works, utility digs, permits | Street Works API (some free) | Infrastructure Work alert | HIGH | LOW | Varies |
| **Scottish Warrants** | Building warrants (Scotland) | Scottish local authorities | Planning equivalent for Scotland | HIGH | LOW | Local authority |

---

## Implementation Roadmap

### Phase 1 (Week 1-2)
- Planning.data.gov.uk integration
- EPC register lookup
- Land Registry price paid
- Companies House verification

### Phase 2 (Week 3-4)
- Contracts Finder alerts
- Building control notices (pilot: Birmingham)
- HMO licensing (pilot: 5 councils)

### Phase 3 (Month 2)
- Retrofit scheme feeds
- Insolvency notices
- Auction listings (pilot region)

### Phase 4 (Month 3+)
- Full UK council coverage for building control
- Flood risk overlay
- Conservation zone flags

---

## Trust Feature Examples

### Example 1: Planning Verified
**Data:** Planning application approved yesterday in B17 for a rear extension.
**Badge:** "Planning Verified — Approved 18 hours ago"
**Trust Impact:** Homeowner has invested time and money. Serious buyer.

### Example 2: EPC Retrofit Trigger
**Data:** EPC rating F in a rental property.
**Badge:** "Retrofit Trigger — Legal upgrade required"
**Trust Impact:** Landlord is legally obligated to act. High urgency.

### Example 3: Fresh Purchase
**Data:** Land Registry shows sale completed 12 days ago.
**Badge:** "Fresh Purchase — New owner, likely renovation"
**Trust Impact:** New owner = high probability of work. First-mover advantage.

### Example 4: Company Verified
**Data:** Companies House shows new restaurant registration.
**Badge:** "Company Verified — New business, needs fit-out"
**Trust Impact:** Commercial work with defined budget and timeline.

---

## Legal Compliance Checklist

- [ ] All data used under Open Government Licence v3.0
- [ ] No scraping of private data
- [ ] No exposure of individual names or addresses
- [ ] Postcode-level granularity maximum
- [ ] Clear attribution on data source pages
- [ ] Regular audit of source terms

---

## Cost Analysis

| Phase | Sources | Estimated Dev Cost | Monthly Running Cost |
|-------|---------|-------------------|---------------------|
| Phase 1 | 4 sources | £3,000-5,000 | £0 (all free) |
| Phase 2 | +3 sources | £2,000-4,000 | £0-100 (some local APIs) |
| Phase 3 | +3 sources | £2,000-3,000 | £0-200 |
| Phase 4 | +4 sources | £3,000-5,000 | £0-300 |

**Total to full coverage: £10,000-17,000 development, £0-600/month running.**

This is the moat. Competitors cannot replicate this without equivalent engineering investment.

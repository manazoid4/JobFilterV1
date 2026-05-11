# JobFilter Data Moat: Landlord Database

## Date: 2026-05-11
## Status: IDEA / TODO

---

## The Opportunity

JobFilter's core advantage is early signal detection (planning, EPC, permits). But signals need a delivery target. The most valuable delivery target for maintenance and retrofit work is **landlords and property managers** — not just trades.

A landlord data moat would:
1. **Increase lead value**: Know which properties are rented, who owns them, and their maintenance history
2. **Enable proactive outreach**: Contact landlords before tenants report problems
3. **Create a two-sided market**: Trades get leads, landlords get proactive maintenance
4. **Build defensibility**: Competitors can copy signal detection, but not the landlord relationships

---

## Data Sources to Build the Moat

### Public Records
- **HM Land Registry**: Title deeds, ownership history, price paid
- **Council tax records**: Identify rented properties (multiple occupancy, HMOs)
- **Companies House**: Property company registrations, director addresses
- **Planning applications**: Developer/owner names on applications
- **Licensing registers**: HMO licences, selective licensing schemes

### Commercial Data
- **Letting agent websites**: Rental listings with agent names
- **Property portals**: Rightmove, Zoopla rental history
- **Auction results**: Property investor buyers
- **Build-to-rent developments**: Major institutional landlords

### Inferred Signals
- **Properties with recent EPC F/G**: Likely rental (landlords must comply by 2028)
- **Properties with frequent planning applications**: Developer-owned
- **Properties with recent ownership change**: New landlord = new maintenance spend
- **Postcodes with high rental density**: Student areas, city centres

---

## Implementation Phases

### Phase 1: Scrape & Enrich (Week 1-2)
- Build scraper for council licensing registers (HMO, selective licensing)
- Cross-reference with Land Registry title data
- Match to planning application submitters
- Output: CSV of landlord names, addresses, property counts by postcode

### Phase 2: Property Graph Linking (Week 3-4)
- Link each landlord record to UPRN in JobFilter graph
- Tag properties as "rental", "owner-occupied", "HMO", "commercial"
- Add landlord contact signals (company email, registered address)

### Phase 3: Proactive Outreach (Month 2)
- When JobFilter detects a signal on a rental property, alert BOTH the trade and the landlord
- Landlord gets: "Your property at [UPRN] has a planning application for extension. Get 3 quotes from local builders."
- Trade gets: "Landlord at [address] likely needs [trade] work. Contact details available."

### Phase 4: Platform Features (Month 3)
- Landlord dashboard: view all their properties, signals, recommended works
- Maintenance scheduling: proactive EPC upgrade reminders, compliance deadlines
- Trade marketplace: landlords post jobs, trades quote (reverse of current model)

---

## Why This Is a Moat

1. **Data compounding**: Every new signal enriches the landlord record
2. **Network effects**: More landlords → more trades → better service → more landlords
3. **Switching costs**: Once landlords use JobFilter for compliance tracking, hard to leave
4. **Regulatory tailwind**: EPC C requirement by 2028, HMO licensing expansion
5. **Competitors lack this**: FixFlo has trades but no landlord intelligence. Belvoir has landlords but no signal layer.

---

## Risks

- **GDPR**: Landlord data is personal/business data. Need lawful basis (legitimate interest for B2B)
- **Data quality**: Land Registry has 3-month lag. Council registers are incomplete.
- **Adoption**: Landlords are slow to adopt new tools. Need clear ROI (compliance, cost savings)
- **Competition**: Once proven, Rightmove/Zoopla could add this

---

## Quick Win

Build a "Landlord Alert" feature:
1. User inputs postcode
2. JobFilter returns: "47 rental properties in LS1-LS10. 12 have F/G EPC ratings. 3 have planning applications."
3. CTA: "Get landlord contact pack for £29"
4. Output: CSV with property addresses, landlord names (where available), signal summary

This tests demand before building full platform.

---

## Related Notes

- [[Competitive Intelligence - Belvoir and FixFlo]] — reactive maintenance apps lack landlord intelligence
- [[Unfair Advantage Stack]] — landlord data is the missing layer in signal fusion
- [[Growth Playbook - Worldwide and UK]] — two-sided market strategy

---

## Next Actions

1. [ ] Research council licensing register APIs (Leicester, Manchester, Birmingham)
2. [ ] Build proof-of-concept scraper for HMO register
3. [ ] Cross-reference with existing JobFilter UPRN graph
4. [ ] Design "Landlord Alert" landing page
5. [ ] Test demand with 5 letting agents in Leicester/Manchester

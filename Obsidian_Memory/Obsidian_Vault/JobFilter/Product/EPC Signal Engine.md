# EPC Signal Engine — Standalone Product

## POSITIONING

**EPC Signal Engine** is JobFilter's standalone product for retrofit-focused tradesmen. It identifies properties that are legally forced to upgrade — F and G rated rentals that cannot be let without energy improvements — and delivers them as qualified leads before any job board sees them.

This is not "EPC data." This is **legally guaranteed demand**.

---

## THE PROBLEM

- 1.2 million UK rental properties are rated F or G
- From 2025, landlords cannot legally let properties below E rating (MEES regulations)
- Landlords MUST upgrade or face £5,000+ fines
- £15bn Warm Homes Plan creates massive urgency
- No platform currently maps these properties to tradesmen who can do the work
- Buildscout, Checkatrade, MyBuilder — none of them see this signal

---

## THE PRODUCT

### What It Does

1. **Scans EPC database** for F/G rated properties in user's postcode area
2. **Matches to trade** — electrical (EICR, rewires, EV chargers), plumbing (boilers, heating controls), HVAC (heat pumps), building (insulation), roofing (roof insulation, solar prep)
3. **Scores each property** — current rating, potential rating, property type, location value
4. **Delivers via WhatsApp** — Gold signals fire within minutes
5. **Letterhead Pack** — sends professional intro letter to property address on user's behalf

### How It's Different from JobFilter Core

| | JobFilter Core | EPC Signal Engine |
|--|----------------|-------------------|
| Signals | 5 (planning, contracts, EPC, land registry, companies house) | 1 (EPC only) |
| Audience | All trades | Retrofit-focused trades |
| Lead type | Commercial + residential | Residential only |
| Trigger | Planning approval, tender, property sale, business registration | Legal retrofit requirement |
| Urgency | Variable | Forced by law |

---

## PRICING

### Standalone EPC Signal Engine: £19/month

- Unlimited EPC scans
- F/G rated property alerts
- WhatsApp delivery
- Trade-specific matching
- Letterhead Pack (10 letters/month)
- Property address + owner signal
- No contracts

### Bundled with JobFilter Pro: Included

- Existing Pro (£49/mo) and Founding 30 (£29/mo) users get EPC Signal Engine at no extra cost
- This makes the bundle feel like an unfair deal

### Why £19?

- Below BuildAlert's £2/letter model (10 letters = £20)
- Below Planning Pipe's £44.95/mo
- Accessible to individual tradesmen
- Creates a low-barrier entry point to upsell to full JobFilter Pro

---

## FEATURE SPEC

### Core Features (v1)

- **Postcode scan**: Enter postcode + radius, get F/G rated properties
- **Trade matching**: Filter by trade relevance (electrical → EICR/rewires/solar, plumbing → boilers/heating, HVAC → heat pumps, building → insulation, roofing → roof insulation)
- **Score banding**: GOLD (F-rated, high-value area), SILVER (G-rated or medium area), BIN (E-rated or low-value)
- **WhatsApp alerts**: Gold signals fire to user's WhatsApp within minutes
- **Property detail**: Address, current rating, potential rating, certificate date, upgrade recommendations
- **Letterhead Pack**: Pre-written intro letter posted to property address

### Enhanced Features (v2)

- **Expiry tracking**: Flag properties with expiring EPC certificates (landlords must renew)
- **Upgrade recommendation engine**: Auto-suggest specific works based on EPC report recommendations
- **Landlord signal**: Cross-reference with Land Registry to identify buy-to-let properties vs owner-occupied
- **Bulk letter campaigns**: Send intro letters to 50+ F/G properties in one click
- **Vicinity integration**: Auto-create targeted ad campaigns for F/G postcode clusters

### Premium Features (v3)

- **Solar potential overlay**: Map F/G properties with high solar potential (roof aspect, shading)
- **Heat pump readiness**: Score properties for heat pump suitability (insulation level, space, radiators)
- **Grant matching**: Flag properties eligible for ECO4, Boiler Upgrade Scheme, or local authority grants
- **Portfolio detection**: Identify landlords with multiple F/G properties (bigger opportunity)

---

## TRADE-SPECIFIC SIGNALS

### Electricians
- EICR remedials (C1/C2 findings = guaranteed work)
- Rewire opportunities (old wiring flagged in EPC)
- EV charger installs (F/G properties often lack modern electrical)
- Solar panel pre-wiring
- Consumer unit upgrades

### Plumbers
- Boiler replacements (old inefficient boilers = low EPC score)
- Heating control upgrades (smart thermostats, TRVs)
- Cylinder upgrades (uninsulated hot water tanks)
- Underfloor heating installs

### HVAC
- Heat pump installs (primary EPC upgrade recommendation)
- Mechanical ventilation (MVHR systems)
- Commercial efficiency upgrades

### Builders
- Cavity wall insulation
- Solid wall insulation (internal/external)
- Floor insulation
- Loft insulation upgrades
- Retrofit enabling works

### Roofers
- Roof insulation upgrades
- Solar panel preparation
- Weatherproofing tied to insulation work
- Flat roof insulation

---

## COMPETITIVE MOAT

### Why Nobody Else Has This

1. **EPC API complexity**: The API migration (May 2026) requires new auth, new endpoints. Most competitors haven't migrated.
2. **Trade-matching logic**: Raw EPC data is useless without trade-specific filtering. "Rating F" means different things to an electrician vs a roofer.
3. **Legal urgency**: This is the only signal where the homeowner is FORCED to act. Planning applications can be withdrawn. Tenders can be cancelled. EPC retrofit is law.
4. **Letterhead delivery**: Sending physical letters to property addresses is a moat. Digital-only competitors can't do this.

### Defensibility

- EPC data is public, but the **scoring + trade-matching + delivery pipeline** is proprietary
- Letterhead Pack creates physical touchpoint competitors can't replicate digitally
- WhatsApp delivery creates habit loop — once tradesmen get used to Gold alerts, they won't go back to checking dashboards

---

## MESSAGING

### Headline
**PROPERTIES THAT CAN'T BE RENTED WITHOUT YOUR WORK.**

### Sub
1.2 million UK rentals are legally forced to upgrade. JobFilter finds them before they post anywhere. First trade to call wins.

### Proof Points
- 1.2 million UK rentals below E rating
- £5,000+ fines for non-compliance
- £15bn Warm Homes Plan funding available
- Landlords MUST upgrade — it's not optional
- No other platform maps these to tradesmen

### CTA
**SCAN MY AREA FOR EPC LEADS — FREE**

---

## IMPLEMENTATION PRIORITY

### Phase 1: Foundation (Week 1-2)
- Update epcFetcher.ts for new service.gov.uk API
- Add EPC-specific scoring weights to scorer.ts
- Build EPC Signal Engine landing page
- Add EPC Signal Engine to pricing page
- Update Product Index with EPC Signal Engine link

### Phase 2: Delivery (Week 3-4)
- WhatsApp alert flow for EPC Gold signals
- Letterhead Pack integration for EPC leads
- Trade-specific filtering UI
- EPC Signal Card component for lead display

### Phase 3: Enhancement (Week 5-6)
- Expiry tracking
- Upgrade recommendation engine
- Bulk letter campaigns
- Vicinity auto-campaign integration

---

## REVENUE PROJECTION

| Metric | Conservative | Target |
|--------|-------------|--------|
| EPC-only subscribers | 50 | 200 |
| Monthly revenue | £950 | £3,800 |
| Upsell to Pro | 20% | 35% |
| Additional Pro revenue | £490 | £2,450 |

**Total potential**: £1,440-£6,250/month from EPC Signal Engine alone.

---

*Created: 8th May 2026*
*Updated: 8th May 2026*
*Status: Spec — ready for build*

# Trade Expansion Plan
*Created: 2026-05-27 | Status: Draft | Owner: Product*

## Core principle
The lead intelligence engine does not change. What changes per trade is:
1. **Which signal sources are weighted** — configured at onboarding ("what's your trade?")
2. **Which add-ons are offered** — trade-specific, optional, pay-per-use

A fibre installer and a builder both get: one trade · one patch · scored leads · WhatsApp delivery. The signals and add-ons differ. The product does not.

---

## What stays the same across ALL trades
- £39/mo founder price → territory lock → scored leads → WhatsApp delivery
- One trade per postcode cluster — no shared leads
- 30-day money-back guarantee
- Free scan (no card) as entry point
- Score 0–100; GOLD (80+) hits WhatsApp

## What varies per trade
| Element | How it varies |
|---------|--------------|
| Signal weighting | Set at onboarding by trade selection |
| Lead score formula | Slight tuning per trade (EPC weight high for energy trades; tender weight high for commercial) |
| Add-on menu | Only trade-relevant add-ons shown |
| Territory naming | "B12 Roofing" vs "Birmingham FTTP Zone 3" |
| WhatsApp lead format | Template varies per trade type |

---

## Tier 1 — Core (live)
| Trade | Primary signals | Add-ons |
|-------|----------------|---------|
| Builder | Planning approvals, extensions, new builds | Vantage (bid decks), Vicinity (local ads) |
| Plumber | EPC retrofits, extensions, boiler swaps | Codex (spec→sales) |
| Electrician | Commercial planning, new builds, EWI schemes | Vantage |
| Roofer | Planning, property age clusters | Vicinity |
| Heat pump installer | EPC F/G clusters, ASHP planning reqs | Codex |

---

## Tier 2 — Natural extensions
*Same signal sources. High volume. Low build cost.*

### Solar PV installer
- **Signals:** EPC C-band upgrades, new estate planning, south-facing roofs in planning data
- **Add-on: Roof Intel** — pull orientation + size estimates from planning drawings for pre-quote
- **Add-on: DNO Brief** — pre-filled grid connection application template per Distribution Network Operator area

### EV charger installer
- **Signals:** New build planning (Part S compliance), commercial planning, housing density
- **Add-on: OZEV Grant Pack** — pre-written customer eligibility letters and OZEV grant application guidance

### Gas engineer (Gas Safe)
- **Signals:** EPC F/G boiler replacements, property transaction density, age-of-install clusters
- **Add-on: Gas Safe Notice Kit** — CP12, warning notices, RIDDOR report templates per job type

### Plasterer / Renderer
- **Signals:** Extension and new-build planning, EWI (external wall insulation) schemes
- **Add-on: Quote Scope Builder** — spec sheet and scope of works template by job type

### Decorator / Painter
- **Signals:** Planning approvals, property transactions, new build completions
- **Add-on: Client Pack** — colour consultation brief + scope template, customer-facing estimate format

### Groundworker
- **Signals:** Brownfield planning, drainage applications, new estate approvals
- **Add-on: SWMP Template** — Site Waste Management Plan, pre-filled by project type and region

### HVAC / Air conditioning engineer
- **Signals:** Commercial planning (Part L triggers), office conversions, school refurbs, data centre planning
- **Add-on: O&M Builder** — operations & maintenance manual generator
- **Add-on: F-Gas Log** — refrigerant handling record template kit (F-Gas Regulation compliance)

---

## Tier 3 — Professional trades
*Higher deal values. Longer sales cycles. Different add-on needs. May justify £79/mo Pro tier.*

### Structural engineer
- **Signals:** Planning applications requiring calcs — loft conversions, knocked walls, extensions, basements, underpinning
- **Add-on: Calc Pack** — standard structural note templates by project type (party wall, loft, extension beam, RSJ spec)
- **Add-on: PI Scope Template** — scope of works + limitations of liability letter per engagement type
- *Price note: average structural engineer engagement £500–£2,000. £39/mo is trivial. Pro tier (£79) viable.*

### Quantity surveyor / Cost consultant
- **Signals:** Commercial tenders, large residential planning, public sector framework alerts
- **Add-on: Prelims Pack** — preliminary cost sheet templates by project category (residential, commercial, fit-out)
- **Add-on: NRM Kit** — RICS-aligned cost plan skeleton (NRM1 feasibility / NRM2 detailed)

### Fire safety engineer / installer
- **Signals:** Commercial planning, HMO licensing applications, change-of-use planning, school and care sector refurbs
- **Add-on: FRA Template** — fire risk assessment builder with Responsible Person appointment letter
- **Add-on: Compliance Brief** — Article 19 notice, enforcement letter response templates, PAS 9980 scope note
- *Signal note: HMO licensing register is council-held — need API or scrape per council. Roadmap item.*

### Asbestos surveyor / removal contractor
- **Signals:** Pre-1985 building work in planning applications, demolition notices, industrial refurbs
- **Add-on: ACM Report Pack** — management survey, R&D specification, duty holder notification letter templates
- **Add-on: Waste Consignment Kit** — consignment note pack pre-filled by waste type (CAR 2012 compliant)

### Scaffolding contractor
- **Signals:** Any large planning approval — scaffolders follow the build, not the client
- **Add-on: NASC Handover Pack** — scaffold handover cert, TG20 compliance note, weekly inspection register (NASC TG20:21)

### Damp proofer / Waterproofer
- **Signals:** Pre-war property clusters, flood zone planning, basement conversion applications
- **Add-on: Guarantee Letter Kit** — 10/20-year guarantee certificates by treatment type (rising damp, penetrating damp, basement tanking)

---

## Tier 4 — Infrastructure / Utilities
*New signal sources required. Different buyer (often commercial B2B). Needs roadmap investment.*

### Fibre / FTTP installer
- **Signals:** OFCOM connected nations rollout zones, planning applications for multi-unit developments, street works permits (Section 50 / Elgin data)
- **Add-on: Wayleave Pack** — wayleave agreement and permission letter templates for property owners and freeholders
- **Add-on: Survey Report Kit** — site survey summary, duct route sketch sheet, joint box schedule
- *Signal note: OFCOM rollout data + Openreach planning portal integration needed. Roadmap.*
- *Buyer note: often commercial (alt-net companies, ISPs) not sole traders — pricing model may differ*

### CCTV / Security installer
- **Signals:** Commercial planning, HMO applications, licensed premises applications (alcohol licensing = CCTV requirement)
- **Add-on: Risk Assessment + DPIA** — GDPR-compliant CCTV system data protection impact assessment template
- **Add-on: Handover Pack** — system operation guide template, camera placement diagram, maintenance log

### Smart home / Home automation
- **Signals:** High-value extensions (£200k+ planning estimate), new build planning, commercial fit-outs
- **Add-on: Client Spec Sheet** — scope of works template, room-by-room integration checklist, lighting scene brief

### Telecoms / Data cabling
- **Signals:** Commercial planning, office fit-outs, school/healthcare refurbs, new build estates
- **Add-on: Structured Cabling Spec** — cable schedule template, CAT6/fibre layout sheet, test report cover

---

## What NOT to do
- Do not create separate products or brands per trade — one JobFilter, many profiles
- Do not show unrelated add-ons to each trade (a fibre installer doesn't need a bid deck)
- Do not change the core pricing model per trade yet — keep simple until volume proves the segments
- Do not expand to Tier 4 before Tier 2 is live — signal infrastructure investment is real

---

## Expansion sequence (recommended)
1. **Tier 2** — Solar, EV, Gas, Decorators, Groundworkers (same signals, low build cost)
2. **Tier 3** — Structural engineers, QS (high deal value, prove Pro tier pricing)
3. **Tier 3** — Fire safety, Asbestos (specialist compliance add-ons = strong differentiation)
4. **Tier 4** — Fibre, CCTV (after new signal sources validated on roadmap)

---

## Landing page structure per trade
Each trade gets: `/trade/[trade-slug]`
- Exists: builders, plumbers, electricians, roofers, heat-pump-installers
- To build: solar-pv, ev-charger, gas-engineers, plasterers, decorators, groundworkers, hvac, structural-engineers, quantity-surveyors, fire-safety, asbestos, scaffolders, damp-proofers, fibre-installers, cctv-security

Each page follows the same template: hero (trade-specific headline) → lead examples → signal fit → territory availability → CTA.

---

## Related notes
- [[Intake Engine]] — core product
- [[Vantage]] — bid deck add-on (already live)
- [[Vicinity]] — local ads add-on (already live)
- [[Codex]] — spec-to-sales add-on (already live)
- [[Pricing]] — current pricing tiers
- [[Feature Roadmap - 8th May 2026]] — development priorities
- [[EPC Signal Engine]] — energy signal detail
- [[Data Sources]] — current signal sources

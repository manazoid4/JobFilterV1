# Construction Signal Framework

## What Is a Signal?

A **signal** is an official data event that indicates construction work is likely.

Not a guess. Not a scrape. An **official record** from a government or public register.

---

## The Ten Signals

### 1. Planning Approved
**Source:** planning.data.gov.uk
**Trigger:** Planning application approved.
**Trades:** Building, Electrical, Plumbing, HVAC, Roofing, Carpentry, Landscaping, Painting
**Timing:** BEFORE the call. Homeowner hasn't chosen a builder yet.
**Trust Value:** Very High. Homeowner has invested time and money.

### 2. Council Contract
**Source:** Contracts Finder / Find a Tender
**Trigger:** Live tender for council work.
**Trades:** Building, Electrical, Plumbing, HVAC, Landscaping
**Timing:** BEFORE closing date. Budget is defined.
**Trust Value:** High. Public sector = reliable payment.

### 3. EPC Upgrade Trigger
**Source:** EPC register
**Trigger:** F or G rating in rental property.
**Trades:** Electrical, Plumbing, HVAC, Building, Roofing
**Timing:** LEGAL DEADLINE. Landlord must act.
**Trust Value:** Very High. Legal obligation creates urgency.

### 4. Fresh Purchase
**Source:** Land Registry
**Trigger:** Property sold within last 30 days.
**Trades:** Building, Electrical, Plumbing, HVAC, Roofing, Carpentry, Landscaping, Painting
**Timing:** BEFORE renovation search. New owner hasn't called anyone.
**Trust Value:** High. New owners renovate within 12 months.

### 5. New Business
**Source:** Companies House
**Trigger:** New company registration in trade-relevant sector.
**Trades:** Building, Electrical, Plumbing, Carpentry
**Timing:** BEFORE fit-out. Business needs premises work.
**Trust Value:** High. Commercial work with defined budget.

### 6. HMO Compliance
**Source:** Local authority HMO registers
**Trigger:** Licence application or renewal.
**Trades:** Electrical, Plumbing, Building, Carpentry, Painting
**Timing:** BEFORE compliance deadline.
**Trust Value:** High. Landlord legally required to complete work.

### 7. Site Movement
**Source:** Building control notices
**Trigger:** Notice filed = work past planning and moving to site.
**Trades:** Building, Roofing, Electrical, Plumbing, Carpentry
**Timing:** ACTIVE SITE. Work is happening now.
**Trust Value:** Very High. Immediate need for trades.

### 8. Auction Win
**Source:** Auction listings
**Trigger:** Property sold at auction.
**Trades:** Building, Electrical, Plumbing, Roofing, Painting, Carpentry
**Timing:** FAST TURNAROUND. New owner has resale/rental deadline.
**Trust Value:** High. Auction buyers often refurb quickly.

### 9. Urgent Takeover
**Source:** Insolvency notices / void property data
**Trigger:** Business distress or empty premises.
**Trades:** Building, Electrical, Plumbing, Security, Carpentry
**Timing:** URGENT. Make-safe and refit needed.
**Trust Value:** Medium. Budget may be constrained.

### 10. Funded Upgrade
**Source:** Ofgem / DLUHC retrofit schemes
**Trigger:** Grant window open or approval.
**Trades:** Insulation, HVAC, Electrical, Roofing, Building
**Timing:** GRANT DEADLINE. Funded work with expiry.
**Trust Value:** High. Money is allocated.

---

## Signal Fusion

### What Is Fusion?
Combining multiple signals for the same property to increase confidence.

### Example Fusion Stack

**Homeowner Retrofit:**
- Planning application + EPC F/G + affluent postcode + detached + recent sale
= High-confidence retrofit lead.

**Active Site:**
- Planning approval + building control + scaffold permit + skip permit
= Work is happening now. Immediate need.

**Commercial Fit-Out:**
- New company + planning + licensing application
= Premises work with commercial budget.

---

## Signal Lifecycle

```
Signal Detected → Scored → Enriched → Territoried → Delivered → Actioned → Tracked
```

| Stage | Time | What Happens |
|-------|------|--------------|
| Detected | T+0 | Data source flags activity |
| Scored | T+1 min | Algorithm assigns score |
| Enriched | T+5 min | Property context added |
| Territoried | T+10 min | Matched to locked postcode |
| Delivered | T+15 min | WhatsApp alert sent |
| Actioned | T+1-48 hrs | Tradesman calls/quotes |
| Tracked | Ongoing | Outcome recorded |

**Target: Gold signals delivered within 15 minutes of detection.**

---

## Signal Priority

| Priority | Signal Type | Delivery Channel | Response Window |
|----------|-------------|------------------|-----------------|
| P0 | Site Movement | WhatsApp + SMS | Immediate |
| P1 | Planning Approved | WhatsApp | Within 2 hours |
| P2 | Fresh Purchase | WhatsApp | Within 6 hours |
| P3 | EPC Trigger | WhatsApp | Within 24 hours |
| P4 | Council Contract | Email + WhatsApp | Within 48 hours |
| P5 | New Business | Weekly digest | Within 1 week |
| P6 | HMO / Building Control | Weekly digest | Within 1 week |
| P7 | Auction / Insolvency | Weekly digest | Within 1 week |
| P8 | Retrofit Grants | Weekly digest | Within 2 weeks |

---

## Signal Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Detection speed | < 24 hours | Time from source update to detection |
| Scoring accuracy | > 80% | % of GOLD leads that convert |
| Delivery speed | < 15 min | Time from detection to WhatsApp |
| False positive rate | < 10% | % of leads with no homeowner response |
| Signal freshness | < 48 hrs | % of signals detected within 48 hours |

---

## Implementation

### Phase 1: Core Signals (Week 1-2)
- Planning approvals
- EPC triggers
- Recent sales

### Phase 2: Expansion Signals (Week 3-4)
- Council contracts
- New businesses
- Building control

### Phase 3: Advanced Signals (Month 2)
- HMO licensing
- Auction results
- Retrofit grants

### Phase 4: Full Coverage (Month 3)
- Insolvency notices
- Streetworks
- Conservation zones

---

## Key Insight

> A signal is only valuable if it reaches the right trade,
> in the right territory,
> before anyone else knows the job exists.
> 
> Speed + exclusivity + scoring = the JobFilter difference.

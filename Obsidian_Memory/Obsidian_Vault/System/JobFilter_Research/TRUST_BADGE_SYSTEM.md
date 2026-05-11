# Trust Badge System

## Design Principles

1. **One glance = one decision.** A tradesman should know whether to chase a lead in under 3 seconds.
2. **Colour is meaning.** Yellow = opportunity. Green = verified. Orange = caution. Red = risk.
3. **No jargon.** "Planning Verified" not "Planning Application Status: Active."
4. **Evidence, not claims.** Every badge must tie to a data source.

---

## Badge Specifications

### 1. Planning Verified
- **Meaning:** Planning application exists and is active or recently approved.
- **Logic:** `planningStatus === 'active' || approvalDate < 30 days`
- **Data:** planning.data.gov.uk
- **UI:** Green badge with checkmark. Text: "Planning Verified"
- **Trust Impact:** Homeowner has invested time/money. High seriousness.
- **Implementation:** LOW

### 2. Recently Approved
- **Meaning:** Planning approval within last 30 days.
- **Logic:** `approvalDate && daysSince(approvalDate) <= 30`
- **Data:** planning.data.gov.uk
- **UI:** Yellow badge. Text: "Approved {N} days ago"
- **Trust Impact:** Fresh signal = first-mover advantage.
- **Implementation:** LOW

### 3. Ownership Confidence
- **Meaning:** Property sale registered within last 90 days.
- **Logic:** `landRegistrySaleDate && daysSince(saleDate) <= 90`
- **Data:** Land Registry Price Paid
- **UI:** Green badge. Text: "New Owner — {N} days ago"
- **Trust Impact:** New owner = high renovation probability.
- **Implementation:** LOW

### 4. Lead Freshness
- **Meaning:** Signal detected within last 48 hours.
- **Logic:** `signalDetectedAt && hoursSince(signalDetectedAt) <= 48`
- **Data:** Internal timestamp
- **UI:** Yellow pulse badge. Text: "Fresh — {N} hrs ago"
- **Trust Impact:** Speed = exclusivity. Fresh leads haven't been shopped.
- **Implementation:** VERY LOW

### 5. Serious Buyer Score
- **Meaning:** 0-100 algorithmic score of homeowner intent.
- **Logic:** Weighted combination of planning, EPC, property, and timing signals.
- **Data:** Multi-source fusion
- **UI:** Large score number with colour bar. 90+ = green, 70-89 = yellow, <70 = orange.
- **Trust Impact:** Quantifies what tradesmen currently guess.
- **Implementation:** MEDIUM

### 6. Ghost Risk Score
- **Meaning:** Likelihood of homeowner ghosting after quote.
- **Logic:** Inverse of Serious Buyer Score + historical patterns.
- **Data:** Multi-source + feedback loop
- **UI:** Three-state badge: LOW (green), MEDIUM (yellow), HIGH (red).
- **Trust Impact:** Protects tradesman from wasted visits.
- **Implementation:** MEDIUM

### 7. Not Shared Lead
- **Meaning:** This lead is exclusive to one trade partner.
- **Logic:** `territoryLocked === true && partnerAssigned === true`
- **Data:** Internal flag
- **UI:** Green badge with lock icon. Text: "Exclusive — Not Shared"
- **Trust Impact:** No bidding war. No race to bottom.
- **Implementation:** LOW

### 8. Budget Band
- **Meaning:** Estimated project value range.
- **Logic:** Based on planning type, property size, postcode affluence.
- **Data:** Planning + Land Registry + postcode data
- **UI:** Yellow badge. Text: "£{min}k — £{max}k"
- **Trust Impact:** Tradesman knows if job fits their pricing before calling.
- **Implementation:** MEDIUM

### 9. Retrofit Trigger
- **Meaning:** Property has EPC F/G rating = legal requirement to upgrade.
- **Logic:** `epcRating === 'F' || epcRating === 'G'`
- **Data:** EPC register
- **UI:** Orange badge. Text: "Retrofit Trigger — EPC {rating}"
- **Trust Impact:** Landlord is legally obligated. High urgency.
- **Implementation:** LOW

### 10. Tender Verified
- **Meaning:** Live council or government contract.
- **Logic:** `contractsFinderStatus === 'live' || closingDate > today`
- **Data:** Contracts Finder / Find a Tender
- **UI:** Green badge. Text: "Tender Live — Closes {date}"
- **Trust Impact:** Public sector = defined budget and timeline.
- **Implementation:** MEDIUM

### 11. Local Demand Spike
- **Meaning:** Above-average signal density in postcode.
- **Logic:** `signalsThisWeek > averageSignalsPerWeek * 1.5`
- **Data:** Internal aggregation
- **UI:** Yellow badge with arrow up. Text: "Hot Area — {N} signals this week"
- **Trust Impact:** Market momentum = more jobs nearby.
- **Implementation:** LOW

### 12. Company Verified
- **Meaning:** New company registered near postcode.
- **Logic:** `companiesHouseRegistrationDate <= 90 days && sicCodeMatch === true`
- **Data:** Companies House
- **UI:** Green badge. Text: "New Business — {N} days old"
- **Trust Impact:** Commercial fit-out with budget and deadline.
- **Implementation:** LOW

---

## Badge Display Rules

### On Lead Cards (List View)
Show maximum 3 badges:
1. Lead Freshness (always)
2. Serious Buyer Score (always)
3. Best applicable: Planning Verified / Retrofit Trigger / Tender Verified / Ownership Confidence

### On Lead Detail (Full View)
Show all applicable badges in a grid:
- Top row: Freshness + Score + Ghost Risk
- Middle row: Verification badges (Planning, EPC, Land Registry, Companies House)
- Bottom row: Context badges (Budget, Local Demand, Not Shared)

### Colour System
- **Green (#22C55E):** Verified, safe, go.
- **Yellow (#E3B72A):** Opportunity, attention, fresh.
- **Orange (#C5462A):** Caution, risk, trigger.
- **Red:** High ghost risk, avoid.
- **Black (#080808):** Neutral, informational.

---

## Implementation Priority

| Priority | Badge | Effort | Impact |
|----------|-------|--------|--------|
| P0 | Lead Freshness | 1 hr | High |
| P0 | Not Shared | 1 hr | Very High |
| P1 | Serious Buyer Score | 4 hrs | Very High |
| P1 | Planning Verified | 2 hrs | High |
| P1 | Ghost Risk | 4 hrs | High |
| P2 | Recently Approved | 2 hrs | Medium |
| P2 | Ownership Confidence | 2 hrs | Medium |
| P2 | Budget Band | 4 hrs | Medium |
| P3 | Retrofit Trigger | 2 hrs | Medium |
| P3 | Tender Verified | 3 hrs | Medium |
| P3 | Local Demand Spike | 3 hrs | Low |
| P3 | Company Verified | 2 hrs | Low |

---

## Badge Component Spec

```typescript
interface TrustBadge {
  type: 'planning' | 'freshness' | 'score' | 'ghost' | 'exclusive' | 'budget' | 'retrofit' | 'tender' | 'demand' | 'company';
  value: string | number;
  timestamp?: string;
  tooltip: string;
}

// Example usage
<TrustBadge type="planning" value="Approved 3 days ago" tooltip="Planning application approved on 2026-05-08" />
<TrustBadge type="score" value={94} tooltip="Serious Buyer Score based on planning, property, and timing signals" />
<TrustBadge type="ghost" value="LOW" tooltip="Low ghost risk: planning exists, property recently sold, affluent area" />
```

---

## Psychology Notes

- **Green creates action.** Use green for badges that mean "chase this now."
- **Yellow creates urgency.** Use yellow for "opportunity but verify."
- **Orange creates caution.** Use orange for "proceed with awareness."
- **Numbers beat words.** "94" is more powerful than "High quality."
- **Recency beats quality.** "Approved yesterday" is more powerful than "Good lead."

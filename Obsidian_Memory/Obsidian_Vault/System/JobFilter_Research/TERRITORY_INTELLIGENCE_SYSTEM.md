# Territory Intelligence System

## Philosophy

A tradesman's territory is their livelihood. JobFilter must make them feel like they own it.

> "One trade. One postcode cluster. First call on gold leads."

---

## Territory Score

### Components

| Factor | Weight | Data Source |
|--------|--------|-------------|
| Planning approval rate | 25% | planning.data.gov.uk |
| EPC upgrade density | 20% | EPC register |
| Property transaction volume | 20% | Land Registry |
| Council contract frequency | 15% | Contracts Finder |
| Average project value | 15% | Planning type + postcode |
| Signal freshness | 5% | Internal timestamp |

### Score Interpretation

| Score | Label | Meaning |
|-------|-------|---------|
| 85-100 | HOT TERRITORY | High activity, high value. Lock immediately. |
| 70-84 | WARM TERRITORY | Good activity. Worth watching. |
| 55-69 | STEADY TERRITORY | Moderate activity. Long-term value. |
| 40-54 | COOL TERRITORY | Low activity. Seasonal or emerging. |
| <40 | COLD TERRITORY | Minimal activity. Not recommended. |

---

## Heatmap Data

### Postcode-Level Metrics

For every outward postcode (e.g., B17, M20, SE15):

```typescript
interface TerritoryMetrics {
  postcode: string;
  city: string;
  score: number;
  label: string;
  
  // Planning
  planningApplications: number; // Last 90 days
  planningApprovals: number; // Last 90 days
  avgProjectValue: number;
  
  // EPC
  epcUpgradesNeeded: number; // F/G ratings
  retrofitGrantsActive: boolean;
  
  // Property
  recentSales: number; // Last 90 days
  avgSalePrice: number;
  
  // Contracts
  liveContracts: number;
  totalContractValue: number;
  
  // Activity
  signalsThisWeek: number;
  signalsTrend: 'up' | 'down' | 'flat';
  
  // Exclusivity
  status: 'OPEN' | 'CLAIMED' | 'FOUNDER SLOT' | 'WAITLIST';
  lockedTrade?: string;
}
```

---

## UI Modules

### Territory Card (List View)
```
┌─────────────────────────────────────────┐
│ B17 Harborne, Birmingham                │
│ TERRITORY SCORE: 88 (WARM)              │
│                                         │
│ Planning: 14 approvals (90 days)        │
│ Avg project: £55k                       │
│ EPC upgrades: 23 needed                 │
│ Recent sales: 8                         │
│ Live contracts: 2 (£120k total)         │
│                                         │
│ Signals this week: 11 ↑                 │
│ Status: FOUNDER SLOT OPEN               │
│                                         │
│ [LOCK TERRITORY]                        │
└─────────────────────────────────────────┘
```

### Territory Map (Visual)
- UK map with postcode clusters.
- Colour coding:
  - Yellow: HOT
  - Orange: WARM
  - Grey: STEADY
  - Light grey: COOL
  - Dark grey: LOCKED
- Click cluster for detail.
- Mobile: List view with map thumbnail.

### Territory Comparison
Compare two territories side by side:
```
          B17 Harborne    vs    M20 Didsbury
Score:        88                  79
Planning:     14                  9
EPC:          23                  18
Sales:        8                   5
Contracts:    2                   1
Value:        £55k avg            £42k avg
Status:       OPEN                WAITLIST
```

---

## Landing Page Proof Blocks

### Block 1: Live Territory Activity
"Right now, 14 postcodes are heating up across the UK."

Show 3-5 live territory cards with real numbers.

### Block 2: Exclusivity Proof
"3 territories locked today. 17 founder slots remaining."

Visual lock icons + counter.

### Block 3: City Comparison
"Birmingham vs Manchester: Where's the better work?"

Side-by-side stats.

---

## Scoring Framework

### Weekly Recalculation
Every Monday at 6 AM:
1. Pull fresh data from all sources.
2. Recalculate territory scores.
3. Update trend indicators.
4. Notify tradesmen of changes in their territory.

### Trend Alerts
- "B17 score increased from 82 to 88. More planning approvals detected."
- "M20 score decreased from 79 to 71. Fewer signals this week."

### Seasonal Adjustments
- Roofing territories score higher in autumn (pre-winter).
- HVAC territories score higher in spring/summer.
- Building territories score higher in spring.

---

## Implementation

### Phase 1 (MVP)
- Static territory list (Birmingham, Manchester, Bristol, etc.).
- Manual score updates.
- Simple list view.

### Phase 2
- Automated scoring from planning + EPC.
- Weekly recalculation.
- Trend indicators.

### Phase 3
- Full UK postcode coverage.
- Visual heatmap.
- Seasonal adjustments.
- Trade-specific scoring.

---

## Key Insight

> Territory intelligence is not about showing every job.
> It is about showing the **density and quality** of opportunity.
> 
> A tradesman doesn't want to know there are 100 jobs in Birmingham.
> They want to know there are 14 high-value approvals in B17 this month,
> and no other roofer has locked it yet.

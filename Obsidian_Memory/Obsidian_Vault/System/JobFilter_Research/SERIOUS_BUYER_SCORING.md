# Serious Buyer Scoring

## Philosophy

Every lead gets a score. Not based on gut feel. Based on data.

The Serious Buyer Score answers:
> "How likely is this homeowner to actually go ahead with the work?"

Scale: 0-100

---

## Scoring Formula

### Base Signals (70% of score)

| Signal | Weight | Logic | Data Source |
|--------|--------|-------|-------------|
| Planning exists | 20 pts | Planning application submitted or approved | planning.data.gov.uk |
| Planning approved | +15 pts | Approved within last 30 days | planning.data.gov.uk |
| Drawings uploaded | +10 pts | Documents attached to application | planning.data.gov.uk |
| Building control notice | +10 pts | Notice filed = work moving to site | Local authority |
| Property sold (recent) | +15 pts | Land Registry sale within 90 days | Land Registry |
| EPC rating | +10 pts | F/G = legal obligation to upgrade | EPC register |
| HMO licence activity | +10 pts | Compliance work required | Local authority |
| Council contract live | +15 pts | Tender open, budget defined | Contracts Finder |
| New company registered | +10 pts | Commercial fit-out likely | Companies House |
| Auction win | +10 pts | Refurb/deadline pressure | Auction data |

### Property Context (20% of score)

| Signal | Weight | Logic |
|--------|--------|-------|
| Detached/semi-detached | +10 pts | Higher value, more likely to extend |
| Affluent postcode | +10 pts | Budget availability higher |
| Large floor area | +5 pts | Bigger job, more budget |
| Recent activity cluster | +5 pts | Neighbouring properties also active |

### Timing & Urgency (10% of score)

| Signal | Weight | Logic |
|--------|--------|-------|
| Signal detected < 48 hrs | +5 pts | Fresh = less shopped |
| Seasonal urgency | +3 pts | Weather-dependent work (roofing before winter) |
| Grant deadline | +2 pts | Funded work has hard deadlines |

---

## Score Interpretation

| Score | Label | Action |
|-------|-------|--------|
| 90-100 | GOLD | Call within 24 hours. High probability. |
| 75-89 | SILVER | Call within 48 hours. Good signal. |
| 60-74 | BRONZE | Call within 1 week. Verify intent first. |
| 40-59 | CHECK | Low confidence. Quick call to qualify. |
| 0-39 | SKIP | High ghost risk. Not worth time. |

---

## Example Calculations

### Example 1: Rear Extension, Birmingham
- Planning approved (20 + 15) = 35
- Drawings uploaded (+10) = 45
- Detached property (+10) = 55
- Affluent postcode (+10) = 65
- Fresh signal < 48 hrs (+5) = 70
- **Total: 70 (BRONZE)**

### Example 2: EPC Upgrade, Rental Property
- EPC F rating (+10) = 10
- HMO licence activity (+10) = 20
- Property sold 60 days ago (+15) = 35
- Semi-detached (+8) = 43
- Affluent postcode (+10) = 53
- **Total: 53 (CHECK)**

### Example 3: Council Contract, School
- Council contract live (+15) = 15
- Building control notice (+10) = 25
- Large floor area (+5) = 30
- Fresh signal (+5) = 35
- **Total: 35 (SKIP for small trades, GOLD for commercial contractors)**

**Note:** Context matters. A SKIP for a one-man builder might be GOLD for a commercial contractor.

---

## Score Display

### On Lead Card
```
┌────────────────────┐
│ SERIOUS BUYER      │
│ SCORE              │
│                    │
│        94          │
│    ━━━━━━━━━━      │
│    GOLD LEAD       │
└────────────────────┘
```

### Colour Coding
- 90-100: Green (#22C55E) + gold border
- 75-89: Yellow (#E3B72A)
- 60-74: Orange (#C5462A)
- <60: Grey with warning icon

---

## Evidence Stack

For every score, show the evidence:

```
Score: 94
Why:
  ✓ Planning approved 3 days ago
  ✓ Detached property in affluent postcode
  ✓ Drawings uploaded
  ✓ Signal detected 6 hours ago
  ⚠ No building control notice yet
```

**Why:** Transparency builds trust. Tradesmen can see why a lead is scored, not just the number.

---

## Continuous Improvement

### Feedback Loop
1. Tradesman marks lead as WON or GHOSTED.
2. System records actual outcome vs predicted score.
3. Monthly retraining of scoring weights.
4. A/B testing of new signals.

### Metrics
- Accuracy: % of GOLD leads that convert.
- False positive: % of GOLD leads that ghost.
- False negative: % of SKIP leads that were actually good.

Target: 80% of GOLD leads convert within 30 days.

---

## Implementation

### Phase 1 (MVP)
- Manual scoring based on planning + EPC + property type.
- Static weights.
- Display on lead cards.

### Phase 2
- Add Land Registry and Companies House.
- Dynamic weights based on trade.
- Feedback loop enabled.

### Phase 3
- Machine learning model trained on outcomes.
- Real-time score updates.
- Predictive ghost risk integration.

---

## Psychology

- **Numbers create confidence.** "94" is more convincing than "good lead."
- **Evidence creates trust.** Showing why removes suspicion.
- **Labels create action.** "GOLD" triggers immediate response.
- **Transparency creates loyalty.** Tradesmen who understand the score trust it more.

# Ghost Lead Research

## Definition

A **ghost lead** is an enquiry that results in:
- No response after quote.
- Repeated rescheduling without commitment.
- Price shopping with no intent to buy.
- Homeowner who "just wants an idea of cost."

The cost is not just the lost job. It is the **time, fuel, and emotional energy** wasted.

---

## Research Findings

### Quantifying the Problem

| Metric | Value | Source |
|--------|-------|--------|
| Ghost rate (industry average) | 30-50% | Trade forum surveys |
| Average wasted visit cost | £25-50 | Fuel + time estimates |
| Average quote prep time | 1-2 hours | Tradesman reports |
| Annual ghost cost per tradesman | £2,000-5,000 | Conservative estimate |
| Emotional impact | High | Repeated forum complaints |

### Why Homeowners Ghost

| Reason | Frequency | Notes |
|--------|-----------|-------|
| Price shopping | 40% | Collecting quotes to negotiate |
| Not ready to proceed | 25% | "Just getting ideas" |
| Found cheaper quote | 20% | Race to bottom on price |
| Change of mind | 10% | Project cancelled or delayed |
| Other | 5% | Personal circumstances, etc. |

### Behavioural Signals of a Ghost

Pre-quote:
- Vague project description.
- No budget mentioned.
- "Just want a rough idea."
- Unwilling to commit to site visit time.
- Multiple trades requested simultaneously (not renovation).

Post-quote:
- No response within 48 hours.
- "Need to think about it" with no follow-up.
- Requests multiple revisions without commitment.
- Compares quote to online calculators.

---

## The Ghost Risk System

### Three-State Model

| State | Meaning | Action |
|-------|---------|--------|
| **READY** | High intent. Proceed with confidence. | Call within 24 hours. Site visit likely to convert. |
| **MAYBE** | Moderate intent. Verify before investing time. | Quick phone call to qualify. Don't commit to site visit yet. |
| **WASTE** | Low intent. High ghost probability. | Skip or send a rough estimate only. Protect your time. |

### Scoring Logic

**READY (Low Ghost Risk):**
- Planning application exists and is active.
- Property recently sold or registered.
- EPC F/G rating (legal obligation).
- Council contract live.
- Affluent postcode.
- Signal is fresh (< 48 hours).

**MAYBE (Medium Ghost Risk):**
- Planning application submitted but not approved.
- Property in average postcode.
- No recent sale or registration.
- Signal is 3-7 days old.
- Building control notice exists.

**WASTE (High Ghost Risk):**
- No official data signals.
- Property in low-value postcode.
- Signal is > 14 days old.
- No planning, no EPC, no sale.
- Generic enquiry with no specifics.

---

## Evidence Stack

For every Ghost Risk rating, show why:

```
Ghost Risk: LOW (READY)
Why this lead is likely to convert:
  ✓ Planning approved 3 days ago
  ✓ Property sold 12 days ago
  ✓ Affluent postcode (B17)
  ✓ Fresh signal (< 6 hours)
  
Ghost Risk: HIGH (WASTE)
Why this lead may waste your time:
  ✗ No planning application found
  ✗ No recent property activity
  ✗ Signal is 18 days old
  ✗ Low-value postcode
  ⚠ Vague enquiry description
```

---

## Implementation

### Phase 1: Rule-Based (MVP)
Simple if/then logic based on available data signals.

```typescript
function calculateGhostRisk(lead: Lead): 'READY' | 'MAYBE' | 'WASTE' {
  let score = 50; // Start neutral
  
  if (lead.planningApproved) score += 25;
  if (lead.recentSale) score += 20;
  if (lead.epcRating === 'F' || lead.epcRating === 'G') score += 15;
  if (lead.affluentPostcode) score += 10;
  if (lead.freshSignal) score += 10;
  if (lead.signalAge > 14) score -= 20;
  if (lead.noOfficialSignals) score -= 30;
  if (lead.lowValuePostcode) score -= 15;
  
  if (score >= 75) return 'READY';
  if (score >= 50) return 'MAYBE';
  return 'WASTE';
}
```

### Phase 2: Weighted Scoring
More nuanced scoring with trade-specific adjustments.

### Phase 3: Predictive Model
Machine learning based on historical outcomes (won vs ghosted).

---

## UI Examples

### On Lead Card
```
┌────────────────────────────────┐
│ Rear extension approved        │
│ B17 Harborne                   │
│                                │
│ GHOST RISK: LOW (READY)        │
│ Call within 24 hours           │
│                                │
│ [SEE FULL LEAD]                │
└────────────────────────────────┘
```

### On Lead Detail
```
Ghost Risk Assessment
━━━━━━━━━━━━━━━━━━━━━━
Risk Level: LOW (READY)
Confidence: 87%

Evidence:
  ✓ Planning approved 3 days ago
  ✓ Property recently sold
  ✓ Affluent area
  
Recommended Action:
  Call today. Site visit likely to convert.
  Estimated conversion probability: 85%
```

---

## Copy Angles

- "Half your site visits are to people who will never buy."
- "We flag the time-wasters before you waste fuel."
- "Ghost Risk: LOW. This one is worth the drive."
- "Don't quote for ghosts."

---

## Integration with Serious Buyer Score

| Serious Buyer Score | Ghost Risk | Combined Label |
|---------------------|------------|----------------|
| 90-100 | READY | GOLD — Chase now |
| 75-89 | READY | SILVER — Chase soon |
| 60-74 | MAYBE | BRONZE — Verify first |
| 40-59 | MAYBE | CHECK — Quick call |
| <40 | WASTE | SKIP — Protect time |

---

## Key Insight

> Ghost leads are not random. They have patterns.
> 
> JobFilter's job is to see the patterns before the tradesman does.

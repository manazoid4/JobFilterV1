# Sample Lead Card System

## Purpose

Show potential members **exactly** what a JobFilter lead looks like before they sign up.

Removes uncertainty. Demonstrates value. Builds trust.

---

## Lead Card Spec

### Desktop Layout
```
┌─────────────────────────────────────────────────────────────┐
│  PLANNING VERIFIED · DETECTED 3 HOURS AGO                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Rear extension approved                                    │
│  4-bed detached, B17 Harborne, Birmingham                   │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ SERIOUS      │  │ GHOST        │  │ BUDGET       │      │
│  │ BUYER SCORE  │  │ RISK         │  │ BAND         │      │
│  │              │  │              │  │              │      │
│  │     94       │  │   LOW        │  │  £38k—£55k   │      │
│  │   ━━━━━━     │  │   (READY)    │  │              │      │
│  │   GOLD       │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  RECOMMENDED ACTION                                         │
│  Call within 24 hours. Homeowner hasn't contacted any       │
│  builders yet. Fresh approval = first-mover advantage.      │
│                                                             │
│  WHY THIS SCORES HIGH                                       │
│  ✓ Planning approved 3 days ago                             │
│  ✓ Detached property in affluent postcode                   │
│  ✓ Drawings uploaded                                        │
│  ✓ Recent Land Registry sale (12 days ago)                  │
│  ⚠ No building control notice yet                           │
│                                                             │
│  TIMING                                                     │
│  Planning approved: 3 days ago                              │
│  Signal detected: 3 hours ago                               │
│  Recommended contact: Today                                 │
│                                                             │
│  TRADE FIT                                                  │
│  Primary: Builder                                           │
│  Secondary: Electrical, Plumbing, Roofing                   │
│                                                             │
│  [SEE FULL LEAD]  [SAVE TO PIPELINE]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout
```
┌─────────────────────────────┐
│ PLANNING VERIFIED           │
│ Detected 3 hrs ago          │
├─────────────────────────────┤
│                             │
│ Rear extension approved     │
│ 4-bed detached              │
│ B17 Harborne, Birmingham    │
│                             │
│ SCORE: 94 GOLD              │
│ GHOST RISK: LOW (READY)     │
│ BUDGET: £38k—£55k           │
│                             │
│ CALL WITHIN 24 HOURS        │
│                             │
│ Why this scores high:       │
│ ✓ Planning approved         │
│ ✓ Affluent area             │
│ ✓ Recent sale               │
│                             │
│ [SEE FULL LEAD]             │
└─────────────────────────────┘
```

---

## Components

### 1. Header Bar
- **Primary badge:** Planning Verified / Tender Live / Retrofit Trigger / etc.
- **Freshness:** "Detected N hours ago" or "Approved N days ago"
- **Background:** Yellow for fresh, green for verified, orange for trigger.

### 2. Project Title
- Short, specific description.
- Location (postcode + area).
- Property type (detached, semi, terrace, commercial).

### 3. Score Grid
Three columns:
- **Serious Buyer Score:** Large number + label (GOLD/SILVER/BRONZE) + colour bar.
- **Ghost Risk:** LOW (green) / MEDIUM (yellow) / HIGH (red).
- **Budget Band:** Estimated range based on project type + postcode.

### 4. Recommended Action
- One clear instruction.
- Timing (call within 24 hours, quote within 48 hours, etc.).
- Brief explanation.

### 5. Evidence Stack
- Checklist of why the score is what it is.
- Green checkmarks for positive signals.
- Orange warnings for missing signals.
- No negative language. Frame as "what we know" vs "what we don't."

### 6. Timing Block
- Planning approval date.
- Signal detection date.
- Recommended contact window.
- Visual timeline (optional).

### 7. Trade Fit
- Primary trade.
- Secondary trades.
- Why each trade fits.

### 8. Actions
- "See full lead" — opens detail view.
- "Save to pipeline" — adds to Dashboard.
- "Share" — WhatsApp share.

---

## Static Sample Data

For the homepage sample card, use static realistic data:

```typescript
const sampleLead = {
  id: 'sample-001',
  title: 'Rear extension approved',
  location: 'B17 Harborne, Birmingham',
  propertyType: '4-bed detached',
  score: 94,
  scoreLabel: 'GOLD',
  ghostRisk: 'LOW',
  ghostLabel: 'READY',
  budgetMin: 38000,
  budgetMax: 55000,
  detectedAt: '3 hours ago',
  planningApproved: '3 days ago',
  landRegistrySale: '12 days ago',
  epcRating: 'D',
  primaryTrade: 'Builder',
  secondaryTrades: ['Electrical', 'Plumbing', 'Roofing'],
  badges: ['Planning Verified', 'Recent Sale', 'Affluent Postcode'],
  recommendedAction: 'Call within 24 hours. First-mover advantage.',
  evidence: [
    { label: 'Planning approved', value: '3 days ago', positive: true },
    { label: 'Detached property', value: '4-bed', positive: true },
    { label: 'Affluent postcode', value: 'B17', positive: true },
    { label: 'Recent sale', value: '12 days ago', positive: true },
    { label: 'Building control', value: 'Not yet filed', positive: false },
  ],
};
```

---

## Placement

### Homepage
- Below hero, above "How it works."
- Label: "This is what a Gold lead looks like."
- One card, full width, desktop and mobile.

### Pricing Page
- Below plans.
- Label: "What you get for £39/month."
- Side-by-side: Free preview vs Full lead.

### Free Tools Page
- Below tools grid.
- Label: "See what a scored lead looks like."
- Link to full scan.

---

## Interactions

### Hover (Desktop)
- Subtle lift shadow.
- Evidence stack expands.
- CTA button pulses gently.

### Tap (Mobile)
- Card expands to full detail.
- Smooth scroll to top.
- Back button returns to card.

---

## A/B Tests

| Variant | Test |
|---------|------|
| Score size | Large number vs small number |
| Evidence order | Planning first vs Sale first |
| CTA text | "See full lead" vs "Lock this territory" |
| Card colour | Yellow border vs white border |
| Freshness | "3 hours ago" vs "Fresh signal" |

---

## Implementation

### Component: SampleLeadCard.tsx
- Props: `lead: SampleLead` (static data type).
- No API calls.
- No auth required.
- Pure display component.

### Responsive
- Desktop: full card with 3-column score grid.
- Tablet: 2-column score grid.
- Mobile: stacked, single column.

---

## Key Insight

> A tradesman doesn't buy what they can't see.
> 
> The sample lead card is the **product demo**.
> It must be so clear and compelling that the only question left is:
> "How do I get more of these?"

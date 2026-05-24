# Reputation Moat Strategy

## The Moat Definition

JobFilter's moat is not a single feature. It is the **combination of exclusivity, intelligence, and trust** that no competitor can replicate without equivalent investment.

---

## Moat Layer 1: Data Fusion (Hard to Replicate)

### What It Is
The ability to combine planning applications, EPC ratings, Land Registry transactions, Companies House registrations, building control notices, and council contracts into a single scored signal.

### Why It's Hard to Replicate
- Each data source requires separate API integration.
- Normalisation across UPRN, postcode, and company number is non-trivial.
- Scoring algorithm requires months of tuning.
- Rate limits and data quality issues require ongoing engineering.

### Competitor Gap
- Checkatrade/MyBuilder: No data fusion. User-submitted only.
- Glenigan/Barbour: Raw data, no scoring. Enterprise-only.
- Planning Pipe: Single source, no enrichment.

### Defence
- Continuous improvement of scoring accuracy.
- Proprietary enrichment layers (trade fit, affluent postcode indicators).
- Speed of signal detection (faster = better).

---

## Moat Layer 2: Territory Exclusivity (Impossible to Replicate Without Sacrifice)

### What It Is
One dominant trade partner per postcode cluster per trade.

### Why It's Impossible to Replicate
- Checkatrade/MyBuilder make money from volume. Exclusivity destroys their model.
- Shared lead marketplaces cannot offer exclusivity without collapsing revenue.
- It requires saying "no" to paying customers — something platforms hate.

### Competitor Gap
- Every major competitor sells shared leads.
- None offer true postcode exclusivity.

### Defence
- Strict enforcement of exclusivity.
- Visual territory map showing locked areas.
- Waitlist system for oversubscribed areas.
- Founder pricing locks create switching cost.

---

## Moat Layer 3: Anti-Ghost Scoring (Algorithmic Advantage)

### What It Is
Predictive scoring of homeowner seriousness using behavioural and data signals.

### Why It's Hard to Replicate
- Requires historical data on lead outcomes.
- Feature engineering across multiple data sources.
- Continuous model refinement based on tradesman feedback.
- Most competitors have no outcome data (they don't track if a lead converts).

### Competitor Gap
- No competitor scores leads for ghost risk.
- No competitor uses official data to verify buyer intent.

### Defence
- Feedback loop: tradesman reports "won" or "ghosted" → improves model.
- More data sources = better predictions over time.
- Proprietary feature set (e.g. planning approval recency, property sale timing).

---

## Moat Layer 4: WhatsApp-First Delivery (Channel Advantage)

### What It Is
Delivering scored signals directly to WhatsApp, not email or dashboard.

### Why It's Hard to Replicate
- Tradesmen live on WhatsApp. Email is checked once a day.
- WhatsApp has higher open rates than any other channel.
- Building a reliable WhatsApp delivery system requires infrastructure.

### Competitor Gap
- Checkatrade/MyBuilder: Email/app notifications.
- Glenigan: Email reports.
- No competitor uses WhatsApp as primary channel.

### Defence
- WhatsApp Business API integration.
- Direct letter delivery (physical mail) for high-value leads.
- Multi-channel fallback (SMS, email).

---

## Moat Layer 5: Free Tool Ecosystem (Acquisition Moat)

### What It Is
Calculators and scorers that provide value before payment.

### Why It's Hard to Replicate
- Each tool requires domain expertise (construction pricing, fuel costs, lead scoring).
- Free tools create brand familiarity and trust.
- SEO value from tool-related searches.

### Competitor Gap
- No competitor offers free construction calculators.
- No competitor offers tyre-kicker scoring.

### Defence
- Continuous tool expansion.
- Tool usage data improves lead scoring.
- Tool branding reinforces main brand.

---

## Moat Layer 6: Operator Presence (Brand Moat)

### What It Is
The brand feels built by someone who understands construction, not a tech startup.

### Why It's Hard to Replicate
- Requires authentic voice and industry knowledge.
- Cannot be faked with AI-generated content.
- Field Notes and Trade Intelligence Briefings require ongoing research.

### Competitor Gap
- All competitors use generic SaaS marketing.
- None speak tradesman language.
- None publish tactical industry content.

### Defence
- Consistent operator voice across all channels.
- Weekly Field Notes.
- Direct founder access for support.

---

## Moat Summary

| Moat Layer | Replication Difficulty | Time to Replicate | Competitor Sacrifice Required |
|------------|----------------------|-------------------|------------------------------|
| Data Fusion | High | 6-12 months | Must invest in engineering |
| Territory Exclusivity | Very High | 12-24 months | Must destroy existing revenue model |
| Anti-Ghost Scoring | High | 6-12 months | Must collect outcome data |
| WhatsApp Delivery | Medium | 3-6 months | Must rebuild notification system |
| Free Tool Ecosystem | Medium | 3-6 months | Must offer free value |
| Operator Presence | Medium | 6-12 months | Must abandon generic marketing |

**Combined moat: Extremely difficult to replicate without 18-24 months and significant capital.**

---

## Moat Maintenance

1. **Speed:** Detect signals faster than anyone else.
2. **Coverage:** Add more data sources continuously.
3. **Accuracy:** Improve scoring with every feedback loop.
4. **Voice:** Publish content that competitors cannot fake.
5. **Exclusivity:** Never compromise on territory locks.

---

## Key Insight

> The moat is not the data. The data is free and public.
> The moat is in the **fusion**, **scoring**, **delivery**, and **exclusivity**.
> 
> Anyone can access planning.data.gov.uk.
> No one else will build the scoring engine, enforce exclusivity, and deliver to WhatsApp.

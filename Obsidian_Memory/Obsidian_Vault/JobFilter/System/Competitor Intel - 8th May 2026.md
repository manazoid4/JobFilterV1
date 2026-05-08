# Competitor Intel — 8th May 2026

## EXECUTIVE SUMMARY

The UK trade lead gen market is split into three tiers:
1. **Directories** (Checkatrade, MyBuilder, Rated People, Bark) — shared leads, bidding wars, declining trust
2. **Planning data platforms** (Buildscout, BuildAlert, Planning Pipe, 2BuildUK) — planning-only, no scoring, no WhatsApp
3. **Enterprise intel** (Barbour ABI, Glenigan) — £2,000+/yr, commercial focus, overkill for tradesmen

**JobFilter's gap**: Nobody combines multi-signal scoring (planning + EPC + contracts + land registry + companies house) with WhatsApp delivery and a GOLD/SILVER/BIN filter. Buildscout is closest but is planning-only, £199-499/mo, and targets SME contractors not individual tradesmen.

---

## REDDIT SENTIMENT ANALYSIS

### r/DIYUK, r/UKtrade, r/HousingUK, r/Plumbing — Key Complaints

**"Leads sold to 4-8 other trades — race to the bottom"**
- Universal complaint across all platforms. Tradesmen report paying £15-£35 per lead that 5+ other people also receive.
- Electricians forums specifically call out Checkatrade "only pushing low-value leads" and "time-wasters who don't even respond"

**"Subscription + per-lead fees = double charging"**
- Checkatrade: £50-£90/month per category + pay-per-lead on top for some categories
- MyBuilder: £25+VAT per shortlist, with homeowners shortlisting 6+ tradesmen at once
- Trades report £200+/month before any work arrives

**"Good trades don't need these platforms"**
- Consistent theme: the best trades are booked through referrals and don't pay for leads
- Creates a quality death spiral — only desperate or new trades stay on platforms

**"No visibility into what you're buying"**
- Leads are "a name and phone number someone typed into a form"
- No budget verification, no timeline check, no job scope clarity
- Tradesmen drive to quotes for people who "aren't sure what they want yet"

**"Contracts lock you in"**
- 90-day minimum contracts common (Time To Scale, agency packages)
- Checkatrade 12-month memberships reported with no cancellation clause
- Trades feel trapped paying for nothing during quiet months

---

## COMPETITOR LANDSCAPE

### TIER 1: DIRECTORIES (Shared leads, reactive)

| Platform | Pricing | Model | Weakness |
|----------|---------|-------|----------|
| **Checkatrade** | £50-£90/mo per category + per-lead fees | Subscription + pay-per-lead | Declining organic visibility, shared leads, review manipulation history |
| **MyBuilder** | £25+VAT per shortlist | Pay-per-shortlist | Homeowners shortlist 6+ trades, 795 complaints in 12 months (per their own disclosure) |
| **Rated People** | £15-£35 per lead | Pay-per-lead | Lowest quality leads, highest competition |
| **Bark** | £10-£50 per lead credit pack | Credit system | Credits expire, leads often unresponsive |
| **TradeMatch** (NEW 2026) | Pay-per-confirmed-work | Escrow + verified reviews | New entrant, homeowner-focused not trade-focused, limited reach |

### TIER 2: PLANNING DATA PLATFORMS (Proactive, planning-only)

| Platform | Pricing | Model | Weakness |
|----------|---------|-------|----------|
| **Buildscout** | £199-£499+VAT/mo | Planning data + automated outreach | FMB partnership gives credibility, but pricing is SME-only. No EPC, no contracts, no scoring. Just planning applications. |
| **BuildAlert** | £2/letter (browse + physical mail) | Planning alerts + mailer | Simple model but limited to planning only. No scoring, no real-time alerts. |
| **Planning Pipe** | £44.95+VAT/mo | Email digest of planning leads | Email-only, no scoring, no WhatsApp, no multi-signal. Dated interface. |
| **2BuildUK** | From £30/mo | Planning application database | Raw data dump, no filtering, no scoring, no action layer. |
| **PlanLead** | Subscription (undisclosed) | AI-generated letters to planning applicants | Letters-only approach, no digital alert system, no scoring. |

### TIER 3: ENTERPRISE INTELLIGENCE

| Platform | Pricing | Model | Weakness |
|----------|---------|-------|----------|
| **Barbour ABI** | £2,000+/yr | Construction intelligence | Commercial focus, overkill for individual trades |
| **Glenigan** | £1,500+/yr | Early-stage project data + tender tracking | Enterprise pricing, complex interface, not trade-focused |

### TIER 4: AGENCY/AUTOMATION (Adjacent competitors)

| Platform | Pricing | Model | Weakness |
|----------|---------|-------|----------|
| **Time To Scale** | £197-£497/mo | Trade website + lead gen | 90-day contracts, opaque lead quality, agency dependency |
| **Unmissed AI** | £49-£99/mo | Missed call recovery | Recovers calls but doesn't qualify if the job is worth chasing |
| **Fatrank** | Pay-per-result | SEO + verified enquiries | SEO-focused, slow results, not proactive lead finding |
| **Varga Media** | £1,000-£2,500/mo | Human caller lead qualification | Expensive, human-dependent, not scalable |

---

## NEW ENTRANTS (2025-2026)

### TradeMatch (tradematch.uk)
- **What**: Escrow-based trade marketplace with verified reviews
- **Angle**: "Pay only when work is confirmed" — no subscription, no per-lead cost
- **Threat**: Medium. Homeowner-focused, not trade-focused. But their escrow model addresses the biggest homeowner complaint.
- **Gap**: Doesn't help trades FIND work proactively. Still reactive.

### Fatrank / PromoSEO
- **What**: SEO-based lead generation with pay-per-result model
- **Angle**: "No-risk, verified enquiries"
- **Threat**: Low. Slow results (SEO takes months), not proactive.
- **Gap**: Not real-time, not planning-based, no urgency scoring.

---

## OPEN-Source THREATS

### GitHub Projects Found:
- **adrianshort/uk_planning_scraper** — Ruby gem, scrapes UK planning authority sites. PRE-ALPHA, Idox/Northgate only. Not production-ready.
- **buildwithtract/planning-applications** — Python scraper for UK planning applications. Minimal stars, basic functionality.
- **Raygunadk2002/planning-scraper** — London borough monitoring for environmental compliance. Not trade-focused.
- **Apify EPC Scraper** — Scrapes find-energy-certificate.service.gov.uk. Commercial tool, not open-source.
- **dariuswhatling/demo_web_scraper** — Portfolio piece, production-grade planning scraper with LLM structuring. Not actively maintained.

**Assessment**: No open-source project currently threatens JobFilter. The planning scrapers are basic, none combine multiple signals, none have scoring logic, none have WhatsApp delivery. The EPC API migration (May 2026) makes existing scrapers obsolete.

---

## COMPETITIVE ADVANTAGE MAP

| Feature | JobFilter | Buildscout | Checkatrade | Planning Pipe | TradeMatch |
|---------|-----------|------------|-------------|---------------|------------|
| Planning data | ✓ | ✓ | ✗ | ✓ | ✗ |
| EPC signals | ✓ | ✗ | ✗ | ✗ | ✗ |
| Council contracts | ✓ | ✗ | ✗ | ✗ | ✗ |
| Land Registry | ✓ | ✗ | ✗ | ✗ | ✗ |
| Companies House | ✓ | ✗ | ✗ | ✗ | ✗ |
| GOLD/SILVER/BIN scoring | ✓ | ✗ | ✗ | ✗ | ✗ |
| WhatsApp alerts | ✓ | ✗ | ✗ | ✗ | ✗ |
| Exclusive (not shared) | ✓ | ✓ | ✗ | ✓ | N/A |
| Free tier | ✓ | ✗ | ✗ | ✗ | ✓ |
| Price (entry) | £0-£29/mo | £199/mo | £50/mo | £45/mo | Free |
| Multi-signal pipeline | 5 signals | 1 signal | 0 (reactive) | 1 signal | 0 (reactive) |

---

## KEY INSIGHTS FOR JOBFILTER

1. **Nobody does multi-signal**: Every competitor is single-source (planning OR directory OR SEO). JobFilter's 5-signal pipeline is unique.
2. **Scoring is the moat**: Buildscout gives you raw planning data. JobFilter tells you which ones are worth chasing. That's the difference between noise and signal.
3. **WhatsApp is the killer channel**: 89% of UK trades use WhatsApp. Nobody else delivers leads there. Email digests (Planning Pipe) and dashboards (Buildscout) add friction.
4. **Price gap is massive**: Buildscout at £199-499/mo is unreachable for individual tradesmen. JobFilter at £29-49/mo fills the gap between directory subscriptions and enterprise tools.
5. **Exclusivity sells**: "No one else sees your scan results" is the strongest message. Checkatrade's shared-lead model is universally hated.
6. **EPC is untapped**: No competitor offers EPC-based leads. The legal requirement for F/G rated properties to retrofit creates guaranteed demand.

---

## THREATS TO MONITOR

1. **Buildscout price drop**: If they launch a "lite" tier at £99/mo, they become a direct competitor for SME builders.
2. **TradeMatch trade-side features**: If they add proactive lead finding for trades, their escrow model becomes compelling.
3. **EPC API changes**: The May 2026 migration to service.gov.uk could disrupt EPC signal reliability.
4. **Agency automation**: Time To Scale or similar could add planning data scanning to their existing trade websites.

---

## ACTIONABLE RECOMMENDATIONS

1. **Double down on "5 signals, 1 scan"**: No competitor can match this. Make it the hero message.
2. **Build the EPC Signal Engine as a standalone product** (see separate doc). This is the most defensible moat.
3. **Create a "vs Checkatrade" comparison page**. The sentiment is already there — just needs a landing page.
4. **Target Buildscout's pricing gap**: "All the signals. 1/4 the price."
5. **Add urgency scoring based on planning deadlines**: Competitors show planning applications but don't tell you WHEN to act.

---

*Saved: 8th May 2026*
*Next review: 22nd May 2026*

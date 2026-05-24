# Trust Center Architecture

## Purpose

The Trust Center is a dedicated page that explains:
- How JobFilter works (at a high level).
- How leads are scored.
- Where data comes from (categories, not APIs).
- How privacy is protected.
- What the guarantee covers.
- How to get support.

**Goal:** Turn scepticism into confidence.

---

## Page Structure

### 1. Hero: Our Promise

```
┌─────────────────────────────────────────┐
│                                         │
│  WE DON'T SELL SHARED LEADS.            │
│  WE DON'T TAKE COMMISSION.              │
│  WE DON'T LOCK YOU IN.                  │
│                                         │
│  We scan official data.                 │
│  Score every signal.                    │
│  Send the good ones to your WhatsApp.   │
│                                         │
│  If you don't see one job worth         │
│  chasing in 30 days, we refund          │
│  every penny. No quibbles.              │
│                                         │
└─────────────────────────────────────────┘
```

### 2. Section: How Scoring Works

**Copy:**
"Every signal gets a Serious Buyer Score from 0 to 100."

**Visual:**
Simple 3-step diagram:
1. **Detect** — Scan official sources.
2. **Enrich** — Add property context.
3. **Score** — Rank by intent, value, and urgency.

**Score breakdown:**
- 90-100 = GOLD (Call within 24 hours)
- 75-89 = SILVER (Call within 48 hours)
- 60-74 = BRONZE (Verify first)
- <60 = CHECK (Proceed with caution)

**Transparency note:**
"We show you the evidence behind every score. Planning approval date. Property sale timing. EPC rating. You see what we see."

### 3. Section: Data Sources

**Copy:**
"We use official UK government and public registers."

**List (no API details):**
- Planning applications and approvals
- Energy Performance Certificates (EPC)
- Land Registry property transactions
- Companies House business registrations
- UK government and council contracts
- Building control notices
- HMO licensing activity
- Property auction results
- Retrofit grant schemes

**Legal note:**
"All data is used under the Open Government Licence. We do not scrape private data. We do not sell your information."

### 4. Section: Anti-Ghost Philosophy

**Copy:**
"Ghost leads cost tradesmen £2,000-5,000 a year in wasted time and fuel."

**How we fight ghosts:**
1. **Official data only** — No user-submitted enquiries.
2. **Scoring before delivery** — Weak signals never reach your phone.
3. **Evidence stack** — You see why a lead is scored before you call.
4. **Ghost Risk rating** — LOW, MEDIUM, or HIGH. Protect your time.

**Quote:**
"Half your site visits are to people who will never buy. We flag the time-wasters before you waste fuel."

### 5. Section: Privacy First

**Copy:**
"We collect the minimum data needed to serve you."

**What we collect:**
- Name
- Trade
- Contact (phone or email)
- Postcode (for territory matching)

**What we do NOT collect:**
- Financial information (handled by Stripe)
- Location tracking
- Browsing history
- Third-party data

**Your rights:**
- Access your data anytime.
- Request deletion anytime.
- Cancel subscription anytime.
- No data sold to third parties.

**GDPR compliance:**
- Data retention: 12 months after cancellation.
- Right to erasure: 30 days upon request.
- Data controller: JobFilter UK Ltd.
- ICO registration: [number].

### 6. Section: Fair Use & Refunds

**30-Day Money-Back Guarantee:**
"Use JobFilter for 30 days. If you don't see at least one job worth chasing, we refund every penny. No quibbles. No hoops. No 'but you didn't use feature X.'"

**Fair Use Policy:**
- One territory lock per founding member.
- Unlimited lead alerts within locked territory.
- WhatsApp alerts: unlimited.
- Direct letters: 5 per month (founding), 10 per month (standard).

**Cancellation:**
- Cancel anytime.
- No cancellation fees.
- Access continues until end of billing period.

### 7. Section: Public Changelog

**Copy:**
"We ship improvements every week. Here's what we've built recently."

**Recent updates:**
- [Date] — Added EPC retrofit trigger signals.
- [Date] — Improved ghost risk scoring.
- [Date] — Added Bristol and Glasgow coverage.
- [Date] — Launched Quote Floor calculator.

### 8. Section: Contact & Support

**Copy:**
"Questions? Concerns? Ideas? Talk to us directly."

**Channels:**
- WhatsApp: [number]
- Email: support@jobfilter.uk
- Response time: < 4 hours (Mon-Fri)

---

## UI Design

### Layout
- Single column, max-width 800px.
- Generous section padding.
- Clear headings (H2).
- Bullet points, not paragraphs.
- Yellow accent for key promises.
- Green for verified/privacy elements.

### Components
- Promise banner (full width, yellow background)
- Score diagram (simple SVG or CSS)
- Data source grid (icon + label)
- FAQ accordion (optional)
- Contact form (simple)

---

## URL
`/trust`

**Navigation:**
- Footer link on all pages.
- "How it works" dropdown in nav.
- CTA from guarantee sections.

---

## SEO

**Title:** How JobFilter Works | Trust, Scoring & Data Sources
**Meta:** JobFilter scans official UK data to find real construction jobs. Learn how our scoring works, where our data comes from, and our 30-day money-back guarantee.

**Keywords:**
- How JobFilter works
- JobFilter data sources
- Construction lead scoring
- Anti-ghost leads
- 30-day money-back guarantee

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page views | 20% of homepage traffic | Analytics |
| Time on page | 2+ minutes | Analytics |
| Bounce rate | <50% | Analytics |
| Support ticket reduction | -20% | Ticket volume |
| Conversion rate from /trust | 10%+ | Funnel tracking |

---

## Key Insight

> The Trust Center is not a legal page.
> It is a **sales page** for sceptics.
> 
> Every sentence must answer:
> "Why should a suspicious tradesman believe this?"

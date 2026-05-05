# Project: TradieStack — "GoHighLevel for UK Trades, Without the Agency Bloat"

Created: 5 May 2026
Status: Research & Scoping
Parent: JobFilter ecosystem — separate product suite

---

## TL;DR

GoHighLevel is a $97-497/mo all-in-one platform for agencies. Agencies like Varga Media and Time To Scale use it to serve tradesmen at £197-£2,500/mo. The agency model has three problems: it's expensive, it's human-dependent (doesn't scale), and it's built for marketers, not for tradesmen directly.

**TradieStack** is the same concept — but built directly for tradesmen at software prices (£29-49/mo), with only the 20% of features they actually use, WhatsApp-native, and upstream lead signals from JobFilter integrated natively.

---

## Why This Exists

### The Agency Racket

```
          Facebook Ads
               ↓
         GoHighLevel ($97-497/mo per agency account)
               ↓
    Agency (Varga/Time To Scale) builds funnels, automations, sites
               ↓
    Agency charges tradesman £1,000-£5,500+/mo
               ↓
    Tradesman gets ~15-30 "qualified quotes" (filtered leads)
```

### The TradieStack Model

```
          JobFilter signals (planning, EPC, contracts) + optional paid ads
               ↓
    TradieStack ($29-49/mo) — website, CRM, automations, reviews, WhatsApp
               ↓
    Tradesman uses it directly. No agency middleman.
               ↓
    Tradesman gets JobFilter's upstream signals + manages everything in one place
```

The agency's £1,000-£5,500/mo becomes £29-49/mo. The difference goes to the tradesman.

---

## GoHighLevel Feature Map — What We Keep, Cut, and Improve

### CAPTURE (Get leads in)

| GHL Feature | TradieStack Version | Keep? |
|-------------|-------------------|-------|
| CRM | Lightweight trade CRM — leads by status + trade + value | YES — core |
| Voice AI | Skip for launch. Later: AI call screening for intake form callers | LATER |
| Forms, Surveys & Quizzes | Trade intake form (already built in JobFilter — `POST /api/intake/score`) | YES — reuse |
| Websites, Funnels & Landing Pages | **Single-page trade website builder** — 4 templates (Electrician, Plumber, Builder, Roofer). Mobile-first. Review widget, intake form, photo gallery, contact buttons. Generated in 5 minutes, not 14 days. | YES — killer feature |
| Chat Widget / Conversation AI | WhatsApp-native chat widget (not livechat — trades won't use it) | YES — WhatsApp only |
| Call Tracking | Skip. Tradesmen already have phones. | NO |
| Inbound SMS & Social DMs | Skip for launch. Trades use WhatsApp. | NO |
| Social Planner | Skip. Trades don't schedule posts. | NO |
| Missed Call Text-Back | **Already spec'd in Block 8 Chase Engine.** Build here. | YES |
| AI Biz Card Scanner | Skip. | NO |
| QR Codes | Van sticker QR → intake form. Already in JobFilter as "QR van sticker" product. | YES |
| Prospecting Tool | **This is literally JobFilter.** Native integration. | YES — the moat |
| Ad Manager (Google/FB Ads) | Skip. Later: optional simple ad launcher (pre-built template, set budget, go live). | LATER |

### NURTURE (Build relationships)

| GHL Feature | TradieStack Version | Keep? |
|-------------|-------------------|-------|
| Conversation AI | Skip. | NO |
| Unified Conversations | **WhatsApp + SMS + email in one inbox.** WhatsApp primary. | YES |
| Sales Pipelines | Simple pipeline: New → Contacted → Quoted → Won/Lost. Already part of Chase Engine spec. | YES |
| Workflows & Automations | **Simple automations:** "When lead arrives → WhatsApp alert. If no response in 2h → nudge. If Won → review request." No visual workflow builder. Templates only. | YES — simplified |
| Calendars | Basic booking link. One calendar type. Share via WhatsApp. | YES |
| Appointment Reminders | WhatsApp reminder 24h + 1h before job. | YES |
| Text Snippets | Quick-reply templates for WhatsApp. "Quote sent," "On my way," "Job complete." | YES |
| Mobile App | **Progressive Web App** — installable from browser. No native build needed. | YES — PWA |

### CLOSE (Turn conversations into customers)

| GHL Feature | TradieStack Version | Keep? |
|-------------|-------------------|-------|
| Lead Scoring | **Already built in JobFilter.** GOLD/SILVER/BIN. | YES — reuse |
| Estimates & Proposals | Simple quote template — trade, labour, materials, total, terms. WhatsApp as PDF. Already in SmartQuote page concept. | YES |
| Invoicing | Simple invoice from quote. Stripe payment link attached. | YES |
| Payment Integrations | Stripe only. | YES |
| Paid Calendars | Skip. | NO |
| Order Forms / Upsells | Skip. | NO |
| Membership / Courses | Skip. | NO |

### EVANGELIZE (Review & referral engine)

| GHL Feature | TradieStack Version | Keep? |
|-------------|-------------------|-------|
| Reputation Management | Monitor Google reviews. Alert on new reviews. | YES |
| Automated Review Requests | **Already spec'd in Block 8 Win Engine.** | YES |
| Affiliate Manager | Skip. | NO |
| Review Widgets | Embed Google reviews on trade website. | YES |
| Video Review Capture | Skip. | NO |
| AI Review Reply | Skip. Trades should reply personally. | NO |

### REACTIVATE (Bring past customers back)

| GHL Feature | TradieStack Version | Keep? |
|-------------|-------------------|-------|
| Broadcast Campaigns | Simple WhatsApp broadcast to past customers: "Quiet week next week — 10% off any job booked this week." | YES |
| Smart Lists | Segments: All customers / Won jobs / Lost leads / No answer | YES |
| Seasonal Campaigns | Pre-built templates: "Winter boiler check," "Summer garden work," "Pre-Christmas electrical safety" | YES |

---

## Feature Count Comparison

| | GoHighLevel | TradieStack |
|---|------------|-------------|
| **Total features** | 60+ | 18 (at launch) |
| **Complexity** | High (built for agencies) | Low (built for tradesmen) |
| **WhatsApp-native** | Add-on ($10/mo extra) | Core (free) |
| **Lead source** | None (depends on agency) | JobFilter native integration |
| **Website builder** | Full drag-and-drop funnel builder | 4 trade templates, 5-minute setup |
| **Pricing** | $97-497/mo (for agencies) | £29-49/mo (for tradesmen directly) |
| **Learning curve** | Weeks (agency training) | Minutes (built for trades) |
| **Mobile** | Native iOS/Android app | PWA (installable, works offline) |
| **Sub-accounts** | Agency model (serve multiple clients) | Single account (serve yourself) |

---

## Architecture

### Tech Stack (same as JobFilter)

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS 4 |
| Backend | Express 4 on Firebase Cloud Functions |
| Database | Firebase Firestore (upgrade from JSONL) |
| Auth | Firebase Auth (email/password or phone OTP) |
| Payments | Stripe Checkout |
| WhatsApp | Twilio API |
| Email | Resend |
| Hosting | Firebase Hosting |
| Domain | tradiestack.co.uk or similar |

### Module Map

```
tradiestack/
├── website-builder/       # 4-templates, mobile-first, 5-min setup
│   ├── template-electrician
│   ├── template-plumber
│   ├── template-builder
│   └── template-roofer
├── crm/                   # Lightweight trade CRM
│   ├── lead-inbox          # Unified WhatsApp + email + intake form
│   ├── pipeline            # New → Contacted → Quoted → Won/Lost
│   └── contact-db          # All customers, segments, history
├── chase-engine/           # Auto follow-up (reused from JobFilter spec)
│   ├── missed-call-text-back
│   ├── lead-nudge (2h)
│   ├── message-templates
│   └── appointment-reminders
├── win-engine/             # Reviews + ROI tracking (reused from JobFilter spec)
│   ├── review-request
│   ├── review-monitor
│   ├── win-summary
│   └── referral-prompts
├── quote-invoice/          # Simple quoting + invoicing
│   ├── quote-builder
│   ├── invoice-from-quote
│   └── stripe-payment-link
├── intake/                 # Lead capture (reused from JobFilter)
│   ├── intake-form
│   ├── qr-van-sticker
│   └── scoring-engine
├── broadcast/              # Customer reactivation
│   ├── whatsapp-broadcast
│   ├── smart-lists
│   └── seasonal-templates
└── jobfilter-bridge/       # Native integration with JobFilter
    ├── signal-sync          # JobFilter leads → TradieStack CRM
    └── scan-trigger         # "Fill My Week" from TradieStack
```

---

## Launch Phases

### Phase 1 — Core CRM + Website (Month 1)

**Goal:** Replace what agencies charge £197-497/mo for with software at £29/mo.

| # | Feature | Time |
|---|---------|------|
| 1 | Firebase Auth + Firestore setup | 2h |
| 2 | Simple trade website builder (4 templates) | 8h |
| 3 | Lightweight CRM (lead inbox + pipeline + contact db) | 6h |
| 4 | Intake form embed (reuse JobFilter's) | 1h |
| 5 | Stripe Checkout for subscriptions | 2h |
| | **Total Phase 1** | **~19h** |

### Phase 2 — Chase + Win Engines (Month 2)

**Goal:** Compete with Time To Scale's automations at 1/10th price.

| # | Feature | Time |
|---|---------|------|
| 1 | Missed call text-back | 3h |
| 2 | Lead nudge (2h + 24h follow-ups) | 3h |
| 3 | Message templates (quick-reply snippets) | 2h |
| 4 | Appointment reminders (24h + 1h before) | 2h |
| 5 | Review request + monitor | 3h |
| 6 | Monthly win summary | 2h |
| | **Total Phase 2** | **~15h** |

### Phase 3 — Quotes + Broadcasts (Month 3)

**Goal:** Full-stack trade operating system. Replace ServiceM8, Tradify, and agency broadcast tools.

| # | Feature | Time |
|---|---------|------|
| 1 | Quote builder (trade-specific templates) | 4h |
| 2 | Invoice from quote + Stripe payment link | 3h |
| 3 | WhatsApp broadcast campaigns | 3h |
| 4 | Smart lists + seasonal templates | 3h |
| 5 | JobFilter bridge (signal sync + scan trigger) | 3h |
| | **Total Phase 3** | **~16h** |

**Total build: ~50 hours across 3 months.**

---

## Pricing

| Tier | Price | What |
|------|-------|------|
| **Free** | £0 | Website only. 1 template. Your own domain or tradiestack subdomain. |
| **Core** | £29/mo | Website + CRM + Pipeline + Intake form + Stripe payments |
| **Pro** | £49/mo | Everything in Core + Chase Engine + Win Engine + Quotes + Broadcasts + JobFilter bridge |
| **Founding 50** | £29/mo forever | Pro features at Core price. First 50 only. |

**Bundle with JobFilter Pro:** `£69/mo` for both (JobFilter Pro £49 + TradieStack Pro £49 = £98, save £29/mo).

---

## Launch Copy

**Headline:** EVERYTHING THE AGENCIES CHARGE YOU £1,000/MONTH FOR. NOW £29.

**Sub:** Website. CRM. Auto follow-up. Review requests. Quotes. Invoices. All in one place. No agency middleman. No contract. No per-lead fees.

**CTA:** GET YOUR WEBSITE LIVE IN 5 MINUTES — FREE

**The comparison (homepage section):**

| | Agency Way | TradieStack Way |
|---|-----------|-----------------|
| Website | £197-497/mo, 14-day wait | Free, 5-minute setup, 4 trade templates |
| Lead follow-up | Agency runs it, you wait | Auto-WhatsApp nudges, you're in control |
| Reviews | Agency asks (sometimes) | Auto-request after every won job |
| CRM | Spreadsheets or nothing | Full pipeline, WhatsApp inbox |
| Contract | 90-day minimum | Cancel anytime |
| Price | £1,500-£5,500+/mo | £29-49/mo |

---

## How It Connects to JobFilter

TradieStack and JobFilter are two sides of the same system:

- **JobFilter** = Find the work (upstream signal detection)
- **TradieStack** = Manage the work (CRM, follow-up, reviews, website)

Together they form a complete operating system for a UK tradesman. JobFilter feeds leads into TradieStack's CRM. TradieStack's "Fill My Week" button triggers JobFilter scans. The Win Engine tracks ROI across both.

**Bundle pricing** makes them unstoppable together at £69/mo vs agency services at £1,000-£5,500+/mo.

---

## Name Options

| Name | Domain (check availability) | Vibe |
|------|---------------------------|------|
| **TradieStack** | tradiestack.co.uk | Stack of tools. Clean. Descriptive. |
| **BuildVault** | buildvault.co.uk | Secure, exclusive, everything in one place |
| **TradeHub** | tradehub.uk / tradehub.co.uk | Hub concept. Might be taken. |
| **JobDeck** | jobdeck.co.uk | Deck = control centre. Ties to JobFilter brand. |
| **WorkBase** | workbase.uk | Base of operations. Blue collar. |
| **TradieOS** | tradieos.co.uk | Operating system framing. Tech-forward. |

**Recommendation:** TradieStack — clear, trade-native, stack metaphor works.

---

## Connected Notes

- [[Research for Build Agent - 5th May 2026#Block 8 Time To Scale Deep-Dive — Emulate & Beat]] — Chase + Win Engine specs
- [[Research for Build Agent - 5th May 2026#Block 9 Varga Media Deep-Dive — Emulate Their Positioning, Not Their Model]] — copy patterns, risk reversal
- [[JobFilter Product overview]] — current product suite
- [[Pricing]] — current JobFilter pricing
- [[Competitor Product Lessons]] — Triple Engine model

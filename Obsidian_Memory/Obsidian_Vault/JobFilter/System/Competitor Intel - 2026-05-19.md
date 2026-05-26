# Competitor Intel — 2026-05-19

## WHAT'S NEW (last 2–3 months)

### Checkatrade — SIGNIFICANT CHANGES
- **New pricing**: Free / Approved £30/mo / Growth from £59/mo (previously £50–£90+ per category)
- **TradeMore launched**: Free AI job management app (quotes, invoicing, scheduling) — open to ALL trades, not just members. Direct attack on job management tools.
- **ChatGPT plugin**: Checkatrade now has an app inside ChatGPT for consumer discovery.
- **Book & Pay**: Instant booking with 1.29–1.79% service fee. Enables direct consumer-to-trade transactions.
- **JobFilter edge**: None of this helps trades FIND work proactively. TradeMore manages work already won — JobFilter finds the work before anyone quotes.

### Bark.com — CREDIT SQUEEZE
- Credits now expire in 3 months (was 12 months) from Nov 2025. Pressure to spend faster.
- Transitioning some categories to a "Bark Marketplace" model — details unclear.
- Price still £10–£50 per lead, £2.35 per credit unit.
- **JobFilter edge**: Bark leads are shared, reactive, expire-pressured. JobFilter leads are exclusive and pre-scored.

### MyBuilder — MINOR CHANGE
- Added sponsored placement (paid monthly fee for profile promotion) — terms updated March 2026.
- Core model unchanged: pay per shortlist (~£25+VAT), homeowners still shortlist 6+ trades.
- **JobFilter edge**: MyBuilder model unchanged, trust issues unchanged.

### BuildAlert — SUBSCRIPTION TIER ADDED
- Now has subscription plans: Standard £50/mo (25 letters), Business £100/mo (50 letters), Premium £150/mo (75 letters). Was previously pure pay-as-you-go at £2/letter.
- Still planning-only. Still physical mail only. No scoring, no WhatsApp, no digital alerts.
- **JobFilter edge**: BuildAlert tells you who submitted planning. JobFilter tells you which ones are worth chasing and delivers to your phone in minutes, not post.

### Buildscout — PRICING CONFIRMED, NO LITE TIER
- Plans: FMB £199/mo → National £499/mo (annual commitment). No sub-£199 tier.
- Monthly pricing restricted to FMB/FCA members only. No retail entry-level offer.
- **JobFilter edge**: Buildscout is SME contractors only. £199 floor vs JobFilter's £0–£39. No scoring, no EPC, no WhatsApp.

### Glenigan / Barbour ABI — NO CHANGE
- Both remain enterprise-only (£1,500–£2,000+/yr). No trade-focused pivot found.
- Barbour ABI added content marketing around "how subcontractors can build pipeline" — targeting same audience but with no product change.

### New AI entrants — ONE WORTH WATCHING
- **Construction AI** (launched March 2026): AI-native project management for UK construction SMEs. Post-lead tool, not lead-finding. Not a direct threat.
- **Scopey Onsite**: WhatsApp voice notes → structured site records. Documentation play, not lead gen.
- No new UK entrant combining planning data + scoring + WhatsApp delivery found.

---

## 3 IDEAS JOBFILTER SHOULD IMPLEMENT (from competitor gaps)

1. **"TradeMore killer" copy angle**: Checkatrade's TradeMore manages jobs you already have. Add one line to pricing/homepage: "TradeMore organises your calendar. JobFilter fills it." Direct, timely, exploits the launch.

2. **BuildAlert upgrade path**: BuildAlert users pay £50–150/mo for letters that arrive days later. Build a comparison page (`/compare-buildalert`) showing letters vs instant WhatsApp with scoring. These users are primed to pay and already understand planning leads.

3. **Bark credit urgency counter**: Bark's 3-month expiry is now a pain point actively discussed by trades. Add copy on pricing/free-tools pages targeting "wasted Bark credits" — "Stop buying credits that expire. One £39/mo scan finds jobs before they're posted anywhere."

---

## TOP 3 UNFINISHED VAULT PRIORITIES

1. **Stripe Checkout end-to-end** — appears in every daily log since 14 May. Oldest open blocker. No paid user can exist without it.
2. **`VITE_OPEN_ACCESS=false` in Firebase env** — also in every log since 14 May. Site is currently open-access in production. This must close before any public push.
3. **PricingPage "Full" vs "Unlimited" contradiction** — flagged 18 May Run 2, not fixed. Conversion page with inconsistent copy undermines trust at the moment of purchase decision.

---

## RECOMMENDED NEXT BUILD ACTIONS

- Wire Stripe Checkout with test key — confirm payment flow end-to-end (Founding 30 + Standard)
- Set `VITE_OPEN_ACCESS=false` in Firebase hosting env and verify lead gating holds
- Fix PricingPage "Full" vs "Unlimited" language in comparison table
- Add `/compare-buildalert` page (1-day build — BuildAlert users are warm, primed audience)
- Add "TradeMore fills your calendar / JobFilter fills it" counter-positioning to HomePage WAR ROOM section

---

---

## NEW RESEARCH — 2026-05-19 UPDATE

### Checkatrade — PRICING CRISIS FOR MEMBERS

**Confirmed renewal pricing spikes:**
- Multiple tradespeople on forums reporting renewals from £756/yr → £2,160/yr (185% increase)
- Others going from £800/yr → nearly £2,000/yr
- Entry-level self-reported at £80-£100/mo; heavy users paying £200-£400/mo before single job
- **14-day cancel window** then locked for a full year — this is the most complained-about feature
- Loyal members paying £80/mo MORE than new members (as confirmed in multiple Trustpilot reviews)
- Lead quality declining as platform grows: "as a tradesman, the company is getting worse every year"
- TradeMore (their AI job management tool) confirmed free and open to ALL trades — not just members. Confirms the direction is platform stickiness, not lead quality.

**Attack angle:** Price volatility at renewal is the strongest lever. Checkatrade customers never know what they'll pay next year. JobFilter founder price is locked forever while active. This is a direct, factual contrast.

### Bark.com — CREDIT EXPIRY CONFIRMED LIVE

**Live issues:**
- Credits purchased from 1 November 2025 expire in **3 months**. This is now live and generating active complaints.
- Standard credit cost: £1.80 ex VAT. Lead cost: 5-20 credits = £9-£36 per lead shared with 3-5 trades.
- "99% of leads don't respond" — recurrent complaint across G2, Trustpilot, PissedConsumer
- Fake lead problem confirmed: AI anti-fraud "obviously isn't advanced enough" per multiple reviews
- Credit refund policy: Bark will not refund credits if the lead "replied and then went quiet"

**Attack angle:** "Stop buying credits that expire. Stop paying for leads that ghost you. One £39/mo scan finds jobs before they're posted anywhere."

### MyBuilder — COST CREEP CONFIRMED

- Pay-per-shortlist: £25-£65 per expression of interest, before selection
- Tradespeople spending £100-£300 before a single won job is the norm, not the exception
- One report of being charged £72 for a job that never materialised — no recourse given
- Homeowner shortlists 6+ trades per job — your odds of winning are <17%

**Attack angle:** "MyBuilder takes your money before you're chosen. JobFilter shows you the job before there's anyone to compete against."

### Rated People — SUPPORT COLLAPSE

- New "Unlimited" plan at an undisclosed monthly fee (they don't publish it clearly)
- Lead costs: £2-£65 per lead + monthly subscription — shared with up to 3 trades
- Customer support replaced by AI chatbot — 2-month wait reported for support tickets
- Membership fees doubled in recent cycle per forum reports

**Attack angle:** When something goes wrong with a lead or billing, there's no human to call. "We answer. Actual humans."

### TrustATrader — DIRECTORY MODEL, NO EVOLUTION

- £70-£120/mo for a listing — pure directory, consumer-pulls model
- No proactive lead gen. No scoring. No signals. You wait to be found.
- Trustpilot reviews indicate vetting is inconsistent

**Attack angle:** "TrustATrader lists you. JobFilter finds you work."

### Houzz Pro — WRONG MARKET FOR UK TRADES

- Starting at ~$399/mo (~£320/mo) — aimed at architects and interior designers, not tradespeople
- 12-month auto-renew with 1-month notice required to cancel
- Lead quality complaints: "few leads, often of poor quality or irrelevant"
- UK coverage thin — US-first product

**Attack angle:** Irrelevant for most UK tradespeople. Price point rules it out for sole traders.

### Local Heroes (British Gas) — CLOSED

- **Platform shut down in October 2023.** No longer a competitor.
- Any tradespeople still searching for "Local Heroes alternative" are warm prospects.

### Buildxact / Procore / Buildertrend — NO LEAD GEN

- All three are project management / estimating tools. None do proactive lead gen.
- Buildxact has a "lead management" module for tracking leads you already have — not finding new ones.
- No UK-specific lead discovery features found.
- **Not a competitive threat.** Different category entirely.

### New AI Entrants — STILL NO DIRECT COMPETITOR

- Building Radar: AI for construction sales intelligence — enterprise only, international, not UK-trades focused
- HelloLeads.co.uk: Construction technology leads — appears to be a generic lead gen agency
- MHCLG's "Extract" tool: Government AI for converting planning PDFs to structured data — for councils, not trades, no consumer product
- No new entrant found combining planning data + EPC + council contracts + WhatsApp delivery + scoring for UK tradespeople

---

## HOW TO ATTACK EACH WEAKNESS IN CONTENT

| Competitor | Core Weakness | Content Angle to Run |
|---|---|---|
| Checkatrade | Price doubles at renewal. 14-day cancel trap. | "What Checkatrade charges you at renewal" — use real figures from forums. Drive to /vs/checkatrade. |
| Bark.com | Credits expire in 3 months. Leads ghost you. Fake leads. | "Stop buying Bark credits that expire" — calculator showing waste. Drive to /pricing. |
| MyBuilder | Pay before selected. <17% odds. No recourse. | "MyBuilder charges you whether you win or not" — maths post. Drive to free scan. |
| Rated People | Support collapsed. Doubled fees. | "Who do you call when a Rated People lead goes wrong?" — answer: nobody. |
| Houzz Pro | Wrong price tier for UK trades. | Ignore — not a real competitor for this market. |
| TrustATrader | Passive directory. No first-mover advantage. | "Listing yourself isn't lead gen. This is." |
| All shared-lead platforms | Same lead, 5 firms, price war | Homepage hero "THE OLD WAY: 5 FIRMS GET THE SAME LEAD. YOUR WAY: SEE IT FIRST, ALONE." — already live on site. |

### Content to produce next (prioritised by warm audience size)

1. **"What Checkatrade charged me at renewal"** — forum-sourced, factual, SEO: "checkatrade renewal price increase 2026"
2. **"Bark credits calculator"** — show how much you waste if 60% of leads ghost you with 3-month expiry
3. **"MyBuilder: the maths no one shows you"** — cost per won job worked out honestly
4. **"/vs/mybuilder page"** — same format as /vs/checkatrade, now live on site
5. **"Local Heroes is closed — here's what to use instead"** — capture that search traffic

---

*Date updated: 2026-05-19 | Next review: 2026-06-02*

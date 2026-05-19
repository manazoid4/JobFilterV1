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

*Date: 2026-05-19 | Next review: 2026-06-02*

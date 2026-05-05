# 🧱 BUILDER AGENT PROMPT
*Research run: 4 May 2026 | Sources: live web search via Exa MCP*

You are the Builder Agent for JobFilter. Build toward launch revenue.

Act immediately. Do not ask questions. Make working changes. One high-impact revenue task at a time.

---

## What Changed Since Last Run

Stripe, Auth, and WhatsApp are still the three revenue blockers. Nothing on the core engine has broken. Free tier gating holds at 5 leads. Lead quality 42/42. The quoting market has exploded — 7+ new AI quoting tools launched since Jan 2026, all priced £10–£80/mo. JobFilter's "filter before the quote" angle is now even more important and differentiated. The window to own this space is open but will close.

---

## Competitive Landscape Update (May 2026)

### AI Quoting — Now a Crowded Commodity

Every new tool below does: describe job → AI itemised quote → branded PDF → send via WhatsApp or email.

| Tool | Price | Key Angle | Threat Level |
|---|---|---|---|
| BuildScope | £29/mo | Voice-to-quote, CIS, 370+ material prices | Low — post-lead |
| TradeFlow AI | £27.99/mo | Auto-chase on quotes, 60s quote, WhatsApp send | Low — post-lead |
| Quotable | £14.99/mo | Real-time Screwfix/Toolstation prices, scheduling | Low — post-lead |
| QuoteGuru | £9.49–£14.49/mo | AI pricing from quote history, push notifications | Low — post-lead |
| PriceUp | £19.99/mo | Voice-first, no-signup demo, WhatsApp sharing | Low — post-lead |
| QuoteSmith | £39/mo | AI proposal generator, UK trade terms | Low — post-lead |
| PricingPro | £79.99/mo | 60,000+ live prices, white-label API | Low — B2B focus |
| Quote My Build | £29.99/mo | Planning + quoting, trade calculators | Low — post-lead |

**Conclusion**: Quoting market saturated. Every tool assumes you already have a lead worth quoting. JobFilter is upstream of all of them. The pitch: "Don't quote dead leads. Let JobFilter find the ones worth quoting."

### Unified Inbox / CRM Tools

| Tool | Key Angle |
|---|---|
| TradeMore | WhatsApp + Checkatrade + Email in one inbox |
| Welch Marketing CRM | Lead scoring, auto-chase, review requests |
| SmartFlow (GrowthSpark) | WhatsApp agent for inbound leads |

Post-lead management tools. Not JobFilter's space. Note: TradeMore integrates with Checkatrade — tradesmen already treat Checkatrade leads with low trust. Market understands lead quality is the real problem.

### Niche Competitors (Researched — Not Relevant)

- **Dikaio AI**: Greek legal AI. Wrong market.
- **Scoop Solar**: US solar field ops. Not UK trades.
- **Siteflo**: Construction site AI for GC teams. Enterprise, not sole traders.
- **Construction AI**: Enterprise construction management. Not our user.

### What to Copy From New Competitors

From **BuildScope**: Free tier clearly shows limits before paywall. "14 days free, no card" reduces friction hard. Single transparent price point.

From **TradeFlow AI**: "£6.99/week" framing makes £29/mo feel tiny. Auto-chase copy: "TradeFlow chases, you stay focused on the work." Voice quote angle is fast to grasp.

From **PriceUp**: "No signup required. Create a quote in 30 seconds" — zero-friction demo. Founder pricing locked for life builds loyalty.

From **Quotable**: Source confidence on every line item ("See price sources and confidence levels"). JobFilter already does source confidence on leads. Use this exact language pattern.

---

## WhatsApp Intelligence (Critical)

Live UK market data, April 2026:

- **89–95%** of UK trades businesses run customer comms on WhatsApp
- **98% open rate** vs 20% for email
- Auto-chase on outstanding quotes = **20–30% higher close rate**
- WhatsApp Business API costs: **£0.03–0.05/message** (Twilio pricing)
- Total cost for 200–300 automated messages/month: **£6–15 in message fees**
- Transactional messages (job alerts, lead signals): no opt-in required legally
- Marketing messages (offers, promotions): need consent

**JobFilter implication**: WhatsApp delivery is not a nice-to-have. It is the core delivery mechanism. Every tradesman expects it. At £0.03–0.05/message, a daily gold lead alert costs pennies. Wire Twilio now.

For 30 Pro subscribers getting 1 gold alert/day: ~£37/month in API costs. Covered by one subscription.

---

## Product Direction (Updated)

JobFilter is the only UK tool that answers: "Which jobs near me are worth chasing this week — before I waste an evening quoting?"

Competitors help AFTER the lead exists:
- BuildScope, TradeFlow, Quotable = quote faster
- TradeMore, Welch CRM = manage inbound leads
- Time To Scale, Raretrade = generate more (still shared, untargeted)

JobFilter's wedge: **"The filter before the quote."**

Core promise:
> JobFilter scans official UK construction signals — planning approvals, public contracts, EPC data — filters out weak jobs, scores what's left, and sends only the ones worth your time straight to WhatsApp. Before everyone else sees them.

Secondary angle to test:
> "Every quoting tool assumes you've already got a lead worth quoting. JobFilter is what you need first."

---

## Revenue Priority (Unchanged — Still Blocked)

### 1. Stripe Payments — CRITICAL BLOCKER

Build:
- Stripe Checkout Session for Pro (£49/mo) and Founding 30 (£29/mo)
- Annual billing: £408/yr Pro, £240/yr Founding 30
- Hard cap at 30 Founding members (counter + lock)
- Plan tier stored in user metadata
- Success/failure redirect pages

User flow: "UNLOCK PRO" → Stripe Checkout → success redirect → full lead details unlocked

Use Stripe pre-built Checkout. No custom payment form.

Weekly framing for pricing page: "£49/month = £1.63/day. Win one decent job and it's covered for 6 months."

### 2. Auth + Accounts — SECOND BLOCKER

Build:
- Firebase Auth: email/password + Google
- Simple sign-up/sign-in flow
- Account page: plan, saved leads, WhatsApp status
- Free tier limit (3 scans/week) enforced per user server-side

Do not build: teams, roles, admin dashboard, multi-tenant anything.

### 3. Real WhatsApp Delivery — THIRD BLOCKER

Twilio keys are missing. Configuration task, not a build task.

Wire Twilio WhatsApp:
- Trigger on gold-tier lead match
- Alert format (keep exactly):
```
GOLD LEAD — {trade}
Area: {outward} / {region}
Value: {value}
Urgency: Deadline soon
Why it matters: Official {source}, buyer named, strong trade match
Action: {url}
```
- Add opt-in toggle in account settings
- Test one live gold lead end-to-end before claiming done

---

## What To Fix Next (Revenue-Critical, Smaller)

4. **Server-side lead storage** — localStorage is a regression risk. Firestore per user.
5. **Free tier enforcement server-side** — currently unlimited for testing. Enforce 3 scans/week per auth user.
6. **Letterhead Pack purchase path** — "invite only" with no buyable flow. Add Stripe checkout.
7. **Companies House API key** — blocked until key arrives. Flag in UI: "Enhanced contact data — coming soon."

---

## Landing Page Tweaks

Do not rebuild the homepage. Tweak only:

1. Add near hero: "While other tools help you quote faster — JobFilter tells you what's worth quoting in the first place."
2. Add to pricing: "£49/month. One job covers it."
3. Every free tool page → add CTA: "See what jobs are live near you →" linking to `/find-jobs`
4. Founding 30: show "X spots remaining" live counter. Creates urgency.
5. Once Stripe is live: every "UNLOCK PRO" → direct Stripe Checkout, not pricing page.

---

## UX/UI Instructions

Keep trade-first, high-contrast style. No changes to lead card hierarchy.

New copy to test on free-tier lock overlay:
> "7 builders near you have already seen this lead. Unlock before it goes cold."

Labels to use:
- GOLD / WORTH CHECKING / LOW SIGNAL
- FULL DETAILS ON PRO
- SEND TO WHATSAPP
- VIEW OFFICIAL SOURCE

Labels to never use:
- "AI-powered" as primary message
- "Synergy", "optimize", "leverage", "dashboard"
- "Leads" in isolation (use "Intake Engine" or "signals")

---

## Conversion Optimisation

- Home → `/find-jobs` (free scan, no login)
- Scanner results → free cards → lock overlay on gold → Stripe checkout
- No results → "Get WhatsApp alerts when gold leads match your trade" → waitlist → Stripe
- Pricing → Founding 30 counter → Stripe
- Free tool pages → "What jobs are live near you this week?" → `/find-jobs`

Revenue framing:
- "One decent job pays for the month."
- "No shared lead auction."
- "Official signals. Before the cowboys see them."
- "Stop paying with your evenings."
- "£49/month. Win one £800 job and it's covered."

New framing from competitive research:
- "Don't quote dead leads." (jab at quoting tool market)
- "The filter before the quote."
- "Your competitors are already on the tools by the time you're still writing quotes for dead jobs."

---

## Competitive Advantage (Full Stack View)

| Competitor | What They Do | JobFilter Position |
|---|---|---|
| BuildScope / TradeFlow / Quotable | Quote faster after you have the lead | JobFilter tells you which leads are worth quoting |
| Checkatrade / MyBuilder / Bark | Shared lead auctions, price wars | JobFilter shows official signals before anyone else |
| Time To Scale / Raretrade | More website leads (still untargeted) | JobFilter filters for quality, not quantity |
| TradeMore / Welch CRM | Manage inbound leads better | JobFilter is upstream — better leads before the inbox |
| Unmissed | Catch missed calls | JobFilter finds calls worth taking in the first place |

Full tradesman stack:
1. **JobFilter** → which jobs to chase (upstream, pre-quote) ← JobFilter owns this
2. BuildScope / TradeFlow → how to quote them fast
3. Unmissed / TradeMore → catch everything inbound

JobFilter owns step 1. Step 1 is the only step that saves evenings.

---

## Market Understanding (Reinforced)

Users want:
- To know which leads are worth the time BEFORE quoting, calling, or travelling
- WhatsApp delivery — not email, not an app they must open
- Proof the lead is real: source, date, planning ref, buyer signal
- One clear monthly price with no per-lead sharing fees
- Speed: see the lead before competitors

Users hate:
- Paying £20–50 per lead that goes nowhere
- Quoting against 4 others for the same job
- Driving 40 mins for a tyre-kicker
- Spending evenings on WhatsApp pricing dead jobs
- Software that feels like admin

What makes them buy:
- "One good job covers the month" — back it with specific examples
- Gold lead shown on free preview (partially) — they see it exists but can't act without paying
- WhatsApp delivery is the hook — "comes to your phone before anyone else sees it"
- Founding 30 scarcity — "30 spots at £29/mo, then £49"
- No shared leads, ever

---

## Execution Behaviour

Rules:
- Do not ask questions
- Do not redesign working pages
- Make modular changes only
- Lead quality above UI polish
- Never fetch data in frontend except through backend endpoints
- Never simulate AI logic in UI
- Never invent fake leads
- Never leave build broken
- Run `npm run lint` and `npm run build` after every change
- Output directory must remain `dist`

Build order:
1. Stripe payments
2. Firebase Auth + accounts
3. Real WhatsApp delivery (Twilio)
4. Server-side lead storage (Firestore)
5. Free tier enforcement (server-side per user)
6. Letterhead Pack purchase path
7. Companies House key (when key arrives)

---

## Self-Improvement Check

Before finishing any build task:
- Would a busy tradesman understand this in under 10 seconds?
- Does this move us closer to taking money?
- Is the paid value clear without blocking the app?
- Does `npm run build` pass?
- Are free users gated from paid detail?
- Would this embarrass us if a competitor saw it?

If any answer is no — improve before final response.

---

## Launch Scenario Simulation — 5 May 2026

### S3 — Strong lead, free user sees it

A free user who scans and gets a GOLD lead (score >= 80) sees: the title (shortened tender name or "Electrical opportunity near B14"), trade, location, outward code, and a vague value band ("Paid job signal" or "Strong-value job") — never the actual figure. Buyer, deadline, URL, and urgency are hardcoded to "Unlock on Pro". The paywall is technically present but structurally passive: it reads like a disabled form, not a decision moment. The lock overlay copy ("Unlock on Pro") repeats four times across the same card with no specificity, no stakes, and no time signal. A £4k bathroom refit would show "Paid job signal" — indistinguishable from a £1k job. Fix: for GOLD leads only, surface a specific value band in the free preview ("£3k–£5k job signal") and replace the repeated lock copy with one sharp line that creates real friction — "6 builders in your area can see this. Unlock before it goes cold." This turns the paywall from a UI label into a conversion trigger.

### S7 — Tradesperson views lead 3 times without converting

Currently the product has no session memory, no view tracking, and no auth. A free user who returns to the same lead three times sees the same static card each time — no nudge, no urgency escalation, no acknowledgement of repeated intent. Fix is two-part: (1) Before auth exists, write a simple localStorage view counter per lead ID and show an in-card banner after 2 views: "You've looked at this 3 times. £49 unlocks the buyer, deadline, and phone signal — then it's yours." This fires on real intent and takes under an hour to wire. (2) Once Firebase Auth is live, move tracking server-side (Firestore per user) so the nudge persists across devices and sessions. The nudge must reference the specific lead, not a generic pricing page — a generic upsell at this moment will be ignored.

### S15 — Brand new user, first session, no context

A cold user landing on the homepage today sees "CONTROL THE JOBS." in large type, a static mock lead card (hardcoded electrical tender), and two CTAs. This works for a tradesperson who already knows what lead filtering means. For someone arriving cold it does not answer "what does this actually do" in the first visual beat — the hero is positional, not descriptive. The `WhatsAppPreview` component exists in `HomePage.tsx` but is never rendered. Fix three things: (1) Add one concrete sub-headline directly under "CONTROL THE JOBS." — "JobFilter scans official UK planning and tender signals, scores them, and sends the ones worth quoting straight to WhatsApp — before your competitors see them." (2) Render `WhatsAppPreview` alongside the mock lead card in the hero so the delivery mechanism is visible in the first 5 seconds. (3) On mobile, the "FREE SCAN" CTA currently stacks below the fold — move it above or make it the only CTA in the mobile hero view. Cold users need to see value before they see a price.

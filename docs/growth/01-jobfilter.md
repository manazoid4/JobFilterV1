# 01 — JobFilter: Brand Site, Social & Microsite Growth Loop

**Goal:** widen JobFilter's audience of small UK trade/construction firms and convert them to
signups — via (A) a marketing/brand presence, and (B) per-customer branded microsites
(`jobfilter.uk/{business}`) that double as a viral growth loop.

**Brand guardrails (from `PRODUCT.md`):** Bold, high-contrast "DeWalt" aesthetic —
Yellow / Navy / Black, Barlow + Barlow Condensed. Direct, aggressive, trade-focused. No
"AI" buzzwords, no muted glassmorphism SaaS look. Never imply exclusive leads or a
guaranteed award — the promise is **BID / WATCH / SUBCONTRACT / SKIP** qualification.

---

## 1. Positioning

**One-liner:** *"Stop reading tender notices that were never going to fit. JobFilter tells
you — bid, watch, subcontract, or skip — for public work near you, in your trade."*

- **Category we own:** helping *small* firms decide if *public* work is worth chasing.
- **Against free FTS alerts:** "Find a Tender emails you noise. JobFilter tells you what to
  do about it."
- **Against bid portals (Tracker/Tenders Direct):** "Built for a firm of five, not a bid
  team of fifty. No jargon, no £5k contract."
- **Against Checkatrade/MyBuilder:** "Not domestic call-outs. Real public contracts, and an
  honest read on whether you'd win."

---

## 2. Two-part growth strategy

### Part A — JobFilter's own brand & acquisition site
A marketing presence whose only job is to turn trade firms who've never heard of us into
scans and signups.

### Part B — Per-customer microsites (`jobfilter.uk/{business}`) — the growth loop
Each customer gets a clean, credible, branded page (past work + trust + contact + "verified
on public contracts"). This is both a **retention/trust feature** and a **distribution
engine**: every time a tradesman shares their page on a quote, WhatsApp, van QR, or Facebook,
a "Powered by JobFilter" mark exposes new prospects → some become users. This is the
Calendly/Linktree footer loop applied to trades. It builds directly on the existing
`/vicinity` (past-work marketing) and `/vantage` routes.

---

## 3. Part A — Brand & acquisition site

### Site architecture (marketing surface)
```
/                     Home — hook, proof, one CTA (run a free scan)
/find-jobs            Live scanner (already exists) — the product
/how-it-works         Bid/Watch/Subcontract/Skip explained with a real notice
/win-public-work      Pillar hub page (SEO cornerstone)
/trades/{trade}       Programmatic landing pages per trade (electrician, plumber, roofer…)
/areas/{region}       Programmatic landing pages per region/patch (optional, phase 2)
/stories              Customer stories / microsite showcase (social proof)
/pricing              Pricing (exists)
/free-tools           Quote/job/diesel tools (exists) — top-of-funnel magnets
/tips                 Tips for tradesmen (exists) — content hub
```

### Content pillars (the engine)
1. **Win public work (education):** "How councils actually buy [trade] work", "Your first
   framework", "What a NUTS code means for whether you can bid".
2. **Bid/no-bid teardowns:** take a *real* anonymised FTS notice and walk through the
   qualification live. This is the signature format — shows the product without a demo.
3. **Trade business growth:** pricing, quoting, cashflow, chasing — broad top-of-funnel that
   pulls the audience in (pairs with existing `/free-tools` and `/tips`).
4. **Behind the build / trust:** how JobFilter sources notices, why we redact, why we never
   promise exclusivity. Honesty as a differentiator.

### SEO — the primary acquisition channel
Trades buy from Google. Target intent clusters:

| Cluster | Example queries | Page |
| --- | --- | --- |
| Public-work how-to | "how to win council contracts uk", "how to bid for public sector work small business" | `/win-public-work` + blog |
| Trade × procurement | "council electrical contracts", "public sector plumbing tenders uk" | `/trades/{trade}` |
| Find-a-Tender helpers | "find a tender explained", "contracts finder vs find a tender" | blog |
| Tools/magnets | "free quote template uk trades", "day rate calculator" | `/free-tools` |

- Own **Google Business Profile** and get JobFilter into "how do I win public work" answers.
- Programmatic `/trades/{trade}` and `/areas/{region}` pages give scalable long-tail
  coverage (guard quality — real data, no thin doorway pages).
- Every content piece ends with one CTA: **run a free scan for your trade + postcode.**

### Social channels (ranked by fit for this audience)
1. **Facebook (primary):** a JobFilter page + genuine participation in trade/community
   groups (value first, not spam). Short "did you know councils publish this?" clips.
2. **YouTube:** own "how to win public work" as long-form + Shorts. Bid/no-bid teardowns are
   evergreen and rank in Google too.
3. **TikTok / Instagram Reels:** POV tradesman short-form — "I run a 3-man firm, here's a
   £40k council job I nearly missed." Repurpose the teardowns.
4. **LinkedIn (secondary):** for larger subbies, principal contractors, and framework
   conversations — different, more B2B tone than Facebook.

### Owned asset
Email/WhatsApp list: "The Weekly Notice" — one qualified public opportunity type per week
per trade + one bidding tip. Turns rented social reach into an owned, re-engageable audience.

---

## 4. Part B — Microsite growth loop (feature + distribution)

### What each microsite is
`jobfilter.uk/{business-slug}` — a fast, DeWalt-branded page for a customer's firm:
- Firm name, trade(s), patch/areas covered, contact + call/WhatsApp button.
- **Past work / vicinity** gallery (their proof — ties to existing `/vicinity`).
- Trust markers: years active, accreditations (customer-supplied), "actively bidding public
  work" signal (never implies an award or exclusivity).
- Clear, mobile-first, loads instantly (they'll open it on-site with gloves on).
- A tasteful **"Powered by JobFilter"** mark linking back → the loop.

### Why it grows JobFilter (the loop, step by step)
1. Customer signs up → generates their microsite in minutes.
2. They **share it everywhere** they already market: on quotes, email signatures, WhatsApp,
   van/business-card **QR code**, Facebook, their Google profile.
3. Every viewer (homeowners, buyers, *other tradesmen*) sees "Powered by JobFilter".
4. A fraction click through → land on JobFilter → run a free scan → sign up.
5. Loop repeats. Zero paid acquisition; distribution rides on customers' existing marketing.

### Make the loop measurable
- Unique referral param on every "Powered by JobFilter" link (`?ref={business-slug}`).
- Track: microsites created → microsite pageviews → click-throughs → referred signups.
- **Referral incentive:** free month (or upgraded tier) when a shared microsite drives N
  signups. Turns the loop into a deliberate referral program.

### Upsell / monetisation angles (later)
- Custom domain (`{business}.co.uk` → their JobFilter microsite) as a paid tier.
- Remove "Powered by JobFilter" mark = paid (classic free-loop monetisation), **but** keep
  the mark on free tier because the mark *is* the growth engine.
- Lead-capture form on the microsite (homeowner enquiries) as a value-add.

### Product work this implies (hand-off to eng, not part of marketing spend)
- Slug/reservation system (`jobfilter.uk/{slug}`) + collision handling.
- Microsite generator UI in the dashboard (extends `/vicinity`/`/vantage`).
- Referral attribution plumbing (`?ref=` → signup source, already partially modelled — see
  `waitlist` `source` field).
- SSR/edge-cached public pages for speed + SEO.

---

## 5. 90-day plan (JobFilter)

**Month 1 — Foundation**
- Ship `/win-public-work` pillar + 4 cornerstone articles + 2 bid/no-bid teardowns.
- Stand up Facebook page + YouTube channel; publish 4 Shorts (repurposed teardowns).
- Launch "The Weekly Notice" email; add capture to `/free-tools` and `/find-jobs`.
- Spec + start the microsite MVP (generator + `?ref=` attribution).

**Month 2 — Microsite launch + content cadence**
- Ship microsite MVP to existing users; onboard first 10–20 firms, get their pages live.
- 2 articles/week + 3 Shorts/week (teardowns + trade-growth). One long-form YouTube.
- Seed 3–5 relevant Facebook trade groups with genuine value (not links).
- Launch `/stories` showcasing the first live microsites (social proof + SEO).

**Month 3 — Compound + referral loop**
- Turn on the referral incentive; publicise "share your page, get a free month".
- Double down on the 2–3 content formats that pulled best; kill the rest.
- Add programmatic `/trades/{trade}` pages for the top 6 trades.
- Review SEO rankings, microsite share→signup conversion; reset Q2 targets.

## 6. KPIs

| Metric | Why it matters | 90-day target (starter) |
| --- | --- | --- |
| Free scans run | Top-of-funnel intent | steady week-on-week growth |
| Signups | Core growth | baseline set Month 1, +compounding |
| Microsites created | Loop supply | 20+ live by end of Month 2 |
| Microsite pageviews → click-throughs | Loop health | measurable CTR by Month 3 |
| Referred signups (`?ref=`) | Loop payoff | first referred signups by Month 3 |
| Organic sessions / ranking keywords | SEO compounding | first page-1 rankings by Month 3 |
| Email list size + open rate | Owned reach | list live, healthy opens |

## 7. Guardrails / do-not
- Never say "exclusive", "guaranteed", or "we get you the contract". BID/WATCH/SUB/SKIP only.
- Microsites must not fabricate accreditations or work — customer-supplied, honest.
- No AI buzzwords in copy. Keep the DeWalt voice everywhere.
- Programmatic pages must carry real value/data — no thin doorway pages (Google penalty risk).

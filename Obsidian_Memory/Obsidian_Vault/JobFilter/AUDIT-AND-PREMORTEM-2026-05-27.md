---
type: audit-and-premortem
project: JobFilter
date: 2026-05-27
status: active
tags: [jobfilter, audit, premortem, launch-readiness]
---

# JobFilter — Comprehensive Audit + Pre-Mortem
**Date:** 2026-05-27  
**Scope:** Full product, tech, business model, and market position  
**Method:** Pre-mortem framing — imagine it's November 2026, six months after launch. JobFilter has failed. Why?

---

## HOW TO USE THIS DOCUMENT

This audit has two halves.

**Part 1 — Audit** is a clear-eyed read of what exists right now: what works, what's broken, what's a lie.

**Part 2 — Pre-mortem** works backwards from failure. Each scenario is a specific way the product dies in six months. The point is to find the kill shots before they land.

Read both. Fix the ones that kill you. Deprioritise the ones that don't.

---

# PART 1 — COMPREHENSIVE AUDIT

## 1. PRODUCT TRUTH CHECK — What Is Actually Live and Real?

This is the most important section. Before anything else, know what you've actually shipped versus what you've promised.

### Real and Working
| What | Status | Notes |
|------|--------|-------|
| ContractsFinder leads | ✅ Live | Public API, no key needed. Real tender data. |
| Find a Tender leads | ✅ Live | Public API, no key needed. Real OCDS data. |
| PlanningData leads | ✅ Live | Public API. Schema has changed before — fragile. |
| Public Contracts Scotland | ✅ Live | Scottish tender coverage. |
| DirectorySignal fallback | ✅ Live | Internal. Always fires when other sources return 0. |
| Lead scoring (GOLD/SILVER/BIN) | ✅ Built | Logic exists, scores generated client-side. |
| Free tier lead preview | ✅ Working | Contact details, buyer, value, URL locked correctly. |
| Stripe integration (code) | ✅ Built | Checkout session + webhook code exists. |
| Supabase auth (code) | ✅ Built | Login, signup, reset password all wired. |
| WhatsApp templates | ✅ Built | Templates exist, copy-to-clipboard works. |
| Build pipeline | ✅ Clean | `npm run build` passes. TypeScript clean. |

### Partially Real / Key-Gated
| What | Status | Risk |
|------|--------|------|
| Companies House signals | ⚠️ Key needed | Silently skipped without API key. Not confirmed live. |
| Land Registry signals | ⚠️ Mock data | Returns fabricated results. Presented as real signals. |
| WhatsApp delivery | ⚠️ STUB | `sms.ts` can report success without a real Twilio call. Users think it fired. It did not. |
| Paid gating | ⚠️ Test-mode | `server/routes/leadsSearch.ts` not wired to real auth/subscription state. Full-depth leads available without paying. |
| Free scan limit | ⚠️ UNLIMITED | Should be 3/week. Not enforced. Any user can scan unlimited times. |

### Not Real / Missing
| What | Status | Impact |
|------|--------|--------|
| Delivery lock key | ❌ Not implemented | Same GOLD lead can go to 10 plumbers in the same patch. Core brand promise broken. |
| Founding 30 cap (server-side) | ❌ Not enforced | Cap is aspirational. No Supabase counter preventing 31st signup at founder price. |
| Privacy Policy page | ❌ Missing | UK GDPR enforcement risk. Cannot legally collect email/data without this. |
| Terms of Service page | ❌ Missing | No legal protection for the business. No user contract. |
| Cookie consent notice | ❌ Missing | UK PECR compliance. Mandatory. |
| Physical letter delivery | ❌ Aspirational | EpcPage references "professional introductory letter." No backend exists for this. |
| Real subscription state check | ❌ Not wired | `server/routes/subscriptionStatus.ts` exists but not registered in `server/app.ts`. |
| Supabase lead persistence | ❌ localStorage only | Leads not stored server-side. If user clears browser: data gone. |

---

## 2. ARCHITECTURE — The Frankenstein Stack

**Severity: CRITICAL. Blocks SEO, slows all future dev, raises ongoing bug risk.**

The app runs Next.js App Router, Vite config, Express server, and a React Router SPA simultaneously. The SPA loads with `ssr: false`, which means the server returns an empty HTML shell with a loading spinner.

**Concrete damage:**
- Google indexes an empty div. All 45+ pages are invisible to search engines. City SEO pages (`/construction-leads/birmingham`, `/trade/plumbers`) exist in code but generate zero organic traffic.
- Cold load on slow mobile: user sees a loading spinner while the entire JS bundle downloads before any content renders. On a 3G/4G rural connection this is a 4–8 second blank screen.
- API double-routing: Express server at `server/app.ts` + Next.js API catch-all at `pages/api/[[...path]].ts` + Next.js App Router API (`app/api/stripe/webhook/route.ts`). Three API layers for one product.
- Dead `vite.config.ts` and `index.html` still in root. Confuses every new developer, confuses tooling.

**The fix is not urgent for V1 launch on a small user base but is a hard ceiling on SEO growth.** City and trade landing pages must be server-rendered or statically generated before organic acquisition can work.

---

## 3. SECURITY — Vulnerabilities and Exposure

**Severity: HIGH for some, Moderate for most.**

| Issue | Risk Level | Status |
|-------|-----------|--------|
| 19 npm vulnerabilities (6 high) | HIGH | Unpatched. High severity includes ReDoS (undici) + memory exhaustion. |
| No rate limiting on `/api/leads/scan` | HIGH | Any bot can hammer the endpoint. Exhausts API quota + runs up Supabase/Twilio bill. |
| Firebase API key committed | HIGH (historical) | Was committed in `firebase-applet-config.json`. Should be rotated — confirm rotation happened. |
| No auth on scan API | MODERATE | Anyone can call it. Not just rate-limited — entirely open. |
| PII logging in `server.ts` | MODERATE | Email/name written to stdout in logs. Rotated or monitored? |
| Hardcoded fallback leads in production | MODERATE | `SCAN_FALLBACK` in `server.ts` + `FALLBACK_LEADS` in `src/App.tsx`. Risk: paid users billed for fake fallback data. |
| NEXT_PUBLIC_OPEN_ACCESS not confirmed | HIGH | If this is `true` in production Vercel env, all paid gating is bypassed for everyone. |

**Immediate actions:**
1. Run `npm audit fix` — resolve the 6 high-severity vulnerabilities.
2. Add `express-rate-limit` to `/api/leads/scan`. Five requests per IP per minute is a reasonable start.
3. Confirm Firebase key rotation happened. If not, rotate it now.
4. Confirm `NEXT_PUBLIC_OPEN_ACCESS=false` is set in Vercel production environment.

---

## 4. PAYMENTS AND SUBSCRIPTIONS

**Severity: CRITICAL. Product cannot make money without this working.**

| Item | Status |
|------|--------|
| Stripe Checkout code | ✅ Written |
| Stripe live end-to-end test | ❌ Never completed |
| Stripe webhook secret verified | ❌ Not confirmed in production |
| Founding 30 cap (Supabase counter) | ❌ Not built |
| Annual billing | ✅ Code exists |
| Subscription state exposed to API | ❌ Not wired. Full depth available without paying. |
| Post-payment activation flow | ⚠️ Partial. `ActivationPendingPage` exists. |

The subscription system exists in code but has never been tested end-to-end with real money. It is possible to write perfect copy, get 50 sign-ups, and have zero revenue because the payment flow silently breaks.

**The one required test before launch:** Run a real Stripe test-mode checkout, pay, trigger the webhook, confirm the Supabase record updates, confirm the user sees paid features. If this doesn't work in one clean pass, launch is blocked.

---

## 5. AUTH AND ACCOUNTS

| Item | Status |
|------|--------|
| Supabase auth (login, signup, reset) | ✅ Working (Next.js routes wired as of 26 May) |
| Multi-tenant data isolation | ❌ Not confirmed. Risk of user A seeing user B's leads. |
| Hardcoded single-user removal | ❌ Not confirmed |
| Lead persistence (server-side) | ❌ localStorage only |
| Scan counter per user | ❌ localStorage only (should be Supabase) |

The most dangerous unchecked item here is multi-tenant isolation. If two paid users can see each other's saved leads, scan history, or outcomes, it's a serious data leak. This needs explicit test coverage before first paid user is onboarded.

---

## 6. LEAD QUALITY AND DATA PIPELINE

| Source | Real? | Locality Accurate? | Contact Available? | Notes |
|--------|-------|-------------------|--------------------|-------|
| ContractsFinder | ✅ | ✅ | Buyer + deadline | No direct homeowner contact — this is tender data |
| Find a Tender | ✅ | ✅ | Buyer org only | Same as above |
| PlanningData | ✅ | ⚠️ BUG | Address only | Broad fallback stamps non-local records with searched postcode |
| PCS (Scotland) | ✅ | ✅ | Buyer only | Scotland only |
| Companies House | ⚠️ Key needed | ✅ | Registered address | Silently skipped without key |
| Land Registry | ❌ Mock | N/A | N/A | Returns fabricated data |
| DirectorySignal | Internal fallback | N/A | N/A | Fires when real sources return 0 |

**The planning locality bug is the biggest product trust risk currently live.** When `planningDataFetcher.ts` falls back to broad results, it stamps them with the searched outward code. A tradesperson in B14 gets a planning lead that shows as "B14" but is actually in a different region. They pay to unlock it. It's not their area. Chargeback follows.

**The Land Registry mock data is the second biggest trust issue.** If Land Registry signals are surfaced to users — even as "signals" — and they investigate, they will find fake data. This destroys credibility instantly.

---

## 7. THE CORE BRAND PROMISE — "NO SHARED LEADS"

**Severity: CRITICAL. This is the entire product differentiation.**

The brand promise is: Gold leads are controlled by trade, patch, and timing. No shared auction. No five-trade blast.

The reality: **The delivery lock key (`deliveryLockKey = trade + postcodeOutward + sourceId`) has not been implemented.**

This means:
- Two electricians in E8 can both receive and unlock the same GOLD lead.
- There is no suppression of duplicate same-trade same-patch deliveries.
- The "no shared auction" claim is false for the current implementation.

This is not a nice-to-have. It is the single most important trust-building mechanism in the product. Without it, JobFilter is exactly what every tradesperson fears: another shared leads platform with better marketing.

**This must be built before the first paying user is onboarded.**

---

## 8. SEO AND ORGANIC ACQUISITION

The current SEO strategy relies on:
- 6 city pages (`/construction-leads/birmingham`, etc.)
- 5 trade pages (`/trade/electricians`, etc.)
- 2 comparison pages
- 2BuildUK alternative page

All of these pages are rendered client-side via the React Router SPA with SSR disabled. Google's crawler will index empty HTML.

**The SEO strategy cannot work in the current architecture.** This is known (from the Apple-level audit). The decision is: fix it before launch, or accept that SEO is a 6-month delayed channel.

If SEO is meant to be a primary acquisition channel, the architecture fix is blocking. If SEO is a secondary channel and direct outreach / WhatsApp is primary, the architecture fix can be deferred.

The SEO pages should still be updated to use Next.js static generation even as a fast fix — this doesn't require a full architectural overhaul. Just adding `export const dynamic = 'force-static'` and proper metadata to the existing App Router wrappers would recover basic indexability.

---

## 9. COPY, MESSAGING, AND CONVERSION

**Strengths:**
- Brand voice is strong and consistent. Straight-talking, tradesman-first. Gets better every sprint.
- Competitor naming (Checkatrade, Bark, MyBuilder) correctly positioned throughout.
- "No credit card required" + "3 free scans" + "Cancel anytime" trust signals in the right places.
- 9 required brand phrases now present across the site.

**Weaknesses still open:**
- EpcPage CTA says "JobFilter can send a professional introductory letter" — no physical letter delivery backend exists. Misleading.
- Some product names are too jargon-heavy for a first-time tradesperson: "Vantage," "Vicinity," "Codex" communicate nothing without context.
- The free-to-paid conversion moment (the paywall reveal on the lead card) is strong in concept but relies on the lead quality being real and local. If the planning locality bug fires, the conversion moment becomes distrust.

---

## 10. MOBILE EXPERIENCE

The product is mobile-first by design and has received significant attention. Recent fixes address:
- Touch targets (44px minimum)
- Mobile UNLOCK CTA visible without scrolling
- Responsive stats bar
- Personal scan history chips

**Remaining risk:** The "First Strike" WhatsApp message templates (ready-to-send messages) are the most mobile-critical feature — trades will act on their phone, not desktop. If the WhatsApp deep link opens the wrong contact or pre-fills incorrectly, it kills that use case.

---

## 11. n8n AUTOMATION STACK

16 workflows designed, JSON pushed, partially activated. Status:

| Workflow | Critical for Launch? | Status |
|----------|---------------------|--------|
| 01 Daily Lead Digest | No (nice-to-have) | Needs SMTP creds |
| 02 READY Signal Alert | YES — this IS WhatsApp gold lead delivery | Needs SMTP + Twilio |
| 06 Outcome Logger | Yes — closes feedback loop | Inactive |
| 09 Waitlist Health | No | Inactive |
| 10 Stripe → Vault | Yes — revenue tracking | Inactive |
| 16 LLM Brief Builder | No (operational) | Never tested |

The automation layer is the most over-built part of the product relative to where the product actually is. 16 workflows before a single paying user exists is premature investment. The three that matter for launch: Stripe webhook (10), READY alert delivery (02), Outcome logger (06).

---

# PART 2 — PRE-MORTEM

## Setup

It is November 2026. JobFilter launched in June 2026. It has 12 paying users, has processed £400 in revenue, and the founder is deciding whether to keep going or pivot.

Why did it fail to reach its growth targets? Work backwards.

---

## KILL SHOT 1: "You're just another shared leads site."

**Probability: HIGH. Timeline: First 30 days.**

A tradesperson signs up, pays £29, receives a GOLD WhatsApp alert for a boiler replacement in their postcode.

The next day, a plumber they know tells them: "Mate, I got the same job. So did Dave. Three of us were there."

The trade WhatsApp group for Birmingham plumbers gets a screenshot: "Don't bother with JobFilter, same shared leads as everyone else."

**Why it happens:** The delivery lock key was never implemented. "No shared auction" is false. Three plumbers in the same patch all received the same GOLD lead.

**How to prevent:** Implement `deliveryLockKey = trade + postcodeOutward + sourceId` before the first paying user. This is a database row, a timestamp check, and a suppression rule. It is not a complicated build. But it is a binary trust decision: either the promise is true or it isn't.

---

## KILL SHOT 2: Nobody can pay.

**Probability: MEDIUM-HIGH. Timeline: Launch week.**

The founder promotes the product. Twenty tradespeople try to sign up for the Founding 30 price. Stripe checkout fails silently, or the webhook doesn't fire, or the Supabase subscription record doesn't update, or the user lands on the activation page and gets stuck.

Zero revenue. Momentum dies. The Founding 30 window passes without 30 founders.

**Why it happens:** Stripe has never been tested end-to-end with real keys. The webhook secret is not confirmed in production. The subscription state is not plumbed into the API response.

**How to prevent:** One afternoon, one person, one end-to-end test. Pay with a Stripe test card. Confirm the webhook fires. Confirm the Supabase record says `active: true`. Confirm the user sees paid-tier leads. Block launch until this passes.

---

## KILL SHOT 3: ICO complaint and forced shutdown.

**Probability: MEDIUM. Timeline: 2–8 weeks post-launch.**

The site collects email addresses on the waitlist form, on the free scan, and at signup. There is no Privacy Policy page. There are no cookie consent notices.

A disgruntled user — or a competitor — files a complaint with the UK Information Commissioner's Office. Under UK GDPR, collecting personal data without a published privacy policy is a potential enforcement action.

The ICO does not always pursue small companies immediately, but the risk is real. More practically: enterprise tenants, property managers, and any tradesperson who asks "is this GDPR compliant?" will immediately distrust the site when they can't find a privacy policy.

**How to prevent:** This is an afternoon of legal copy, not a technical challenge. A standard SaaS privacy policy, a standard terms of service, and a cookie consent banner. Use a template. Ship it. Done.

---

## KILL SHOT 4: WhatsApp never fires and users think it did.

**Probability: HIGH. Timeline: Any time a GOLD lead surfaces.**

A paying user receives a notification: "GOLD lead — sent to your WhatsApp." They check their WhatsApp. Nothing.

They check again. Nothing. They email support. No response (no support system exists). They request a chargeback.

**Why it happens:** `sms.ts` has a stub success path. If Twilio credentials are missing or the API call fails, the system can silently report success. The user is told their GOLD lead fired. It didn't.

**How to prevent:** Wire real Twilio credentials. Remove the stub success path entirely in production. If Twilio fails, the response must say "delivery failed" and queue a retry, not "success." Log delivery events with status: queued/sent/failed.

---

## KILL SHOT 5: Birmingham plumber drives to Manchester.

**Probability: MEDIUM. Timeline: Any time planning fallback fires.**

A free user scans their postcode (B14). The planning data API returns zero local results. The broad fallback fires. A planning application from Greater Manchester is stamped with "B14" and served as a local lead.

The tradesperson sees a GOLD lead, pays to unlock it, and discovers the address is 100 miles away.

Review: "Absolute scam. The leads are fake. Gave me a job in Manchester when I'm in Birmingham."

**Why it happens:** The planning locality bug in `planningDataFetcher.ts`. The broad fallback stamps non-local records with the searched outward code.

**How to prevent:** Remove the broad fallback. If local results return zero, return zero — don't manufacture locality. Show the user "No local planning signals this week" rather than fraudulent-looking leads. Trust from honest emptiness beats distrust from fake fullness.

---

## KILL SHOT 6: Google never sends a visitor.

**Probability: CERTAIN without architecture fix. Timeline: Permanent.**

Six months of effort on city SEO pages. Six months of writing trade-specific content. Zero organic traffic.

All 45+ pages are client-rendered. Google indexes empty HTML. The `/construction-leads/birmingham` page returns an empty div to the crawler. PageSpeed Insights scores it in the red. It never ranks.

**Why it happens:** The architectural decision to run the entire app as a client-side SPA with `ssr: false` inside a Next.js wrapper. This was identified as CRITICAL in the April audit. It has not been fixed.

**How to prevent:**
- Short-term fix: Convert the city and trade SEO pages to Next.js static pages with proper `generateMetadata`. These are marketing pages — they don't need real-time data. Static HTML. One weekend.
- Long-term fix: Migrate the SPA routes to native Next.js App Router pages. This is a significant project but unlocks SSR, streaming, and real performance.

The short-term fix unblocks organic acquisition. Do it before launch.

---

## KILL SHOT 7: The leads are good but tradespeople don't believe it.

**Probability: MEDIUM-HIGH. Timeline: 1–3 months post-launch.**

The leads from ContractsFinder and PlanningData are real. The scoring is reasonable. The delivery is fast.

But the tradesperson types the address into Rightmove. Then searches the planning portal directly. They find the exact same information publicly available.

"Why am I paying £39/month for leads I can find for free on the council website?"

**Why it happens:** The unique value of JobFilter — signal fusion, early delivery, deduplication, filtering — is not visible to the user. The product delivers a lead that looks like any other public data point. The proprietary layer (scoring, de-duplication, delivery before competition) is invisible.

**How to prevent:** 
1. The lead card must explain *why* this lead is a GOLD. Not just the score — the specific reason. "Spotted 4 hours ago. No other tradesperson in your postcode has received this yet." That specific, that honest.
2. The "First Mover Window" feature (countdown on GOLD lead cards) must be real. If it says "first mover window open," it must be backed by actual delivery lock state.
3. Show the counterfactual. "On Bark, this job would go to 5 trades. Here, it's filtered to your trade and postcode." Make the invisible value visible.

---

## KILL SHOT 8: The first month is free for everyone.

**Probability: HIGH. Timeline: Launch day.**

`NEXT_PUBLIC_OPEN_ACCESS` is confirmed not-false in the Vercel production environment. Or the free scan limit remains UNLIMITED. Every user gets everything for free. Nobody pays. The Founding 30 window passes with zero revenue.

**How to prevent:** Confirm `NEXT_PUBLIC_OPEN_ACCESS=false` in Vercel production env before going live. Enforce the 3/week free scan limit via Supabase (not localStorage). Test this specifically: create a free account, run 4 scans, confirm the 4th is blocked.

---

## KILL SHOT 9: The trade community never hears about it.

**Probability: HIGH without a specific plan. Timeline: 6 months.**

The product is technically functional. The copy is strong. The SEO is broken (Kill Shot 6). No paid acquisition budget. No existing trade community. No referrals yet.

Six months pass. The site gets 200 monthly visitors from direct/branded. Nobody pays. The product is good but invisible.

**Why it happens:** No concrete go-to-market plan. "Build it and they will come" via SEO doesn't work if the SEO is broken. Content marketing takes 6+ months to show results. The product relies on organic search for a channel that returns nothing in the first six months.

**How to prevent:**
- Direct outreach. Ten tradespeople this week. WhatsApp groups, trade forums (The Electricians Forum, PlumbingHeatingCooling, UKBuildingAndGroundworks). Show the product. Get one paying user. Use that as a case study.
- Founder visibility. LinkedIn, TikTok, or Instagram as a builder showing real leads in real-time. The content IS the marketing. "Spotted this £4k extension job in Birmingham before it went to Bark — here's how."
- Partnership. One trade body (NICEIC, Gas Safe, FMB). One referral deal. Even 50 members at £29/month is £1,450 MRR from a single partnership conversation.

---

## KILL SHOT 10: The product is too complex to explain in 10 seconds.

**Probability: MEDIUM. Timeline: Ongoing.**

A tradesperson lands on the homepage. They see: Vantage, Vicinity, Codex, Patch Watch, Territory, First Strike, City Intelligence, RALPH Plan.

They don't know what any of these mean. They can't identify the one thing JobFilter does for them today, for £39/month.

They leave.

**Why it happens:** The product has expanded beyond its core premise. The core is: scan your postcode, get real leads before Checkatrade lists them. Everything else is secondary. But the homepage tries to sell all of it at once.

**How to prevent:**
- One clear thing on the homepage above the fold: "Scan your postcode. Get real jobs before they hit the job boards." CTA: "Scan Free — No Card."
- Keep Vantage, Vicinity, Codex below the fold or off the homepage entirely.
- The product names mean nothing to a tradesperson. "GOLD leads to your WhatsApp" means everything.

---

## KILL SHOT 11: The data sources go dark.

**Probability: LOW-MEDIUM. Timeline: Any time.**

The Planning Data API changes its schema (it has changed before). ContractsFinder has rate limits. PlanningData is a government API maintained by MHCLG. Governments change APIs.

When this happens: the fallback fires. The fallback is DirectorySignal — internal structured data. Paying users receive fallback leads without knowing it. If they investigate, they find the same jobs appearing every week.

**Why it happens:** No source health monitoring in production. The n8n Source Health Watchdog (Agent 14) is designed to catch this — but it's inactive and untested.

**How to prevent:** Activate Agent 14. Add a visible source health indicator in the admin/dashboard that shows which sources are live. When a source goes down, respond within 24 hours. Don't let fallback leads go to paid users for more than 48 hours without notification.

---

## SUMMARY — KILL SHOTS BY PRIORITY

| # | Kill Shot | Must Fix Before Launch? | Effort |
|---|-----------|------------------------|--------|
| 1 | Delivery lock key — no shared leads | **YES** | Medium (1–2 days) |
| 2 | Stripe end-to-end test | **YES** | Low (half day) |
| 3 | Privacy Policy + Terms + Cookie notice | **YES** | Low (1 day) |
| 4 | WhatsApp delivery stub | **YES** | Medium (1 day) |
| 5 | Planning locality bug | **YES** | Low (half day — remove broad fallback) |
| 6 | SEO architecture (basic static fix) | Launch blocker for SEO channel | Medium (2 days) |
| 7 | Invisible value problem | Before paid users hit the wall | Low (copy + lead card) |
| 8 | Free scan limit + OPEN_ACCESS env | **YES** | Low (1 hour) |
| 9 | No go-to-market plan | Before launch | Zero tech effort |
| 10 | Product too complex to explain | Before launch (copy sprint) | Low |
| 11 | Data source health monitoring | Within first month | Medium |

---

## WHAT HAS TO HAPPEN THIS WEEK (HARD BLOCKERS)

1. Delivery lock key implemented and tested.
2. Stripe checkout tested end-to-end with test key.
3. Privacy Policy, Terms of Service, Cookie banner shipped.
4. Planning locality broad fallback removed or filtered.
5. `sms.ts` stub success path removed. WhatsApp delivery is real or returns error.
6. `NEXT_PUBLIC_OPEN_ACCESS=false` confirmed in Vercel production env.
7. Free scan limit enforced per-user via Supabase (not localStorage).

None of these are large builds. Three of them are an afternoon of copy and configuration. The rest are targeted code changes with clear scope.

---

## WHAT CAN WAIT

- Full architectural migration to Next.js App Router SSR — important but not a launch blocker for a small initial user base.
- n8n workflow activation beyond Agent 02, 06, 10 — the 16-agent stack is infrastructure, not product.
- Additional data sources (PlanWire, UK PlanIt, local council APIs) — improve quality post-launch.
- Feature expansion (Pipeline board, Client Portal, Attribution tracking, Heat Map) — all strong ideas, all deferred until V1 users give feedback.
- City Intelligence Page live data wiring — static demo data is fine for V1.

---

## NORTH STAR CHECK

Every decision this week should answer: **does this put one paid-tier-worthy lead in a tradesperson's WhatsApp, delivered to them and only them, before it appears anywhere else?**

If yes, do it.
If no, defer it.

The product is close. The gaps are known. The kill shots are fixable. Ship the fixes, get one paying user, get them one real job, and the product proves itself.

---

*Audit written: 2026-05-27*  
*Next audit recommended: 2026-06-10 (two weeks post-launch)*  
*Related: [[Product/Problems and Solutions]], [[Product/Launch Checklist]], [[Sessions/Daily Brief]]*

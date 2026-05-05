# Site Audit - 5th May 2026

## Current State

21 pages live on jobfilter.uk. React 19 + Vite + Tailwind 4 + Express backend on Firebase.

**New since last Rolling Launch Summary:**
- WhatsApp Bodyguard section on homepage
- EPC leads page (`/epc`)
- For Your Trade page (`/for-your-trade`)
- Nav restructured (Find Jobs, Pricing, Free Tools, Trade Signals, EPC Leads)
- Tips page expanded (12 tips)
- Legal pages complete (Privacy, Terms)
- Free tools page with 5 calculators
- Smart Quote page with paywall demo
- Vantage, Vicinity, Codex service pages (forms are mock-only)
- Waitlist form embedded on Homepage, Pricing, EPC, and ForYourTrade pages
- LaunchWaitlistModal popup on homepage (350ms delay, sessionStorage)

**What works:**
- Lead scanner at `/find-jobs` — scans planning data, FTS, Contracts Finder, PCS, DirectorySignal, EPC across UK postcodes. Free preview shows 2 results with gated details.
- WhatsApp sends on Gold leads via intake (`/api/intake/score` → Twilio)
- Waitlist form POSTs to `/api/waitlist` → writes to `data/waitlist.jsonl`
- `/api/health` returns `ok`
- All 21 routes respond, no broken links

**What's missing (blocking launch to paying customers):**

| Gap | Severity | What's Needed |
|-----|----------|--------------|
| No Stripe integration | Critical | Checkout Session for Pro + Founding 30. Stripe SDK is installed but unused. |
| No authentication | Critical | Firebase Auth or similar. No way to know who paid. |
| Founding 30 cap not enforced | Critical | Counter or backend check. Currently unlimited "slots." |
| WhatsApp disabled on FindJobs | High | Button is hardcoded disabled. No Pro unlock mechanism. |
| Vantage/Vicinity/Codex forms are mocks | High | `e.preventDefault(); setSubmitted(true)` — no data goes anywhere. |
| Leads are localStorage-only | High | Clear browser = lose all leads. No server persistence. |
| Waitlist has no email confirmation | Medium | Resend SDK installed but unused. Signups go to a flat file with no response. |
| No email collection for waitlist | Medium | Form asks for name, trade, email/phone — but no email send on submit. |
| SmartQuote doesn't recognise Founding 30 | Low | Only shows "PRO ONLY" gate. |

---

## Next Steps — Ordered by Impact on Getting First 30 Customers

### THIS WEEK (do these first)

1. **Add email confirmation to waitlist form**
   - Wire Resend (already installed) to send an auto-reply when someone joins the waitlist
   - Subject: "You're on the JobFilter Founding 30 list"
   - Body: "You're slot #X. We'll email you the moment it's live. Here's what we found near you this week: [link to a real scan result page or screenshot]"
   - This turns a dead form into a nurture sequence. Costs pennies.

2. **Add "slots remaining" counter to every waitlist form**
   - Read `data/waitlist.jsonl` line count on page load via a new `/api/waitlist/count` endpoint
   - Show "X of 30 Founding slots remaining" on every waitlist form
   - When count hits 30, change form to "Founding 30 full — join Pro waitlist (£49/month)"
   - Urgency is your conversion lever. Use it.

3. **Un-gate the WhatsApp button on FindJobs — for demo only**
   - For the first 5 people who ask about the product, manually enable WhatsApp delivery
   - This proves the end-to-end flow works before you build auth + Stripe
   - Once proven, keep it gated — but at least one real person needs to receive a gold alert

4. **Post in 2 Facebook groups using the Block 5 messages from the research doc**
   - Electricians UK (150K members) + Plumbers UK (120K members)
   - Post as a person, not a brand page
   - Track which message gets engagement
   - If 5+ replies asking how to sign up → you have signal

### NEXT WEEK

5. **Build the waiting list landing page (single page, no auth)**
   - Cut a standalone landing page at `/waitlist` or make the homepage the waitlist page
   - Hero: "FIRST 30 TRADESMEN. £29/MONTH. LOCKED FOREVER."
   - Sub: "Official planning data, council contracts, and EPC ratings — scanned and WhatsApp'd to you before they hit the directories."
   - Form: Name, Trade, Postcode, Email, Phone (optional)
   - Proof: "Official source. Not a shared form. Not an ad."
   - Below fold: 3 real lead examples from the scanner (screenshots with personal data redacted)
   - CTA: "RESERVE YOUR SLOT"

6. **Wire Stripe Checkout (minimal)**
   - Create a `/api/create-checkout-session` endpoint
   - Founding 30: £29/month or £240/year
   - Pro: £49/month or £408/year
   - Stripe Checkout handles auth, payment, receipts — no custom UI needed
   - Webhook for payment confirmation → enable WhatsApp + full lead scanner access

7. **Firebase Auth (email/password, minimal)**
   - Sign up → redirect to Stripe Checkout → on success → mark user as "Pro" or "Founding 30" in Firestore
   - Protect `/find-jobs` full results behind auth + payment status
   - Free tier: no auth needed, 3 scans/week, preview only

### BEFORE FIRST PAYING CUSTOMER

8. **Server-side lead persistence**
   - Move lead decisions from localStorage to Firestore (or at minimum a server-side JSON file)
   - This is a trust issue — if a tradesman "saves" a lead and it disappears when they clear their browser, they'll never trust you again

9. **Founding 30 enforcement**
   - Backend check on signup: if 30 Founding slots filled, reject new Founding signups, redirect to Pro
   - Show real-time counter on pricing page

10. **Remove mock service forms or build real backends**
    - Vantage, Vicinity, Codex forms currently do nothing
    - Either: remove the "SUBMIT TO TEAM" buttons and replace with "COMING SOON" or build real email notifications
    - A "your form was submitted" message that goes nowhere will damage trust

---

## What NOT to do

- Don't build a blog. The News page is sufficient.
- Don't add more pages. 21 is enough. Focus on conversion, not content.
- Don't build a dashboard. WhatsApp is the interface.
- Don't add AI features. No tradesman will pay extra for AI. They'll pay for leads.
- Don't lower the price. £29 is already aggressively below market. Lower signals "not serious."
- Don't build mobile apps. The site is mobile-responsive. WhatsApp handles the alerts.

---

## The Funnel as It Stands

```
Facebook/Reddit post → Landing page → Waitlist signup → Email confirmation → Stripe checkout → WhatsApp gold alert → Repeat usage → Word of mouth
         ↑                    ↑                ↑                  ↑                   ↑                    ↑
    Not started          Live (4 pages)   Live (JSONL)       NOT BUILT          NOT BUILT          Live but disabled
```

**The biggest bottleneck:** Stripe + Auth. Without these, you cannot take money. Everything else feeds into this.

**The biggest opportunity:** The waitlist already works. If you send confirmation emails and show a real-time slot counter, you have a conversion machine without writing any payment code.

---

## Connected Notes

- [[Research for Build Agent - 5th May 2026]] — full competitive research, channel lists, pricing validation, copy patterns
- [[Rolling Launch Summary]] — previous build sessions and change log
- [[Pricing]] — current tier structure
- [[Competitor Research - 2 May 2026]] — competitor landscape
- [[Launch Checklist]] — enforcement mechanism for Founding 30

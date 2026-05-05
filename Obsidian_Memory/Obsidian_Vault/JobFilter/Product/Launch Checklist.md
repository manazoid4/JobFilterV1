# Launch Checklist

Pre-launch gates. Nothing ships to paying users until all ✅.

---

## Pricing & Payments

- [ ] Stripe paywall wired — £49/mo Pro gate active
- [ ] Founding 30 hard cap — counter in Supabase, locks at 30 signups, redirects to standard Pro price
- [ ] Annual billing live (£408/yr Pro · £240/yr Founding 30)
- [ ] Founding 30 price (£29/mo) locked per user in Stripe metadata — cannot drift up

---

## Free Tier

- [ ] Free scan limit enforced at **3/week** ← currently UNLIMITED for testing, must change before launch
- [ ] Scan counter stored per user (Supabase) not localStorage
- [ ] Paywall gate fires correctly after limit hit
- [ ] Free preview shows score only — no contact detail, no WhatsApp ping

---

## Auth & Accounts

- [ ] Auth live — each tradesman has own account + unique intake link
- [ ] Multi-tenant confirmed — no data leakage between accounts
- [ ] Hardcoded single user removed from codebase

---

## Core Product

- [ ] Twilio env vars set — WhatsApp GOLD alerts firing live
- [ ] Supabase leads table wired — leads persist (not localStorage)
- [ ] GOLD/SILVER/BIN scoring validated on real leads
- [ ] QR van sticker generator built and downloadable

---

## Design & Nav

- [ ] All pages on V3 tokens — no brutalist remnants
- [ ] All nav links resolve — no broken routes
- [ ] Founding 30 banner copy updated when <5 slots remain
- [ ] Pricing page live and matches [[Pricing]]

---

## Legal

- [ ] Privacy policy page live
- [ ] Terms of service page live
- [ ] Cookie notice (UK PECR compliance)

---

## Connections

- [[Pricing]]
- [[Intake Engine]]
- [[Product Index]]

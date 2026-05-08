# Launch Checklist

Pre-launch gates. Nothing ships to paying customers until all ✅.

---

## Pricing & Payments

- [ ] Stripe paywall wired — Business tier £349/mo gate active
- [ ] Founding 10 hard cap — counter in database, locks at 10 customers, redirects to standard pricing
- [ ] Annual billing live (£948/yr Starter · £3,348/yr Business)
- [ ] Founding 10 price locked per customer in Stripe metadata — cannot drift up

---

## Free Tier / Demo

- [ ] Demo mode active — seed data, fake workflows, live dashboard
- [ ] Demo limited to 1 connected system (read-only)
- [ ] Demo shows 2 agents max
- [ ] Paywall gate fires correctly after demo limits hit
- [ ] Demo preview shows value — real-looking workflows, not empty screens

---

## Auth & Accounts

- [ ] Auth live — each business has own account + workspace
- [ ] Multi-tenant confirmed — no data leakage between accounts
- [ ] Team seats working (Business tier: up to 5 users)

---

## Core Product

- [ ] ServiceNow connector live — read, create, update records
- [ ] Zendesk connector live — read, create, update tickets
- [ ] Pipeline engine working — complaint management workflow functional
- [ ] Review Gate active — human approval required before sending/updating
- [ ] Handoff Log recording — all actions logged with audit trail
- [ ] Audit log export working (CSV, PDF)

---

## Agent Providers

- [ ] OpenAI API integration working
- [ ] Anthropic API integration working
- [ ] Model selection per agent working
- [ ] API key management secure (encrypted at rest)

---

## Design & Nav

- [ ] All pages on design system — consistent tokens
- [ ] All nav links resolve — no broken routes
- [ ] Founding 10 banner copy updated when <3 slots remain
- [ ] Pricing page live and matches [[Pricing]]

---

## Compliance

- [ ] GDPR-compliant data handling
- [ ] Audit logs immutable
- [ ] Data retention policies configurable
- [ ] Privacy policy page live
- [ ] Terms of service page live
- [ ] DPA (Data Processing Agreement) template ready for enterprise

---

## Connections

- [[Pricing]]
- [[MVP Scope]]
- [[Product Index]]

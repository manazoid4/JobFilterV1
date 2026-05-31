# JobFilter Six-Month Revenue Plan

## Goal

Reach the first reliable revenue band without weakening lead quality:

- Month 3 target: GBP 2k-5k MRR
- Month 6 target: GBP 10k-25k MRR
- Primary metric: paid retention from leads that create quote opportunities

## Non-Negotiables

- No fake leads.
- No empty lead outputs without structured reason and next action.
- No frontend planning-data fetching.
- No monetisation that blocks trust; gate depth, speed, alerts, and contact signal.
- WhatsApp remains the core delivery channel.

## Month 1: Lead Engine Proof

Outcome: one trade, one region, one source path that produces usable leads repeatedly.

Work:

- Prove `/api/leads/search` with live Contracts Finder coverage and no placeholder fallback.
- Add quality audit output for every scan: source, completeness, urgency, value, contact path.
- Pick one wedge: electricians or roofers in West Midlands.
- Record 50 lead-quality samples in `codex-output/` or vault run logs.
- Add paid/free response contract: free sees preview, paid gets contact/depth/priority.

Ship:

- Lead quality report.
- WhatsApp alert copy format.
- Landing page for selected trade and region.

## Month 2: Paid Intake

Outcome: users can join, pay, and receive a useful alert path.

Work:

- Tighten waitlist/intake flow.
- Wire Stripe plan gates to lead depth.
- Add Supabase persistence for lead scans, user postcode, trade, and subscription status.
- Add daily agent run that checks lead freshness and source errors.

Ship:

- GBP 29/mo early access plan.
- Manual concierge WhatsApp delivery if full automation is not ready.
- Daily source health note in GitHub vault.

## Month 3: First 50 Paying Trades

Outcome: GBP 1.5k+ MRR with retention signals.

Work:

- Run direct outreach to Birmingham/West Midlands trades.
- Add cancellation reason capture.
- Add lead outcome tracking: contacted, quoted, won, ignored, bad fit.
- Improve scoring based on bad-fit reasons.

Ship:

- Trade-specific proof page.
- Weekly "best leads missed" email/WhatsApp.
- Paid user dashboard showing saved scans and outcomes.

## Month 4: Expand Sources

Outcome: more quality without noise.

Work:

- Add at least one additional official/allowed source path.
- Improve postcode radius scoring.
- Add dedupe across sources.
- Add "why this lead" explanation for paid users.

Ship:

- Source registry page/doc.
- Lead dedupe regression test.
- WhatsApp scheduled digest.

## Month 5: Retention And Partnerships

Outcome: reduce churn and add distribution.

Work:

- Contact trade bodies and local trade communities.
- Add referral tracking.
- Add job outcome reminders.
- Build proof from real outcomes only.

Ship:

- Partner landing page template.
- Referral code tracking.
- Monthly ROI report for paid users.

## Month 6: Repeatable Sales Loop

Outcome: GBP 10k-25k MRR path is visible and measurable.

Work:

- Double down on best trade/region/source.
- Drop weak sources and weak trades.
- Add admin view for lead quality, user activity, churn risk, and source errors.
- Document repeatable outbound script.

Ship:

- Six-month board report.
- Source quality dashboard.
- Public pricing and paid onboarding flow.

## Weekly Audit

Every week, answer:

- Which leads created quote opportunities?
- Which sources created noise?
- Which paid users came back?
- Which trade/region is converting best?
- What one source or scoring fix most improves paid retention?

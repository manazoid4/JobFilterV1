# Fire Door App Competitor Playbook for JobFilter

Updated: 2026-06-24  
Competitor researched: `firedoorapp.co.uk`  
Purpose: extract what Fire Door App does well and convert it into one safe JobFilter implementation prompt.

---

## 1) Fast Read

Fire Door App is not a direct JobFilter competitor in the trade-lead-discovery sense. It is a workflow product for fire door inspection teams, contractors, FM, housing, managing agents and care settings.

The key thing it does very well is this:

> One live record carries the job from site capture to documents, remedials, client updates, billing and audit evidence.

JobFilter should borrow that workflow lesson without copying the fire-door compliance niche.

For JobFilter, the equivalent is:

> One lead record should carry the opportunity from signal to decision, contact, quote, follow-up, win/loss and proof.

This becomes the **Job Trail** or **Lead Packet** concept.

---

## 2) What Fire Door App Does Well

### A) Strong wedge

Fire Door App's central message is essentially: stop rebuilding the job between site, office and client.

Why it works:

- It names the real admin pain.
- It shows the broken handoff between stages.
- It sells joined-up work, not isolated features.
- It is specific enough to feel made by insiders.

### JobFilter lesson

JobFilter's equivalent message should be:

> Stop rebuilding the lead between signal, call, quote, chase and outcome.

Or sharper:

> One lead. One decision. One trail from first signal to paid job.

---

### B) One record feeds every output

Fire Door App keeps inspection findings, photos, quote lines, RAMS, remedials, PDFs, client status and billing tied to the same live record.

Why it works:

- No retyping.
- Less context loss.
- Easier client explanation.
- Stronger audit trail.
- Cleaner team handover.

### JobFilter lesson

Each JobFilter lead should become a **Lead Packet** containing:

- source signal
- source URL
- score
- quality label
- score reasons
- readiness
- risks
- recommended action
- contact path
- quote starter
- follow-up cadence
- outcome
- lost reason / won value
- review request status
- export history

The lead should not die after discovery. It should become the working record.

---

### C) Capture → Generate → Follow up → Close

Fire Door App uses a clear workflow story:

1. Capture
2. Generate
3. Follow up
4. Close

### JobFilter version

Use:

1. **Find** — discover the signal.
2. **Filter** — decide if it is worth touching.
3. **Contact** — send the right message.
4. **Quote** — produce a quote starter only for good leads.
5. **Chase** — follow up without mental load.
6. **Learn** — mark outcome and improve source quality.

This should appear in product copy, dashboard sections and onboarding.

---

### D) Audience-specific paths

Fire Door App gives different paths for contractors, FM, managing agents, housing providers and care homes.

### JobFilter lesson

Create trade/use-case paths, not generic feature pages:

- Electricians: EICR, EV charger, rewire, commercial fit-out leads.
- Roofers: roof works, storm damage, planning, commercial maintenance.
- Builders: extensions, conversions, fit-outs, tender signals.
- Plumbers/heating: leaks, bathrooms, ASHP, boiler, landlord work.
- Landscapers: fencing, trees, garden transformations, estate work.
- Security/fire/safety contractors: compliance-led opportunities, public sector, estates.

Each path should show:

- what signals JobFilter watches
- what counts as GOLD
- what risks to avoid
- example lead packet
- quote/contact examples

---

### E) Live demo and first-win onboarding

Fire Door App has a live demo, a guided tour, no-card trial, and a strong "run one real building" first-win CTA.

### JobFilter lesson

JobFilter needs a first-win flow:

> Run one real postcode. Find one job worth checking. Save or skip it with reasons.

Do not just show a dashboard. Walk the user through the first useful decision.

Suggested first-win flow:

1. Pick trade.
2. Enter postcode.
3. Scan.
4. Show 3 leads: best, risky, skip.
5. Explain why each was ranked.
6. Let user unlock/save one.
7. Generate first contact message.

---

### F) Outputs and examples

Fire Door App shows example PDFs, CSVs, QR labels, quote outputs, RAMS, invoices and portal views.

### JobFilter lesson

JobFilter should show example outputs before signup:

- example GOLD lead packet
- example SKIP lead packet
- example quote starter
- example follow-up cadence
- example weekly foreman digest
- example source-quality summary
- example CSV export

This makes the product feel real before the user connects anything.

---

### G) Import and migration story

Fire Door App lets users import existing PDF reports and consolidate them into the system of record.

### JobFilter lesson

Later, JobFilter can add **lead import**:

- paste WhatsApp enquiry
- paste email enquiry
- upload screenshot/text
- import CSV of past leads
- classify old jobs as won/lost/no-answer
- learn what good work looks like for that trade

This should be later, not first.

---

### H) Client portal without chasing

Fire Door App uses portal access so clients can self-serve documents, status and payment.

### JobFilter lesson

Do not build a full client portal early. Build a tiny **Client Prep Link** instead:

- request photos
- request postcode/access
- request budget range
- request timeframe
- confirm decision maker
- show "received / checking / accepted / not a fit" status

This supports customer preparedness without becoming a homeowner app.

---

### I) Pricing clarity

Fire Door App does a strong job with:

- no-card trial
- full product trial
- seat or usage pricing
- same full product on both plans
- client portal users not counted as billable seats
- clear examples for different usage patterns

### JobFilter lesson

Keep pricing easy to understand:

- Free Scan: test the value in one area.
- Scout Pro: full lead control and weekly workflow.
- Hammer Add-On: optional concierge setup.

Avoid feature-fragmented pricing where the user needs a spreadsheet to understand what they get.

---

### J) Trust and compliance without overclaiming

Fire Door App clearly says it supports compliance workflows but is not a compliance guarantee.

### JobFilter lesson

JobFilter should say:

- It supports lead discovery and qualification.
- It does not guarantee work won.
- It does not guarantee legal right to contact every lead.
- Contact guidance must respect TPS, consent, procurement rules and source terms.

This builds trust and reduces risk.

---

## 3) What JobFilter Should Not Copy

Do not copy:

- fire-door-specific compliance workflow
- door register
- QR physical labels as a core feature
- full client portal too early
- RAMS generation for every trade before demand
- invoice/billing suite before lead workflow is trusted
- multi-site enterprise admin as the starting point

Only copy the **workflow architecture**:

> one record, evidence attached, outputs generated, follow-up tracked, outcome learned.

---

## 4) Fire Door App-Inspired JobFilter Product Move

### Feature name

**Lead Packet** or **Job Trail**

### Positioning

> Every good lead becomes one working record: why it matters, what to say, what to quote, when to chase, and whether it paid.

### MVP screens

1. Lead card
2. Lead packet drawer/page
3. Contact/quote tab
4. Follow-up tab
5. Outcome tab
6. Export/share tab

### MVP fields

Reuse existing fields where possible:

- `id`
- `title`
- `trade`
- `location`
- `postcodeOutward`
- `estimatedValue`
- `source`
- `sourceUrl`
- `score`
- `scoreReasons`
- `qualityLabel`
- `leadReadiness`
- `ghostRisk`
- `recommendedAction`
- `quoteFloor`
- `followUpCadence`
- `evidenceBadges`
- `signalStack`
- `contactPath`
- `status`
- `won/lost/no_answer/ignored`
- `LostReason`
- `reviewMessageSent`

### MVP logic

The Lead Packet should show:

- why this is a job
- why now
- what evidence exists
- what is missing
- best contact route
- quote starter if qualified
- follow-up plan
- outcome learning

---

# 5) Singular Build Prompt

Use this as the implementation prompt for OpenCode, Codex or Claude Code.

```text
You are the lead product engineer for JobFilterV1.

Mission: implement the Fire Door App lesson into JobFilter without copying the fire-door niche.

Read these repo files first:
- FIRE_DOOR_APP_COMPETITOR_PLAYBOOK.md
- COMPETITOR_STRATEGY_PLAYBOOK.md
- src/lib/types.ts
- leadEngine/types.ts
- src/pages/FindJobsPage.tsx
- lead card components
- chase/follow-up store
- win/loss store
- message template/QuickResponseKit/LeadValueKit components
- landing/pricing components

Strategic lesson:
Fire Door App wins because one live record carries the job from capture to output to follow-up to close. JobFilter should do the same for leads.

Build the JobFilter version: Lead Packet / Job Trail.

Core promise:
One lead. One decision. One trail from first signal to paid job.

Implementation tasks:

1. Create a Lead Packet / Job Trail surface
   - This can be a drawer, page, modal or expanded lead card depending on the current UI structure.
   - It must reuse existing Lead fields before creating new schema.
   - It should work with current data even if some fields are missing.

2. Lead Packet sections
   Add clear sections:
   - Decision: score, qualityLabel, leadReadiness, recommendedAction.
   - Evidence: source, sourceUrl, evidenceBadges, signalStack, whyThisIsAJob, scoreReasons.
   - Missing info: budget, photos/evidence, contact path, decision maker, deadline/timeline, postcode/access.
   - Contact: best channel, safe contact script, TPS/compliance caveat where relevant.
   - Quote: quoteFloor and Smart Quote starter only for GOLD/SILVER or READY/MAYBE leads.
   - Chase: followUpCadence and next nudge.
   - Outcome: won, lost, no answer, ignored, no quote, with lost reason.
   - Export: copy plain-text packet and CSV row for the lead.

3. Add Fire Door App-inspired workflow copy
   Use this product story in UI copy where appropriate:
   - Find → Filter → Contact → Quote → Chase → Learn
   - Stop rebuilding the lead between signal, call, quote, chase and outcome.
   - Every lead should carry its evidence, decision, next action and outcome in one place.

4. Add first-win onboarding
   If there is an onboarding/homepage/scan page path, add a simple first-win pattern:
   - pick trade
   - enter postcode
   - scan
   - show best/risky/skip examples
   - open one Lead Packet
   - copy first contact message

5. Add example outputs on landing/demo surface
   Add at least one sample/static section showing:
   - example GOLD lead packet
   - example SKIP lead packet
   - example quote starter
   - example weekly foreman digest
   Keep it lightweight and avoid fake claims.

6. Add Client Prep Link as a later-phase stub, not a full portal
   - Add TODO/stub or small UI note for requesting missing info: photos, postcode/access, budget, timeframe, decision maker.
   - Do not build a full client portal yet.

7. Strengthen pricing copy
   If pricing files exist, make sure packaging stays simple:
   - Free Scan: test one area and see lead quality.
   - Scout Pro: Lead Packets, GOLD/SILVER alerts, Smart Quote, follow-ups, weekly digest, review harvesting, outcome learning.
   - Hammer Add-On: concierge setup only.

8. Trust/risk copy
   Add concise copy where contact guidance appears:
   - JobFilter helps find and qualify opportunities.
   - It does not guarantee won work.
   - Users remain responsible for lawful contact, procurement rules, TPS/consent and source terms.

Engineering rules:
- Do not create a full CRM.
- Do not create full field-service management.
- Do not create a full client portal.
- Do not add fire-door-specific features.
- Do not break existing lead scanning.
- Reuse existing types/stores/components where possible.
- Keep all UI mobile-first.
- Degrade gracefully when optional fields are missing.
- Run typecheck, lint and build.
- Fix every error before finishing.

Deliver:
- changed files list
- summary of the Lead Packet / Job Trail implementation
- screenshots or local preview notes if available
- tests/checks run
- risks left
- next 3 recommended commits
```

---

## 6) Recommended Commit Sequence

### Commit 1 — Lead Packet MVP

- Add Lead Packet UI.
- Show decision, evidence, contact, quote, chase and outcome sections.
- Use existing fields only.

### Commit 2 — First-Win + Examples

- Add first-win onboarding copy.
- Add sample lead packets and output examples.

### Commit 3 — Source Learning + Prep Link

- Add missing-info / prep-link stub.
- Improve source quality and outcome learning hooks.

---

## 7) Final Rule

Fire Door App's lesson is not fire doors. It is continuity.

JobFilter should feel like this:

> The lead is not a card you glance at once. It is the working packet that carries the decision, evidence, contact, quote, chase and outcome until the job is either won or rejected.

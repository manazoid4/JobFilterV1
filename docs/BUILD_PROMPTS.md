# JobFilter Build Prompts

Use these prompts for focused build sessions. Run one prompt at a time.

## Prompt 1: Lead Quality Audit

Audit `leadEngine/` and `/api/leads/search` for lead quality.

Goal: make every returned lead more actionable for a UK tradesman.

Do:
- Check source, trade fit, location fit, urgency, value, and contact path.
- Add or improve structured reasons when a lead is rejected.
- Keep the fixed lead schema intact.
- Add a small regression test or script if behaviour changes.

Do not:
- Change landing page UI.
- Add fake leads.
- Hide empty results without a structured reason.

## Prompt 2: Paid Depth Gate

Implement or audit free vs paid lead depth.

Goal: free users see proof; paid users get deeper contact/action data.

Do:
- Confirm free output redacts contact-sensitive fields.
- Confirm paid output keeps full contact path, score, and priority.
- Add test cases for free and paid responses.

Do not:
- Block the whole UI behind payment.
- Gate source attribution.

## Prompt 3: WhatsApp Ready Leads

Audit WhatsApp delivery readiness.

Goal: only send concise, lawful, high-intent leads.

Do:
- Deliver only leads with `READY` or equivalent status.
- Include trade, location, value/urgency, source, and next action.
- Respect `contactPath` and avoid homeowner cold-contact assumptions.

Do not:
- Send raw planning text.
- Send leads with weak source confidence.

## Prompt 4: Source Benchmark Run

Run a source benchmark for one trade and one territory.

Input:
- Trade: electrician, roofer, plumber, builder, landscaper
- Territory: postcode outward or region

Output:
- leads found
- actionable count
- rejected count
- top rejection reasons
- next source/scoring fix

Do not:
- Optimise for lead count over lead quality.

## Prompt 5: Production Deploy Readiness

Audit production readiness before deploy.

Do:
- Confirm build command.
- Confirm Vercel/Supabase env assumptions.
- Confirm Stripe and WhatsApp secrets are server-only.
- Confirm no preview-only config is treated as production.

Do not:
- Deploy if `npm run build` or `npm run lint` fails.

## Prompt 6: Outcome Tracking

Build or audit lead outcome tracking.

Goal: learn which leads turn into quotes and won jobs.

Track:
- delivered
- opened
- contacted
- quoted
- won
- lost
- bad fit reason

Do not:
- Treat lead volume as success.

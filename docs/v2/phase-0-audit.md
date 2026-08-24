# JobFilter V2 Phase 0 audit

Date: 24 August 2026  
Branch: `agents/jobfilter-v2-foundation`  
Base: `origin/main` at `5489192`

## Access statement

| System | Status | Evidence |
|---|---|---|
| GitHub repository, branches, PRs and Actions | VERIFIED | Authenticated `gh` access; repository and CI metadata inspected |
| Local repository | VERIFIED | Fresh isolated worktree; the dirty `agents/jobfilter-find-a-tender` tree was not modified |
| Vercel project and production deployment | VERIFIED, read-only | Authenticated CLI; `job-filter-v1` is linked to `jobfilter.uk` and production was Ready |
| Vercel production environment names | VERIFIED | Supabase, Stripe and Resend variables exist; Twilio, WhatsApp and Anthropic variables were absent |
| Vercel billing plan and remaining allowance | UNVERIFIABLE | Not exposed by the inspected project metadata |
| Supabase project existence and region | VERIFIED | `Jobfilter.uk`, Central EU (Frankfurt), project ref `nfjwuwsuaapufmkppoeo` |
| Applied remote schema, RLS behaviour and backups | UNVERIFIABLE | Project is not locally linked and no database credential was available to the audit process |
| Stripe products, live subscriptions, MRR and churn | UNVERIFIABLE | Environment variable names exist, but Stripe CLI/API credentials were not available to the audit process |
| Resend account state and delivery | UNVERIFIABLE | Production key name exists; account and live delivery were not accessed |
| WhatsApp Business account/templates | UNVERIFIABLE / NOT CONFIGURED IN VERCEL | Required production variables are absent |
| UK telephony provider, number and forwarding | NOT CONFIGURED | No Twilio variables or provider configuration found |
| External nightly PR generator | UNVERIFIABLE | Only the CI workflow exists in this repository; the automation producing `nightly/*` PRs is external |

No production configuration, database, subscription, message or deployment was changed during this audit.

## Verified baseline

- `npm ci`: 181 packages installed, zero audit vulnerabilities.
- TypeScript check passed.
- Production source-safety, postcode, source-readiness, scanner-redaction, lead-quality, FTS and production-runtime regressions passed.
- Next.js production build passed and generated 120 static pages plus dynamic routes.
- The graph index found 39 route definitions across the Next and legacy Express surfaces.
- Production currently uses Next.js 16, React 19, Supabase, Stripe, Resend and Vercel Analytics.

## Security and architecture findings

| Severity | Verification | Finding | Required action |
|---|---|---|---|
| CRITICAL | VERIFIED in source | WhatsApp webhook authentication is optional when `WHATSAPP_APP_SECRET` is missing. It also logs sender/message PII and treats a failed outbound fetch as success. | Keep WhatsApp disabled. Before enablement, require the signature secret, use constant-time comparison, deduplicate inbound IDs, persist delivery attempts and remove message-body logs. |
| CRITICAL | UNVERIFIABLE remotely | The repository has user-scoped RLS migrations, but the applied remote schema and two-user isolation were not tested. | Link a non-production Supabase branch and run an adversarial two-user suite before any V2 tenant data is applied. |
| HIGH | VERIFIED in schema | The current model is user-owned, not organisation-owned. There are no organisation or membership tables for multi-user firms. | Design organisations/memberships now; apply physical tables only after the commercial gate. |
| HIGH | VERIFIED in source | Public intake uses service-role writes and stores phone, postcode and IP. Rate limiting depends on the database insert/count/delete path and fails open when Supabase is unavailable. | Replace with an atomic database function or durable rate-limit boundary before live acquisition traffic. |
| HIGH | VERIFIED in source | WhatsApp inbound rows are keyed only by phone and have no tenant identity, consent state, provider event ID or delivery state. | Do not reuse this table as the V2 conversation model. |
| MEDIUM | VERIFIED in source | Stripe webhook signing and event idempotency are implemented, but live subscriber/product state could not be checked. | Pull aggregate Stripe state through approved access before changing pricing or customer treatment. |
| MEDIUM | VERIFIED in CI | CI runs a hand-maintained list of regression scripts and has no general unit-test discovery or E2E suite. | Add each V2 contract test explicitly now; introduce a coherent test runner before multi-tenant mutations grow. |
| MEDIUM | VERIFIED in build | Both App Router handlers and a Pages catch-all Express API remain active. | Assign one owner to every API during route migration; do not create duplicate V2 endpoints. |
| LOW | VERIFIED in build | Next.js reports the `middleware` convention as deprecated in favour of `proxy`. | Migrate separately; it is not part of the first V2 sales-demo slice. |

## Gate 0 verdict

Gate 0 is **not fully passed**. The local build/security baseline is verified, but these items remain required before production schema or pricing changes:

1. aggregate Stripe subscriber/product state;
2. applied Supabase schema and a real two-user RLS test;
3. explicit treatment of any existing paying tender customers;
4. identification and pausing of the external nightly PR generator;
5. Vercel and Supabase plan/backup confirmation.

Safe work may continue on synthetic, no-send, no-payment sales demonstrations and documentation. Live messaging, production migrations, pricing replacement and customer-data writes remain gated.


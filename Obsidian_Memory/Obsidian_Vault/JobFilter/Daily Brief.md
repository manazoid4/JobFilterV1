---
type: daily-brief
project: JobFilter
run_at: 2026-05-24T03:05:00+01:00
for_date: 2026-05-24
status: active
tags: [jobfilter, daily-brief, launch-readiness, llm-context]
---

# JobFilter Daily Brief - 2026-05-24

> Canonical morning context for JobFilter agents. Build the lead engine first; UI polish is secondary.

## North Star

- Lead quality > volume.
- Data pipeline reliability > speed > monetisation > UX.
- One paid-tier-worthy lead per user per week beats lots of noisy scans.
- Do not expose raw source names, categories, URLs, registers, or portals in public/product copy.

## What Changed In The Last 12 Hours

- PR #173 merged: daily 12h audit runner, agent prompt, Firebase Functions build readiness.
- PR #174 merged: Vercel fixed for the current Next.js output (`.next` instead of stale `dist`).
- PR #175 merged: OpenWA WhatsApp delivery plan saved. Decision: pilot/fallback only, not the production launch path.
- Local `main` is synced to `origin/main` at `901b908 Add OpenWA WhatsApp delivery plan (#175)`.
- Daily audit script ran successfully and wrote `C:\Users\manaz\vault\wiki\reports\jobfilter-daily-audit-2026-05-24_02-38-53.md`.
- Production checks: `https://jobfilter.uk/find-jobs` returned 200; `https://jobfilter.uk/health` returned 200 but served HTML, not structured health JSON.

## Verified Green

- Root build: `npm run build` passed.
- TypeScript/lint: `npm run lint` passed.
- Legacy Firebase Functions build: `npm run build` passed in `legacy/firebase/functions`.
- GitHub/Vercel checks for PRs #173-#175 were green before merge.

## Launch Blockers

1. Planning locality: `leadEngine/fetchers/planningDataFetcher.ts` can fall back to broad Planning Data results and stamp them with the searched outward postcode. This can make non-local leads look local. Fix before launch.
2. Paid access: `server/routes/leadsSearch.ts` is not wired to real auth/subscription state; full depth is still effectively test-mode/preview logic.
3. Subscription route: `server/routes/subscriptionStatus.ts` exists but is not registered in `server/app.ts`, and its DB contract does not match the Supabase migration.
4. WhatsApp truth: `server/services/sms.ts` can report stub success and uses env recipient fallback instead of the paid user's verified phone.
5. Delivery locks: implement `deliveryLockKey = trade + postcodeOutward + sourceId`, recipient tracking, duplicate suppression, `competitionRisk`, and `crowdingSignal`.
6. Stripe/paywall: checkout, webhook secret, price IDs, Founding 30 cap, annual billing, and Vercel envs still need live test verification.
7. Supabase/auth persistence: profiles, scan counters, subscriptions, tenant isolation, and lead persistence need launch-level validation.
8. n8n daily brief automation is still not the source of this brief; workflow 16 remains inactive/unproven.
9. OpenWA needs a persistent worker/VPS sidecar. Do not put OpenWA sessions in Vercel serverless.

## Current Best Plan

1. Fix planning locality first: remove broad fallback from paid/free lead output, or mark broad records non-local and bin them.
2. Wire paid gating server-side: authenticated user -> profile -> subscription -> full/redacted lead response.
3. Fix WhatsApp delivery truth: verified profile phone only, real Twilio response handling, no production stub success, delivery event statuses.
4. Register and align subscription/customer portal/source config routes, or move them to the Next API surface and delete duplicates.
5. Run Stripe test checkout and webhook end-to-end after auth/subscription contract is consistent.

## Deep Action Prompts

- Lead quality prompt: "Audit every lead path for fake locality, fake contact confidence, frontend scoring, and hardcoded sample leakage. Fix highest-risk path first."
- Paid delivery prompt: "Trace a GOLD lead from source fetch to paid unlock to WhatsApp delivery. Any client-supplied lead/contact/phone data must be reloaded and verified server-side."
- Source reliability prompt: "For each source, record official API status, schema completeness, freshness, postcode confidence, and whether it can support paid contact action."
- Launch truth prompt: "Find every public claim that implies live data, exclusive access, WhatsApp delivery, AI scoring, or paid unlocks. Either verify the backend path or soften the claim."

## Do Next

- Run `C:\Users\manaz\Desktop\Run-JobFilter-Daily-Audit.ps1` daily.
- After code changes, run root `npm run build`, root `npm run lint`, and legacy Functions build if Firebase files changed.
- Commit and push only scoped fixes. Keep generated build churn out unless content actually changed.

## Related

- [[Agents/JobFilter Daily 12h Audit Agent]]
- [[Product/OpenWA WhatsApp Delivery Plan]]
- [[Product/Problems and Solutions]]
- [[Product/Launch Checklist]]
- [[Sessions/Daily To-Do]]

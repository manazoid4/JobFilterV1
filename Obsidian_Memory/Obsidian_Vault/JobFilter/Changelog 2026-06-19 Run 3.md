# Changelog — 19 June 2026 (NightlyBuildAgent — Run 3)

## Container state
- Fresh container; `npm install` (359 packages, missing entirely). Build GREEN, TypeScript CLEAN before changes.
- Detached HEAD at `e581714` — this was a stale local-ref illusion, not real divergence: `git fetch origin --prune` showed `origin/main` was already at `e581714` (identical to HEAD). Local `main` branch ref was just stale from a previous checkout. Resolved with `git checkout -B main origin/main`. No data loss, no actual orphaned commits.

## Bug found and fixed — opportunity atom extraction silently dropped for sourceUrl-less leads
- **File**: `leadEngine/opportunityAtoms.ts`
- **Root cause**: `extractOpportunityAtoms()` had `if (!sourceDocumentUrl) return [];` — bailing out entirely whenever `lead.sourceUrl` was empty, regardless of how clearly the title/description matched an atom pattern (EV charger, HMO fire alarm, loft conversion, etc).
- **Blast radius**: `DirectorySignal` — the always-on "guaranteed fallback" internal lead dataset (used in `DEMO_MODE` and as the real production fallback when external sources fail) never sets `sourceUrl`. Every DirectorySignal lead was silently losing:
  - up to 14 score points (`scorer.ts` atom boost)
  - the "Why this is a job" evidence badge (`scorer.ts`)
  - risk of misclassification as `TOO_EARLY` in `leadQualityAudit.ts` ("no near-term job atom was found" — even when the description was extremely concrete, e.g. "Vaillant boiler failed, no hot water for 2 days")
  - empty `whyThisIsAJob()` summary fallback on `/api/leads/explain`
- This was the carryover gap flagged by Run 2 tonight ("DEMO_MODE mock fetchers never set lead.url, atoms still won't populate from synthetic scans") — traced it to the actual single-line root cause rather than a multi-file fetcher problem.
- **Fix**: removed the early-return guard. Atoms now extract from text regardless of URL presence; `sourceDocumentUrl` is simply empty string when no real URL exists (not rendered as a clickable link anywhere in the UI today, so no broken-link risk).
- **Verified live**: ran `leadEngine/scan.ts` directly against a DY1/electrical DirectorySignal scan — "EV Charger Install – 7kW home unit" now correctly extracts a `solar_ev` atom with real evidence text, where before it returned `[]`.
- Ran `codex-output/lead-engine-quality-regression.mjs` (passes, exercises DirectorySignal directly), `planning-contact-signal-regression`, `postcode-filter-regression`, `lead-engine-source-config-regression`, `package-copy-regression` — all pass. `lead-engine-50-plus-quality-test-fixed` shows the same `oneLeadRulePasses: 0/42` as the pre-change baseline (confirmed via git stash compare) — pre-existing network-dependent false-negative class, not a regression.
- Reverted regression-script-generated report artifacts (`.json`/`.md` in `codex-output/`) before commit.
- Build GREEN, TypeScript CLEAN, pushed to main (`fac7f2d`).

## Phase 2/3 — no new feature built, no copy changes made
- Checked all 5 candidate Tier 1 features from tonight's brief: scan counter, ICS calendar export, won leaderboard, WhatsApp templates (Quick quote offer / Availability check), trade-specific scoring reasons — **all 5 already fully shipped** by prior runs. Scan counter banner confirmed live at `FindJobsPage.tsx:441-457` (weekly limit, Monday reset, upgrade CTA).
- Phase 1 re-confirmed: all 4 `setSubmitted`/`setSent`/`setEmailDone` forms (`PostJobPage`, `FreeToolsPage`, `ProductAdvantagePage`, `WeeklySignalsPage`) wired to real `/api/waitlist` fetch calls. No fake flows, no broken imports.
- Ran a NEEDLE pass via Explore agent — its top finding ("contact route" promised on PricingPage but missing from delivered UI) was a **false positive on verification**: `lead.contactPath` already renders as "Best approach: {channel}" at `FindJobsPage.tsx:1234`. Its other two findings (CTA copy, locked-lead messaging) were re-litigating copy that's already fear→proof→control structured with named competitors, money-back guarantee, and specific value ("buyer's name, job value band, direct contact link"). Declined to force edits to already-good copy — confirms the diminishing-returns pattern Run 3 (18 June) flagged.

## Carryover (unchanged, still blocked on founder/external)
- Founder decision — add-on service pricing (dno-brief, ozev-grant-pack, gas-safe-kit, etc. — zero price shown anywhere)
- Stripe live test — blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation

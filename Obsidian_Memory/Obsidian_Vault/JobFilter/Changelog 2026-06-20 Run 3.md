# Changelog — 20 June 2026 (NightlyBuildAgent — Run 3)

## Container state
- HEAD detached at `7514a9b` on arrival. Local `main` ref was stale (cached at `609898a`, 50 commits behind). `git fetch origin --prune` showed `origin/main` had since force-updated to `7514a9b` — no local-only work, no real divergence. `git update-ref refs/heads/main origin/main` + `git checkout main` resolved it cleanly.
- `npm install` (359 packages, `node_modules` missing entirely). Build GREEN (118 pages), TypeScript CLEAN before changes.

## Reviewed founder's same-day rebrand commits (`de5631c`, `7514a9b`)
- Founder (not an agent) shipped two commits today: `de5631c` renamed the brand to "UK Construction Intelligence" (logo/nav/footer/title), then `7514a9b` reverted the product name back to JOBFILTER while keeping the new tagline — i.e. the founder self-corrected mid-session.
- Verified the end state is internally consistent: `TopNav.tsx` shows brand text "JOBFILTER" + tagline "UK Construction Intelligence"; `Footer.tsx` copyright and `app/layout.tsx` page title both say "UK Construction Intelligence". Grepped the whole codebase for leftover "UK Trade Leads" branding — none found. No fix needed.

## Feature Roadmap doc reconciliation (carried over from 19/20 June runs — "worth a reconciliation pass")
- `Product/Feature Roadmap - 8th May 2026.md` had 3 Tier 2 items marked "Not built" that were actually shipped weeks ago:
  - **#12 Commercial lead detection** — verified live (`calcProjectScale()` in `leadEngine/normaliser.ts`, LARGE PROJECT badge on FindJobsPage/LeadDetailPage). Marked BUILT.
  - **#17 Job value tracking** — verified live (`getValueAccuracy()` in `winStore.ts`, "Quoted vs landed" stat on DashboardPage). Marked BUILT.
  - **#15 Multi-channel follow-up** — confirmed partially built (WhatsApp + SMS fallback + EMAIL ME THIS LEAD chase all live; two-way messaging still missing). Updated from "Not built" to "Partial" to match #13's existing language.
- This closes a doc-drift gap flagged by name in the last two runs' carryover notes; future runs no longer need to re-check these three as candidate "unbuilt Tier 1/2 features."

## NEEDLE pass (Explore agent + manual verification)
- Ran a fresh NEEDLE pass on 5 less-recently-touched pages (Compare* family). Agent flagged two candidate issues; both turned out to be false positives on manual verification — recorded here so the next run doesn't re-flag them:
  - "Missing trust line on CompareBarkPage" — false positive. Bark's hero CTA already says "TRY JOBFILTER FREE — NO CARD NEEDED" inline (same pattern as CompareCheckatradePage/CompareBuildAlertPage); MyBuilder/TrustATrader/RatedPeople use a separate trust line below the buttons instead. Both are valid, already-used patterns on this site — not an inconsistency worth changing.
  - "Inline `style={{...}}` color props instead of Tailwind classes" on Compare* headlines — these already reference the correct CSS vars (`var(--navy)` etc.) via `style`, just not via a Tailwind utility class. Cosmetic syntax preference, not a design-system violation; left unchanged per "don't refactor things that aren't broken."
  - Also re-confirmed the "competing hero CTA" pattern (two full-weight `jf-button`s side by side) is consistent and intentional across all 6 Compare* pages (primary "scan free" CTA + secondary "see full comparison" anchor-as-button) — same conclusion past runs reached when auditing this pattern; not the same bug class as the HomePage/TerritoriesPage/NewsPage fix (those had a second *competing external* CTA, not an in-page anchor).

## Phase 1 — re-confirmed, no fake flows
- All 5 `setSubmitted`/`setSent`/`setEmailDone` forms (`WeeklySignalsPage`, `ProductAdvantagePage`, `ForgotPasswordPage`, `PostJobPage`, `FreeToolsPage`) wired to real `/api/waitlist` fetches or Supabase calls. No broken local imports.

## Regressions
- All 17 `codex-output/*.mjs` scripts run via `npx tsx`. Same known false-negative class as every prior run (live-server/network-dependent: `free-preview-live-contract-test`, `lead-engine-50-plus-quality-test-fixed`, `site-conversion-quality-test`, `ten-postcode-source-smoke` — the last due to an upstream Planning Data API timeout tonight, not our code). All others pass. No report artifacts generated this run (clean `git status` after the regression run).

## Build status
- Build GREEN (118 pages), TypeScript CLEAN. Only change this run: the roadmap doc fix (vault-only, no app code touched). Pushed to main.

## Carryover (unchanged, still blocked on founder/external)
- Founder decision — add-on service pricing (dno-brief, ozev-grant-pack, gas-safe-kit, etc. — zero price shown anywhere)
- Stripe live test — blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- **Diminishing returns continues** — independent NEEDLE pass tonight (5 fresh pages, Explore agent + manual verification) found zero real bugs, both candidate findings were false positives on closer inspection. Combined with ~3 weeks of prior runs reaching the same conclusion, the buildable backlog of single-run-sized fixes appears genuinely exhausted. Next genuinely new single-run-sized work will most likely come from a founder-driven change (new PR, new copy direction, a newly unblocked carryover item) rather than another generic sweep — same pattern noted on 19/20 June.
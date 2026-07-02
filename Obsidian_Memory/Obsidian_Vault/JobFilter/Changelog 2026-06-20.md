# Changelog — 20 June 2026 (NightlyBuildAgent)

## Container state
- Local `main` ref was stale (179 commits diverged from `origin/main`, which sat at `1db7373`); `git reset --hard origin/main` resolved it (working tree was clean, no local-only commits lost). `npm install` (359 packages, missing entirely). Build GREEN, TypeScript CLEAN before changes.

## Bug found and fixed — leftover "BIN" tier label in the weekly signals RSS feed
- **File**: `src/lib/signalGenerator.ts:452`
- **Root cause**: PR #285 (19 June, landed just before this run) standardized lead-tier naming from BIN to BRONZE across comparison/marketing pages, but missed the RSS `<description>` template string in `generateRSSFeed()`. The externally-syndicated `/signals/weekly` feed (consumed by RSS readers/aggregators outside our own UI) was still publishing "X GOLD, Y SILVER, Z BIN" — the exact inconsistency #285 was meant to close, just in a feed nobody had grepped for it in app pages.
- **Fix**: one-word string change, `BIN` → `BRONZE`, in the RSS item description template.
- Left the file's top-of-file comment ("GOLD/SILVER/BIN scoring") alone — internal comment, not user-facing, out of scope for a copy-naming fix.
- Verified: TypeScript clean, build green (110+ static pages), no other "BIN" tier-label occurrences found anywhere in `src/` or `leadEngine/` via targeted grep (28 files matched the substring "bin" but all are unrelated English words — bins/Dublin/etc — only this one was the tier label).

## Phase 1 — re-confirmed, no fake flows
- All 4 `setSubmitted`/`setSent`/`setEmailDone` forms (`PostJobPage`, `FreeToolsPage`, `ProductAdvantagePage`, `WeeklySignalsPage`) read-verified: each awaits a real `fetch('/api/waitlist', ...)` and only flips state to `true` after `res.ok`, with a catch branch setting an error message instead. No broken imports found.

## Phase 2/3 — no new feature or copy changes
- Re-confirmed all 5 candidate Tier 1 features from tonight's brief (scan counter, ICS export, won leaderboard, WhatsApp templates, trade-specific scoring) are already shipped, same as every run since 12 June.
- Checked Tier 2 #17 (Job value tracking) — already built (`getValueAccuracy()` in `winStore.ts`, "Quoted vs landed" stat on DashboardPage) despite the Feature Roadmap doc still marking it "Not built" — the roadmap doc itself is stale, not the product.
- Grepped `leadEngine/` for the same falsy-but-valid early-return class of bug that caused last night's `sourceUrl` fix (Run 3, 19 June) — found 5 other `if (!x) return null/[]` guards (`aiClient.ts` ×3, `leadQualityAudit.ts`, `normaliser.ts`, `planningDataFetcher.ts`) and 3 in `scorer.ts`/`opportunityAtoms.ts` — all checked and legitimate (missing API key, invalid title, no value data), none silently dropping valid data. No further instances of that bug class found.
- Declined to run a fresh NEEDLE/copy pass — confirms the diminishing-returns pattern flagged by every run since ~14 June; today's one real fix came from checking PR #285's actual diff for missed surfaces, not from a generic UX sweep.

## Regressions
- All 17 `codex-output/*.mjs` scripts run via `npx tsx`. Non-network ones pass (`backend-contract`, `free-scanner-redaction`, `intake-fixed-schema`, `lead-engine-quality`, `lead-engine-source-config`, `outcome-tracking`, `package-copy`, `planning-contact-signal`, `planning-locality`, `postcode-filter`, `unified-find-jobs`, `whatsapp-direct-chat`, `whatsapp-env`). Known false-negative class fails again, unchanged from every prior run: `free-preview-live-contract-test` (needs a live server on :3000), `lead-engine-50-plus-quality-test-fixed` (`oneLeadRulePasses: 0/42`, confirmed pre-existing baseline by multiple prior runs), `site-conversion-quality-test` (`oneLeadRule: NO`, same root cause), `ten-postcode-source-smoke` (upstream PCS API returned HTTP 503 tonight — external outage, not our code).
- Reverted the two regression-script-generated report artifacts (`codex-output/lead-engine-50-plus-quality-test-fixed.{json,md}`) before commit — not an intentional change.

## Build status
- Build GREEN, TypeScript CLEAN. Pushed to main (`729bdc2`).

## Carryover (unchanged, still blocked on founder/external)
- Founder decision — add-on service pricing (dno-brief, ozev-grant-pack, gas-safe-kit, etc. — zero price shown anywhere)
- Stripe live test — blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation

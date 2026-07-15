# Changelog — 2026-07-15 Run 3 (NightlyBuildAgent)

## Summary
font-bold sweep extended from pages into components. 5 body paragraphs converted from `font-black` → `font-bold` across 4 component files. Build and TypeScript both clean. Sweep is now complete across all pages AND components.

## Founder Activity
No new commits or open PRs since Run 2 (63c0ff7). All carryover blockers unchanged.

## Changes Made

### font-bold sweep — Components (5 changes across 4 files)

Previous runs swept all page files. This run targeted `src/components/` — the shared components rendered on many pages simultaneously.

**ErrorBoundary.tsx (line 43)**
- Error page body paragraph: "Not your fault. Ours. The page crashed but the rest of the site is fine." — `font-black` → `font-bold`
- Affects every user who hits a runtime error

**Footer.tsx (line 64)**
- Brand body paragraph: "Not a London startup guessing. Built by people who know how trades work." — `font-black` → `font-bold`
- Shown on EVERY page in the site footer

**LeadValueKit.tsx (lines 25, 51)**
- Paywall description: "Unlock the quote floor, follow-up cadence, and next action beside each lead." — `font-black` → `font-bold`
- Instruction sentence: "Use the call, quote, and chase sequence together." — `font-black` → `font-bold`
- Rendered on every authenticated lead click-through (LeadDetailPage)

**FeedbackPrompt.tsx (line 17)**
- Two-sentence body: "We are not some techy company guessing from a desk. Tell us what wastes your time, what jobs you want more of, and what we can build to solve your problems." — `font-black` → `font-bold`
- Rendered on several authenticated pages

## Invariants Preserved
- `font-black` kept: all labels, badges, micro-labels, button text, short disclaimers, guarantee lines, status chips, data indicators, form element text, column headers, one-line data values
- No route paths changed
- No new pages created
- No GOLD/SILVER/BRONZE label changes
- No GDPR-adjacent data changes

## font-black Audit — Components (confirmed correct as-is)
- `SeriousBuyerScore.tsx`: uppercase badge labels — correct
- `ScoreBadge.tsx`: "Score" micro-label — correct
- `SampleLeadCard.tsx`: badges, data chips, value displays — correct
- `LeadReadinessBadge.tsx`: badge spans and single-word action chips — correct
- `EpcSignalCard.tsx`: address heading, rating labels, trade single-line, signal single-line — correct
- `ROITracker.tsx`: empty-state section titles (single sentence acting as heading), stat labels — correct
- `WinStatsBanner.tsx`: dynamic single-sentence data message — correct
- `TopNav.tsx`: nav links, mobile shortcut labels, badges — correct
- `LeadCard.tsx`: badges, status chips, heading — correct
- `QuickResponseKit.tsx`: template labels, status badges — correct
- `MaterialEstimator.tsx`: column headers, form input values, calculation labels — correct
- `ChaseStatus.tsx`: status chips — correct
- `WinSummary.tsx`: single-sentence stat on yellow bg — correct

## Build Status
- `npx tsc --noEmit`: clean
- `npm run build`: all pages built successfully

## Git
- Commit: `[NightlyBuildAgent] font-bold sweep: components (5 changes across 4 files)`
- Hash: `fe05999`
- Branch: main
- Push: success

## Carryover Blockers (unchanged)
- Add-on service pricing — blocked on founder decision
- Stripe live test — blocked on Vercel test keys
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 — blocked on SMTP creds + manual activation

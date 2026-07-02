# Changelog — 2 July 2026 (NightlyBuildAgent)

## Container state
- Fresh container, `node_modules` missing entirely. `npm install` (359 packages, 18 vulnerabilities — pre-existing, same as prior runs).
- HEAD at `origin/main` (`b259d2c`) — only vault commits since last app-code change (1 July 2026, `04d17dd`). No new founder commits or open PRs.
- `npm run build` GREEN (113 pages), `npx tsc --noEmit` CLEAN before any changes.

## Founder activity check
- No new app-code commits or open PRs since 1 July. All carryover blockers unchanged (Stripe keys, SMTP creds, TradeFlow URL scheme, add-on pricing decision all remain pending founder action).

## Phase 1 — re-confirmed clean
- All `setSubmitted`/`setSent`/`setEmailDone`/`setDone` sites remain wired to real endpoints. No broken imports (clean Next build across 113 routes).
- Tier 1 feature audit: all features confirmed built (scan counter, ICS export, WinStatsBanner, WhatsApp templates, trade-specific scoring).

## Phase 2 — no new Tier 1 features to build
- All items from agent brief are BUILT per prior runs. No new buildable items without external infrastructure (Stripe, SMTP, TradeFlow URL, PlanWire partnership).

## Phase 3 — Copy polish

### DashboardPage bug fix (paid-user scan messaging)
- **Bug**: `DashboardPage.tsx` showed "X of 3 used · resets Mon" and "Scan limit reached — Upgrade for unlimited →" for ALL users including paid users who've done 3+ scans. The page already fetches `isPaid` from `/api/leads/roi-stats` but never used it for the scan display.
- **Fix**: Gated both scan messages on `!isPaid`:
  - Paid users now see `X this week (unlimited)` instead of `X of 3 used · resets Mon`
  - "Scan limit reached" upgrade link hidden when `isPaid === true`
- **Files changed**: `src/pages/DashboardPage.tsx` lines 503–504

### AdminGuardTeaserPage duplicate copy
- **Bug**: "THE BIGGER PICTURE" section had two adjacent paragraphs saying the same thing: first "better local work, cleaner follow-ups, and admin dates they cannot afford to miss", then "Not another bloated trade app. Just better jobs, cleaner follow-ups and admin dates you cannot afford to miss." — verbatim duplication across two paragraphs.
- **Fix**: Replaced second paragraph with distinct copy: "Not another bloated trade app. One system: find the work, chase it, and never miss the deadline that costs you a fine."
- **Files changed**: `src/pages/AdminGuardTeaserPage.tsx` line 137

## Phase 4 — Site health check (NEEDLE/BUILDER/CRITIC/REVENUE)

**NEEDLE** ran Explore agent across PricingPage, LeadListPage, FindJobsPage.

### LeadListPage — competing CTAs (fixed — highest impact)
- **NEEDLE**: Every lead card had two equal-weight `flex-1` buttons side by side: green "OPEN WHATSAPP CHAT" and navy "VIEW FULL DETAILS →" — identical visual weight, primary action competing with secondary.
- **BUILDER fix**: Demoted "VIEW FULL DETAILS →" from `flex-1` to `shrink-0` and shortened label to "VIEW →". WhatsApp action now visually dominant.
- **CRITIC**: Clearer in <3 seconds? YES — trade's eye goes straight to the action that matters.
- **REVENUE**: Increases £39/mo likelihood? YES — faster WhatsApp contact = higher win rate = stronger retention argument.
- **Files changed**: `src/pages/LeadListPage.tsx` line 311

### PricingPage — duplicate ROI stat (fixed)
- **NEEDLE**: "Average UK trade job: £800–£3,000" appeared twice — once in hero (conversion anchor) and again as the opening sentence of "WHAT ONE MONTH LOOKS LIKE". Same stat, same point, made twice with no new information.
- **BUILDER fix**: Removed the duplicate stat from the "WHAT ONE MONTH LOOKS LIKE" section. Section now opens directly with the conversion point. Hero retains the anchor stat.
- **Files changed**: `src/pages/PricingPage.tsx` line 93

### FindJobsPage — triple scan message (NOT fixed — false positive on closer inspection)
- NEEDLE flagged triple "3 free scans / no credit card" mention. Verified: hero paragraph (intro copy), chip badges (persistent trust tags), and dynamic counter (changes as scans are used) all serve distinct roles. Not a real duplication issue.

## Build status
- Build GREEN (113 pages), TypeScript CLEAN after all changes. 4 files changed, 6 insertions(+), 6 deletions(-). Pushed to `main` (`7926542`).

## Carryover (unchanged, still blocked on founder/external)
- **Stripe live test** — blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button** — blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)** — blocked on SMTP creds + manual activation
- **Add-on service pricing** — 14 add-on services still have no £ shown; founder decision on free-perk-vs-paid-addon still pending
- **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path

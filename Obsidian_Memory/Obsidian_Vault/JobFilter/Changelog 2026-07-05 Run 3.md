# Changelog 2026-07-05 Run 3

**NightlyBuildAgent — Run 3**
Commit: `7a0322e`

---

## Container State
- Fresh container. npm install complete. Build GREEN (113 pages), TS CLEAN before and after changes.
- HEAD synced to origin/main (`a50e042`, Run 2 vault commit). No new founder commits or PRs since Run 2.

## Founder Activity
- Zero new founder commits or PRs since Run 2 today. All carryover blockers unchanged.

## Phase 1 — No Broken Flows
- Re-confirmed: no fake form submissions, no broken imports. Clean build.

## Phase 2 — Tier 1 Features
All Tier 1 features confirmed built. No new features to build this run.

## Changes Made

### Compare pages × 5 — bottom CTA rewrites (fear→proof→control)

All five competitor compare pages had the same problem: generic, vague bottom CTAs that could apply to any SaaS product. No named competitors, no timing proof, no specific fear. The Bark page was fixed in Run 2; this run closes the other four.

Pattern applied to each: **fear** (specific competitor pain the tradesman has felt) → **proof** (planning/contracts/signals, 3–5 day timing advantage) → **control** (£39/month flat, named what's removed).

**CompareMyBuilderPage.tsx**
- Old: "Stop competing. Start scanning." / "Find leads no other trade is looking at — scored by planning data, contract value, and contact strength."
- New: "Stop paying credits to compete with four other trades on the same job." / "JobFilter reads planning approvals, council contracts, and energy signals — 3–5 days before MyBuilder or Bark list the same job. £39/month flat. No credits. No auctions."
- Why: MyBuilder's specific pain is credits + shared job auction. Named both competitors. Cites 3–5 day advantage.

**CompareCheckatradePage.tsx**
- Old: "STOP COMPETING. START FILTERING." / "Scan your area free. See what work is active near you — before it hits Checkatrade."
- New: "STOP RENTING YOUR BUSINESS FROM CHECKATRADE." / "JobFilter scans planning approvals, council contracts, and energy signals — 3–5 days before jobs reach any directory. £39/month flat. No renewal letter. No profile lock-in."
- Why: Checkatrade's specific pain is ownership lock-in (reviews theirs, profile disappears on cancel, renewal price hikes). New headline targets that fear directly.

**CompareBuildAlertPage.tsx**
- Old: "BUILDALERT SHOWS YOU WHAT'S PLANNED. WE SHOW YOU WHAT'S WORTH CHASING." / "Scan your area free. See what work is active near you — including the signals BuildAlert doesn't cover."
- New: "BUILDALERT CHARGES £2 PER LETTER. STOP PAYING PER SCAN." / "JobFilter reads planning approvals, council contracts, and energy signals — all three, not just planning. Unlimited scans for £39/month flat. One job pays the month."
- Why: BuildAlert's specific pain is per-letter fee (£2 each = £40 for 20 scans). Headline makes the maths obvious. Also names their coverage gap (planning only vs 3 sources).

**CompareRatedPeoplePage.tsx**
- Old: "Stop competing on reviews. Start scanning data." / "Find UK construction leads no other trade is chasing — scored by planning intent, contract value, and contact strength."
- New: "Rated People hands the same job to five trades. Stop quoting against yourself." / "JobFilter reads planning approvals, council contracts, and energy signals — 3–5 days before Rated People or MyBuilder list the same job. £39/month flat. No credits. No race to the bottom."
- Why: Rated People is a credit/auction system like MyBuilder. Specific fear: the race-to-the-bottom when 5 trades get the same enquiry. Names Rated People AND MyBuilder (both are the same model).

**CompareTrustATraderPage.tsx**
- Old: "Stop waiting for reviews. Start scanning for jobs." / "Find leads no review profile can surface — scored by planning signals, contract value, and contact strength."
- New: "TrustATrader leads come when a homeowner decides to post. Stop waiting." / "JobFilter reads planning approvals, council contracts, and energy signals — jobs moving forward before they reach any directory. £39/month flat. No waiting for your ranking to improve."
- Why: TrustATrader is a review directory — you wait for inbound. Specific fear: passive dependence on homeowners finding you. Headline names the exact failure mode.

### SignupPage.tsx — TRADES list expanded 11 → 19

The TRADES dropdown on SignupPage had 11 options while the site covers 20 trades (ForYourTradePage, WeeklySignals modal). A Solar PV installer, Fire Safety engineer, or Structural Engineer signing up had no matching option and either picked an incorrect trade or abandoned.

Added 8 trades, all mapped to existing engine score categories (no engine changes needed):
- CCTV/security installer → 'electrical'
- Data cabling engineer → 'electrical'
- Fire safety engineer → 'electrical'
- Groundworker → 'landscaping' (previously "Landscaper / groundworks" was one entry, now split)
- Quantity surveyor → 'building'
- Scaffolder → 'building'
- Solar PV installer → 'electrical'
- Structural engineer → 'building'

List is now sorted alphabetically (19 trades). Default state value ('electrical') still valid — matches 'Electrician' entry.

## Site Health — NEEDLE/BUILDER/CRITIC/REVENUE
- **NEEDLE**: Top issues: (1) All 5 compare pages had weak/generic bottom CTAs — the highest-traffic conversion moment for comparison shoppers; (2) SignupPage TRADES list was missing 8 trades that the site actively markets to.
- **BUILDER**: Both fixed in this run.
- **CRITIC**: Clearer in <3s? YES — comparison visitors can now immediately see the specific pain point named in the headline before scrolling down.
- **REVENUE**: YES — comparison shoppers are the highest-intent visitors (they've already searched "JobFilter vs Bark" etc.); naming the competitor's specific failure at the bottom CTA closes the argument.

## Build Status
- Build GREEN (113 pages), TypeScript CLEAN. Pushed to main (`7a0322e`).

## Carryover Blockers (unchanged)
- Founder decision — add-on service pricing: 14 add-on services still have no £ shown
- Stripe live test — still blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Next Run Recommendations
1. **Check for new founder commits/PRs first** — buildable backlog now very small.
2. **ActivationPendingPage TRADES select** — may have the same 11-trade limitation as SignupPage had. Check and expand if so.
3. **AlertSetupWidget trade filter** — confirm the trade select in alert setup also covers all 19 trades.
4. **Carryover blockers remain the main unlock** — Stripe keys, add-on pricing decision, TradeFlow URL scheme.

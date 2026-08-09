# Changelog — 2026-08-09

## NightlyBuildAgent Run

### Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)

### Feature Check (Tier 1 — all already built)
- Scan counter ("X free scans remaining this week"): DONE
- Google Calendar ICS export: DONE
- Won leaderboard (WinStatsBanner): DONE
- WhatsApp templates (Quick quote offer + Availability check): DONE
- Trade-specific scoring UX (trade-matched reasons on lead cards): DONE

### Copy Polish

**FindJobsPage.tsx**
- Scan-exhausted message: the previous agent already improved this to "Buyer details locked — scan is still free. Upgrade to see who to call."
- Gold lead gate label: "THIS JOB HAS A BUYER — MEMBERS ONLY" → "BUYER NAME LOCKED — FULL ACCESS BELOW"
- Gate body: passive "Review the buyer, deadline..." → fear-first "Bidding without knowing the buyer wastes your time. Unlock the buyer name, deadline, and submission route before you commit."
- Gate CTA button: "SEE BUYER DETAILS — £39/MO →" → "UNLOCK BUYER DETAILS — £39/MO →"
- Gate sub-text: now shows "No credit card required to scan · public tender"
- Upgrade nudge footer: replaced corporate disclaimer with plain-English benefit copy + "No credit card required to scan"

**PricingPage.tsx**
- Both free CTAs: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD NEEDED →"
- Pilot plan body: replaced jargon ("delivery features activate only when relevant account and provider setup is ready") with benefit-first copy ("Know which public tenders fit your firm — and which to skip. Stop wasting time on bids that were never going to land.")
- Small-print note clarified for specificity

### Site Health Issues Found (NEEDLE)
1. **Gold lead gate** (fixed): "MEMBERS ONLY" label didn't tell tradesmen WHAT they miss. Now explicitly names buyer name, deadline, submission route.
2. **Pricing CTAs** (fixed): "SCAN FREE FIRST" offered no reassurance. Now says "NO CARD NEEDED" inline.
3. **Pilot plan description** (fixed): Corporate language describing internal process state, not user benefit.

### CRITIC Check
- Gate copy fix: clearer in <3 seconds — YES. "BUYER NAME LOCKED" is immediately understood vs "MEMBERS ONLY"
- Pricing CTA fix: "NO CARD NEEDED" removes hesitation at the exact moment of decision

### REVENUE Check
- Gate fix: increases likelihood of clicking pricing link by naming the specific thing locked (buyer name = who to call = money)
- Pricing CTA: removes friction on free scan entry path, which is the top-of-funnel for conversion

### Branch / PR
- Branch: nightly/copy-polish-2026-08-09
- PR: #449 (open, updated with new commits)

# Changelog 2026-08-24 — NightlyBuildAgent

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)
- Dependencies: Fresh install required (node_modules absent in remote container)

## Phase 1 — Fix Broken
- No broken builds or TypeScript errors found after fresh npm install

## Phase 2 — Features
All Tier 1 features already built in prior sessions:
- Scan counter (weekly reset, Monday midnight): DONE
- Google Calendar ICS export: DONE
- WinStatsBanner (/api/wins/stats): DONE
- WhatsApp templates (quick_quote_offer + availability_check): DONE

**New this run:**
- WinStatsBanner zero-state: Component now shows placeholder when `wonCount === 0` — "No wins logged in your area yet — be the first to track a job won." Previously returned null silently.

## Phase 3 — Copy Polish

### FindJobsPage.tsx (no-scan state)
- Removed: SVG map illustration (decorative noise, slows comprehension)
- Removed: Background dot pattern (SVG data URI)
- Removed: "READY?" micro-label + generic "CHECK THE CURRENT PUBLIC-TENDER FEED." headline
- Added: "YOUR PATCH RIGHT NOW" micro-label
- Added: Fear hook headline — "EVERY WEEK YOU DON'T SCAN IS WORK YOUR COMPETITORS ARE PRICING."
- Added: Proof line — "Planning approvals, energy ratings, contract notices — scored for your trade before Checkatrade, Bark, or MyBuilder list the same job."
- Added: "Takes 10 seconds · No credit card required" footer note
- Result: Reads in <2 seconds. Fear → proof → control. No fluff.

### TrustCenterPage.tsx (accuracy fix)
- Removed: "One exclusive territory lock — your patch, nobody else in it" (false — any trade can scan any postcode)
- Added: "Your scan is private — other trades scanning the same postcode see nothing of yours" (accurate + still compelling)

## Phase 4 — Site Health

### NEEDLE — Top 3 UX issues found
1. FindJobsPage "no scan yet" state used a generic SVG map and corporate headline that wouldn't hook a tradesman — fixed this run
2. TrustCenterPage "exclusive territory lock" claim was factually wrong — could damage trust — fixed this run
3. WinStatsBanner disappeared silently with zero wins, missing an opportunity to introduce win-tracking concept to new users — fixed this run

### BUILDER — Fixes applied
All three issues fixed in this run.

### CRITIC — Clearer in <3 seconds?
- YES: "Every week you don't scan is work your competitors are pricing" is scannable and actionable
- YES: TrustCenterPage now makes an accurate claim that still builds confidence

### REVENUE — Increases likelihood of £39/month?
- YES: Fear hook drives scan action → see value → convert
- YES: Trust accuracy prevents late-stage doubt when users investigate further

## Commit
- Branch: nightly/2026-08-24-copy-ux
- PR: https://github.com/manazoid4/JobFilterV1/pull/504

## Next Run — Top 3 Priorities
1. Copy polish: ForYourTradePage bottom CTA section — test the WaitlistForm component is wired (check /api/waitlist endpoint)
2. Feature: Trade-specific scoring UX — electrician badge labels should emphasise EV charger/rewire/EICR explicitly; currently parsing `reasons` array which is good but the fallback label "Verified signal" is too vague
3. Review PR #504 CI — if check passes, merge to main

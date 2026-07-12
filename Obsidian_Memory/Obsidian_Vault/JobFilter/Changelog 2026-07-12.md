# Changelog 2026-07-12 — NightlyBuildAgent

## Summary

Build: GREEN (Next.js, 113 pages)
TypeScript: CLEAN
Commit: `7b960ad`

---

## Container State

Fresh container — `npm install` required (build failed with "next: not found" before install). HEAD synced to `0eaa9ca` (vault auto-digest Jul 12 09:26 UTC). Build GREEN, TS CLEAN before changes.

---

## Founder Activity Check

No new founder commits or open PRs since Jul 11 Run 3. Last founder commit: PR #332 (postcode-first reorder on FindJobsPage, merged 2026-07-11 10:50 UTC). All carryover blockers unchanged.

---

## Phase 1 — Fix Broken

No broken builds. No broken imports. All forms confirmed wired to real endpoints. Build GREEN before and after changes.

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT (same as prior runs). No new features to build.

---

## Phase 3 — Copy Polish

### Pages changed: HomePage + CompareBuildAlertPage + CompareCheckatradePage

**HomePage (src/pages/HomePage.tsx):**
- Hero primary CTA: `SCAN FREE — NO CARD NEEDED` → `SCAN FREE — NO CARD NEEDED →`
  - **Why:** The primary hero CTA on the highest-traffic page was missing the `→`. Every other comparable page (PricingPage, SignalsPage, ComparePages) had arrows on their hero CTAs. This made the most important CTA on the site look terminal instead of actionable.
- Territory section secondary CTA: `SCAN FREE — NO CARD NEEDED` → `SCAN FREE — NO CARD NEEDED →`
  - Same issue — secondary CTA paired with `CHECK MY PATCH →` (had arrow) but scan free didn't.

**CompareBuildAlertPage (src/pages/CompareBuildAlertPage.tsx):**
- Hero dark CTA: `TRY JOBFILTER FREE — SEE WHAT BUILDALERT DOESN'T SHOW YOU` → added `→`
  - Carryover from Jul 11 Run 3. All other compare page hero CTAs have arrows.

**CompareCheckatradePage (src/pages/CompareCheckatradePage.tsx):**
- Pricing card CTA: `GET FOUNDING 30` → `LOCK YOUR PATCH — £39/MO →`
  - Weak copy with no price anchor and no arrow. Every other pricing CTA across the site uses "LOCK YOUR PATCH — £39/MO →". This was the only outlier.
- Market comparison section: `Every major UK lead platform sells...` → `Every major UK lead service sells...`
  - "platform" is a banned word in JobFilter copy (design direction). Changed to "service".

---

## Phase 4 — Site Health Check (4-agent NEEDLE)

### NEEDLE — Top findings:

1. **HomePage hero CTA missing `→`** (highest impact) — The primary action on the entire site's most-visited page had no directional arrow. Every other CTA that sends users to /find-jobs or /pricing already has `→`. The hero CTA is seen by every visitor above the fold and should be the most action-inviting element on the site.

2. **CompareBuildAlertPage hero CTA missing `→`** — Carryover from last run. All 5 compare page hero CTAs now have arrows.

3. **CompareCheckatradePage "GET FOUNDING 30"** — Only remaining instance of the old `GET FOUNDING 30` copy anywhere in the codebase. No price, no arrow. Replaced with the site-standard "LOCK YOUR PATCH — £39/MO →".

### BUILDER — Fixes applied:
All 3 issues fixed across 3 files (see Phase 3 above).

### CRITIC: Is the fix clearer in <3 seconds? **YES** — The hero CTA now reads as an action, not a label. The `→` is a directional signal; without it, the button looks like a statement rather than a gateway.

### REVENUE: Does it increase likelihood of paying £39/month? **YES** — The homepage is where most visitors decide whether to try the product. A primary CTA that looks terminal (no arrow) reduces click-through vs one that looks directional. More scans = more lead exposure = more conversions to £39/mo.

---

## Carryover Blockers (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test** — still blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow"** — blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)** — blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Check for new founder commits/PRs first
2. Run `npm install` + `npm run build` + `npx tsc --noEmit` before anything else (npm install is mandatory on fresh containers)
3. Sweep remaining `jf-button` CTAs on lower-traffic pages (TradieZonePage, TradieStackPage, WayleavePackPage) — not yet swept
4. CompareCheckatradePage "GET FOUNDING 30" FULLY SWEPT — do not re-check
5. Carryover blockers remain the main unlock

---

*Agent: NightlyBuildAgent*
*Date: 2026-07-12*
*Run: 1*
*Commit: 7b960ad*

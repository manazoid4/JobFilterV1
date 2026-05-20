# Rolling Launch Summary

---

## 20 May 2026 — Homepage Improvements + City Intelligence

**Branch:** `claude/homepage-improvements-20260519`
**PR:** manazoid4/JobFilterV1#142 (open, Codex clean, 4 commits)

### Focus
Product depth + paid feature differentiation. Two new paid features shipped. Pricing and homepage copy overhauled to match vault definitions. Codex review bugs all fixed.

### What Changed

**New: First Strike (QuickResponseKit)**
- `src/components/QuickResponseKit.tsx` — WhatsApp template kit, auto-selects template for lead age, copies in one tap, auto-tracks lead in chaseStore
- Locked state: blurred preview + upgrade CTA for free users
- Integrated into FindJobsPage — renders below action buttons on GOLD/SILVER leads
- GOLD leads now show yellow urgency bar ("Detected X ago — first mover window open")

**New: City Intelligence Page**
- `src/pages/CityIntelligencePage.tsx` — `/intelligence/:city` route (6 cities)
- Weekly territory briefings: score, signal counts, hot lead spotlight, market note, action list, tool tip
- Paid gate: free users see counts + trends only; spotlight + analysis locked
- Access key fixed to `jf-unlimited-tester` (was wrongly `jf_dev_unlock`)
- Route wired in `App.tsx`

**PricingPage**
- City Intelligence added: featureCategories, toolIcons, comparisonRows, included list
- 2-month minimum contract: Founder card body + FAQ "Can I cancel" answer updated
- Vault product names confirmed throughout: First Strike, Vicinity, Vantage, Win Engine, Letterhead Pack, Patch Watch, Territory, City Intelligence

**NewsPage**
- City intelligence CTA strip added: per-city links + "UNLOCK WITH PATCH PLAN — £39/MO"

**HomePage**
- HOW IT WORKS: 3-row stacked layout replacing gimmicky arrows + phone mockup
- CTA headline: "QUIT WORKING FOR GHOSTS."
- Trust cards: vault-accurate copy (no auction, no timewasters, WhatsApp first)
- "Not a lead marketplace. A construction intelligence layer." positioning

### Bug Fixes (Codex review)
- `row.top` gated for paid users — was leaking job/location hints in signal table
- `QuickResponseKit` tracking: live `isLeadTracked()` check prevents stale state overwrite
- `FindJobsPage.trackLead()`: also guards on `isLeadTracked()` — prevents First Strike import being overwritten by TRACK THIS LEAD button

### Copy Constraints Maintained
- No source names, portals, or data-source mechanics in public copy
- No "exclusive" / "nobody else sees this" claims
- All product names from vault

### Next Steps for Next Agent
1. Merge PR #142 to main → Firebase deploy
2. Wire real intelligence data to CityIntelligencePage (currently static demo data) — consider API endpoint or Supabase table
3. Add `/intelligence/:city` links from city SEO pages (`CityBirmingham`, `CityLondon`, etc.)
4. Test First Strike on mobile — check copy UX on small screens
5. Update `AGENTS.md` / `AGENT_RUNNING_MODEL.md` if those exist

### Build
- `npm run build`: ✅ PASS on all 4 commits
- No TypeScript errors

---

## 5 May 2026

Focus:

- Overhauled public positioning around JobFilter as a human-staffed lead filtering service, not a generic SaaS dashboard.
- Pricing moved to Free / Founding 30 / Pro.
- Product pages reframed around done-for-you operator support and clearer trade outcomes.

What changed:

- Added WhatsApp Bodyguard section.
- Added EPC page.
- Added For Your Trade page.
- Fixed nav, footer, and mobile presentation issues.
- Expanded tips and legal content.

Verification:

- `npm run lint` passed.
- `npm run build` passed.

Next work:

- Keep lead quality and WhatsApp delivery ahead of UI polish.
- Wire paid access so pricing gates data depth, not page access.
- Verify build before any production Firebase deploy.

---

## 4 May 2026

Focus:

- Deep research run: live web search on competitor landscape and WhatsApp market data
- 8 new AI quoting tools identified (BuildScope, TradeFlow, Quotable, QuoteGuru, PriceUp, QuoteSmith, PricingPro, Quote My Build) — all post-lead, all confirm JobFilter's upstream "filter before the quote" position
- WhatsApp confirmed as primary channel: 89–95% UK trades use it, 98% open rate, Twilio ~£0.04/msg
- Researched Dikaio AI, Scoop Solar, Siteflo, Construction AI — none relevant
- Updated builder agent prompt with full competitive context and sharpened positioning
- Updated competitor research note with new tool table and WhatsApp data

What changed:

- `System/Research for Build Agent - 4th May 2026.md` — full overwrite
- `Product/Competitor Research - 2 May 2026.md` — new AI quoting + WhatsApp sections added

Next work:

- Wire Stripe (Checkout Session, Pro + Founding 30)
- Firebase Auth
- Twilio WhatsApp keys (configuration, not a build task)

---

## 2 May 2026

Focus:

- Organised data-source status.
- Captured competitor research.
- Saved one-lead-per-week payment scenarios.
- Added website intake test mode at `/intake-test`.
- Added useful trade signals/news route at `/news`.
- Fixed PlanningData source gating.
- Reverted lead-engine free tier limit from 25 to 5.
- Ran 10-postcode source smoke test.
- Implemented scenario learning into the visible scanner: `/find-jobs` now uses the unified lead engine instead of Contracts Finder only.
- Free preview still locks buyer, URL, deadline, exact value, contact signal, and action route.
- Improved planning leads with source URL, buyer, and deadline to count as strong action signals.
- One-lead-rule pass rate is now 42/42.
- Added intake outcome tracking: won, lost, no answer.
- Confirmed WhatsApp gold-lead path works in stub mode. Real Twilio keys are missing.

What changed:

- `src/pages/IntakeTestPage.tsx`
- `src/pages/NewsPage.tsx`
- `src/App.tsx`
- `src/components/TopNav.tsx`
- `codex-output/intake-test-mode-regression.mjs`
- `codex-output/news-link-regression.mjs`
- `codex-output/lead-engine-source-config-regression.mjs`
- `codex-output/ten-postcode-source-smoke.mjs`
- `codex-output/unified-find-jobs-regression.mjs`
- `server/routes/leadsSearch.ts`
- `src/lib/types.ts`
- `src/pages/LeadDetailPage.tsx`
- `src/pages/LeadListPage.tsx`
- `server/services/sms.ts`
- `leadEngine/normaliser.ts`
- `functions/leadEngine/normaliser.ts`
- `codex-output/planning-contact-signal-regression.mjs`
- `codex-output/outcome-tracking-regression.mjs`
- `codex-output/whatsapp-env-regression.mjs`
- [[Data Sources]]
- [[Launch Scenarios]]
- [[Competitor Research - 2 May 2026]]

Test result:

- 10/10 postcodes returned non-empty structured leads.
- Free tier limit held at 5 leads.
- Contracts Finder, FTS, PCS, and DirectorySignal worked across the smoke test.
- PlanningData worked in the final smoke run for all 10 cases.
- Companies House skipped because no API key is set.

Verification:

- `npm run lint` passed.
- `npm run build` passed.
- Intake test mode regression passed.
- News link regression passed.
- Lead-engine source config regression passed.
- Postcode filter regression passed.
- Free scanner redaction regression passed.
- Free preview live contract test passed against local server.
- Unified find-jobs regression passed.
- Lead-engine quality regression passed.
- 50+ lead quality script returned 42/42 valid scans with no empty outputs, no schema failures, no duplicate IDs, clean junk rejection, and one-lead-rule overall true: 42/42.
- Live `/find-jobs` free preview contract passed after switching to the unified engine.
- 10-postcode smoke after the route change returned structured leads for all 10 test postcodes with the free limit held at 5.

Next work:

- Add real Twilio WhatsApp keys and test one live gold-lead delivery.
- Re-run full site conversion script after local rate limit resets.
- Start storing lead outcomes server-side instead of only localStorage.

## Rolling Rule

Keep this file short.

Every agent should be able to see:

- what changed
- what was tested
- what is blocked
- what to do next

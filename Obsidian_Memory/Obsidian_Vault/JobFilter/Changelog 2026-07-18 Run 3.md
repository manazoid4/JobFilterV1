# Changelog — 18 July 2026 (NightlyBuildAgent — Run 3)

**Commit:** `44d93d7`
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## Phase 1 — Build Check
- Fresh container; npm install (Next.js stack, 359 packages)
- Build GREEN after install
- No broken imports, no fake flows
- No new founder commits or open PRs since Run 2 (agent-only commits today)

## Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT from prior runs
- No new feature needed this run

## Phase 3 — Copy Polish

### LegalPage — body text legibility
- `text-lg font-black text-[var(--muted)]` → `font-bold` on all section body paragraphs
- Affects Privacy Policy + Terms of Use sections (7 sections total)
- Legal trust text at font-bold weight reads faster; this is the page sceptical users check before paying

### IntakePage — homeowner intake helper text
- Line 71: 2-sentence intro description `font-black` → `font-bold`
- Line 103: Step 4 instruction "Add your details..." `font-black` → `font-bold`
- IntakePage is the first touchpoint for homeowners coming via a tradesman's MyLink

### DevPortalPage — dev portal body paragraphs (3 fixes)
- Hero paragraph `text-xl font-black` → `font-bold` (2-sentence description)
- Access state description `text-sm font-black` → `font-bold`
- Check card `{body}` entries `font-black` → `font-bold`

## Phase 4 — NEEDLE / BUILDER / CRITIC / REVENUE

**NEEDLE** — CityPage (6 city pages): `LOCK YOUR PATCH — £39/MO →` secondary CTA was `bg-white/10 text-white` on navy background — near-invisible ghost button at the conversion moment on all city SEO pages (Birmingham, Bristol, Glasgow, Leeds, London, Manchester)

**BUILDER** — CityPage.tsx line 401: `bg-white/10 text-white` → `bg-white text-[var(--ink)]`. Solid white on navy = maximum contrast. Matches the ghost-button fix pattern applied to AdminGuardPage, WeeklySignalsPage, CompareCheckatradePage in prior runs.

**Bonus NEEDLE** — TradePage.tsx (5 instances, all 21 trade pages): font-black on multi-sentence body paragraphs with `leading-relaxed` — missed by Jul 14 Run 2 sweep:
- Pain point card bodies (`data.painPoints` bodies)
- HOW IT WORKS step bodies (`data.howItWorks` bodies)
- Lead preview section intro paragraph (2 sentences)
- Signals source card bodies (`data.signals` bodies)
- OTHER TRADES intro paragraph (2 sentences)
All → `font-bold`

**CRITIC:** YES — solid white on navy reads in <3 seconds; font-bold body text scannable at all sizes

**REVENUE:** YES — city pages (Birmingham/London/Manchester etc.) are high-intent SEO inbound; a visible paid CTA directly improves conversion from those landing pages. Trade pages affect 21 pages of clear first-impression body text.

---

## Carryover Blockers (unchanged)
- Founder decision: 14 add-on services still have no £ shown
- Stripe live test: blocked on test keys in Vercel
- TradeFlow button: blocked on URL scheme from founder
- n8n workflow 16: blocked on SMTP creds + manual activation

## Next Run Priorities
1. Check founder commits/PRs first
2. TradePage.tsx font-black sweep: remaining non-body instances (lines 95, 129, 221, 250/258 list items, 305/306 pricing copy, 322 guarantee, 339 taglines, 364 bottom note) — audit each to determine if intentional label vs scannable body
3. Consider NotFoundPage micro-label colour: uses `text-[var(--green)]` for HOME/FIND JOBS/PRICING nav chip labels — green is data-only per design rules. Could swap to `text-[var(--orange)]` or `text-[var(--ink)]`. Low-traffic page, low priority.
4. Carryover blockers remain the main unlock

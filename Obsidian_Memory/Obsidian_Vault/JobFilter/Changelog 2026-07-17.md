# Changelog — 17 July 2026 (NightlyBuildAgent)

**Commit:** `b22b3d1`
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## Phase 1 — Build Check
- Fresh container; npm install (359 packages)
- Build GREEN immediately after install
- No broken imports, no fake flows
- No new founder commits or open PRs since Jul 16 Run 3

## Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT from prior runs

## Phase 3 — Copy Polish (TrustCenterPage + EpcPage)

### TrustCenterPage — 10 fixes (trust/conversion page)

Hero section (ink bg):
- Paragraph 1: competitor callout ("Checkatrade blasts...") — `font-black` → `font-bold`
- Paragraph 2: how JF works ("We scan verified signals...") — `font-black` → `font-bold`
- Paragraph 3: guarantee pitch ("Use JobFilter for 30 days...") — `font-black` → `font-bold`

HOW SCORING WORKS section:
- Transparency note body ("We show you the evidence...") — `font-black` → `font-bold`

VERIFIED SIGNALS section:
- Section intro paragraph ("No scraped directories...") — `font-black` → `font-bold`
- "Our rule:" data privacy note — `font-black` → `font-bold`

QUALITY FILTER PHILOSOPHY section:
- All 4 step body descriptions (via `{step.body}` dynamic render) — `font-black` → `font-bold`

FAIR USE & REFUNDS section:
- 30-day guarantee body paragraph — `font-black` → `font-bold`
- CTA sub-note ("No credit card required — 3 free scans...") — `font-black` → `font-bold`

CONTACT section:
- Intro paragraph ("No chatbots. No ticket systems...") — `font-black` → `font-bold`

Remaining `font-black` in TrustCenterPage confirmed intentional: action labels ("Call within 24 hours"), tier badge chips, signal list items, data values in privacy table, GDPR badge, guarantee stamp (uppercase), contact info label.

### EpcPage — 1 fix

- Letter template delivery note: `font-black` → `font-bold`
  ("We'll send the PDF to your inbox — usually within a few hours.")

## Phase 4 — Site Health (NEEDLE / BUILDER / CRITIC / REVENUE)

**NEEDLE** — TrustCenterPage identified as highest-priority target:
- 10 body paragraphs on the main trust/conversion page using `font-black`
- This is where hesitant users land before deciding to pay £39/mo
- Unreadable body text = lost conversion

**BUILDER** — all 10 fixed across 5 sections (hero, scoring, signals, quality filter, guarantee)

**CRITIC:** YES — body text at `font-bold` is immediately more readable at `text-lg` scale; the trust arguments in the hero land faster

**REVENUE:** YES — TrustCenterPage is the conversion page for sceptical users. Readable copy = more conversions.

---

## Carryover Blockers (unchanged)
- Founder decision: 14 add-on services still have no £ shown
- Stripe live test: blocked on test keys in Vercel
- TradeFlow button: blocked on URL scheme from founder
- n8n workflow 16: blocked on SMTP creds + manual activation

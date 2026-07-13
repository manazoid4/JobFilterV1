# Changelog 2026-07-13 — NightlyBuildAgent

## Summary

Build: GREEN (Next.js, 113 pages)
TypeScript: CLEAN
Commit: `8001019`

---

## Container State

Fresh container — `npm install` required. HEAD synced to `c4fe619` (Jul 12 Run 3 vault update after rebase). Build GREEN, TS CLEAN before changes.

---

## Founder Activity Check

No new founder commits or open PRs detected. All carryover blockers (Stripe keys, TradeFlow URL, n8n SMTP) unchanged.

---

## Phase 1 — Fix Broken

No broken builds. No broken imports. All forms confirmed wired to real endpoints (`/api/waitlist`). Build GREEN before and after changes.

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT from prior runs. No new Tier 1 work required.

---

## Phase 3 — Copy Polish

### Pages changed: MaterialPriceEnginePage + EpcPage + CompareBuildAlertPage + TradieStackPage

**MaterialPriceEnginePage (src/pages/MaterialPriceEnginePage.tsx):**
- Basket overlay CTA: `UPGRADE — £39/MO` → `UNLOCK BREAKDOWN — £39/MO →` (specific: tells user exactly what unlocks)
- Sidebar bottom CTA: `Use this every month` → `CHECK PRICES EVERY JOB — £39/MO →` (lowercase mixed-case to uppercase tradesman copy, added price and arrow)

**EpcPage (src/pages/EpcPage.tsx):**
- Vicinity promo section: `OPEN VICINITY` → `OPEN VICINITY →` (directional arrow added)

**CompareBuildAlertPage (src/pages/CompareBuildAlertPage.tsx):**
- Signals section CTA: `SEE THE SIGNALS IN DETAIL` → `SEE THE SIGNALS IN DETAIL →` (arrow added)

**TradieStackPage (src/pages/TradieStackPage.tsx):**
- Hero section: `See Public Intake` → `SEE THE INTAKE FORM →` (uppercase + arrow; "See Public Intake" was lowercase, ambiguous)
- Pricing section: `Add JobFilter Monthly` → `ADD JOBFILTER MONTHLY →` (uppercase + arrow)

---

## Phase 4 — Site Health Check (NEEDLE)

### NEEDLE — Top 3 UX issues found:

1. **WeeklySignalsPage "GET WEEKLY ALERTS" button invisible** — `bg-[var(--navy)]` button inside a `bg-[var(--navy)]` section. Since `--navy = #080808` (black), the button background = section background = no visible container. Only white text floating with no button shape. **FIXED** → changed to `bg-white/10 border-white/20 shadow-none hover:bg-white/20` (ghost button pattern used elsewhere on dark sections).

2. **MaterialPriceEnginePage sidebar CTA weak copy** — "Use this every month" gave no price signal, no trade language, no action clarity. Fixed to "CHECK PRICES EVERY JOB — £39/MO →".

3. **TradieStackPage secondary CTA lowercase** — "See Public Intake" broke the all-caps brand pattern and was ambiguous. Fixed to "SEE THE INTAKE FORM →".

### CRITIC check: Is the WeeklySignals fix clearer in <3 seconds? YES — button is now visually distinct from the section background.
### REVENUE check: Does the MaterialPricEngine copy change increase likelihood of paying £39/month? YES — price is now visible, action is specific.

---

## Carryover Blockers (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test**: blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. **Scan remaining jf-button labels** — grep for remaining non-arrow CTAs not on functional/utility buttons (WON, LOST, CANCEL, etc.)
2. **Add-on service pricing copy** — 14 services show no price; add "from £X" labels to each service card in ProductAdvantagePage
3. **FreeToolsPage audit** — 6 navy CTAs found; check if any fall on dark sections (same invisible-button risk as WeeklySignalsPage)

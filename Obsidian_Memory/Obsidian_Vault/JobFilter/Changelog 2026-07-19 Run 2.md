# Changelog — 19 July 2026 Run 2 (NightlyBuildAgent)

**Commit:** `7be47f1`
**Build:** GREEN (Next.js, all routes static + API proxy)
**TypeScript:** CLEAN

---

## Phase 1 — Build Check

- Fresh container, npm install required (node_modules absent)
- Build GREEN after install. TypeScript CLEAN.
- No broken imports, no fake flows (PostJobPage wired to /api/waitlist — confirmed)
- No new founder commits or open PRs since Run 1

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT — no new feature needed:
- Scan counter: FindJobsPage lines 431–445, resets Monday midnight, gated on NEXT_PUBLIC_OPEN_ACCESS
- Google Calendar ICS: GET /api/leads/calendar.ics + COPY CALENDAR LINK on LeadDetailPage
- Won leaderboard: WinStatsBanner + /api/wins/stats + outcomes.jsonl
- WhatsApp templates: quick_quote_offer + availability_check in chaseTemplates.ts (5 total)
- Trade-specific scoring: TRADE_PRESETS + scoring weights fully wired

## Phase 3 — Copy Polish

Pattern: `font-black` → `font-bold` on multi-sentence paragraphs. Carries forward the sweep from Run 1.

### FreeToolsPage.tsx — hero paragraph (line 73)
- `text-lg font-black text-white/90` → `text-lg font-bold text-white/90`
- 3-sentence paragraph on dark navy background: "Price cleaner. Spot time-wasters. Protect your week. Checkatrade, Bark, and MyBuilder charge for these — we give them away. Leads are the paid part."
- FreeToolsPage is a free-user acquisition page — readable hero copy matters at first impression

### FindJobsPage.tsx — three multi-sentence paragraphs

1. **Buyer-reveal interstitial** (line 729): `font-black` → `font-bold` on "This job: £X. See buyer name and contact to call before anyone else does." — shown to free-tier users just before a locked Gold lead
2. **Upgrade nudge paragraph** (line 786): `font-black` → `font-bold` on 4-sentence ROI explanation shown after scan results for free users (conversion moment)
3. **Fill My Week description** (line 812): `font-black` → `font-bold` on 3-sentence description below the Fill My Week button

## Phase 4 — NEEDLE / BUILDER / CRITIC / REVENUE

**NEEDLE top 3 UX issues identified:**
1. `font-black` on upgrade nudge paragraph at FindJobsPage:786 — heavy text at the exact conversion moment (free → £39/mo) makes copy hard to scan
2. `font-black` on buyer-reveal interstitial at FindJobsPage:729 — dark background + heavy font at gating moment reduces urgency readability
3. `font-black` on FreeToolsPage hero paragraph — first thing a tool user reads, navy background, heavy weight causes eye fatigue

**BUILDER** — Fixed all three (plus Fill My Week description) in this run.

**CRITIC:** YES — `font-bold text-sm/lg` on these paragraphs reads clearly in <3 seconds; body copy weight matches the rhythm of the brutalist design without making dense text into an obstacle.

**REVENUE:** YES — the upgrade nudge paragraph is the written argument for "why pay £39/mo". Heavy unreadable copy at that moment suppresses conversion. Fixing it makes the value proposition land clearly at the decision moment.

---

## Pages NOT changed (confirmed clean)

- AccountSettingsPage, VerifyPage, AdminPage: no `font-black` found at all (clean from prior runs)
- NotFoundPage: orange micro-labels on nav chips applied in Run 1 — left as-is (orange is consistent site-wide)
- DashboardPage: ghost `border-white/20 bg-white/10` at line 267 is a status indicator (not a CTA) — appropriate for dark header, no change needed
- ForYourTradePage: all `font-black` instances are single-word labels or very short phrases — correct
- CompareBarkPage, CompareCheckatradePage: no multi-sentence font-black issues — copy already strong
- FaqPage, EpcPage: already clean — font-bold used correctly throughout

## Carryover Blockers (unchanged)

- Founder decision: 14 add-on services still have no £ shown
- Stripe live test: blocked on test keys in Vercel
- TradeFlow button: blocked on URL scheme from founder
- n8n workflow 16: blocked on SMTP creds + manual activation

## Next Run Priorities

1. Check founder commits/PRs first
2. Run full grep for any remaining `font-black` on text nodes longer than ~40 chars — should be nearly clear after two runs of sweeps
3. Look at NewsPage takeaway text (`text-sm font-black italic`) — currently italic+black for pull-quote styling; this is intentional design but worth a second look
4. TrustCenterPage: `bg-white/15 border-white/40` on tier badge at line 115 — ghost styling on dark bg; check if it needs to be made solid
5. Carryover blockers remain the main unlock

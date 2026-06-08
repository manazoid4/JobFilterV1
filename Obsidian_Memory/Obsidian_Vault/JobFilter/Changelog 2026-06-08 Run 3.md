# Changelog — 8 June 2026 (Run 3)

---

## Pre-flight

- Fast-forwarded local main to origin/main (a29c1c2) after detached HEAD; npm install completed cleanly
- Build GREEN (106 pages), TypeScript CLEAN before starting

---

## Phase 1 — Fix Broken

- No broken build, no TypeScript errors, no broken imports
- All 5 Tier 1 unbuilt features in agent prompt confirmed already built (scan counter, calendar ICS, won leaderboard, WhatsApp templates ×2, trade-specific scoring)

---

## Phase 2 — Feature Built: 24h Review Nudge (Win Engine roadmap quick win)

The roadmap Week 1-2 quick win "Review link generator — add auto-prompt 24h after Won status" was never implemented. `generateReviewMessage()` existed in winStore.ts and was callable, but no surface ever showed it after the initial LeadDetailPage win flow.

**What was built:**
- `src/lib/types.ts` — added `reviewMessageSent?: boolean` to `WinJob` type
- `src/lib/winStore.ts` — added `markReviewSent(winId: string)` function (sets `reviewMessageSent: true`, persists to localStorage)
- `src/pages/DashboardPage.tsx` — added review nudge section rendered between ROITracker and detailed stats:
  - Reads wins 24h–7d old where `reviewMessageSent` is not `true`
  - Shows up to 2 nudges: green-bordered panel with win title + location + "Job was won yesterday. Ask now — trades who ask within 48h get 3× more reviews."
  - Pre-filled `generateReviewMessage()` Google review ask template (selectable text)
  - "SEND ON WHATSAPP →" wa.me deep link — opens WhatsApp with the message pre-filled
  - "MARK SENT" button: calls `markReviewSent()` + collapses the nudge permanently
  - "dismiss" button: collapses for the session without marking as sent

**Why it matters:** Reviews = social proof = future job acquisition. A tradesman who wins a job but forgets to ask for a review loses the compounding value of that win. The 24h nudge surfaces at the right moment (job recently done, customer experience still fresh) with zero friction — one tap to WhatsApp.

**Closes roadmap item:** Feature Roadmap 8 May 2026, Week 1-2 quick wins: "Review link generator — Already Built. Add auto-prompt 24h after 'Won' status. 1 day."

---

## Phase 3 — Copy Polish: Jargon Sweep

| File | Line | Before | After |
|---|---|---|---|
| SampleLeadCard.tsx | 34 | `'Unlocked on Patch Plan'` | `'Unlocked at £39/mo'` |
| SampleLeadCard.tsx | 111–112 | `PATCH PLAN` / `Quote floor unlocked on Patch Plan.` | `£39/MO` / `Quote floor unlocked at £39/mo.` |
| QuickResponseKit.tsx | 96 | badge `PATCH PLAN` | badge `£39/MO` |
| CityIntelligencePage.tsx | 409 | `available on Patch Plan.` | `available at £39/mo.` |
| CityIntelligencePage.tsx | 476 | `included with the Patch Plan.` | `included at £39/mo.` |
| CityIntelligencePage.tsx | 385 | `UNLOCK WITH PATCH PLAN — £39/MO →` | `UNLOCK FULL BRIEFING — £39/MO →` |
| Footer.tsx | 29 | `INTAKE ENGINE` (nav section heading) | `FIND WORK` |
| TradePage.tsx | 339 | `ENTER THE INTAKE` (micro-label) | `SCAN FREE — NO CARD NEEDED` |
| NewsPage.tsx | 72 | `installer shortage is your moat` | `installer shortage is your edge` |

**"Patch Plan" context:** The plan is called "Founder" (£39/mo) across all pricing copy. "Patch Plan" was an internal/legacy name leaking into product UI on 4 different surfaces — a tradesman visiting /intelligence/birmingham or seeing SampleLeadCard would see "Patch Plan" without any way to know what it meant.

---

## Phase 4 — Site Health Check

1. **NEEDLE:** "Patch Plan" internal naming appeared on 4+ surfaces (SampleLeadCard, QuickResponseKit, CityIntelligencePage ×3). A tradesman seeing "Unlocked on Patch Plan" or "PATCH PLAN" badge can't map this to the £39/mo price they see on /pricing. Classic internal-noun leak.
2. **BUILDER:** Replaced all "Patch Plan" instances with "£39/MO" — price is always more concrete than a plan name.
3. **CRITIC:** Clearer in <3 seconds? Yes — "£39/MO" tells a tradesman exactly what it costs. "Patch Plan" told them nothing.
4. **REVENUE:** Increases likelihood of paying £39/mo? Yes — reducing friction between "what is this locked behind?" and "oh, £39/mo, same as the pricing page said" removes an unnecessary barrier.

---

## Open / Carried Forward

- **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- **Spot-check review nudge** — verify renders correctly once a real paid test account has 1+ wins logged 24h+ ago
- **TradeFlow "Send to TradeFlow" button** (blocked on URL scheme from founder)
- **n8n workflow 16 (LLM Brief Builder)** — still blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Audit DashboardPage Admin Guard card context — check if "TRADE COMMAND CENTRE" and "ADMIN GUARD" labels are plain enough for a tradesman who's never heard of Admin Guard (the feature name may need a subtitle or plain-English description)
2. Check FaqPage for any remaining source naming violations or weak CTAs (last touched May 18 — may have drifted)
3. Stripe live test once Vercel test keys are available

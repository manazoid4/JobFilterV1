# Changelog — 11 June 2026 (NightlyBuildAgent — Run 2)

## Setup
- `npm install` — `node_modules` was empty again in this fresh container; installed 359 packages before build/tsc could run.
- No uncommitted changes from install (package-lock.json already up to date from prior run's commit).

## Build status
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN

## Audit
Re-verified all 5 Tier 1 "unbuilt" features from the brief — confirmed already built in prior runs:
- Scan counter (`weeklyScansRemaining`)
- Calendar ICS export (`/api/leads/calendar.ics` + COPY CALENDAR LINK)
- Won leaderboard (`WinStatsBanner` + `outcomes.jsonl`)
- WhatsApp template additions (`quick_quote_offer`, `availability_check` already in `chaseTemplates.ts`)
- Trade-specific scoring UX (`leadEngine/scorer.ts` `TRADE_KEYWORDS` per-trade high/medium/low keyword tables — genuinely produces different reasons per trade, e.g. electrician sees "rewire, ev charger" bonuses, plumber sees "boiler, bathroom")

Also re-verified "Auto-nudge (2h, with snooze)" — `chaseStore.ts` `calcNextNudge()` + DashboardPage OVERDUE section with SNOOZE 24H button is fully wired.

## Feature built — Tier 2 #15 "Multi-channel follow-up" (first slice)

**Problem:** Full multi-channel follow-up (auto WhatsApp → SMS → email *to the buyer*) is blocked — no fetcher in `leadEngine/` ever populates a buyer email/phone on the normalised `Lead` (only `contactSignal` is derived from `rawContact`, the raw contact details themselves are discarded in `normaliser.ts`). Building a "send email to buyer" flow today would either be fake or require a larger normaliser change to thread `rawContact.email`/`rawContact.phone` through to the frontend — out of scope for tonight, flagged for a future run.

**What was built instead — real, wired, no placeholders:**
- `server/lib/resend.ts` — new `sendLeadChaseEmail()` using the existing Resend client (same pattern as `sendWelcomeEmail`/`sendPaidConfirmationEmail`)
- `server/routes/leadEmailChase.ts` — new `POST /api/leads/email-chase` (rate-limited, validates email format + required fields, returns `503` with a plain-English error if `RESEND_API_KEY` isn't configured)
- Registered in `server/app.ts`
- `src/pages/LeadDetailPage.tsx` — new "EMAIL ME THIS LEAD" button in the FOLLOW-UP REMINDER section, next to ADD TO CALENDAR / SNOOZE 24H. Sends the lead title, area, score, value, and the currently-selected chase message to the logged-in user's own email via Resend. Handles sending/sent/error states; shows "Log in to email yourself this lead" if not authenticated.

**Why this is useful on its own:** gives a paid user a way to get a lead's chase script + summary into their inbox (forwardable, accessible from desktop, doesn't depend on the phone with WhatsApp open) — a real multi-channel access point for chase content, even though it doesn't yet contact the buyer via email.

## NEEDLE / Phase 4 fix (BUILDER)
**EpcPage "TRADES THAT BENEFIT" mobile grid** (`src/pages/EpcPage.tsx:45`) — flagged by last run's NEEDLE pass as a possible 2/2/1 orphan layout on mobile (5 cards in `grid-cols-2 md:grid-cols-5`). Fixed: `grid-cols-1 sm:grid-cols-2 md:grid-cols-5` — full-width single column on small phones (no orphaned card), 2-up on larger phones/tablets, 5-up on desktop.

- CRITIC check: clearer in <3s? Yes — no half-width orphan card breaking the scan pattern on narrow phones.
- REVENUE check: this is a free-tools page; impact is polish/trust rather than direct conversion.

## Commit
- `35443eb` `[NightlyBuildAgent] Email-yourself chase kit + EpcPage mobile grid fix` — pushed to `main`.

## NEXT RUN — top 3 priorities
1. **Tier 2 #15 full multi-channel follow-up (buyer-side)** — to actually email/SMS the *buyer*, `leadEngine/normaliser.ts` needs to thread `raw.rawContact.email` / `raw.rawContact.phone` through onto the normalised `Lead` (currently only used to derive `contactSignal`, then discarded). This is the real blocker for "phone-aware WhatsApp links" too — `lead.phone` on `LeadDecision` is never populated from a real source today (`waPhone` in `LeadDetailPage.tsx` is always `null` in practice). Worth scoping as its own run: normaliser change + frontend type changes + verify against DEMO_MODE DirectorySignal data (which does set `rawContact`).
2. **Spot-check "EMAIL ME THIS LEAD"** — could not live-test (no `RESEND_API_KEY` in this container, route returns `503` gracefully). Worth a live test once Resend is configured: confirm email arrives, formatting renders correctly in Gmail/Outlook.
3. **Stripe live test** — still blocked on test keys in Vercel (carried over for ~2 weeks). TradeFlow button + n8n workflow 16 also still blocked on external dependencies (founder URL scheme / SMTP creds).

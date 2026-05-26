# Admin Guard — Research to Build Decisions

Created: 2026-05-18

---

## Repo Findings

- **Framework:** React 19 + TypeScript + Vite (SPA)
- **Router:** React Router v7 (flat routes in App.tsx)
- **Existing dashboard:** `/dashboard` → `DashboardPage.tsx` — localStorage-based pipeline tracker, no server-side session
- **Auth/payment:** No traditional auth. Stripe checkout creates sessions stored in Supabase `payments` table. User "paid" status is not yet passed to the frontend. Used `localStorage.getItem('jobfilter.isPaid') === 'true'` as the gate — TODO: wire from Stripe webhook → Supabase → frontend.
- **Backend/email:** Express.js + Firebase Functions. Resend not yet wired for scheduled reminders. `server/routes/calendarExport.ts` already handles ICS for leads — pattern reused for Admin Guard.
- **Styling:** Tailwind CSS v4 + CSS variables (--yellow, --ink, --navy, --green, --orange, --steel). `jf-box`, `jf-button`, `headline`, `micro-label` design tokens already defined.
- **Best routes:** `/dashboard/admin-guard` (paid), `/features/admin-guard` (public teaser)
- **Risks:** No subscription state exposed to frontend yet. `isPaid()` reads localStorage. Stripe webhook must eventually write `jobfilter.isPaid = true` to localStorage or a user session object.
- **Build implication:** Full feature built. Auth gate is localStorage flag. Locked state shown for non-paid users with preview blurred out.

---

## Obsidian Findings

- **Product direction:** JobFilter = find better work, filter tyre-kickers, follow up properly, keep admin under control. This is the "Trade Command Centre" positioning.
- **Paid feature direction:** Founding 30 (£39/mo), Pro Standard (£79/mo). Admin Guard fits as a paid-tier module accessible to all paid tiers.
- **Design rules:** DeWalt yellow (#E3B72A), black ink, steel grey, thick borders, hard shadows, `headline` font (Barlow Condensed 800), `micro-label`, mobile-first.
- **Competitor lessons:** LeadAdvisor proved calendar/follow-up language converts. GetBuilder comparison tables are powerful. MTD Flow shows MTD urgency works. LeadToWork "you build, we chase" framing.
- **Existing warnings:** No subscription state in frontend. Directory Signal quality leak (unrelated). No rate limiting on leads API (unrelated).
- **Build implication:** Built with brutal simplicity matching existing design system. No invented Stripe/Supabase calls. Feature is fully functional with localStorage persistence.

---

## Build Decisions

- **Paid route:** `/dashboard/admin-guard` — gated by `localStorage.getItem('jobfilter.isPaid')`. Shows LockedState component for non-paid users.
- **Public teaser route:** `/features/admin-guard` — full marketing page with comparison table, feature list, locked module preview.
- **MVP modules:**
  1. Admin Readiness Score (0-100)
  2. Setup form (6 questions, auto-saved to localStorage)
  3. Deadline Timeline (dynamically filtered to user's setup)
  4. Making Tax Digital check (income-band-aware)
  5. Monthly Trade Admin Checklist (CIS/MTD/accountant-aware)
  6. Accountant Handoff Pack (copy to clipboard)
  7. Calendar Export (.ics, client-side, reminder timing preference)
- **Future modules (locked cards shown):** Insurance Renewal Guard, Van MOT Guard, Gas Safe/NICEIC Renewal, Invoice Chase Guard, Quote Expiry Tracker, VAT Return Reminder.
- **Gating:** localStorage `jobfilter.isPaid`. TODO: wire from Stripe webhook response stored in Supabase → set in client session.
- **Retention hooks:** Monthly checklist resets each session, encouraging return. Deadline urgency grows as dates approach (score drops). Calendar download creates ongoing value.
- **What not to build yet:** PDF export, email reminders (backend not ready), HMRC API connection, VAT return calculator, actual tax advice features.

---

## Files Created/Modified

- `src/lib/adminGuard.ts` — All logic: deadlines, scoring, checklists, ICS generation, localStorage persistence
- `src/pages/AdminGuardPage.tsx` — Full paid dashboard page (paid + locked states)
- `src/pages/AdminGuardTeaserPage.tsx` — Public marketing/teaser page
- `src/App.tsx` — Added two new routes
- `src/pages/DashboardPage.tsx` — Added Admin Guard entry card
- `Obsidian_Memory/Obsidian_Vault/System/Admin_Guard_Research_To_Build_Decisions.md` (this file)
- `Obsidian_Memory/Obsidian_Vault/System/Trade_Command_Centre_Admin_Guard_Build_Log.md`
- `Obsidian_Memory/Obsidian_Vault/System/Competitor_Ad_Inspiration_Notes.md`

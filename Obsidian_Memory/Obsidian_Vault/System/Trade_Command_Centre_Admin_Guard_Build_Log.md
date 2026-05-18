# Trade Command Centre — Admin Guard Build Log

Created: 2026-05-18  
Branch: `claude/admin-guard-paid-feature-GSg4U`

---

## GOV.UK / HMRC Facts

All dates are for the **2025/26 tax year** (filing/paying in 2026/27).  
Source: https://www.gov.uk/self-assessment-tax-returns/deadlines  
Source: https://www.gov.uk/guidance/making-tax-digital-for-income-tax

- **Registration:** 5 October 2026 — register for Self Assessment if you started self-employment in 2025/26
- **Paper return:** 31 October 2026 — paper Self Assessment deadline (most tradespeople file online; hidden by default in UI)
- **Online return:** 31 January 2027 — online Self Assessment deadline for 2025/26
- **Payment:** 31 January 2027 — any outstanding tax due
- **Payments on account (1st):** 31 January 2027 — if your bill is >£1,000 and <80% collected via PAYE
- **Payments on account (2nd):** 31 July 2026 — second payment on account
- **MTD (£50k+):** 6 April 2026 — already in effect as of build date (May 2026)
- **MTD (£30k+):** 6 April 2027 — upcoming
- **MTD (£20k+):** 6 April 2028 — upcoming
- **Penalties:** Automatic £100 for missing 31 January online return deadline; daily charges from 3 months; interest on late payment. Wording kept general — not quoted verbatim.
- **CIS:** Subcontractors have deductions made by contractors. CIS statements needed for Self Assessment. Monthly checklist includes CIS items.
- **Build implication:** Dates hardcoded for current cycle. ICS events tagged with GOV.UK disclaimer. MTD message adapts to income band. No tax calculations, no HMRC API connection, no tax advice.

---

## Session Log — 2026-05-18

### What was built

**1. `src/lib/adminGuard.ts`**
- TypeScript logic module: all deadline constants, `getDeadlines()`, `calculateAdminScore()`, `getMtdMessage()`, `getMonthlyChecklist()`, `ACCOUNTANT_CHECKLIST`, `generateIcs()`, `downloadIcs()`, `loadProfile()`, `saveProfile()`, `isPaidUser()`
- ICS generation is client-side (no server needed). Reuses pattern from `server/routes/calendarExport.ts`.
- AdminProfile auto-saved to `localStorage` key `jf.adminGuard.profile`.

**2. `src/pages/AdminGuardPage.tsx`**
- Full paid dashboard at `/dashboard/admin-guard`
- Sections: Header, Admin Readiness Score, Setup Form (6 questions), Tabbed content (Deadlines / Monthly Checklist / Accountant Pack), MTD Check, Calendar Export, Locked Future Modules, Disclaimer
- `LockedState` component shown when `localStorage.getItem('jobfilter.isPaid') !== 'true'`
- Uses existing design tokens: `jf-box`, `jf-button`, `headline`, `micro-label`, CSS variables

**3. `src/pages/AdminGuardTeaserPage.tsx`**
- Public marketing page at `/features/admin-guard`
- Hero, feature list, comparison table (JobFilter vs Manual), copy section, coming-soon modules, CTA

**4. `src/App.tsx` updates**
- Added `AdminGuardPage` and `AdminGuardTeaserPage` lazy imports
- Added routes: `/dashboard/admin-guard`, `/features/admin-guard`

**5. `src/pages/DashboardPage.tsx` updates**
- Added Admin Guard entry card (yellow, branded) above the detailed stats grid

### Build status
- `npx vite build` — ✅ succeeded, no TypeScript errors
- `AdminGuardPage-BHkRkx3l.js` — 30.75 kB (gzip: 8.57 kB)
- `AdminGuardTeaserPage-CypCcxvm.js` — 7.86 kB (gzip: 2.45 kB)

### TODO / Next steps

- [ ] Wire `jobfilter.isPaid` from Stripe webhook → Supabase → client (currently localStorage-only)
- [ ] Connect email reminders via Resend + scheduled function (copy in UI says "being connected")
- [ ] Add PDF export for Accountant Handoff Pack
- [ ] Add TopNav link to Admin Guard for paid users
- [ ] Add `/features/admin-guard` to marketing nav / footer
- [ ] Test on mobile (iPhone SE breakpoint)
- [ ] Consider adding Admin Guard card to PricingPage as paid feature highlight

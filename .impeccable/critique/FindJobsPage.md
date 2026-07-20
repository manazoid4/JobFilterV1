# Impeccable Critique: Find Jobs / Scanner Page

**Target File:** `src/pages/FindJobsPage.tsx`
**Command Run:** `/impeccable critique src/pages/FindJobsPage.tsx`

## 1. Design Health Score
**Score: 68/100**

- **Aesthetic Consistency:** High. The use of brutalist/high-contrast design (`var(--yellow)`, `var(--ink)`, heavy borders, `uppercase`, `font-black`) aligns well with the target contractor/tradesperson persona, projecting a utilitarian, no-nonsense vibe.
- **Cognitive Load:** High. There are too many distinct calls to action and visual elements (Scan, Widen, Unlock, Track, WhatsApp, Log Win, Fill My Week). The interface requires significant visual parsing.
- **Component Complexity:** Extremely High. The file is over 900 lines long, combining state management, API calls, local storage synchronization, deeply nested sub-components (`LeadResultCard`, `OutcomeActions`, `EmptyScanReport`), and inline SVG illustrations. 

## 2. Anti-Patterns Verdict

- **LocalStorage SSR Hydration Mismatch:** The code is littered with inline `typeof window !== "undefined"` checks (e.g., `(typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem(...)`). This is a classic Next.js anti-pattern that leads to hydration errors and messy code. 
  *Fix:* Extract this logic into a custom `useLocalStorage` hook that only reads on the client side after the initial mount.
- **God Component / Monolith:** `FindJobsPage` handles too many responsibilities. It manages search state, the "Fill My Week" sequence, Lead result rendering, local storage history, document keyword search, outcome reporting, and layout.
  *Fix:* It urgently needs to be broken down into container and presentational components (e.g., `<LeadList />`, `<ScannerForm />`, `<FillMyWeekPanel />`, `<LeadResultCard />`).
- **Inline API Fetching:** Fetch calls (`/api/leads/search`, `/api/leads/notify`, `/api/leads/outcome`) are hardcoded directly into component methods without a data fetching library (like SWR or React Query) or separated service files. This makes loading states, caching, and error handling brittle.
- **Prop Drilling and Component Clutter:** Massive sub-components like `EmptyScanReport` and `LeadResultCard` are defined in the same file, making navigation and maintainability very difficult.

## 3. Persona Red Flags

- **Target Persona:** Tradespeople, Contractors, Builders.
- **Red Flag 1 - Jargon & Overwhelm:** Terms like "Money Filter", "Planning signal", "Lead Readiness", "First mover window", and "Commercial only" might be confusing. The screen is packed with data points (evidence count, compliance risk, gold/silver badges) that overwhelm someone looking for straightforward job leads.
- **Red Flag 2 - Mobile Usability:** Although responsive classes exist, the sheer volume of text, buttons, tags, and "trust badges" on a `LeadResultCard` will make the mobile experience incredibly long to scroll and dense to parse while on a job site, driving a van, or with dirty hands.
- **Red Flag 3 - "Fill My Week" Overlap:** The distinction between the primary "Scan" and the secondary "Fill My Week" functionality is visually competing. A contractor just wants jobs; having two different search mechanisms on the same page causes decision paralysis.

## 4. Recommendations

1. **Refactor Storage Management:** Create a `useClientStorage` hook to safely handle `localStorage` reads/writes without SSR hydration hacks.
2. **Component Splitting:** Move `LeadResultCard.tsx`, `OutcomeActions.tsx`, and `EmptyScanReport.tsx` into their own dedicated files in the `src/components/` directory.
3. **Data Fetching Abstraction:** Move API calls to dedicated service hooks (`useLeadSearch`, `useLeadActions`) to manage `loading`, `error`, and `data` states cleanly.
4. **Streamline the UI:** Combine the "Scan" and "Fill My Week" concepts into a single, unified, and simplified search experience to reduce cognitive load and simplify the user journey.

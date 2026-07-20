# Daily To-Do

## 2026-07-20 Run 4

### Completed This Run
- [x] Build check: pass
- [x] TypeScript check: clean
- [x] Copy polish — HomePage.tsx: proof points, OPS strip, HOW IT WORKS step 3
- [x] Copy polish — PricingPage.tsx: plan bullets, FAQ answers (name competitors)
- [x] NEEDLE: hero proof points fixed — clearer in <3 seconds
- [x] PR #376 opened, Vercel preview deployed and READY
- [x] PR subscribed for CI monitoring

### Pending / Next Run Priorities

1. **Trade-specific scoring copy on lead cards** — The `parseTradeReasons()` function in FindJobsPage.tsx is parsing backend reasons generically. When an electrician scans, they should see "EV CHARGER — YOUR TRADE" and "REWIRE — YOUR TRADE" prominently on cards. The backend scorer.ts does have trade-specific keywords but the frontend label rendering could be more explicit per-trade. Consider surfacing 1-2 highly specific trade keywords as highlighted badges above the generic ones.

2. **WinStatsBanner placement** — Currently renders between scanner form and stats bar even before a postcode is entered. If postcode is empty, it fires a UK-wide API call. Could be improved to show only after first scan (when `hasScanned` is true) with postcode populated.

3. **Scan counter reset message** — When `weeklyScansRemaining === 0`, the message is "Buyer details locked. Scanning is always free — upgrade to see who to call." This is good but could add a specific day/date: "Resets Monday 27 July — or unlock full access at £39/mo."

4. **Competitor comparison pages** (/vs/bark, /vs/checkatrade, etc.) — Check copy on these pages to ensure they all name JobFilter's no-shared-auction advantage explicitly and match the new language from PricingPage FAQs.

5. **HOW IT WORKS section on HomePage** — Step 2 mentions "Weak or internal sample data cannot enter live results" — this is still slightly jargon. Consider: "Only signals from official UK sources are scored — no invented jobs, no recycled enquiries."

### Known Issues / Won't Fix This Run
- Vault files not present in cloned repo — created fresh each run in Obsidian_Memory/ directory
- package-lock.json modified by npm install (not staged — correct)

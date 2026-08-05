# Run Log

- **2026-07-22**: Hermes initialized. Repository deep inspection performed.
- **2026-07-22**: `MASTER_PLAN.md` and `TASK_QUEUE.json` generated.
- **2026-07-22**: Discovered untracked FTS benchmark scripts and UI narrative changes replacing "leads" with "qualification".
- **2026-07-22**: Discovered stale assertions in `alert-delivery-contract-regression.mjs`, `whatsapp-env-regression.mjs`, `planning-locality-regression.mjs`, and `backend-contract-regression.mjs`.
- **2026-07-22**: OpenCode dispatched for T001 to fix tests and commit all unstaged files.
- **2026-08-05**: NightlyBuildAgent run. Build clean (120 static pages). TypeScript clean. No Obsidian vault found in repo — worked from codebase directly.
  - FEATURE: Trade-specific scoring UX — added TRADE_TITLE_KEYWORDS map and extractTitleKeywords() to FindJobsPage. WHY? panel on lead cards now surfaces trade-relevant keywords from lead titles (electricians: EV CHARGER/REWIRE/EICR, plumbers: BOILER/BATHROOM, etc.). WHY? button shown on all leads.
  - FIX: Scan counter message at 0 remaining — replaced opaque "Buyer and submission context locked" with clear "3 free scans done this week. Full buyer info, published values and submission routes unlock from £39/mo. Resets Monday."
  - COPY: HomePage proof points updated to be specific and pain-led. HOW IT WORKS steps updated with concrete, time-anchored copy.
  - COPY: PricingPage — added "Why not just search FTS yourself?" objection. Free scan CTA moved to primary with explicit "NO CREDIT CARD". Objections made more direct.
  - PR #438 opened: nightly/trade-scoring-copy-polish → main. CI in progress.
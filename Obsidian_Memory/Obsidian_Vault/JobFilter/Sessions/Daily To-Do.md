# Daily To-Do — 2026-07-28

## Completed this run
- [x] Tier 1 audit — all 5 features confirmed already built (scan counter, ICS export, won leaderboard, WhatsApp templates, trade-specific scoring)
- [x] Phase 3 copy polish — PricingPage.tsx (fear-first hero, CTA hierarchy, plan bullets, FAQ trades named)
- [x] Phase 3 copy polish — HomePage.tsx (micro-label, hero headline, social proof strip, 8 WHAT YOU GET tiles)
- [x] NEEDLE Issue #1 — Contradictory CTAs on Pricing page — FIXED (free scan now primary yellow CTA)
- [x] NEEDLE Issue #2 — Duplicate trade-selection UI on FindJobs — FIXED (removed Trade dropdown, buttons are sole method)
- [x] vercel.json cron schedule — fixed hourly→daily (Hobby plan blocks sub-daily cron)
- [x] Codex review — regression contract restored (3 failing assertions fixed in HomePage + PricingPage)
- [x] Codex review — PricingPage "Full qualification for every notice" overclaim fixed to "matched notices in your trade and region"
- [x] Codex review — FindJobsPage hidden default trade — active trade now shown above SCAN NOW button
- [x] PR #404 — nightly/2026-07-28-copy-polish-run2 — Vercel preview READY

## Carry forward
- [ ] NEEDLE Issue #3 — Fragmented paywall prompts: after one scan, three separate upgrade asks with no new value between them. Consolidate to a single prompt with a specific value message.
- [ ] CompareCheckatradePage — "Territory-routed — one trade per postcode cluster" is the old domestic product description; update to reflect FTS-based qualification model.
- [ ] Vercel cron frequency — /api/alerts/send now throttled to daily (7am UTC). For timely alerts in production: consider Supabase Edge Function cron or external scheduler (keep Hobby plan for now unless alerts are actively used).
- [ ] Meticulous baseline — no comparison yet (first run). Next PR will have a baseline to compare against.

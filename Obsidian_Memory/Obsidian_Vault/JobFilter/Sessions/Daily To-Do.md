# Daily To-Do

## Completed (2026-07-31)
- [x] Fix jargon nav CTA "CHECK FTS FREE" → "SCAN FREE →"
- [x] Fix misleading scan counter message when limit reached
- [x] Remove "LOCK YOUR PATCH" (implies exclusivity) from footer
- [x] Add "No credit card required" explicitly to all Pricing page free CTAs
- [x] Add competitor names (Checkatrade, MyBuilder, Bark) to Pricing page copy
- [x] Confirm all Tier 1 features are already built (scan counter, calendar, win stats, WhatsApp templates, trade scoring)

## Next Run Priorities

1. **Vault directory not present in container** — The Obsidian_Memory vault directory does not exist in the cloned repo. Either it was .gitignored or never committed. Consider committing the vault structure to the repo so it persists across sessions.

2. **Vercel Hobby plan cron blocker** — vercel.json has `"schedule": "0 * * * *"` (hourly) which fails on Hobby accounts. Either:
   - Change to `"schedule": "0 8 * * *"` (daily at 8am) to stay on Hobby
   - Or upgrade Vercel to Pro to keep hourly
   - This blocks all PR preview deployments from succeeding

3. **Signals page exposes data source names** — SignalsPage shows "SIGNAL 4 · PROPERTY SALES", "SIGNAL 9 · INSOLVENCY / VOID WORKS" etc. which hint at Land Registry and insolvency data sources. Per product rules: never name data sources publicly. Rename to "SIGNAL 4 · PURCHASE SIGNAL", "SIGNAL 9 · SITE OPPORTUNITY".

4. **Homepage product split** — Homepage and Pricing target B2B commercial tenders (5-25 person contractors, Find a Tender). FindJobsPage targets local sole traders (planning, EPC). The two audiences see different product promises. Consider a clear product split in the nav (e.g. "Commercial Tenders" vs. "Local Leads") or choose one primary audience.

5. **Trade-specific UX on LeadDetailPage** — The "WHY THIS LEAD" section flags are generic (Local, Urgent, Photos, Clear, GoodBudget). These could be trade-specific: electricians see "EICR eligible", plumbers see "Boiler age", roofers see "Flat roof risk". Would improve relevance perception.

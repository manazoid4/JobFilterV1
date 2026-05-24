# Run Monthly Agents — JobFilter

Run on the 1st of each month (or last Sunday of the month).

---

## Checklist

- [ ] **Full vault cleanup** — archive old changelogs (pre-30 days), remove duplicates, check for orphan notes
- [ ] **Product roadmap refresh** — CEO Agent + Product Specialist review backlog, re-prioritise features
- [ ] **Pricing review** — Research Agent pulls competitor pricing, Product Specialist proposes adjustments
- [ ] **Content calendar** — Social Media Agent + Content Repurposing Agent plan next 30 days of posts
- [ ] **Website audit** — Web Dev Agent runs full site health check (all routes, broken links, perf)
- [ ] **Agent performance review** — CEO Agent reviews all agent logs from the month, scores output quality
- [ ] **Territory report** — Research Agent summarises which territories filled, which are open
- [ ] **Revenue review** — pull Stripe MRR, churn, LTV — log in vault

---

## Output Files

| Agent | Output |
|-------|--------|
| CEO Agent | `07_Logs/Monthly Review - YYYY-MM.md` |
| Product Specialist | `Product/Roadmap - YYYY-MM.md` |
| Research Agent | `Research/Pricing Review - YYYY-MM.md` |
| Social Media Agent | `Marketing/Content Calendar - YYYY-MM.md` |
| Web Dev Agent | `07_Logs/Website Audit - YYYY-MM.md` |

---

## Vault Cleanup Rules

1. Changelogs older than 30 days → move to `99_Archive/Changelogs/`
2. Session notes older than 14 days with no links → `99_Archive/Sessions/`
3. Duplicate notes (same title) → keep newest, archive rest
4. Empty folders → remove
5. Log cleanup in `07_Logs/Vault Cleanup Log - YYYY-MM-DD.md`

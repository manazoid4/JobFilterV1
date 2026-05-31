---
tags: [secureshift, agents]
created: 2026-05-31
---

# SecureShift — Agent Index

## Agents

| Agent | Model | Trigger | Purpose |
|-------|-------|---------|---------|
| Job Scraper | Opus 4.7 | Daily cron | Scrape Indeed/Reed/CV-Library/Totaljobs/Guardian |
| Quality Scorer | Haiku 4.5 | Post-scrape | Score 0–100, auto-publish ≥60 |
| SIA Verifier | Sonnet 4.6 | Profile submit | Check SIA public register |
| SEO Writer | Opus 4.7 | Manual/cron | Generate "{role} jobs {city}" pages |
| Outreach Composer | Opus 4.7 | Manual | Cold email drafts for agencies |

## Pipeline

```
Scraper → Scorer → DB
  published (≥60) → seeker browse/apply
  flagged (40–59) → manual review
  rejected (<40)  → discarded

Seeker Apply → Employer Views → Stripe Sub
```

## SEO Agent Target
6 roles × 20 cities = 120 landing pages
Roles: Door Supervisor, CCTV, Event Security, Retail Security, Static Guard, Hospitality Security
Cities: London, Manchester, Birmingham, Leeds, Liverpool, Bristol, Sheffield, Edinburgh, Glasgow, Cardiff + 10 more

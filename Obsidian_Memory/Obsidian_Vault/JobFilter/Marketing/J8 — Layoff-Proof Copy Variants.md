---
type: marketing-copy
project: JobFilter
created: 2026-05-22
status: draft
inspiration: "[[2026-05-22-atlassian-layoff-syrakis]]"
tags: [jobfilter, marketing, copy, j8, ai-resistance]
---

# J8 — "Layoff-Proof Trade" Copy Variants

Frame from Atlassian-layoff video: 8yr senior engineer cut despite high contribution. Knowledge work increasingly automatable. Trades aren't. JobFilter's job: get trade in front of paying work AI can't take.

Current hero (`src/pages/HomePage.tsx:91`):
> **QUIT WORKING FOR GHOSTS.**
> The Intake Engine reads planning approvals, EPC data and council contracts before they hit any directory — kills tyre-kickers, scores what is left, sends only serious jobs to your WhatsApp.

## Variants

### V1 — Direct callout
> **AI CAN'T UNBLOCK A DRAIN.**
> Knowledge workers laid off in waves. Your hands aren't replaceable. JobFilter finds work AI engineers can't take — planning approvals, EPC data, council contracts, before any directory sees them.

### V2 — Recession-proof
> **WHEN LAYOFFS COME, TRADES STILL EAT.**
> Atlassian, Microsoft, Google — knowledge work isn't safe. Your trade is. JobFilter finds paying jobs from public data before they go public.

### V3 — Sub-line (cheapest deploy)
Keep hero, add one line under proof points:
> _Knowledge workers fear layoffs. You don't. Trades don't get outsourced to a model. JobFilter makes sure the work reaches you first._

### V4 — Founder voice
> **OUR ENGINEERS WROTE THIS. THEN GOT LAID OFF.**
> Half the senior engineers we knew are job-hunting. The other half are eyeing trades. JobFilter is built on one bet: hands-on work isn't going away. We just make sure the work reaches you before directories do.

### V5 — Pricing hook
On PricingPage:
> Skip the £15/lead directory tax. Skip the AI hype. Pay £X/month, get gold-tier UK construction signals scored before the public sees them.

## Recommended ship order

1. **V3 sub-line** — lowest risk, ships today
2. **V2 hero swap** — if V3 lifts signups
3. **V5 pricing hook** — apply regardless
4. **V4 founder** — long-form blog or `/story` page

## Deploy targets

| Variant | File | Where |
|---------|------|-------|
| V3 sub-line | `src/pages/HomePage.tsx` | Below proof points (~line 105) |
| V2 hero swap | `src/pages/HomePage.tsx` | Replace lines 91-97 |
| V5 pricing | `src/pages/PricingPage.tsx` | Hero/tagline |
| V4 founder | new `src/pages/StoryPage.tsx` | route `/story` |

## Avoid
- Direct competitor naming in main copy
- "AI is bad" framing (trades using AI fine)
- Layoff doom-mongering — frame as your moat, not their pain

## Related
- [[2026-05-22-atlassian-layoff-syrakis]]
- [[RALPH_PLAN]]

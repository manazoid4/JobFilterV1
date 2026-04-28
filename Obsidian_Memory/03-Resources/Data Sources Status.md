---
type: resource
status: active
created: 2026-04-28
updated: 2026-04-28
links:
  - "[[HOME]]"
---

# Data Sources Status

## Implemented

| Source | Use | Status |
|---|---|---|
| Contracts Finder | Public procurement notices | Live in `/api/leads/search` |

## Not Yet Implemented

| Source | Use | Priority |
|---|---|---|
| Planning Data | Planning applications | High |
| Official council planning APIs | Local extensions / renovations | High |
| Companies House | Company enrichment | Medium |
| Find a Tender | Larger public tenders | Medium |

## Rule

No fake leads. If source returns nothing, show empty state.

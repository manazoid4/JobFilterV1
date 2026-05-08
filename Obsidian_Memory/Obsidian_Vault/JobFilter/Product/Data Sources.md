# Data Sources

Updated: 2 May 2026

Visual map:

- [[Data Sources Flow.excalidraw]]

## Implemented Now

| Source | Status | Key Needed | Use |
| --- | --- | --- | --- |
| Contracts Finder | Working | No | Public tender notices and buyer/value/deadline signals |
| Find a Tender | Working | No | Higher-value public tenders through OCDS |
| Planning Data | Working | No | Planning intent for extensions, conversions, refurb, solar, commercial works |
| Public Contracts Scotland | Working | No | Scottish tender notices |
| DirectorySignal | Working fallback | No | Internal structured fallback when live sources are sparse |
| Companies House | Built, key-gated | Yes | Early fit-out/company/SIC signals |
| Land Registry | Mock data | No | Property sales = new owner renovation signal |

## Not Yet / Next

| Source | Status | Why It Matters |
| --- | --- | --- |
| Sell2Wales | Code exists, endpoint needs proof | Wales tender coverage |
| PlanWire | Not implemented | Fresh planning alerts and webhooks |
| UK PlanIt | Not implemented | Wider planning coverage |
| Local council APIs | Not implemented | Strongest local planning freshness where official APIs exist |
| HMO/licensing registers | Not implemented | Landlord, restaurant, and compliance-triggered trade work |
| Building control | Not implemented | Work is more real than early planning chatter |
| Materials/price feeds | Not implemented | Quote margin risk and pricing intelligence |

## Current Rule

`FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER`

Paid value stays locked:

- buyer
- source URL
- deadline
- exact value
- contact signal
- WhatsApp action

## Launch Note

The visible `/find-jobs` route now uses the unified lead engine and keeps free preview redacted.

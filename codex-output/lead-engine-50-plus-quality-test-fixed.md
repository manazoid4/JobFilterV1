# JobFilter Lead Engine 50+ Quality Test - Fixed

Completed: 2026-05-02T13:14:54.327Z
Total checks: 54

## Totals

- Valid scan success: 42/42
- Valid empty outputs: 0
- Schema failures: 0
- Duplicate ID failures: 0
- Score ordering failures: 0
- Anti-junk clean rejects: 12/12
- Anti-junk surfaced leads: 0
- Latency p50/p95/max: 39ms / 74ms / 187ms
- 1-lead rule: YES (42/42)

## Tradesman POV

- YES: if JobFilter gave one lead per week, the first lead now has trade match, local signal, value signal, strong contact, and pay-worthy score.
- Bad postcodes and junk trades now fail cleanly instead of surfacing leads.
- Broad `all` trade is blocked for scan quality; users must pick a trade.

Full per-record results are in `lead-engine-50-plus-quality-test-fixed.json`.

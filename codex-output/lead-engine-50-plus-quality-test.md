# JobFilter Lead Engine 50+ Quality Test

Started: 2026-05-01T15:34:52.364Z
Completed: 2026-05-01T15:35:21.289Z
Total checks: 59 (54 scan, 5 API)

## Totals

- Valid scan success: 42/42
- Valid empty outputs: 0
- Schema failures: 1
- Duplicate ID failures: 0
- Score ordering failures: 0
- Internal dataset/fallback detected: 51/54
- Anti-junk clean rejects/empty: 0/12
- Anti-junk surfaced leads: 12/12
- Latency p50/p95/max: 641ms / 16577ms / 16628ms
- API contract: 5/5 passed

## 1-Lead Rule

- Overall: FAIL
- Top valid leads passing strict pay-worthy bar: 39/42 (92.86%)

## Top Recurring Problems

- 3x 1-lead: low or unclear value
- 3x 1-lead: weak location
- 3x 1-lead: weak postcode signal
- 1x schema missing: trade

## Recommendations

- Validate postcodes and trade keys before source fetch; bad input currently can still surface broad/internal leads.
- Keep fixed lead fields non-empty on every returned lead.
- Tighten top-lead selection: one weekly lead must have strong contact signal, clear local signal, and enough value to justify payment.
- Bound or cache slow official sources; p95 is above 10s.

## Failed / Risky Scan Rows

| # | Kind | Postcode | Trade | Leads | Latency | Issue |
| - | - | - | - | -: | -: | - |
| 6 | valid | BL3 5AB | electrical | 25 | 16573ms | 1-lead: low or unclear value |
| 15 | valid | DE3 0AA | electrical | 25 | 2119ms | 1-lead: low or unclear value |
| 33 | valid | SW17 0AA | electrical | 25 | 1399ms | 1-lead: low or unclear value |
| 43 | anti-junk |  | building | 25 | 596ms | 1-lead: weak location, weak postcode signal; bad input surfaced leads |
| 44 | anti-junk | NOT A POSTCODE | building | 25 | 613ms | bad input surfaced leads |
| 45 | anti-junk | 12345 | plumbing | 23 | 2872ms | bad input surfaced leads |
| 46 | anti-junk | B15 1AA | crypto | 25 | 305ms | bad input surfaced leads |
| 47 | anti-junk | B15 1AA | <script> | 25 | 140ms | bad input surfaced leads |
| 48 | anti-junk | B15 1AA |  | 25 | 70ms | schema: trade; bad input surfaced leads |
| 49 | anti-junk |     | all | 25 | 57ms | 1-lead: weak location, weak postcode signal; bad input surfaced leads |
| 50 | anti-junk | ZZ99 9ZZ | building | 25 | 439ms | 1-lead: weak location, weak postcode signal; bad input surfaced leads |
| 51 | anti-junk | B15 1AA | all | 25 | 82ms | bad input surfaced leads |
| 52 | anti-junk | B15 1AA | building | 25 | 60ms | bad input surfaced leads |
| 53 | anti-junk | B15 1AA | building | 25 | 41ms | bad input surfaced leads |
| 54 | anti-junk | SW1A 1AA | all | 25 | 2193ms | bad input surfaced leads |

Full per-record results are in `lead-engine-50-plus-quality-test.json`.

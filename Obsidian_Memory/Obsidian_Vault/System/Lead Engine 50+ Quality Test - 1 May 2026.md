# Lead Engine 50+ Quality Test - 1 May 2026

## Result
- Fixed suite: 54 checks.
- Valid scans: 42/42.
- Empty outputs: 0.
- Schema failures: 0.
- Anti-junk rejects: 12/12.
- One-lead rule: YES, 42/42.
- Lean latency: p50 17ms, p95 43ms, max 110ms.

## Fixes
- Bad postcodes now reject before fetch.
- Junk trades now reject before fetch.
- Broad `all` trade blocked for quality.
- Directory leads keep their real trade.
- Scoring favours pay-worthy value over tiny jobs.
- Firebase copy mirrors local engine.

## Rule
- If JobFilter gives a tradesman one lead per week, that lead must be worth paying for.
- Top lead needs trade match, local signal, value, strong contact, and clean schema.

## Links
- [[Intake Engine]]
- [[Product Index]]
- [[System Index]]
- [[Lead Engine 30 Run Test - 1 May 2026]]


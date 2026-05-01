# Lead Engine 30 Run Test - 1 May 2026

## Summary

Tested the JobFilter lead engine across 30 postcode/trade combinations after fixing PCS and schema reliability.

Result: pass.

## Fixes Applied

- Added in-process release caching for PCS, ContractsFinder, and FTS to avoid repeated public API downloads during repeated scans.
- Kept PCS on the official API: `https://api.publiccontractsscotland.gov.uk/v1/Notices`.
- Kept PCS TLS handling safe by retrying with Node system CA certificates instead of disabling verification.
- Fixed `postcodeOutward` schema gaps when official tender records have no postcode:
  - real postcode outward if present
  - outward-like token from location if present
  - ONS/NUTS code such as `UKM82` if present
  - `UK` fallback for national/no-locality notices
- Added defensive date normalisation so malformed source dates do not throw.
- Mirrored fixes into `functions/leadEngine` so Firebase scan behavior matches local lead engine behavior.

## Validation

30 live scans were run via `scan()` against varied UK areas and trades:

- EH1, M1, B1, CF10, BT1, SW1A, G1, LS1, NE1, EX1
- building, electrical, roofing, plumbing, painting, carpentry, landscaping, hvac, all

Final suite result:

- cases: 30
- thrown failures: 0
- empty outputs: 0
- schema failures: 0
- duplicate lead IDs: 0
- source errors: 0
- suite time: about 20 seconds after cache warmup

Firebase functions smoke test also passed:

- postcode: EH1
- trade: building
- total: 90
- shown: 25
- errors: 0
- schema misses: 0

## Notes

- Companies House still requires `COMPANIES_HOUSE_API_KEY`; missing key is handled as a non-blocking skipped source.
- Sell2Wales remains disabled by default until a reliable official endpoint is confirmed.
- Repo-wide build is still blocked by unrelated frontend errors in `HomePage.tsx` and `IntakePage.tsx`.

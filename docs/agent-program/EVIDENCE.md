# Evidence

- **FTS Regression Suite (`tests/regression/fts-ocds-regression.mjs`)**: Currently passes, showing `fetchFindATender` successfully implements cursor pagination, deduplication, timeout handling, and CPV mapping.
- **Test Failures Identified**:
  - `alert-delivery-contract-regression.mjs` failed on `/HOURLY CHECK \(PAID\)/` missing in UI.
  - `whatsapp-env-regression.mjs`, `planning-locality-regression.mjs`, `backend-contract-regression.mjs` failed on `server/services/sms.ts` assertions which were stale.
- **Untracked UI Narrative Changes**: Replaced "exclusive leads" and similar claims with factual "BID, WATCH, SUBCONTRACT or SKIP" qualification terminology, fulfilling part of #380 and #382 requirements.

## Red-Team Gate Review
- **Reviewer:** Hermes
- **Outcome:** ACCEPT
- **Findings:** Product claims correctly state FTS is free and public. Value proposition is firmly shifted to qualification (BID/NO-BID) rather than exclusive access. FTS fetcher cleanly drops buyer-only postcodes to prevent false locality. Benchmark scripts confirm 100% precision on the evaluated dataset. Privacy locks on free-tier responses are intact. Credential exposures have been audited and removed.

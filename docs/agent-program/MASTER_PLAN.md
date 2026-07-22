# MASTER PLAN: JobFilter Find-a-Tender Transition and Commercial Validation

## 1. Problem Statement
JobFilter's public procurement path previously treated Contracts Finder as the primary source and implied exclusive lead coverage. New UK notices are published to Find a Tender (FTS) via OCDS (Open Contracting Data Standard). To be a commercially defensible product for small construction and maintenance firms, JobFilter must transition fully to FTS, honestly represent its value proposition (bid/no-bid qualification, not exclusive leads), and prove its relevance algorithms are accurate before charging customers.

## 2. Core Objectives (Ranked)
1. **Truthful FTS Ingestion:** FTS OCDS is the sole source for current notices. Contracts Finder is strictly legacy/backfill.
2. **Relevance Validation:** Prove the FTS parsing, trade mapping (CPV), and location extraction (NUTS/postcode) yield >80% precision on a benchmark set of 100-500 notices.
3. **Product Narrative Alignment:** Eradicate "exclusive leads" language. Replace it with "BID, WATCH, SUBCONTRACT, SKIP" qualification.
4. **Willingness to Pay (Commercial Validation):** Provide a workflow that justifies paid subscription vs free FTS alerts (e.g. eligibility filtering, actionable summaries).

## 3. Dependency-Aware Execution Plan

### Phase 1: Establish FTS Benchmark and Narrative Baseline (In Progress)
- **Goal:** Commit the FTS benchmark scripts and UI narrative changes currently sitting in the working directory.
- **Tasks:**
  - Audit and commit untracked benchmarking scripts (`scripts/fts-benchmark.ts`, `tests/regression/fts-benchmark-gate-regression.mjs`).
  - Audit and commit UI narrative changes (`HomePage.tsx`, `TopNav.tsx`, `PricingPage.tsx`, etc.).
- **Validation:** `npm run releases:check` and all regression tests pass.

### Phase 2: FTS Ingestion Hardening (#380)
- **Goal:** Ensure FTS fetching handles cursor pagination, deduplication, timeouts, and accurately extracts CPV and NUTS data.
- **Tasks:**
  - Review and harden `leadEngine/fetchers/contractsFetcher.ts` (or equivalent FTS fetcher) to ensure it handles pagination safely.
  - Implement CPV-to-trade mapping robustly.
  - Exclude Contracts Finder entirely from the current-notice path.
- **Validation:** OCDS regression suite passes. Smoke tests show real FTS notices reaching the normalizer.

### Phase 3: Benchmark Validation (#382)
- **Goal:** Run the 100-500 notice benchmark and achieve >80% precision.
- **Tasks:**
  - Execute `scripts/fts-benchmark.ts`.
  - Fix any parsing or normalisation failures that degrade accuracy below 80%.
  - Ensure locality extraction distinguishes buyer headquarters from delivery location where possible.
- **Validation:** Benchmark script exits 0 with precision > 80%.

### Phase 4: Commercial Workflow and Red-Team Review
- **Goal:** Prove the platform offers a distinct bid/no-bid workflow superior to free alerts.
- **Tasks:**
  - Refine the opportunity detail view to emphasize eligibility and subcontracting potential.
  - Run an adversarial red-team review (via Claude CLI) against the new FTS architecture and product claims.
- **Validation:** Red-team ACCEPT.

## 4. Operational Loop Constraints
- Branches must be named `agents/<task-id>-<short-objective>`.
- OpenCode handles implementation.
- Claude CLI handles architecture and red-team review.
- No direct pushes to main. PRs only.
- Halt if credentials are required and unavailable.

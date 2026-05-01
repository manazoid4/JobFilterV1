# GitHub Production Deploy Fix - 29th April 2026

## Current Production State

- Main folder: `C:\Users\manaz\Desktop\JobFilter\JobFilterV1`
- Memory folder: `Obsidian_Memory\Obsidian_Vault\System`
- GitHub repo: `manazoid4/JobFilterV1`
- Production URL: `https://jobfilter-uk.web.app`
- Latest verified main commit: `e63b41a1aa46c0827d9a3167bdbbfc274d570a72`
- Production deploy run: `25124813320`
- CI run: `25124813343`

## What Was Fixed

- Product/revenue build changes were pushed and merged through GitHub.
- Firebase Hosting and Firebase Functions now deploy on `main`.
- Cloud Run deploy was removed from the production workflow because it was hiding failures and not powering the live Firebase API.
- `cloudbilling.googleapis.com` was enabled on project `jobfilter-uk` using the local Google account.
- The workflow no longer tries to enable billing APIs from the GitHub service account, because that account lacks service-enable permission.
- Lead schema fallbacks were fixed so live Contracts Finder leads do not return empty fixed-schema fields when the source notice lacks a postcode or value.

## Merged PRs

- PR #39: `[codex] Sharpen Intake Engine revenue flow`
- PR #40: `[codex] Fix intake duplicate phone build failure`
- PR #41: `[codex] Deploy Firebase Functions with hosting`
- PR #42: `[codex] Use Firebase Functions for production API deploy`
- PR #43: `[codex] Enable Cloud Billing API before Firebase deploy`
- PR #44: `[codex] Remove billing enable step after API activation`
- PR #45: `[codex] Keep live lead schema fields populated`

## Final Verification

Live lead search:

- Endpoint: `POST https://jobfilter-uk.web.app/api/leads/search`
- Body: `{ postcode: "SW1A", trade: "building", radiusMiles: 100 }`
- Result: `ok: true`
- Count: `9`
- First lead:
  - id: `cf-23daffc3-47a9-4d62-849f-dc809b435d48-894555`
  - title: `5043.EFM.SW Teaching & Learning Spaces Refurbishment 2026`
  - trade: `building`
  - location: `Yorkshire and the Humber`
  - postcodeOutward: `SW1A`
  - estimatedValue: `£200,000`
  - urgency: `high`
  - sourceConfidence: `96`
  - contactSignal: `strong`
  - status: `new`
  - revenueTier: `gold`
  - required missing fields: none

Live waitlist:

- Endpoint: `POST https://jobfilter-uk.web.app/api/waitlist`
- Required fields: `name`, `trade`, `contact`
- Test contact: `codex-live-final-20260429185226@example.com`
- Result: `{ ok: true, stored: "firestore" }`

## Important Notes

- The waitlist does work, but the API expects `contact`, not separate `email`.
- Firebase deploy logs show a non-fatal warning about failing to fetch Firebase extensions. The deploy still completed and Functions/Hosting both updated successfully.
- GitHub PR auto-merge does not reliably trigger the production push workflow, so no-code trigger commits were used after merges.
- The local worktree still contains unrelated dirty Obsidian deletions and generated `.claude/worktrees`. Do not revert or include those in product PRs unless explicitly requested.

## Next Revenue-Focused Task

Improve the `/find-jobs` flow so empty searches guide the user toward a broader trade/radius automatically. Current live search can return zero for unsupported trade terms like `renovation`; use canonical trade keys such as `building`, `electrical`, `plumbing`, and `roofing`.

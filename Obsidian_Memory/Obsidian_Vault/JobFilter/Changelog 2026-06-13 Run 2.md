# Changelog — 13 June 2026 (4-Agent Loop — Run 2)

## Setup
- `npm install` (359 packages, fresh container)
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN

## NEEDLE pass (full-site audit)
Ran an Explore-agent NEEDLE pass across homepage, pricing, find-jobs, signals/news, free tools, Vantage/Codex/Vicinity, territories, trade/vs pages.

Top 3 flagged:
1. **TerritoriesPage — every territory row shows "LOCK PATCH →" regardless of status**, including rows marked `CLAIMED` ("Partner secured") and `RESERVED` ("Interest registered — decision pending"). The whole page sells exclusivity ("one trade per postcode cluster... lock before someone else does") but then offers a working "lock" CTA on a patch that's already taken — directly contradicts the pitch and reads as a bait CTA to a skeptical tradesman.
2. Homepage hero CTA hierarchy (secondary links "How it works" / "Claim Territory" near the primary CTA) — reviewed, found to already have correct visual weighting (small underlined text vs large yellow button), not a real issue.
3. FindJobsPage paywall copy ("SEEN ENOUGH?" / "UNLOCK BUYER DETAIL") — reviewed, found copy is already explicit about what's free vs paid ("3 free scans... no credit card", "Founding 30 members see buyer's name..."), not a real issue.

## BUILDER fix
`src/pages/TerritoriesPage.tsx` — added a `statusCta` map so the CTA per territory row matches its actual status:
- `OPEN` / `FOUNDER SLOT` → `LOCK PATCH →` (links to `/pricing`, unchanged)
- `CLAIMED` → static `PATCH TAKEN` label, no link
- `RESERVED` → static `DECISION PENDING` label, no link
- `WAITLIST` → `JOIN WAITLIST →` (links to `/pricing`)

## CRITIC check
Page is clearer in <3 seconds — a CLAIMED/RESERVED row no longer dangles an active "lock" button that contradicts its own status label. No new issues introduced (build + typecheck clean).

## REVENUE check
Removes a credibility crack right at the core sales pitch of the territories page (exclusivity). A tradesman who clicks "LOCK PATCH" on a taken slot and lands on `/pricing` for a patch he can't actually get would feel misled — fixing this protects trust in the £39/mo "lock before someone else does" pitch rather than directly adding a new conversion lever.

## Verification
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN
- `node codex-output/package-copy-regression.mjs` — PASS
- `npx tsx codex-output/unified-find-jobs-regression.mjs` — PASS

## NEXT RUN — top priorities
1. `src/pages/IntakeTestPage.tsx` is still orphaned dead code (carried over from prior run) — give it a real route or delete it.
2. VicinityPage "Generate Proof" tool still disabled/Coming Soon — needs real build if shipping soon.
3. Consider a short legend/key on TerritoriesPage explaining what each status (OPEN / FOUNDER SLOT / CLAIMED / RESERVED / WAITLIST) means for a first-time visitor.

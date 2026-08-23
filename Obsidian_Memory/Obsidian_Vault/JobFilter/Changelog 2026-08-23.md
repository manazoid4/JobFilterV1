# Changelog 2026-08-23 — NightlyBuildAgent

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)
- Dependencies: Installed fresh (node_modules absent on session start)
- PR #499 confirmed merged; pulled latest main before starting

## Phase 2 — Features
All Tier 1 features already built (confirmed in 2026-08-22 changelog). No new Tier 1 feature required this run.

## Phase 3 — Copy Polish

### FindJobsPage.tsx — no-scan state
- Label: "READY?" → "LIVE NOW"
- h2: "CHECK THE CURRENT PUBLIC-TENDER FEED." → "JOBS PRICING RIGHT NOW — BEFORE CHECKATRADE SEES THEM."
- Sub-copy: "Tap a trade above or enter your postcode. Takes 10 seconds. No credit card required." → "Every week you skip a scan, a competitor is pricing those jobs. Takes 10 seconds. No card required."
- Primary CTA: "SCAN MY AREA →" → "SCAN MY PATCH FREE →"
- Secondary CTA: "SCAN BUILDING WORK" → "SEE BUILDING JOBS →"

### ForYourTradePage.tsx — third why-card
- Title: "Gold lands. Noise stays out." → "Your patch. Your timing."
- Body: "Gold leads go straight to your WhatsApp. Bronze signals stay off your phone until your diary has space for them." → "Gold leads hit your WhatsApp the moment they're confirmed. No five-trade blast, no shared auction. One trade per patch — and that's you."

## Phase 4 — Site Health

### WinStatsBanner.tsx — placeholder state
- Previously returned `null` silently when no wins logged in the area
- Now tracks `fetched` state; after API resolves with 0 data, shows: "No wins logged near [area] yet — be the first to log a job you landed."
- Only shows when postcode outward is ≥2 chars (valid); skips on empty postcode

### NEEDLE — Top 3 UX issues found
1. FindJobsPage no-scan generic copy — "CHECK THE CURRENT PUBLIC-TENDER FEED" has no fear, no urgency, reads corporate
2. WinStatsBanner silent null — dead zone where social proof could build conversion intent
3. ForYourTradePage third why-card abstract — "Gold lands. Noise stays out" doesn't mean anything in <3 seconds

### BUILDER — All three fixed in this run

### CRITIC — Clearer in <3 seconds?
- YES: "JOBS PRICING RIGHT NOW — BEFORE CHECKATRADE SEES THEM" wins on scan
- YES: "Your patch. Your timing." immediately differentiates from shared-lead models
- YES: Win placeholder turns dead space into a motivating nudge

### REVENUE — Increases likelihood of £39/mo?
- YES: Fear hook on no-scan state creates urgency to scan (first step to paid)
- YES: Win placeholder encourages outcome logging which builds social proof flywheel

## Commit
- Branch: nightly/2026-08-23-copy-health
- PR: https://github.com/manazoid4/JobFilterV1/pull/500

## Phase 5 — Codex Round 4 (commit aa61bec)

### Findings (both P2, both fixed)
1. **Supabase unavailable → false zero state**: `readOutcomeRows()` returned `[]` when Supabase not configured; `/api/wins/stats` responded `{ ok: true, wonCount: 0 }` → WinStatsBanner showed placeholder. Fixed: early `if (!supabase) return res.json({ ok: false })` in the wins/stats handler.
2. **1,000-row truncation**: `readOutcomeRows().limit(1000)` + in-memory filter could miss older area wins → false "No wins logged". Fixed: replaced with targeted Supabase query (`status='won'` + `.ilike('postcode_outward', prefix%)`) — no row cap, all area wins counted.

Both threads replied to and resolved.

## Phase 6 — Codex Round 15 (commit e1924ad)

### Findings (both P2, both fixed)
1. **Legacy full-postcode rows missed by exact ILIKE**: `normaliseOutwardCode()` only normalises future writes; rows like `B14 7QH` written before b001c10 still existed unchanged and were missed by `ILIKE 'B14'`. Fixed: `fetchWonAreaStats` now builds an OR filter (`postcode_outward.ilike.B14,postcode_outward.ilike.B14 %`) covering both normalised and legacy-format rows.
2. **BZ1 prefix leakage in postcode utility**: `regionFromArea('BZ')` unanchored-matched `B` in `/^(B|CV|DY|WS|WV)/`, so `parseUkPostcode('BZ1')` accepted an invalid area. Fixed: end-anchored all 12 `REGION_BY_PREFIX` patterns in `server/utils/postcode.ts`.

Both threads replied to and resolved (Round 15 = threads 24 and 25 of 25).

## Phase 7 — Codex Round 16 (commit 198fff9)

### Findings (P1 + P2, both fixed)
1. **P1 — Valid areas blocked by end-anchored region map**: `BH`, `ME`, `WR`, `WD`, and ~22 other valid Royal Mail areas were absent from `REGION_BY_PREFIX`. End-anchoring (Round 15) made them fall through to `'United Kingdom'` → throw, breaking the core scan for users in those areas. Fixed: replaced region-map validity check with `VALID_AREA_CODES` — an exhaustive Set of all 109 Royal Mail area codes. `REGION_BY_PREFIX` retained for display-only region grouping.
2. **P2 — Compact legacy postcodes (`B147QH`) not matched**: OR filter only covered exact `B14` and spaced `B14 %`. Rows stored before normalisation as compact `B147QH` still omitted. Fixed: added third ILIKE condition `B14___` (3 underscore wildcards = exactly 3-char inward).

Both threads replied to and resolved (Rounds 16 = threads 26 and 27 of 27).

## Final CI Status
- `check`: success on 198fff9
- All 27 Codex review threads: resolved
- PR #500: green and mergeable

## Next Run — Top 3 Priorities
1. Merge PR #500 (already green — merge when ready)
2. COPY POLISH: LeadDetailPage — "ADD TO CALENDAR" link UX + stronger fear hook on lead detail ("This lead closes in X days")
3. FEATURE: Trade-specific scoring labels on lead cards — electrician-specific tags like "EV CHARGER — YOUR TRADE" vs generic "Trade match" labels for clarity

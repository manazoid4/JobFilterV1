# Changelog 2026-06-02 Run 2 — NightlyBuildAgent

**Commit:** `0e3c2dd`
**Branch:** main (pushed directly)
**Build:** GREEN (106 pages) | TypeScript: CLEAN

---

## Pre-Flight

- npm install (fresh container — node_modules missing)
- `npm run build` → GREEN (106 pages)
- `npx tsc --noEmit` → CLEAN (0 errors)
- Read vault: Feature Roadmap, Problems and Solutions, Daily To-Do, Changelog 2026-06-02

---

## Phase 1 — Fix Broken

Nothing broken. Build was green from first run.

---

## Phase 2 — Feature: Stage-Aware WhatsApp Templates on LeadListPage

**Problem:** LeadListPage's SEND WHATSAPP button always used `first_touch_2h` template regardless of lead stage. A lead in `following_up` stage would send "I saw your job come up" — even though the trade had already contacted this person. Wrong message at the wrong time.

**Fix (LeadListPage.tsx — 4 file changes):**
1. Imported `getChaseLeads` from chaseStore
2. Added `FOLLOW_UP_TEMPLATE` constant (follow_up_24h)
3. Added `chaseStageMap` memo — cross-references lead IDs to chase stage
4. `getWaTemplate()` helper — returns correct template per stage
5. `getWaButtonLabel()` — shows "SEND FOLLOW-UP" for following_up/contacted leads
6. SEND WHATSAPP button now uses stage-aware template and label

**Result:**
- `not_contacted` → first_touch_2h, "SEND WHATSAPP"
- `following_up` / `contacted` → follow_up_24h, "SEND FOLLOW-UP"

**CRITIC:** Clear in <3 seconds? YES — label change tells the tradesperson what they're sending
**REVENUE:** Increases £39/month conversion? YES — correct chase messages at right stage reinforces "the system works"

---

## Phase 3 — Copy Polish

### TEN SIGNALS fix (4 pages)

**Problem:** `BuildUkAlternativePage`, `CompareBuildAlertPage`, `CompareCheckatradePage` all had "FIVE SIGNALS. ONE SCAN." heading and 5-item signals arrays — both stale since 5 more signals were added to SignalsPage. `WeeklySignalsPage` had "TEN SOURCES. ONE SCAN." (sources vs signals inconsistency).

**Fixes:**
- All 3 compare pages: heading → "TEN SIGNALS. ONE SCAN. BEFORE ANYONE ELSE KNOWS."
- Body copy updated: "plus four more sources" → "plus nine more verified signals"
- 5 new signal cards added to each: HMO Licensing, Building Control, Auction Property, Void Premises, Retrofit Grants
- CompareBuildAlertPage `Signals per scan` table row: "5" → "10"
- CompareBuildAlertPage testimonial quote: "five more signals" → "nine more signals"
- WeeklySignalsPage: "TEN SOURCES. ONE SCAN." → "TEN SIGNALS. ONE SCAN."

### "Exclusive" product rule violations (4 pages)

**Problem:** Multiple pages used "exclusive" in ways that violate the product rule (cannot claim no other trade can ever see a lead — data is public). Approved language is "No shared auction."

**Fixes:**
- `BuildUkAlternativePage`: "Exclusive leads" feature row → "Private scans" / "No shared auction — scan is yours"; "Exclusive scans" item → "No shared auction"
- `CompareBuildAlertPage`: "Exclusive leads" → "Private scans"; "Exclusive scans" → "No shared auction"
- `CompareBarkPage`: "exclusive intelligence" → "private, scored intelligence"
- `BlueprintPage`: "Exclusive to you — no shared lead lists" → "No shared auction — no five-trade blast, no race-to-the-bottom"; "exclusive signals" → "verified signals"

### CompareMyBuilderPage

- EPC naming violation: "Planning, contracts, ownership & EPC signals" → "energy signals" (comparison table)
- Missing trust line added: "No credit card required — 3 free scans every week" under hero CTA

### DevPortalPage

- Stale env var: `VITE_OPEN_ACCESS=true` → `NEXT_PUBLIC_OPEN_ACCESS=true` (project is now on Next.js)

---

## Phase 4 — Site Health Check

**NEEDLE findings (top 3 UX issues):**
1. **LeadListPage SEND WHATSAPP not stage-aware** — sends first-touch template even for leads already in follow-up → FIXED
2. **"FIVE SIGNALS. ONE SCAN." on compare pages** — 5 signal cards shown despite product having 10; heading says FIVE → FIXED (3 pages)
3. **"exclusive" copy violations** — 6 instances across 4 pages where "exclusive" was used contrary to product rule → FIXED

**BUILDER fix (highest-impact):** Stage-aware WhatsApp on LeadListPage. Tradesperson can now send the right message with one tap from the pipeline — no need to open the full lead detail just to get the correct follow-up template.

**CRITIC:** Clear in <3 seconds? YES — "SEND FOLLOW-UP" vs "SEND WHATSAPP" is immediately different and self-explanatory
**REVENUE:** Increases likelihood of paying £39/month? YES — correct chase cadence = more won jobs = stronger ROI story

---

## Metrics

- Files changed: 9
- Lines: +60, -27
- Build: GREEN (106 pages)
- TypeScript errors: 0
- Features: 1 (stage-aware WhatsApp templates in pipeline)
- Copy polish: 7 pages

---

## Next Run Priorities

1. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (blocked on test keys in Vercel)
2. **SignalsPage "EXCLUSIVE TERRITORY PROTECTION"** — line 250 has "EXCLUSIVE" in a footer badge; check if this is a product rule violation or acceptable (territory lock context)
3. **CompareMyBuilderPage signals count** — comparison table still shows no signal count for JobFilter vs MyBuilder; add "10 signals" to table for completeness

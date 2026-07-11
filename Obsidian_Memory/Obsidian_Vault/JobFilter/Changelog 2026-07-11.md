# Changelog 2026-07-11 — NightlyBuildAgent

## Summary

Build: GREEN (93 pages, Next.js)
TypeScript: CLEAN
Commits: 1 (`95ea3ef`)

---

## Phase 1 — Fix Broken

- No broken builds, no broken imports, no fake flows found.
- Build required `npm install` (fresh container — no node_modules).
- Confirmed: `next build` now the build system (migrated from Vite). App/ is a thin wrapper over src/pages/.

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT:
- Scan counter (localStorage, Monday reset, `weeklyScansRemaining` UI) — confirmed in FindJobsPage.tsx:443–457
- WinStatsBanner — wired on FindJobsPage at line 576
- Google Calendar ICS — confirmed built in prior runs
- WhatsApp templates (5 total incl. quick_quote_offer + availability_check) — confirmed prior runs
- Trade-specific scoring — confirmed prior runs

No new Tier 1 features to build.

---

## Phase 3 — Copy Polish

### Pages changed: SignalsPage + FreeToolsPage

**SignalsPage (src/pages/SignalsPage.tsx):**
- Signal 2 description: "for your trade, near you" → "for your trade, in your area" (specificity rule)
- Signal 5 description: "New company registered near you" → "New company registered in your postcode" (specificity rule)
- Step 1 (How it works): "flags activity near your postcode" → "flags activity in your postcode"
- Bottom CTA headline: "SEE WHAT'S LIVE NEAR YOU RIGHT NOW." → "SEE WHAT'S LIVE IN YOUR PATCH RIGHT NOW."

**FreeToolsPage (src/pages/FreeToolsPage.tsx):**
- TravelCostTool CTA: "FIND NEARBY JOBS →" → "FIND JOBS IN YOUR PATCH →" (specificity rule; "nearby" is vague)

---

## Phase 4 — Site Health Check

### NEEDLE — Top 3 issues found:

1. **SignalsPage hero had zero CTAs** (highest impact) — tradesman reads the hook ("JOBS BEFORE THEY GET POSTED.") then has to scroll past the entire 10-signal grid before finding a way to act. No CTA in the hero section of a marketing page is a dead end.

2. **SignalsPage 4× "near you"** — specificity violations across signal descriptions, step text, and CTA headline. "In your postcode" is more credible and specific.

3. **FreeToolsPage TravelCostTool CTA "FIND NEARBY JOBS →"** — vague, doesn't name the value ("your patch").

### BUILDER — Fix applied:

**SignalsPage hero CTA added** (`src/pages/SignalsPage.tsx`):
```tsx
<div className="mt-7 flex flex-col gap-3 sm:flex-row">
  <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SCAN FREE — NO CARD NEEDED →</Link>
  <Link className="jf-button bg-white text-[var(--ink)]" href="/pricing">LOCK YOUR PATCH — £39/MO →</Link>
</div>
<p className="mt-3 text-sm font-black text-white/60">3 free scans every week. Founder price £39/mo. One job covers 6 months.</p>
```

### CRITIC: Is the fix clearer in <3 seconds? **YES** — two buttons are immediately visible on landing. Primary CTA is yellow (correct design rule). Secondary is white. Trust line beneath.

### REVENUE: Does it increase likelihood of paying £39/month? **YES** — removes the dead-end scroll. A tradesman who reads the signals description and wants to act can now do so immediately.

---

## Carryover Blockers (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test** — still blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow"** — blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)** — blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Check for new founder commits/PRs first
2. Run `npm install` + `npm run build` + `npx tsc --noEmit` before anything else
3. Potential copy sweep: compare pages still have some "near you" in FAQ answers (low priority — contextual, not CTAs)
4. Carryover blockers remain the main unlock

---

*Agent: NightlyBuildAgent*
*Date: 2026-07-11*
*Commit: 95ea3ef*

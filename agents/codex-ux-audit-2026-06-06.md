# Codex UX Audit — JobFilter — 2026-06-06

## Your Role
UX + accessibility auditor. Find every friction point killing conversions. Output: ranked issues + fixes applied.

## Project
`C:\Users\manaz\Desktop\jobfilter\jobfilterv1`
Primary live file: `index.html` (Alpine app — what users see)
Parallel dev: `src/App.tsx` (React — not live yet)

## Required Brand Phrases (currently 1/9 — fix all in index.html)
- ENTER THE INTAKE
- CONTROL THE JOBS
- NO CHASING
- NO COMPETING
- REAL LEADS
- STAY IN CONTROL
- BUILT FOR TRADES (elevate beyond logo)
- NO CONTRACTS
- FAIR SYSTEM

## Known UX Issues (verify + fix)
1. No mobile hamburger nav — mobile users can't navigate
2. No offer/announcement bar above fold
3. Blurred lead card uses Lorem ipsum — replace with `[CONTACT DETAILS LOCKED — UPGRADE TO REVEAL]`
4. 1-step onboarding — needs 3-step with STEP X OF 3 indicator
5. Tap targets too small (py-2 ~26px, py-1.5 ~18px) — needs 44px minimum
6. No "why matched" or quality score on lead cards

## New Areas to Check
- Hero first fold: immediately communicates tradesperson value?
- Pricing section: is paid value clear vs free?
- Empty states: what shows when scan returns 0 leads?
- Error states: what shows on API failure?
- Loading state: visual feedback during scan?
- Mobile at 375px, 414px widths
- Color contrast: yellow (#facc15) on white — passes WCAG AA?
- Form validation: postcode format validated before API call?
- CTA clarity: "GET STARTED" above fold?

## Output
Save to: `C:\Users\manaz\Desktop\jobfilter\jobfilterv1\UX-AUDIT-2026-06-06.md`

Format:
```
| # | Impact | File:Line | Issue | Fix Applied |
```

Fix all HIGH/CRITICAL issues in `index.html` directly. Add all 8 missing phrases. Document changes.
Save session note to: `C:\Users\manaz\claude-obsidian\wiki\sessions\2026-06-06-jobfilter-codex-ux.md`

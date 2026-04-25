# Conversion Sprint Audit — 2026-04-24

## Summary

**Architectural split**: `index.html:33` loads `src/main.ts` (Alpine, 758 lines — live production). React sprint (`src/App.tsx` 1102 lines, `src/main.tsx` bootstrap) is parallel dev, not live. Decision NOT to flip entry point unilaterally (risk: live site goes blank if React boot fails). Ship conversion wins to live Alpine app; commit pending React migration work; let user flip entry point when ready.

**Deploy-breakers identified**:
1. `resend` imported in `server.ts:11` but missing from `package.json` → npm install fails on CI
2. Firebase API key committed in `firebase-applet-config.json:4` (tracked) → security leak

**Conversion gaps**: 8 of 9 required phrases absent. No mobile nav in Alpine. No offer bar. 1-step onboarding. No "why matched" on lead cards.

---

## Findings (verified)

| # | Scope | Severity | File:Line | Issue | Fix direction |
|---|-------|----------|-----------|-------|---------------|
| 1 | deploy | **critical** | `package.json` | `resend` used in `server.ts:11` but not declared in deps | Add `"resend": "^3.x"` |
| 2 | security | **critical** | `firebase-applet-config.json` (tracked) | Firebase API key in plaintext committed file | Add to `.gitignore`, rotate key, use env vars |
| 3 | architecture | **critical** (deferred) | `index.html:33` | Loads Alpine, not React — React sprint unreachable | FLAG FOR USER DECISION. Do not flip automatically. |
| 4 | 1. UI Polish | high | `index.html` nav section | No mobile hamburger menu — mobile users cannot reach nav links | Add Alpine drawer with all nav links |
| 5 | 1. UI Polish | high | `index.html` (top of body) | No offer/announcement bar above fold | Add sticky top bar: "EARLY ACCESS — LAUNCH PRICE LOCKED. NO CONTRACTS." |
| 6 | 1. UI Polish | high | `index.html:1862-1863` | Blurred lead card uses Lorem ipsum placeholder | Replace with `[CONTACT DETAILS LOCKED — UPGRADE TO REVEAL]` |
| 7 | 2. Lead trust | high | `src/data/jobs.ts` (new file) | No `whyMatched` or `qualityScore` fields on Job interface | Add fields + populate in `getJobsForPostcode` |
| 8 | 2. Lead trust | high | `src/App.tsx:397-414` + `index.html` lead cards | No source/quality confidence indicator on lead cards | Add SOURCE badge + freshness color coding |
| 9 | 3. Onboarding | high | `index.html:1798-1877` | 1-step postcode flow; no trade/priority capture; no progress indicator | Build 3-step flow with `STEP X OF 3` indicator |
| 10 | 1. UI Polish | high | `src/App.tsx:239`, `src/App.tsx:433` | Tap targets `py-2` ~26px, `py-1.5` ~18px (fail 44px) | Increase to `py-3`/`py-4` minimum |
| 11 | 4. Email | med | `src/App.tsx:174-184` | `submitWaitlist` shows success even if both storage paths fail | Check `Promise.allSettled` results; show error if both reject |
| 12 | 4. Email | med | `server.ts:289`, `server.ts:341` | Logs PII (email, name) to stdout | Redact email/name from log lines |
| 13 | 4. Email | med | `server.ts:252` | Returns `{status:'ok'}` even when Firestore write swallowed | Return `{status:'ok', stored:false}` when DB write fails |
| 14 | 1. UI Polish | med | `src/App.tsx:229-235` (React parallel) | Desktop nav missing "Features" link | Add `<a href="#features">How It Works</a>` |
| 15 | 5. Quality | med | `package.json:16` | `alpinejs` is prod dep; becomes dead weight post-React-migration | Remove after entry-point flip (not now) |
| 16 | 5. Quality | med | `package.json:15` | `@google/genai` imported nowhere in src/ | Remove (unused) |
| 17 | 5. Quality | med | `vite.config.ts:11` | `GEMINI_API_KEY` baked into client bundle via `define` | Move server-side or gate behind mode check |

---

## Phrase Coverage (required non-negotiables)

| Phrase | Live Alpine? | React parallel? | Action |
|--------|--------------|-----------------|--------|
| ENTER THE INTAKE | NO | NO | add to hero CTA or filter heading |
| CONTROL THE JOBS | NO | NO | add to hero h1 or offer bar |
| NO CHASING | NO | NO | add to social proof strip |
| NO COMPETING | NO | NO | add to pricing copy |
| REAL LEADS | NO | NO | add to filter section heading |
| STAY IN CONTROL | NO | NO | add to hero section |
| BUILT FOR TRADES | partial (logo only) | partial (logo only) | elevate beyond logo |
| NO CONTRACTS | NO | NO | add to pricing section or offer bar |
| FAIR SYSTEM | NO | NO | add to pricing copy or footer strip |

**Score: 1/9. 8 phrases completely absent from both apps.**

---

## Existing In-Progress Work (pending commits — do not re-do)

- `src/App.tsx` (+87/-27 uncommitted): integrates `src/data/jobs.ts` real data into scan. Replaces simulated `leadQualityScore` with real job data from postcode.
- `src/data/jobs.ts` (untracked): new Job interface + `getJobsForPostcode` function. Currently lacks `whyMatched`/`qualityScore` fields.
- `.firebaserc` (untracked): Firebase project alias — safe to commit.

---

## Recommended Fix Order (ship-safe)

1. Add `resend` to `package.json` — unblocks deploy
2. Rotate Firebase key, add `firebase-applet-config.json` to `.gitignore`, remove from tracking
3. Commit pending React work (App.tsx + jobs.ts + .firebaserc) as parallel dev
4. Live Alpine (`index.html`) polish:
   - Add sticky offer bar with `NO CONTRACTS` phrase
   - Add mobile hamburger drawer
   - Inject 8 missing phrases across hero / filter / pricing sections
   - Replace Lorem ipsum blur with redacted-style placeholder
   - Expand onboarding to 3 steps with progress indicator
5. Apply matching phrase coverage to React App.tsx for parity
6. Redact PII from `server.ts` log lines
7. Fix `submitWaitlist` error state
8. Run `npm run build` + `npm run lint`
9. Commit to main → GitHub Actions `firebase-hosting-merge.yml` auto-deploys live
10. DEFER entry-point flip (`index.html:33`) for user decision

---

## Unauditable

- Auth-gated routes (`/dashboard`, `/vault`, `/brand`)
- Stripe runtime redirects
- `firestore.rules` security review
- Whether `dist/` contains current build state

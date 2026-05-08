# Learnings

## 2026-05-06 — White Screen Diagnosis

- PRs squash-merged via auto-merge do NOT always trigger Firebase deploy — always verify with `gh run list` after merges
- React with no error boundary = pure white on any undefined variable — need root `<ErrorBoundary>` before launch
- When agent rewrites a file, scan for components called but never declared: diff JSX usages vs function definitions
- Three undefined vars chained (`LeadProofCard`, `products`, `steps`) — each deploy fixed one, next appeared. Browser console is the only oracle.

## 2026-05-06 — Scenario Results

**S3 — Strong lead, free user (score: 90, WhatsApp: triggered)**
- Engine scored correctly: Urgent + Local + Photos + Clear = 90
- Finding: paywall was blocking too much — score alone not building enough desire before gate

**S5 — Tyre-kicker with convincing language (score: 60, WhatsApp: not triggered)**
- "£8k budget, probably next month" → 60, no alert fired
- Engine correctly penalised `Later` urgency and no photos
- Gap: "probably next month" language not caught as a soft signal — `Clear` flag fires on length alone

**S14 — Planning permission lead, no contact (score: 60, WhatsApp: not triggered)**
- Scored 60 — `Local` + `Clear` only, no urgency flags
- Gap: no "cold outreach needed" flag — tradesman sees no guidance they must find the homeowner themselves from the public record

## 2026-05-05 — Agent Build Session

- Agent left 3 variables undeclared in homepage redesign — always run `vite build` + check browser console after agent sessions
- `fix/main-build` diverged from main by 7+ commits — keep branches short-lived, merge fast

## 2026-05-03 — System Setup

- Fixed `leadEngine/scorer.ts` — `lead.reasons` → `lead.scoreReasons` (type mismatch)
- Restored `server/routes/leadsSearch.ts` — broken template literals

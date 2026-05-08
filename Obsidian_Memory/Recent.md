# Recent Changes

## 2026-05-06

- White screen fixed — 3 chained ReferenceErrors: `LeadProofCard` (renamed but not updated), `products` (used but not declared), `steps` (used but not declared)
- TopNav JSX fixed — misplaced closing tags in mobile menu
- Firebase deploy triggered manually (PR #66 never auto-deployed after merge)
- Lead engine unlocked for testing — removed `toFreePreviewLead` transform, frontend now shows real buyer/deadline/URL/contact signal
- Ran scenarios S3, S5, S14 against live API — see [[Launch Scenarios]] for findings
- Deep competitor research completed — see [[Competitor Research - 2 May 2026]]
- [[Rolling Launch Summary]] updated

## 2026-05-05

- Full site overhaul merged (PR #66): [[TradieStack Project Outline]], Triple Engine, WhatsApp wire-up, Chase/Win engines, waitlist counter, Resend email
- EPC page, For Your Trade page, Legal pages added to site
- Nav restructured, mobile nav fixed
- 8 new API routes added (chase, outcome, review links, summary, notify, waitlist count)
- Obsidian: [[Site Audit - 5th May 2026]], [[Competitor Research - 2 May 2026]], [[TradieStack Project Outline]] added

## 2026-05-03

- System setup: memory structure, build verification, lint fix
- Fixed `leadEngine/scorer.ts` type mismatch

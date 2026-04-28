---
type: agent
status: complete
created: 2026-04-26
updated: 2026-04-28
links:
  - "[[Codex]]"
  - "[[Demo Page]]"
  - "[[Design System]]"
  - "[[Intake Engine]]"
  - "[[Lead Cards]]"
---
# JobFilter Design System v1.0

## Summary
A sidechain agent tasked with producing a complete design system for JobFilter. The existing black/yellow construction aesthetic was identified as cheap and low-trust. The agent produced exact hex codes, typography scales, component rules, layout principles, logo direction, and demo page specifics intended to be handed directly to an engineer.

## Key Decisions
- Primary brand color: Cobalt Blue `#2563EB` (trust-grade, used by Linear/Stripe/Vercel)
- Background: Slate 950 `#0A0F1E`; Surface: Slate 900 `#111827`
- Font: Inter (body/UI), JetBrains Mono (data/postcodes/IDs)
- All-caps banned on hero headlines, buttons, card titles, body copy — allowed only on short badges (HOT, WARM, NEW) and section eyebrows
- Lead card anatomy defined: urgency bar, trade badge, timestamp, job title, location (mono), description, data chips (budget/distance/source), action button
- Demo page must use skeleton loaders, live counter (JS setInterval from ~847 incrementing), pulse dot on hot leads, relative timestamps, non-functional filter bar
- Logo: three-bar vertical filter icon (100%/66%/33% bars, rounded ends), Cobalt Blue — no flag imagery or hardhat silhouettes
- Pill-shaped buttons banned; no uppercase on buttons
- `prefers-reduced-motion` must be respected for all animations
- z-index ladder: base 0, sticky nav 100, dropdown 200, modal overlay 300, modal 400, toast 500

## Concepts Touched
[[Design System]], [[Intake Engine]], [[Codex]], [[Lead Cards]], [[Demo Page]]

## Output
Complete design system: color palette (dark + light mode), typography scale (H1–caption + mono data), component rules (lead cards, feature cards, pricing cards, buttons, inputs, badges, nav bar, stats display), layout principles (12-col grid, spacing tokens, breakpoints, max-widths), logo direction, demo page specifics (card anatomy, Codex panel UI, 6 live visual elements).

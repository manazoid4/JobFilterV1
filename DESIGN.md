# JobFilter design direction

## Direction contract

| Decision | Direction |
|---|---|
| Product mode | Operate for the signed-in product; persuade through concrete evidence on public demos |
| Audience and cadence | UK trade-business owners and office managers, often on a phone between jobs; repeated use must be fast and legible |
| Visual world | **Site-office control board** — direct, high-contrast and evidence-led rather than polished corporate SaaS |
| Palette family | Existing Brutalist-Yellow tokens: paper, black ink and restrained yellow; green only for verified success and orange for action/failure |
| Type treatment | Existing Barlow body, Barlow Condensed operational headings and JetBrains Mono for IDs, times and money evidence |
| Composition | Focused workbench: current event, one next action, then progressively disclosed evidence |
| Shape language | Crisp two-pixel borders, near-square corners and hard shadows already defined by `jf-box` and `jf-button` |
| Anti-references | Generic gradient SaaS dashboards, glass cards, decorative AI motifs, status-chip clutter, fictional live-data claims and dense desktop-only tables |

## V2 product rules

- Preserve existing design tokens and shared components; do not create a second visual system.
- Label simulated, test and live states explicitly. A demo must never imply that a message, payment or phone event occurred.
- Put the current state and one primary action in the first viewport.
- Keep provider diagnostics, raw event payloads and advanced settings out of the default operator view.
- Show evidence for money and delivery claims: timestamps, provider state, quote version and attribution source.
- At 320–430px, workflows become one column without horizontal scrolling or truncated action copy.

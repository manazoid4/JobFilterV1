---
name: JobFilter V3
version: 3.0.0

colors:
  navy:        '#0E1A2B'
  navy-2:      '#142336'
  navy-3:      '#1c3149'
  paper:       '#ffffff'
  offwhite:    '#F5F4EF'
  rule:        '#E6E4DD'
  rule-2:      '#D6D3CA'
  muted:       '#5E6A78'
  muted-2:     '#8A95A2'
  yellow:      '#F8D31A'
  yellow-2:    '#FFDC36'
  red:         '#C84A3C'
  green:       '#2C8A52'

typography:
  display:
    fontFamily: 'Barlow Condensed, sans-serif'
    fontWeight: 800
    fontSize: 'clamp(44px, 7vw, 92px)'
    lineHeight: 0.96
    letterSpacing: '-0.01em'
    textTransform: uppercase
    color: '{colors.navy}'

  section-heading:
    fontFamily: 'Barlow Condensed, sans-serif'
    fontWeight: 700
    fontSize: 'clamp(28px, 3.6vw, 42px)'
    lineHeight: 1.1
    textTransform: uppercase
    color: '{colors.navy}'

  card-heading:
    fontFamily: 'Barlow, sans-serif'
    fontWeight: 600
    fontSize: '18px'
    lineHeight: 1.3
    color: '{colors.navy}'

  label:
    fontFamily: 'Barlow Condensed, sans-serif'
    fontWeight: 700
    fontSize: '12px'
    letterSpacing: '0.14em'
    textTransform: uppercase
    color: '{colors.muted}'

  body:
    fontFamily: 'Barlow, system-ui, sans-serif'
    fontWeight: 400
    fontSize: '16px'
    lineHeight: 1.6
    color: '{colors.navy}'

  lead:
    fontFamily: 'Barlow, system-ui, sans-serif'
    fontWeight: 500
    fontSize: '17px'
    lineHeight: 1.55
    color: '{colors.navy}'

  muted:
    fontFamily: 'Barlow, system-ui, sans-serif'
    fontWeight: 400
    fontSize: '16px'
    lineHeight: 1.6
    color: '{colors.muted}'

  mono:
    fontFamily: 'JetBrains Mono, monospace'
    fontWeight: 400
    fontSize: '13px'

  nav-link:
    fontFamily: 'Barlow, sans-serif'
    fontWeight: 500
    fontSize: '13px'
    letterSpacing: '0.02em'

  plan-price:
    fontFamily: 'Barlow Condensed, sans-serif'
    fontWeight: 800
    fontSize: '52px'
    lineHeight: 1
    letterSpacing: '-0.02em'
    color: '{colors.navy}'

spacing:
  section-padding: '96px 0'
  section-padding-mobile: '64px 0'
  container-max-width: '1180px'
  container-gutter: '20px'
  card-padding: '22px'
  card-padding-large: '36px'
  panel-padding: '36px'
  panel-padding-mobile: '24px'
  grid-gap: '18px'
  grid-gap-small: '10px'
  nav-height: '70px'

radii:
  card: '3px'
  panel: '4px'
  button: '3px'
  field: '3px'
  pill: '100px'
  badge: '2px'
  tag: '2px'
  logo-mark: '3px'

shadows:
  button:
    value: '3px 3px 0 var(--navy)'
    hover: '4px 4px 0 var(--navy)'
  panel:
    value: '8px 8px 0 var(--yellow)'
    value-on-navy: '8px 8px 0 var(--yellow)'
    value-muted: '6px 6px 0 var(--rule-2)'
  card:
    value: 'none'
    hover: '5px 5px 0 var(--yellow)'
  quote:
    value: '6px 6px 0 var(--yellow)'
  trust-grid:
    value: '8px 8px 0 var(--yellow)'
  product-row:
    value: '6px 6px 0 var(--yellow)'
  trade-panel:
    value: '8px 8px 0 var(--yellow)'
  steps:
    value: '8px 8px 0 var(--yellow)'
  plan-featured:
    value: '8px 8px 0 var(--navy)'

borders:
  default: '2px solid var(--navy)'
  rule: '1px solid var(--rule)'
  dashed: '2px dashed var(--navy)'
  button: '2px solid var(--navy)'
  card: '2px solid var(--navy)'
  panel: '2px solid var(--navy)'
  field: '2px solid var(--navy)'
  pill: '1.5px solid var(--navy)'
  badge: '1.5px solid var(--navy)'
  tag: '1.5px solid var(--navy)'
  step: '1.5px solid var(--navy)'
  section-divider-bottom: '2px solid var(--navy)'
  lead-score: '2px solid var(--navy)'

motion:
  button-hover:
    duration: '0.12s'
    effect: 'background-color'
  button-active:
    duration: '0.06s'
    effect: 'transform + box-shadow'
  card-hover:
    duration: '0.1s'
    effect: 'box-shadow + transform'
  link-hover:
    duration: '0.12s'
    effect: 'color'
  toast:
    duration: '0.25s'
    effect: 'opacity + translateY'

breakpoints:
  nav-collapse: '1020px'
  grid-medium: '900px'
  grid-small: '820px'
  grid-single: '800px'
  grid-mobile: '760px'
  grid-tiny: '720px'
  mobile: '700px'
  mobile-small: '600px'
  mobile-hero: '720px'

components:
  top-banner:
    backgroundColor: '{colors.yellow}'
    borderBottom: '{borders.section-divider-bottom}'
    fontFamily: '{typography.body.fontFamily}'
    fontWeight: 500
    fontSize: '13px'
    textAlign: center

  nav:
    position: sticky
    top: 0
    backgroundColor: '{colors.paper}'
    borderBottom: '{borders.section-divider-bottom}'
    height: '{spacing.nav-height}'

  logo:
    fontFamily: '{typography.display.fontFamily}'
    fontWeight: 900
    fontSize: '22px'
    letterSpacing: '0.06em'
    color: '{colors.navy}'

  btn-primary:
    backgroundColor: '{colors.yellow}'
    border: '{borders.button}'
    borderRadius: '{radii.button}'
    padding: '14px 22px'
    fontFamily: '{typography.nav-link.fontFamily}'
    fontSize: '14.5px'
    fontWeight: 700
    boxShadow: '{shadows.button.value}'
    color: '{colors.navy}'

  btn-ghost:
    backgroundColor: '{colors.paper}'
    border: '{borders.button}'
    borderRadius: '{radii.button}'
    padding: '14px 22px'
    fontFamily: '{typography.nav-link.fontFamily}'
    fontSize: '14.5px'
    fontWeight: 700
    boxShadow: '{shadows.button.value}'
    color: '{colors.navy}'

  btn-quiet:
    backgroundColor: transparent
    border: none
    boxShadow: none
    padding: '10px 4px'
    fontFamily: '{typography.nav-link.fontFamily}'
    fontSize: '13.5px'
    fontWeight: 600
    color: '{colors.navy}'

  field-input:
    height: '48px'
    padding: '0 14px'
    backgroundColor: '{colors.paper}'
    border: '{borders.field}'
    borderRadius: '{radii.field}'
    fontFamily: '{typography.body.fontFamily}'
    fontSize: '15px'
    fontWeight: 500
    color: '{colors.navy}'

  lead-card:
    backgroundColor: '{colors.paper}'
    border: '{borders.card}'
    borderRadius: '{radii.panel}'
    padding: '16px 18px'
    gridTemplateColumns: 'auto 1fr auto'

  lead-score:
    width: '48px'
    height: '48px'
    backgroundColor: '{colors.yellow}'
    border: '{borders.lead-score}'
    borderRadius: '{radii.card}'
    fontFamily: '{typography.display.fontFamily}'
    fontWeight: 800
    fontSize: '20px'
    color: '{colors.navy}'

  plan-card:
    backgroundColor: '{colors.paper}'
    border: '{borders.card}'
    borderRadius: '{radii.card}'
    padding: '32px 28px'
    boxShadow: '{shadows.card-muted}'

  plan-featured:
    backgroundColor: '{colors.yellow}'
    border: '{borders.card}'
    borderRadius: '{radii.card}'
    padding: '32px 28px'
    boxShadow: '{shadows.plan-featured}'
    transform: 'translateY(-4px)'

  section-on-navy:
    backgroundColor: '{colors.navy}'
    color: '#E6EBF1'

  hi-chip:
    backgroundColor: '{colors.yellow}'
    color: '{colors.navy}'
    border: '{borders.pill}'
    boxShadow: '4px 4px 0 var(--navy)'
    padding: '0 10px'
    lineHeight: 1
    paddingBlock: '4px'
---

# JobFilter V3 — Design System

## Brand & Style

JobFilter V3 is a brutalist-trade aesthetic. The visual identity borrows from
construction and hardware: DeWalt yellow, safety orange, navy-blue ink on
white paper. It says "tool, not toy."

The design avoids gradients, soft shadows, blurred backdrops, and SaaS
candy. Every surface is flat colour with a hard border. Depth comes from
offset box shadows — like printed material stacked on a workbench. Cards and
panels feel physical. Buttons feel pressable.

Typography runs on two families: **Barlow Condensed** for headlines and
labels (narrow, efficient, reads fast) and **Barlow** for body (clean
sans-serif, no fuss). JetBrains Mono handles numbers, scores, and metadata.
The mix feels technical without feeling cold.

The layout is single-page, section-by-section, mobile-first. Maximum content
width is 1180px with 20px gutters. Every section earns its scroll. Nothing
floats. Nothing fades in.

Tone: confident, northern, built for blokes on the tools. No startup energy.
No venture-backing vibes. No gradients.

## Colors

The system runs on seven functional colours:

- **Navy** (`#0E1A2B`) — primary ink. Used for text, section backgrounds,
  borders, and button fills on light surfaces. Three variants (`navy-2`,
  `navy-3`) lighten for layered navy sections.
- **Yellow** (`#F8D31A`) — the accent. Used for CTAs, featured cards, lead
  score blocks, highlighted text. Never used as body-copy background. The
  hover variant (`yellow-2`) brightens slightly.
- **Paper** (`#ffffff`) — default card and section background. Clean, high
  contrast against navy borders.
- **Off-white** (`#F5F4EF`) — alternate section background. Warmer than
  paper, used to visually separate content blocks without adding border
  noise. Also used for "bad" comparison columns.
- **Muted** (`#5E6A78`) — body text on light surfaces. Medium contrast.
  Secondary variant (`muted-2`, `#8A95A2`) for less-important metadata.
- **Red** (`#C84A3C`) — warning, "bad" indicators, cross marks. Used
  sparingly; never as a background fill for more than a badge.
- **Green** (`#2C8A52`) — success, "good" indicators, check marks.

On navy sections, text inverts: headings go to `#paper`, body to `#E6EBF1`,
muted to `#C5CDD6`. Labels go yellow. Ghost buttons invert to white border
with yellow shadow.

### Color Usage Rules

- Yellow backgrounds are reserved for: hero highlight chips, featured
  pricing cards, lead score blocks, top banner, and active trade tabs.
  Never use yellow as a full-section background below the hero.
- Red and green appear only as badge borders and icon fills in
  comparison sections. They never dominate a viewport.
- Navy backgrounds always pair with yellow accents (labels, buttons, or
  highlight chips). A navy section without yellow content feels dead.
- Off-white sections alternate with paper to create rhythm without
  additional borders. Never stack two off-white sections consecutively.

## Typography

The hierarchy is flat by design — two levels, maybe three:

- **Display** — Barlow Condensed 800, responsive from 44px to 92px.
  Uppercase. Used once per page in the hero. Tight line-height (0.96) so
  multi-line headlines feel stacked, not spaced.
- **Section headings** — Barlow Condensed 700, responsive from 28px to
  42px. Uppercase. Used for `h2` section titles.
- **Card headings** — Barlow 600, 18px, sentence case. Used for `h3` card
  titles.
- **Labels** — Barlow Condensed 700, 12px, uppercase, 0.14em tracking.
  Used for micro-labels above section bodies.
- **Body** — Barlow 400, 16px. Default reading size.
- **Lead** — Barlow 500, 17px. Slightly elevated body for section
  intros and subheadings.
- **Mono** — JetBrains Mono 400, 13px. Metadata, scores, prices, dates,
  code-style data.

### Typography Rules

- Never use more than two font families on one card. Barlow + mono is fine.
  Barlow Condensed + Barlow + mono on one card is noise.
- Headings are always uppercase. Body and lead are always sentence case.
  Never uppercase body text.
- Label tracking is tight (0.14em) but readable. Do not increase label
  tracking for emphasis — use weight instead.
- Mono is reserved for data display (scores, values, dates, counts). Never
  use mono for instructional or marketing copy.

## Layout & Spacing

The page is a vertical stack of full-width sections. Each section wraps
content in a `.wrap` container (max 1180px, 20px gutters). Sections
alternate between `paper` and `offwhite` backgrounds for visual rhythm.

Section padding is 96px top and bottom, collapsing to 64px below 720px.
Inside sections, a `.sec-head` block (max 720px) carries the label, heading,
and lead paragraph. Content grids follow below with 18px gaps.

### Grid Patterns

- **3-column**: Free tools, pricing plans, trust stats. Collapses to 2
  then 1 on smaller breakpoints.
- **2-column split**: Why section (bad vs good), product rows (side label
  vs body), trade panels (pain list vs sample jobs).
- **3-step**: How it works. Equal columns with border dividers. Collapses
  to rows with bottom borders on mobile.
- **Mixed**: News grid (1.4fr featured + 2x 1fr standard cards).

### Spacing Rules

- Every content section must have a `.sec-head` block before any grid or
  list content. The label-heading-lead pattern is non-negotiable.
- Grid gaps are always 18px between cards, 10px for small internal grids.
- Cards have 22px padding standard, 32-36px for featured cards and panels.
- After a grid of cards, do not add a redundant CTA section. The grid
  itself should contain the action.
- Accordion-style expandable content (free tools) replaces the active tool
  inline. Do not open modals or navigate away.

## Borders & Depth

Every interactive surface has a 2px solid navy border. This is the system's
signature. No exceptions.

Depth is achieved through offset box shadows — never through blur, opacity,
or gradient overlays. Shadows follow a consistent angle: right + down. The
shadow colour is always navy (for light surfaces) or yellow (for navy
surfaces).

### Elevation Scale

| Level | Element | Shadow |
|-------|---------|--------|
| 0 | Body text, labels, nav links | None |
| 1 | Buttons | `3px 3px 0 navy` |
| 2 | Cards (hover) | `5px 5px 0 yellow` |
| 3 | Panels, product rows | `6px 6px 0 yellow` |
| 4 | Featured panels, trust grid | `8px 8px 0 yellow` |
| 5 | Featured pricing card | `8px 8px 0 navy` |

### Border Rules

- Default border: `2px solid var(--navy)`. Used on cards, buttons, fields,
  panels, sections.
- Dashed border: `2px dashed var(--navy)`. Used only on the paywall
  "peel here" moment below the locked leads.
- Rule border: `1px solid var(--rule)`. Used for internal dividers inside
  cards and for footer separators.
- No element should appear without a border unless it's body text, a label,
  or a quiet button.
- Never use border-radius above 4px. Cards get 3px. Panels get 4px. Buttons
  and fields get 3px. Pills and hero eyebrow chips get 100px.

## Motion

Motion is fast and functional — never decorative.

- **Buttons** transition background over 0.12s. On hover, they translate
  -1px/-1px and increase their shadow. On active (press), they translate
  2px/2px and collapse their shadow — simulating a physical press.
- **Cards** gain a yellow shadow and translate -2px on hover over 0.1s.
  This is the only hover animation on static cards.
- **Toasts** slide up from the bottom with a 0.25s translateY + opacity
  transition.
- **Arrows** (`→`) in quiet buttons and tool CTAs translate 3px right
  on hover over 0.12s.

### Motion Rules

- No fade-in on scroll. No stagger animations. No page transitions.
- No hover effect that changes more than two properties.
- No animation longer than 0.25s.

## Components

### Top Banner
Full-width yellow strip. Navy text. Shows Founding 30 countdown.
2px navy bottom border. 13px text, dot separators between stats.

### Navigation
Sticky white bar, 70px height, 2px navy bottom border. Logo left (navy
square mark + "JOBFILTER" in Barlow Condensed 900). Nav links are Barlow
500, 13px, with 8px 12px padding and a subtle off-white hover background.
CTA button is yellow with navy border and shadow.

Mobile: burger icon at 1020px breakpoint. Opens a full-width dropdown
with stacked links and a CTA at the bottom.

### Hero
Full-width white section. Eyebrow pill ("Built for UK tradesmen") with
a yellow pulse dot. Display heading with a yellow highlight chip on key
words. Lead paragraph below. Two CTAs: primary yellow button + quiet
text link with arrow. Trust bar below (check marks + short phrases).

### Why Section
Off-white background. Two-column comparison grid. Left column ("bad") has
red-tagged label, red cross icons, off-white background. Right column
("good") has yellow-tagged label, green check icons, white background.
No shadows on the grid itself — the content contrast carries the weight.

### What We Do (Product Stack)
White background. Vertical stack of product rows. Each row has a left
sidebar (step number, product name with yellow pill highlight, role
label) and a body (description paragraph + use-case callout box with
off-white background and yellow left border).

### ROI Calculator
Off-white background. Panel with yellow shadow. Two-column grid: sliders
left, result card right. Result card is navy with yellow label, large
yellow number, and a ghost CTA button with white border + yellow shadow.

### Intake Engine Demo
Off-white background. Panel with yellow shadow. Postcode + trade fields
in a row, plus a scan button. Results render as lead cards with score
square, title, location badges, value, and locked/unlocked status.
Locked cards (beyond 3 free previews) are blurred and faded. Paywall
bar appears below with a dashed border, lock icon, and unlock CTA.

### Free Tools
White background. Grid of tool cards with icon, name, description, and
an "Open →" link. Clicking expands an inline active-tool panel with
input fields and a navy result card showing the calculated output.
Soft CTA at the bottom links to pricing.

### For Your Trade
Off-white background. Row of trade tabs (Plumber, Electrician, etc.).
Active tab gets yellow fill + shadow. Below: two-column panel. Left:
trade-specific pain list with red × bullets and a bold heading. Right:
sample job list with trade name and monospace value.

### News
White background. Mixed grid: one featured card (navy background, spans
2 rows, larger heading) plus standard cards. Cards have category badges,
headlines, descriptions, and mono metadata (read time + date).

### Pricing
Off-white background. Three-column plan grid. Free plan (white, muted shadow).
Founding 30 (yellow, lifted, prominent badge, navy shadow). Pro (white,
standard shadow). Feature lists with green checks / red crosses. CTA
buttons at bottom of each card.

### Trust / Social Proof
White background. Three-column stat grid with large numbers (some
yellow-highlighted) and descriptive text. Below: a centered quote in
Barlow Condensed with yellow shadow, bookended by curly quotes.

### Footer
White background with top navy border. Logo + tagline left, link columns
right. Mono legal text at the bottom with a 1px rule divider.

## States

### Empty State
Not defined in the current design. The intake demo always shows
hardcoded sample data. Needs a genuine empty state for when a scan
returns zero results.

### Loading State
Button text changes to "Scanning..." and the button disables. A 700ms
artificial delay simulates scanning. No spinner, no skeleton, no
progress indicator.

### Locked / Paywalled
Leads beyond the free preview limit (3) are blurred (2.4px), faded
(0.55 opacity), and non-interactive. A dashed paywall bar appears below
the list with a lock icon and unlock CTA.

### Error State
Not defined. No error handling for failed scans, invalid postcodes,
or API downtime.

## Page-Level Rules

1. Every page section must have a `.sec-head` block (label → heading →
   lead) before content. This is the system's universal content header.
2. Section backgrounds alternate `paper` → `offwhite`. Navy sections
   are reserved for the high-impact zones: hero companion panels and the
   ROI result card.
3. The hero never contains more than two CTAs. Primary CTA is always
   yellow-filled. Secondary is always quiet text.
4. The Founding 30 counter in the banner and pricing must stay
   numerically consistent (same `id="founding-count"` source).
5. No section may contain more than one panel with an 8px shadow. Panels
   are focal points — stacking them dilutes impact.
6. Mobile breakpoints collapse multi-column grids to single-column at
   720px–820px. The nav collapses earlier at 1020px.

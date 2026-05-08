# Trade SEO Strategy

Created: 8 May 2026
Status: **LIVE** — All 5 trade pages built and routed

---

## Overview

Trade-specific pillar pages targeting low-competition, high-intent keywords that competitors ignore. Each page is a self-contained conversion funnel: pain → data → solution → CTA.

Built from **Brief 5, Play 3** (Research Briefs — 8th May 2026).

---

## Pages Built

| Trade | URL | Target Keyword | H1 |
|---|---|---|---|
| Plumbers | `/trade/plumbers` | "how to get more work as a plumber" | How Plumbers Find Work Before It Hits MyBuilder |
| Electricians | `/trade/electricians` | "get more electrician work" | How Electricians Find Planning-Approved Jobs Before Anyone Quotes |
| Builders | `/trade/builders` | "how to find jobs as a builder" | How Builders Win Extension Jobs From Planning Data |
| Heat Pump Installers | `/trade/heat-pump-installers` | "EPC leads installers UK" | How Heat Pump Installers Find EPC Retrofit Work Before the Deadline |
| Roofers | `/trade/roofers` | "planning application leads roofers" | How Roofers Find Work From Planning Applications |

---

## Architecture

### Reusable Component
- **File:** `src/components/TradePage.tsx`
- **Pattern:** `TradePageData` interface → props-driven rendering
- **Benefit:** Add new trades by creating a single data file, no template changes needed

### Individual Pages
Each page file contains only a `TradePageData` object and a wrapper component:
- `src/pages/TradePlumbers.tsx`
- `src/pages/TradeElectricians.tsx`
- `src/pages/TradeBuilders.tsx`
- `src/pages/TradeHeatPumps.tsx`
- `src/pages/TradeRoofers.tsx`

### Routes
Added to `src/App.tsx`:
```
/trade/plumbers
/trade/electricians
/trade/builders
/trade/heat-pump-installers
/trade/roofers
```

---

## Each Page Includes

1. **SEO Meta** — `<title>` and `<meta description>` with primary keyword
2. **Hero** — Trade-specific headline, sub, dual CTA buttons, trust signals
3. **Pain Section** — 4 trade-specific pain points (not generic)
4. **Stats Section** — 4 real data points per trade (from vault research)
5. **How It Works** — 3 steps with trade-specific framing
6. **Lead Preview** — Example lead card with trade-relevant data
7. **WhatsApp Preview** — Realistic alert message per trade
8. **Signals Section** — 3 data sources explained for the trade
9. **Old Way vs JobFilter** — Comparison table (trade-specific)
10. **Internal Links** — Links to all other trade pages (SEO cross-linking)
11. **Pricing Section** — 3-tier pricing with trade framing
12. **Final CTA** — Hard close with postcode-specific scan link

---

## Keyword Strategy

### Primary Keywords (per page)
- "how to get more work as a plumber"
- "get more electrician work"
- "how to find jobs as a builder"
- "EPC leads installers UK"
- "planning application leads roofers"

### Secondary Keywords (natural in copy)
- "plumbing leads [city]"
- "construction leads UK"
- "builder leads near me"
- "heat pump leads UK"
- "roofing leads [city]"
- "planning application leads tradesmen"
- "find jobs before Checkatrade"

### Long-tail (in stats and pain sections)
- "how to find building work without Checkatrade"
- "EPC retrofit leads installer"
- "council tender leads tradespeople"

---

## Internal Linking Structure

```
Homepage → /trade/[slug] (via "For Your Trade" page)
City pages → /trade/[slug] (cross-reference in copy)
Trade pages → /trade/[other-slug] (grid of 4 other trades)
Trade pages → /find-jobs (primary CTA)
Trade pages → /pricing (secondary CTA)
Trade pages → /signals (contextual link)
```

Each trade page links to all 4 other trades — creating a dense internal link graph that boosts SEO for all pages simultaneously.

---

## Data Sources Used

All stats and data points come from vault research:
- **Block 3 (5th May)** — EPC data: 165,000 F/G rated rentals, £15bn Warm Homes Plan
- **Block 7 (5th May)** — Planning data: ~3,500 extensions/week, 400+ councils
- **Research for Build Agent (7th May)** — Keyword volumes, competitor analysis
- **Research Briefs (8th May)** — Brief 5 content plays, Brief 7 feature priorities

---

## Design System

All pages use the existing brutalist yellow design:
- `--yellow` (#FACC15) hero backgrounds
- `--navy` (#0F172A) dark sections
- `jf-box` cards with yellow box shadows
- `jf-button` CTA buttons with navy shadows
- `headline` class for Barlow Condensed headings
- `soft-grid` background pattern on heroes
- Mobile-responsive with `section-pad` responsive padding

---

## Next Steps

1. **Add to sitemap.xml** — Include all `/trade/*` routes
2. **Add meta tags** — Open Graph and Twitter Card meta per page
3. **Add to Footer** — Link trade pages in footer navigation
4. **Add to "For Your Trade" page** — Link from `/for-your-trade` to each trade page
5. **Monitor rankings** — Track keyword positions in GSC after 30/60/90 days
6. **Add more trades** — Pattern supports easy addition: Painters, Groundworkers, Landscapers, etc.

---

## SEO Timeline (from Brief 5)

- **Month 1-2:** Pages indexed, no traffic yet
- **Month 3:** First rankings for near-zero competition terms
- **Month 4-5:** Meaningful organic traffic (50-200 visits/week per page)
- **Month 6:** 500-1,000 visits/week total from organic. At 3% free signup and 15% free-to-paid = 1-5 new paying users/week from organic alone

---

## Related

- [[City SEO Strategy]] — Location pages for 6 UK cities
- [[Comparison Pages]] — /vs/checkatrade, /vs/buildalert, /2builduk-alternative
- [[Research Briefs - 8th May 2026]] — Brief 5 (Content/SEO Plays)
- [[Research for Build Agent - 7th May 2026 (A)]] — Keyword data and competitor analysis

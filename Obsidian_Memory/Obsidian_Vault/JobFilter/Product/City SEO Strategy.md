# City SEO Strategy

Created: 8 May 2026
Status: Built — 6 city pages live

---

## Overview

JobFilter uses a hub-and-spoke SEO model for city-specific landing pages, mirroring BuildAlert's proven approach but with three data sources (planning + EPC + council contracts) instead of one.

Each page targets "[city] construction leads" and "[city] builder leads" keywords with unique, city-specific content.

---

## Architecture

### Reusable Component
- **File:** `src/components/CityPage.tsx`
- **Pattern:** Single component takes `CityData` props — all 6 pages use the same template with unique content
- **Cities config:** `CITIES` array in CityPage.tsx contains all city data (stats, copy, postcodes, area codes)

### City Pages
| Page | Route | File | Postcode | Priority |
|------|-------|------|----------|----------|
| Birmingham | `/construction-leads/birmingham` | `src/pages/CityBirmingham.tsx` | B1 | Home city — strongest positioning |
| London | `/construction-leads/london` | `src/pages/CityLondon.tsx` | EC1 | Highest volume |
| Manchester | `/construction-leads/manchester` | `src/pages/CityManchester.tsx` | M1 | BuildAlert ranks here |
| Bristol | `/construction-leads/bristol` | `src/pages/CityBristol.tsx` | BS1 | BuildAlert ranks here |
| Leeds | `/construction-leads/leeds` | `src/pages/CityLeeds.tsx` | LS1 | Major northern trade market |
| Glasgow | `/construction-leads/glasgow` | `src/pages/CityGlasgow.tsx` | G1 | Scotland coverage |

### Routes
All routes added to `src/App.tsx` under `/construction-leads/[city]`

---

## Page Structure (Each City Page)

1. **Hero Section** — Yellow background, city-specific H1, CTA to scan
2. **City Stats** — Planning apps/week, EPC F/G properties, council contracts (3-column grid)
3. **Local Angle** — City-specific framing, Old Way vs JobFilter comparison
4. **How It Works** — 3-step process with city context
5. **Sample Lead Preview** — Three lead types (planning, EPC, council) with city area codes
6. **Coverage Area** — All postcode districts covered (visual tag cloud)
7. **Other Cities** — Internal links to all 5 other city pages (SEO cluster)
8. **Final CTA** — Dark section with scan button and pricing link

---

## SEO Strategy

### Target Keywords Per City
- Primary: "construction leads [city]"
- Secondary: "builder leads [city]", "[city] planning application leads", "[city] council contracts trades"

### Internal Linking
- Every city page links to all 5 other city pages
- Creates a content cluster (hub-and-spoke) that signals topical authority to Google
- Birmingham page should also link from homepage (future enhancement)

### Meta Tags
- Title: "Construction Leads in [City] — Planning, EPC & Council Contracts | JobFilter"
- Description: Dynamic — includes city name, planning app count, and free scan CTA
- Set via `useEffect` in CityPage component

### Differentiation from BuildAlert
BuildAlert ranks for "construction leads [city]" with 300-500 word thin pages. JobFilter pages are:
- 1,000+ words of unique content per city
- Three data sources vs BuildAlert's one (planning only)
- Real stats (planning apps, EPC properties, council contracts)
- Local angle section with city-specific framing
- Sample lead previews showing actual signal types
- Coverage area showing all postcode districts

---

## City-Specific Data

| City | Planning Apps/Wk | EPC F/G Properties | Council Contracts | Area Codes | Trade Density |
|------|-----------------|-------------------|-------------------|------------|---------------|
| Birmingham | 280 | 34,000 | 142 | 98 (B1-B98) | 12,000+ registered builders |
| London | 820 | 120,000 | 387 | 120+ (E/N/SE/SW/W/EC/WC) | 45,000+ active trades |
| Manchester | 310 | 42,000 | 98 | 44 (M1-M90) | £8bn+ active development |
| Bristol | 190 | 22,000 | 67 | 36 (BS1-BS49) | High-value retrofit market |
| Leeds | 220 | 31,000 | 78 | 88 (LS1-LS88) | 8,000+ builders in W. Yorks |
| Glasgow | 170 | 38,000 | 54 | 54 (G1-G84) | Scotland's largest market |

---

## Future Enhancements

### Phase 2 Cities (add after initial 6 rank)
- Liverpool (L postcodes)
- Sheffield (S postcodes)
- Newcastle (NE postcodes)
- Nottingham (NG postcodes)
- Cardiff (CF postcodes)
- Edinburgh (EH postcodes)
- Southampton (SO postcodes)
- Cambridge (CB postcodes)

### Phase 3 — Trade-Specific City Pages
- "Plumbing Leads in [City]"
- "Electrical Leads in [City]"
- "Roofing Leads in [City]"

### Phase 4 — Dynamic Data
- Pull real planning app counts from API
- Show live council contract numbers
- Auto-generate pages for any city with data

### Technical SEO
- Add to sitemap.xml
- Submit to Google Search Console
- Add canonical tags
- Consider schema markup (LocalBusiness, Article)

---

## Competitive Context

BuildAlert (buildalert.uk) proved this model works:
- Ranks for "construction leads [city]" across 12+ cities
- Uses hub-and-spoke SEO: pillar page + city sub-pages
- Thin content (300-500 words per page)
- Planning data only

JobFilter advantage:
- 3x data sources (planning + EPC + council contracts)
- 3x content depth
- WhatsApp delivery vs letter in post
- £29/month unlimited vs £2/letter
- GOLD scoring vs no scoring

---

## Related Docs
- [[Research for Build Agent - 7th May 2026 (A)]] — SEO research and keyword data
- [[Research Briefs - 8th May 2026]] — Brief 5: Content/SEO Plays
- [[Problems and Solutions]] — Product context

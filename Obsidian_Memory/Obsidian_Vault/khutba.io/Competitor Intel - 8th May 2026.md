# Competitor Intel — 8th May 2026

> Compiled from live analysis of competitor websites, pricing pages, and product demos.

## Executive Summary

The mosque live-translation market has **one serious direct competitor** (MinbarLive) and a long tail of indirect players (mosque management software, consumer prayer apps, digital signage tools). The market is early-stage, under-served, and growing. khutba.io's screen-first approach is a genuine differentiator that no competitor currently owns.

**Key finding:** MinbarLive is the only product doing live khutbah translation at scale. They have expanded into a 7-module platform. This is both a threat (they're well-funded and shipping fast) and an opportunity (their complexity creates a gap for a simpler, screen-focused alternative).

---

## 1. MinbarLive — Direct Competitor

**URL:** https://minbarlive.com
**Origin:** Bosnia (Balkan/Europe focus)
**Founded:** ~2024-2025 (early stage, moving fast)
**Team:** Appears to be a small team, possibly solo founder + contractors

### Product
MinbarLive has evolved from a simple live captioning tool into a **7-module mosque platform**:

| Module | What It Does | khutba.io Status |
|---|---|---|
| HutbaLive | Live captions + translation via QR | ✅ Core product |
| Studio Mode | Upload recorded sermons → AI subtitles | ❌ Not built |
| Podcast Companion | Live lectures with real-time transcript | ❌ Not built |
| AI KhutbaAssistant | AI sermon preparation/drafting | ❌ Not built |
| Meetings | Bilingual meetings with live captions | ❌ Not built |
| Quality Dashboard | Review transcript quality | ❌ Not built |
| Archive | Searchable khutbah library | 🟡 Planned Phase 3 |
| Public Pages | Branded mosque info page | ❌ Not built |

### Pricing (Updated May 2026)

| Plan | Price | Minutes | Max Languages | Sessions |
|---|---|---|---|---|
| Free Trial | €0 | 60 min (one-time) | 10 | 1 |
| Standard | €59/mo | 100 min | 10 | 1 |
| Community Live | €99/mo | 200 min | 10 | 2 |
| Media & Education | €179/mo | 400 min | 100+ | 3 |
| Organization Pro | €299/mo | 800 min | 100+ | 5 |

**Add-ons:** Studio mode, Podcast Companion available as paid add-ons on lower tiers

### Strengths
- 135+ languages (massive coverage)
- 7-module platform creates stickiness
- Free trial lowers barrier to entry
- QR code model is intuitive for congregation
- AI KhutbaAssistant is a unique feature (imam-facing tool)
- Public Pages module gives mosques a web presence
- Support center with guides and tickets
- YouTube demo videos
- Multi-language UI (9 languages for the admin interface)

### Weaknesses
- **Phone-only delivery** — no screen/display mode
- **Minute-capped pricing** — masjids worry about running out
- **EUR pricing** — not optimized for UK market
- **Complex for small masjids** — 7 modules is overkill for a masjid that just wants translation
- **No RTL-first design** — Arabic/Urdu display quality unknown
- **No masjid branding** on the free/standard tier
- **No archive on standard tier** — only on higher plans
- **Balkan origin** — less trusted in UK South Asian communities

### Threat Level: 🔴 HIGH
- They are shipping fast and expanding their platform
- Their free trial model is a strong acquisition tool
- If they add screen display mode, they become a direct threat to khutba.io's core differentiator
- Their AI KhutbaAssistant is a feature khutba.io should consider building

### Action Items
- [ ] Monitor MinbarLive monthly for new features
- [ ] Build screen display mode ASAP — this is the moat
- [ ] Consider building AI KhutbaAssistant as a Phase 4 feature
- [ ] Price below their Standard tier (£29 vs €59) to win UK masjids
- [ ] Offer unlimited minutes (not capped) as a key differentiator

---

## 2. Mosque Management Software — Indirect Competitors

These products manage mosque operations (prayer times, donations, events) but do NOT offer live translation. They could add translation as a feature.

### Al-Mosque (al-mosque.com)
- **Type:** Open-source mosque management system
- **Features:** Prayer times, donation tracking, member management
- **Live Translation:** ❌ No
- **Risk:** Low — open-source, slow-moving, not SaaS-focused
- **Note:** Could be a platform that someone builds a translation plugin for

### iMasjid / MasjidBoard (various)
- **Type:** Digital signage for mosques (prayer times, announcements)
- **Features:** Screen displays, prayer time automation, announcement boards
- **Live Translation:** ❌ No
- **Risk:** Medium — they already own the screen in the masjid
- **Note:** If a digital signage company adds live translation, they could bypass khutba.io entirely

### Pillars (pillars.community) — [Site unreachable]
- **Type:** Mosque management and community platform
- **Features:** Unknown (site was unreachable at time of research)
- **Risk:** Unknown — needs follow-up research

### Muslim Pro (Consumer App)
- **Type:** Consumer prayer app (50M+ downloads)
- **Features:** Prayer times, Qibla, Quran, community features
- **Live Translation:** ❌ No
- **B2B Offering:** ❌ No (but they have the audience and capital to build one)
- **Risk:** 🟡 Medium-long term — if they decide to build a B2B mosque product, they have massive distribution
- **Note:** Watch for any "Muslim Pro for Mosques" or B2B announcements

---

## 3. Adjacent Markets — Indirect Threats

### Church Live Captioning Tools
- **Products:** ChurchTranscribe, LiveTranscript, Zoom captions
- **Relevance:** Same technology (STT + translation), different market
- **Risk:** Low — these are built for Christian churches, unlikely to pivot to mosques
- **Note:** The technology is proven and commoditized — khutba.io's advantage is not the tech, it's the mosque-specific UX

### General Live Translation APIs
- **Products:** Google Translate, DeepL, Microsoft Translator
- **Relevance:** These are the building blocks, not competitors
- **Risk:** None — they're suppliers, not competitors
- **Note:** khutba.io already uses Google Translate + Deepgram

### Digital Signage Platforms
- **Products:** ScreenCloud, Yodeck, NoviSign
- **Relevance:** These manage screens in public spaces
- **Risk:** Low-Medium — they could add a "live text" widget
- **Note:** khutba.io should integrate WITH these platforms, not compete against them

---

## 4. Competitive Matrix

| Feature | khutba.io | MinbarLive | Mosque Mgmt Apps | Digital Signage |
|---|---|---|---|---|
| Live STT | ✅ Planned | ✅ Live | ❌ | ❌ |
| Translation | ✅ Planned | ✅ 135+ langs | ❌ | ❌ |
| Screen Display | ✅ Core | ❌ Phone only | ❌ | ✅ But no STT |
| Phone/QR Follow | ✅ Planned | ✅ Core | ❌ | ❌ |
| Archive | 🟡 Phase 3 | ✅ All tiers | ❌ | ❌ |
| Masjid Branding | ✅ Planned | ✅ Higher tiers | ✅ Some | ✅ Core |
| AI Khutba Prep | ❌ | ✅ Unique | ❌ | ❌ |
| UK Pricing | ✅ £29 entry | ❌ €59 entry | Varies | Varies |
| RTL-First Design | ✅ Core | ❓ Unknown | ❌ | ❌ |
| Unlimited Minutes | ✅ Planned | ❌ Capped | N/A | N/A |
| Multi-room | ✅ £99 tier | ✅ €299 tier | ❌ | ✅ |

---

## 5. Market Gaps & Opportunities

### Gap 1: Screen-First Display
**No competitor offers a dedicated screen display mode.** Every live translation tool is phone-first. Masjids already have screens — they want content on them.

**Action:** Make screen display the #1 feature. Auto-scroll, large text, RTL support, masjid branding. This is the moat.

### Gap 2: UK-Specific Pricing & Trust
**MinbarLive is EUR-priced and Balkan-origin.** UK masjids (especially South Asian communities) prefer GBP pricing and local trust.

**Action:** Price in GBP. Launch in Birmingham first. Build case studies with UK masjids. "Built in Birmingham" is a trust signal.

### Gap 3: Unlimited vs Capped Minutes
**MinbarLive caps minutes at every tier.** Masjids do 2 khutbas/week (104/year) plus Ramadan tarawih (30 nights). A 100-min plan runs out fast.

**Action:** Offer unlimited minutes at every tier. The API cost is ~$3.26/mo per masjid — the margin is massive even at £29/mo.

### Gap 4: Simplicity Over Platform
**MinbarLive has 7 modules.** Most masjids need ONE thing: live translation on screen. Complexity is a barrier.

**Action:** 10-minute setup. Account → mic → languages → live. No dashboard overwhelm. This is the "it just works" positioning.

### Gap 5: South Asian Language Focus
**MinbarLive's strength is European languages** (German, Croatian, Albanian, French). UK masjids need Urdu, Bengali, Somali, Arabic, English.

**Action:** Perfect Urdu, Bengali, Somali translation quality. These are the languages UK masjids actually need.

### Gap 6: Ramadan-Ready
**No competitor markets specifically for Ramadan.** Ramadan is when masjids have the highest attendance and the most need for translation.

**Action:** Launch 2-3 months before Ramadan. Create a "Ramadan Ready" package. Offer annual billing discount. This is the seasonal acquisition moment.

---

## 6. Monetization Opportunities

### Immediate (Phase 1-2)
1. **Monthly subscription** — £29/£59/£99 per masjid (confirmed model)
2. **Annual billing discount** — 2 months free if paid annually (improves cash flow)
3. **Setup service** — £99 one-time for remote setup assistance (optional, masjids love hand-holding)

### Near-term (Phase 3-4)
4. **Archive add-on** — £10/mo extra for searchable khutbah archive
5. **Multi-room add-on** — £20/mo extra per additional room/screen
6. **Custom branding** — Included in £99 tier, £15/mo add-on for lower tiers
7. **SMS notifications** — £5/mo for sending khutbah summaries to congregation

### Long-term (Phase 5+)
8. **AI KhutbaAssistant** — £15/mo add-on for imams (draft, outline, research khutbahs)
9. **White-label for Islamic orgs** — £199/mo for organizations managing multiple masjids
10. **Donation integration** — Revenue share with donation platforms (GiveLively, LaunchGood)
11. **Khutbah content marketplace** — Commission on purchased khutbah scripts/translations
12. **API access** — For developers building mosque apps (£49/mo)

---

## 7. Recommended Positioning

**Don't compete with MinbarLive on features. Compete on focus.**

| MinbarLive | khutba.io |
|---|---|
| "The complete mosque platform" | "Live translation on your masjid screen" |
| 7 modules, complex | 1 feature, perfect |
| Phone-first | Screen-first |
| EUR, Europe | GBP, UK-first |
| Capped minutes | Unlimited |
| 135 languages | 5 languages, done right |
| €59/mo entry | £29/mo entry |

**Tagline options:**
- "Every Muslim understands the khutba"
- "Live translation on your masjid screen"
- "The khutba everyone can follow"
- "From minbar to screen, in every language"

---

## 8. Watch List

Monitor these for competitive moves:
- [ ] MinbarLive — new features, pricing changes, geographic expansion
- [ ] Muslim Pro — any B2B or mosque-focused announcements
- [ ] Digital signage companies — any adding live text/STT features
- [ ] Islamic Relief / Muslim Aid — if they start funding mosque tech
- [ ] UK Islamic Forum — if they endorse or recommend any translation tool

---

*Research conducted: 8th May 2026*
*Next review: 8th June 2026*

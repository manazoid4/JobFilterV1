# PostEngine — Product Vision

---

## Core Loop (v1 — 3 features only)

```
1. GENERATE  →  AI writes posts for your business based on your niche + week
2. APPROVE   →  You see drafts, tweak or skip, hit post
3. SCHEDULE  →  Goes to Instagram, LinkedIn, Reddit on autopilot
```

That's the whole product in v1. Nothing else.

---

## Feature Spec (v1)

### 1. Business Profile Setup
- Trade / niche selector (builder, electrician, plumber, etc. — or free text)
- Location (postcode)
- Brand voice: 3 sliders (formal↔casual, short↔detailed, informational↔promotional)
- Connected platforms: Instagram, LinkedIn, Reddit (OAuth)

### 2. Weekly Content Generation
- AI generates 7 posts per week based on:
  - Your niche
  - Current season / what's topical in your trade
  - A content brief (e.g. "this week focus on retrofit work and EPC jobs")
  - Platform-specific format (Instagram caption + hashtags / LinkedIn long-form / Reddit value post)
- Posts shown in a simple calendar queue
- One-click approve / edit / skip

### 3. Auto-Schedule & Post
- Posts sent at optimal time per platform (Metricool-style best-time detection)
- Instagram Business API (requires Business account + Facebook Page)
- LinkedIn API (personal + company page)
- Reddit (via API — subreddit per niche pre-configured)
- Notification when posted

---

## v2 Features (After First Revenue)

- Analytics dashboard (reach, engagement, follower growth per post)
- Content library (save reusable formats — e.g. "pain point posts", "tip carousels")
- Image generation (Canva-style template auto-filled with post copy)
- JobFilter integration (auto-generate posts from new lead signals)
- Multi-brand (charge more for agencies or multi-location businesses)

---

## What Is Deliberately Not in v1

- White-labelling (agency feature — not the market)
- Twitter/X (API costs $100/mo minimum — skip until revenue justifies it)
- TikTok (video creation is a different product)
- Facebook groups (algorithm is dying, skip)
- Competitor comparison tools (not the product)
- Team collaboration (one-person businesses only in v1)

---

## Technical Approach

**Frontend:** React + Vite + TypeScript (same stack as JobFilter — reuse components)
**Backend:** Express + Supabase (same as JobFilter)
**AI:** Claude API (Anthropic) — prompt cached, post generation per user profile
**Scheduling:** Node cron jobs or Supabase Edge Functions for timed posting
**Social APIs:**
  - Instagram Graph API (free, requires Business account)
  - LinkedIn API (free, requires app registration)
  - Reddit API (free tier, rate-limited)

**Estimated build time solo:** 4–6 weeks for v1 MVP

**Estimated infra cost at 0 users:** ~£0/mo (Supabase free + Vercel free + Claude API pay-per-use)

---

## Revenue Gate

Do NOT build v2 until:
- [ ] 10 paying users
- [ ] £390/mo MRR
- [ ] At least 3 users posting consistently for 4+ weeks

---

*Last updated: 2026-05-19*

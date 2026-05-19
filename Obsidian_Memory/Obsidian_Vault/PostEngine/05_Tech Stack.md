# PostEngine — Tech Stack

---

## Reuse From JobFilter

Since JobFilter is already built on this stack, PostEngine can reuse most of it:

| Layer | Tool | Reuse? |
|-------|------|--------|
| Frontend | React + Vite + TypeScript | ✅ Full reuse |
| Styling | Tailwind v4 + CSS vars (same design system) | ✅ Full reuse |
| Backend | Express.js | ✅ Full reuse |
| Database | Supabase (PostgreSQL) | ✅ Same account, new project |
| Auth | Supabase Auth | ✅ Full reuse |
| AI | Claude API (Anthropic) | ✅ Full reuse |
| Hosting | Vercel | ✅ Full reuse |
| Domain | New domain needed | ❌ Buy separately |

**Estimated setup time:** 1–2 days (scaffolding from JobFilter codebase)

---

## New Things To Build

### Social API Integrations
- **Instagram Graph API:** POST /media → /media/publish. Requires Business account + Facebook App. Free. ~2 days to implement.
- **LinkedIn API:** POST /ugcPosts (text) or /assets (images). Requires LinkedIn App. Free. ~1 day.
- **Reddit API:** POST /api/submit. Free tier: 100 requests/min. ~1 day.

### AI Post Generation
- Claude API with prompt caching (already used in JobFilter)
- System prompt per niche: "You are a social media writer for a UK electrical contractor..."
- User input: weekly brief (optional) or auto-generated from niche + season
- Output: 7 posts formatted per platform

### Scheduling Engine
- Supabase Edge Functions or Node cron
- Posts stored in `scheduled_posts` table with `post_at` timestamp
- Worker runs every 5 minutes, checks for due posts, hits social APIs

### OAuth Flows
- Instagram: Facebook OAuth (complex but well-documented)
- LinkedIn: LinkedIn OAuth 2.0 (straightforward)
- Reddit: Reddit OAuth 2.0 (straightforward)

---

## Supabase Schema (v1)

```sql
-- Users/businesses
create table profiles (
  id uuid references auth.users primary key,
  business_name text,
  niche text,           -- 'builder', 'electrician', etc.
  location_postcode text,
  voice_formal int,     -- 1-5 scale
  voice_length int,     -- 1-5 scale
  created_at timestamptz default now()
);

-- Connected social accounts
create table social_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  platform text,        -- 'instagram', 'linkedin', 'reddit'
  access_token text,
  refresh_token text,
  platform_user_id text,
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- Post queue
create table scheduled_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  platform text,
  content text,
  media_urls text[],
  status text default 'pending', -- pending | posted | failed | skipped
  post_at timestamptz,
  posted_at timestamptz,
  error text,
  created_at timestamptz default now()
);
```

---

## Build Order

1. [ ] Auth + profile setup (niche, voice, postcode)
2. [ ] LinkedIn OAuth + test post
3. [ ] Instagram OAuth + test post
4. [ ] Reddit OAuth + test post
5. [ ] Claude API post generation (7 posts from niche profile)
6. [ ] Approval queue UI (approve / edit / skip)
7. [ ] Scheduling engine (cron + Supabase)
8. [ ] Stripe billing (Solo + Pro tiers)
9. [ ] Analytics basic (post count, platform breakdown)
10. [ ] Ship to first 10 users

---

*Last updated: 2026-05-19*

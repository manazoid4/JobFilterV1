# MCP Tools — Installed & Setup

Tools installed globally and configured for Claude Code agents across all projects.

---

## Codegraph ✅ Active

**What it does:** Pre-indexed code knowledge graph. Parses the codebase with tree-sitter, stores symbols/edges in SQLite, exposes to agents via MCP. Agents find functions, trace callers/callees, check impact of changes — without scanning raw files.

**Why it matters:** ~82% fewer tool calls for code exploration. ~94% fewer reads on Explore agents. Saves tokens, saves time.

**Status:** Installed globally (`npm install -g @colbymchenry/codegraph`). Indexed in JobFilter (147 files, 1,467 nodes, 1,283 edges).

**Commands:**
```bash
codegraph index        # Re-index after big changes
codegraph status       # Check index health
codegraph sync         # Incremental sync (runs automatically on file change)
codegraph serve --mcp  # Start MCP server (handled by .mcp.json)
```

**Config:** `.mcp.json` in project root. Permissions in `.claude/settings.json`.

**Re-index when:** Major file restructure, new directories added, after merging large PRs.

---

## Metricool MCP ⚠️ Needs API Token

**What it does:** Schedules posts to Instagram, LinkedIn, TikTok, Threads, YouTube, Facebook, Pinterest, Bluesky directly from Claude. Reads analytics and optimal posting times.

**How to activate:**
1. Go to metricool.com → Profile → Integrations → API
2. Copy your API token
3. Add to `.mcp.json` → `metricool.env.METRICOOL_API_TOKEN`

**What agents can do once set up:**
- "Schedule this week's posts from the media strategy"
- "What's the best time to post on Instagram this week?"
- "Show me which posts got the most reach last month"
- Schedule Instagram + LinkedIn directly from Claude — no copy-paste

**Package:** `@metricool/mcp` (official Metricool MCP)

---

## Google Analytics 4 MCP ⚠️ Needs Credentials

**What it does:** Pulls GA4 data directly into Claude. See signups by source, conversion rates, bounce rates, top pages.

**How to activate:**
1. Google Cloud Console → Create Service Account
2. Grant it "Viewer" access to your GA4 property
3. Download the JSON key file
4. Add property ID and key file path to `.mcp.json`

**What agents can do once set up:**
- "How many signups came from Reddit ads this week?"
- "What's the conversion rate from Instagram traffic?"
- "Which pages have the highest bounce rate?"

**Package:** `@modelcontextprotocol/server-google-analytics` (Google official)

---

## Marketing MCPs Worth Adding Later

| Tool | Package | Cost | Use |
|------|---------|------|-----|
| Google Search Console | `@modelcontextprotocol/server-google-search-console` | Free | Organic rankings, crawl errors, indexing |
| Ahrefs | `@ahrefs/mcp` | Paid ($99+) | Keyword research, backlinks, competitor analysis |
| Meta Ads | `@meta/mcp-server` | Free | Facebook/Instagram ad campaigns from Claude |
| Google Ads | `@google-ads/mcp` | Free | Search campaign management from Claude |
| Reddit Ads | Manual API | Free | Reddit doesn't have official MCP yet — use REST API |

---

## File Locations

```
/home/user/JobFilterV1/.mcp.json           # MCP server config (project-level)
/home/user/JobFilterV1/.claude/settings.json # Permissions (auto-allow MCP tools)
/opt/node22/bin/codegraph                  # Global codegraph binary
/home/user/JobFilterV1/.codegraph/         # SQLite index (auto-generated, gitignored)
```

---

## For New Projects

1. `codegraph init` in project root
2. `codegraph index` to build the graph
3. Copy `.mcp.json` from JobFilter and update paths if needed
4. Restart Claude Code session for MCP to load

---

*Last updated: 2026-05-19*

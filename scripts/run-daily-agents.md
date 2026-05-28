---
title: Daily Agent Run Checklist
type: run-script
frequency: daily
last_updated: 2026-05-24
---

# Daily Agent Run Checklist

Run this every morning. Takes approximately 20-30 minutes total.

---

## 1. Check Website Health

**Action:** Confirm jobfilter.uk is live and returning HTTP 200.

```
curl -o /dev/null -s -w "%{http_code}\n" https://jobfilter.uk
```

Expected result: `200`

If result is anything other than 200:
- Check Vercel dashboard immediately
- Run Web Dev Agent P0 protocol
- Do not proceed with other agent tasks until site is restored

---

## 2. Check for Broken Links

**Action:** Scan the main pages for broken links.

Pages to check manually or with a link checker:
- https://jobfilter.uk (home)
- https://jobfilter.uk/signup
- https://jobfilter.uk/login
- https://jobfilter.uk/dashboard

Flag any 404 or broken internal links in the Web Dev Agent dev log.

---

## 3. Generate 3 Social Posts

**Action:** Run the Social Media Agent.

Steps:
1. Open: `06_Agents/Social_Media_Agent/prompt.md`
2. Check: `06_Agents/Social_Media_Agent/` for yesterday's posts (avoid repeating angles)
3. Run the prompt with Claude or your preferred LLM
4. Save output to: `06_Agents/Social_Media_Agent/posts-YYYY-MM-DD.md`
5. Review posts for quality before scheduling

Platforms: LinkedIn, Instagram, X (Twitter)
Target: 3 posts (one per platform)
Publish time: LinkedIn 9am, Instagram 12pm, X 5pm

---

## 4. Review New Vault Notes

**Action:** Check for any new notes added to the vault in the past 24 hours.

Folders to scan:
- `Changelog` files (new product changes)
- `Sessions/` (new session notes)
- `Research/` (new intel)
- `Marketing/` (new ideas or results)

Flag anything time-sensitive to `Daily Brief.md`.

---

## 5. Generate 2 Repurposed Content Pieces

**Action:** Run the Content Repurposing Agent.

Steps:
1. Open: `06_Agents/Content_Repurposing_Agent/prompt.md`
2. Check previous 14 days in `06_Agents/Content_Repurposing_Agent/` (avoid repeating source notes)
3. Run the prompt
4. Save output to: `06_Agents/Content_Repurposing_Agent/content-YYYY-MM-DD.md`

---

## 6. Log Progress

**Action:** Create daily log entry.

Log file: `07_Logs/daily-run-YYYY-MM-DD.md`

Record:
- Site health status (HTTP code, response time)
- Broken links found (or "none")
- Social posts created (Y/N, platforms covered)
- Content pieces created (Y/N, formats)
- New vault notes reviewed (list titles if any)
- Any issues or blockers
- Time taken

---

## Done

If all 6 steps are complete, the daily run is done. Total time should be under 30 minutes.

If any step failed or produced low-quality output, note it in the log and flag for CEO Agent review on Monday.

---
tags: [AI, claude-code, deepseek, cost-optimization, workflow, tutorial]
source: https://www.youtube.com/watch?v=tn7zXRv3Xmo
author: Jack Roberts
date: 2026-05-01
type: video-note
---

# DeepSeek V4 + Claude Code = 100X Cheaper

## Summary
Use DeepSeek V4 as a drop-in replacement for Claude in Claude Code via a proxy server. Saves ~100x on API costs while keeping the full Claude Code workflow. Dual/triple terminal setup runs Claude, DeepSeek, and free models simultaneously.

---

## DeepSeek V4 Specs
- **1.6 trillion parameters**
- **1M token context window**
- **MIT open weights** — fully compatible with Claude Code ecosystem
- Strong **tool calling** ability (same workflow as Anthropic)
- Data goes to China — treat accordingly

## Cost Comparison
| Model | Approx Cost |
|---|---|
| Claude Opus 4.7 | ~$6,250/session |
| DeepSeek V4 | Significantly cheaper |
| DeepSeek V4 Flash | ~$0.20/4hr session |

> Note: DeepSeek running a promo until May 5, 2026 — extra cheap now, still cheap after

---

## Setup Steps

### 1. Get DeepSeek API Key
- Go to `platform.deepseek.com`
- Create account, deposit $2–5
- Copy API key from left sidebar

### 2. Clone the Proxy Repo
- Find the trending GitHub proxy repo (intercepts Claude API, routes to DeepSeek)
- Clone it into your IDE (Jack uses Anti-Gravity)
- Provide your DeepSeek API key during setup
- Optionally create two shell scripts: one normal, one with `--dangerously-skip-permissions`

### 3. Run DeepSeek Terminal
```bash
ds   # launches DeepSeek via proxy
```

### 4. Run Claude Terminal (parallel)
```bash
claude   # actual Claude Code
```

Now you have both running simultaneously — tag in whichever fits the task.

---

## When to Use What

| Claude | DeepSeek |
|---|---|
| Creative/visual work | Algorithmic/backend work |
| UI/UX design & polish | Unit tests, scripts |
| Multi-file refactors | Heavy lifting tasks |
| Documentation | Code that isn't visual |

> DeepSeek struggles with UI from scratch. Good at extending existing UI frameworks.

---

## Full Pipeline
```
Claude (design) → DeepSeek (heavy lifting) → CodeX/GPT (review)
```
- Claude handles design & creative
- DeepSeek crushes backend/algorithmic work cheaply
- Tag in GPT CodeX (via ChatGPT Plus subscription) for code review

---

## Free Model Option
- Use **OpenRouter** (`openrouter.ai`) with free cycling models
- Gets rate limited frequently — less reliable than DeepSeek directly
- Tell Claude Code to cycle through free models and avoid rate limits

---

## Design Resources Mentioned
- **awesome-designer.md** GitHub repo — design systems scraped from major brands (BMW, Apple, etc.)
- **Component repo** (100k+ stars) — interactive UI components for inspiration
- Trick: use HTML source extractor tools to grab design inspiration from any website

---

## Warnings / Limitations
- **Never paste API keys or sensitive data into DeepSeek chat** — treat as public
- No political questions (Tiananmen etc) — model censors these
- **Corporate/regulated industries**: avoid (healthcare, finance, sensitive IP)
- Not a first-choice design model — lacks creative imagination for UI from zero
- Promo pricing ends May 5, 2026

---

## Best For
- Solo devs burning Claude credits
- Learning Claude Code workflows
- Open source / prototyping
- Reducing costs on non-visual heavy lifting

---

## Tools & Links
- `platform.deepseek.com` — DeepSeek API
- `openrouter.ai` — alternative with free models (rate limited)
- `glaido.com` — voice typing tool Jack uses
- Anti-Gravity — IDE Jack uses

---

## Related
- [[AI Knowledge Index]]
- [[Claude Code Workflows]]
- [[AI Cost Optimization]]
- [[Multi-Model Pipelines]]

# AI Free Router SaaS Build Prompt

Updated: 2026-06-24  
Repo: `manazoid4/JobFilterV1`  
Purpose: turn the free-model gateway idea into a SaaS or add-on product build prompt.

---

## 1) Product Thesis

There are already AI gateways and routers: OpenRouter, LiteLLM, Portkey, Vercel AI Gateway, Cloudflare AI Gateway, Helicone, and multiple open-source proxies.

The opportunity is not to build a generic gateway.

The opportunity is to build a **free-first agent gateway** for builders using tools like Hermes, OpenCode, Codex, Cline, Cursor, Continue, Aider, Claude Code-style workflows, local Ollama, OpenRouter, Gemini free tier, and cheap fallback APIs.

Core pain:

> Agents make too many calls, free models break, paid models get expensive, and beginners do not know which model actually answered or why their tool failed.

Core product:

> One endpoint that forces a chosen free model when possible, protects the user from rate-limit loops and surprise spend, then produces clear route receipts for every request.

Working product names:

- FreeAgentRouter
- ScoutRouter
- QwenLock
- AgentBudgetGuard
- FreeModelOps
- ModelScout

Best name for now:

> **ScoutRouter** — a free-first AI gateway for agent tools.

---

## 2) Existing Market

### Managed / infra products

- OpenRouter: many models, routing, free models, fallbacks, provider routing.
- Portkey: AI gateway, virtual keys, budget limits, fallbacks, conditional routing, caching, guardrails, logs.
- Vercel AI Gateway: unified access, budgets, usage monitoring, load-balancing, fallbacks, SDK-native developer experience.
- Cloudflare AI Gateway: observability, logs, analytics, caching, rate limiting, retries and model fallback.
- Helicone: observability, gateway, prompt caching, cost tracking.
- LiteLLM: self-hosted proxy/router with model aliases and OpenAI-compatible endpoint.

### Open-source / hacker products

- FreeRouter / ClawRouter-style routers: self-hosted model routing.
- OmniRoute: one endpoint, many providers, free/low-cost AI model routing.
- NadirClaw: routes simple prompts to cheap/local models and complex ones to premium models.
- RelayPlane: local cost intelligence proxy with routing, dashboard and provider health.
- CORVYN: local proxy that routes to free models and shows cost in local currency.
- AI Worker Proxy: Cloudflare Worker model failover/key rotation proxy.
- 9router/localrouter/ai-wanderer-style tools: route across free tiers before falling back to paid/local.

---

## 3) Differentiation

Do not compete head-on with OpenRouter, Portkey, Vercel or Cloudflare.

Build for this narrow buyer:

> Solo builders and indie hackers running coding agents who want to squeeze free/cheap models safely without breaking their setup.

Differentiators:

1. **Agent-tool first**
   - Prebuilt configs for Hermes, OpenCode, Cline, Continue, Aider, Cursor, Codex-style tools.

2. **Free-first policy engine**
   - Try free/cheap models first.
   - Hard stop before paid spend unless user explicitly enables fallback.
   - Warn when tool calls or context size will likely break a free model.

3. **Model lock**
   - Force Qwen/Qwen Coder or a chosen free model.
   - Disable random router behaviour unless the user wants it.
   - Show exactly which upstream model/provider answered.

4. **Rate-limit aware agent mode**
   - Throttle loops.
   - Queue requests.
   - Disable parallel tool calls.
   - Cap max tool calls and max iterations.
   - Retry sanely, not infinitely.

5. **Route receipts**
   - Every answer shows:
     - requested model
     - actual model
     - provider
     - fallback used or not
     - cost estimate
     - tokens
     - rate-limit state
     - cache hit/miss
     - policy decision

6. **Free model health board**
   - Test Qwen, GPT-OSS, Cohere, Gemini, DeepSeek, Ollama and OpenRouter/free.
   - Show uptime, 429 rate, tool-call compatibility, latency and usable context.

7. **Beginner-first setup**
   - Copy-paste Windows PowerShell setup.
   - Copy-paste Ubuntu setup.
   - Copy-paste Hermes config.
   - Copy-paste OpenCode config.

---

## 4) MVP Product

### MVP user story

A user opens ScoutRouter, adds an OpenRouter key, chooses "Qwen free coder locked", copies a local or cloud base URL into Hermes/OpenCode, and the agent now uses Qwen/free models with guardrails.

### MVP features

#### A) OpenAI-compatible proxy

- `/v1/chat/completions`
- `/v1/models`
- optional `/v1/responses` later
- OpenAI SDK compatible

#### B) Model aliases

- `scout/qwen-free-coder`
- `scout/free-general`
- `scout/free-router`
- `scout/local-ollama`
- `scout/safe-paid-fallback`

#### C) Routing policies

- `lock`: always force one model.
- `free-first`: try free models before paid.
- `cheap-first`: choose lowest acceptable cost.
- `agent-safe`: low tool calls, low output, no parallel calls.
- `paid-only-if-approved`: require user toggle before paid fallback.

#### D) Rate-limit protection

- Per-user request budget.
- Per-provider request budget.
- Per-model cooldown after 429.
- Queue requests instead of hammering free endpoints.
- Reject runaway agent loops with helpful error.

#### E) Route receipts

Every response should include metadata headers and dashboard log:

- `x-scout-requested-model`
- `x-scout-actual-model`
- `x-scout-provider`
- `x-scout-fallback-used`
- `x-scout-policy`
- `x-scout-estimated-cost`
- `x-scout-input-tokens`
- `x-scout-output-tokens`

#### F) Dashboard

Pages:

- Setup wizard
- Keys/providers
- Model aliases
- Routing policies
- Request logs
- Free model health
- Spend guard
- Tool configs

#### G) Tool config generator

Generate config for:

- Hermes
- OpenCode
- Cline
- Continue
- Aider
- Cursor custom provider
- OpenAI SDK
- raw curl

---

## 5) Monetisation

### Free self-hosted

- local proxy
- basic dashboard
- local logs
- OpenRouter/Ollama/Gemini setup

### Hosted Starter — £5-£9/month

- hosted endpoint
- 7-day logs
- model health checks
- config generator
- basic route receipts

### Builder Pro — £15-£29/month

- multiple projects
- longer logs
- custom policies
- webhook alerts
- team key vault
- spend limits
- prompt cache
- agent session replay

### Team — £49-£99/month

- team members
- RBAC
- shared keys
- policy approvals
- audit exports
- white-labelled gateway URLs

---

## 6) Safer Positioning

Do not promise unlimited free AI.

Say:

> ScoutRouter helps you use free and cheap models more safely, with routing, limits, receipts and fallback controls.

Avoid:

- "unlimited Claude free"
- "bypass rate limits"
- "never pay again"
- "avoid provider restrictions"

Use:

- free-first
- budget-safe
- model-lock
- agent-safe
- route receipts
- provider-aware

---

# 7) Singular Copy-Paste Build Prompt

```text
You are a senior full-stack engineer, AI infrastructure architect, product strategist and SaaS founder.

Build an MVP SaaS called ScoutRouter.

ScoutRouter is a free-first AI gateway for agent tools. It gives users one OpenAI-compatible endpoint that can force Qwen/free models, protect against rate-limit loops, prevent surprise spend, and show exactly which model answered each request.

This should be a standalone SaaS, but structure it so it can also be added later to my existing GitHub projects as an AI infrastructure module.

Core buyer:
Solo builders, indie hackers and power users running Hermes, OpenCode, Cline, Continue, Aider, Cursor, Codex-style workflows, local Ollama and OpenRouter free models.

Core pain:
Agents make too many calls, free models fail, paid models get expensive, and beginners cannot tell which model answered or why their tool broke.

Core promise:
One endpoint. Free-first routing. Model lock. No surprise spend. Clear route receipts.

Do not build a generic OpenRouter clone.
Do not build a bloated enterprise gateway.
Do not promise unlimited free AI.
Build the smallest useful version that a beginner can actually use with Hermes/OpenCode in one evening.

Recommended stack:
- Next.js App Router
- TypeScript
- Tailwind
- Supabase for auth/db
- Vercel deploy
- OpenAI-compatible proxy route in Next.js API route or lightweight Node server
- Optional later: Cloudflare Worker edge proxy
- Stripe only as a later stub unless easy

MVP features:

1. OpenAI-compatible proxy
   Build endpoints:
   - POST /api/v1/chat/completions
   - GET /api/v1/models
   These should accept OpenAI-style requests and forward them to OpenRouter or other configured providers.

2. Model aliases
   Implement alias mapping:
   - scout/qwen-free-coder -> qwen/qwen3-coder:free on OpenRouter
   - scout/free-general -> openai/gpt-oss-120b:free on OpenRouter
   - scout/free-fast -> cohere/north-mini-code:free on OpenRouter
   - scout/free-router -> openrouter/free
   - scout/local-ollama -> local Ollama endpoint placeholder

3. Routing policies
   Implement these policy modes:
   - lock: force the selected model alias only
   - free-first: try free models in priority order before any paid model
   - cheap-first: placeholder for later cost-based routing
   - agent-safe: disable/strip risky params such as parallel tool calls, cap max_tokens, and cap tool-heavy loops where possible
   - paid-only-if-approved: never call paid fallback unless user has enabled it

4. Free-first fallback order
   Default order:
   - scout/qwen-free-coder
   - scout/free-general
   - scout/free-fast
   - scout/free-router
   No paid fallback by default.

5. Rate-limit protection
   Add simple database-backed or in-memory limits:
   - per user requests per minute
   - per user requests per day
   - per model cooldown after 429
   - prevent rapid repeated retries to a failing free model
   If a limit is hit, return a helpful JSON error explaining what happened and which model was blocked.

6. Route receipts
   Every proxied response must log and return metadata:
   - requested model
   - resolved model alias
   - actual upstream model
   - provider
   - fallback used true/false
   - policy mode
   - input token estimate
   - output token estimate if available
   - estimated cost if available, otherwise 0/unknown
   - cache hit false for now
   - error chain if fallback occurred

   Include these as response headers where possible:
   - x-scout-requested-model
   - x-scout-actual-model
   - x-scout-provider
   - x-scout-fallback-used
   - x-scout-policy

7. Dashboard pages
   Build a simple dashboard:
   - /dashboard/setup
   - /dashboard/keys
   - /dashboard/models
   - /dashboard/policies
   - /dashboard/logs
   - /dashboard/health
   - /dashboard/tool-configs

8. Setup wizard
   User flow:
   - Create account or local dev mode
   - Add OpenRouter API key
   - Choose model mode: Qwen locked, free-first, or local-first
   - Copy base URL
   - Copy API key
   - Copy model name
   - Test request

9. Tool config generator
   Generate copy-paste configs for:
   - Hermes
   - OpenCode
   - Cline
   - Continue
   - Aider
   - raw curl
   - OpenAI TypeScript SDK

   Hermes output should look like:
   Base URL: https://YOUR_DOMAIN/api/v1
   API key: scout_xxx
   Model: scout/qwen-free-coder

10. Free model health board
   Create a basic model health checker:
   - model alias
   - upstream model
   - last tested
   - status: healthy, rate-limited, failed, unknown
   - latency ms
   - last error
   Add a button to test all free models with a tiny prompt.

11. Agent-safe transform
   Before forwarding requests:
   - set max_tokens to max 2048 by default if missing or too high
   - set temperature default 0.2
   - set parallel_tool_calls false if present
   - optionally strip unsupported params when provider rejects them
   - keep original request logged for debugging but redact secrets

12. Secrets/security
   - Store provider keys encrypted or at minimum clearly separated server-side only.
   - Never expose OpenRouter keys to client.
   - Redact Authorization headers from logs.
   - Add a clear warning: do not send private secrets to free models that may train on inputs.

13. Landing page
   Build landing page copy around:
   Headline: Free-first AI routing for coding agents.
   Subheadline: Force Qwen/free models, stop runaway loops, and see which model answered every request.
   Sections:
   - Problem: free models break, agents burn calls, paid APIs surprise you
   - Solution: one endpoint with model lock, free-first fallback and route receipts
   - Works with: Hermes, OpenCode, Cline, Continue, Aider, Cursor, Ollama, OpenRouter
   - Pricing: Free self-hosted, Hosted Starter, Builder Pro
   - CTA: Generate my Hermes config

14. Pricing page
   Create simple pricing cards:
   - Self-hosted Free: local proxy, basic logs, OpenRouter/Ollama setup
   - Hosted Starter £9/mo: hosted endpoint, 7-day logs, model health checks, config generator
   - Builder Pro £19/mo: multiple projects, longer logs, custom policies, alerts, session replay placeholder

15. Do not overbuild
   For MVP, skip:
   - complex semantic routing
   - enterprise RBAC
   - full prompt caching
   - multi-region infra
   - billing enforcement unless simple
   - huge observability charts

16. Tests
   Add simple tests or scripts for:
   - alias resolution
   - lock policy
   - free-first fallback
   - no-paid-fallback by default
   - route receipt generation
   - provider error handling

17. Developer experience
   Include:
   - README.md
   - .env.example
   - local dev instructions
   - deployment instructions for Vercel
   - seed aliases
   - test curl commands

18. Example curl test
   Include this in README:
   curl -X POST http://localhost:3000/api/v1/chat/completions \
     -H "Authorization: Bearer scout_dev_key" \
     -H "Content-Type: application/json" \
     -d '{
       "model": "scout/qwen-free-coder",
       "messages": [{"role":"user","content":"Say hello and tell me which model you are."}],
       "max_tokens": 200
     }'

19. Output after build
   When finished, provide:
   - changed files list
   - how to run locally
   - how to configure Hermes
   - how to configure OpenCode
   - what works now
   - what is stubbed
   - risks
   - next 5 commits

Quality bar:
The product should feel like a practical builder tool, not a toy demo. It must solve the first use case: I can point Hermes/OpenCode at ScoutRouter, choose scout/qwen-free-coder, and see requests being routed/logged with no surprise paid fallback.
```

---

## 8) First 5 Commits

### Commit 1 — Proxy skeleton

- Next.js app
- `/api/v1/chat/completions`
- `/api/v1/models`
- alias resolver
- OpenRouter forwarding

### Commit 2 — Policies and receipts

- lock policy
- free-first fallback
- no-paid default
- route receipt headers/logs

### Commit 3 — Dashboard MVP

- setup
- keys
- models
- logs
- tool configs

### Commit 4 — Agent-safe mode

- max token caps
- disable parallel tools
- retry/cooldown logic
- friendly errors

### Commit 5 — Landing and pricing

- homepage
- pricing cards
- Hermes/OpenCode CTA
- README deployment guide

---

## 9) Why This Can Win

The market already proves demand.

But most tools are either:

- too infra-heavy,
- too enterprise,
- too generic,
- too focused on paid model cost optimisation,
- or too rough for beginners.

ScoutRouter wins by being the easiest path for a solo builder to say:

> I want Hermes/OpenCode to use Qwen/free models safely, show me what happened, and stop before it spends money.

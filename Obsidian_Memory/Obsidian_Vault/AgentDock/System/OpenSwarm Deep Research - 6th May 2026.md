# OpenSwarm Deep Research - 6th May 2026

> Comprehensive competitive analysis of all GitHub repositories and organizations using the "OpenSwarm" name, evaluated for relevance to AgentDock.

---

## 1. Executive Summary

"OpenSwarm" is not a single project but a collision of **seven distinct projects** sharing the same name across GitHub. The most relevant to AgentDock are **openswarm-ai/openswarm** (412 stars, visual mission control for AI coding agents) and **unohee/OpenSwarm** (637 stars, autonomous dev team orchestrator with Discord/Linear integration). These two represent the closest competitive threats: both are multi-agent orchestration platforms targeting software development workflows. openswarm-ai/openswarm differentiates with a polished spatial dashboard UI, Electron desktop app, and deep claude-agent-sdk integration. unohee/OpenSwarm differentiates with autonomous Linear-to-Discord pipelines, cognitive memory via LanceDB, and a code registry with static analysis. The remaining five projects are either unrelated (robotics OS), experimental (latent vector coordination), early-stage (Chinese multi-agent framework), or academic (EU Horizon robotics grant). **Key takeaway for AgentDock**: The market is fragmenting around "swarm" terminology, but no single project has achieved dominance. The biggest gap across all projects is **cross-platform support** (openswarm-ai is macOS-only in releases), **multi-LLM provider flexibility** (most are Anthropic-locked), and **team collaboration features** (all are single-user). AgentDock can win by being cloud-native, multi-provider, team-ready, and cross-platform from day one.

---

## 2. Competitor Breakdown

### 2.1 openswarm-ai/openswarm (412 stars, JavaScript/TypeScript/Python)

**URL**: https://github.com/openswarm-ai/openswarm
**Tagline**: "Your mission control center for a swarm of AI agents"
**License**: MIT
**Latest Release**: v1.0.28 (May 4, 2026)
**Commits**: 109
**Contributors**: ciregenz (lead), Rtas-17, arnav-naval, many221, jasonkneen, Haik, BeeSting50

#### What It Does
A locally-running Electron desktop app that lets you launch, monitor, and coordinate multiple Claude Code agents in parallel from a single visual spatial dashboard. Think of it as a mission control center where each agent is a card on an infinite canvas.

#### Architecture
```
Electron Shell (desktop wrapper, auto-updater)
├── Frontend (React/TypeScript :3000)
│   ├── Spatial Dashboard Canvas (drag-and-drop agent/view/browser cards)
│   ├── Agent Chat (WebSocket streaming)
│   ├── Templates / Skills / Tools / Modes / Views pages
│   ├── Redux Toolkit (state management)
│   └── Material UI v7, CodeMirror 6, Framer Motion
├── Backend (FastAPI :8324)
│   ├── REST API (/api/*) + WebSocket (/ws/*)
│   ├── Agent Manager (claude-agent-sdk subprocess)
│   ├── MCP Tool Discovery & Registry Proxy
│   ├── JSON File Storage (no database)
│   └── 9router submodule (AI model router with 40+ providers)
└── Data: JSON files in backend/data/
```

#### Core Components
- **agent_loop.py** — Agent lifecycle, WebSocket streaming, worktree management
- **agent_manager.py** — Spawns and manages Claude Code CLI subprocesses
- **ws_manager.py** — WebSocket connection management for real-time streaming
- **mcp_client.py** — MCP tool server client (stdio, HTTP, SSE)
- **browser_agent.py** — Autonomous browser automation agent
- **llm_router.py** (PR #12) — Centralized LLM router with API/CLI dual-path
- **schedules** (PR #11) — Cron/interval/one-shot scheduling system
- **9router/** — Embedded AI model router supporting 40+ providers, 100+ models, 3-tier fallback (subscription → cheap → free)

#### Features (Complete List)
1. **Spatial Dashboard** — Infinite canvas with drag-and-drop agent cards, view cards, embedded browser cards. Multiple dashboards for different workspaces.
2. **Agent Chat** — Full streaming chat via WebSockets, real-time token output, cost tracking per session, persistent history.
3. **Human-in-the-Loop Approvals** — Per-tool permission config (always allow/ask/deny), individual approve/deny, batch approve from dashboard.
4. **Message Branching** — Edit any prior message to fork conversations, navigate between branches.
5. **Prompt Templates** — Reusable templates with structured input fields, `/` slash command invocation.
6. **Skills Library** — Sync to `~/.claude/skills/`, browse Anthropic skills marketplace.
7. **Tools Library** — MCP tool server config (stdio/HTTP/SSE), automatic discovery, MCP registry browser, Google's catalog with GitHub star counts.
8. **Agent Modes** — Five built-in modes (Agent, Ask, Plan, View Builder, Skill Builder) plus custom user-defined modes.
9. **Views & Outputs** — Interactive HTML/JS/CSS artifacts in iframes, vibe coding, backend Python execution, auto-run with LLM-generated data.
10. **Git Worktree Isolation** — Each agent in its own worktree/branch.
11. **Diff Viewer** — Inspect uncommitted changes without leaving the app.
12. **Cost Tracking** — Real-time USD spend per agent session.
13. **Dark & Light Themes** — Full theme support with design tokens.
14. **Keyboard Shortcuts** — Navigate, approve/deny, switch pages.
15. **Google Workspace OAuth** — Gmail, Calendar, Drive, Contacts integration.
16. **Browser Agent** — Autonomous web browsing sub-agent.
17. **Agent Scheduling** (PR #11) — Cron expressions, fixed intervals, one-shot timers.
18. **LLM Router** (PR #12) — API/CLI dual-path routing, browser tools MCP server.
19. **`.swarm` File Format** (PR #16) — Portable dashboard export/import as ZIP bundles with secret stripping.
20. **Cross-Platform Dev** (PR #10) — Windows/Linux support via Node.js orchestrators.
21. **9router Integration** — 40+ AI providers, 100+ models, 3-tier smart fallback, quota tracking, multi-account support, format translation (OpenAI ↔ Claude ↔ Gemini).

#### Agent Model
- **Definition**: Each agent is a Claude Code CLI subprocess spawned via `claude-agent-sdk`
- **Types**: Agent, Ask, Plan, View Builder, Skill Builder (custom modes with configurable system prompts)
- **Communication**: WebSocket streaming between backend and frontend; agents don't communicate with each other directly — they're independently spawned processes
- **Isolation**: Git worktrees prevent file conflicts between parallel agents

#### Orchestration Pattern
- **Hub-and-spoke**: The backend is the central orchestrator that spawns independent Claude Code subprocesses
- **No inter-agent communication**: Agents work in isolation; coordination is through the human user managing the dashboard
- **Approval gateway**: All tool-use requests surface to the human for approval/denial

#### UI/UX
- **Desktop app**: Electron wrapper with auto-updater via GitHub Releases
- **Visual dashboard**: Spatial canvas with pan/zoom, draggable cards
- **Chat interface**: Full streaming with token-by-token display
- **Settings page**: In-app API key configuration (no env vars needed)
- **macOS only for releases**: Windows/Linux builds "planned but not yet available" (though PR #10 adds cross-platform dev support and v1.0.28 includes `OpenSwarm-Setup-x64.exe`)

#### Integrations
- **Claude Code CLI** (primary agent runtime via claude-agent-sdk)
- **MCP servers** (stdio, HTTP, SSE)
- **Google Workspace** (OAuth: Gmail, Calendar, Drive, Contacts)
- **Anthropic Skills Marketplace**
- **MCP Registry** + Google's tool catalog
- **9router**: 40+ AI providers (OpenAI, Anthropic, Google, GLM, MiniMax, Qwen, etc.)
- **Git** (worktrees for isolation)

#### Pricing/Business Model
- **Free and open source** (MIT license)
- **No commercial entity identified** — appears to be community-driven
- **Website**: openswarm.com (minimal landing page)
- **No SaaS, no paid tiers**

#### Strengths
- Polished visual UI with spatial canvas — best-in-class dashboard experience
- Electron desktop app with auto-updater — professional distribution
- Deep claude-agent-sdk integration — native Claude Code experience
- Human-in-the-loop approval workflow — practical safety mechanism
- Message branching for conversation forking — powerful debugging tool
- 9router integration gives multi-provider flexibility (40+ providers)
- Active development: 29 releases, rapid iteration (v1.0.12 → v1.0.28 in ~6 weeks)
- `.swarm` portable dashboard format — shareable configurations
- Git worktree isolation — practical parallel work solution
- Google Workspace OAuth integration

#### Weaknesses
- **Anthropic-locked for agent runtime**: Only works with Claude Code CLI (claude-agent-sdk)
- **JSON file storage**: No proper database — won't scale, no concurrent access
- **No inter-agent communication**: Agents are isolated; no swarm intelligence
- **macOS-first**: Windows support is new and untested in releases
- **No team features**: Single-user only, no collaboration
- **No cloud/hosted option**: Must run locally
- **No testing infrastructure**: No visible test suite
- **Only 2 open issues**: Could mean low community engagement or good quality
- **12 open PRs**: Many large feature PRs sitting unmerged (scheduling, LLM router, cross-platform, etc.)
- **Bundled 9router**: The 9router submodule is a separate project (decolua/9router) embedded as a git submodule — unclear licensing relationship

#### Relevance to AgentDock
This is the **most direct competitor** to AgentDock's vision. It proves the market wants a visual mission control for AI agents. AgentDock must match or exceed its spatial dashboard, HITL approvals, and multi-agent parallel execution while avoiding its weaknesses (Anthropic lock-in, JSON storage, no team features, no cloud option).

---

### 2.2 unohee/OpenSwarm (637 stars, TypeScript)

**URL**: https://github.com/unohee/OpenSwarm
**Tagline**: "Autonomous AI dev team orchestrator powered by Claude Code CLI. Discord control, Linear integration, cognitive memory."
**License**: GPL-3.0
**Latest Release**: v0.4.2 (Apr 25, 2026)
**Commits**: 150
**Published as**: `@intrect/openswarm` on npm

#### What It Does
An autonomous AI dev team orchestrator that connects to Linear for issue tracking, runs Worker/Reviewer pair pipelines, reports to Discord, and retains long-term memory via LanceDB vector store. It's designed to run as a daemon that autonomously processes Linear issues into code.

#### Architecture
```
Linear API → AutonomousRunner (heartbeat) → DecisionEngine → TaskScheduler
                                                        ↓
                                              PairPipeline
                                              Worker → Reviewer → Tester → Documenter
                                              ↓
                                    Adapters: Claude | Codex | GPT | Local (Ollama/LMS/llama.cpp)
                                    ↓
                    Discord Bot | Memory (LanceDB + Xenova E5) | Knowledge Graph | Code Registry (SQLite + FTS5)
```

#### Core Components
- **adapters/** — CLI provider adapters (claude, codex, gpt, local) with process registry
- **agents/** — Worker, reviewer, tester, documenter, auditor roles; pairPipeline.ts; agentBus.ts
- **orchestration/** — Decision engine, task parser, scheduler, workflow mapper
- **automation/** — Autonomous runner, cron scheduler, PR processor
- **memory/** — LanceDB vector store + Xenova multilingual-e5-base embeddings
- **knowledge/** — Code knowledge graph (scanner, analyzer, graph)
- **registry/** — Code entity registry (SQLite + FTS5), BS Detector
- **discord/** — Bot core, command handlers, pair session UI
- **linear/** — Linear SDK wrapper, project updater
- **issues/** — Local issue tracker (SQLite + GraphQL + Kanban UI)

#### Features (Complete List)
1. **Multi-Provider Adapters** — Claude Code, OpenAI GPT/Codex, local models (Ollama, LMStudio, llama.cpp) with runtime switching
2. **Code Registry** — SQLite-backed entity tracking across 8 languages (TS, Python, Go, Rust, Java, C, C++, C#), complexity scoring, test mapping, risk assessment
3. **BS Detector** — Static analysis for bad code patterns (empty catch, hardcoded secrets, `as any`, etc.) with pipeline guard integration
4. **Autonomous Pipeline** — Cron-driven heartbeat fetches Linear issues, runs Worker/Reviewer pairs, updates issue state
5. **Worker/Reviewer Pairs** — Multi-iteration code generation with automated review, testing, documentation
6. **Decision Engine** — Scope validation, rate limiting, priority-based task selection, workflow mapping
7. **Cognitive Memory** — LanceDB vector store with embeddings, hybrid retrieval (similarity + importance + recency + frequency), memory types (belief, strategy, user_model, system_pattern, constraint)
8. **Knowledge Graph** — Static code analysis, dependency mapping, impact analysis, file-level conflict detection
9. **Discord Control** — Full command interface for monitoring, task dispatch, scheduling, provider switching
10. **Rich TUI Chat** — Claude Code-inspired terminal interface with tabs, streaming, loading messages
11. **Dynamic Scheduling** — Cron-based job scheduler with Discord management
12. **PR Auto-Improvement** — Monitors open PRs, auto-fixes CI failures, resolves merge conflicts
13. **Long-Running Monitors** — Track external processes and report completion
14. **Web Dashboard** — Real-time pipeline stages, cost tracking, worktree status, live logs (port 3847)
15. **Pace Control** — 5-hour rolling window task caps, per-project limits, turbo mode, exponential backoff
16. **i18n** — English and Korean locale support
17. **Local Issue Tracker** — SQLite + GraphQL + Kanban web UI
18. **CLI Commands** — `openswarm check --scan`, `openswarm check --bs`, `openswarm annotate`, `openswarm exec --pipeline`

#### Agent Model
- **Definition**: Agents are roles (Worker, Reviewer, Tester, Documenter, Auditor) with configurable models and timeouts
- **Types**: Role-based with per-role adapter/model overrides
- **Communication**: AgentBus for inter-agent messaging; PairPipeline for sequential Worker→Reviewer→Tester→Documenter flow
- **Escalation**: Worker escalates to stronger model after N iterations

#### Orchestration Pattern
- **Pipeline-based**: Linear issue → DecisionEngine filters → PairPipeline.run() → Linear update → Discord report → Memory save
- **Autonomous**: Runs on cron heartbeat without human intervention
- **Pair programming**: Worker generates, Reviewer evaluates (APPROVE/REVISE/REJECT), loop up to N iterations

#### UI/UX
- **TUI**: Rich terminal interface with tabs (Chat/Projects/Tasks/Stuck/Logs)
- **Web Dashboard**: Port 3847, real-time pipeline visualization
- **Discord Bot**: Primary control interface for autonomous operation
- **Kanban UI**: Local issue tracker web interface

#### Integrations
- **Linear** (issue tracking, project management)
- **Discord** (bot control, notifications)
- **GitHub CLI** (CI monitoring, PR processing)
- **Claude Code CLI** / **OpenAI Codex CLI** / **OpenAI API** / **Ollama** / **LMStudio** / **llama.cpp**
- **LanceDB** (vector memory)
- **better-sqlite3** (code registry, issue tracker)

#### Pricing/Business Model
- **Free and open source** (GPL-3.0)
- **Single author** (unohee), funded via Ko-fi donations
- **No subscription, no paywalled features**
- **npm package**: `@intrect/openswarm`

#### Strengths
- Most stars (637) — highest community interest
- Truly multi-provider (Claude, GPT, Codex, local models)
- Autonomous operation — Linear-to-code pipeline without human intervention
- Cognitive memory with vector embeddings — long-term learning across sessions
- Code registry with BS Detector — unique static analysis integration
- PR auto-improvement — CI fix automation
- Discord as primary interface — practical for team workflows
- Well-structured codebase with clear separation of concerns
- Vitest test suite

#### Weaknesses
- **GPL-3.0 license** — restrictive for commercial use
- **Autonomous focus over interactive** — less suited for hands-on development
- **No visual spatial dashboard** — TUI and web dashboard are basic
- **Linear-dependent** — primary workflow assumes Linear as project management
- **Single author** — bus factor risk
- **Complex setup** — requires Discord bot, Linear API, GitHub CLI, Claude Code auth
- **No desktop app** — CLI/TUI only
- **Memory system complexity** — hybrid retrieval with 4 weighted factors may be overengineered

#### Relevance to AgentDock
Proves demand for autonomous agent orchestration. AgentDock should learn from its multi-provider adapter pattern, cognitive memory concept, and Discord integration model. However, AgentDock's interactive visual approach is more aligned with how most developers actually want to work.

---

### 2.3 VRSEN/OpenSwarm (141 stars, Python)

**URL**: https://github.com/VRSEN/OpenSwarm
**Tagline**: "The fully open-source multi-agent system that does everything Claude Code can't."
**License**: MIT
**Latest Release**: v1.0.0 (Apr 22, 2026)
**Commits**: 82

#### What It Does
A multi-agent system with 8 specialized agents (Orchestrator, Virtual Assistant, Deep Research, Data Analyst, Slides Agent, Docs Agent, Image Generation, Video Generation) that produces polished deliverables (slide decks, research reports, data visualizations, documents, images, videos) from a single prompt. Built on Agency Swarm framework.

#### Architecture
- **Orchestrator** routes requests to specialist agents
- **Agency Swarm** framework for multi-agent coordination
- **Composio** for 10,000+ external service integrations
- **Python** with `swarm.py` entry point, `server.py` for API

#### Features
1. 8 specialized agents (Orchestrator, Virtual Assistant, Deep Research, Data Analyst, Slides, Docs, Image, Video)
2. One prompt → complete deliverables (decks, reports, charts, videos)
3. Composio integration (10,000+ services: Gmail, Slack, GitHub, HubSpot)
4. Multiple AI providers (OpenAI GPT-4o, Anthropic Claude, Gemini, fal.ai, Sora, Veo)
5. npm install + CLI wizard setup
6. Docker deployment
7. API server on port 8080
8. Forkable for custom swarms (SEO, Sales, Marketing, Product)

#### Agent Model
- **Orchestrator pattern**: Central router dispatches to specialists
- **Specialists**: Each agent has a specific domain and toolset
- **No inter-agent communication**: Orchestrator mediates all interactions

#### Strengths
- Clear value proposition: "does everything Claude Code can't" (multimedia output)
- Built on proven Agency Swarm framework
- Composio gives massive integration surface
- Easy setup (npm install, wizard handles everything)
- Video/YouTube demo available

#### Weaknesses
- **Not a coding agent orchestrator** — focused on content creation, not software development
- **Marketing-heavy README** — more hype than technical depth
- **Single release** — very new project
- **Investor pitch in README** — suggests commercial intent
- **No visual UI** — terminal-only

#### Relevance to AgentDock
Different market segment (content creation vs. coding). The orchestrator pattern is interesting but not directly applicable. AgentDock should note the Composio integration approach for external services.

---

### 2.4 openswarm-os/openswarm (10 stars, Python)

**URL**: https://github.com/openswarm-os/openswarm
**Tagline**: "An Experimental, Local-First Operating System for AI Agents"
**License**: MIT
**Latest Release**: v0.1.0 (Feb 9, 2026)
**Commits**: 17
**Status**: Early alpha, bug hunting phase

#### What It Does
An experimental multi-agent OS where agents coordinate through a **shared latent space** (384-dimensional vector space) instead of explicit message passing. Agents don't know each other exist — coordination emerges from semantic alignment via cosine similarity.

#### Architecture
- **Neural Bus**: Shared 384-dim latent space, token-secured
- **Resonance-based wake**: Agents activate on semantic similarity with self-tuning thresholds
- **Zero coupling**: No inter-agent imports, no shared state, no message routing
- **O(N) scaling**: N comparisons per signal, not N(N-1) pairwise routes
- **Redis Streams** for horizontal scaling
- **TUI Dashboard** + **Web Dashboard** (drag-and-drop, SSE)
- **Docker + Kubernetes** deployment with Helm chart

#### Unique Concepts
- **Latent vector communication**: Agents declare "mission vectors," bus computes cosine similarity
- **Swarm Chains**: Automated pipelines through resonance alone (Researcher→Writer→Artist→Publisher)
- **Direct addressing**: `@browser click on News` gives 100% resonance
- **10 standard agents** + **21 official add-ons** + community agents
- **Security**: Per-agent tokens, Fernet encrypted secrets, MCP Gateway with 4-layer audit, RBAC, filesystem sandbox
- **Performance**: <3ms bus overhead, 140K signal writes/sec

#### Strengths
- Novel architecture (latent space coordination)
- Impressive benchmark numbers
- Comprehensive security model
- Docker/K8s ready
- 100% test line coverage on agents
- Well-documented architecture

#### Weaknesses
- **Only 10 stars, 0 forks** — minimal community traction
- **Experimental/alpha** — explicitly warns about bugs
- **Conceptual novelty over practical utility** — resonance-based coordination is interesting but unproven
- **Ollama-only LLM** — defaults to local Ollama, OpenAI also supported
- **Complex setup** — multiple optional features, embedding models
- **Resonance false positives** — acknowledged limitation

#### Relevance to AgentDock
The latent space coordination concept is academically interesting but not practically relevant to AgentDock's goals. The security model (per-agent tokens, MCP audit, RBAC) is worth studying. The O(N) vs O(N²) scaling argument is valid for large agent counts.

---

### 2.5 pilipala00622/OpenSwarm (5 stars, Python)

**URL**: https://github.com/pilipala00622/OpenSwarm
**Tagline**: "多智能体编排系统" (Multi-agent orchestration system)
**License**: Not specified
**Commits**: 9
**Version**: v0.4.1

#### What It Does
A lightweight multi-agent collaboration framework where a main Agent creates sub-agents and dispatches tasks. Aligns with "Oh-My-OpenCode" core functionality. Features category-based task routing, tool permissions, background tasks, task dependencies, cross-session handoff, external memory, and a knowledge engine.

#### Key Features
1. **Category System** — 8 task categories (visual-engineering, ultrabrain, deep, artistry, quick, etc.) mapping to different models/temperatures
2. **Tool Permissions** — Blacklist, whitelist, delegation control (3 layers)
3. **Background Tasks** — Async sub-agent execution
4. **Task Dependencies** — blockedBy/blocks with cycle detection
5. **Handoff** — Cross-session context transfer
6. **External Memory** — Anthropic-style LLM summarization + file persistence
7. **Knowledge Engine** — Local code/doc indexing with AST analysis
8. **Team-lite** — Parent/team dual-mode collaboration
9. **Reliability** — Concurrency limits, timeouts, token stats, graceful shutdown, checkpoint recovery

#### Strengths
- Well-designed category system for task-appropriate model selection
- Strong reliability focus (v0.3.1 fixed 22 issues)
- Thoughtful handoff and memory design
- Container infrastructure for sandboxed execution

#### Weaknesses
- **Very small** (5 stars, 9 commits)
- **Chinese-language documentation** — limited international reach
- **OpenAI-compatible API only** — no Claude Code CLI integration
- **Single-process orchestration** — no distributed execution
- **Early stage** — TODO items include handoff message injection, agent registry persistence

#### Relevance to AgentDock
The category system (task-type → model/temperature selection) is a good pattern to adopt. The handoff mechanism for cross-session continuity is relevant. The reliability fixes (atomic writes, cycle detection, empty response防护) are good engineering practices.

---

### 2.6 OpenSwarm/OpenSwarm (14 stars, C)

**URL**: https://github.com/OpenSwarm/OpenSwarm
**Tagline**: "An operating system for miniature robots"
**License**: Custom (academic)
**Commits**: 127

#### What It Does
An embedded operating system for the e-Puck miniature robot (dsPic30F6014a), developed during a PhD research project at the University of Sheffield. **Completely unrelated to AI agents.**

#### Relevance to AgentDock
**Zero relevance.** This is a robotics OS, not an AI agent framework. Included only for completeness.

---

### 2.7 openswarm-eu Organization

**URL**: https://github.com/openswarm-eu
**Website**: https://www.openswarm.eu/

#### What It Is
A **Horizon Europe** research project (Grant Agreement No. 101093046) running from January 2023 to April 2026. Focus: "energy-aware swarms of collaborative smart nodes" — IoT/robotics research, not AI software agents.

#### Partners
Inria (France, coordinator), Analog Devices (Ireland), IMEC (Belgium), Ingeniarius (Portugal), KU Leuven (Belgium), Siemens (Germany/Austria/Portugal), University of Sheffield (UK), Wattson Elements (France)

#### Repositories
75 repositories covering robot swarm control, BLE communication, energy management, simulation modules. Mostly C, C++, Go, Rust, Python.

#### Relevance to AgentDock
**Zero relevance to AI agent orchestration.** This is an EU-funded robotics/IoT research project. The name collision is coincidental.

---

## 3. Feature Comparison Table

| Feature | openswarm-ai/openswarm | unohee/OpenSwarm | VRSEN/OpenSwarm | openswarm-os | pilipala00622 | AgentDock (Planned) |
|---------|----------------------|------------------|-----------------|--------------|---------------|-------------------|
| **Visual Dashboard** | Spatial canvas, infinite pan/zoom | Basic web dashboard | None | TUI + Web drag-and-drop | None | **Spatial canvas + team view** |
| **Desktop App** | Electron (macOS, Windows) | None | None | None | None | **Electron + Web** |
| **Multi-LLM Provider** | Via 9router (40+ providers) | Claude, GPT, Codex, Local | OpenAI, Anthropic, Gemini, fal.ai | Ollama, OpenAI | OpenAI-compatible | **All providers, unified** |
| **Agent Types** | Agent, Ask, Plan, View Builder, Skill Builder | Worker, Reviewer, Tester, Documenter, Auditor | 8 specialists (Research, Data, Slides, etc.) | 10 standard + 21 add-ons | Category-based (8 types) | **Custom roles + templates** |
| **Inter-Agent Communication** | None (isolated) | AgentBus + PairPipeline | Orchestrator-mediated | Latent space (Neural Bus) | Parent/team-lite messaging | **Direct + mediated** |
| **Human-in-the-Loop** | Per-tool approval workflow | None (autonomous) | None | Per-agent tokens/RBAC | Tool permissions (3 layers) | **Granular approval** |
| **Memory System** | Persistent JSON history | LanceDB + Xenova embeddings | None | In-memory bus + JSON | LLM summarization + files | **Vector + episodic memory** |
| **Code Registry** | None | SQLite + FTS5, 8 languages | None | None | Knowledge engine (AST) | **Project-aware context** |
| **Task Scheduling** | Cron/interval/one-shot (PR) | Cron via Discord | None | Swarm Chains | Background tasks + dependencies | **Cron + event-driven** |
| **Git Integration** | Worktree isolation | GitHub CLI | None | None | None | **Branch + PR workflow** |
| **External Integrations** | Google Workspace, MCP servers | Linear, Discord, GitHub | Composio (10,000+) | MCP, SMTP, WhatsApp | Serper search, code runner | **MCP + native integrations** |
| **Team Collaboration** | None (single-user) | Discord-based | None | Multi-user auth (alpha) | Handoff between sessions | **Multi-user, real-time** |
| **Cloud/Hosted** | Local only | Local only | Local + Docker | Local + Docker + K8s | Local | **Cloud-native + local** |
| **Cross-Platform** | macOS (Windows PR) | Node.js 22+ (cross-platform) | Cross-platform | Cross-platform | Cross-platform | **All platforms** |
| **Cost Tracking** | Per-session USD tracking | Cumulative cost in TUI | None | Per-agent rate limiting | Token usage stats | **Per-agent + per-project** |
| **Portable Config** | `.swarm` ZIP bundles | config.yaml | .env | YAML configs | JSON configs | **Shareable templates** |
| **License** | MIT | GPL-3.0 | MIT | MIT | Unspecified | **To be determined** |

---

## 4. What They Do Well (Things AgentDock Should Copy)

### From openswarm-ai/openswarm:
1. **Spatial dashboard canvas** — The infinite pan/zoom canvas with draggable agent cards is the best UI pattern in the space. AgentDock should match or exceed this.
2. **Human-in-the-loop approval workflow** — Per-tool permission config (always allow/ask/deny) with batch approve/deny is practical and necessary for production use.
3. **Message branching** — Editing prior messages to fork conversations is a powerful debugging/exploration tool that no other project has.
4. **Git worktree isolation** — Each agent in its own worktree/branch is the right approach for parallel coding agents.
5. **`.swarm` portable bundles** — Export/import dashboard configurations as ZIP files with secret stripping is a clever sharing mechanism.
6. **9router integration** — Embedding a model router with 40+ providers and 3-tier fallback is smart cost management.
7. **In-app settings** — Configuring API keys in the UI rather than env vars lowers the barrier to entry.
8. **Electron auto-updater** — Professional distribution via GitHub Releases with auto-updates.

### From unohee/OpenSwarm:
9. **Multi-provider adapter pattern** — Pluggable adapter system (claude/codex/gpt/local) with runtime switching is the right architecture.
10. **Cognitive memory** — Vector embeddings for long-term recall across sessions is a differentiator AgentDock should implement.
11. **Code registry with BS Detector** — Static analysis integrated into the agent pipeline is unique and valuable.
12. **PR auto-improvement** — Monitoring PRs, auto-fixing CI failures, resolving merge conflicts is a killer feature for dev teams.
13. **Pace control** — Rolling window task caps, per-project limits, exponential backoff prevents agent runaway.
14. **Discord as control plane** — Using Discord for team monitoring and task dispatch is practical for distributed teams.

### From pilipala00622/OpenSwarm:
15. **Category-based task routing** — 8 task categories mapping to different models/temperatures/reasoning effort is a smart optimization pattern.
16. **Three-layer tool permissions** — Blacklist → whitelist → delegation control is a clean permission model.
17. **Task dependency system** — blockedBy/blocks with cycle detection and automatic parallel scheduling.
18. **Handoff mechanism** — Cross-session context transfer with LLM-generated summaries.

### From openswarm-os/openswarm:
19. **Security model** — Per-agent tokens, Fernet encrypted secrets, MCP Gateway with 4-layer audit, RBAC, filesystem sandbox.
20. **O(N) scaling argument** — Latent space coordination eliminates pairwise wiring, valid for large agent counts.

---

## 5. Where They Fail (Gaps AgentDock Can Exploit)

### Critical Gaps Across ALL Projects:
1. **No team collaboration** — Every project is single-user. AgentDock can win by being built for teams from day one.
2. **No cloud-hosted option** — All require local installation. AgentDock should offer cloud + local deployment.
3. **No real-time collaboration** — No project supports multiple humans working with the same agent swarm simultaneously.
4. **Limited cross-platform** — openswarm-ai is macOS-first, others are CLI-only. AgentDock should be truly cross-platform.
5. **No enterprise features** — No SSO, no audit logs, no role-based access control (except openswarm-os which is alpha).

### openswarm-ai/openswarm Specific Gaps:
6. **Anthropic-locked agent runtime** — Only works with Claude Code CLI. AgentDock should support all LLM providers natively.
7. **JSON file storage** — No proper database. AgentDock should use a real database (PostgreSQL/SQLite).
8. **No inter-agent communication** — Agents are completely isolated. AgentDock should enable agent-to-agent collaboration.
9. **No testing infrastructure** — No visible test suite. AgentDock should be well-tested.
10. **12 open PRs unmerged** — Suggests slow review process or maintainer bottleneck.

### unohee/OpenSwarm Specific Gaps:
11. **GPL-3.0 license** — Restrictive for commercial adoption. AgentDock should choose a more permissive license.
12. **No visual spatial dashboard** — TUI and basic web dashboard are not competitive with openswarm-ai's UI.
13. **Linear-dependent** — Primary workflow assumes Linear. AgentDock should be project-management-agnostic.
14. **Complex setup** — Requires Discord bot, Linear API, GitHub CLI. AgentDock should have simpler onboarding.
15. **Autonomous over interactive** — Less suited for hands-on development workflows.

---

## 6. Technical Lessons

### Architecture Patterns:
1. **Electron + FastAPI + React** (openswarm-ai) — Proven stack for desktop AI apps. AgentDock should use similar architecture.
2. **Adapter pattern for LLM providers** (unohee) — Pluggable adapters abstract away provider differences. Essential for multi-provider support.
3. **WebSocket streaming** (openswarm-ai) — Real-time token streaming via WebSocket is the right approach for chat interfaces.
4. **Redux Toolkit for state** (openswarm-ai) — Predictable state management for complex UIs.
5. **JSON file storage** (openswarm-ai) — Simple but doesn't scale. AgentDock should use SQLite or PostgreSQL from the start.
6. **LanceDB for vector memory** (unohee) — Local-first vector database that doesn't require a server.
7. **Git worktrees for isolation** (openswarm-ai) — Clean approach to parallel agent file operations.
8. **MCP protocol for tools** (openswarm-ai, openswarm-os) — Model Context Protocol is becoming the standard for tool integration.
9. **Cron-based scheduling** (openswarm-ai PR, unohee) — asyncio tick loop with croniter is a simple, effective scheduler.
10. **Category-based model routing** (pilipala00622) — Task type → model/temperature mapping optimizes cost and quality.

### Tech Choices to Adopt:
- **Frontend**: React + TypeScript + Material UI (openswarm-ai) or consider Next.js for web-first approach
- **Backend**: FastAPI (Python) for agent orchestration, or Node.js for full-stack TypeScript
- **Database**: PostgreSQL (not JSON files) for production readiness
- **Vector store**: LanceDB for local-first, or pgvector for cloud
- **Desktop**: Electron for cross-platform desktop app
- **Real-time**: WebSockets for streaming, SSE for server-push
- **Tool integration**: MCP protocol (becoming industry standard)

### Integration Approaches:
- **MCP servers** for tool discovery and execution (stdio, HTTP, SSE transports)
- **OAuth flows** for external service integration (Google Workspace pattern)
- **Git worktrees** for parallel agent isolation
- **Discord/Slack bots** for team notification and control
- **Linear/Jira/GitHub** integration for project management

---

## 7. Business Lessons

### Pricing Insights:
- **All projects are free and open source** — No one has successfully monetized an AI agent orchestrator yet
- **unohee uses Ko-fi donations** — Single author, no subscription model
- **VRSEN has investor pitch in README** — Suggests commercial intent but no product yet
- **openswarm-ai has no commercial entity** — Community-driven, no monetization visible

### Positioning Lessons:
- **"Mission control" framing** (openswarm-ai) — Resonates with developers who want oversight
- **"Autonomous dev team" framing** (unohee) — Appeals to teams wanting hands-off automation
- **"Does everything Claude Code can't" (VRSEN) — Clear differentiation by capability gap
- **"Local-first" emphasis** (openswarm-os) — Privacy-conscious positioning

### Go-to-Market Observations:
- **GitHub Releases** is the primary distribution channel (openswarm-ai)
- **npm package** for CLI tools (unohee, VRSEN)
- **pip package** for Python projects (openswarm-os, pilipala00622)
- **YouTube demos** are effective (VRSEN has a full demo video)
- **Discord communities** are the natural hub for agent tool users
- **Ko-fi/Sponsor** buttons for single-author projects

### Market Timing:
- All major projects launched between February-April 2026
- Rapid iteration cycles (openswarm-ai: 29 releases in ~3 months)
- The space is moving extremely fast — first-mover advantage is still available
- No project has achieved product-market fit yet (all are early stage)

---

## 8. AgentDock Action Items

### Must Build (Critical Differentiators):
1. **Multi-provider agent runtime** — Support Claude, GPT, Gemini, local models natively. Don't lock into one provider.
2. **Team collaboration** — Real-time multi-user support, shared dashboards, role-based access. This is the #1 gap in all competitors.
3. **Cloud + local deployment** — Offer hosted SaaS option alongside local installation.
4. **Proper database** — PostgreSQL or SQLite from day one. Don't use JSON file storage.
5. **Inter-agent communication** — Enable agents to collaborate, share context, and delegate tasks to each other.
6. **Visual spatial dashboard** — Match or exceed openswarm-ai's canvas UI. This is the killer UX feature.

### Should Build (Competitive Parity):
7. **Human-in-the-loop approvals** — Per-tool permission config with batch operations.
8. **Git worktree isolation** — Parallel agent file operations without conflicts.
9. **MCP tool integration** — Support MCP protocol for tool discovery and execution.
10. **Memory system** — Vector embeddings for cross-session recall.
11. **Task scheduling** — Cron/interval/one-shot scheduling for agents.
12. **Cost tracking** — Per-agent and per-project cost visibility.
13. **Portable configurations** — Shareable dashboard/agent templates.

### Nice to Have (Future):
14. **Code registry** — Static analysis integration for code quality awareness.
15. **PR auto-improvement** — CI fix automation, merge conflict resolution.
16. **Discord/Slack integration** — Bot-based monitoring and control.
17. **Category-based model routing** — Task-type → model/temperature optimization.
18. **Message branching** — Conversation forking for exploration.

### Things to Avoid:
19. **Don't use GPL-3.0** — Choose MIT or Apache-2.0 for commercial friendliness.
20. **Don't be macOS-only** — Cross-platform from day one (Windows, Linux, macOS).
21. **Don't require complex setup** — One-click install, minimal configuration.
22. **Don't lock into one project management tool** — Be agnostic (support Linear, Jira, GitHub Issues, or none).
23. **Don't use JSON file storage** — Use a real database.
24. **Don't be autonomous-only** — Support both interactive and autonomous modes.

### Architecture Decisions:
25. **Use PostgreSQL** as primary database (not JSON files)
26. **Use WebSockets** for real-time streaming (not polling)
27. **Use MCP protocol** for tool integration (not custom protocols)
28. **Use Electron** for desktop app (proven pattern)
29. **Use React + TypeScript** for frontend (largest talent pool)
30. **Use adapter pattern** for LLM providers (pluggable, testable)

---

## 9. Sources

### Primary Repositories:
- https://github.com/openswarm-ai/openswarm (412 stars)
- https://github.com/unohee/OpenSwarm (637 stars)
- https://github.com/VRSEN/OpenSwarm (141 stars)
- https://github.com/openswarm-os/openswarm (10 stars)
- https://github.com/pilipala00622/OpenSwarm (5 stars)
- https://github.com/OpenSwarm/OpenSwarm (14 stars, robotics OS)
- https://github.com/openswarm-eu (Horizon Europe project)

### Websites:
- https://openswarm.com (openswarm-ai landing page)
- https://www.openswarm.eu/ (Horizon Europe project site)
- https://9router.com (AI model router)

### Key Pull Requests (openswarm-ai/openswarm):
- PR #10: Cross-platform Windows/Linux dev-mode support
- PR #11: Agent scheduling system (cron, interval, one-shot)
- PR #12: LLM router with API/CLI dual-path + browser tools MCP
- PR #13: Dashboard toolbar: folder picker, branch selector, model/effort options
- PR #14: Browse and resume Claude CLI sessions from dashboard
- PR #15: Dashboard performance with multiple agents open
- PR #16: `.swarm` file format for portable dashboard sharing
- PR #18: Starting integration of old frontend
- PR #21: Fix stale model defaults after Codex connection
- PR #22: Tests (draft)

### Key Issues (openswarm-ai/openswarm):
- Issue #4: OpenAI support? (open since Mar 17, 2026)
- Issue #20: New chats can launch with stale Claude defaults after connecting Codex (open since Apr 24, 2026)

### Releases (openswarm-ai/openswarm):
- v1.0.28 (May 4, 2026) — Latest, includes Windows .exe
- v1.0.27 (Apr 28, 2026)
- v1.0.26 (Apr 27, 2026)
- v1.0.25 (Apr 22, 2026) — 9router switch from webpack to turbopack
- v1.0.24 (Apr 21, 2026) — Reasoning UI + thinking-level controls
- v1.0.19 (Mar 28, 2026) — Fix Google Workspace MCP in production

### External References:
- https://github.com/decolua/9router (9router AI model router)
- https://github.com/VRSEN/agency-swarm (Agency Swarm framework)
- https://composio.dev (Composio integrations)
- https://modelcontextprotocol.io/ (MCP specification)

---

*Research conducted on May 6, 2026. All data sourced from public GitHub repositories and websites.*

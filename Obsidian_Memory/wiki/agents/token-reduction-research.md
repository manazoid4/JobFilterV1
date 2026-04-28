---
type: agent
status: complete
created: 2026-04-23
updated: 2026-04-28
links:
  - "[[Caveman Mode]]"
  - "[[Token Reduction]]"
---
# LLM Token Reduction Techniques Research

## Summary
A sidechain agent tasked with searching Reddit (r/LocalLLaMA, r/ClaudeAI, etc.) for the most practical LLM token and context window reduction techniques from 2024–2025. WebSearch was denied, so the agent responded entirely from training knowledge. It produced a ranked top-10 list of techniques with claimed reduction percentages and a prioritised implementation table for Claude Code contexts.

## Key Decisions
- WebSearch permission was denied in this environment; agent fell back to training knowledge
- Agent did not halt — it delivered the full research output from internal knowledge

## Concepts Touched
[[Caveman Mode]], [[Token Reduction]]

## Output
Ranked top-10 LLM token reduction techniques:
1. Conversation compaction / rolling summarisation (60–80% history reduction)
2. Caveman/ultra-compressed prompting (~60–75% prompt tokens)
3. System prompt compression + prompt caching (80–90% cost on cached portions)
4. Structured output / schema-constrained responses (40–60% output tokens)
5. Context pruning / selective file inclusion (50–90%)
6. RAG instead of full context stuffing (70–95%)
7. Two-pass hierarchical summarisation (80–90%)
8. Prompt templating with variable injection (20–40%)
9. Output length constraints (30–60%)
10. Tool/function call batching (30–70%)

Priority table for Claude Code: system prompt caching first, context pruning second, rolling summarisation third.

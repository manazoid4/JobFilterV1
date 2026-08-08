# Growth & Brand Strategy — manazoid4 portfolio

Ultra-planning for audience growth across three connected brands. This folder is the
single source of truth for how we build a website presence, social media, and an
audience for each product — and how they compound into one another.

> Scope note: these docs live in the JobFilter repo because that is where this planning
> session runs, but they cover three separate repos/products. When it is time to execute,
> the Agent Nudge and MazOS sections can be copied into their own repos
> (`manazoid4/agent-nudge`, `manazoid4/mazos-site`).

## The three brands

| Brand | What it is | Audience | Growth motion |
| --- | --- | --- | --- |
| **JobFilter** (`jobfilterv1`) | UK public-procurement qualification for small trades/construction firms. "DeWalt" brand. | Non-technical, local, trust-driven UK trade firms & small subbies | Local + national SEO, trade social, and **per-customer microsites** (`jobfilter.uk/{business}`) as a viral growth loop |
| **Agent Nudge** (`agent-nudge`) | Local-first, provider-neutral coordination/assurance layer for multiple AI coding agents. MIT open source, V0.5 MVP, Windows-first. | Global developers running 2+ AI coding agents | Open-source-led growth: GitHub, Show HN, Product Hunt, dev communities, build-in-public |
| **MazOS** (`mazos-site` + `mazos-ui`) | The **personal builder brand** of Manazir "Maz" Hussain (applied-AI / agent engineer) + the MAZos operator console. | Employers, clients, collaborators, the AI-eng community | Build-in-public personal brand; the **hub** that distributes everything else |

## Why plan them together — the flywheel

These are not three unrelated marketing plans. They share one operator (Maz) and reinforce
each other:

```text
        ┌─────────────────────────────────────────────┐
        │   MazOS / Maz Hussain personal brand (HUB)    │
        │   build-in-public • distribution • credibility │
        └───────────────┬───────────────┬───────────────┘
                        │ ships & tells │ drives traffic
              ┌─────────▼──────┐   ┌────▼──────────────┐
              │   JobFilter    │   │   Agent Nudge     │
              │  (revenue,     │   │  (developer reach,│
              │  UK trades)    │   │  OSS credibility) │
              └───────┬────────┘   └─────────┬─────────┘
                      │ proof/case study     │ proof/case study
                      └──────────► feeds back to HUB ◄────────┘
```

Every product ship becomes content for the personal brand. The personal brand's audience
becomes distribution for the next product launch. Each product's traction becomes proof
that strengthens the personal brand and the next pitch. One engine, three payloads.

## How to read this folder

| File | Purpose |
| --- | --- |
| [`00-research.md`](00-research.md) | Market, audience, channel, and competitor research grounding every plan |
| [`01-jobfilter.md`](01-jobfilter.md) | JobFilter brand site + social + per-customer microsite growth loop |
| [`02-agent-nudge.md`](02-agent-nudge.md) | Agent Nudge open-source developer-audience growth |
| [`03-mazos.md`](03-mazos.md) | MazOS / Maz Hussain build-in-public personal brand |
| [`04-execution.md`](04-execution.md) | Unified 90-day calendar, content engine, tooling, metrics, budget, risks |

## Operating principles (apply to all three)

1. **One operator, sequenced.** A solo builder cannot run three launches at once. Batch
   content, run **one** big launch per month, keep the other two on evergreen cadence.
2. **Ship in public, then distribute.** Building is the content. Do not build in silence
   and market later — narrate as you go.
3. **Proof over polish.** Real notices, real receipts, real shipped code beat slogans —
   this matches the existing "truthful/evidence" culture in all three repos.
4. **Own the channel you can't be de-platformed from.** Email list + owned sites first;
   social is rented reach that feeds the owned list.
5. **Distinct voice per audience.** Blunt DeWalt trade-speak for JobFilter; precise
   engineer-speak for Agent Nudge; credible builder-operator voice for MazOS.

_Last planned: 2026-08-03._

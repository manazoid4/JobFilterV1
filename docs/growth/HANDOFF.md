# Portfolio Growth — 2-Session Execution Handoff

Two paste-ready prompts that run the whole growth program as a relay:

- **SESSION 1 — PLAN (run on Opus):** research + strategy + all copy/specs. Produces a build
  brief. Output feeds Session 2.
- **SESSION 2 — EXECUTE (run on Sonnet 5):** ships code across the live repos/sites, opens PRs,
  updates changelogs.

Order matters: run Session 1, copy its output into Session 2, run Session 2.

> Model tip: set the model at session start (Claude Code `/model`, or pick per session). Session 1
> wants Opus (deep reasoning); Session 2 wants Sonnet 5 (fast execution).

---

## PURPOSE (why)
One solo operator, one engine — **Build → Document → Distribute** — pointed at 3 brands so they
feed each other. JobFilter = signups/revenue + microsite referral loop. Agent Nudge = GitHub
stars/installs. MazOS = inbound (hire/contract) + the HUB that distributes the other two. Real
prize = a **reusable owned audience** (email lists) that makes every future launch cheaper. ONE
launch per month.

---

## ════════ SESSION 1 of 2 — PLAN (run on OPUS) ════════

```text
# PORTFOLIO GROWTH — SESSION 1/2: PLAN (run on OPUS). Owner: Maz Hussain (GitHub manazoid4).
# You are Researcher + Brand/Content strategist combined. Output a single BUILD BRIEF for Session 2.

## PURPOSE
One solo operator, one engine (BUILD→DOCUMENT→DISTRIBUTE), 3 brands feeding each other. JobFilter =
signups/revenue + microsite referral loop. Agent Nudge = GitHub stars/installs. MazOS = inbound +
the HUB. Prize = a reusable OWNED audience. ONE launch/month.

## CONTEXT CORE (repos owned by manazoid4)
- JobFilter — repo JobFilterV1 (Next.js/TS/Supabase/Stripe, live jobfilter.uk). UK public-
  procurement QUALIFICATION for small trades: reads Find a Tender (FTS) OCDS → BID/WATCH/SUBCONTRACT/
  SKIP. NOT domestic leads; NEVER "exclusive/guaranteed/we get the contract". Routes: /find-jobs,
  /vicinity (past-work), /vantage, /free-tools, /tips, /pricing. Waitlist API has `source` field
  (reuse for referral attribution). Has a customer "What's New" changelog page. Brand = DeWalt:
  Yellow/Navy/Black, Barlow + Barlow Condensed, bold/blunt/trade, NO AI buzzwords, NO glassmorphism.
- Agent Nudge — repo agent-nudge (TS/Electron/MCP/Windows). MIT OSS, V0.5 MVP. Tagline "Context
  assurance for your coding agents." LOCAL-FIRST, PROVIDER-NEUTRAL coordination + receipts layer for
  running MULTIPLE AI coding agents (Claude Code, Codex, OpenCode, Aider, Cline) on one repo w/o
  collisions. Loop: check-in+intent → expiring path claim/sourced fact → fan-out → sync+cursor →
  HOLD/REVIEW/CLEAR. Issue #8 (verified Windows release + first-run onboarding) = LAUNCH BLOCKER;
  #21 dogfood ritual; #13/#20 roadmap; #9 Shadow Mode/Replay. NOT cross-platform yet; payments not
  production-ready. Position as COORDINATION LAYER, never "another agent".
- MazOS — repos mazos-site (portfolio, issues #2 truth-align/harden, #3 candidate identity+external
  proof) + mazos-ui (operator console, issue #53). TREAT MazOS AS THE PERSONAL-BRAND HUB (Maz
  Hussain, applied-AI/agent engineer). UVP (not a title): "I ship production products end-to-end,
  solo, orchestrating AI agents — here's the live app, the code, the receipts."

## FLYWHEEL
MazOS is the hub. Every JobFilter/Agent Nudge ship → build-in-public content on Maz's channels →
his audience = free launch distribution → each product's traction = proof for the hub + next pitch.
Signature reusable format = TEARDOWN (JobFilter: real anonymised FTS notice bid/no-bid; Agent Nudge:
real agent collision + the receipt; MazOS: a real technical decision).

## 90-DAY SEQUENCE (order = MazOS foundations → Agent Nudge launch → JobFilter compound)
M1 Foundations: MazOS truth-align portfolio + start posting; Agent Nudge ship #8 + record demo;
JobFilter pillar page + teardowns + social live + "Weekly Notice" email. M2 Launch+microsite: Agent
Nudge Show HN + Product Hunt + X (the month's ONE launch); MazOS rides it + newsletter live;
JobFilter ship microsite MVP + onboard first firms + /stories. M3 Compound: JobFilter referral
incentive + programmatic /trades/{trade} + review SEO; Agent Nudge sustained dogfood logs + first
external contributors; MazOS best-format double-down + track inbound + "how I ship solo" long-form.

## KPIs (lead metric in CAPS)
JobFilter: MICROSITES CREATED→REFERRED SIGNUPS; scans; signups; organic sessions/rank; email list.
Agent Nudge: GITHUB STARS+INSTALLS; Show HN/PH; Discord actives+external PRs; email subs.
MazOS: ENGAGED FOLLOWERS+QUALIFIED INBOUND; newsletter subs; name-search rank; roles/contracts.
Cross-brand: TOTAL OWNED AUDIENCE. Prove loops organically BEFORE any ad spend.

## GUARDRAILS
JobFilter: BID/WATCH/SUB/SKIP only; DeWalt voice; no AI buzzwords; no fabricated proof; no thin SEO
doorway pages. Agent Nudge: don't claim unshipped features; never launch on broken install;
coordination layer not "agent"; value-first + disclose author on Reddit/Discord. MazOS: honest/
evidence voice; consistent identity everywhere; engage don't just broadcast; shipping is the fuel.
ALL: owned email lists first; category ownership > feature lists; each audience's native voice; ONE
launch/month; escalate to Maz on pricing / vercel cron / brand-voice / anything irreversible/public.
CHANGELOG RULE: every ship updates JobFilter's "What's New"; if Agent Nudge/MazOS lack a changelog,
Session 2 ADDS one on their live Vercel site — same spirit as JobFilter, visually distinct so the
3 sites aren't confusingly identical.

## KNOWN STATE
Strategy committed to JobFilterV1 branch claude/job-filter-brand-planning-pmic94 under docs/growth/
(README, 00-research, 01-jobfilter, 02-agent-nudge, 03-mazos, 04-execution, HANDOFF), PR #426 open
(CI green; Vercel deploy FAILS on PRE-EXISTING hourly-cron Hobby limit vercel.json `"0 * * * *"` —
do NOT touch unless Maz approves daily `"0 8 * * *"` or Pro). Agent Nudge/MazOS work runs in THEIR
OWN repos (add to session scope first).

## SESSION 1 — DO THIS NOW (two passes, then output ONE build brief)
PASS A — RESEARCH (cite every non-obvious claim w/ a 2025–2026 URL; flag anything contradicting CORE):
1. JobFilter: real UK local+intent SEO keyword map (cluster, est. volume, difficulty, intent, target
   URL) for "win public/council work", trade×procurement, FTS-helper, tool-magnet queries; top ~10
   Facebook trade groups + subreddits/forums for small UK firms; competitor teardown (free FTS
   alerts, Tracker, Tenders Direct, Checkatrade/MyBuilder, Bark) w/ ownable gaps; 5 real bid/no-bid
   teardown source examples.
2. Agent Nudge: discovery-surface map (subreddits, HN/PH norms, MCP/awesome-* dirs, dev-X/YouTube
   creators on multi-agent coding); competitive-feature matrix vs Aider/Cline/OpenCode/orchestration;
   Show HN + Product Hunt copy brief.
3. MazOS: keywords to own for the name + "applied AI engineer UK"; 10 high-signal accounts/
   communities to engage; 5 proven build-in-public post angles.
PASS B — BRAND/CONTENT (real content only, no lorem, no fabricated proof; each piece ends in ONE CTA;
voice: DeWalt/blunt JobFilter, precise-engineer Agent Nudge, credible-builder MazOS):
4. Per-brand messaging kit: one-liner, positioning, "category we own", 5 proof points, do/don't voice.
5. 90-day content calendar (M1/M2/M3): weekly build-log per active project repurposed per channel
   (format, hook, channel, CTA); reusable TEARDOWN template; changelog/"what's new" cadence per brand.
6. Launch copy: Agent Nudge Show HN post + PH tagline/description + X launch thread; JobFilter
   /win-public-work pillar outline + 4 cornerstone briefs + 3 Reels scripts; MazOS first 6 build-in-
   public posts (LinkedIn+X) + newsletter welcome.
7. JobFilter microsite CONTENT SPEC: exact sections, honest trust markers, "Powered by JobFilter"
   placement/wording, and the "what's new" block copy for microsites.
FINAL OUTPUT: a single **BUILD BRIEF** (markdown) that Session 2 can execute from without re-
researching — group by repo, list concrete tasks + the copy/specs each needs. END with open
decisions for Maz + "ready for Session 2 (Sonnet 5, EXECUTE)".
# END SESSION 1/2
```

---

## ════════ SESSION 2 of 2 — EXECUTE (run on SONNET 5) ════════

```text
# PORTFOLIO GROWTH — SESSION 2/2: EXECUTE (run on SONNET 5). Ship code, open PRs, go live.
# INPUT: paste the BUILD BRIEF from Session 1 below this prompt before running.

## COMPACT CORE
Repos owned by manazoid4: JobFilterV1 (Next.js/TS/Supabase, live jobfilter.uk, DeWalt Yellow/Navy/
Black + Barlow, waitlist `source` field, routes /vicinity /vantage /find-jobs /free-tools, has
"What's New" changelog); agent-nudge (TS/Electron/MCP/Windows, MIT OSS, coordination layer, issue #8
launch blocker); mazos-site (portfolio, issues #2/#3) + mazos-ui. Build in the RELEVANT repo; branch
per task; commit clear messages; open a PR mirroring .github/PULL_REQUEST_TEMPLATE.md; drive CI green;
run each repo's lint/build/regression gates; accessible + fast; NEVER fabricate data. Escalate
pricing/cron/irreversible to Maz. JobFilterV1 Vercel deploy FAILS on a PRE-EXISTING hourly-cron Hobby
limit (vercel.json `"0 * * * *"`) — do NOT change unless Maz approves daily `"0 8 * * *"` or Pro.
CHANGELOG RULE (MANDATORY): every shipped change updates JobFilter's "What's New". If agent-nudge or
mazos-site have NO changelog, ADD a lightweight changelog/"what's new" page on their live Vercel
site — same spirit as JobFilter's but distinct layout/name so the 3 sites aren't confusingly
identical. Check for one before building; add if missing.

## SETUP
Confirm the target repos are in this session's scope (add agent-nudge / mazos-site if needed before
touching them). Then execute the BUILD BRIEF pasted below in this priority order.

## PRIORITY QUEUE
1. JobFilter MICROSITE LOOP (highest leverage): slug reservation for jobfilter.uk/{business-slug}
   (+ collision handling); microsite generator UI in dashboard (extend /vicinity + /vantage);
   SSR/edge-cached fast public pages; "Powered by JobFilter" mark + unique ?ref={slug}; referral
   attribution wired to signup source (reuse waitlist `source`); analytics events created→views→
   click-throughs→referred signups. DeWalt palette/type. Add a "what's new" block per the brief.
2. JobFilter SEO surface: /win-public-work pillar + programmatic /trades/{trade} (later /areas/
   {region}) from REAL data (no thin pages), each ending "run a free scan"; wire "Weekly Notice"
   email capture on /find-jobs + /free-tools.
3. Agent Nudge launch assets (its repo): README-as-landing w/ asciinema/GIF demo of a real collision
   → HOLD/REVIEW/CLEAR + 60s quickstart + provider matrix + honest limits; Vercel landing + email
   capture; progress issue #8 (verified Windows release + guided first-run). ADD a changelog page on
   the Vercel site if none exists.
4. MazOS (mazos-site): close #2/#3 — truthful hardened portfolio, GitHub profile README as mini-
   portfolio, consistent identity, portfolio SEO for name + "applied AI engineer UK". ADD a changelog
   page on the Vercel site if none exists.
For EVERY task: update the relevant changelog in the SAME PR; push; open the PR ready-for-review;
drive CI green; leave the pre-existing JobFilter Vercel cron alone unless Maz decided. END with:
what shipped (per repo) + changelog entries added + PR links + open decisions for Maz.
[PASTE SESSION 1 BUILD BRIEF BELOW]
```

---

## Open decisions still awaiting Maz
1. **Vercel cron:** daily fix (`"0 8 * * *"`) or upgrade to Pro? (Blocks a green JobFilter deploy.)
2. **Real KPI targets** to replace the placeholder numbers.
3. **Launch order** confirm (default: MazOS foundations → Agent Nudge launch → JobFilter compound).

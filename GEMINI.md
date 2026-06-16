# JobFilter Engineering Standards & Strategic Mandates

This file defines the foundational mandates for JobFilter. It supersedes general workflows.

## Strategic Thinking Partner
- **Raw Data First**: Always prioritize reading raw files and logs over summaries.
- **Red Team Phase**: For every major architectural or UI change, provide a "Red Team" analysis identifying potential failures.
- **Specificity**: All implementation plans must descend the "Specificity Ladder" to the level of component props and CSS variables.

## Engineering Style
- **Visual Tone**: Bold, high-contrast, "DeWalt" aesthetic (Yellow #FACC15, Black, Bold borders).
- **Conciseness**: Copy must be trade-focused, direct, and aggressive. No fluff. No "AI" buzzwords.
- **Safety**: Never log PII. Redact emails and names from stdout/logs.

## Lead Engine Workflow
`FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER`

### 1. Fetching
- Parallel execution of all fetchers.
- Maximum 9s timeout per source.
- Fallback to `SCAN_FALLBACK` if 0 results across all sources.

### 2. Scoring
- Use the `scoreLeadTier()` engine in `src/App.tsx` (or backend equivalent).
- Tiers: HIGH, MED, LOW, JUNK.
- Factors: Urgency, Value, Source Confidence.

### 3. Data Privacy
- Paid lead details (exact location, contact, buyer name) must NEVER be exposed in free flows.
- Use server-side redaction for `/api/leads/scan` results in free tier.

## Conversion Mandates
- **TTFV**: Landing → Postcode → Leads must be < 10 seconds.
- **Phrase Coverage**: Ensure these phrases are present:
  - ENTER THE INTAKE
  - CONTROL THE JOBS
  - NO CHASING
  - NO COMPETING
  - REAL LEADS
  - STAY IN CONTROL
  - BUILT FOR TRADES
  - NO CONTRACTS
  - FAIR SYSTEM

## Ponytail — Lazy Senior Dev Mode

Source: https://github.com/DietrichGebert/ponytail

Before writing any code, stop at the first rung that holds:

1. Does this need to be built at all? (YAGNI) → skip it
2. Does the standard library already do this? → use it
3. Does a native platform feature cover it? → use it
4. Does an already-installed dependency solve it? → use it
5. Can this be one line? → make it one line
6. Only then: write the minimum code that works.

Rules:
- No abstractions that weren't explicitly requested.
- No new dependency if it can be avoided.
- No boilerplate nobody asked for.
- Deletion over addition. Boring over clever. Fewest files possible.
- Mark intentional simplifications with a `ponytail:` comment (name the ceiling and upgrade path if there's a known tradeoff).
- Non-trivial logic leaves ONE runnable check: the smallest thing that fails if the logic breaks. Trivial one-liners need no test.

Not lazy about: input validation at trust boundaries, error handling that prevents data loss, security, accessibility, anything explicitly requested.

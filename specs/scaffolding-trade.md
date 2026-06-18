# Spec: scaffolding trade key

## Objective
Lead scorer (`leadEngine/scorer.ts`) currently has 8 `TradeKey` values (plumbing, electrical, roofing, building, carpentry, painting, hvac, landscaping) each with a `TRADE_KEYWORDS` high/medium/low keyword set. Scaffolding leads currently fall through to "roofing" (mentions "scaffolding" only as a roofing medium keyword) or get scored with no trade match at all, mis-scoring real scaffolding-trade leads. Add `scaffolding` as its own first-class trade.

## Requirements
1. `TradeKey` type in `leadEngine/types.ts` includes `'scaffolding'`.
2. `TRADE_KEYWORDS` in `leadEngine/scorer.ts` has a `scaffolding` entry with `high`, `medium`, `low` arrays, following the exact shape/style of existing entries (lowercase keyword strings, high = direct trade terms, medium = adjacent/related work, low = other-trade terms that should penalize a mismatch).
3. Existing trades' keyword lists are NOT modified except: remove `'scaffolding'` from `roofing.medium` (now its own trade, avoid double-counting) — only this one removal, nothing else in `roofing`.
4. No changes to scoring math, thresholds, or any function signature in `scorer.ts` — only the `TRADE_KEYWORDS` object and the type addition.
5. No new files, no new exports beyond the type union member.

## Edge cases
- A lead mentioning both "scaffolding" and "roof" should still score reasonably for roofing (roofing.high still has 'roof', 'roofing', etc. — unaffected since we only remove the one duplicate keyword from medium).
- `userTrade === 'scaffolding'` must hit the same code path as every other trade (no special-casing needed — generic lookup in `TRADE_KEYWORDS[userTrade]` already handles any key present).

## Definition of done
- `tsc`/typecheck passes (no type errors from the new union member).
- `TRADE_KEYWORDS.scaffolding` exists with non-empty `high`, `medium`, `low` arrays.
- `roofing.medium` no longer contains `'scaffolding'`; all other roofing keywords unchanged.
- No other trade's keyword arrays touched.
- No other file changed except `leadEngine/types.ts` and `leadEngine/scorer.ts`.

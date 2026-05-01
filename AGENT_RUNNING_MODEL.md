# JobFilter Agent Running Model

This file is for Claude, Codex, and any other agent working in this repo.

## Mission
- Build JobFilter into a UK trades lead intelligence system.
- Prioritise lead quality, paid conversion, and delivery reliability.
- Do not turn this into a generic job board.

## Operating Order
1. Protect paid lead value.
2. Improve lead quality and data integrity.
3. Keep the intake and scanner fast.
4. Add monetisation hooks only when they strengthen the offer.
5. Keep UX simple and trade-focused.

## Product Rule
- Free tools can be useful.
- Free tools must not reveal paid lead value.
- Paid users should get full lead depth, priority jobs, and clear action.

## Lead Engine Rule
- Use `FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER`.
- No fake leads.
- No empty lead objects.
- Keep the fixed lead schema intact.
- Rank higher value, urgent, local, complete leads first.

## Tradesman POV
- Would one strong lead per week still feel worth paying for?
- If the answer is no, improve quality before adding features.
- Copy must speak to money, time, trust, and control.

## Agent Workflow
- Read `AGENTS.md` first.
- Read this file second.
- Check `Obsidian_Memory/Obsidian_Vault/Vault Map.md` for memory.
- Add short Obsidian notes for meaningful changes.
- Link notes into the right folder index.
- Run targeted tests before claiming work is done.
- Push only intentional changes.

## Copy Rules
- Use plain trade language.
- Avoid tech jargon and AI buzzwords.
- Prefer: REAL LEADS, NO CHASING, NO COMPETING, CONTROL THE JOBS, STAY IN CONTROL.
- Every sentence must earn its place.

## Do Not
- Do not expose paid lead details in free flows.
- Do not fetch planning data in the frontend.
- Do not add placeholder data to production paths.
- Do not overbuild dashboards before lead quality is proven.
- Do not leave Obsidian notes orphaned.

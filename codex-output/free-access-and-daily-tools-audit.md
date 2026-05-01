# JobFilter Free Access + Daily Tools Audit

Date: 2026-05-01  
Scope: Home, Pricing, Free Tools, Find Jobs, Vantage, Vicinity, Codex, My Link, Lead intake/list/detail where relevant.  
Method: Source review plus local server/API checks on `http://localhost:3000`. In-app browser backend was unavailable.

## Scenario 1: Can They Get This For Free POV

Answer: **YES**

A tradesman can get meaningful paid value for free with low effort. The clearest leak is the live scanner API and result card: paid copy says buyer/detail/WhatsApp/saved workflow are Pro, but free search results expose buyer, deadline, source confidence, score reasons, status, and official URL in the network response. The UI also displays the buyer when present.

### Exact Issues

| Page | Exact copy / surface | Risk | Fix |
|---|---|---:|---|
| `/find-jobs` | “Free view shows the score and signal. Pro unlocks WhatsApp delivery, saved leads, buyer detail, and full action workflow.” | **High** | Enforce this in data, not copy. Free API must return redacted lead DTO only: title band, trade, outward, value band, urgency band, source name, source confidence band, limited reasons. Remove buyer, URL, deadline, full reasons, status. |
| `/find-jobs` | Buyer card uses `lead.buyer || 'Unlock on Pro'` | **High** | Always show “Unlock on Pro” for buyer in free scanner. Do not render buyer from free response. |
| `/api/leads/search` | Local test returned buyer names, official URLs, deadlines, full reasons, scores: e.g. “London Borough of Waltham Forest”, Contracts Finder notice URL, deadline. | **High** | Add server-side plan gating/redaction. Never rely on frontend hiding. |
| `/free-tools` | “FREE TOOLS FOREVER” + “No catch. Use them before you pay us.” | **Medium** | Change to “Free calculators stay free. Lead detail unlocks on Pro.” Avoid “No catch” next to a limited scanner. |
| `/free-tools` | “LIVE LEAD SCANNER” + “2 scans per week on Free.” | **Medium** | If no quota is enforced, either enforce 2/week server-side or remove the limit claim. |
| `/pricing` | Free plan says “2 scans per week”; Pro says “Unlimited scans”. | **Medium** | Enforce quota, account identity, and rate limit per user/IP. Current visible scanner can be repeatedly used. |
| `/home` | Hero: “sends high-value opportunities to your phone” and “WhatsApp delivery path” before paid section. | **Low** | Add “Pro sends them to WhatsApp” near first WhatsApp claim. |
| `/home` | “Free shows the signal. Pro unlocks full source links, contact signal, WhatsApp alerts, saved leads…” | **Medium** | Good boundary copy, but undermined by API leak. Fix API first. |
| `/my-link` + `/intake/:username` + `/leads` | Free user can create/share intake link, score incoming leads, call/save/ignore leads locally. | **Medium** | Decide whether My Link is free acquisition or paid value. If paid, gate it. If free, position it as a separate free intake tool, not part of Pro saved-lead workflow. |
| `/pricing` Highest | Letterhead pack is clearly paid/invite. | **Low** | Keep as-is. No free leak found. |

### Verdict

Paid value is not protected enough. A free user cannot get the full finished paid workflow, but they can get enough of the action layer to weaken the £49/month reason: buyer names, deadline, official URL via API, score reasons, and local save/call flow through intake.

Priority fix: **server-side redaction and quota enforcement before more copy changes.**

## Scenario 2: Dailytools Test

Overall result: **PARTIAL FAIL**

The tools are visible and usable, but they are basic calculators. Useful for quick checks, not strong enough yet to feel like daily trade business tools.

### Tool Results

| Tool | Pass/Fail | Tradesman POV | Recommended improvement |
|---|---|---|---|
| Quote calculator | **Pass with gaps** | Fast labour + materials + margin output. Useful before giving a rough price. | Add markup vs margin clarity, VAT toggle, contingency, waste allowance, subcontractor line, minimum call-out, and profit shown separately. |
| Job estimator | **Pass with gaps** | Shows yearly cost of wasted hours, miles, and bad visits. Good pain reminder. | Rename to “Time-waster cost calculator”. Add per-visit cost, missed profitable job cost, and “worth quoting?” result. |
| Diesel calculator | **Pass with gaps** | Useful for travel pricing. Uses miles, MPG, diesel price. | Add return trip toggle, van running cost per mile, parking/ULEZ/tolls, and price-per-job output. |
| Live lead scanner | **Fail as free tool boundary** | Useful because it returns real leads. But it leaks too much paid detail and “2 scans/week” is not visibly enforced. | Redact free data, enforce quota, show “unlock detail” consistently. |

### Missing Daily Tools

- Lead-fit checker: budget, urgency, distance, photos, clarity, trade match -> “price / call / bin”.
- Travel-profit checker: job value minus travel time, diesel, parking, day lost.
- Day-rate calculator: desired take-home, overheads, tax buffer, billable days.
- Material markup calculator: material cost, waste, supplier run, markup, VAT.
- Quote follow-up timer: when to chase, what to send, when to stop.
- Bad lead filter: flags tyre-kickers, vague scope, low budget, long distance, no photos.
- Weekly pipeline board: quoted, waiting, won, lost, next action.

## Headline Findings

1. **YES, paid value can be accessed for free** through the scanner API and partially through the UI.
2. **Copy promises a paid boundary that the data layer does not enforce.**
3. **Free tools are visible and usable, but not yet strong enough to be daily business infrastructure.**
4. **The scanner is the best free tool, but also the biggest revenue leak.**

## Exact Risks

- Revenue leak: free users can extract buyer/source/deadline detail instead of upgrading.
- Trust risk: “Pro unlocks buyer detail” is contradicted by the free scanner card/API.
- Abuse risk: “2 scans/week” is advertised but not clearly enforced.
- Positioning risk: “No catch” makes the free tier sound broader than intended.
- Product risk: daily tools are calculators, not yet JobFilter-style decision filters.

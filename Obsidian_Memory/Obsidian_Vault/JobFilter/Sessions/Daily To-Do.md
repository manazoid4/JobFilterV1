# Daily To-Do

## 2026-08-07 — NightlyBuildAgent Run

### Completed
- [x] Trade-specific scoring labels ("EV CHARGER — ELECTRICIAN" not "YOUR TRADE")
- [x] FindJobsPage upgrade nudge: Checkatrade/Bark competitor mention, "no shared auction" copy
- [x] PricingPage: new objection vs Checkatrade/Bark, "NO CARD NEEDED" on all free CTAs, "SCAN FIRST. PAY ONLY IF IT FITS." CTA
- [x] Scan limit message: plain English "Free scans used up. See who to call — unlock for £39/mo."
- [x] PR #446 created, Vercel preview deployed successfully

### Next Run — Top 3 Priorities
1. **WHY? button visibility** — the score reason toggle on lead cards is 9px text and nearly invisible on mobile. Increase to 11px and add a border so it reads as a tappable button.
2. **Mobile unlock prompt** — the `hidden lg:grid` buyer/deadline/unlock panel never shows on mobile. Add a condensed mobile version of the upgrade CTA inside the card body so mobile users see the lock state.
3. **WinStatsBanner empty state** — the banner is silently hidden when wonCount=0. Consider showing a motivational teaser ("Be the first in your area to log a win") as a subtle nudge rather than nothing, which makes the component appear broken.

### Discovered Issues
- Vault files did not exist in repo — this run created the Obsidian_Memory directory structure
- node_modules are not committed (correct) but npm install requires CA cert fix in remote env
- package-lock.json has a diff from npm install — not staged (intentional, avoid committing lockfile changes from proxy-forced reinstall)

---
title: Weekly Agent Run Plan
type: run-script
frequency: weekly
last_updated: 2026-05-24
---

# Weekly Agent Run Plan

Run this every week. Covers Monday through Friday. Each day has a specific agent focus.

---

## Monday: CEO Agent Review

**Time:** 9:00 AM
**Duration:** 20-30 minutes

Steps:
1. Open: `06_Agents/CEO_Agent/prompt.md`
2. Confirm all agent outputs from the past week are present in their folders
3. Read: `PersistentMemory.md` and `Progress.md`
4. Run the CEO Agent prompt
5. Save output to: `06_Agents/CEO_Agent/weekly-review-YYYY-MM-DD.md`
6. Review the output: Are the top 3 priorities clear? Are all 9 agent directives specific?
7. Update `Daily Brief.md` with this week's priorities

CEO Agent reviews all outputs from:
- Product_Specialist (Tuesday last week)
- Sales_Specialist (Wednesday last week)
- UI_Specialist (Thursday last week)
- UX_Specialist (Thursday last week)
- Research_Agent (Friday last week)
- Web_Dev_Agent (daily logs)
- Social_Media_Agent (daily posts)
- Content_Repurposing_Agent (daily content)

---

## Tuesday: Product Specialist

**Time:** 9:00 AM
**Duration:** 20-30 minutes

Steps:
1. Read: CEO Agent directive from Monday review
2. Open: `06_Agents/Product_Specialist/prompt.md`
3. Read: `Product/` folder, `Revenue/` folder, `PersistentMemory.md`
4. Run the prompt
5. Save output to: `06_Agents/Product_Specialist/proposal-YYYY-MM-DD.md`
6. Review: Is the proposal specific? Does it include hypothesis, effort, expected impact, and measurement?

---

## Wednesday: Sales Specialist

**Time:** 9:00 AM
**Duration:** 20-30 minutes

Steps:
1. Read: CEO Agent directive from Monday review
2. Read: Research Agent intel from last Friday
3. Open: `06_Agents/Sales_Specialist/prompt.md`
4. Run the prompt
5. Save output to: `06_Agents/Sales_Specialist/outreach-YYYY-MM-DD.md`
6. Review: 5 messages + 1 objection script? Under 100 words each? Plain English?

---

## Thursday: UI/UX Fix Proposals

**Time:** 9:00 AM (UI), 10:00 AM (UX)
**Duration:** 20-30 minutes each

### UI Specialist (9am)
1. Read: CEO Agent directive, Product Specialist proposal from Tuesday
2. Open: `06_Agents/UI_Specialist/prompt.md`
3. Run the prompt
4. Save output to: `06_Agents/UI_Specialist/ui-review-YYYY-MM-DD.md`
5. Review: 3 specific suggestions with implementation notes?

### UX Specialist (10am)
1. Read: CEO Agent directive, UI Specialist output from this morning
2. Open: `06_Agents/UX_Specialist/prompt.md`
3. Run the prompt
4. Save output to: `06_Agents/UX_Specialist/ux-review-YYYY-MM-DD.md`
5. Review: 2 conversion suggestions + 2 mobile fixes? Specific and measurable?

---

## Friday: Research Agent Competitor Update

**Time:** 9:00 AM
**Duration:** 30-45 minutes

Steps:
1. Read: CEO Agent directive from Monday review
2. Open: `06_Agents/Research_Agent/prompt.md`
3. Check: `Research/` folder for previous intel (avoid repeating findings)
4. Run the prompt
5. Save output to: `06_Agents/Research_Agent/intel-YYYY-MM-DD.md`
6. Review: 3 items with source, finding, implication, and recommended action?

---

## End of Week Review

After Friday, do a quick check:
- [ ] CEO Agent review completed (Monday)
- [ ] Product proposal saved (Tuesday)
- [ ] Sales outreach and objection script saved (Wednesday)
- [ ] UI review saved (Thursday)
- [ ] UX review saved (Thursday)
- [ ] Research intel saved (Friday)
- [ ] Daily agents ran every day (Web Dev, Social Media, Content Repurposing)
- [ ] All outputs meet their success metrics

If anything is missing, note it in: `07_Logs/weekly-review-YYYY-MM-DD.md`

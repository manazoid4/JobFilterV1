# ============================================================
# JobFilter Weekly Agent Run Script
# Runs: Every Monday at 9am (or manually)
# ============================================================

$Date = Get-Date -Format "yyyy-MM-dd"
$Time = Get-Date -Format "HH:mm:ss"
$VaultRoot = "C:\Users\manaz\Desktop\JobFilter\JobFilterV1\Obsidian_Memory\Obsidian_Vault\JobFilter"
$AgentsRoot = "$VaultRoot\06_Agents"
$LogDir = "$VaultRoot\07_Logs"
$LogFile = "$LogDir\weekly-review-$Date.md"

# Ensure log directory exists
if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

Write-Host "============================================================"
Write-Host "JobFilter Weekly Agent Run"
Write-Host "Date: $Date | Time: $Time"
Write-Host "============================================================"

# ---- STEP 1: List all agent folders ----
Write-Host ""
Write-Host "[1/4] Scanning agent folders..."

$AllAgents = @(
    "CEO_Agent",
    "Product_Specialist",
    "Sales_Specialist",
    "Social_Media_Agent",
    "UI_Specialist",
    "UX_Specialist",
    "Web_Dev_Agent",
    "Research_Agent",
    "Content_Repurposing_Agent",
    "Video_Digest_Agent"
)

$AgentStatus = @()

foreach ($Agent in $AllAgents) {
    $AgentPath = "$AgentsRoot\$Agent"
    if (Test-Path $AgentPath) {
        $OutputFiles = Get-ChildItem $AgentPath -Filter "*.md" | Where-Object { $_.Name -ne "agent.md" -and $_.Name -ne "prompt.md" -and $_.Name -ne "schedule.md" }
        $LastOutput = $OutputFiles | Sort-Object LastWriteTime -Descending | Select-Object -First 1
        $LastOutputDate = if ($LastOutput) { $LastOutput.LastWriteTime.ToString("yyyy-MM-dd") } else { "Never" }
        $OutputCount = $OutputFiles.Count

        $AgentStatus += [PSCustomObject]@{
            Agent = $Agent
            Folder = "Found"
            OutputCount = $OutputCount
            LastOutput = $LastOutputDate
        }

        Write-Host "  $Agent : $OutputCount outputs | Last: $LastOutputDate"
    } else {
        $AgentStatus += [PSCustomObject]@{
            Agent = $Agent
            Folder = "MISSING"
            OutputCount = 0
            LastOutput = "N/A"
        }
        Write-Host "  MISSING: $Agent"
    }
}

# ---- STEP 2: Check weekly agents ran ----
Write-Host ""
Write-Host "[2/4] Checking weekly agent output for this week..."

$WeekStart = (Get-Date).AddDays(-7)
$WeeklyAgents = @("CEO_Agent", "Product_Specialist", "Sales_Specialist", "UI_Specialist", "UX_Specialist", "Research_Agent")

foreach ($Agent in $WeeklyAgents) {
    $AgentPath = "$AgentsRoot\$Agent"
    if (Test-Path $AgentPath) {
        $ThisWeekOutputs = Get-ChildItem $AgentPath -Filter "*.md" | Where-Object { 
            $_.LastWriteTime -gt $WeekStart -and 
            $_.Name -ne "agent.md" -and 
            $_.Name -ne "prompt.md" -and 
            $_.Name -ne "schedule.md" 
        }
        if ($ThisWeekOutputs.Count -gt 0) {
            Write-Host "  [OK] $Agent ran this week ($($ThisWeekOutputs.Count) output(s))"
        } else {
            Write-Host "  [MISSING] $Agent has no output from the past 7 days"
        }
    }
}

# ---- STEP 3: Open CEO Agent prompt ----
Write-Host ""
Write-Host "[3/4] CEO Agent prompt location:"
$CEOPrompt = "$AgentsRoot\CEO_Agent\prompt.md"
if (Test-Path $CEOPrompt) {
    Write-Host "  $CEOPrompt"
    Write-Host "  Open this file and run with Claude to produce the weekly review."
} else {
    Write-Host "  MISSING: CEO Agent prompt not found at $CEOPrompt"
}

# ---- STEP 4: Create weekly review log ----
Write-Host ""
Write-Host "[4/4] Creating weekly review log..."

$AgentTableRows = $AgentStatus | ForEach-Object { "| $($_.Agent) | $($_.Folder) | $($_.OutputCount) | $($_.LastOutput) |" }
$AgentTable = $AgentTableRows -join "`n"

$LogContent = @"
---
date: $Date
type: weekly-review-log
---

# Weekly Agent Review Log - $Date

**Run time:** $Time

## Agent Status

| Agent | Folder | Output Count | Last Output |
|---|---|---|---|
$AgentTable

## Weekly Checklist

- [ ] CEO Agent review run (Monday 9am)
- [ ] Product Specialist proposal (Tuesday 9am)
- [ ] Sales Specialist outreach + objection script (Wednesday 9am)
- [ ] UI Specialist 3 suggestions (Thursday 9am)
- [ ] UX Specialist 2 conversion + 2 mobile fixes (Thursday 10am)
- [ ] Research Agent 3 intel items (Friday 9am)
- [ ] Daily agents ran all 7 days

## Priorities This Week

(paste CEO Agent top 3 priorities here after running the CEO review)

1. 
2. 
3. 

## Issues / Notes

(add any blockers or issues here)
"@

Set-Content -Path $LogFile -Value $LogContent -Encoding UTF8
Write-Host "  Log created: $LogFile"

# ---- DONE ----
Write-Host ""
Write-Host "============================================================"
Write-Host "Weekly run script complete."
Write-Host "Next step: Open CEO Agent prompt.md and run with Claude."
Write-Host "CEO Prompt: $CEOPrompt"
Write-Host "Log file: $LogFile"
Write-Host "============================================================"

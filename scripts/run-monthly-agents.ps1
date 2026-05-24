# ============================================================
# JobFilter Monthly Review Script
# Runs: First Monday of each month (or manually)
# ============================================================

$Date = Get-Date -Format "yyyy-MM-dd"
$Month = Get-Date -Format "yyyy-MM"
$Time = Get-Date -Format "HH:mm:ss"
$VaultRoot = "C:\Users\manaz\Desktop\JobFilter\JobFilterV1\Obsidian_Memory\Obsidian_Vault\JobFilter"
$AgentsRoot = "$VaultRoot\06_Agents"
$LogDir = "$VaultRoot\07_Logs"
$MonthlyLog = "$LogDir\monthly-summary-$Month.md"
$AgentPerfLog = "$LogDir\agent-performance-$Date.md"

# Ensure log directory exists
if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

Write-Host "============================================================"
Write-Host "JobFilter Monthly Review Script"
Write-Host "Month: $Month | Date: $Date | Time: $Time"
Write-Host "============================================================"

# ---- STEP 1: Count all agent outputs this month ----
Write-Host ""
Write-Host "[1/5] Counting agent outputs for $Month..."

$MonthStart = [DateTime]"$Month-01"
$AllAgents = @(
    @{Name="CEO_Agent"; Expected=4; Frequency="Weekly"},
    @{Name="Product_Specialist"; Expected=4; Frequency="Weekly"},
    @{Name="Sales_Specialist"; Expected=4; Frequency="Weekly"},
    @{Name="Social_Media_Agent"; Expected=28; Frequency="Daily"},
    @{Name="UI_Specialist"; Expected=4; Frequency="Weekly"},
    @{Name="UX_Specialist"; Expected=4; Frequency="Weekly"},
    @{Name="Web_Dev_Agent"; Expected=28; Frequency="Daily"},
    @{Name="Research_Agent"; Expected=4; Frequency="Weekly"},
    @{Name="Content_Repurposing_Agent"; Expected=28; Frequency="Daily"},
    @{Name="Video_Digest_Agent"; Expected=0; Frequency="On-demand"}
)

$AgentPerformance = @()

foreach ($Agent in $AllAgents) {
    $AgentPath = "$AgentsRoot\$($Agent.Name)"
    if (Test-Path $AgentPath) {
        $MonthOutputs = Get-ChildItem $AgentPath -Filter "*.md" | Where-Object {
            $_.LastWriteTime -ge $MonthStart -and
            $_.Name -ne "agent.md" -and
            $_.Name -ne "prompt.md" -and
            $_.Name -ne "schedule.md"
        }
        $Count = $MonthOutputs.Count
        $Expected = $Agent.Expected
        $Rate = if ($Expected -gt 0) { [math]::Round(($Count / $Expected) * 100) } else { "N/A" }
        $Health = if ($Expected -eq 0) { "On-demand" } elseif ($Count -ge $Expected) { "GREEN" } elseif ($Count -ge ($Expected * 0.7)) { "AMBER" } else { "RED" }

        $AgentPerformance += [PSCustomObject]@{
            Agent = $Agent.Name
            Frequency = $Agent.Frequency
            Expected = $Expected
            Actual = $Count
            Rate = "$Rate%"
            Health = $Health
        }

        Write-Host "  $($Agent.Name): $Count / $Expected outputs | Health: $Health"
    } else {
        Write-Host "  MISSING folder: $($Agent.Name)"
    }
}

# ---- STEP 2: Check site health ----
Write-Host ""
Write-Host "[2/5] Checking site health..."

try {
    $Response = Invoke-WebRequest -Uri "https://jobfilter.uk" -TimeoutSec 10 -UseBasicParsing
    $SiteHealth = "UP (HTTP $($Response.StatusCode))"
    Write-Host "  jobfilter.uk: $SiteHealth"
} catch {
    $SiteHealth = "DOWN - $($_.Exception.Message)"
    Write-Host "  jobfilter.uk: $SiteHealth"
}

# ---- STEP 3: Summarise vault notes this month ----
Write-Host ""
Write-Host "[3/5] Counting vault notes created this month..."

$NewVaultNotes = Get-ChildItem $VaultRoot -Recurse -Filter "*.md" | Where-Object {
    $_.LastWriteTime -ge $MonthStart -and
    $_.FullName -notmatch "06_Agents" -and
    $_.FullName -notmatch "07_Logs"
}
Write-Host "  New/updated vault notes: $($NewVaultNotes.Count)"

# ---- STEP 4: Create agent performance log ----
Write-Host ""
Write-Host "[4/5] Creating agent performance log..."

$PerfTableRows = $AgentPerformance | ForEach-Object { "| $($_.Agent) | $($_.Frequency) | $($_.Expected) | $($_.Actual) | $($_.Rate) | $($_.Health) |" }
$PerfTable = $PerfTableRows -join "`n"

$PerfContent = @"
---
date: $Date
month: $Month
type: agent-performance-review
---

# Agent Performance Review - $Month

**Generated:** $Date at $Time

## Agent Output Summary

| Agent | Frequency | Expected | Actual | Rate | Health |
|---|---|---|---|---|---|
$PerfTable

## Site Health
$SiteHealth

## Vault Activity
New/updated notes this month: $($NewVaultNotes.Count)

## Action Items

(review each RED or AMBER agent and decide: fix prompt, fix trigger, or pause)

- [ ] Review RED agents
- [ ] Review AMBER agents
- [ ] Update prompts for consistently low-quality output
- [ ] Check if any agents need schedule changes
"@

Set-Content -Path $AgentPerfLog -Value $PerfContent -Encoding UTF8
Write-Host "  Performance log: $AgentPerfLog"

# ---- STEP 5: Create monthly summary template ----
Write-Host ""
Write-Host "[5/5] Creating monthly summary template..."

$SummaryContent = @"
---
date: $Date
month: $Month
type: monthly-summary
---

# Monthly Summary - $Month

**Completed:** $Date

## MRR This Month

Current MRR: (fill in)
Previous month MRR: (fill in)
Change: (fill in)
Gap to 10k GBP target: (fill in)

## Top 3 Wins

1.
2.
3.

## Top 3 Problems / Blockers

1.
2.
3.

## Top 3 Priorities for Next Month

1.
2.
3.

## Agent System Health

Overall: (GREEN / AMBER / RED)

See full breakdown: $AgentPerfLog

## Decisions Made This Month

(list any major decisions -- product, pricing, sales, hiring, etc.)

## Notes

(anything else worth capturing)
"@

Set-Content -Path $MonthlyLog -Value $SummaryContent -Encoding UTF8
Write-Host "  Monthly summary template: $MonthlyLog"

# ---- DONE ----
Write-Host ""
Write-Host "============================================================"
Write-Host "Monthly review script complete."
Write-Host "Next steps:"
Write-Host "  1. Fill in the monthly summary: $MonthlyLog"
Write-Host "  2. Review agent performance: $AgentPerfLog"
Write-Host "  3. Update PersistentMemory.md with any decisions"
Write-Host "  4. Run vault cleanup (see run-monthly-agents.md step 1)"
Write-Host "============================================================"

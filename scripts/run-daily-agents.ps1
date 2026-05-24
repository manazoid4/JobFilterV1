# ============================================================
# JobFilter Daily Agent Run Script
# Runs: Every day at 6am (or manually)
# ============================================================

$Date = Get-Date -Format "yyyy-MM-dd"
$Time = Get-Date -Format "HH:mm:ss"
$VaultRoot = "C:\Users\manaz\Desktop\JobFilter\JobFilterV1\Obsidian_Memory\Obsidian_Vault\JobFilter"
$LogDir = "$VaultRoot\07_Logs"
$LogFile = "$LogDir\daily-run-$Date.md"

# Ensure log directory exists
if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
    Write-Host "Created log directory: $LogDir"
}

Write-Host "============================================================"
Write-Host "JobFilter Daily Agent Run"
Write-Host "Date: $Date | Time: $Time"
Write-Host "============================================================"

# ---- STEP 1: Check site health ----
Write-Host ""
Write-Host "[1/5] Checking jobfilter.uk..."

$SiteStatus = "UNKNOWN"
$HttpCode = "N/A"
$ResponseTime = "N/A"

try {
    $StartTime = Get-Date
    $Response = Invoke-WebRequest -Uri "https://jobfilter.uk" -TimeoutSec 10 -UseBasicParsing
    $EndTime = Get-Date
    $HttpCode = $Response.StatusCode
    $ResponseTime = [math]::Round(($EndTime - $StartTime).TotalMilliseconds) 

    if ($HttpCode -eq 200) {
        $SiteStatus = "UP"
        Write-Host "  Site status: UP (HTTP $HttpCode, ${ResponseTime}ms)"
    } else {
        $SiteStatus = "DEGRADED"
        Write-Host "  Site status: DEGRADED (HTTP $HttpCode)"
        Write-Host "  WARNING: Unexpected status code. Check Vercel dashboard."
    }
} catch {
    $SiteStatus = "DOWN"
    Write-Host "  Site status: DOWN - $($_.Exception.Message)"
    Write-Host "  CRITICAL: Site is unreachable. Run Web Dev Agent P0 protocol immediately."
}

# ---- STEP 2: Open daily agent prompt files ----
Write-Host ""
Write-Host "[2/5] Opening daily agent prompt files..."

$DailyAgents = @(
    "$VaultRoot\06_Agents\Web_Dev_Agent\prompt.md",
    "$VaultRoot\06_Agents\Social_Media_Agent\prompt.md",
    "$VaultRoot\06_Agents\Content_Repurposing_Agent\prompt.md"
)

foreach ($AgentPrompt in $DailyAgents) {
    if (Test-Path $AgentPrompt) {
        Write-Host "  Found: $AgentPrompt"
        # Uncomment to auto-open in default editor:
        # Start-Process $AgentPrompt
    } else {
        Write-Host "  MISSING: $AgentPrompt"
    }
}

# ---- STEP 3: List agent output folders ----
Write-Host ""
Write-Host "[3/5] Daily agent output folders:"

$AgentFolders = @("Web_Dev_Agent", "Social_Media_Agent", "Content_Repurposing_Agent")
foreach ($Folder in $AgentFolders) {
    $FolderPath = "$VaultRoot\06_Agents\$Folder"
    $OutputCount = (Get-ChildItem $FolderPath -Filter "*.md" | Where-Object { $_.Name -ne "agent.md" -and $_.Name -ne "prompt.md" -and $_.Name -ne "schedule.md" }).Count
    Write-Host "  $Folder : $OutputCount output files"
}

# ---- STEP 4: Check for recent vault notes ----
Write-Host ""
Write-Host "[4/5] Checking for vault notes updated in last 24 hours..."

$Yesterday = (Get-Date).AddDays(-1)
$RecentNotes = Get-ChildItem $VaultRoot -Recurse -Filter "*.md" | Where-Object { $_.LastWriteTime -gt $Yesterday -and $_.FullName -notmatch "06_Agents" -and $_.FullName -notmatch "07_Logs" }

if ($RecentNotes.Count -gt 0) {
    Write-Host "  Found $($RecentNotes.Count) recently updated notes:"
    foreach ($Note in $RecentNotes) {
        Write-Host "    - $($Note.Name)"
    }
} else {
    Write-Host "  No vault notes updated in the last 24 hours."
    Write-Host "  Content agents will draw from older vault notes."
}

# ---- STEP 5: Create daily log file ----
Write-Host ""
Write-Host "[5/5] Creating daily log file..."

$RecentNotesList = if ($RecentNotes.Count -gt 0) { ($RecentNotes | ForEach-Object { "- $($_.Name)" }) -join "`n" } else { "- None" }

$LogContent = @"
---
date: $Date
type: daily-run-log
site_status: $SiteStatus
---

# Daily Run Log - $Date

**Run time:** $Time
**Site status:** $SiteStatus (HTTP $HttpCode, ${ResponseTime}ms)

## Checklist

- [x] Site health check completed
- [ ] Web Dev Agent run (open prompt.md and run manually)
- [ ] Social Media Agent run (open prompt.md and run manually)
- [ ] Content Repurposing Agent run (open prompt.md and run manually)
- [ ] Vault notes reviewed
- [ ] Posts scheduled

## Recent Vault Notes (last 24h)

$RecentNotesList

## Issues / Notes

(add any issues or blockers here)

## Agent Prompt Paths

- Web Dev: $VaultRoot\06_Agents\Web_Dev_Agent\prompt.md
- Social Media: $VaultRoot\06_Agents\Social_Media_Agent\prompt.md
- Content Repurposing: $VaultRoot\06_Agents\Content_Repurposing_Agent\prompt.md
"@

Set-Content -Path $LogFile -Value $LogContent -Encoding UTF8
Write-Host "  Log created: $LogFile"

# ---- DONE ----
Write-Host ""
Write-Host "============================================================"
Write-Host "Daily run script complete."
Write-Host "Next step: Open each agent prompt.md and run with Claude."
Write-Host "Log file: $LogFile"
Write-Host "============================================================"

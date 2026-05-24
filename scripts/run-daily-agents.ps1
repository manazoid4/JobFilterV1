#!/usr/bin/env pwsh
# Run: pwsh scripts/run-daily-agents.ps1

$Date = Get-Date -Format "yyyy-MM-dd"
$Time = Get-Date -Format "HH:mm"
$LogFile = "Obsidian_Memory/Obsidian_Vault/JobFilter/07_Logs/daily-run-$Date.md"
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

$Log = "---`ndate: $Date`ntype: daily-agent-run`n---`n`n# Daily Agent Run — $Date $Time`n`n"

Write-Host "JobFilter Daily Agents — $Date $Time"

# Site health
try {
    $r = Invoke-WebRequest -Uri "https://jobfilter.uk" -TimeoutSec 10 -UseBasicParsing
    Write-Host "[OK] jobfilter.uk → $($r.StatusCode)"
    $Log += "## Site Health`n- jobfilter.uk → HTTP $($r.StatusCode)`n"
} catch {
    Write-Host "[FAIL] jobfilter.uk → $($_.Exception.Message)"
    $Log += "## Site Health`n- jobfilter.uk → ERROR`n"
}

# API health
try {
    $a = Invoke-WebRequest -Uri "https://jobfilter.uk/api/waitlist/count" -TimeoutSec 10 -UseBasicParsing
    Write-Host "[OK] /api/waitlist/count → $($a.StatusCode)"
    $Log += "- /api/waitlist/count → HTTP $($a.StatusCode)`n"
} catch {
    Write-Host "[FAIL] /api/waitlist/count"
    $Log += "- /api/waitlist/count → ERROR`n"
}

# Daily agents checklist
$Log += "`n## Daily Agents`n"
foreach ($Agent in @("Social_Media_Agent", "Content_Repurposing_Agent", "Web_Dev_Agent")) {
    Write-Host "[ ] $Agent"
    $Log += "- [ ] $Agent`n"
}

$Log += "`n---`n_run-daily-agents.ps1_`n"
New-Item -ItemType Directory -Force -Path (Split-Path $LogFile) | Out-Null
Set-Content -Path $LogFile -Value $Log -Encoding UTF8
Write-Host "Log → $LogFile"

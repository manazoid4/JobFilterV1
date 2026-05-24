#!/usr/bin/env pwsh
# Run: pwsh scripts/run-monthly-agents.ps1

$Date = Get-Date -Format "yyyy-MM-dd"
$Month = Get-Date -Format "yyyy-MM"
$LogFile = "Obsidian_Memory/Obsidian_Vault/JobFilter/07_Logs/monthly-run-$Month.md"
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

$Log = "---`ndate: $Date`nmonth: $Month`ntype: monthly-agent-run`n---`n`n# Monthly Agent Run — $Month`n`n"

Write-Host "JobFilter Monthly Agents — $Month"

$Tasks = @(
    "Full vault cleanup (archive old changelogs + sessions)",
    "Product roadmap refresh",
    "Pricing review vs competitors",
    "Content calendar — next 30 days",
    "Website audit (all routes, broken links, perf)",
    "Agent performance review",
    "Territory report (filled vs open)",
    "Revenue review (MRR, churn, LTV from Stripe)"
)

$Log += "## Monthly Tasks`n`n"
foreach ($T in $Tasks) {
    Write-Host "[ ] $T"
    $Log += "- [ ] $T`n"
}

$Log += "`n---`n_run-monthly-agents.ps1_`n"
New-Item -ItemType Directory -Force -Path (Split-Path $LogFile) | Out-Null
Set-Content -Path $LogFile -Value $Log -Encoding UTF8
Write-Host "Log → $LogFile"

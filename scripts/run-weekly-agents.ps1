#!/usr/bin/env pwsh
# Run: pwsh scripts/run-weekly-agents.ps1

$Date = Get-Date -Format "yyyy-MM-dd"
$Week = Get-Date -UFormat "%Y-W%V"
$LogFile = "Obsidian_Memory/Obsidian_Vault/JobFilter/07_Logs/weekly-run-$Date.md"
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

$Log = "---`ndate: $Date`nweek: $Week`ntype: weekly-agent-run`n---`n`n# Weekly Agent Run — $Week`n`n"

Write-Host "JobFilter Weekly Agents — $Week"

$Agents = @(
    @{ Name="CEO_Agent";          Day="Monday";    Task="Review all outputs, set weekly priorities" },
    @{ Name="Product_Specialist"; Day="Tuesday";   Task="Propose 1 product improvement or experiment" },
    @{ Name="Sales_Specialist";   Day="Wednesday"; Task="5 outreach messages + 1 objection script" },
    @{ Name="UI_Specialist";      Day="Thursday";  Task="3 UI improvement suggestions" },
    @{ Name="UX_Specialist";      Day="Thursday";  Task="Conversion + mobile fix proposals" },
    @{ Name="Research_Agent";     Day="Friday";    Task="3 competitor/market intelligence items" }
)

$Log += "## Weekly Agents`n`n| Agent | Day | Task | Done |`n|-------|-----|------|------|`n"
foreach ($A in $Agents) {
    Write-Host "[ ] $($A.Name) — $($A.Day)"
    $Log += "| $($A.Name) | $($A.Day) | $($A.Task) | [ ] |`n"
}

$Log += "`n---`n_run-weekly-agents.ps1_`n"
New-Item -ItemType Directory -Force -Path (Split-Path $LogFile) | Out-Null
Set-Content -Path $LogFile -Value $Log -Encoding UTF8
Write-Host "Log → $LogFile"

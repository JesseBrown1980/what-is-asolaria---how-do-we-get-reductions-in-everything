# ═══════════════════════════════════════════════════════════════════════════
# Asolaria IFEO USB Driver Default Installer
# ═══════════════════════════════════════════════════════════════════════════
# W113 Tier-1.5 enforcement: system-wide Windows interception via
# Image File Execution Options registry. Catches ANY process (not just PS)
# trying to launch diskpart/format/etc — Windows itself routes through wrapper.
#
# GATE: operator-witness REQUIRED. This writes HKLM:\ registry keys.
# This script is DESCRIPTOR-ONLY by default — does NOT execute without -Confirm.
#
# Authority: ASOLARIA-HERMES-ARCHITECT-CORRECTION-PID-2026-05-19
# Wave: W113-TOOL-ADVISOR-WAVE-2026-05-21
# ═══════════════════════════════════════════════════════════════════════════

param(
    [switch]$Confirm,
    [switch]$Uninstall,
    [switch]$DryRun = $true
)

$ErrorActionPreference = 'Stop'
$WrapperExe = 'C:\asolaria-acer\tools\usb-raw\asolaria-cmd-wrapper.exe'  # to be built; see below
$IFEORoot = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options'

$TargetExes = @(
    'diskpart.exe',
    'format.com'
    # NB: We do NOT intercept Format-Volume / Clear-Disk via IFEO — those are PowerShell cmdlets,
    # handled by the $profile wrapper (asolaria-tool-advisor-profile.ps1).
    # IFEO catches raw .exe launches that bypass the shell wrapper.
)

if (-not $Confirm) {
    Write-Host "═══════ IFEO DESCRIPTOR-ONLY (DRY RUN) ═══════" -ForegroundColor Cyan
    Write-Host "Would write registry keys (NOT executed without -Confirm):"
    foreach ($exe in $TargetExes) {
        Write-Host "  $IFEORoot\$exe\Debugger = '$WrapperExe'"
    }
    Write-Host ""
    Write-Host "To install: run with -Confirm. Requires admin elevation."
    Write-Host "To remove:  run with -Uninstall -Confirm. Removes only Asolaria-owned entries."
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Cyan
    exit 0
}

# Real install requires admin + operator-witness ceremony
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    throw "Admin elevation required for IFEO write."
}

throw "Install requires apex cosign + operator-witness ceremony per W113 gates. Cosign chain seq=191 active to 2026-06-03. Re-run after ceremony."

# ═══════════════════════════════════════════════════════════════════════════
# Future ceremony block (commented out — only enable after quintuple cosign):
# ═══════════════════════════════════════════════════════════════════════════
# foreach ($exe in $TargetExes) {
#     $key = "$IFEORoot\$exe"
#     if (-not (Test-Path $key)) { New-Item -Path $key -Force | Out-Null }
#     Set-ItemProperty -Path $key -Name 'Debugger' -Value $WrapperExe -Type String
#     Write-Host "  Set $key\Debugger = $WrapperExe" -ForegroundColor Green
# }

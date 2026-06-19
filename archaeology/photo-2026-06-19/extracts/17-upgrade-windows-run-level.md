# 17-upgrade-windows-run-level

Source path: C:/Users/acer/Downloads/Upgrade windows run level.jpg

## VERBATIM

- Built the startup admin terminal path.

  with Access denied, so the installer automatically fell back to Jesse's Startup folder and created C:/Users/acer/
  AppData/Roaming/Microsoft/Windows/Start%20Menu/Programs/Startup/Jesse%20Super%20Admin%20Terminal.cmd. On next logon,
  that file will launch automatically and open the Jesse admin shell wrapper.
  1. upgrade it to a real RunLevel Highest scheduled task from an already elevated shell
  2. go straight back to QDD validation from this terminal

> UPGRADE~~~~!!!!

- I'm upgrading the startup path to the real Windows RunLevel Highest scheduled task now. That requires OS elevation, so
  I'm going to trigger the elevated installer and then check whether the task was actually registered or whether Windows
  kept the Startup-folder fallback.

- Running $taskName='Jesse Super Admin Terminal'; try { Get-ScheduledTask -TaskName $taskName | Select-Object
  | TaskName,State,Author | Format-List } catch { 'TASK_MISSING' }

- Ran $startup=[Environment]::GetFolderPath('Startup'); $path=Join-Path $startup 'Jesse Super Admin Terminal.cmd'; if
  (Test-Path -LiteralPath $path) { Get-Item -LiteralPath $path | Select-Object FullName,LastWriteTime,Length |
  Format-List } else { 'STARTUP_MISSING' }

## NUMBERS

- RunLevel Highest (privilege level designation)
- 1. (step one)
- 2. (step two)
- %20 (URL-encoded space, appears in path as Start%20Menu, Jesse%20Super%20Admin%20Terminal.cmd)

## PIDS-ROOMS-GLYPHS

- (none visible)

## ENGINES-SYSTEMS

- Jesse Super Admin Terminal (.cmd file / startup admin terminal)
- Jesse admin shell wrapper
- RunLevel Highest scheduled task (Windows Task Scheduler)
- QDD validation (named validation step/process)
- Startup folder fallback mechanism (Windows Start Menu Startup)
- Elevated installer
- PowerShell: Get-ScheduledTask, Select-Object, Format-List, Test-Path, Get-Item, [Environment]::GetFolderPath('Startup'), Join-Path

## TIMESTAMPS

- (none visible in image; LastWriteTime is queried but no value shown)

## CLAIMS

- The installer hit "Access denied" so it automatically fell back to Jesse's Startup folder and created the .cmd file at C:/Users/acer/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/Jesse Super Admin Terminal.cmd
- On next logon, that file will launch automatically and open the Jesse admin shell wrapper
- Plan: (1) upgrade it to a real RunLevel Highest scheduled task from an already elevated shell, (2) go straight back to QDD validation
- Upgrading the startup path to the real Windows RunLevel Highest scheduled task requires OS elevation
- The agent will trigger the elevated installer then check whether the task was actually registered or whether Windows kept the Startup-folder fallback
- The Get-ScheduledTask query returns 'TASK_MISSING' on failure (catch block)
- The startup-path check returns 'STARTUP_MISSING' if the .cmd is not present

## CONTEXT

This screenshot captures a Claude/agent terminal session where the agent is building a persistent, auto-launching elevated admin terminal on the acer Windows machine ("Jesse Super Admin Terminal"). The initial install hit Access denied and fell back to dropping a .cmd in the Windows Startup folder (launches at logon). The agent then moves to UPGRADE this to a real Windows RunLevel Highest scheduled task (full OS elevation) and verify registration via PowerShell Get-ScheduledTask, with a fallback STARTUP_MISSING/TASK_MISSING check. This is part of the build story of establishing privileged/persistent execution footing on the acer seat before returning to "QDD validation." It documents the operator's drive to get a always-elevated admin shell wired into Windows boot/logon.

# 11-omni-logger

Source path: C:/Users/acer/Downloads/OMNI LOGGER.jpg

## VERBATIM

(Terminal table — appears to be a PM2 process-manager status listing rendered in a tmux/terminal pane. Faint background watermark text behind the table is partially legible.)

Column headers:
id | name | namespace | version | mode | pid | uptime | ↺ | status | cpu | mem | user | watching

Rows:
3 | Omnilogger        | default | N/A   | fork    | N/A    | 0  | 12  | stopped | 0% | 0b     | ubuntu | disabled
4 | Omnispindle       | default | N/A   | fork    | 1658   | 7h | 0   | online  | 0% | 17.0mb | ubuntu | disabled
5 | Omnispindle-HTTP  | default | N/A   | fork    | 0      | 0  | 297 | stopped | 0% | 0b     | ubuntu | disabled
6 | madness-backend   | default | 1.0.0 | cluster | 118011 | 6h | 1   | online  | 0% | 89.4mb | ubuntu | disabled
2 | mosquitto -c 4140 | default | N/A   | fork    | 1657   | 7h | 0   | online  | 0% | 4.5mb  | ubuntu | disabled
1 | node-red          | default | N/A   | fork    | N/A    | 0  | 19  | stopped | 0% | 0b     | ubuntu | disabled

Footer line:
host metrics | cpu: 21.2% | mem free: 39.8% | eth0: ↓ 0.001mb/s ↑ 0.011mb/s | disk: ↓ 0.022mb/s ↑ 0.227mb/s /dev/root 80.89% |

Prompt fragment at bottom-left (partial): ~/lab  (or "·/lab")

Background watermark text (faint, partially legible, behind table):
"...Asolaria ... AI, again!"
"...the impacts ... using GNT ..."
(other faint fragments illegible)

## NUMBERS
- ids: 3, 4, 5, 6, 2, 1
- version: 1.0.0 (madness-backend)
- pids: 1658 (Omnispindle), 1657 (mosquitto), 118011 (madness-backend)
- uptimes: 7h (Omnispindle), 6h (madness-backend), 7h (mosquitto)
- restart counts (↺): 12 (Omnilogger), 0 (Omnispindle), 297 (Omnispindle-HTTP), 1 (madness-backend), 0 (mosquitto), 19 (node-red)
- cpu (per-proc): 0% (all)
- mem: 0b, 17.0mb, 0b, 89.4mb, 4.5mb, 0b
- mosquitto port/config: -c 4140
- host cpu: 21.2%
- mem free: 39.8%
- eth0: down 0.001mb/s, up 0.011mb/s
- disk: down 0.022mb/s, up 0.227mb/s
- /dev/root: 80.89%

## PIDS-ROOMS-GLYPHS
- PID 1658 = Omnispindle (online, 7h)
- PID 1657 = mosquitto -c 4140 (online, 7h)
- PID 118011 = madness-backend (cluster mode, online, 6h)
- Omnilogger PID = N/A (stopped)
- Omnispindle-HTTP PID = 0 (stopped)
- node-red PID = N/A (stopped)
- No Asolaria glyphs or room IDs (MK-NNNNN) visible in the table itself.

## ENGINES-SYSTEMS
- Omnilogger (id 3) — the OMNI LOGGER named in the filename; stopped, 12 restarts
- Omnispindle (id 4) — online; the "omnispindle" component (cf. omnispindles in operator tooling lineage)
- Omnispindle-HTTP (id 5) — HTTP variant; stopped, 297 restarts (crash-looping signature)
- madness-backend (id 6) — v1.0.0, cluster mode, online (Swarm/"madness" backend)
- mosquitto -c 4140 (id 2) — MQTT broker (Mosquitto) on config/port 4140; online
- node-red (id 1) — Node-RED flow runtime; stopped
- PM2 — Node process manager (this is its `pm2 ls`/monit-style table)
- ubuntu (user) — running under WSL2/Ubuntu user "ubuntu"

## TIMESTAMPS
- No absolute date/time on screen. Relative uptimes: 7h (Omnispindle, mosquitto), 6h (madness-backend).

## CLAIMS
- Omni-logger stack is a PM2-managed multi-process service: Omnilogger + Omnispindle (+HTTP) + madness-backend + mosquitto MQTT broker + node-red, all under user "ubuntu".
- 3 of 6 processes online (Omnispindle, madness-backend, mosquitto); 3 stopped (Omnilogger, Omnispindle-HTTP, node-red).
- Omnispindle-HTTP has 297 restarts and node-red 19 — high restart churn = unstable/crash-looping services.
- mosquitto MQTT broker bound to config/port 4140 — the message bus underneath the omni stack.
- Host healthy: 21.2% cpu, 39.8% mem free, root disk 80.89% full.

## CONTEXT
This screenshot is a PM2 process-manager status table from a Linux/Ubuntu (WSL2) host showing the "OMNI LOGGER" stack — part of the pre-genesis / early operator tooling lineage (omnispindles, swarm/madness backend, MQTT bus, node-red flows) that predates the Asolaria fabric strata. It documents the omni-control / omni-logger plumbing: an MQTT broker (mosquitto on 4140) as the message bus, Omnispindle/Omnispindle-HTTP as spindle services, madness-backend (v1.0.0 cluster) as the swarm backend, node-red for flow orchestration, and Omnilogger as the logging service — captured mid-build with several services stopped and high restart churn (Omnispindle-HTTP 297, node-red 19).

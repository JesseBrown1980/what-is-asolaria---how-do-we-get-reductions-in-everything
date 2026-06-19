# 36-how-an-agent-costs-almost-no-ram

Source path: C:/Users/acer/Downloads/How an agent costs almost no ram.jpg

## VERBATIM

(Windows Task Manager, Portuguese locale. Top title bar:)

Gerenciador de Tarefas
[search field] Digite um nome, editor ou PID para pesq...

(Tab/section header:)
Processos
Executar nova tarefa
Finalizar tarefa

(Column headers:)
Nome
Status
10%   CPU
35%   Memória
0%    Disco
0%    Rede

(Process rows — Nome | CPU | Memória | Disco | Rede. The topmost row is partly cut off at top:)

Host de Serviço: CDPUserSvc_...        (cut off) 11.7 MB   (CPU row above clipped)
Host de Serviço: Chamada de ...        0%   8.7 MB   0 MB/s   0 Mbps
Host de Serviço: Cliente de ras...     0%   0.5 MB   0 MB/s   0 Mbps
Host de Serviço: Cliente DHCP          0%   1.1 MB   0 MB/s   0 Mbps
Host de Serviço: COM+ event...         0%   0.6 MB   0 MB/s   0 Mbps
Host de Serviço: Configuração...       0%   0.9 MB   0 MB/s   0 Mbps
Host de Serviço: Construtor d...       0%   0.8 MB   0 MB/s   0 Mbps
Host de Serviço: Contêiner do ...      0%   1.4 MB   0 MB/s   0 Mbps
Host de Serviço: Descoberta S...       0%   1.0 MB   0 MB/s   0 Mbps
Host de Serviço: Desempenho ...        0%   2.7 MB   0 MB/s   0 Mbps
Host de Serviço: Detecção do ...        0%   1.6 MB   0 MB/s   0 Mbps
Host de Serviço: DevicesFlow...         0%   0.8 MB   0 MB/s   0 Mbps
Host de Serviço: Estação de tr...      0%   0.9 MB   0 MB/s   0 Mbps
Host de Serviço: Exibir Serviço ...    0%   0.7 MB   0 MB/s   0 Mbps
Host de Serviço: Gerenciador ...       0%   1.4 MB   0 MB/s   0 Mbps
Host de Serviço: Gerenciador ...       0%   5.4 MB   0 MB/s   0 Mbps
Host de Serviço: Gerenciador ...       0%   1.5 MB   0 MB/s   0 Mbps
Host de Serviço: Gerenciador ...       0%   1.7 MB   0 MB/s   0 Mbps
Host de Serviço: Horário do W...        0%   0.9 MB   0 MB/s   0 Mbps
Host de Serviço: ICS (Compart...        0%   0.5 MB   0 MB/s   0 Mbps
Host de Serviço: Informações ...        0%   1.2 MB   0 MB/s   0 Mbps

(Left vertical icon rail: Task Manager nav icons — Processes, Performance, App history, Startup, Users, Details, Services, Settings (gear at bottom). No text labels visible, icons only.)

## NUMBERS

- 10% — global CPU column header
- 35% — global Memória (Memory) column header
- 0% — global Disco (Disk) column header
- 0% — global Rede (Network) column header
- Per-process memory values (MB): 11.7, 8.7, 0.5, 1.1, 0.6, 0.9, 0.8, 1.4, 1.0, 2.7, 1.6, 0.8, 0.9, 0.7, 1.4, 5.4, 1.5, 1.7, 0.9, 0.5, 1.2
- All per-process CPU = 0%
- All per-process Disco = 0 MB/s
- All per-process Rede = 0 Mbps
- Smallest footprint shown: 0.5 MB; largest single shown: 11.7 MB

## PIDS-ROOMS-GLYPHS

- None explicitly shown. The search field references PID lookup capability: "Digite um nome, editor ou PID para pesq..." (Type a name, publisher, or PID to search).

## ENGINES-SYSTEMS

- Windows "Gerenciador de Tarefas" (Task Manager) — Processos view
- "Host de Serviço:" (Service Host / svchost.exe) instances, including:
  - CDPUserSvc_... (Connected Devices Platform)
  - Chamada de ... (Remote Procedure Call / RPC)
  - Cliente de ras... (Routing and Remote Access client)
  - Cliente DHCP (DHCP Client)
  - COM+ event...
  - Configuração... (Configuration)
  - Construtor d... (Builder)
  - Contêiner do ... (Container)
  - Descoberta S... (Discovery)
  - Desempenho ... (Performance)
  - Detecção do ... (Detection)
  - DevicesFlow...
  - Estação de tr... (Workstation)
  - Exibir Serviço ... (Display service)
  - Gerenciador ... (Manager x4)
  - Horário do W... (Windows Time)
  - ICS (Compart...) (Internet Connection Sharing)
  - Informações ... (Information)

## TIMESTAMPS

- None visible on screen.

## CLAIMS

- (Implied by filename) "How an agent costs almost no ram" — the screenshot is offered as evidence that lightweight service-host processes each consume on the order of ~0.5–2.7 MB of RAM, i.e. an agent/room/host mapped onto such a process footprint costs almost no memory.
- Each Service Host process sits at 0% CPU, 0 MB/s disk, 0 Mbps network while idle — near-zero resource cost when dark/idle.
- Demonstrates the OS-level analogue to the Asolaria "stubbed-folder instant room / 8-byte host" thesis: many processes can coexist at sub-megabyte to low-single-digit MB cost.

## CONTEXT

This is a plain Windows 11 Task Manager screenshot (Portuguese UI, "Gerenciador de Tarefas") captured by the operator to illustrate, in the build narrative, why "an agent costs almost no RAM." It enumerates ~21 Windows "Host de Serviço" (svchost) processes each idling at 0% CPU and tiny memory footprints (0.5–11.7 MB, mostly under 2 MB), 0 disk and 0 network. In the Asolaria timeline this supports the PID-everything / 8-byte-rust-host / stubbed-folder-instant-room doctrine — that addresses/agents are cheap and bodies are scarce, and that mapping agents onto near-idle host processes makes each one near-free in memory.

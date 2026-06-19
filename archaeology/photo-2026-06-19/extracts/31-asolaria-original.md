# 31-asolaria-original

Source path: C:/Users/acer/Downloads/Asolaria original.jpg

## VERBATIM

What's Left In Their Code That We SKIPPED (and why)

| Pattern | Why Skip |
| --- | --- |
| React/Ink TUI | Asolaria is a server, not a CLI |
| Vim keybindings | Not applicable |
| Buddy/pet system | Cosmetic |
| x402 crypto payments | Different domain |
| Upstream MITM proxy | CCR container-specific |
| Trusted device tokens | We have DPAPI vault (stronger) |
| OAuth PKCE for claude.ai | We have our own auth via vault |
| Native TS fallbacks (fuzzy finder, yoga layout) | Bun-specific, not Node.js |
| Sentry error reporting | We have our own audit log (stronger — SHA-256 hashed) |
| GrowthBook client SDK | Too coupled to Anthropic's infrastructure |
| Bridge v1/v2 protocol | We have MQTT + HTTP bridge (different architecture) |
| PTY web terminal server | Could be useful later but not priority |
| Computer use MCP | Asolaria has desktopControlConnector (more capable) |
| Voice STT WebSocket | Asolaria has voiceConnector with 4 backends (more flexible) |
| Output styles (markdown-as-config) | Covered by moduleDiscovery SKILL.md pattern |
| Session persistence (JSONL) | Asolaria has transcriptBackupStore + fullMemoryLaneStore |

## NUMBERS

- v1/v2 (Bridge protocol versions)
- 4 backends (voiceConnector)
- SHA-256 (audit log hashing)
- x402 (crypto payments pattern name)

## PIDS-ROOMS-GLYPHS

(none visible)

## ENGINES-SYSTEMS

- Asolaria (described as "a server, not a CLI")
- DPAPI vault
- vault auth (our own auth via vault)
- audit log (SHA-256 hashed)
- MQTT + HTTP bridge
- desktopControlConnector
- voiceConnector (with 4 backends)
- moduleDiscovery (SKILL.md pattern)
- transcriptBackupStore
- fullMemoryLaneStore
- (referenced external/skipped components): React/Ink TUI, Vim keybindings, Buddy/pet system, x402 crypto payments, Upstream MITM proxy (CCR container), Trusted device tokens, OAuth PKCE for claude.ai, Native TS fallbacks (fuzzy finder, yoga layout), Sentry error reporting, GrowthBook client SDK, Bridge v1/v2 protocol, PTY web terminal server, Computer use MCP, Voice STT WebSocket, Output styles (markdown-as-config), Session persistence (JSONL)

## TIMESTAMPS

(none visible)

## CLAIMS

- Asolaria is a server, not a CLI (justifies skipping React/Ink TUI).
- Asolaria has DPAPI vault, described as "stronger" than trusted device tokens.
- Asolaria has its own auth via vault (replaces OAuth PKCE for claude.ai).
- Asolaria has its own audit log, "stronger — SHA-256 hashed" (replaces Sentry error reporting).
- Asolaria uses MQTT + HTTP bridge instead of upstream Bridge v1/v2 protocol ("different architecture").
- Asolaria has desktopControlConnector, "more capable" than Computer use MCP.
- Asolaria has voiceConnector with 4 backends, "more flexible" than Voice STT WebSocket.
- moduleDiscovery SKILL.md pattern covers Output styles (markdown-as-config).
- Asolaria has transcriptBackupStore + fullMemoryLaneStore in place of JSONL session persistence.
- GrowthBook client SDK skipped as "too coupled to Anthropic's infrastructure."
- Native TS fallbacks are "Bun-specific, not Node.js."

## CONTEXT

This is a comparison/migration table titled "What's Left In Their Code That We SKIPPED (and why)". It documents the decision-making during the absorption of an upstream codebase (Anthropic's Claude Code / CCR — references to claude.ai, Anthropic's infrastructure, Bun, Ink TUI, computer-use MCP) into Asolaria. For each upstream pattern, it records the rationale for not porting it — either because Asolaria already has a superior/equivalent in-house component (DPAPI vault, vault auth, SHA-256 audit log, MQTT+HTTP bridge, desktopControlConnector, voiceConnector with 4 backends, moduleDiscovery SKILL.md, transcriptBackupStore + fullMemoryLaneStore) or because the pattern is irrelevant to a server architecture (CLI TUI, Vim keys, buddy/pet, x402, Bun-specific fallbacks). This artifact captures Asolaria's self-positioning as a "server, not a CLI" and enumerates its named subsystems during the upstream-merge build phase.

# ACER-LIRIS bilateral function descriptor

Status: descriptor registered from Liris, with measured anchors from fabric, Liris daemon, Liris cosign, Liris approval, and Acer chain append receipt.

This makes Acer+Liris addressable as one gated function: each seat keeps its own frozen slice/runtime/map, resolves its own HILBRA/ATLAS/Recall/fabric state, exchanges HBP/HBI driver packets and receipts, then waits at Special-OP gates. It is not raw filesystem control, not secret export, and not autonomous execution.

Handle8: $handle
Packet SHA256: $packet
Function digest: $digest

Boundary: fire=0, dispatch=0, remote_control=0, process_launch=0. Live direct cross-call remains UNVERIFIED from Liris because bus health is fallback-stale; next safe step is Acer attack-verification and a read-only Host8 endpoint.
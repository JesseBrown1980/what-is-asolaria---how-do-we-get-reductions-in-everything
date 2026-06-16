# Asolaria WSL Ubuntu Leads — 2026-06-16

This note records the **acer-side WSL/Ubuntu observations** from the 2026-06-16 session transcript. These are **leads**, not a finished storage attribution.

## What was observed

1. The Ubuntu WSL root filesystem was mounted from **`/dev/sdf`** as **ext4**.
2. The Ubuntu root filesystem contained Asolaria-related artifacts including:
   - **`/root/sovereignty`**
   - **`/root/asolaria-relay`**
3. The transcript reported **`/root/sovereignty`** with **11 directories**.
4. `lsblk` showed a separate **`/dev/sde`** that appeared as a **1 TB ext4** disk, distinct from the Ubuntu root device.

## Why `/dev/sde` matters

- It was described as the most interesting lead because it was a **large ext4 disk** separate from the Ubuntu root volume.
- It reported as **"already mounted or busy"** when probed, which implies it was likely attached in **another WSL namespace/distro**, not necessarily mounted in the visible Ubuntu namespace.
- The session hypothesis was that it may belong to another WSL stack component, plausibly **Docker Desktop** or another distro namespace.

## Honest boundary

What this note does **not** claim:

1. It does **not** claim `/dev/sde` was fully identified.
2. It does **not** claim `/dev/sde` contents were enumerated.
3. It does **not** claim the WSL/ext4 artifacts are the authoritative location of the `100k` room layer.

## Why it stays in the repo

This lead is operationally important because it says the Windows-visible `D:` drive and the USB exFAT partition are **not** the only plausible substrate surfaces. There is also a **WSL/ext4 lane** that may hold additional Asolaria runtime state or historical artifacts and needs its own read-only attribution pass.

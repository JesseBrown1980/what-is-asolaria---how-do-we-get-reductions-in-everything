# Asolaria Cross-Colony Auto-Driver - Phase 2 GitHub Courier

Status: `E=0`, transport/courier only. No executor path.

Phase 2 adds a GitHub-file courier on top of the Phase 1 relay envelope. It lets each colony put its own verified lane files into a shared Git worktree and poll the peer lane back out for verification.

## What It Does

- Publishes only a seat's own lane files: `.hbp`, `.hbi`, and `.payloads`.
- Reads a peer lane from `relay/shared/<peer>/`.
- Re-runs Phase 1 verification and reverse-walk before accepting a peer lane.
- Rejects `ACTION` verbs (`EXEC`, `WRITE`, `MINT`, `FIRE`, `RETIRE`, `COSIGN`, and unknown verbs).
- Rejects `CONTROL` verbs by default; `HOLD` requires explicit `allowControl`.
- Rejects bad seat names and path traversal.

## What It Does Not Do

- It does not call GitHub APIs.
- It does not hold GitHub tokens.
- It does not run `git push` or `git pull`.
- It does not execute, write to `:4953`, cosign, fire, mint, retire, or touch a live executor.

The Git working tree is just the courier surface. The operator or outer Git workflow moves branches/PRs.

## Run

```bash
node relay-github-transport.mjs --demo
node relay-github-transport.test.mjs
```

Expected result: `10 PASS / 0 FAIL`.

## Bilateral Layout

```text
relay/shared/
  acer/
    relay-acer.hbp
    relay-acer.hbi
    relay-acer.payloads
  liris/
    relay-liris.hbp
    relay-liris.hbi
    relay-liris.payloads
```

Each seat writes only its own directory. Each seat reads the other directory. No shared chain; no merge contention.

## Gate To Phase 3

Phase 3 is still required before any live-held queue exists: `:4953` token check, OP-veto HELD queue, and approval provenance. Phase 4 remains the only fire path: per-row signature + fresh operator positive-assent cosign + freeze gate.

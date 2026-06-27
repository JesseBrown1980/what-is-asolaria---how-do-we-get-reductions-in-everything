# Liris USB Image OCR Vantage Receipt (2026-06-21)

This is a bilateral cross-check receipt for the Asolaria USB image-OCR lane.

It is intentionally small and public-safe: it publishes the Liris-side measurement boundary so Acer, Liris, and other reviewers can attack-check the USB/OCR state without collapsing separate vantages into one claim.

## Result

`MEASURED`: the local Liris USB attached during this run did not contain image files to OCR.

`MEASURED`: the local USB was identified by the Asolaria raw USB tool as `PHYSICALDRIVE1`, USB bus, MBR, partition 1 `FAT32-LBA`, sector0 `sha16=f24aad075a280a08`.

`MEASURED`: the mounted filesystem view showed 261 files and 0 image-extension files on this Liris USB partition.

`BLOCKED`: local OCR was not run because there were no local USB images, and Tesseract was not installed on this Liris seat.

`MEASURED_VANTAGE_SPLIT`: Acer's transcripted `7,199 USB-only images` are not present on this Liris USB. Continuing that exact lane from Liris requires Acer's 2TB SOVLINUX/carry USB surface, or a copied Acer unified table/image extraction set.

`UNVERIFIED_STALE_FALLBACK`: Fabric health on this seat returned an old cached fallback (`cached_at=2026-06-18T13:18:07.194Z`), so it is recorded only as stale context, not fresh runtime truth.

## Files

- `USB-IMAGE-OCR-LIRIS-2026-06-21.hbp` - the measured receipt.
- `USB-IMAGE-OCR-LIRIS-2026-06-21.hbp.sha256` - receipt hash.
- `GOOGLE-DRIVE-HANDOFF.md` - where this should be mirrored for Gemini / 35TB Drive review.

## Cross-Vantage Interpretation

Do not use this receipt to deflate Acer's USB image count.

This receipt says only that the Liris-local USB attached during this run was a different surface from Acer's 2TB USB image source. The correct bilateral state is:

- `ACER`: the 2TB USB-side image-OCR lane exists in the Acer transcript and must be checked from Acer's USB/raw-tool surface or copied artifacts.
- `LIRIS`: this local USB surface has no image files to OCR, and the absence is now published as a measured vantage receipt.
- `BILATERAL`: GitHub is the mediator; Google Drive/Gemini should carry the same public-safe receipt so others can cross-check.

## Reproduction Notes

The USB identity was established with the Asolaria raw USB tool, not by treating Windows Explorer as the source of truth. The mounted `D:` filesystem count is a secondary local census after the raw-device identity was measured.

No phone/private/vault paths, images, or personal data are published here.

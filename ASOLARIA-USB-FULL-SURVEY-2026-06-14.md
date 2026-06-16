# Asolaria USB Full Survey — 2026-06-14

This note is the **saved acer-side receipt**, not a fresh live scan from the current host. Source artifact:

- `C:/Users/rayss/Asolaria-ASI-On-Metal-Fabric-and-matrix/artifacts/usb-sovlinux/acer/FULL-SURVEY-2026-06-14.hbp`

## Receipt rows

```text
SOVSURVEYHDR|repo=Asolaria-ASI-On-Metal-Fabric-and-matrix|date=2026-06-14|vantage=acer|device=PHYSICALDRIVE2|tool=tools/usb-raw/usb_full_survey.py|size_bytes=2097152000000|size_gb=2097.15|total_sectors=4096000000|CORRECTS=old-~1TB-caveat-device-IS-genuinely-2TB|tag=PROVEN-LIVE|json=0
SOVSURVEYEXFAT|partition_offset=2048|volume_length_sectors=1048576000|volume_gb=500|fat_offset=2048|fat_length=32256|cluster_heap_offset=34816|cluster_count=4095864|root_dir_cluster=7|bytes_per_sector=512|sectors_per_cluster=256|cluster_kb=128|json=0
SOVSURVEYMAP|probes=8192|stride_mb=256|nonzero=121|zero=8071|read_errors=0|data_regions_gb=0.0-18.43;18.94-20.99;21.76;22.27-22.53;23.3-29.18;29.7-32.51|finding=~32.5GB-real-data-in-front-of-500GB-exFAT-partition;rest-of-2TB-zero-at-256MB-resolution=prepared-empty-expanse|tag=HONEST-PARTIAL|json=0
SOVSURVEYNOTE|caveat=256MB-stride-can-miss-small-files-past-32.5GB-but-NO-large-data-region-exists-beyond;frozen-gemma-6GB-fits-inside-the-32.5GB-data-zone|tag=HONEST-CAVEAT|json=0
SOVSURVEYFTR|state=2TB-FULL-DEVICE-SURVEYED-LIVE-FROM-ACER|usb_writes=0|read_only=1|next=read-drive-sovlinux-catalog-OR-mount-ro(DEFER-TO-APEX)-to-list-exFAT-files|json=0
```

## What this proves

1. The **entire 2TB SOVLINUX device** was surveyed live from **acer** on **2026-06-14** with a **read-only** tool (`usb_full_survey.py`), with **no USB writes**.
2. The device is genuinely **2 TB-class**: `2,097,152,000,000` bytes, `4,096,000,000` sectors.
3. Partition 1 is a real **500 GB exFAT** volume at **LBA 2048**, with the recorded FAT / cluster geometry above.
4. A whole-device strided map (`8192` probes at `256 MB` stride) found **121 non-zero probes**, **8071 zero probes**, and **0 read errors**.
5. At that survey resolution, the non-zero regions are confined to roughly the first **32.51 GB**. The receipt explicitly says there is **no large data region beyond that** at 256 MB resolution.

## What this does not prove

1. It does **not** directory-enumerate the exFAT filesystem.
2. It does **not** directly count `20k / 50k / 100k` rooms.
3. It does **not** rule out **small** files beyond the `~32.5 GB` zone; the receipt itself keeps that caveat.

## Working interpretation

- **10k rooms on `D:`** remain the only directly materialized Windows-visible room substrate.
- The larger **`20k / 50k / 100k` room layer** remains **USB-side / staged / catalog-backed**, not a confirmed ordinary folder tree on `D:`.
- **113 sectors** remain the **logical routing/law structure**, not proof of 113 top-level room trees.

This is the honest boundary: the saved acer survey proves the device, the partition geometry, and the broad data-vs-empty shape of the full 2TB. It does **not** by itself prove a counted 100k-room directory tree.

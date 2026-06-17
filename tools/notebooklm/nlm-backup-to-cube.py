#!/usr/bin/env python3

from __future__ import annotations

import hashlib
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path


SENSITIVE_PATH = re.compile(r"(cookie|auth|token|secret|credential)", re.IGNORECASE)
TEXT_EXTENSIONS = {
    ".md",
    ".txt",
    ".json",
    ".csv",
    ".tsv",
    ".html",
    ".htm",
    ".xml",
}
TOKEN_RE = re.compile(r"[a-z0-9][a-z0-9_-]{1,63}")


def usage() -> None:
    print(
        "Usage: python tools/notebooklm/nlm-backup-to-cube.py <backup-root> [--out <receipt.hbp>]",
        file=sys.stderr,
    )
    raise SystemExit(1)


def parse_args(argv: list[str]) -> tuple[Path, Path | None]:
    if not argv:
        usage()
    backup_root: Path | None = None
    out_path: Path | None = None
    i = 0
    while i < len(argv):
        arg = argv[i]
        if backup_root is None and not arg.startswith("--"):
            backup_root = Path(arg).resolve()
            i += 1
            continue
        if arg == "--out":
            if i + 1 >= len(argv):
                usage()
            out_path = Path(argv[i + 1]).resolve()
            i += 2
            continue
        usage()
    if backup_root is None:
        usage()
    return backup_root, out_path


def sha_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha_text(text: str) -> str:
    return sha_bytes(text.encode("utf-8"))


def sha_file(file_path: Path) -> str:
    h = hashlib.sha256()
    with file_path.open("rb") as handle:
        while True:
            chunk = handle.read(1024 * 1024)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()


def q(value: object) -> str:
    return (
        str("" if value is None else value)
        .replace("%", "%25")
        .replace("|", "%7C")
        .replace("{", "%7B")
        .replace("}", "%7D")
        .replace("\r", "%0D")
        .replace("\n", "%0A")
    )


def row(tag: str, fields: dict[str, object]) -> str:
    parts = [tag]
    for key, value in fields.items():
        parts.append(f"{key}={q(value)}")
    return "|".join(parts)


def walk_files(root_dir: Path) -> list[Path]:
    files: list[Path] = []
    for current_root, _dirs, names in os.walk(root_dir):
        current_path = Path(current_root)
        for name in names:
            file_path = current_path / name
            if file_path.is_file():
                files.append(file_path)
    files.sort(key=lambda p: str(p).lower())
    return files


def find_notebook_roots(backup_root: Path) -> list[Path]:
    if (backup_root / "metadata.json").exists():
        return [backup_root]
    roots: list[Path] = []
    for current_root, dirs, names in os.walk(backup_root):
        current_path = Path(current_root)
        if "metadata.json" in names:
            roots.append(current_path)
            dirs[:] = []
    roots.sort(key=lambda p: str(p).lower())
    return roots


def detect_lane(relative_path: str) -> str:
    first = relative_path.split("/", 1)[0] if relative_path else ""
    if first in {"sources", "artifacts", "notes", "mindmaps"}:
        return first
    return "other"


def detect_kind(relative_path: str) -> str:
    ext = Path(relative_path).suffix.lower()
    lookup = {
        ".md": "markdown",
        ".txt": "text",
        ".json": "json",
        ".html": "html",
        ".htm": "html",
        ".csv": "csv",
        ".tsv": "tsv",
        ".pdf": "pdf",
        ".png": "png",
        ".jpg": "jpeg",
        ".jpeg": "jpeg",
        ".gif": "gif",
        ".webp": "webp",
        ".mp4": "mp4",
        ".m4a": "m4a",
        ".wav": "wav",
        ".mp3": "mp3",
        ".pptx": "pptx",
    }
    if ext in lookup:
        return lookup[ext]
    return ext[1:] if ext else "bin"


def is_text_like(relative_path: str) -> bool:
    return Path(relative_path).suffix.lower() in TEXT_EXTENSIONS


def tokenize_text(text: str) -> list[str]:
    return TOKEN_RE.findall(text.lower())


def top_terms(term_counts: dict[str, int], limit: int = 8) -> list[tuple[str, int]]:
    return sorted(term_counts.items(), key=lambda item: (-item[1], item[0]))[:limit]


def iso_mtime(timestamp: float) -> str:
    return (
        datetime.fromtimestamp(timestamp, tz=timezone.utc)
        .isoformat(timespec="milliseconds")
        .replace("+00:00", "Z")
    )


def collect_notebook(notebook_root: Path, global_glyphs: dict[str, int]) -> dict[str, object]:
    notebook_name = notebook_root.name
    metadata_path = notebook_root / "metadata.json"
    metadata_sha256 = sha_file(metadata_path)
    files: list[dict[str, object]] = []
    cubes: list[dict[str, object]] = []
    skips: list[dict[str, object]] = []
    lane_counts = {
        "sources": 0,
        "artifacts": 0,
        "notes": 0,
        "mindmaps": 0,
        "other": 0,
    }
    total_bytes = 0

    for file_path in walk_files(notebook_root):
        relative_path = file_path.relative_to(notebook_root).as_posix()
        if relative_path == "metadata.json":
            continue
        if SENSITIVE_PATH.search(relative_path):
            skips.append({"relative_path": relative_path, "reason": "sensitive_path"})
            continue

        stat = file_path.stat()
        lane = detect_lane(relative_path)
        lane_counts[lane] += 1
        total_bytes += stat.st_size
        file_sha = sha_file(file_path)

        files.append(
            {
                "notebook_id": notebook_name,
                "relative_path": relative_path,
                "lane": lane,
                "kind": detect_kind(relative_path),
                "ext": file_path.suffix.lower(),
                "bytes": stat.st_size,
                "mtime": iso_mtime(stat.st_mtime),
                "sha256": file_sha,
            }
        )

        if not is_text_like(relative_path):
            continue
        try:
            text = file_path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        tokens = tokenize_text(text)
        if not tokens:
            continue
        term_counts: dict[str, int] = {}
        for token in tokens:
            term_counts[token] = term_counts.get(token, 0) + 1
        for term, count in term_counts.items():
            global_glyphs[term] = global_glyphs.get(term, 0) + count
        top_glyph_pairs = top_terms(term_counts, 8)
        quant_seed = f"{relative_path}\n{' '.join(tokens)}"
        quant_full = sha_text(quant_seed)
        cubes.append(
            {
                "notebook_id": notebook_name,
                "lane": lane,
                "rel": relative_path,
                "host_handle8": file_sha[:16],
                "quant8": quant_full[:8],
                "cube10": quant_full[:20],
                "bytes": stat.st_size,
                "tokens": len(tokens),
                "distinct_terms": len(term_counts),
                "top_glyphs": ",".join(
                    f"{term}:{count}" for term, count in top_glyph_pairs
                ),
            }
        )

    return {
        "notebook_root": notebook_root.as_posix(),
        "notebook_id": notebook_name,
        "title": notebook_name,
        "metadata_sha256": metadata_sha256,
        "lane_counts": lane_counts,
        "bytes": total_bytes,
        "files": files,
        "cubes": cubes,
        "skips": skips,
    }


def build_output(backup_root: Path) -> tuple[str, str]:
    if not backup_root.exists() or not backup_root.is_dir():
        raise RuntimeError(f"Backup root not found or not a directory: {backup_root}")

    notebook_roots = find_notebook_roots(backup_root)
    if not notebook_roots:
        raise RuntimeError(f"No metadata.json notebook roots found under: {backup_root}")

    captured_at = iso_mtime(datetime.now(tz=timezone.utc).timestamp())
    output_rows: list[str] = []
    digest_rows: list[str] = []
    global_glyphs: dict[str, int] = {}

    header_fields = {
        "proof": "NOTEBOOKLM-BACKUP-TO-CUBE-INGEST",
        "backup_root": backup_root.as_posix(),
        "notebook_roots": len(notebook_roots),
        "mode": "referential+glyph-cube",
        "skips_sensitive_paths": 1,
        "json": 0,
    }
    output_rows.append(row("NLMHDR", {"captured_at": captured_at, **header_fields}))
    digest_rows.append(row("NLMHDR", header_fields))

    total_bytes = 0
    total_files = 0
    total_cubes = 0
    total_skips = 0

    for notebook_root in notebook_roots:
        notebook = collect_notebook(notebook_root, global_glyphs)
        total_bytes += int(notebook["bytes"])
        total_files += len(notebook["files"])
        total_cubes += len(notebook["cubes"])
        total_skips += len(notebook["skips"])

        notebook_row = row(
            "NLMNOTEBOOK",
            {
                "notebook_id": notebook["notebook_id"],
                "title": notebook["title"],
                "root": notebook["notebook_root"],
                "metadata_sha256": notebook["metadata_sha256"],
                "sources": notebook["lane_counts"]["sources"],
                "artifacts": notebook["lane_counts"]["artifacts"],
                "notes": notebook["lane_counts"]["notes"],
                "mindmaps": notebook["lane_counts"]["mindmaps"],
                "other": notebook["lane_counts"]["other"],
                "bytes": notebook["bytes"],
                "json": 0,
            },
        )
        output_rows.append(notebook_row)
        digest_rows.append(notebook_row)

        for file_row_data in notebook["files"]:
            file_row = row(
                "NLMFILE",
                {
                    "notebook_id": file_row_data["notebook_id"],
                    "lane": file_row_data["lane"],
                    "kind": file_row_data["kind"],
                    "ext": file_row_data["ext"],
                    "rel": file_row_data["relative_path"],
                    "bytes": file_row_data["bytes"],
                    "mtime": file_row_data["mtime"],
                    "sha256": file_row_data["sha256"],
                    "json": 0,
                },
            )
            output_rows.append(file_row)
            digest_rows.append(file_row)

        for cube_row_data in notebook["cubes"]:
            cube_row = row(
                "NLMCUBE",
                {
                    "notebook_id": cube_row_data["notebook_id"],
                    "lane": cube_row_data["lane"],
                    "rel": cube_row_data["rel"],
                    "host_handle8": cube_row_data["host_handle8"],
                    "quant8": cube_row_data["quant8"],
                    "cube10": cube_row_data["cube10"],
                    "bytes": cube_row_data["bytes"],
                    "tokens": cube_row_data["tokens"],
                    "distinct_terms": cube_row_data["distinct_terms"],
                    "top_glyphs": cube_row_data["top_glyphs"],
                    "json": 0,
                },
            )
            output_rows.append(cube_row)
            digest_rows.append(cube_row)

        for skip_row_data in notebook["skips"]:
            skip_row = row(
                "NLMSKIP",
                {
                    "notebook_id": notebook["notebook_id"],
                    "reason": skip_row_data["reason"],
                    "rel": skip_row_data["relative_path"],
                    "json": 0,
                },
            )
            output_rows.append(skip_row)
            digest_rows.append(skip_row)

    top_glyph_rows = sorted(global_glyphs.items(), key=lambda item: (-item[1], item[0]))[:32]
    for term, count in top_glyph_rows:
        glyph_row = row("NLMGLYPH", {"term": term, "count": count, "json": 0})
        output_rows.append(glyph_row)
        digest_rows.append(glyph_row)

    content_sha256 = sha_text("\n".join(digest_rows) + "\n")
    output_rows.append(
        row(
            "NLMFOOT",
            {
                "notebooks": len(notebook_roots),
                "files": total_files,
                "text_cubes": total_cubes,
                "bytes": total_bytes,
                "distinct_glyphs": len(global_glyphs),
                "skipped_sensitive": total_skips,
                "content_sha256": content_sha256,
                "json": 0,
            },
        )
    )
    text = "\n".join(output_rows) + "\n"
    return text, content_sha256


def main() -> int:
    backup_root, out_path = parse_args(sys.argv[1:])
    text, content_sha256 = build_output(backup_root)
    if out_path is not None:
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(text, encoding="utf-8")
        out_path.with_name(out_path.name + ".sha256").write_text(
            f"{content_sha256}  {out_path.name}\n",
            encoding="utf-8",
        )
        sys.stdout.write(f"{out_path}\n")
        return 0
    sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1)

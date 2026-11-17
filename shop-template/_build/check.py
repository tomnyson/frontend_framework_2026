"""Verify the template: no <script>, every local link and #fragment resolves.

Usage:  python3 _build/check.py   (exit code 1 on any problem)
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HREF = re.compile(r'(?:href|action|formaction)="([^"]*)"')
ID = re.compile(r'\sid="([^"]+)"')
EXTERNAL = ("http://", "https://", "mailto:", "tel:")


def html_files() -> list[Path]:
    return sorted(p for p in ROOT.rglob("*.html") if "_build" not in p.parts)


def ids_in(path: Path, cache: dict) -> set[str]:
    if path not in cache:
        cache[path] = set(ID.findall(path.read_text(encoding="utf-8")))
    return cache[path]


def check_file(path: Path, cache: dict) -> list[str]:
    text = path.read_text(encoding="utf-8")
    rel = path.relative_to(ROOT)
    problems = [f"{rel}: contains <script>"] if "<script" in text.lower() else []
    for href in HREF.findall(text):
        if href in ("#", "") or href.startswith(EXTERNAL):
            continue
        file_part, _, fragment = href.partition("#")
        target = (path.parent / file_part).resolve() if file_part else path
        if not target.is_file():
            problems.append(f"{rel}: broken link {href}")
            continue
        if fragment and fragment not in ids_in(target, cache):
            problems.append(f"{rel}: missing #{fragment} in {target.relative_to(ROOT)}")
    return problems


def main() -> int:
    cache: dict = {}
    files = html_files()
    problems = [p for f in files for p in check_file(f, cache)]
    for problem in sorted(set(problems)):
        sys.stdout.write(problem + "\n")
    sys.stdout.write(f"checked {len(files)} files, {len(set(problems))} problem(s)\n")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())

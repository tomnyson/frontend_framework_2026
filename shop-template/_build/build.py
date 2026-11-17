"""Build static storefront pages from _build/pages/*.html.

Usage:  python3 _build/build.py

Each page file starts with a front-matter block:
    ---
    title: Tiêu đề trang
    description: Mô tả SEO
    nav: products | rewards | warranty | b2b | blog | none
    css: shop, pages
    ---
followed by the <main> body. Tokens expanded inside the body:
    {{cards:0-8}}       product cards PRODUCTS[0:8]
    {{posts:0-3}}       blog cards POSTS[0:3]
    {{breadcrumb:A>a.html|B}}
Output is plain HTML written next to index.html (no JavaScript).
"""

import re
import sys
from pathlib import Path

from layout import FOOTER, head, header, render_breadcrumb, render_cards, render_posts

ROOT = Path(__file__).resolve().parent.parent
PAGES_DIR = Path(__file__).resolve().parent / "pages"
TOKEN = re.compile(r"\{\{(cards|posts|breadcrumb):([^}]+)\}\}")
RENDERERS = {"cards": render_cards, "posts": render_posts, "breadcrumb": render_breadcrumb}


def parse_page(text: str, name: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        raise ValueError(f"{name}: missing front matter")
    _, meta_block, body = text.split("---\n", 2)
    meta = {}
    for line in meta_block.strip().splitlines():
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip()
    for required in ("title", "description", "nav"):
        if required not in meta:
            raise ValueError(f"{name}: front matter needs '{required}'")
    return meta, body


def expand_tokens(body: str) -> str:
    return TOKEN.sub(lambda m: RENDERERS[m.group(1)](m.group(2).strip()), body)


def build_page(path: Path) -> str:
    meta, body = parse_page(path.read_text(encoding="utf-8"), path.name)
    css = tuple(c.strip() for c in meta.get("css", "").split(",") if c.strip())
    return (
        head(meta["title"], meta["description"], css)
        + header(meta["nav"])
        + "\n  <main>\n"
        + expand_tokens(body).rstrip()
        + "\n  </main>\n"
        + FOOTER
    )


def main() -> int:
    pages = sorted(PAGES_DIR.glob("*.html"))
    if not pages:
        sys.stderr.write(f"No pages found in {PAGES_DIR}\n")
        return 1
    for page in pages:
        (ROOT / page.name).write_text(build_page(page), encoding="utf-8")
        sys.stdout.write(f"built {page.name}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())

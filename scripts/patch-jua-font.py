#!/usr/bin/env python3
"""Add the glyphs Jua is missing to public/Jua-regular.woff2.

Jua covers ASCII plus Korean and nothing else: no macron vowels, no curly
single quotes, no middle dot, no ellipsis, no dashes beyond the hyphen. Every
one of those characters appears in the site copy, and the browser silently
swapped in Arial for each of them -- so "Pōwhiri", "Ōtara" and every "I'm" in
the team bios rendered in a different typeface from the words around them.

This draws the missing marks in Jua's own weight and proportions, reusing the
font's existing outlines wherever one already exists (the curly quotes are
Jua's own quotedblleft/right, which are single marks in this design; the
middle dot and ellipsis are its period; the dashes match its hyphen).

Run after replacing or re-subsetting the font:

    pip install fonttools brotli
    python scripts/patch-jua-font.py public/Jua-regular.woff2

Jua is licensed under the OFL, which permits modified versions.
"""

import sys
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont

K = 0.5522847498  # circle-to-bezier constant

# Vertical placement, measured against Jua's own proportions: x-height 480,
# the tittle on 'i' occupies 573-701, cap height 708.
LC_BAR = (600.0, 688.0)
UC_BAR = (728.0, 816.0)
HYPHEN_BAR = (336.0, 469.0)  # matches Jua's own hyphen

MACRONS = [
    (0x0101, "a", "amacron", LC_BAR),
    (0x0113, "e", "emacron", LC_BAR),
    (0x012B, "i", "imacron", LC_BAR),  # drawn on a dotless stem
    (0x014D, "o", "omacron", LC_BAR),
    (0x016B, "u", "umacron", LC_BAR),
    (0x0100, "A", "Amacron", UC_BAR),
    (0x0112, "E", "Emacron", UC_BAR),
    (0x012A, "I", "Imacron", UC_BAR),
    (0x014C, "O", "Omacron", UC_BAR),
    (0x016A, "U", "Umacron", UC_BAR),
]


def pill(pen, x0, x1, y0, y1):
    """A horizontal bar with semicircular ends, drawn as cubics."""
    r = (y1 - y0) / 2.0
    cy = (y0 + y1) / 2.0
    xl, xr = x0 + r, x1 - r  # centres of the end caps
    pen.moveTo((xl, y0))
    pen.lineTo((xr, y0))
    pen.curveTo((xr + r * K, y0), (x1, cy - r * K), (x1, cy))
    pen.curveTo((x1, cy + r * K), (xr + r * K, y1), (xr, y1))
    pen.lineTo((xl, y1))
    pen.curveTo((xl - r * K, y1), (x0, cy + r * K), (x0, cy))
    pen.curveTo((x0, cy - r * K), (xl - r * K, y0), (xl, y0))
    pen.closePath()


def split_contours(recording):
    """Split a RecordingPen's value into per-contour chunks."""
    chunks, current = [], []
    for op, args in recording.value:
        current.append((op, args))
        if op in ("closePath", "endPath"):
            chunks.append(current)
            current = []
    return chunks


def contour_ymax(contour):
    ys = [p[1] for _, args in contour for p in args if isinstance(p, tuple)]
    return max(ys) if ys else 0


def replay(pen, contours):
    for contour in contours:
        for op, args in contour:
            getattr(pen, op)(*args)


def patch(path):
    font = TTFont(path)
    glyphset = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    glyf = font["glyf"]

    glyphs = {}
    metrics = {}
    mapping = {}

    def outline(char):
        name = cmap[ord(char)]
        recording = RecordingPen()
        glyphset[name].draw(recording)
        bounds = BoundsPen(glyphset)
        glyphset[name].draw(bounds)
        return split_contours(recording), bounds.bounds, hmtx[name][0]

    def add(name, codepoint, glyph, advance, lsb):
        glyphs[name] = glyph
        metrics[name] = (advance, int(round(lsb)))
        if codepoint is not None:
            mapping[codepoint] = name

    # --- Macron vowels: ā ē ī ō ū and their capitals ------------------------
    for codepoint, base, name, (y0, y1) in MACRONS:
        contours, (xmin, _, xmax, _), advance = outline(base)

        if name == "imacron":
            # Drop the tittle; a macron replaces it, as precomposed ī expects.
            contours = [c for c in contours if contour_ymax(c) < 520]
            xmin, xmax = 40.0, 167.0  # the stem, ignoring the removed dot

        width = min(max((xmax - xmin) * 0.62, 170.0), 340.0)
        centre = (xmin + xmax) / 2.0
        bar = (centre - width / 2.0, centre + width / 2.0)

        tt_pen = TTGlyphPen(None)
        pen = Cu2QuPen(tt_pen, max_err=0.5)
        replay(pen, contours)
        pill(pen, bar[0], bar[1], y0, y1)
        add(name, codepoint, tt_pen.glyph(), advance, min(xmin, bar[0]))

    # A combining macron too, in case any copy arrives decomposed.
    tt_pen = TTGlyphPen(None)
    pill(Cu2QuPen(tt_pen, max_err=0.5), -410.0, -110.0, *LC_BAR)
    add("macroncomb", 0x0304, tt_pen.glyph(), 0, -410)

    # --- Curly single quotes -----------------------------------------------
    # Jua's "double" quotes are single marks, so they are the right shape.
    for codepoint, source, name in [
        (0x2018, "“", "quoteleft"),
        (0x2019, "”", "quoteright"),
    ]:
        contours, (xmin, _, _, _), advance = outline(source)
        tt_pen = TTGlyphPen(None)
        replay(tt_pen, contours)
        add(name, codepoint, tt_pen.glyph(), advance, xmin)

    # --- Middle dot and ellipsis, built from Jua's period -------------------
    dot_contours, (dot_xmin, _, dot_xmax, _), dot_advance = outline(".")
    dot_centre = (dot_xmin + dot_xmax) / 2.0

    def dot_at(pen, dx, dy):
        replay(TransformPen(pen, (1, 0, 0, 1, dx, dy)), dot_contours)

    tt_pen = TTGlyphPen(None)
    raise_to = 240.0  # half the x-height
    dot_at(tt_pen, 150.0 - dot_centre, raise_to)
    add("periodcentered", 0x00B7, tt_pen.glyph(), 300, 150.0 - dot_centre + dot_xmin)

    tt_pen = TTGlyphPen(None)
    for i in range(3):
        dot_at(tt_pen, i * dot_advance, 0.0)
    add("ellipsis", 0x2026, tt_pen.glyph(), dot_advance * 3, dot_xmin)

    # --- En and em dash, matching the hyphen's bar ---------------------------
    for codepoint, name, advance, ink in [
        (0x2013, "endash", 600, 520.0),
        (0x2014, "emdash", 880, 800.0),
    ]:
        tt_pen = TTGlyphPen(None)
        pill(Cu2QuPen(tt_pen, max_err=0.5), 40.0, ink, *HYPHEN_BAR)
        add(name, codepoint, tt_pen.glyph(), advance, 40)

    # --- Splice everything in ------------------------------------------------
    order = font.getGlyphOrder()
    font.setGlyphOrder(list(order) + [n for n in glyphs if n not in order])
    glyf.glyphOrder = font.getGlyphOrder()

    for name, glyph in glyphs.items():
        glyf[name] = glyph
        hmtx[name] = metrics[name]

    font["maxp"].numGlyphs = len(font.getGlyphOrder())

    for table in font["cmap"].tables:
        if table.isUnicode():
            table.cmap.update(mapping)

    # Note the derivative, as the OFL asks.
    note = "Modified: macron vowels and missing punctuation added."
    for record in font["name"].names:
        if record.nameID == 10:
            record.string = note
            break
    else:
        font["name"].setName(note, 10, 3, 1, 0x409)

    font.flavor = "woff2"
    font.save(path)
    print(f"patched {path}: added {len(glyphs)} glyphs")


if __name__ == "__main__":
    target = Path(sys.argv[1] if len(sys.argv) > 1 else "public/Jua-regular.woff2")
    patch(str(target))

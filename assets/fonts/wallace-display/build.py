"""Build the display cut: a static instance of Epilogue (SIL OFL 1.1) with built-in tracking and new ligatures.

usage: build_epi.py <Epilogue variable woff2> <weight> <out.ttf> <out.woff2>
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.ttLib.tables import otTables
from pathops import Path, PathOp, op

FAMILY = "Wallace Display"
SRC, WEIGHT, OUT_TTF, OUT_WOFF2 = sys.argv[1], float(sys.argv[2]), sys.argv[3], sys.argv[4]

font = instantiateVariableFont(TTFont(SRC), {"wght": WEIGHT}, inplace=False)
font.flavor = None
gs = font.getGlyphSet()
glyf, hmtx = font["glyf"], font["hmtx"]
U = font["head"].unitsPerEm / 1000.0     # all sizes below are written for 1000 units per em

# Tight display tracking is built in, because browsers turn ligatures off when CSS letter-spacing is set.
TRACK = 26 * U
for g in font.getGlyphOrder():
    w, lsb = hmtx[g]
    if w > TRACK * 4: hmtx[g] = (int(round(w - TRACK)), lsb)


def path_of(name):
    p = Path(); gs[name].draw(p.getPen(glyphSet=gs)); return p

def moved(p, dx, dy=0):
    q = Path(); pen = q.getPen()
    for verb, pts in p.segments:
        if verb == "closePath": pen.closePath()
        elif verb == "endPath": pen.endPath()
        else: getattr(pen, verb)(*[None if pt is None else (pt[0] + dx, pt[1] + dy) for pt in pts])   # None closes an all-off-curve contour
    return q

def poly(points):
    p = Path(); pen = p.getPen(); pen.moveTo(points[0])
    for pt in points[1:]: pen.lineTo(pt)
    pen.closePath(); return p

def rect(x0, y0, x1, y1): return poly([(x0, y0), (x1, y0), (x1, y1), (x0, y1)])

def union(*paths):
    out = paths[0]
    for p in paths[1:]: out = op(out, p, PathOp.UNION, fix_winding=True)
    return out

def cut(a, b): return op(a, b, PathOp.INTERSECTION, fix_winding=True)

def span(p, y):
    """Left and right extent of the shape on the line at height y."""
    b = cut(p, rect(-9000, y - 1, 9000, y + 1)).bounds
    return (b[0], b[2])

def put(name, p, advance):
    p = op(p, Path(), PathOp.UNION, fix_winding=True)
    tt = TTGlyphPen(None)
    p.draw(Cu2QuPen(tt, 1.0, reverse_direction=True))
    g = tt.glyph()
    if name not in glyf.glyphs:
        font.setGlyphOrder(font.getGlyphOrder() + [name])
        glyf.glyphOrder = font.getGlyphOrder()
    glyf[name] = g
    g.recalcBounds(glyf)
    hmtx[name] = (int(round(advance)), int(round(p.bounds[0])))

def adv(name): return hmtx[name][0]

LIGS = {}

# ---------- the crossbar of the t, measured from the outline ----------

T0 = path_of("t")
t_top = T0.bounds[3]
body_l = span(T0, 300 * U)[0]
step = int(2 * U)
bar_ys = [y for y in range(int(300 * U), int(t_top), step) if span(T0, y)[0] < body_l - 25 * U]
bar_lo, bar_hi = min(bar_ys), max(bar_ys) + step
bar_mid = (bar_lo + bar_hi) / 2

def lig_bar(name, left, right, tighten=0):
    """Two letters that share one crossbar."""
    L, R = path_of(left), path_of(right)
    a = adv(left) - tighten * U
    lb, rb = span(L, bar_mid), span(R, bar_mid)
    bridge = rect(lb[1] - 20 * U, bar_lo, a + rb[0] + 20 * U, bar_hi)
    put(name, union(L, moved(R, a), bridge), a + adv(right))
    LIGS[name] = [left, right]

lig_bar("t_t", "t", "t", tighten=10)
lig_bar("f_t", "f", "t", tighten=8)
lig_bar("t_f", "t", "f", tighten=8)

# ---------- T_h: the bar of the T runs on into the h ----------

Tp, Hp = path_of("T"), path_of("h")
cap = Tp.bounds[3]
tb_ys = [y for y in range(int(cap - 300 * U), int(cap), step) if span(Tp, y)[1] > Tp.bounds[2] - 5 * U]
tbar_lo = min(tb_ys)
a = adv("T") - 20 * U
hl, hr = span(Hp, cap - 20 * U)
put("T_h", union(Tp, moved(Hp, a), rect(Tp.bounds[2] - 20 * U, tbar_lo, a + hl + 20 * U, cap)), a + adv("h"))
LIGS["T_h"] = ["T", "h"]

# ---------- o_o: two o that share a wall, like links in a chain ----------

Op = path_of("o")
inner = sorted(Op.contours, key=lambda c: c.bounds[2] - c.bounds[0])[0]
wall = inner.bounds[0] - Op.bounds[0]
a = Op.bounds[2] - Op.bounds[0] - wall
put("o_o", union(Op, moved(Op, a)), a + adv("o"))
LIGS["o_o"] = ["o", "o"]

# ---------- -> : an arrow, as heavy as the hyphen ----------

hy = path_of("hyphen").bounds
yc, half = (hy[1] + hy[3]) / 2, (hy[3] - hy[1]) / 2
kk, LL, x0, xT = half * 2 * 1.41421, 200 * U, 56 * U, 780 * U
chev = poly([(xT, yc), (xT - LL, yc + LL), (xT - LL - kk, yc + LL), (xT - kk, yc), (xT - LL - kk, yc - LL), (xT - LL, yc - LL)])
put("arrow_right", union(rect(x0, yc - half, xT - kk * 0.6, yc + half), chev), xT + x0 - TRACK)
LIGS["arrow_right"] = ["hyphen", "greater"]

# ---------- turn the ligatures on ----------

gsub = font["GSUB"].table
sub = None
for fr in gsub.FeatureList.FeatureRecord:
    if fr.FeatureTag != "liga": continue
    for i in fr.Feature.LookupListIndex:
        lk = gsub.LookupList.Lookup[i]
        if lk.LookupType == 4: sub = lk.SubTable[0]
assert sub is not None
for name, parts in LIGS.items():
    lig = otTables.Ligature()
    lig.Component, lig.LigGlyph, lig.CompCount = parts[1:], name, len(parts)
    sub.ligatures.setdefault(parts[0], []).append(lig)
for first in sub.ligatures:
    sub.ligatures[first].sort(key=lambda l: -len(l.Component))
if "GDEF" in font and font["GDEF"].table.GlyphClassDef:
    for name in LIGS: font["GDEF"].table.GlyphClassDef.classDefs[name] = 2

# ---------- names ----------

name = font["name"]
for rec in list(name.names):
    if rec.nameID in (1, 3, 4, 6, 16, 17, 25): name.removeNames(nameID=rec.nameID)
for nid, text in [(1, FAMILY), (2, "Regular"), (3, FAMILY + " 2.000"), (4, FAMILY), (5, "Version 2.000"),
                  (6, FAMILY.replace(" ", "") + "-Regular"),
                  (0, "Copyright 2020 The Epilogue Project Authors (https://github.com/Etcetera-Type-Co/Epilogue). "
                      "Modified 2026 for chriswallace.net: static display cut, built-in tracking, new ligatures."),
                  (13, "This Font Software is licensed under the SIL Open Font License, Version 1.1.")]:
    name.setName(text, nid, 3, 1, 0x409)
for tag in ("STAT", "avar", "fvar", "gvar", "HVAR", "MVAR"):
    if tag in font: del font[tag]
font["maxp"].numGlyphs = len(font.getGlyphOrder())

font.save(OUT_TTF)
font.flavor = "woff2"
font.save(OUT_WOFF2)
print("ligatures:", ", ".join(LIGS), "| crossbar", bar_lo, bar_hi, "| T bar from", tbar_lo, "| upm scale", U)

/*
 * INTERPLAY — generator v2
 * Chris Wallace
 *
 * A single, dependency-free, deterministic renderer.
 *
 *   Interplay.render(canvas, { seed, partner })
 *
 * chriswallace.net copy: identical to art/interplay.js in the interplay
 * repo, except that the drawing can also run one step at a time.
 * Interplay.renderSteps(canvas, opts) is a generator. It yields "paper"
 * once the empty printed field is down, "form" after each solid form,
 * "pen" after each run of pen dots, and "hand" once, just before the
 * partner's hand starts. render() runs it to the end,
 * so the finished image is the same either way.
 *
 * Every work is drawn by two hands:
 *   - `seed`    : the work's own seed. It decides the palette, the paper,
 *                 the composition and every solid form.
 *   - `partner` : another work's seed. Its forms come back as stippled pen
 *                 lines, drawn in the partner's ink, over this work's forms.
 *
 * At mint, the partner is the work minted just before (call & response).
 * Later, two holders may agree to bond their works; the bond replaces the
 * partner, permanently, on both sides.
 *
 * Same (seed, partner) => same image, on any machine, at any size.
 */
(function (root) {
  "use strict";

  // ---------------------------------------------------------------- random

  function xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  function sfc32(a, b, c, d) {
    return function () {
      a |= 0; b |= 0; c |= 0; d |= 0;
      const t = (((a + b) | 0) + d) | 0;
      d = (d + 1) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  }

  function makeRng(seed, salt) {
    const h = xmur3(String(seed) + "::" + salt);
    const r = sfc32(h(), h(), h(), h());
    for (let i = 0; i < 12; i++) r();
    const api = {
      next: r,
      range: (a, b) => a + (b - a) * r(),
      int: (a, b) => Math.floor(a + (b - a + 1) * r()),
      pick: (arr) => arr[Math.floor(r() * arr.length)],
      chance: (p) => r() < p,
      gauss: () => {
        let u = 0, v = 0;
        while (u === 0) u = r();
        while (v === 0) v = r();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
      },
      weighted: (pairs) => {
        let total = 0;
        for (const p of pairs) total += p[1];
        let x = r() * total;
        for (const p of pairs) if ((x -= p[1]) <= 0) return p[0];
        return pairs[pairs.length - 1][0];
      },
    };
    return api;
  }

  // Seeded 2D simplex noise.
  function makeNoise(rng) {
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rng.next() * (i + 1));
      const t = p[i]; p[i] = p[j]; p[j] = t;
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    const G = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
    const F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6;
    return function (xin, yin) {
      const s = (xin + yin) * F2;
      const i = Math.floor(xin + s), j = Math.floor(yin + s);
      const t = (i + j) * G2;
      const x0 = xin - (i - t), y0 = yin - (j - t);
      const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
      const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
      const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
      const ii = i & 255, jj = j & 255;
      let n = 0, tt, g;
      tt = 0.5 - x0 * x0 - y0 * y0;
      if (tt > 0) { g = G[perm[ii + perm[jj]] & 7]; tt *= tt; n += tt * tt * (g[0] * x0 + g[1] * y0); }
      tt = 0.5 - x1 * x1 - y1 * y1;
      if (tt > 0) { g = G[perm[ii + i1 + perm[jj + j1]] & 7]; tt *= tt; n += tt * tt * (g[0] * x1 + g[1] * y1); }
      tt = 0.5 - x2 * x2 - y2 * y2;
      if (tt > 0) { g = G[perm[ii + 1 + perm[jj + 1]] & 7]; tt *= tt; n += tt * tt * (g[0] * x2 + g[1] * y2); }
      return 70 * n; // ~[-1, 1]
    };
  }

  // ---------------------------------------------------------------- colour

  function hexToRgb(h) {
    h = h.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function rgbToHex(c) {
    return "#" + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
  }
  function lum(hex) {
    const c = hexToRgb(hex).map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function contrast(a, b) {
    const la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  function mix(a, b, t) {
    const x = hexToRgb(a), y = hexToRgb(b);
    return rgbToHex([0, 1, 2].map((i) => x[i] + (y[i] - x[i]) * t));
  }

  // The thirteen city palettes of the original Interplay, rebalanced.
  // `ink` is how forms are laid down: "multiply" reads as overlapping
  // translucent screen-print inks, "over" as opaque cut paper.
  const PALETTES = [
    { name: "San Francisco", bg: "#f4efe0", colors: ["#ec5526", "#f4ac12", "#9ebbc1", "#e8dcc0", "#2b3a42"], ink: "multiply", w: 8 },
    { name: "Chicago", bg: "#f5ede1", colors: ["#e95145", "#f6bf7a", "#589da1", "#eebb20", "#24414a"], ink: "multiply", w: 10 },
    { name: "New York", bg: "#f0e0c6", colors: ["#475b62", "#7a999c", "#2a1f1d", "#fbaf3c", "#df4a33", "#af592c"], ink: "mixed", w: 9 },
    { name: "London", bg: "#e6e2d6", colors: ["#c03a53", "#edd09e", "#aab5af", "#023629", "#eba735", "#8e9380", "#6c4127"], ink: "multiply", w: 9 },
    { name: "Austin", bg: "#1f1e43", colors: ["#ec643b", "#56b7ab", "#f8cb57", "#f7f2df"], ink: "over", w: 8 },
    { name: "Los Angeles", bg: "#eda68e", colors: ["#1a140f", "#fffaf0", "#f0d790", "#e5b750", "#f15b3e", "#cee4ee"], ink: "over", w: 6 },
    { name: "Seattle", bg: "#ded5ba", colors: ["#243826", "#899382", "#d9bb9b", "#b1c6b6", "#3e3a37", "#d58667", "#9a6643"], ink: "multiply", w: 7 },
    { name: "Dubai", bg: "#181510", colors: ["#e9dbbd", "#cbb682", "#a08c5b", "#d4af37"], ink: "over", w: 4 },
    { name: "Grant", bg: "#f9f0de", colors: ["#e7b10a", "#898121", "#4c4b16", "#c9733a"], ink: "multiply", w: 5 },
    { name: "Omentejovum", bg: "#f0f0ca", colors: ["#dbb315", "#e15b26", "#2e3893", "#252429"], ink: "over", w: 6 },
    { name: "Golid", bg: "#121212", colors: ["#3e769c", "#b7ce9c", "#e4a53c", "#e46e2f", "#e47b7c"], ink: "over", w: 6 },
    { name: "Yorktown", bg: "#ece3d0", colors: ["#d7312e", "#f0ac00", "#0c7e45", "#2c52a0", "#f7bab6", "#5ec5ee", "#1d1d1b"], ink: "over", w: 6 },
    { name: "Xie", bg: "#ded5ba", colors: ["#b1c6b6", "#809388", "#3e3a37", "#97987e", "#d58667", "#9a6643"], ink: "multiply", w: 6 },
  ];

  // ---------------------------------------------------------------- traits

  const W = 1;           // unit width
  const H = 1714 / 1212; // A-series portrait

  const COMPOSITIONS = ["Scatter", "Bloom", "Drift", "Tide", "Cascade", "Constellation"];
  const DENSITIES = ["Monumental", "Gathering", "Crowd", "Murmuration"];
  const STYLES = ["Solid", "Mixed", "Outlines"];
  const BORDERS = ["None", "Narrow", "Wide"];
  // Public names. Internally the old vocabulary is kept.
  const NAMES = {
    Scatter: "Restless", Bloom: "Gathered", Drift: "Carried", Tide: "Belonging", Cascade: "Falling", Constellation: "Apart",
    Monumental: "Solitary", Gathering: "Intimate", Crowd: "Crowd", Murmuration: "Multitude",
    Solid: "Bare", Mixed: "Veiled", Outlines: "Hollow",
  };

  function hexBytes(hex) {
    if (!hex) return null;
    hex = String(hex).replace(/^0x/, "");
    if (!/^[0-9a-fA-F]*$/.test(hex) || hex.length % 2) return null;
    const out = [];
    for (let i = 0; i < hex.length; i += 2) out.push(parseInt(hex.slice(i, i + 2), 16));
    return out;
  }

  // A portrait is what the Sitting distils from a conversation:
  //   [version=1, palette, composition, density, style, unrest 0-10, border, reserved,
  //    then 8 bytes: the answer vector (belonging, expression, mimicry,
  //    visibility, unrest, warmth, motion, light), 0-255 each]
  // It sets the expressive traits. It cannot touch the rare ones.
  function decodePortrait(hex) {
    const b = hexBytes(hex);
    if (!b || b.length < 7 || b[0] !== 1) return null;
    return {
      palette: PALETTES[b[1] % PALETTES.length],
      composition: COMPOSITIONS[b[2] % COMPOSITIONS.length],
      density: DENSITIES[b[3] % DENSITIES.length],
      style: STYLES[b[4] % STYLES.length],
      chaos: Math.min(10, b[5]) / 10,
      border: BORDERS[b[6] % BORDERS.length],
    };
  }

  function encodePortrait(p) {
    const idx = (arr, v) => Math.max(0, arr.indexOf(v));
    const pal = PALETTES.findIndex((x) => x.name === (p.palette && p.palette.name ? p.palette.name : p.palette));
    const b = [1, Math.max(0, pal), idx(COMPOSITIONS, p.composition), idx(DENSITIES, p.density), idx(STYLES, p.style),
      Math.round(Math.max(0, Math.min(1, p.chaos)) * 10), idx(BORDERS, p.border), 0];
    const v = p.vector || [];
    for (let i = 0; i < 8; i++) b.push(Math.round(Math.max(0, Math.min(1, v[i] == null ? 0.5 : v[i])) * 255));
    return b.map((x) => x.toString(16).padStart(2, "0")).join("");
  }

  // A silhouette: 64 radii (0-255) around a fixed centre, read from the
  // sitter's photo in their own browser. The photo never leaves the device.
  const SIL_C = [0.5, 0.64];
  const SIL_R = 0.62;
  function decodeSilhouette(hex) {
    const b = hexBytes(hex);
    if (!b || b.length < 16) return null;
    const pts = b.map((v, i) => {
      const a = (i / b.length) * Math.PI * 2 - Math.PI / 2;
      const r = (v / 255) * SIL_R;
      return [SIL_C[0] * W + Math.cos(a) * r, SIL_C[1] * H + Math.sin(a) * r];
    });
    return pts;
  }

  function insidePoly(pts, x, y) {
    let c = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  }

  function traitsFor(seed, portraitHex) {
    const rng = makeRng(seed, "traits");
    let palette = rng.weighted(PALETTES.map((p) => [p, p.w]));
    let composition = rng.weighted([
      ["Scatter", 22], ["Bloom", 20], ["Drift", 20], ["Tide", 14], ["Cascade", 14], ["Constellation", 10],
    ]);
    let density = rng.weighted([
      ["Monumental", 12], ["Gathering", 34], ["Crowd", 34], ["Murmuration", 20],
    ]);
    let style = rng.weighted([["Mixed", 52], ["Solid", 30], ["Outlines", 18]]);
    let chaos = Math.round(rng.range(0.05, 1) * 10) / 10;
    let border = rng.weighted([["None", 30], ["Narrow", 45], ["Wide", 25]]);

    // What the world decides. Drawn from the on-chain seed only, in its own
    // stream, so no conversation can steer it.
    const fate = makeRng(seed, "fate");
    const outlier = fate.weighted([["None", 74], ["Outlier", 18], ["Spotlight", 6], ["Embraced", 2]]);
    const mimicry = fate.weighted([["Faint", 46], ["Echo", 34], ["Mirror", 15], ["Twin", 5]]);
    const score = { None: 0, Outlier: 2, Spotlight: 4, Embraced: 7 }[outlier] + { Faint: 0, Echo: 1, Mirror: 3, Twin: 5 }[mimicry];
    const mark = score >= 7 ? "Met" : score >= 4 ? "Carved" : score >= 2 ? "Touching" : "Alone";

    const portrait = decodePortrait(portraitHex);
    if (portrait) ({ palette, composition, density, style, chaos, border } = portrait);
    return { palette, composition, density, style, chaos, border, paper: palette.bg, outlier, mimicry, mark, portrait: !!portrait };
  }

  // ---------------------------------------------------------------- forms

  // A closed organic outline: radius as a sum of low harmonics. Low k gives
  // the soft cut-paper body; a few higher k give the original's restless,
  // pointed lobes, scaled by chaos. Amplitudes are bounded so the outline
  // never crosses itself.
  function makeBlob(rng, chaos) {
    const harmonics = [];
    let budget = 0.42 + 0.28 * chaos;
    const ks = [2, 3, 4, 5, 6, 7];
    for (const k of ks) {
      const weight = k <= 3 ? 1 : k <= 5 ? 0.55 + 0.6 * chaos : 0.25 + 0.7 * chaos;
      const a = rng.range(0.2, 1) * weight * budget / Math.sqrt(k);
      harmonics.push({ k, a, ph: rng.range(0, Math.PI * 2) });
    }
    const sum = harmonics.reduce((s, h) => s + h.a, 0);
    const cap = 0.62;
    if (sum > cap) for (const h of harmonics) h.a *= cap / sum;
    return {
      harmonics,
      stretch: rng.range(0.78, 1.25),
      rot: rng.range(0, Math.PI * 2),
      pinch: rng.range(-0.18, 0.18) * chaos, // asymmetric lean
    };
  }

  function blobPoints(form, steps, scale) {
    const { x, y, r, blob } = form;
    const s = scale || 1;
    const pts = [];
    const cr = Math.cos(blob.rot), sr = Math.sin(blob.rot);
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      let k = 1;
      for (const h of blob.harmonics) k += h.a * Math.sin(h.k * t + h.ph);
      k += blob.pinch * Math.cos(t);
      const px = Math.cos(t) * k * r * s * blob.stretch * (form.flip ? -1 : 1);
      const py = Math.sin(t) * k * r * s / blob.stretch;
      pts.push([x + px * cr - py * sr, y + px * sr + py * cr]);
    }
    return pts;
  }

  // Composition fields. Each returns a candidate centre in unit space.
  function placer(kind, rng, noise, chaos) {
    const spread = 0.65 + 0.6 * chaos;
    const cx = W * rng.range(0.38, 0.62), cy = H * rng.range(0.4, 0.6);
    const angle = rng.range(-0.9, 0.9) + (rng.chance(0.5) ? Math.PI : 0);
    const nodes = Array.from({ length: rng.int(3, 6) }, () => [rng.range(0.15, 0.85) * W, rng.range(0.12, 0.88) * H]);
    const bandY = H * rng.range(0.3, 0.7);
    return function () {
      switch (kind) {
        case "Bloom": {
          const a = rng.range(0, Math.PI * 2);
          const d = Math.abs(rng.gauss()) * 0.32 * spread;
          return [cx + Math.cos(a) * d, cy + Math.sin(a) * d * 1.25];
        }
        case "Drift": {
          // A diagonal current, thickened by noise.
          const t = rng.range(-0.75, 0.75) * H;
          const off = rng.gauss() * 0.16 * spread;
          const wob = noise(t * 2.1, 3.3) * 0.12;
          return [W / 2 + Math.cos(angle) * t - Math.sin(angle) * (off + wob),
                  H / 2 + Math.sin(angle) * t + Math.cos(angle) * (off + wob)];
        }
        case "Tide": {
          const x = rng.range(-0.08, 1.08) * W;
          const y = bandY + noise(x * 2.4, 7.7) * 0.18 * H + rng.gauss() * 0.1 * spread * H;
          return [x, y];
        }
        case "Cascade": {
          // Falls from the top, thinning out as it goes.
          const y = Math.pow(rng.next(), 1.7) * H * 1.05;
          const x = cx + noise(y * 1.7, 1.1) * 0.3 + rng.gauss() * (0.14 + y / H * 0.26) * spread;
          return [x, y];
        }
        case "Constellation": {
          const n = rng.pick(nodes);
          return [n[0] + rng.gauss() * 0.1 * spread, n[1] + rng.gauss() * 0.1 * spread];
        }
        default: {
          // Scatter, but with breathing room: rejection against a noise field.
          for (let i = 0; i < 12; i++) {
            const x = rng.range(-0.04, 1.04) * W, y = rng.range(-0.04, 1.04) * H;
            const d = noise(x * 2.2, y * 2.2) * 0.5 + 0.5;
            if (rng.next() < Math.pow(d, 1.6) + 0.08) return [x, y];
          }
          return [rng.range(0, W), rng.range(0, H)];
        }
      }
    };
  }

  // Lay out every form of a seed. Pure function of the seed, so a partner's
  // forms can be rebuilt exactly when they are needed as lines.
  function layoutFor(seed, traits, silhouette) {
    const t = traits || traitsFor(seed);
    const rng = makeRng(seed, "forms");
    const noise = makeNoise(makeRng(seed, "field"));
    const counts = { Monumental: [5, 9], Gathering: [18, 40], Crowd: [70, 150], Murmuration: [260, 520] };
    const n = rng.int(counts[t.density][0], counts[t.density][1]);
    // Size: a power law gives each piece a few protagonists and a chorus.
    const rMax = { Monumental: 0.32, Gathering: 0.17, Crowd: 0.1, Murmuration: 0.055 }[t.density];
    const place = placer(t.composition, rng, noise, t.chaos);
    const forms = [];
    for (let i = 0; i < n; i++) {
      const u = rng.next();
      const r = rMax * (0.22 + 0.78 * Math.pow(u, 2.6));
      let [x, y] = place();
      // With a sitter, most forms gather into their figure: the person is
      // made of their own forms; the rest of the world stays as it was.
      if (silhouette && rng.next() < 0.72) {
        for (let k = 0; k < 40; k++) {
          const cx = rng.range(0.05, 0.95) * W, cy = rng.range(0.15, 1.05) * H;
          if (insidePoly(silhouette, cx, cy)) { x = cx; y = cy; break; }
        }
      }
      forms.push({
        x, y, r: silhouette ? r * 0.8 : r,
        blob: makeBlob(rng, t.chaos),
        color: rng.pick(t.palette.colors),
        role: null,
        jitter: rng.next(),
      });
    }
    if (t.density === "Monumental") {
      const extra = rng.int(10, 22);
      for (let i = 0; i < extra; i++) {
        const [x, y] = place();
        forms.push({ x, y, r: rMax * rng.range(0.07, 0.16), blob: makeBlob(rng, t.chaos), color: rng.pick(t.palette.colors), role: null, jitter: rng.next() });
      }
    }
    forms.sort((a, b) => b.r - a.r); // protagonists first, chorus on top
    const pLine = { Solid: 0.0, Mixed: 0.42, Outlines: 1.0 }[t.style];
    for (const f of forms) f.role = f.jitter < pLine ? "line" : "fill";
    // Keep at least one protagonist solid unless the style forbids it.
    if (t.style !== "Outlines" && forms.length) forms[0].role = "fill";
    return forms;
  }

  // ---------------------------------------------------------------- drawing

  function tracePath(ctx, pts, S) {
    // Closed Catmull–Rom through every point (fixes the original's cut seam).
    const n = pts.length;
    ctx.beginPath();
    ctx.moveTo(pts[0][0] * S, pts[0][1] * S);
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      ctx.bezierCurveTo(c1x * S, c1y * S, c2x * S, c2y * S, p2[0] * S, p2[1] * S);
    }
    ctx.closePath();
  }

  function drawFill(ctx, form, S, ink, bg, rng) {
    const pts = blobPoints(form, 72);
    const dark = lum(bg) < 0.2;
    // Screen-print misregistration: a faint offset ghost of the same ink.
    if (ink === "multiply" && rng.chance(0.55)) {
      const off = form.r * rng.range(0.02, 0.05);
      const a = rng.range(0, Math.PI * 2);
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.translate(Math.cos(a) * off * S, Math.sin(a) * off * S);
      tracePath(ctx, pts, S);
      ctx.fillStyle = form.color;
      ctx.fill();
      ctx.restore();
    }
    tracePath(ctx, pts, S);
    ctx.fillStyle = form.color;
    ctx.globalAlpha = ink === "multiply" ? 0.86 : 1;
    ctx.fill();
    ctx.globalAlpha = 1;
    // Ink pooling at the edge, inside the form only.
    ctx.save();
    ctx.clip();
    ctx.globalCompositeOperation = dark ? "source-over" : "multiply";
    ctx.lineWidth = Math.max(1, form.r * S * 0.035);
    ctx.strokeStyle = mix(form.color, dark ? "#000000" : "#2a1a10", 0.28);
    ctx.globalAlpha = 0.35;
    ctx.stroke();
    ctx.restore();
  }

  // The pen: dots laid at even arc length, their size breathing with a
  // slow noise (pressure) and occasionally lifting off the paper.
  // Runs a step generator to its end and returns what it returns.
  function finish(steps) {
    let r = steps.next();
    while (!r.done) r = steps.next();
    return r.value;
  }

  const PEN_STEP = 48; // dots laid between pauses, when the drawing runs step by step

  function drawStipple(ctx, pts, S, color, weight, noise, rng, budget) {
    return finish(stippleSteps(ctx, pts, S, color, weight, noise, rng, budget));
  }

  function* stippleSteps(ctx, pts, S, color, weight, noise, rng, budget) {
    const n = pts.length;
    // resample along the closed Catmull–Rom curve
    const dense = [];
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      for (let j = 0; j < 8; j++) {
        const t = j / 8, t2 = t * t, t3 = t2 * t;
        dense.push([
          0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
        ]);
      }
    }
    const step = weight * 0.62;
    const off = rng.range(0, 100);
    const lift = rng.range(0.55, 0.85);
    let acc = 0, s = 0, used = 0;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < dense.length && used < budget; i++) {
      const a = dense[i], b = dense[(i + 1) % dense.length];
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const len = Math.hypot(dx, dy);
      while (acc <= len) {
        const t = len ? acc / len : 0;
        const x = a[0] + dx * t, y = a[1] + dy * t;
        const pressure = noise(off + s * 9, off * 0.37);
        if (pressure < lift) {
          const r = weight * (0.26 + 0.36 * (pressure * 0.5 + 0.5)) * rng.range(0.6, 1.2);
          const jx = rng.gauss() * weight * 0.12, jy = rng.gauss() * weight * 0.12;
          ctx.moveTo((x + jx) * S + r * S, (y + jy) * S);
          ctx.arc((x + jx) * S, (y + jy) * S, r * S, 0, Math.PI * 2);
          used++;
          if (used % PEN_STEP === 0) { ctx.fill(); yield "pen"; ctx.beginPath(); }
        }
        acc += step;
        s += step;
      }
      acc -= len;
    }
    ctx.fill();
    return used;
  }

  function inkFor(palette, bg) {
    // Colours from `palette` that will read on paper `bg`.
    const min = lum(bg) < 0.2 ? 3 : 1.8;
    const ok = palette.colors.filter((c) => contrast(c, bg) > min);
    return ok.length ? ok : [lum(bg) > 0.4 ? "#1d1d1b" : "#f4efe0"];
  }

  // ---------------------------------------------------------------- paper

  function hash2(x, y) {
    let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  function paperGrain(ctx, w, h, S, seed, dark) {
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    const noise = makeNoise(makeRng(seed, "paper"));
    // Low-frequency fibre field evaluated on a coarse grid then interpolated.
    const cell = Math.max(4, Math.round(S / 160));
    const gw = Math.ceil(w / cell) + 2, gh = Math.ceil(h / cell) + 2;
    const field = new Float32Array(gw * gh);
    for (let gy = 0; gy < gh; gy++)
      for (let gx = 0; gx < gw; gx++) {
        let ux = (gx * cell) / S, uy = (gy * cell) / S;
        // warp the lookup a little so no scale lines up into a visible pattern
        const wx = noise(ux * 2.3 + 5.1, uy * 2.3 + 1.7), wy = noise(ux * 2.3 + 9.4, uy * 2.3 + 3.2);
        ux += wx * 0.05; uy += wy * 0.05;
        field[gy * gw + gx] =
          noise(ux * 4.1, uy * 4.1) * 0.4 + noise(ux * 11.7 + 3.1, uy * 11.7 + 7.7) * 0.32 +
          noise(ux * 37 + 1.7, uy * 37 + 9.2) * 0.18 + noise(ux * 96 + 6.6, uy * 96 + 2.4) * 0.1;
      }
    const fine = Math.max(1, Math.round(S / 1212)); // grain size scales with output
    const amp = dark ? 9 : 13;
    for (let y = 0; y < h; y++) {
      const gy = y / cell, iy = gy | 0, fy = gy - iy;
      for (let x = 0; x < w; x++) {
        const gx = x / cell, ix = gx | 0, fx = gx - ix;
        const f00 = field[iy * gw + ix], f10 = field[iy * gw + ix + 1];
        const f01 = field[(iy + 1) * gw + ix], f11 = field[(iy + 1) * gw + ix + 1];
        const f = (f00 * (1 - fx) + f10 * fx) * (1 - fy) + (f01 * (1 - fx) + f11 * fx) * fy;
        const g = hash2((x / fine) | 0, (y / fine) | 0) - 0.5;
        // vignette: the paper darkens a touch toward its edges
        const vx = x / w - 0.5, vy = y / h - 0.5;
        const v = (vx * vx + vy * vy) * (dark ? 10 : 14);
        const k = g * amp + f * (dark ? 3.5 : 5.5) - v;
        const i = (y * w + x) * 4;
        d[i] += k; d[i + 1] += k * 0.97; d[i + 2] += k * 0.92;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  // ---------------------------------------------------------------- render

  // The off-palette colour that does not fit in: whichever of these sits
  // furthest from every colour of the palette and the paper.
  const OUTSIDERS = ["#1f3fbf", "#ff4f1a", "#00a37a", "#e8188b", "#ffd400", "#6a2cf0"];
  function outsiderFor(palette) {
    let best = OUTSIDERS[0], bestD = -1;
    for (const o of OUTSIDERS) {
      const oc = hexToRgb(o);
      let d = Infinity;
      for (const c of palette.colors.concat([palette.bg])) {
        const cc = hexToRgb(c);
        d = Math.min(d, Math.hypot(oc[0] - cc[0], oc[1] - cc[1], oc[2] - cc[2]));
      }
      if (d > bestD) { bestD = d; best = o; }
    }
    return best;
  }

  function ringPoints(x, y, r, n) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]);
    }
    return pts;
  }

  // The seal in the corner. Its form shows how rare the work is:
  //   Alone     one ring
  //   Touching  two rings, overlapping
  //   Carved    a solid seal with the two rings cut out of it
  //   Met       the same, with the place where they meet filled in gold
  // Inside, where the rings meet, is a glyph carved for this work alone:
  // a few strokes from the seed, in no alphabet. No two seals share one.
  function sigil(seed, cols, rows) {
    const g = makeRng(seed, "sigil");
    const strokes = [];
    const n = g.int(3, 5);
    for (let i = 0; i < n; i++) {
      let c = g.int(0, cols - 1), r = g.int(0, rows - 1);
      const pts = [[c, r]];
      const len = g.int(1, 3);
      for (let k = 0; k < len; k++) {
        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1]];
        const [dc, dr] = g.pick(dirs);
        c = Math.max(0, Math.min(cols - 1, c + dc * g.int(1, 2)));
        r = Math.max(0, Math.min(rows - 1, r + dr * g.int(1, 2)));
        pts.push([c, r]);
      }
      strokes.push(pts);
    }
    if (g.chance(0.6)) strokes.push([[g.int(0, cols - 1), g.int(0, rows - 1)]]); // a single dot
    return strokes;
  }

  // Ink on paper: spread the stamp a little, then let a seeded noise decide
  // where the edge takes and where it starves, and let density wander.
  function roughen(lctx, side, seed, px) {
    const img = lctx.getImageData(0, 0, side, side), d = img.data, n = side * side;
    const R = Math.max(1, Math.round(px * 0.016));
    const ch = [new Float32Array(n), new Float32Array(n), new Float32Array(n), new Float32Array(n)];
    for (let i = 0; i < n; i++) {
      const a = d[i * 4 + 3] / 255;
      ch[3][i] = a; ch[0][i] = d[i * 4] * a; ch[1][i] = d[i * 4 + 1] * a; ch[2][i] = d[i * 4 + 2] * a;
    }
    const tmp = new Float32Array(n), k = 1 / (2 * R + 1);
    const at = (v) => Math.min(side - 1, Math.max(0, v));
    const blur = (arr) => {
      for (let y = 0; y < side; y++) {
        const row = y * side;
        let acc = 0;
        for (let x = -R; x <= R; x++) acc += arr[row + at(x)];
        for (let x = 0; x < side; x++) { tmp[row + x] = acc * k; acc += arr[row + at(x + R + 1)] - arr[row + at(x - R)]; }
      }
      for (let x = 0; x < side; x++) {
        let acc = 0;
        for (let y = -R; y <= R; y++) acc += tmp[at(y) * side + x];
        for (let y = 0; y < side; y++) { arr[y * side + x] = acc * k; acc += tmp[at(y + R + 1) * side + x] - tmp[at(y - R) * side + x]; }
      }
    };
    ch.forEach(blur);
    const nz = makeNoise(makeRng(seed, "ink"));
    for (let i = 0; i < n; i++) {
      const u = (i % side) / side, v = ((i / side) | 0) / side;
      const fine = nz(u * 38, v * 38) * 0.55 + nz(u * 110 + 7, v * 110 + 3) * 0.45;
      const coarse = nz(u * 5 + 11, v * 5 + 5);
      const a = ch[3][i];
      const edge = Math.min(1, Math.max(0, (a + fine * 0.18 - 0.42) / 0.14));
      if (a > 0.001) { d[i * 4] = ch[0][i] / a; d[i * 4 + 1] = ch[1][i] / a; d[i * 4 + 2] = ch[2][i] / a; }
      d[i * 4 + 3] = Math.max(0, Math.min(255, edge * (0.84 + 0.16 * coarse) * 255));
    }
    lctx.putImageData(img, 0, 0);
  }

  function drawSeal(target, S, x, y, size, mark, dark, seed) {
    const red = dark ? "#d9b45a" : "#b8321f";
    const gold = dark ? "#f3e2a6" : "#c9a227";
    const lw = size * 0.09;
    const r = size * 0.24, d = size * 0.11;
    // The seal is cut on its own layer, so carving and wear remove ink, not paper.
    const side = Math.ceil(size * S * 1.6) + 2;
    const layer = document.createElement("canvas");
    layer.width = layer.height = side;
    const ctx = layer.getContext("2d", { willReadFrequently: true });
    ctx.save();
    ctx.translate(side / 2, side / 2);
    ctx.rotate((makeRng(seed, "seal").next() - 0.5) * 0.12);
    const X = (v) => v * S;
    ctx.lineWidth = X(lw);
    ctx.strokeStyle = red;
    ctx.fillStyle = red;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const ring = (cx) => { ctx.beginPath(); ctx.arc(X(cx), 0, X(r), 0, Math.PI * 2); };

    // The glyph lives in the lens where the rings overlap (or inside the
    // single ring), drawn in ink on open seals and cut through solid ones.
    const glyph = (style) => {
      const alone = mark === "Alone";
      const cols = alone ? 4 : 3, rows = alone ? 4 : 6;
      const bw = alone ? size * 0.2 : size * 0.1, bh = alone ? size * 0.2 : size * 0.26;
      const at = ([c, rr]) => [X(-bw / 2 + (bw * c) / (cols - 1)), X(-bh / 2 + (bh * rr) / (rows - 1))];
      ctx.save();
      ctx.lineWidth = X(size * 0.042);
      ctx.strokeStyle = style; ctx.fillStyle = style;
      for (const st of sigil(seed, cols, rows)) {
        ctx.beginPath();
        if (st.length === 1) {
          const [px, py] = at(st[0]);
          ctx.arc(px, py, X(size * 0.03), 0, Math.PI * 2);
          ctx.fill();
          continue;
        }
        st.forEach((pt, i) => { const [px, py] = at(pt); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
        ctx.stroke();
      }
      ctx.restore();
    };

    if (mark === "Alone") {
      ring(0); ctx.stroke();
      glyph(red);
    } else if (mark === "Touching") {
      ring(-d); ctx.stroke(); ring(d); ctx.stroke();
      glyph(red);
    } else {
      const hs = size / 2, rr = size * 0.12;
      ctx.beginPath();
      ctx.moveTo(X(-hs + rr), X(-hs));
      ctx.arcTo(X(hs), X(-hs), X(hs), X(hs), X(rr));
      ctx.arcTo(X(hs), X(hs), X(-hs), X(hs), X(rr));
      ctx.arcTo(X(-hs), X(hs), X(-hs), X(-hs), X(rr));
      ctx.arcTo(X(-hs), X(-hs), X(hs), X(-hs), X(rr));
      ctx.closePath();
      ctx.fill();
      ctx.globalCompositeOperation = "destination-out";
      ring(-d); ctx.stroke(); ring(d); ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
      if (mark === "Met") {
        ctx.save();
        ring(-d); ctx.clip();
        ring(d); ctx.fillStyle = gold; ctx.fill();
        ctx.restore();
      }
      ctx.globalCompositeOperation = "destination-out";
      glyph("#000");
      ctx.globalCompositeOperation = "source-over";
    }
    // stamp wear: tiny knock-outs where the ink did not take
    ctx.globalCompositeOperation = "destination-out";
    const wr = makeRng(seed, "wear");
    for (let i = 0; i < 26; i++) {
      ctx.beginPath();
      ctx.arc(X(wr.range(-0.5, 0.5) * size), X(wr.range(-0.5, 0.5) * size), X(size * wr.range(0.006, 0.022)), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    roughen(ctx, side, seed, size * S);
    target.drawImage(layer, Math.round(x * S - side / 2), Math.round(y * S - side / 2));
  }

  // A close crop of a print's corner: paper, grain and the seal, as printed.
  // `span` is how much of the sheet's width the canvas shows.
  function sealSwatch(canvas, mark, seed, opts) {
    const o = opts || {};
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const w = canvas.width, h = canvas.height, span = o.span || 0.12;
    const S = w / span;
    ctx.fillStyle = o.paper || "#f4f0e6";
    ctx.fillRect(0, 0, w, h);
    // the edge of the printed field, just above the seal, pulled and ragged
    const en = makeNoise(makeRng(seed, "swatch-edge"));
    const top = h * (o.fieldDepth == null ? 0.14 : o.fieldDepth);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let x = 0; x <= w; x += Math.max(1, w / 160)) {
      const u = x / w;
      ctx.lineTo(x, top + (en(u * 18, 1.3) * 0.5 + en(u * 70, 4.1) * 0.25) * h * 0.012);
    }
    ctx.lineTo(w, 0);
    ctx.closePath();
    ctx.fillStyle = o.field || "#e8dcc4";
    ctx.fill();
    drawSeal(ctx, S, span / 2, (h / S) * 0.56, span * 0.52, mark, false, seed);
    // grain at screen scale, so a close crop looks like paper and not pixels
    paperGrain(ctx, w, h, Math.min(S, w), seed, false);
  }

  function render(canvas, opts) {
    return finish(renderSteps(canvas, opts));
  }

  function* renderSteps(canvas, opts) {
    const seed = String(opts.seed);
    const partner = String(opts.partner == null || opts.partner === "" ? seed : opts.partner);
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const w = canvas.width, h = canvas.height;
    const S = w / W; // unit -> px

    const t = traitsFor(seed, opts.portrait);
    const pt = traitsFor(partner, opts.partnerPortrait);
    const sil = decodeSilhouette(opts.silhouette);
    const bg = t.palette.bg;
    const dark = lum(bg) < 0.2;
    const rng = makeRng(seed, "render");

    // Border geometry (paper margin around the printed field)
    const margin = { None: 0, Narrow: 0.045, Wide: 0.085 }[t.border];
    const paperColor = margin ? (dark ? mix(bg, "#000000", 0.25) : mix(bg, "#ffffff", 0.55)) : bg;

    ctx.save();
    ctx.fillStyle = paperColor;
    ctx.fillRect(0, 0, w, h);

    // Printed field with a slightly ragged, pulled-print edge.
    if (margin) {
      const en = makeNoise(makeRng(seed, "edge"));
      const m = margin, pts = [];
      const per = 900;
      const edge = (u, v) => en(u * 140 + v * 3, v * 140 + u * 5) * 0.0011 + en(u * 23 + 9, v * 23 + 4) * 0.0009 + en(u * 4, v * 4) * 0.0014;
      for (let i = 0; i <= per; i++) pts.push([m + (W - 2 * m) * (i / per), m + edge(i / per, 0)]);
      for (let i = 0; i <= per; i++) pts.push([W - m + edge(1, i / per), m + (H - 2 * m) * (i / per)]);
      for (let i = per; i >= 0; i--) pts.push([m + (W - 2 * m) * (i / per), H - m + edge(i / per, 1)]);
      for (let i = per; i >= 0; i--) pts.push([m + edge(0, i / per), m + (H - 2 * m) * (i / per)]);
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p[0] * S, p[1] * S) : ctx.moveTo(p[0] * S, p[1] * S)));
      ctx.closePath();
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.clip();
      ctx.translate(m * S, m * S);
      ctx.scale((W - 2 * m) / W, (H - 2 * m) / H);
    } else {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
    }

    yield "paper"; // the paper and the empty printed field, before any form

    let forms = layoutFor(seed, t, sil);
    const fate = makeRng(seed, "fate-render");

    // Mimicry / Mirror: the work imitates itself. The left half is kept and
    // reflected, not quite perfectly, the way an imitation never is.
    if (t.mimicry === "Mirror") {
      const left = forms.filter((f) => f.x <= W / 2);
      const copies = left.map((f) => Object.assign({}, f, {
        x: W - f.x + fate.gauss() * 0.006,
        y: f.y + fate.gauss() * 0.006,
        flip: !f.flip,
        mirror: true,
      }));
      forms = left.concat(copies).sort((a, b) => b.r - a.r);
    }

    // Outlier: one form that does not fit in. Off-palette, and set apart.
    let outlier = null;
    if (t.outlier !== "None" && forms.length > 2) {
      const pool = forms.slice(Math.floor(forms.length * 0.3));
      outlier = Object.assign({}, pool[Math.floor(fate.next() * pool.length)]);
      forms = forms.filter((f) => f !== outlier);
      let best = [W / 2, H / 2], bestD = -1;
      for (let i = 0; i < 60; i++) {
        const cx = fate.range(0.16, 0.84) * W, cy = fate.range(0.14, 0.86) * H;
        let d = Infinity;
        for (const f of forms) d = Math.min(d, Math.hypot(f.x - cx, f.y - cy) - f.r);
        if (d > bestD) { bestD = d; best = [cx, cy]; }
      }
      const rmax = { Monumental: 0.09, Gathering: 0.07, Crowd: 0.05, Murmuration: 0.04 }[t.density];
      outlier.x = best[0]; outlier.y = best[1];
      outlier.r = rmax * (0.8 + 0.2 * fate.next());
      outlier.color = outsiderFor(t.palette);
      outlier.role = "fill";
    }

    const pen = makeNoise(makeRng(seed + partner, "pen"));
    const penRng = makeRng(seed + partner, "pen-rng");
    const scaleW = { Monumental: 0.0062, Gathering: 0.0052, Crowd: 0.0041, Murmuration: 0.0032 };
    const ownInk = inkFor(t.palette, bg);
    const pInk = inkFor(pt.palette, bg);

    // `only` draws one hand alone ("forms" or "lines"), for explaining the work.
    const only = opts.only || "";

    // 1. Solid forms (this work's own hand)
    const ink = t.palette.ink === "mixed" ? null : t.palette.ink;
    for (const f of forms) {
      if (f.role !== "fill" || only === "lines") continue;
      let mode = ink || (rng.chance(0.5) ? "multiply" : "over");
      if (lum(f.color) < 0.05) mode = "over";
      ctx.globalCompositeOperation = mode === "multiply" && !dark ? "multiply" : "source-over";
      drawFill(ctx, f, S, mode, bg, rng);
      yield "form";
    }
    ctx.globalCompositeOperation = "source-over";

    // 2. This work's own outlines (Veiled / Hollow), in its own ink.
    let budget = 260000;
    for (const f of forms) {
      if (f.role !== "line" || only === "lines") continue;
      const c = ownInk.includes(f.color) ? f.color : penRng.pick(ownInk);
      budget -= yield* stippleSteps(ctx, blobPoints(f, 40), S, c, scaleW[t.density] * penRng.range(0.8, 1.25), pen, penRng, budget / 4);
      if (budget <= 0) break;
    }

    yield "hand";

    // 3. The partner's hand: their forms return as pen lines, in their ink.
    const pForms = layoutFor(partner, pt);
    const share = { Faint: 0.28, Echo: 0.62, Mirror: 0.42, Twin: 0.32 }[t.mimicry] *
      { Solid: 0.8, Mixed: 1, Outlines: 1.3 }[t.style];
    const take = Math.max(3, Math.round(pForms.length * Math.min(1, share)));
    const pw = scaleW[pt.density] * 1.1;
    let pbudget = only === "forms" ? 0 : 220000;
    for (const f of pForms.slice(0, take)) {
      if (pbudget <= 0) break;
      const ghost = Object.assign({}, f, {
        x: f.x + penRng.gauss() * f.r * 0.08,
        y: f.y + penRng.gauss() * f.r * 0.08,
        r: f.r * penRng.range(0.98, 1.12),
      });
      const c = pInk.includes(f.color) ? f.color : penRng.pick(pInk);
      pbudget -= yield* stippleSteps(ctx, blobPoints(ghost, 40), S, c, pw * penRng.range(0.8, 1.3), pen, penRng, pbudget / 3);
      if (pbudget <= 0) break;
    }

    // Mimicry / Twin: the other copies you. Every solid form gets a shadow
    // outline in the partner's ink, a little off, trying to match.
    if (t.mimicry === "Twin" && only !== "forms") {
      let tb = 160000;
      for (const f of forms) {
        if (f.role !== "fill") continue;
        const twin = Object.assign({}, f, { x: f.x + f.r * 0.14, y: f.y - f.r * 0.1, r: f.r * 1.02 });
        tb -= yield* stippleSteps(ctx, blobPoints(twin, 40), S, penRng.pick(pInk), scaleW[t.density] * 0.85, pen, penRng, tb / 3);
        if (tb <= 0) break;
      }
    }

    // The sitter: their outline, traced by the other's pen. Seen.
    if (sil && only !== "forms") {
      const sw = scaleW[t.density] * 1.5;
      yield* stippleSteps(ctx, sil, S, pInk[0], sw, pen, penRng, 30000);
      const inner = sil.map(([x, y]) => [SIL_C[0] * W + (x - SIL_C[0] * W) * 0.985, SIL_C[1] * H + (y - SIL_C[1] * H) * 0.985]);
      yield* stippleSteps(ctx, inner, S, ownInk[0], sw * 0.6, pen, penRng, 30000);
    }

    // The outlier, last, on top of everything.
    if (outlier && only !== "lines") {
      drawFill(ctx, outlier, S, "over", bg, rng);
      yield "form";
    }
    if (outlier && only !== "forms") {
      const neutral = dark ? "#f4efe0" : "#1d1d1b";
      if (t.outlier === "Spotlight") {
        // Someone noticed: a ring drawn around it, twice, by hand.
        for (let k = 0; k < 2; k++) {
          const rr = outlier.r * (1.75 + k * 0.32);
          const pts = ringPoints(outlier.x, outlier.y, rr, 36).map(([x, y]) => [x + fate.gauss() * rr * 0.03, y + fate.gauss() * rr * 0.03]);
          yield* stippleSteps(ctx, pts, S, neutral, scaleW[t.density] * 1.2, pen, penRng, 20000);
        }
      } else if (t.outlier === "Embraced") {
        // The partner's pen goes around it again and again.
        for (let k = 0; k < 5; k++) {
          const g = Object.assign({}, outlier, {
            r: outlier.r * (1.3 + k * 0.22),
            x: outlier.x + fate.gauss() * outlier.r * 0.06,
            y: outlier.y + fate.gauss() * outlier.r * 0.06,
            blob: Object.assign({}, outlier.blob, { rot: outlier.blob.rot + k * 0.25 }),
          });
          yield* stippleSteps(ctx, blobPoints(g, 40), S, pInk[k % pInk.length], scaleW[t.density] * 1.15, pen, penRng, 20000);
        }
      }
    }

    ctx.restore();

    // The seal: in the margin when there is one, else in the corner of the field.
    const sealSize = margin ? Math.min(0.05, margin * 0.62) : 0.042;
    const sx = margin ? W - margin - sealSize * 0.7 : W - 0.06;
    const sy = margin ? H - margin / 2 : H - 0.055;
    drawSeal(ctx, S, sx, sy, sealSize, t.mark, dark && !margin ? true : lum(paperColor) < 0.2, seed);

    paperGrain(ctx, w, h, S, seed, dark);
    // Where the outlier sits on the page, in unit coordinates (for crops).
    const k = margin ? [(W - 2 * margin) / W, (H - 2 * margin) / H] : [1, 1];
    const at = outlier ? { x: margin + outlier.x * k[0], y: margin + outlier.y * k[1], r: outlier.r * k[0] } : null;
    return { traits: t, partnerTraits: pt, outlier: at, width: W, height: H };
  }

  function features(seed, partner, portrait, partnerPortrait, silhouette) {
    const t = traitsFor(seed, portrait);
    const p = traitsFor(partner == null || partner === "" ? seed : partner, partnerPortrait);
    return {
      Palette: t.palette.name,
      Disposition: NAMES[t.composition],
      Presence: NAMES[t.density],
      Mask: NAMES[t.style],
      Unrest: Math.round(t.chaos * 10),
      Frame: t.border,
      Sitter: decodeSilhouette(silhouette) ? "Present" : "Absent",
      Outlier: t.outlier,
      Mimicry: t.mimicry,
      Seal: t.mark,
      "Partner Palette": p.palette.name,
    };
  }

  // For live visualisers: a work's forms as outlines, and a single blob.
  function outlinesFor(seed, portraitHex, limit) {
    const t = traitsFor(seed, portraitHex);
    return layoutFor(seed, t).slice(0, limit || 40).map((f) => ({ pts: blobPoints(f, 48), color: f.color, r: f.r }));
  }
  function blobAt(key, x, y, r, chaos) {
    const rng = makeRng(String(key), "blob");
    return blobPoints({ x, y, r, blob: makeBlob(rng, chaos == null ? 0.5 : chaos) }, 64);
  }

  root.Interplay = {
    render, renderSteps, features, traitsFor, encodePortrait, decodePortrait, drawSeal, sealSwatch, decodeSilhouette, outlinesFor, blobAt, inkFor, PALETTES, COMPOSITIONS, DENSITIES, STYLES, BORDERS, NAMES,
    SILHOUETTE: { centre: SIL_C, radius: SIL_R, width: W, height: H },
    version: "2.1.0",
  };
})(typeof window !== "undefined" ? window : globalThis);

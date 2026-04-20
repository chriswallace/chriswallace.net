const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function getScrollY() {
  return window.lenis ? window.lenis.scroll : window.scrollY || window.pageYOffset;
}

function onScroll(callback) {
  if (window.lenis) {
    window.lenis.on("scroll", callback);
    return;
  }
  let rafId = null;
  window.addEventListener("scroll", () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      callback();
      rafId = null;
    });
  }, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  initHomepage();
});

function initSmoothScroll() {
  if (typeof Lenis === "undefined") return;

  const lenis = new Lenis({
    lerp: 0.1,
    duration: 1.2,
    easing: easeOutCubic,
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1.2,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  window.lenis = lenis;

  if (document.body.classList.contains("home")) {
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (options) {
      if (options && options.behavior === "smooth") {
        lenis.scrollTo(this, { offset: 0, duration: 1.0, easing: easeOutCubic });
        return;
      }
      originalScrollIntoView.call(this, options);
    };
  }
}

function initHomepage() {
  const scrollButton = document.getElementById("scroll-to-next");
  const nextSection = document.getElementById("problem-section");

  if (scrollButton && nextSection) {
    scrollButton.addEventListener("click", () => {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  initHero3DEffect();
  initHeroCanvas();
  initAsciiTerminal();
}

function initHero3DEffect() {
  const heroSection = document.getElementById("hero-section");
  if (!heroSection) return;

  const updateHeroTransform = () => {
    const scrollY = getScrollY();
    const viewportHeight = window.innerHeight;
    const effectEnd = viewportHeight * 0.2;
    const scrollProgress = Math.max(0, Math.min(1, scrollY / effectEnd));
    const easedProgress = 1 - Math.pow(1 - scrollProgress, 3);

    heroSection.style.setProperty("--hero-content-z", `${-easedProgress * 30}px`);
    heroSection.style.setProperty("--hero-content-scale", 1 - easedProgress * 0.05);
    heroSection.style.setProperty("--hero-content-opacity", 1 - easedProgress * 0.85);
  };

  const heroTop = heroSection.querySelector(".hero-top");
  if (heroTop) {
    heroTop.style.setProperty("transform", "none");
    heroTop.style.setProperty("opacity", "1");
  }

  onScroll(updateHeroTransform);
  heroSection.style.setProperty("--hero-content-z", "0px");
  heroSection.style.setProperty("--hero-content-scale", "1");
  heroSection.style.setProperty("--hero-content-opacity", "1");
  updateHeroTransform();
  window.addEventListener("resize", updateHeroTransform, { passive: true });
}

function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W, H, nodes, edges, signals, lastSpawn = 0, prevTs = 0;
  const G = [131, 227, 107];

  function rgba(r, g, b, a) { return `rgba(${r},${g},${b},${a})`; }

  function buildGraph() {
    const count = Math.round((W * H) / 28000) + 14;
    nodes = Array.from({ length: count }, () => {
      const cx = W * 0.06 + Math.random() * W * 0.88;
      const cy = H * 0.06 + Math.random() * H * 0.88;
      const rx = 18 + Math.random() * 52;
      const ry = 12 + Math.random() * 36;
      return {
        cx, cy, rx, ry,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRotation: Math.random() * Math.PI * 2,
        angularVel: (0.06 + Math.random() * 0.1) * (Math.random() < 0.5 ? 1 : -1),
        x: 0, y: 0, prevX: 0, prevY: 0,
        r: Math.random() < 0.22 ? 3.2 + Math.random() * 1.5 : 1.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      };
    });

    for (const n of nodes) updateNodePos(n, 0);

    edges = [];
    const maxD = Math.min(W, H) * 0.3;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].cx - nodes[j].cx, nodes[i].cy - nodes[j].cy);
        if (d < maxD) {
          const bend = (Math.random() - 0.5) * 80;
          edges.push({ a: i, b: j, d, maxD, bend });
        }
      }
    }
    signals = [];
  }

  function updateNodePos(n, dt) {
    n.prevX = n.x; n.prevY = n.y;
    n.orbitAngle += n.angularVel * dt;
    const cosR = Math.cos(n.orbitRotation), sinR = Math.sin(n.orbitRotation);
    const lx = n.rx * Math.cos(n.orbitAngle);
    const ly = n.ry * Math.sin(n.orbitAngle);
    n.x = n.cx + lx * cosR - ly * sinR;
    n.y = n.cy + lx * sinR + ly * cosR;
  }

  function bezierPoint(ax, ay, bx, by, cx, cy, t) {
    const mt = 1 - t;
    return {
      x: mt * mt * ax + 2 * mt * t * cx + t * t * bx,
      y: mt * mt * ay + 2 * mt * t * cy + t * t * by,
    };
  }

  function spawnSignal() {
    if (!edges.length) return;
    const e = edges[Math.floor(Math.random() * edges.length)];
    const fwd = Math.random() < 0.5;
    signals.push({ ai: fwd ? e.a : e.b, bi: fwd ? e.b : e.a, bend: e.bend, t: 0, spd: 0.003 + Math.random() * 0.004 });
  }

  function draw(ts) {
    const dt = Math.min((ts - prevTs) / 1000, 0.05);
    prevTs = ts;

    ctx.clearRect(0, 0, W, H);
    const t = ts * 0.001;

    for (const n of nodes) updateNodePos(n, dt);

    if (ts - lastSpawn > 450 + Math.random() * 300) {
      spawnSignal();
      if (Math.random() < 0.4) spawnSignal();
      lastSpawn = ts;
    }

    for (const { a, b, d, maxD, bend } of edges) {
      const na = nodes[a], nb = nodes[b];
      const mx = (na.x + nb.x) / 2, my = (na.y + nb.y) / 2;
      const len = Math.hypot(nb.x - na.x, nb.y - na.y) || 1;
      const cpx = mx + (-(nb.y - na.y) / len) * bend;
      const cpy = my + ((nb.x - na.x) / len) * bend;
      const alpha = (1 - d / maxD) * 0.06;
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.quadraticCurveTo(cpx, cpy, nb.x, nb.y);
      ctx.strokeStyle = rgba(...G, alpha);
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    for (let i = signals.length - 1; i >= 0; i--) {
      const s = signals[i];
      s.t += s.spd;
      if (s.t > 1) { signals.splice(i, 1); continue; }
      const na = nodes[s.ai], nb = nodes[s.bi];
      const mx = (na.x + nb.x) / 2, my = (na.y + nb.y) / 2;
      const len = Math.hypot(nb.x - na.x, nb.y - na.y) || 1;
      const cpx = mx + (-(nb.y - na.y) / len) * s.bend;
      const cpy = my + ((nb.x - na.x) / len) * s.bend;
      const pos = bezierPoint(na.x, na.y, nb.x, nb.y, cpx, cpy, s.t);
      const fade = s.t < 0.1 ? s.t / 0.1 : s.t > 0.9 ? (1 - s.t) / 0.1 : 1;
      const eased = 0.5 - 0.5 * Math.cos(Math.PI * s.t);
      const radius = 8 + eased * 6;
      const gr = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
      gr.addColorStop(0, rgba(...G, 0.5 * fade));
      gr.addColorStop(1, rgba(...G, 0));
      ctx.beginPath(); ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gr; ctx.fill();
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = rgba(...G, fade); ctx.fill();
    }

    for (const n of nodes) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.55 + n.phase);
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(...G, 0.1 + pulse * 0.25); ctx.fill();
      if (n.r > 3) {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(...G, 0.03 + pulse * 0.07);
        ctx.lineWidth = 0.75; ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
    buildGraph();
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  requestAnimationFrame(draw);
}

function initAsciiTerminal() {
  const output = document.getElementById("ascii-output");
  const section = document.getElementById("ascii-section");
  if (!output || !section) return;

  const lines = [
    { text: "$ run-design-audit --product ai-assistant --team startup", cls: "ascii-prompt", type: "char" },
    { text: null },
    { text: "Scanning 6 surface areas...", cls: "ascii-scanning", type: "pause", pause: 700 },
    { text: null },
    { text: "  SURFACE AREA             STATUS        SEVERITY", cls: "ascii-th" },
    { text: "  " + "─".repeat(49), cls: "ascii-rule" },
    { text: "  conversation flows       undefined   ·  HIGH", cls: "ascii-high" },
    { text: "  agent visibility         missing     ·  HIGH", cls: "ascii-high" },
    { text: "  error & recovery         broken      ·  CRITICAL", cls: "ascii-crit" },
    { text: "  trust signals            absent      ·  HIGH", cls: "ascii-high" },
    { text: "  design system            fragmented  ·  MEDIUM", cls: "ascii-med" },
    { text: "  research cadence         inactive    ·  MEDIUM", cls: "ascii-med" },
    { text: "  " + "─".repeat(49), cls: "ascii-rule" },
    { text: "  6 issues  ·  1 critical  ·  3 high  ·  2 medium", cls: "ascii-summary", type: "pause", pause: 500 },
    { text: null },
    { text: "root cause:", cls: "ascii-label" },
    { text: "  No design leadership dedicated to AI product surfaces.", cls: "ascii-body" },
    { text: null },
    { text: "recommendation:", cls: "ascii-label", type: "pause", pause: 200 },
    { text: "  → fractional design principal  (2–3 days / week)", cls: "ascii-rec" },
    { text: "  → immediate: conversation design + trust patterns", cls: "ascii-sub" },
    { text: "  → 30 days:   design system alignment", cls: "ascii-sub" },
    { text: "  → 90 days:   research pipeline + team development", cls: "ascii-sub" },
    { text: null },
    { text: "$ audit complete ─────────────────────────── ✓ done", cls: "ascii-done", type: "char" },
  ];

  let started = false;

  async function appendLine(line) {
    const el = document.createElement("div");
    el.className = "ascii-line" + (line.cls ? " " + line.cls : "");

    if (!line.text) {
      el.innerHTML = "&nbsp;";
      output.appendChild(el);
      return;
    }

    output.appendChild(el);

    if (line.type === "char") {
      await new Promise((resolve) => {
        let i = 0;
        const type = () => {
          if (i < line.text.length) {
            el.textContent += line.text[i++];
            setTimeout(type, 22 + Math.random() * 14);
          } else {
            resolve();
          }
        };
        setTimeout(type, 30);
      });
    } else {
      el.textContent = line.text;
    }
  }

  async function runTerminal() {
    if (started) return;
    started = true;

    for (const line of lines) {
      await appendLine(line);
      const isDataRow = line.cls && ["ascii-high", "ascii-crit", "ascii-med"].includes(line.cls);
      const pause = line.pause || (line.type === "char" ? 380 : isDataRow ? 45 : !line.text ? 55 : 110);
      await new Promise((r) => setTimeout(r, pause));
    }
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      runTerminal();
    }
  }, { threshold: 0.15 });

  observer.observe(section);
}

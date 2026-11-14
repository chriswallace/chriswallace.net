# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

Personal site for Chris Wallace (designer and founder, now building Homebase Assistant). The public site is a single standalone page, `index.html`, served through Jekyll 4.3. The Tailwind CSS v3 and GSAP pipeline described below belongs to the previous multi-page site and is no longer used by the page.

## Development Commands

```bash
# Full dev server (Jekyll + CSS watch + browser-sync in parallel)
npm start

# Individual tasks
npm run jekyll:serve    # Jekyll only (incremental, watch mode)
npm run css:build       # Build Tailwind CSS (all entry points)
npm run css:watch       # Watch CSS changes with nodemon
npm run js:minify       # Concatenate and minify JS (runs build-minify.js)

# Production build
npm run jekyll:build    # JS minify → Jekyll build → CSS minify
```

## Architecture

### CSS Pipeline

Tailwind processes multiple entry point CSS files into root-level output files:

| Source | Output |
|--------|--------|
| `assets/css/main.css` | `assets/main.css` |
| `assets/css/legendary.css` | `assets/legendary.css` |
| `assets/css/interactive.css` | `assets/interactive.css` |
| `assets/css/content-preloader.css` | `assets/content-preloader.css` |

`assets/css/main.css` imports component CSS files and uses CSS layers (`reset, base, tokens, components, utilities, overrides`). Design tokens (CSS custom properties) live in `assets/css/tokens.css`. Tailwind config is in `tailwind.config.js` with fluid-tailwind for responsive clamps and a custom color system.

### JavaScript Pipeline

`build-minify.js` uses terser to:
- Concatenate `navigation.js`, `homepage.js`, `video-player.js`, `animations.js`, `card-flip.js`, `simple-card.js`, `image-lazyloader.js`, `zoomable.js` → `assets/js/concatenated.min.js`
- Minify individual files: `fxhash.js`, `interplay-page.js`, `toc-toggle.js`

In production (`jekyll.environment == 'production'`), `_includes/scripts.md` loads only `concatenated.min.js`. In development, individual source files are loaded. This conditional is set in `_includes/scripts.md`.

### Jekyll Structure

- `_layouts/`: `home.md`, `page.md`, `post.md`, `normal.md`, `full-width.md`, `greensock.md`, `interplay.md`, `naked.md`, `default.md`, `compress.html`
- `_includes/`: `head.md` (meta, CSS, CDN scripts), `header.md`, `footer.md`, `scripts.md` (JS loading)
- `index.html`: The whole public site. A standalone page (inline CSS, JS and font, no front matter), so Jekyll copies it as-is and the layouts, includes and asset pipeline below are not used by it. Each `.seg` section holds one statement in a fixed `.panel`; scroll position fades panels, lights the statement's words, and regroups the 25 dots drawn on the `#people` canvas. The script also slows the mouse wheel (`GEAR`, `WEIGHT`); touch, keyboard and reduced-motion users get native scrolling
- `404.html`: Standalone page that sends any unknown URL to the homepage
- `vercel.json`: Permanent redirects from the old page URLs (`/bio`, `/portfolio/*`, `/articles/*`, `/art/*`, etc.) to `/`
- `_site/`: Jekyll build output (do not edit directly)

### Cache Busting

The `version` field in `_config.yml` is appended as a query param (`?v={{ site.version }}`) to CSS and JS `<link>`/`<script>` tags. Bump this when deploying changes that require cache invalidation.

### External Dependencies (CDN)

Loaded in `_includes/head.md`:
- GSAP 3.12.2 + ScrollTrigger
- Lenis 1.3.17 (smooth scroll)
- Splitting.js (text animation)

### Web Components

`simple-card` is a custom web component defined in `assets/js/simple-card.js`, loaded via the webcomponents polyfill.
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

Personal portfolio/business site for Chris Wallace (fractional design leadership) built with Jekyll 4.3, Tailwind CSS v3, and GSAP animations.

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
- `_posts/`: Blog posts with front matter
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
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
- `index.html`: The whole public site. A standalone page (inline CSS, JS and font, no front matter), so Jekyll copies it as-is and the layouts, includes and asset pipeline below are not used by it. Each `.seg` section holds a fixed `.panel` with one or more `.say` lines that share one place: scroll position shows one line at a time, lights its words (a block cursor follows the last lit word), and reshapes the outlined frame drawn on the `#frame` canvas. Special sections: the art section moves a strip of Interplay pieces (`assets/images/interplay/`, rendered from the private `chriswallace/interplay` repo's `art/interplay.js`; only images are published, not the renderer) across the screen; the film section darkens the page (`#dark`) and plays six short loops cut from `assets/video/woodies-origin.mp4` (`assets/video/woodies/`); a click in the game section adds a floor to its tower. A `.say` line can carry `data-state` to borrow another section's drawing. Edit `index.html` directly; it is the source. `assets/images/share.png` is the 1200×630 social sharing image. Each line should have a visual that states its own fact: drawings are `DRAW.<name>` functions registered in `STATES`, and frame labels describe the drawing, not a screen ratio. States with a `plate` show a picture of the real work (`assets/images/work/`) inside the frame for the lines that name it. The `character` state hides the frame and spawns five Woodies stickers (`#brood`, `assets/images/woodies/sticker-*.webp`) from the centre of the drawing area to the spots in `NEST`. Arden (the film character) is not a generative Woodie. A drawing's progress runs over the neighbouring lines that share it and never loops; the wheel's settling only moves forward in the scroll direction. A plate can be a `<video>` (`assets/video/homebase/`): it plays only while on screen, and one with `data-once` plays through once and holds on its last frame. Lines without real work to show are carried by the flow (`#flow` canvas): 110 strands that never stop moving, whose velocity field is set per line with `data-flow` (`ask`, `make`, `team`, `lead`, `ring`, `blocks`, `lanes`, `order`, `gather`, `rise`; `calm` by default, `hush` while a plate, video, sticker or drawing shows). These are abstract on purpose: do not replace them with literal diagrams of the sentence. Such lines use the frameless `flow` state. On wide screens the strands gather in the stage; on small screens they fill the page behind the words. A pixel mascot (`#pal`, a 22×15 canvas beside the name) blinks, glances around, follows the pointer and changes expression per section (`MOODS`). The page uses one font at one weight, Redaction 50 Regular, embedded as base64, and one type size per section. Each line has a rest point (`.rest`) where it is fully lit: touch scrolling snaps to these with CSS, and the wheel settles on them in script. The script also slows the mouse wheel (`GEAR`, `WEIGHT`); touch, keyboard and reduced-motion users get native scrolling
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
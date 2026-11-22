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
- `index.html`: The whole public site. A standalone page (inline CSS, JS and font, no front matter; the 3D Woodie viewer is the one script it loads from a file), so Jekyll copies it as-is and the layouts, includes and asset pipeline below are not used by it. Each `.seg` section holds a fixed `.panel` with one or more `.say` lines that share one place: scroll position shows one line at a time, lights its words (a block cursor follows the last lit word), and reshapes the outlined frame drawn on the `#frame` canvas. Chapter ticks (`.ticks`) run down the right edge, just inside the frame: one tick per chapter, each a link to the section the chapter starts at. The current chapter's tick is longer, and its name shows for a moment when you reach it. A click jumps to that section's first rest point, and a press and drag along the ticks jumps to each chapter the pointer passes and names it. On a touch screen the ticks wait folded into one short line under the contact link (`.ticks-handle`), with a dot for the current chapter, and the chapter's name flashes beside it when you reach one. A tap on the line opens the ticks in their place (`.is-open`), naming the current chapter; a press on it and a drag down into them moves between chapters. They fold again after a jump, a tap elsewhere, Escape, or 4 seconds unused. The page sits on one grid: a side margin (`--gutter`, 28px on a phone, up to 88px) and, from 900px, twelve columns inside it (`--col-gap`). Words start at column 1 (columns 1 to 6 in a story panel, 1 to 5 from 1280px). Every frame, plate and the Interplay piece start at column 7 (`target()`, `artScroll`), which is also where the projects' second column starts; a frame as wide as its stage ends at the right margin, under the contact link. A frame that is limited by height keeps its left edge on the line and leaves the room to its right. On a narrow screen the frames start at the side margin, where the words start. Frames and the piece leave room for the chapter navigation (`navRoom`): they end 12px before the tick marks where the ticks sit inside the margin, and on a touch screen a frame that would reach the folded handle starts below it. Keep new work on these lines. The type sizes (`--display-size`, `--impact-size`, `--say-size`) grow steadily with the screen and meet at 900px. Special sections: the art section turns the page the paper of one Interplay piece (`#paper`) and draws that piece live with the real renderer. `assets/js/interplay.js` is a public copy of the `chriswallace/interplay` repo's `art/interplay.js`, changed only so the drawing can run a step at a time (`Interplay.renderSteps`, a generator that yields `paper`, `form`, `pen` and `hand`); `render` gives the same image as the original. The piece is fixed (`PIECE`: seed `chris-3384`, partner `hand-398`). The renderer loads once the reader is within two sections (`askPiece`). The first line (`.say--over`) sits over the empty printed field; once it is lit and has held 900 ms, or the reader scrolls on, copies of its words fall away in `#fall` and act one draws the shapes. The piece then moves from the centre of the screen to its half of the story panel, and act two (the partner's pen lines, the second hand) waits for the fourth line, the one that names the second hand. The lines run as one story: Chris made art with AI, set Interplay's rules while GPT-4 helped write the code, the code draws each piece, a second hand traces another piece over it, then whether AI was a collaborator or a tool (both), and that art still needs a person who means something by it. The drawing plays once (`ACT_ONE`, `ACT_TWO`), then the exact finished render settles over it. Reduced motion shows the finished piece at once. Where the renderer cannot run, `assets/images/interplay/interplay-3384.webp` shows instead; the Woodies section darkens the page (`#dark`, with a dimmed night-forest still from the film behind it), stands a wall of real generative Woodies behind its first two lines, edge to edge, seen straight on, leaning back, running past every edge of the screen and moving from the bottom to the top with the scroll (`#sheet`: one tiled picture of 100 different Woodies, `assets/images/woodies/sheet.webp`, built from the images the collection's metadata names on Arweave, on one layer whose transform alone follows the scroll), and plays six short loops cut from `assets/video/woodies-origin.mp4` (`assets/video/woodies/`) through the line marked `data-state="reel"`; the line about 3D characters shows a real 3D Woodie on a canvas inside the frame, on a studio backdrop in the forest's green so it stands apart from the trees (`assets/js/woodie-viewer.js`, shaded and lit like the Woodies website's `ModelDisplay`, with toon materials, four flat lighting bands and a painted ground shadow, plus one rim light: `assets/js/three/` is three.js r162 found through the import map in the head, the model is `assets/models/woodie-1188.glb` and its idle animation `assets/models/woodie-idle.glb`), which a sideways drag turns, which runs only while it is on screen, and which falls back to a still render (`assets/images/work/woodie-3d.webp`) where it cannot load; the forest, the sheet and the 3D files load only once the reader is within two sections (`.woodies-near`, `askViewer`); a click in the game section adds a floor to its tower; the projects section (`panel--grid`) holds one line and a grid of cards (`.projects`), one for each thing being built now, with its state, name, description and link, which come up one after another once the line is lit; the Homebase section's `week` drawing is a rota that fills its frame (seven days with rules between them, shifts of different lengths, some open and dashed), and one live line moves through the week over the two lines that share it: shifts behind it are filled in, and each open shift it passes is covered in the live colour; the Roblox section turns the page slate (`#slate`) and draws a solid block figure (`figure`, six boxes in perspective) that pops forward out of its outline halfway through, drawn after the frame (`over`) so it stands in front of the border with its head past the top, then turns, waves and walks as the section's lines go by. A `.say` line can carry `data-state` to borrow another section's drawing. Edit `index.html` directly; it is the source. `assets/images/share.png` is the 1200×630 social sharing image. Drawings are `DRAW.<name>` functions registered in `STATES`, in an outlined line-work style. A drawing whose state has `ratio: 0` can run over the whole page (the question marks, the 10up loops, the UltraDAO points, the principles' idea sketches): `pack` places the question marks (large ones first, then smaller ones in the room left, with no rows or columns), `keepOff` clips long lines so they pass behind the words, and both use `avoid`, the rectangles of the words on screen, the name, the contact link and the ticks. Keep them abstract where a line is about a count or a number of people (no rows of person icons, no literal tallies), and do not caption drawings: only plates of real work and the tower's instruction carry a frame label. On an upright phone the drawing takes all the height the text does not need, and the text sits under it. A state with a `tall` ratio takes that taller shape there, and its drawing lays itself out for a frame taller than it is wide. The principles section (`panel--finale`) runs one drawing, `DRAW.finale`, across its four lines in the part of the screen the words leave free (`free`): beside them on a wide screen, above them on an upright phone, where the words sit low. A question grows rings, ideas are sketched and struck out (round the question, and on a wide screen all over the page, kept off the rectangles in `avoid`: the words, the name, the contact link and the ticks), the strongest is shipped and remade, and people come in from the screen edges and gather round it. The close (`end`) is taller than the screen: the blue comes up over the last line with one pulsing live dot on it (`#pulse`, an element animated in CSS), and its words slide up and fade in after (`--in`). States with a `plate` show a picture of the real work (`assets/images/work/`) inside the frame for the lines that name it. The `character` state hides the frame and spawns five Woodies stickers (`#brood`, `assets/images/woodies/sticker-*.webp`) from the centre of the drawing area to the spots in `NEST`. Arden (the film character) is not a generative Woodie, so the sheet shows only generative Woodies. A drawing's progress runs over the neighbouring lines that share it and never loops; the wheel's settling only moves forward in the scroll direction. A plate can be a `<video>` (`assets/video/homebase/`, and `assets/video/story-sync.mp4`, cut from `assets/video/twd-story-sync.mp4`): it plays only while on screen, and one with `data-once` plays through once and holds on its last frame. A pixel mascot (`#pal`, a 22×15 canvas beside the name) blinks, glances around, follows the pointer and changes expression per section (`MOODS`). The page uses one font at one weight, Redaction 50 Regular, embedded as base64, and one type size per section. The script sets each section's height from its words: every line takes `PER_LINE` plus `PER_WORD` per word (in svh), a section takes at least `SHORTEST`, and `data-min` on a section sets a longer minimum where a drawing or the film needs time. Each line has a rest point (`.rest`) where it is fully lit: touch scrolling snaps to these with CSS, and the wheel settles on them in script. The script smooths the mouse wheel (`GEAR`, `WEIGHT`); touch, keyboard and reduced-motion users get native scrolling
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
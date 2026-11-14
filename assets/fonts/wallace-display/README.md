# Wallace Display

The display font for statements on the homepage. It is a cut of
[Epilogue](https://github.com/Etcetera-Type-Co/Epilogue) (SIL Open Font License 1.1, see `OFL.txt`)
at one weight, with:

- tight tracking built in (CSS `letter-spacing` turns ligatures off, so the page must not set it on statements)
- new ligatures: `Th`, `tt`, `ft`, `tf` share a bar; `oo` links like a chain; `->` becomes an arrow

`index.html` embeds both `WallaceDisplay.woff2` and `Epilogue-latin-variable.woff2` as base64, so these files
are the sources, not files the page loads.

## Rebuild

```bash
pip install fonttools brotli skia-pathops
python3 build.py Epilogue-latin-variable.woff2 680 WallaceDisplay.ttf WallaceDisplay.woff2
```

The second argument is the weight. After a rebuild, replace the base64 data in the `Wallace Display`
`@font-face` rule in `index.html`.

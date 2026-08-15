# Favicon — Production Notes

**Status: done.** `public/favicon.svg` bakes in a real vector `<path>` for
the "M" — no `@font-face` dependency at render time — and the full raster
set (`favicon.ico`, `apple-touch-icon.png`, Android chrome icons,
`site.webmanifest`) is generated and wired into `BaseLayout.astro`'s
`<head>`. The steps below are kept as the reproducible pipeline for
regenerating everything if the seal mark ever changes.

## What's in `public/`

- `favicon.svg` — the seal circle with a vector-path "M" (Blackletter
  Initial), colors invert for OS-level dark mode via a plain media query
  (no font needed for that either)
- `favicon.ico` — 16/32/48px, PNG-in-ICO (modern format, works everywhere
  since Windows Vista)
- `apple-touch-icon.png` — 180×180, flattened onto the Bone & Brass page
  background (transparent looks bad on iOS, which fills gaps with black)
- `android-chrome-192x192.png` / `android-chrome-512x512.png`
- `site.webmanifest`

## Why the vector path, not live text

Favicon rendering happens in a more restricted context than a normal
page — browsers frequently rasterize favicons without reliably loading the
`@font-face` import, especially in Safari, pinned tabs, bookmarks, and
OS-level icon caches (Windows tiles, Android home screen, etc.). In the
worst case, the "M" silently falls back to a generic system serif instead
of the blackletter glyph, and you won't notice unless you check each
platform individually. Baking the glyph outline in as a plain `<path>`
sidesteps the problem entirely.

## Regenerating (if the seal mark ever changes)

1. **Extract the glyph outline** from the real Pirata One font file:
   ```bash
   npm install opentype.js --save-dev   # already a devDependency
   node scripts/extract-favicon-glyph.js
   ```
   Prints a `<path d="...">` — paste it into `favicon.svg`'s `<path class="ink" d="...">`.
   (The `FONT_URL` inside the script is versioned by Google Fonts and does
   drift over time — grab the current one from the `@font-face` `src` in
   `https://fonts.googleapis.com/css2?family=Pirata+One&display=swap` if
   the script's URL 404s.)

2. **Regenerate the raster set:**
   ```bash
   npm install sharp --save-dev   # already a devDependency
   node scripts/generate-favicon-assets.js
   ```
   Rewrites `favicon.ico`, `apple-touch-icon.png`, both Android chrome
   PNGs, and `site.webmanifest` from the current `favicon.svg`.

3. **The `<head>` wiring** in `src/layouts/BaseLayout.astro` doesn't need
   to change unless you rename a file:
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   <link rel="manifest" href="/site.webmanifest" />
   ```

4. **Sanity check on an actual phone** (Android "add to home screen") and
   Safari (pinned tab / bookmark) — the two places a font-dependent favicon
   was most likely to have silently failed before this fix, and worth a
   once-over after any regeneration too. This is the one step that
   genuinely needs a physical device rather than a browser.

# Favicon — Production Notes

**Status: done.** `public/favicon.svg` is the 7-point star seal — a solid
center hub plus seven rays, all built from one consistent path formula —
as a plain vector `<path>`, no font dependency of any kind, so there's no
risk of it silently rendering as the wrong glyph anywhere. The full raster
set (`favicon.ico`, `apple-touch-icon.png`, Android chrome icons,
`site.webmanifest`) is generated and wired into `BaseLayout.astro`'s
`<head>`.

An earlier version of the star tapered each ray to a bare point at
center and mixed mirrored/non-mirrored ray paths, which caused
inconsistent winding and made the mark look thin and disconnected at
small (nav bar / favicon) sizes — exactly the sizes it's mostly used at.
The current version fixes that: every ray shares one formula, and the
solid hub means everything connects through something solid instead of
a point.

The seal mark previously used a blackletter "M" set in the Pirata One
webfont, which needed a separate `opentype.js` glyph-extraction step
(`scripts/extract-favicon-glyph.js`) to bake into a font-independent path.
That script and its `@font-face` risk are gone now that the mark itself
is pure vector — see `src/components/Seal.astro` for the on-page version
and `TYPOGRAPHY.md` for why Pirata One no longer appears in the seal at
all.

## What's in `public/`

- `favicon.svg` — the 7-point star, colors invert for OS-level dark mode
  via a plain media query
- `favicon.ico` — 16/32/48px, PNG-in-ICO (modern format, works everywhere
  since Windows Vista)
- `apple-touch-icon.png` — 180×180, flattened onto the Bone & Brass page
  background (transparent looks bad on iOS, which fills gaps with black)
- `android-chrome-192x192.png` / `android-chrome-512x512.png`
- `site.webmanifest`

## Regenerating (if the seal mark ever changes)

The star's path lives in two places that need to stay in sync:
`src/components/Seal.astro` (the on-page version, used in the nav and the
divider ornaments) and `public/favicon.svg` (the standalone favicon
version, with the added dark-mode media query). Update the `<path d="...">`
in both, then regenerate the raster set:

```bash
npm install sharp --save-dev   # already a devDependency
node scripts/generate-favicon-assets.js
```

This rewrites `favicon.ico`, `apple-touch-icon.png`, both Android chrome
PNGs, and `site.webmanifest` from the current `favicon.svg`. The `<head>`
wiring in `src/layouts/BaseLayout.astro` doesn't need to change unless you
rename a file:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

Worth a sanity check on an actual phone (Android "add to home screen")
and Safari (pinned tab / bookmark) after any regeneration, though the
pure-vector path means there's much less that can silently go wrong there
than with the old font-based approach.

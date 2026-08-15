# Typography System — Final

## The four typefaces

| Role | Typeface | CSS variable |
|---|---|---|
| Hero title, seal mark, favicon, nav wordmark | **Pirata One** | `--font-display` |
| All h2/h3 headings, subheadings, nav links, dense doc lists, tags | **Cinzel** | `--font-heading` |
| Body copy, paragraph text | **EB Garamond** | `--font-body` |
| UI chrome — buttons, search, meta labels, toolbar text | **Inter** | `--font-ui` |

## The rule that matters most

**Pirata One (true blackletter) is reserved for exactly four places: the
hero `<h1>`, the seal/brand mark, the favicon, and the nav bar wordmark.**
It never appears in body headings, sidebar nav, tags, or anything read at
a glance rather than paused on.

This isn't arbitrary — we tested it directly. A single glyph at hero size
(64px+) reads fine in blackletter. Full words at heading size (20-26px)
still hold up. But dense, small, frequently-scanned text — sidebar links,
tag pills, doc trees — starts to blur and take real effort to parse in
blackletter well before it becomes illegible in isolation. Cinzel handles
all of that instead: enough gothic character (engraved Roman capitals) to
stay on-brand, without the legibility cost.

## Google Fonts import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Pirata+One&family=Cinzel:wght@500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

## CSS tokens (already in `src/styles/theme.css`)

```css
:root {
  --font-display: 'Pirata One', serif;
  --font-heading: 'Cinzel', serif;
  --font-body: 'EB Garamond', serif;
  --font-ui: 'Inter', sans-serif;
}
```

## Typefaces considered and rejected

For anyone revisiting this later — these were tested and deliberately
not chosen, so there's no need to re-litigate them from scratch:

- **UnifrakturMaguntia / UnifrakturCook** — heavier, more traditionally
  Fraktur than Pirata One. Tested as a seal-mark alternative; rejected in
  favor of staying with Pirata One for consistency with the hero title.
- **Almendra SC, Metamorphous, IM Fell English SC, Spectral SC** — tested
  as h2/h3 alternatives to Cinzel. Almendra SC was the strongest
  contender, but the decision was to keep Cinzel rather than introduce a
  fifth typeface.
- **Playfair Display** — deliberately avoided. It's one of the most
  overused "elegant serif" choices in web design right now and would
  undercut the specificity of everything else here.

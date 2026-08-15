# Icon System — Sourcing & Usage

## Two sources, two jobs

**Tabler Icons** (MIT license — no attribution required)
https://tabler.io/icons
Base for every functional UI icon: 3D viewport, build log, search, download,
system tags, viewport controls, theme toggle. Pull the real path data from
Tabler's site or the `@tabler/icons` npm package and drop it into
`Icon.astro`'s `icons` map — the wrapper component already applies the house
stroke spec (`stroke-width: 1.5`, `stroke-linecap: square`,
`stroke-linejoin: miter`) to whatever path data goes in, so no per-icon
styling work is needed.

**game-icons.net** (CC BY 3.0 — attribution required)
https://game-icons.net
Reserved for icons needing real pictorial specificity a generic UI library
doesn't have — right now, just the terrain/ruins flourish. Kept in its
native bold/filled style rather than forced into the thin-line spec, since
it's used decoratively (category markers, section headers), not as inline
UI chrome.

## Usage

```astro
---
import Icon from '../components/Icon.astro';
import TerrainFlourish from '../components/TerrainFlourish.astro';
---

<Icon name="viewport3d" size={20} />
<Icon name="search" size={18} class="nav-icon" />
<TerrainFlourish size={40} class="category-marker" />
```

## Adding a new icon later

1. Find the closest match on tabler.io/icons.
2. Copy its raw path data (the contents inside the `<svg>` tag).
3. Add it as a new entry in the `icons` object in `Icon.astro`.
4. Use it: `<Icon name="yourNewIcon" />` — it automatically inherits the
   correct stroke weight, caps, and joins. No separate styling step.

## Attribution requirement

Because the terrain flourish is CC BY 3.0, add a small credit line
somewhere globally visible — a footer note is sufficient:

> Terrain icon via [game-icons.net](https://game-icons.net) (CC BY 3.0)

Nothing else in the icon set needs attribution — Tabler is MIT-licensed.

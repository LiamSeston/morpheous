# Morpheous — Modelling & Terrain Catalogue

*Project Morpheous*

A living record of modelling & terrain pieces spanning Mordheim, Necromunda, 40k, and whatever comes next — organized by system and category rather than per-game themes. Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321/morpheous/](http://localhost:4321/morpheous/) (note the base path).

## Adding an Asset

1. Create a markdown entry: `src/content/assets/my-asset.md`
2. (Optional) Add photos to `public/images/`
3. (Optional) Add a 3D model (`.glb` file) and host via jsDelivr CDN (see existing entries for the pattern)

Example frontmatter:

```yaml
---
title: My Piece
system: Mordheim        # Mordheim, Necromunda, 40k, etc.
category: "Terrain — Building"
status: complete        # planned, in-progress, complete
tags: ["Scratch-build", "Foamboard"]
materials: ["Foamboard", "MDF", "Paint"]
footprint: "10 × 10 cm"
height: "15 cm"
builtDate: 2026-08-01
warpstoneTouched: false # true = dark-mode neon glow (Mordheim only)
modelSrc: "https://cdn.jsdelivr.net/gh/LiamSeston/morpheous@main/models/my-piece.glb"  # optional
modelPoster: "/images/my-piece-poster.jpg"  # optional
images: []
---

## Description

Prose about how you built it, design decisions, etc.
```

Valid values:

- **system:** Any string (typically Mordheim, Necromunda, 40k, or other)
- **status:** `planned`, `in-progress`, `complete`
- **warpstoneTouched:** `true`/`false` — controls dark-mode neon glow animation (scoped to Mordheim pieces only)
- **modelSrc / modelPoster:** Optional — omit if there's no 3D scan. The site will display photos instead.

## Site Structure

- **Landing** (`/`) — project overview and featured pieces
- **Catalog** (`/catalog/`) — browsable grid of all assets, filterable by system/type/detail-level
- **Asset detail** (`/assets/[slug]/`) — individual piece with 3D viewer (if a model exists), full metadata, and build notes
- **About** (`/about/`) — project history and methodology

## GitHub Pages Deployment

This project deploys from [LiamSeston/morpheous](https://github.com/LiamSeston/morpheous).

1. Push to the `main` branch
2. In repo **Settings → Pages**, set source to **GitHub Actions**
3. Site will be live at [https://liamseston.github.io/morpheous/](https://liamseston.github.io/morpheous/)

## Project Structure

```
src/content/assets/          Markdown entries (one per piece)
src/pages/                   Index, about, catalog, asset detail routes
src/components/              AssetCard, AssetGrid, AssetViewport (3D), FilterBar
src/styles/                  Theme tokens (Bone & Brass light / Verdigris & Warpstone dark)
public/images/               Photos and preview images
public/favicon.svg           7-point star brand mark
```

## Design Notes

- **Palette**: Bone & Brass (light) / Verdigris & Warpstone (dark). Warpstone glow is dark-mode exclusive, scoped only to pieces tagged as Mordheim/warpstone-touched.
- **Fonts**: Pirata One (hero title + nav only), Cinzel (headings), EB Garamond (body), Inter (UI chrome)
- **Brand mark**: 7-point star with flat-cut ray tips, matching the icon set's square-cap language
- **3D models**: Compressed and served via jsDelivr CDN to keep hosting cost near zero

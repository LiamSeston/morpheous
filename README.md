# Mordheim Board — Terrain Catalogue

A static site for cataloguing terrain pieces for a custom Mordheim board. Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321/morpheous/](http://localhost:4321/morpheous/) (note the base path).

## Adding a Terrain Piece

1. Create a photo folder: `public/images/terrain/my-piece/`
2. Add a markdown entry: `src/content/terrain/my-piece.md`

Example frontmatter:

```yaml
---
title: My Piece
type: building
status: in-progress
dimensions: "6×4×8 in"
materials: [XPS foam, plasticard]
tags: [ruins]
heroImage: /images/terrain/my-piece/hero.jpg
gallery:
  - /images/terrain/my-piece/wip-01.jpg
started: 2026-08-01
---
```

Valid values:

- **type:** `building`, `scatter`, `tile`, `bridge`, `other`
- **status:** `planned`, `in-progress`, `complete`

3. Push to GitHub — the site rebuilds automatically.

## GitHub Pages Deployment

This project deploys from [LiamSeston/morpheous](https://github.com/LiamSeston/morpheous).

1. Push to the `main` branch
2. In repo **Settings → Pages**, set source to **GitHub Actions**
3. Site will be live at [https://liamseston.github.io/morpheous/](https://liamseston.github.io/morpheous/)

## Project Structure

```
src/content/terrain/     Markdown entries (one per piece)
public/images/terrain/   Photos organised by piece
src/components/          Cards, filters, gallery
src/pages/               Index, about, detail routes
```

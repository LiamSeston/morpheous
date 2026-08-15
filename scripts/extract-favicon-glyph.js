// scripts/extract-favicon-glyph.js
//
// Regenerates the vector-path "M" used in public/favicon.svg from the real
// Pirata One glyph outline, so the favicon has no @font-face dependency at
// render time (unreliable in favicon contexts — see FAVICON.md).
//
// Usage: node scripts/extract-favicon-glyph.js
// Requires: npm install opentype.js --save-dev
//
// Prints the <path d="..."> data to paste into public/favicon.svg — it does
// not write the file directly, since favicon.svg also carries the
// dark-mode media query and circle that aren't part of the glyph.

import opentype from 'opentype.js';

const FONT_URL = 'https://fonts.gstatic.com/s/pirataone/v23/I_urMpiDvgLdLh0fAtoftig.ttf';
// ^ Grab the current URL from the @font-face src in:
//   https://fonts.googleapis.com/css2?family=Pirata+One&display=swap
// (it's versioned and does change over time).

async function main() {
	const res = await fetch(FONT_URL);
	const arrayBuffer = await res.arrayBuffer();
	const font = opentype.parse(arrayBuffer);
	const glyph = font.charToGlyph('M');

	// Render at a large size to measure natural proportions, then rescale to
	// fit inside the 24x24 favicon viewBox, centered in the seal's inscribed
	// circle (r=9.3 at cx=cy=12) with clear margin inside the stroke.
	const testSize = 100;
	const bbox = glyph.getPath(0, 0, testSize).getBoundingBox();

	const glyphHeight = bbox.y2 - bbox.y1;
	const targetHeight = 13.5;
	const scale = targetHeight / glyphHeight;

	const bboxCenterX = (bbox.x1 + bbox.x2) / 2;
	const bboxCenterY = (bbox.y1 + bbox.y2) / 2;
	const finalX = 12 - bboxCenterX * scale;
	const finalY = 12 - bboxCenterY * scale;

	const path = glyph.getPath(finalX, finalY, testSize * scale);
	console.log(path.toPathData(2));
}

main();

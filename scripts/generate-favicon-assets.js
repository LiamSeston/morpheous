// scripts/generate-favicon-assets.js
//
// Rasterizes public/favicon.svg (the vector-path seal mark — see
// scripts/extract-favicon-glyph.js and FAVICON.md) into the full icon set:
// favicon.ico (16/32/48), apple-touch-icon.png (180), and Android chrome
// icons (192/512), plus site.webmanifest. Run after editing favicon.svg.
//
// Usage: node scripts/generate-favicon-assets.js
// Requires: npm install sharp --save-dev

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const svgPath = path.join(root, 'public/favicon.svg');
const svg = readFileSync(svgPath);

// Bone & Brass page background — apple-touch-icon and Android icons look
// bad with transparency (iOS fills transparent areas with black), so these
// get a flat backdrop matching the site's light theme rather than trying to
// theme the icon itself (OS icon chrome has no access to our CSS anyway).
const PAGE_BG = '#EDE4D0';

async function renderPng(size, { background } = {}) {
	let img = sharp(svg, { density: 384 }).resize(size, size);
	if (background) {
		img = sharp(await img.png().toBuffer())
			.flatten({ background })
			.resize(size, size);
	}
	return img.png().toBuffer();
}

// Modern ICO format: an ICONDIR header + one ICONDIRENTRY per image, each
// entry pointing at a plain embedded PNG (supported since Windows Vista and
// universally since — no need for the legacy uncompressed BMP format).
function buildIco(pngBuffers) {
	const count = pngBuffers.length;
	const headerSize = 6 + 16 * count;
	let offset = headerSize;

	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: 1 = icon
	header.writeUInt16LE(count, 4);

	const entries = [];
	for (const { size, buf } of pngBuffers) {
		const entry = Buffer.alloc(16);
		entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
		entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
		entry.writeUInt8(0, 2); // color palette
		entry.writeUInt8(0, 3); // reserved
		entry.writeUInt16LE(1, 4); // color planes
		entry.writeUInt16LE(32, 6); // bits per pixel
		entry.writeUInt32LE(buf.length, 8); // image data size
		entry.writeUInt32LE(offset, 12); // offset
		offset += buf.length;
		entries.push(entry);
	}

	return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buf)]);
}

async function main() {
	const icoSizes = [16, 32, 48];
	const icoPngs = await Promise.all(
		icoSizes.map(async (size) => ({ size, buf: await renderPng(size) })),
	);
	writeFileSync(path.join(root, 'public/favicon.ico'), buildIco(icoPngs));
	console.log('wrote public/favicon.ico (16/32/48)');

	const appleTouch = await renderPng(180, { background: PAGE_BG });
	writeFileSync(path.join(root, 'public/apple-touch-icon.png'), appleTouch);
	console.log('wrote public/apple-touch-icon.png (180x180)');

	const android192 = await renderPng(192, { background: PAGE_BG });
	writeFileSync(path.join(root, 'public/android-chrome-192x192.png'), android192);
	console.log('wrote public/android-chrome-192x192.png');

	const android512 = await renderPng(512, { background: PAGE_BG });
	writeFileSync(path.join(root, 'public/android-chrome-512x512.png'), android512);
	console.log('wrote public/android-chrome-512x512.png');

	const manifest = {
		name: 'Morpheous',
		short_name: 'Morpheous',
		icons: [
			{ src: 'android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
			{ src: 'android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
		],
		theme_color: PAGE_BG,
		background_color: PAGE_BG,
		display: 'standalone',
	};
	writeFileSync(
		path.join(root, 'public/site.webmanifest'),
		JSON.stringify(manifest, null, 2) + '\n',
	);
	console.log('wrote public/site.webmanifest');
}

main();

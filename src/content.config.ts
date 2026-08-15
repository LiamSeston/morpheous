import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SYSTEMS } from './lib/systems';

const assets = defineCollection({
	loader: glob({ base: './src/content/assets', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		system: z.enum(SYSTEMS),
		category: z.string(), // "Terrain — Tower", "Warband — Hero", etc.
		tags: z.array(z.string()).default([]),
		materials: z.array(z.string()).default([]),
		footprint: z.string().optional(), // "15 × 15 cm"
		height: z.string().optional(), // "22 cm"
		status: z.enum(['planned', 'in-progress', 'complete']).default('complete'),
		builtDate: z.coerce.date().optional(),
		warpstoneTouched: z.boolean().default(false),

		// 3D model — hosted via jsDelivr CDN pointing at this same repo
		modelSrc: z.string().optional(), // full jsDelivr URL to the .glb
		modelPoster: z.string().optional(), // fallback image while the model loads

		// Fallback photos for assets without a 3D scan yet
		images: z.array(z.string()).default([]),
	}),
});

export const collections = { assets };

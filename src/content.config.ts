import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const terrain = defineCollection({
	loader: glob({ base: './src/content/terrain', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		type: z.enum(['building', 'scatter', 'tile', 'bridge', 'other']),
		status: z.enum(['planned', 'in-progress', 'complete']),
		dimensions: z.string().optional(),
		materials: z.array(z.string()).default([]),
		tags: z.array(z.string()).default([]),
		started: z.coerce.date().optional(),
		completed: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		gallery: z.array(z.string()).default([]),
	}),
});

export const collections = { terrain };

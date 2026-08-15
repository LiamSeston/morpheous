// The canonical list of modelling systems this catalog covers.
// Site scope is deliberately one unified catalog across all systems, faceted
// by system + type rather than split into per-game sections or per-game themes.
// Imported by src/content.config.ts (as the schema enum) and by the catalog page.

export const SYSTEMS = ['Mordheim', 'Necromunda', 'Warhammer 40k', 'Other'] as const;

export type System = (typeof SYSTEMS)[number];

// Shown on the catalog's coverage strip — for a system with nothing catalogued
// yet, this is the prompt describing what belongs there.
export const SYSTEM_BLURBS: Record<System, string> = {
	Mordheim: 'Ruins, walkways, and warpstone-touched scatter for the City of the Damned.',
	Necromunda: 'Underhive bulkheads, gang terrain, and the gangers who fight over it.',
	'Warhammer 40k': 'Miniatures, kitbashes, and battlefield scenery at 28mm heroic.',
	Other: 'Anything outside a system — dioramas, busts, display bases, test pieces.',
};

// import.meta.env.BASE_URL is not guaranteed to carry a trailing slash (it
// tracks astro.config.mjs's `base` verbatim — here, '/morpheous', with none).
// Naively writing `${BASE_URL}catalog/` silently produced '/morpheouscatalog/'
// across the whole site. These helpers join/strip it safely regardless of
// whether the configured base ends in a slash or not.

export function withBase(base: string, path = ''): string {
	const trimmedBase = base.replace(/\/+$/, '');
	const trimmedPath = path.replace(/^\/+/, '');
	return trimmedPath ? `${trimmedBase}/${trimmedPath}` : `${trimmedBase}/`;
}

export function stripBase(base: string, pathname: string): string {
	const trimmedBase = base.replace(/\/+$/, '');
	if (trimmedBase && pathname.startsWith(trimmedBase)) {
		const rest = pathname.slice(trimmedBase.length);
		return rest.startsWith('/') ? rest : `/${rest}`;
	}
	return pathname;
}

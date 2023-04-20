import { log } from '$lib/logger';
import { conectDB } from '$lib/server/db';
import { seedDataDevMode } from '$lib/utils/seeder';
import type { Handle } from '@sveltejs/kit';

conectDB();
seedDataDevMode();

export const handle: Handle = async ({ event, resolve }) => {
	const start = performance.now();
	const theme = event.cookies.get('app-theme') ?? 'light';
	// passport.authenticate('jwt', { session: false });
	const response: Response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});
	const end = performance.now();
	log.endpoint(response.status, event.request.method, event.url.pathname, end - start);
	return response;
};

import { log } from '$lib/logger';
import { conectDB } from '$lib/server/db';
import { seedDataDevMode } from '$lib/utils/seeder';
import type { Handle } from '@sveltejs/kit';

conectDB().then(() => seedDataDevMode());

export const handle: Handle = async ({ event, resolve }) => {
	const start = performance.now();
	// setInterval(seedDataDevMode, 1000 * 60 * 60);
	// passport.authenticate('jwt', { session: false });
	const response: Response = await resolve(event);
	const end = performance.now();
	log.endpoint(response.status, event.request.method, event.url.pathname, end - start);
	return response;
};

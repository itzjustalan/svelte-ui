import { accessController } from '$lib/controllers/access.controller';
import { authController } from '$lib/controllers/auth.controller';
import { UnauthorizedError } from '$lib/errors';
import { log } from '$lib/logger';
import { conectDB } from '$lib/server/db';
import { seedDataDevMode } from '$lib/utils/seeder';
import type { Handle } from '@sveltejs/kit';

conectDB().then(() => seedDataDevMode());

// setInterval(seedDataDevMode, 1000 * 60 * 60);
// passport.authenticate('jwt', { session: false });

export const handle: Handle = async ({ event, resolve }) => {
	const start = performance.now();
	const token = event.cookies.get('access-token') || event.request.headers.get('Authorization');
	if (token) {
		const dtoken = authController.authenticate(token);
		if (dtoken) {
			// const { iat, exp, ...user } = dtoken;
			// e.locals.user = user;
			event.locals.user = {
				uid: dtoken.uid,
				role: dtoken.role,
				access: dtoken.access,
			};
		}
	}
	const error = accessController.authorize(event);
	if (error) {
		log.endpoint(
			error.statusCode,
			event.request.method,
			event.url.pathname,
			performance.now() - start
		);
		return error.respond();
	}
	const response: Response = await resolve(event);
	log.endpoint(
		response.status,
		event.request.method,
		event.url.pathname,
		performance.now() - start
	);
	return response;
};

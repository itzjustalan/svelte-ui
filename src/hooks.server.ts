import { authController } from '$lib/controllers/auth.controller';
import { uacController } from '$lib/controllers/uac.controller';
import { log } from '$lib/logger';
import { conectDB } from '$lib/server/db';
import { urlWithoutParams } from '$lib/utils';
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
				id: dtoken.id,
				role: dtoken.role,
				access: dtoken.access,
			};
		}
	}
	const error = uacController.authorize(
		event.locals.user,
		urlWithoutParams(event.url.pathname, event.params),
		event.request.method
	);
	if (error) {
		log.error('req denied:', error.message, event.request.method.toUpperCase(), event.url.pathname);
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

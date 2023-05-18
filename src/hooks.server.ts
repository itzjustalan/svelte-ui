import { authController } from '$lib/controllers/auth.controller';
import { uacController } from '$lib/controllers/uac.controller';
import { log } from '$lib/logger';
import { conectDB } from '$lib/server/db';
import { urlWithoutParams } from '$lib/utils';
import { HttpStatusCodes } from '$lib/utils/httpStatusCodes';
import { seedDataDevMode } from '$lib/utils/seeder';
import { redirect, error } from '@sveltejs/kit';
import type { Handle, HandleServerError } from '@sveltejs/kit';

conectDB().then(() => seedDataDevMode());

// setInterval(seedDataDevMode, 1000 * 60 * 60);
// passport.authenticate('jwt', { session: false });

export const handle = (async ({ event, resolve }) => {
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
	const _error = uacController.authorize(
		event.locals.user,
		urlWithoutParams(event.url.pathname, event.params),
		event.request.method
	);
	if (_error) {
		log.error(
			'req denied:',
			_error.message,
			event.request.method.toUpperCase(),
			event.url.pathname
		);
		log.endpoint(
			_error.statusCode,
			event.request.method,
			event.url.pathname,
			performance.now() - start
		);
		return _error.respond();
		// throw error(_error.statusCode, _error);
		// throw redirect(
		// 	HttpStatusCodes.TemporaryRedirect,
		// 	`/v1/error?msg=${_error.message}&cde=${_error.statusCode}`
		// );
	}
	const response: Response = await resolve(event);
	log.endpoint(
		response.status,
		event.request.method,
		event.url.pathname,
		performance.now() - start
	);
	return response;
}) satisfies Handle;

export const handleError = ((input) => {
	// handles unexpected errors - throw new Error('myrr);

	// log.error(input.error, input.event);
	log.error(JSON.stringify(input.error));

	return {
		message: 'Whoops! Something went wrong.',
		code: 'UNKNOWN',
	};
}) satisfies HandleServerError;

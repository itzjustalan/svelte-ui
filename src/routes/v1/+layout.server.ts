import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { log } from '$lib/logger';
import { uacController } from '$lib/controllers/uac.controller';
import { urlWithoutParams } from '$lib/utils';

export const load = (async (input) => {
	// const _error = uacController.authorize(
	// 	input.locals.user,
	// 	urlWithoutParams('ghghg' + input.url.pathname, input.params),
	// 	input.request.method
	// );

	// if (_error) throw error(_error.statusCode, _error);
	// throw error(_error?.statusCode ?? 404, _error);
	// throw error(_error?.statusCode ?? 404, _error?.message);
	// throw error(_error?.statusCode ?? 404, _error?.toError());

	return {
		user: input.locals.user,
	};
}) satisfies LayoutServerLoad;

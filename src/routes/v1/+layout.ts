import { browser } from '$app/environment';
import { log } from '$lib/logger';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { QueryClient } from '@tanstack/svelte-query';

export const load = (async ({ data }) => {
	// log.info('cli layout??', input)
	// log.warn('top hit', browser && document.cookie)
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});
	// if (input.url.pathname.startsWith('/v1/protected')) {
	// 	log.error('prtd!! redirectingg');
	// 	throw redirect(302, '/v1');
	// }

	return { queryClient, ...data };
}) satisfies LayoutLoad;

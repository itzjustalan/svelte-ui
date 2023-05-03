import { browser, dev } from '$app/environment';
import type { LayoutLoad } from './$types';
import { QueryClient } from '@tanstack/svelte-query';

export const load = (async ({ data }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				retry: dev ? false : 3,
			},
		},
	});
	return { queryClient, ...data };
}) satisfies LayoutLoad;

import { getPosts } from '$lib/networks/test.network';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { queryClient } = await parent();
	await queryClient.prefetchQuery({
		queryKey: ['posts', 10],
		queryFn: () => getPosts(10),
	});
};

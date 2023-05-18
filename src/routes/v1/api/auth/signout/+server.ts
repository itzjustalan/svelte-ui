import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('refresh-token', { path: '/' });
	cookies.delete('access-token', { path: '/' });
	return new Response('ok');
};

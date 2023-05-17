import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({  cookies }) => {
	cookies.delete('refresh-token');
	cookies.delete('access-token');
	return new Response();
};
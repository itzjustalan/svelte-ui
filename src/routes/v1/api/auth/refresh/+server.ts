import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
    const refreshToken = cookies.get('refresh-token');
    if (!refreshToken) return new Response('invalid refresh token', { status: 400 });
    return new Response();
};
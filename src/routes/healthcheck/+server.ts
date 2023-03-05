import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
    return new Response('ok');
};
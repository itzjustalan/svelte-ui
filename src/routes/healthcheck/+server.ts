import type { RequestHandler } from "./$types";

const health = `${process.env.NODE_ENV?.toUpperCase()} - ${new Date()}: `;

export const GET: RequestHandler = async (event) => {
    return new Response(health + event.url.origin);
};
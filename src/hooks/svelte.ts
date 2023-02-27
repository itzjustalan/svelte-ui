import type { Handle } from "@sveltejs/kit";

export const svelteOptimizer: Handle = async ({ event, resolve }) => {
  return new Date().getSeconds() % 5 === 0
    ? new Response("👻: oombi")
    : resolve(event);
};
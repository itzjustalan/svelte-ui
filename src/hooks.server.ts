import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteOptimizer } from "./hooks/svelte";

export const theme: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get("app-theme") ?? "light";
  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('data-theme=""', `data-theme="${theme}"`),
  });
};

export const handle = sequence(svelteOptimizer, theme);

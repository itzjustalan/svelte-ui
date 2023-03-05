import { log } from "$lib/logger";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const response = resolve(event);
    return response;
}

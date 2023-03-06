import { log } from "$lib/logger";
import type { Handle, HandleServerError } from "@sveltejs/kit";

export const handleError: HandleServerError = async ({ event, error }) => {
    log.error('client??', 22, { H: "fsdf"}, 'hooks.client.ts')
    return Error('client error');
}

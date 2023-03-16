import { log } from "$lib/logger";
import type { Handle, HandleServerError } from "@sveltejs/kit";

export const handleError: HandleServerError = async (input) => {
    log.error('client??', 22, { H: "fsdf"}, 'hooks.client.ts')
    // log.warn(input)
    return Error('client error');
}

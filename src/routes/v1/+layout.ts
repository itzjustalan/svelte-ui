import { browser } from "$app/environment";
import { log } from "$lib/logger";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async (input) => {
    // log.info('cli layout??', input)
    // log.warn('top hit', browser && document.cookie)
    if (input.url.pathname.startsWith('/v1/protected')) {
        log.error('prtd!! redirectingg')
        throw redirect(302, "/v1")
    }
}
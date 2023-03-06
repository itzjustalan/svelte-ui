import { log } from "$lib/logger";
import { conectDB } from "$lib/server/db";
import { mailService } from "$lib/services/mail.service";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
// import mpredirect, type Handle } from "@sveltejs/kit";
import { svelteOptimizer } from "./hooks/svelte";

conectDB();
// add dependecy injection?

// export const top: Handle = async ({ event, resolve }) => {
//   log.warn('top hit')
//   log.warn('top hit', event.cookies.get('auth-access-token'))
//   if (event.url.pathname.startsWith('/v1/protected')) {
//     log.error('prtd!! redirectingg')
//     throw redirect(302, "/")
//   }
//   const response = await resolve(event);
//   log.warn('top done')
//   return response;
// };

export const main: Handle = async ({ event, resolve }) => {
  const start = performance.now();
  // log.warn('main hit')

  // log.info('started!!')
  // log.info('start', new Date(), 23424, { v: true })
  // log.warn('start', 23424, { v: true })
  // log.warn('started!!')
  // log.error('started!!')
  // log.warn('sdfdsfs')
  // log.warn('start', new Date(), 23424, { v: true })
  // log.error('start', new Date(), 23424, { v: true })

  const theme = event.cookies.get("app-theme") ?? "light";
  // passport.authenticate('jwt', { session: false });
  // await mailService.sendMail();
  const response: Response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('data-theme=""', `data-theme="${theme}"`),
  });
  const end = performance.now();
  log.request(response.status, event.request.method, event.url.pathname, end - start);
  // log.warn('main done')
  return response;
};







































export const bottom: Handle = async ({ event, resolve }) => {
  log.warn('bottom hit')
  const response = await resolve(event);
  log.warn('bottom done')
  return response;
};










// export const handle = sequence(top, main, bottom);
export const handle = sequence(svelteOptimizer, main);

import { cartController } from '$lib/controllers/cart.controller';
import { responseFromError } from '$lib/server/utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { cartUpdateInputSchema } from '$lib/models/input/cart';
import { log } from '$lib/logger';

export const GET: RequestHandler = async (event) => {
    const error = await cartController.getUserCart(event.locals.user.uid);
    if (error instanceof Error) return responseFromError(error);
    return json(error);
};

// export const POST: RequestHandler = async ({ request }) => {
// 	const result = menuInputSchema.safeParse(await request.json());
// 	if (!result.success) return responseFromError(result.error);
// 	const error = await menuController.createMenu(result.data);
// 	if (error instanceof Error) return responseFromError(error);
// 	return json(error);
// };

// export const PUT: RequestHandler = async ({ request }) => {
// 	const result = menuUpdateInputSchema.safeParse(await request.json());
// 	if (!result.success) return responseFromError(result.error);
// 	const error = await menuController.updateMenu(result.data);
// 	if (error instanceof Error) return responseFromError(error);
// 	return json(error);
// };

export const PUT: RequestHandler = async ({ request, locals }) => {
    const validation = cartUpdateInputSchema.safeParse(await request.json());
    if (!validation.success) return responseFromError(validation.error);
    const result = await cartController.updateCart(locals.user.uid, validation.data);
    if (result instanceof Error) return responseFromError(result);
    return json(result);
}
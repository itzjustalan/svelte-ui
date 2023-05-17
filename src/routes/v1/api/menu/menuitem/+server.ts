import { menuController } from '$lib/controllers/menu.controller';
import { responseFromError } from '$lib/server/utils';
import { menuItemInputSchema, menuItemUpdateInputSchema } from '$lib/models/input/menu';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const error = await menuController.getMenuItems();
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const result = menuItemInputSchema.safeParse(await request.json());
	if (!result.success) return responseFromError(result.error);
	const error = await menuController.createMenuItem(result.data, locals.user.uid);
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

export const PUT: RequestHandler = async ({ request }) => {
	const result = menuItemUpdateInputSchema.safeParse(await request.json());
	if (!result.success) return responseFromError(result.error);
	const error = await menuController.updateMenu(result.data);
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

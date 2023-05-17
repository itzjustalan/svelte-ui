import { menuController } from '$lib/controllers/menu.controller';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { menuItemTypeInputSchema, menuItemTypeUpdateInputSchema } from '$lib/models/input/menu';
import { responseFromError } from '$lib/server/utils';

export const GET: RequestHandler = async () => {
	const error = await menuController.getMenuItemTypes();
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const result = menuItemTypeInputSchema.safeParse(await request.json());
	if (!result.success) return responseFromError(result.error);
	const error = await menuController.createMenuItemType(result.data, locals.user.id);
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

export const PUT: RequestHandler = async ({ request }) => {
	const result = menuItemTypeUpdateInputSchema.safeParse(await request.json());
	if (!result.success) return responseFromError(result.error);
	const error = await menuController.updateMenuItemType(result.data);
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

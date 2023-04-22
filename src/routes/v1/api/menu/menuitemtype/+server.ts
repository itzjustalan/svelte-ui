import { menuController } from '$lib/controllers/menu.controller';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { menuItemTypeInputSchema } from '$lib/models/input/menu';
import { responseFromError } from '$lib/server/utils';

export const POST: RequestHandler = async ({ request }) => {
	const result = menuItemTypeInputSchema.safeParse({ ...(await request.json()) });
	if (!result.success) return responseFromError(result.error);
	const error = await menuController.createMenuItemType(result.data);
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

export const GET: RequestHandler = async () => {
	const error = await menuController.getMenuItemTypes();
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

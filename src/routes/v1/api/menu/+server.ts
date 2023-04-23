import { menuController } from '$lib/controllers/menu.controller';
import { responseFromError } from '$lib/server/utils';
import { menuInputSchema, menuUpdateInputSchema } from '$lib/models/input/menu';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const error = await menuController.getMenus();
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

export const POST: RequestHandler = async ({ request }) => {
	const result = menuInputSchema.safeParse(await request.json());
	if (!result.success) return responseFromError(result.error);
	const error = await menuController.createMenu(result.data);
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

export const PUT: RequestHandler = async ({ request }) => {
	const result = menuUpdateInputSchema.safeParse(await request.json());
	if (!result.success) return responseFromError(result.error);
	const error = await menuController.updateMenu(result.data);
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

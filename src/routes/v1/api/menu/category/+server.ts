import { menuController } from '$lib/controllers/menu.controller';
import { responseFromError } from '$lib/server/utils';
import { categoryInputSchema, categoryUpdateInputSchema } from '$lib/models/input/menu';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const error = await menuController.getCategories();
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

export const POST: RequestHandler = async ({ request }) => {
	const result = categoryInputSchema.safeParse(await request.json());
	if (!result.success) return responseFromError(result.error);
	const error = await menuController.createCategory(result.data);
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

export const PUT: RequestHandler = async ({ request }) => {
	const result = categoryUpdateInputSchema.safeParse(await request.json());
	if (!result.success) return responseFromError(result.error);
	const error = await menuController.updateCategory(result.data);
	if (error instanceof Error) return responseFromError(error);
	return json(error);
};

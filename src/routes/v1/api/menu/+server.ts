import { menuController } from "$lib/controllers/menu.controller";
import { responseFromError } from "$lib/server/utils";
import { menuInputSchema } from "$lib/zod/schemas/menuitem";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    const result = menuInputSchema.safeParse({ ...await request.json() });
    if (!result.success) return responseFromError(result.error);
    const error = await menuController.createMenu(result.data);
    if (error instanceof Error) return responseFromError(error);
    return json(error);
};

export const GET: RequestHandler = async () => {
    const error = await menuController.getMenus();
    if (error instanceof Error) return responseFromError(error);
    return json(error);
};

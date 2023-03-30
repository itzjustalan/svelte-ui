import { menuController } from "$lib/controllers/menu.controller";
import { responseFromError } from "$lib/server/utils";
import { MenuItemSchema, type MenuItem } from "$lib/zod/models/menu.model";
import type { RequestHandler } from "./$types";



export const POST: RequestHandler = async ({ request }) => {
    const result = MenuItemSchema.safeParse({ ...await request.json(), id: '' });
    if (!result.success) {
        return new Response(result.error.toString(), { status: 400 });
    }
    const error = menuController.createMenuItem(result.data as MenuItem);
    if (!error) return new Response("success");
    return responseFromError(error);
};
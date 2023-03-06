import { authController } from "$lib/controllers/auth.controller";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
    // todo: redirect using a load function?
    return json(await authController.verifyEmail({ ...params }))
};
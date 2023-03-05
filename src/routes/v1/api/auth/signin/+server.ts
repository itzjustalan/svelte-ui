import { authController } from "$lib/controllers/auth.controller";
import { log } from "$lib/logger";
import { userSignupSchema } from "$lib/zod/user.signup";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";

export const POST: RequestHandler = async ({ request }) => {
    log.info('here here')
    const result = userSignupSchema.safeParse(await request.json());
    if (!result.success) return new Response(result.error.toString(), { status: 400 });
    log.info('sendin res')
    return json(await authController.signinWithEmail(result.data));
};
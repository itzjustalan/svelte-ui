import { authController } from "$lib/controllers/auth.controller";
import { log } from "$lib/logger";
import { sleep } from "$lib/utils";
import { userSignupSchema } from "$lib/zod/user.signup";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    const result = await userSignupSchema.safeParse(await request.json());
    log.info(result);
    if (!result.success) {
        return new Response(result.error.toString(), { status: 400 });
    }
    await authController.signupWithEmail(result.data);
    return new Response("success");
};

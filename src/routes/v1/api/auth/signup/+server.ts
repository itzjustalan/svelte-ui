import { authController } from "$lib/controllers/auth.controller";
import { log } from "$lib/logger";
import { sleep } from "$lib/utils";
import { authSchema } from "$lib/zod/schemas/user.signup";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, url }) => {
    const result = authSchema.safeParse(await request.json());
    log.info(result);
    if (!result.success) {
        return new Response(result.error.toString(), { status: 400 });
    }
    await authController.signupWithEmail({ ...result.data, host: url.host });
    return new Response("success");
};

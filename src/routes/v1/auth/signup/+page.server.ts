import { authController } from "$lib/controllers/auth.controller";
import { log } from "$lib/logger";
import { sleep } from "$lib/utils";
import { authSchema } from "$lib/zod/schemas/user.signup";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import { zfd } from "zod-form-data";

export const actions: Actions = {
    default: async ({ request, url }) => {
        const formData = await request.formData();
        const schema = zfd.formData(authSchema);
        const result = schema.safeParse(formData);
        if (!result.success) {
            return fail(400, {
                data: Object.fromEntries(formData),
                errors: result.error.flatten().fieldErrors,
            });
        }
        // await sleep(200);
        // throw redirect(303, '/profile');
        try {
            await authController.signupWithEmail({ ...result.data, host: url.host });
        } catch (error: any) {
            log.info(error);
            return {
                data: Object.fromEntries(formData),
                errors: error.body.message,
            };
        }
        return {
            data: Object.fromEntries(formData),
            errors: {},
        };
    },
};

import { dev } from "$app/environment";
import { authController } from "$lib/controllers/auth.controller";
import { log } from "$lib/logger";
import { sleep } from "$lib/utils";
import { userSignupSchema } from "$lib/zod/user.signup";
import { fail, redirect } from "@sveltejs/kit";
import type { CookieSerializeOptions } from "cookie";
import { zfd } from "zod-form-data";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const schema = zfd.formData(userSignupSchema);
        const result = schema.safeParse(formData);
        if (!result.success) {
            return fail(400, {
                data: Object.fromEntries(formData),
                errors: result.error.flatten().fieldErrors,
            });
        }
        await sleep(200);
        const data = await authController.signinWithEmail(result.data);
        const tokenCookieOpts: CookieSerializeOptions = {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: !dev,
            maxAge: 60 * 60 * 24, // 24 hours
        };
        cookies.set('auth-access-token', data.jwt.accessToken, tokenCookieOpts);
        throw redirect(302, '/v1/protected');
    },
}
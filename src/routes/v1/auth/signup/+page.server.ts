import { authController } from '$lib/controllers/auth.controller';
import { log } from '$lib/logger';
import { sleep } from '$lib/utils';
import { userSignupSchema } from '$lib/zod/user.signup';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';

export const actions: Actions = {
    default: async ({ request }) => {
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
        // throw redirect(303, '/profile');
        try {
            await authController.signupWithEmail(result.data);
        } catch (error: any) {
            log.info(error)
            return {
                data: Object.fromEntries(formData),
                errors: error.body.message,
            }
        }
        return {
            data: Object.fromEntries(formData),
            errors: {},
        }
    },
}
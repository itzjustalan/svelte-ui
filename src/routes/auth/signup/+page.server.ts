import { AuthController } from '$lib/controllers/auth.controller';
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
        const _auth = new AuthController();
        const user = await _auth.signup(result.data);
        if (typeof user !== 'string') {
            throw redirect(303, '/auth/signin');
        } else {
            return {
                data: Object.fromEntries(formData),
                errors: user,
            }
        }
    },
}
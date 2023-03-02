import { AuthController } from '$lib/controllers/auth.controller';
import { sleep } from '$lib/utils';
import { userSignupSchema } from '$lib/zod/user.signup';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

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
        const _auth = new AuthController();
        let v = await _auth.signup(result.data);
        // let v = _auth.signup(result.data.username, result.data.password);

        // await sleep(2000);
        throw redirect(303, '/');
    },
}
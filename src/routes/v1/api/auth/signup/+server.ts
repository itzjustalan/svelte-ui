import { authController } from '$lib/controllers/auth.controller';
import { log } from '$lib/logger';
import { responseFromError } from '$lib/server/utils';
import { authInputSchema } from '$lib/models/input/user.signup';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, url }) => {
	const result = authInputSchema.safeParse(await request.json());
	log.info(result);
	if (!result.success) {
		return new Response(result.error.toString(), { status: 400 });
	}
	const error = await authController.signupWithEmail({ ...result.data, host: url.host });
	if (!error) return new Response('success');
	return responseFromError(error);
};

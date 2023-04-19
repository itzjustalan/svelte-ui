import { dev } from '$app/environment';
import { authController } from '$lib/controllers/auth.controller';
import { responseFromError } from '$lib/server/utils';
import { HttpStatusCodes } from '$lib/utils/httpStatusCodes';
import { authSchema } from '$lib/zod/schemas/user.signup';
import { json } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';
import type { RequestHandler } from './$types';

const authCookieAttributes: CookieSerializeOptions = {
	// send cookie for every page
	path: '/',
	// server side only cookie so you can't use `document.cookie`
	httpOnly: true,
	// only requests from same site can send cookies
	// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
	sameSite: 'strict',
	// only sent over HTTPS in production
	secure: !dev,
	// set cookie to expire after a month
	maxAge: 3600
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const result = authSchema.safeParse(await request.json());
	if (!result.success)
		return new Response(result.error.toString(), { status: HttpStatusCodes.BadRequest });
	const payload = await authController.signinWithEmail(result.data);
	if (payload instanceof Error) return responseFromError(payload);
	cookies.set('access-token', payload.jwt.accessToken, { ...authCookieAttributes, maxAge: 3600 });
	cookies.set('refresh-token', payload.jwt.refreshToken, {
		...authCookieAttributes,
		maxAge: 50400
	});
	return json(payload);
};

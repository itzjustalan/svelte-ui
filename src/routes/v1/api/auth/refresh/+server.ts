import { dev } from "$app/environment";
import { authController } from "$lib/controllers/auth.controller";
import { HttpStatusCodes } from "$lib/utils/httpStatusCodes";
import type { CookieSerializeOptions } from "cookie";
import type { RequestHandler } from "./$types";

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
    maxAge: 3600,
};

export const GET: RequestHandler = async ({ request, cookies }) => {
    const refreshToken = cookies.get('refresh-token') || request.headers.get('Authorization');
    if (!refreshToken) return new Response('invalid refresh token', { status: HttpStatusCodes.BadRequest });
    const response = await authController.refreshTokens(refreshToken);
    if (response.status !== 200) return response;
    const data = await response.clone().json(); //todo: find a better approach
    cookies.set('access-token', data.jwt.accessToken, { ...authCookieAttributes, maxAge: 3600 });
    cookies.set('refresh-token', data.jwt.refreshToken, { ...authCookieAttributes, maxAge: 50400 });
    return response;
};
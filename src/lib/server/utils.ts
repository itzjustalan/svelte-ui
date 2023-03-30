import {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
} from "$env/static/private";
import { AppError } from "$lib/errors";
import { HttpStatusCodes } from "$lib/utils/httpStatusCodes";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { ZodError } from "zod";

export const genHash = async (text: string): Promise<string> =>
  await argon2.hash(text);

export const compareHash = async (
  text: string,
  hash: string,
): Promise<boolean> => await argon2.verify(hash, text);

export interface JwtPayload {
  uid: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const genJwts = (payload: JwtPayload) => ({
  accessToken: genJwt(
    payload,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
  ),
  refreshToken: genJwt(
    payload,
    JWT_REFRESH_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_EXPIRES_IN,
  ),
});

export const genJwt = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
) => jwt.sign(payload, secret, { expiresIn });

export const verifyJwt = <T>(token: string, secret: string): T =>
  jwt.verify(token, secret) as T;
export const verifyAccessToken = <T>(token: string): T =>
  jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as T;
export const verifyRefreshToken = <T>(token: string): T =>
  jwt.verify(token, JWT_REFRESH_TOKEN_SECRET) as T;

export const responseFromError = (error: Error): Response => {
  if (error instanceof AppError) return error.respond();
  else if (error instanceof ZodError) {
    return new Response(error.toString(), {
      status: HttpStatusCodes.BadRequest,
    });
  }
  return new Response(error.message ?? "Internal Server Error", {
    status: HttpStatusCodes.InternalServerError,
  });
};

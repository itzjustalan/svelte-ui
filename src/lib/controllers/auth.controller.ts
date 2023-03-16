import { dev } from "$app/environment";
import { compareHash, genHash, genJwts, verifyRefreshToken, type JwtPayload } from "$lib/server/utils";
import { userService } from "$lib/services/user.service";
import { unverifiedUserService } from "$lib/services/unverifieduser.service";
import { nanoid } from "nanoid";
import { log } from "$lib/logger";
import { mailService } from "$lib/services/mail.service";
import { AppError, BadRequestError, InternalServerError } from "$lib/errors";
import type { User } from "$lib/zod/models/user.model";

class AuthController {
  async signinWithEmail(
    { username, password }: { username: string; password: string },
  ): Promise<AppError | { user: User; jwt: { accessToken: string; refreshToken: string; }; }> {
    const user = await userService.findOneByUsername(username);
    if (!user) return new BadRequestError("user not found");
    if (!await compareHash(password, user.password)) {
      return new BadRequestError("invalid credentials");
    }
    const payload = { uid: user.id, role: "etho-oru-role" };
    return {
      user: { ...user, password: "" },
      jwt: genJwts(payload),
    };
  }

  // async signupWithEmail(credentials: Credentials): Promise<User | string> {
  async signupWithEmail(
    { username, password, host }: {
      username: string;
      password: string;
      host: string;
    },
  ): Promise<undefined | AppError> {
    if (await unverifiedUserService.findOneByUsername(username)) {
      return new BadRequestError('email already taken');
    } else if (await userService.findOneByUsername(username)) {
      return new BadRequestError('email already taken');
    }
    log.info('say whaaa')
    const code = nanoid(32);
    const pwhash = await genHash(password);
    const user = await unverifiedUserService.createNew(username, pwhash, code);
    if (!user) return new InternalServerError("error registering user");
    const url = `${host}/v1/auth/verify/${user.id}/${code}`;
    if (dev) {
      log.info("verification email:", url);
    } else {
      mailService.sendMail({
        to: [user.username],
        sub: "Email verification from CPDBytes.com",
        body: emailVerificationTemplate(url),
      }).then((res) => log.info(res));
    }
    // dsf.com/auth/verify/[:id]/token
    //todo: return jwt after email verification
    return;
  }

  async verifyEmail(
    { uid, code }: { uid: string; code: string },
  ): Promise<AppError | { user: User; jwt: { accessToken: string; refreshToken: string; }; }> {
    //todo: show already verified?? but that would err out if the user opens the link twice..
    const user = await unverifiedUserService.findOneById(uid);
    if (!user) return new BadRequestError("invalid link");
    const time2hrAgo = Date.now() - (1000 * 60 * 60 * 2);
    if (user.createdAt.getTime() < time2hrAgo) return new BadRequestError("link expired!");
    if (code !== user.code) return new BadRequestError("invalid link");
    const nuser = await userService.createNew(user.username, user.password);
    if (!nuser) return new InternalServerError("error creating user");
    await unverifiedUserService.deleteOneById(user.id);
    const payload = { uid: user.id, role: "etho-oru-role" };
    return {
      user: { ...nuser, password: "" },
      jwt: genJwts(payload),
    };
  }

  async refreshTokens(refreshToken: string): Promise<AppError | { user: User; jwt: { accessToken: string; refreshToken: string; }; }> {
    try {
      const decodedToken = verifyRefreshToken<JwtPayload>(refreshToken);
      // if (Date.now() >= decodedToken.exp! * 1000) return new BadRequestError('token expired');
      if (!decodedToken.exp || Date.now() >= decodedToken.exp * 1000) return new BadRequestError('token expired');
      const user = await userService.findOneById(decodedToken.uid)
      if (!user) return new BadRequestError('invalid token')
      const payload = { uid: user.id, role: "etho-oru-role" };
      return {
        user: { ...user, password: "" },
        jwt: genJwts(payload),
      };
    } catch (e: any) {
      return new BadRequestError(e.message);
    }
  }
}

export const authController = new AuthController();

const emailVerificationTemplate = (url: string): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head></head>
  <body>
    <h1>Welcome to CPDBytes.com!</h1>
    <p>Kindly ignore this email if you didn't try to regiter to cpdbytes.com</p>
    
    <a href="${url}">if not then pls open this link to verify your email</a>

    <h2>yours chakkara kuttan,</h2>
    <marquee>CPDBytes.com!!</marquee>
  </body>
  </html>
  `;
};

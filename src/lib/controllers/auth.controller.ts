import { dev } from "$app/environment";
import { compareHash, genHash, genJwts, verifyRefreshToken, type JwtPayload } from "$lib/server/utils";
import { userService } from "$lib/services/user.service";
import { log } from "$lib/logger";
import { unverifiedUserService } from "$lib/services/unverifieduser.service";
import { nanoid } from "nanoid";
import { mailService } from "$lib/services/mail.service";
import { HttpStatusCodes } from "$lib/utils/httpStatusCodes";

class AuthController {
  todo = () => 'centralised place for all things jwt including setting the cookie';
  async signinWithEmail(
    { username, password }: { username: string; password: string },
  ): Promise<Response> {
    const user = await userService.findOneByUsername(username);
    if (!user) return new Response("user not found", { status: 404 });
    if (!await compareHash(password, user.password)) {
      return new Response("invalid credentials", { status: 401 });
    }
    //todo: envs okke ivide ingane cheiyano or vere abstraction veno??
    const payload = { uid: user.id, role: "etho-oru-role" };
    return new Response(JSON.stringify({
      user: { ...user, password: "" },
      jwt: genJwts(payload),
    }));
  }

  // async signupWithEmail(credentials: Credentials): Promise<User | string> {
  async signupWithEmail(
    { username, password, host }: {
      username: string;
      password: string;
      host: string;
    },
  ): Promise<Response> {
    if (await userService.findOneByUsername(username)) {
      return new Response('email already taken', { status: HttpStatusCodes.BadRequest});
    } else if (await unverifiedUserService.findOneByUsername(username)) {
      return new Response('email already taken', { status: HttpStatusCodes.BadRequest});
    }
    const code = nanoid(32);
    const pwhash = await genHash(password);
    const user = await unverifiedUserService.createNew(username, pwhash, code);
    if (!user) return new Response("error registering user", { status: 500 });
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
    return new Response();
    // dsf.com/auth/verify/[:id]/token
    //todo: return jwt after email verification
  }

  async verifyEmail(
    { uid, code }: { uid: string; code: string },
  ): Promise<Response> {
    //todo: show already verified?? but that would err out if the user opens the link twice..
    const user = await unverifiedUserService.findOneById(uid);
    if (!user) return new Response("invalid link", { status: 404 });
    const time2hrAgo = Date.now() - (1000 * 60 * 60 * 2);
    if (user.createdAt.getTime() < time2hrAgo) {
      return new Response("link expired!", { status: 404 });
    }
    if (code !== user.code) {
      return new Response("invalid link", { status: 404 });
    }
    const nuser = await userService.createNew(user.username, user.password);
    if (!nuser) return new Response("error creating user", { status: 404 });
    await unverifiedUserService.deleteOneById(user.id);
    const payload = { uid: user.id, role: "etho-oru-role" };
    return new Response(JSON.stringify({
      user: { ...nuser, password: "" },
      jwt: genJwts(payload),
    }));
  }

  async refreshTokens(refreshToken: string): Promise<Response> {
    try {
      const decodedToken = verifyRefreshToken<JwtPayload>(refreshToken);
      // if (Date.now() >= decodedToken.exp! * 1000) return new Response('token expired', { status: HttpStatusCodes.Unauthorized });
      if (!decodedToken.exp || Date.now() >= decodedToken.exp * 1000) return new Response('token expired', { status: HttpStatusCodes.Unauthorized });
      const user = await userService.findOneById(decodedToken.uid)
      if (!user) return new Response('unauthorized', { status: HttpStatusCodes.Unauthorized })
      const payload = { uid: user.id, role: "etho-oru-role" };
      return new Response(JSON.stringify({
        user: { ...user, password: "" },
        jwt: genJwts(payload),
      }));
    } catch (e: any) {
      return new Response(e.message, { status: HttpStatusCodes.BadRequest });
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

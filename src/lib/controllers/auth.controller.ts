import { dev } from "$app/environment";
import { compareHash, genHash, genJwt } from "$lib/server/utils";
import { userService } from "$lib/services/user.service";
import { log } from "$lib/logger";
import { unverifiedUserService } from "$lib/services/unverifieduser.service";
import { error } from "@sveltejs/kit";
import { JWT_ACCESS_TOKEN_EXPIRES_IN, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRES_IN, JWT_REFRESH_TOKEN_SECRET } from "$env/static/private";
import { nanoid } from 'nanoid'
import { mailService } from "$lib/services/mail.service";

class AuthController {
  async signinWithEmail(
    { username, password }: { username: string; password: string },
  ): Promise<{ user: { password: string; id: string; username: string; }; jwt: { accessToken: string; refreshToken: string; }; }> {
    const user = await userService.findOneByUsername(username);
    if (!user) throw error(404, 'user not found');
    if (!await compareHash(password, user.password)) {
      throw error(401, 'invalid credentials');
    }
    return {
      user: {
        ...user,
        password: '',
      },
      jwt: {
        accessToken: genJwt(JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRES_IN),
        refreshToken: genJwt(JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRES_IN),
      }
    }
  }

  // async signupWithEmail(credentials: Credentials): Promise<User | string> {
  async signupWithEmail(
    { username, password, host }: { username: string; password: string; host: string; },
  ): Promise<void> {
    // await db.create('users', { ...credentials });
    // const { username, password } = credentials;
    // log.info(username, password)

    // if (await userService.findOneByUsername(username)) {
    //   throw error(400, 'email taken');
    // } else if (await unverifiedUserService.findOneByUsername(username)) {
    //   throw error(400, 'email taken');
    // }
    const pwhash = await genHash(password);
    const code = nanoid(32);
    // await userService.createNew(username, pwhash);
    const user = await unverifiedUserService.createNew(username, pwhash, code);
    if (!user) throw error(500, 'error registering user');
    const url = `${host}/v1/auth/verify/${user.id}/${code}`;
    if (dev) {
      log.info('verification email:', url);
    } else {
      mailService.sendMail({
        to: [user.username],
        sub: 'Email verification from CPDBytes.com',
        body: emailVerificationTemplate(url),
      }).then(res => log.info(res));
    }
    // dsf.com/auth/verify/[:id]/token
    //todo: return jwt after email verification
  }
  
  async verifyEmail({ uid, code }: { uid: string; code: string; }): Promise<{ user: { password: string; username: string; id: string; }; jwt: { accessToken: string; refreshToken: string; }; }> {
    const user = await unverifiedUserService.findOneById(uid);
    if (!user) throw error(404, 'invalid link');
    // if (user.createdAt < 2hrs) throw error('link expired! register again');
    if (code !== user.code) throw error(404, 'invalid link');
    const nuser = await userService.createNew(user.username, user.password);
    if (!nuser) throw error(404, 'error creating user');
    await unverifiedUserService.deleteOneById(user.id);
    return {
      user: {
        ...nuser,
        password: '',
      },
      jwt: {
        accessToken: genJwt(JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRES_IN),
        refreshToken: genJwt(JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRES_IN),
      }
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
}


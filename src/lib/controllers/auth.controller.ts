import { dev } from "$app/environment";
import { compareHash, genHash, genJwt } from "$lib/server/utils";
import type { User } from "$lib/models/user.model";
import { userService } from "$lib/services/user.service";
import { log } from "$lib/logger";
import { unverifiedUserService } from "$lib/services/unverifieduser.service";
import { error } from "@sveltejs/kit";
import { JWT_ACCESS_TOKEN_EXPIRES_IN, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRES_IN, JWT_REFRESH_TOKEN_SECRET } from "$env/static/private";
import { use } from "passport";

class AuthController {
  async signinWithEmail(
    { username, password }: { username: string; password: string },
  ): Promise<{ user: User; jwt: { accessToken: string; refreshToken: string; }; }> {
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
    { username, password }: { username: string; password: string },
  ): Promise<void> {
    // await db.create('users', { ...credentials });
    // const { username, password } = credentials;
    // log.info(username, password)

    if (await userService.findOneByUsername(username)) {
      throw error(400, 'email taken');
    } else if (await unverifiedUserService.findOneByUsername(username)) {
      throw error(400, 'email taken');
    }
    const pwhash = await genHash(password);
    // await userService.createNew(username, pwhash);
    await unverifiedUserService.createNew(username, pwhash);
    //todo: return jwt after email verification
  }
}

export const authController = new AuthController();
import { log } from "$lib/logger";
import type { User } from "$lib/models/user.model";
import { db, type Result } from "$lib/server/db";

class UnverifiedUserService {
  async findById(id: string): Promise<User | undefined> {
    try {
      const res = await db.select<User>(id);
      return res[0];
    } catch (error) { }
  }

  async findAll(): Promise<User[] | undefined> {
    try {
      const res = await db.query<Result<User>[]>("SELECT * FROM unverifiedusers");
      return res[0].result;
    } catch (error) { }
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    try {
      const res = await db.query<Result<User>[]>("SELECT * FROM unverifiedusers WHERE username == $u", {
        u: username,
      });
      log.info(res)
      return res[0].result[0];
    } catch (error) {
      log.error(error);
     }
  }

  async createNew(username: string, password: string): Promise<User | undefined> {
    try {
      const res = await db.create('unverifiedusers', { username, password, verified: false }) as User;
      return res;
    } catch (error) {
      log.error(error);
    }
  }
}

export const unverifiedUserService = new UnverifiedUserService();
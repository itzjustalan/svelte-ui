import { log } from "$lib/logger";
import { db, type Result } from "$lib/server/db";

export interface Unverifieduser {
  id: string;
  code: string;
  username: string;
  password: string;
}

class UnverifiedUserService {
  async findById(id: string): Promise<Unverifieduser | undefined> {
    try {
      const res = await db.select<Unverifieduser>(id);
      return res[0];
    } catch (error) {}
  }

  async findAll(): Promise<Unverifieduser[] | undefined> {
    try {
      const res = await db.query<Result<Unverifieduser>[]>(
        "SELECT * FROM unverifiedusers",
      );
      return res[0].result;
    } catch (error) {}
  }

  async findOneByUsername(
    username: string,
  ): Promise<Unverifieduser | undefined> {
    try {
      const res = await db.query<Result<Unverifieduser>[]>(
        "SELECT * FROM unverifiedusers WHERE username == $u",
        {
          u: username,
        },
      );
      log.info(res);
      return res[0].result[0];
    } catch (error) {
      log.error(error);
    }
  }

  async createNew(
    username: string,
    password: string,
    code: string,
  ): Promise<Unverifieduser | undefined> {
    try {
      const res = await db.create("unverifiedusers", {
        username,
        password,
        code,
      }) as Unverifieduser;
      return res;
    } catch (error) {
      log.error(error);
    }
  }

  async deleteOneById(id: string) {
    try {
      const res = await db.query(
        "DELETE FROM unverifiedusers WHERE id == $id",
        { id },
      );
      log.info(res);
    } catch (error) {
      log.error(error);
    }
  }
}

export const unverifiedUserService = new UnverifiedUserService();

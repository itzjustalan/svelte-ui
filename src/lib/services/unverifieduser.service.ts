import { log } from "$lib/logger";
import { Unverifieduser } from "$lib/models/user.model";
import { db } from "$lib/server/db";
import { delRecord, query, select } from "cirql";

class UnverifiedUserService {
  table: string;
  constructor() {
    this.table = "unverifieduser";
  }
  async findOneById(id: string) {
    try {
      const res = await db.execute({
        schema: Unverifieduser,
        query: select().from(this.table).where({ id }),
      });
      return res[0];
    } catch (error) {
      log.error(error);
    }
  }

  async findAll() {
    try {
      return await db.execute({
        schema: Unverifieduser,
        query: select().from(this.table),
      });
    } catch (error) {
      log.error(error);
    }
  }

  async findOneByUsername(
    username: string,
  ) {
    try {
      const res = await db.execute({
        schema: Unverifieduser,
        query: select().from(this.table).where({ username }),
      });
      return res[0];
    } catch (error) {
      log.error(error);
    }
  }

  async createNew(
    username: string,
    password: string,
    code: string,
  ) {
    try {
      const res = await db.execute({
        schema: Unverifieduser,
        query: query(
          `CREATE ${this.table} SET username = $username, password = $password, code = $code, createdAt = time::now();`,
        ),
        params: {
          username,
          password,
          code,
        },
      });
      return res[0];
    } catch (error) {
      log.error(error);
    }
  }

  async deleteOneById(id: string) {
    try {
      return await db.execute({
        query: delRecord(id),
        schema: Unverifieduser,
      });
    } catch (error) {
      log.error(error);
    }
  }
}

export const unverifiedUserService = new UnverifiedUserService();

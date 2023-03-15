import { log } from "$lib/logger";
import { UnverifieduserSchema, type Unverifieduser } from "$lib/zod/models/user.model";
import { db } from "$lib/server/db";
import { delRecord, query, select } from "cirql";

class UnverifiedUserService {
  table: string;
  constructor() {
    this.table = "unverifieduser";
  }
  async findOneById(id: string): Promise<Unverifieduser | undefined> {
    try {
      const res = await db.execute({
        schema: UnverifieduserSchema,
        query: select().from(this.table).where({ id }),
      });
      return res[0];
    } catch (error) {
      log.error(error);
    }
  }

  async findAll(): Promise<Unverifieduser[] | undefined> {
    try {
      return await db.execute({
        schema: UnverifieduserSchema,
        query: select().from(this.table),
      });
    } catch (error) {
      log.error(error);
    }
  }

  async findOneByUsername(
    username: string,
  ): Promise<Unverifieduser | undefined> {
    try {
      const res = await db.execute({
        schema: UnverifieduserSchema,
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
  ): Promise<Unverifieduser | undefined> {
    try {
      const res = await db.execute({
        schema: UnverifieduserSchema,
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

  async deleteOneById(id: string): Promise<Unverifieduser | undefined> {
    try {
      return await db.execute({
        query: delRecord(id),
        schema: UnverifieduserSchema,
      }) ?? undefined;
    } catch (error) {
      log.error(error);
    }
  }
}

export const unverifiedUserService = new UnverifiedUserService();

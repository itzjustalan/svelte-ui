import { log } from "$lib/logger";
import { User } from "$lib/models/user.model";
import { db } from "$lib/server/db";
import { create, delRecord, select } from "cirql";

class UserService {
  table: string;
  constructor() {
    this.table = 'users';
  }
  async findOneById(id: string) {
    try {
      const res = await db.execute({
        schema: User,
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
        schema: User,
        query: select().from(this.table),
      });
    } catch (error) {
      log.error(error);
    }
  }

  async findOneByUsername(username: string) {
    try {
      const res = await db.execute({
        schema: User,
        query: select().from(this.table).where({ username }),
      });
      return res[0];
    } catch (error) {
      log.error(error);
     }
  }

  async createNew(username: string, password: string) {
    try {
      return await db.execute({
        schema: User,
        query: create(this.table).setAll({
          username,
          password,
        }),
      });
    } catch (error) {
      log.error(error);
    }
  }
}

export const userService = new UserService();
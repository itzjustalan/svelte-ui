import { db } from "$lib/server/db";
import { type UserModel, userModelSchema } from "$lib/models/db/user.model";
import { select } from "cirql";
import { BaseService } from "./base.service";
import { log } from "$lib/logger";

class TestService extends BaseService<UserModel> {
    constructor() { super("users", userModelSchema) }

  async findOneByUsername(username: string): Promise<UserModel | undefined> {
    try {
      const res = await db.execute({
        schema: this.tableschema,
        query: select().from(this.tablename).where({ username }).fetch(''),
      });
      return res[0];
    } catch (error) {
      log.error(error);
    }
  }
}

export const testService = new TestService();
let gg = await testService.findAll();
let gh = await testService.findOneById("");
let gk = await testService.createNew({
    password: "",
    username: "",
});

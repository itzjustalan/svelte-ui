import { dev } from "$app/environment";
import type { User } from "$lib/models/user.model";
import { db, type Result } from "$lib/server/db";

export class UserService {
  async findById(id: string): Promise<User | undefined> {
    try {
      const res = await db.select<User>(id);
      return res[0];
    } catch (error) { }
  }

  async findAllUsers(): Promise<User[] | undefined> {
    try {
      const res = await db.query<Result<User>[]>("SELECT * FROM users");
      return res[0].result;
    } catch (error) { }
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    try {
      const res = await db.query<Result<User>[]>("SELECT id FROM users WHERE username == $u", {
        u: username,
      });
      return res[0].result[0];
    } catch (error) {
      console.log(dev && error);
     }
  }

  async createNewUser(username: string, password: string): Promise<User | string> {
    try {
      const res = await db.create('users', { username, password }) as User;
      return res;
    } catch (error) {
      console.log(dev && error);
      return 'error creating user';
    }
  }
}

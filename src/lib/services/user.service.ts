import { db, type Result } from "$lib/server/db";
interface User {
    id: string,
    username: string,
    password: string
}
export class UserService {
  async findById(id: string) {
    try {
        const res = await db.select<User>(id);
        return res[0];
    } catch (error) {}
  }

  async findAllUsers(): Promise<User[] | undefined> {
    try {
        const res = await db.query<Result<User>[]>("SELECT * FROM users");
        return res[0].result;
    } catch (error) {}
  }

  async findOneByUsername(username: string) {
    //todo: figure out the best way to set ts models for surreal db n return that
    try {
      return await db.query("SELECT id FROM users WHERE username == $u", {
        u: username,
      });
    } catch (error) {}
  }

  async createNewUser(username: string, password: string) {
        // const r = await db.create('users', { ...credentials });
    await db.create('users', { username, password });
    
  }
}

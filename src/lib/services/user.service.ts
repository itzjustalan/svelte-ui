import { log } from '$lib/logger';
import { UserSchema, type User } from '$lib/zod/models/user.model';
import { db } from '$lib/server/db';
import { create, select } from 'cirql';

class UserService {
	table: string;
	constructor() {
		this.table = 'users';
	}
	async findOneById(id: string): Promise<User | undefined> {
		try {
			const res = await db.execute({
				schema: UserSchema,
				query: select().from(this.table).where({ id })
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}

	async findAll(): Promise<User[] | undefined> {
		try {
			return await db.execute({
				schema: UserSchema,
				query: select().from(this.table)
			});
		} catch (error) {
			log.error(error);
		}
	}

	async findOneByUsername(username: string): Promise<User | undefined> {
		try {
			const res = await db.execute({
				schema: UserSchema,
				query: select().from(this.table).where({ username })
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}

	async createNew(username: string, password: string): Promise<User | undefined> {
		try {
			return (await db.execute({
				schema: UserSchema,
				query: create(this.table).setAll({
					username,
					password
				})
			})) satisfies User;
		} catch (error) {
			log.error(error);
		}
	}
}

export const userService = new UserService();

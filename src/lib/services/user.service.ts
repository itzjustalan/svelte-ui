import { log } from '$lib/logger';
import { userModelSchema, type UserModel } from '$lib/models/db/user.model';
import { db } from '$lib/server/db';
import { create, select } from 'cirql';

class UserService {
	table: string;
	constructor() {
		this.table = 'users';
	}
	async findOneById(id: string): Promise<UserModel | undefined> {
		try {
			const res = await db.execute({
				schema: userModelSchema,
				query: select().from(this.table).where({ id })
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}

	async findAll(): Promise<UserModel[] | undefined> {
		try {
			return await db.execute({
				schema: userModelSchema,
				query: select().from(this.table)
			});
		} catch (error) {
			log.error(error);
		}
	}

	async findOneByUsername(username: string): Promise<UserModel | undefined> {
		try {
			const res = await db.execute({
				schema: userModelSchema,
				query: select().from(this.table).where({ username })
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}

	async createNew(username: string, password: string): Promise<UserModel | undefined> {
		try {
			return (await db.execute({
				schema: userModelSchema,
				query: create(this.table).setAll({
					username,
					password
				})
			})) satisfies UserModel;
		} catch (error) {
			log.error(error);
		}
	}
}

export const userService = new UserService();

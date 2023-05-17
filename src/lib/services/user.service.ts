import { log } from '$lib/logger';
import { userModelSchema, type UserModel } from '$lib/models/db/user.model';
import { db } from '$lib/server/db';
import { create, eq, select, time } from 'cirql';
import { BaseService } from './base.service';
import type { AuthInput } from '$lib/models/input/user';

class UserService extends BaseService<UserModel> {
	constructor() {
		super('users', userModelSchema);
	}

	async findOneByUsername(username: string): Promise<UserModel | undefined> {
		try {
			//todo: try that new fn
			const res = await db.execute({
				schema: this.tableschema,
				query: select().from(this.tablename).where({ username }),
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}

	// async createNew(
	// 	data: Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>
	// ): Promise<UserModel | undefined> {
	// 	try {
	// 		return (await db.execute({
	// 			schema: this.tableschema,
	// 			query: create(this.tablename).setAll({
	// 				...data,
	// 				createdAt: eq(time.now()),
	// 				updatedAt: eq(time.now()),
	// 			}),
	// 		})) satisfies UserModel;
	// 	} catch (error) {
	// 		log.error(error);
	// 	}
	// }
}

export const userService = new UserService();

import { log } from '$lib/logger';
import { db } from '$lib/server/db';
import { deleteUndefinedKeys } from '$lib/utils';
import { query, create, select, update, eq, time } from 'cirql';
import type { ZodType } from 'zod';

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type NewDoc<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export class BaseService<T extends { id: string }> {
	constructor(public tablename: string, public tableschema: ZodType) {}

	async findAll<T>(fetch: string[] = [], schema?: ZodType): Promise<T[] | undefined> {
		try {
			return await db.execute({
				schema: schema ?? this.tableschema,
				query: select()
					.from(this.tablename)
					.fetch(...fetch),
			});
		} catch (error) {
			log.error(error);
		}
	}

	async findOneById(id: string): Promise<T | undefined> {
		try {
			const res = await db.execute({
				schema: this.tableschema,
				query: select().from(this.tablename).where({ id }),
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}

	async findOneByKey(data: Partial<T>): Promise<T | undefined> {
		//todo: dis wrk?
		try {
			deleteUndefinedKeys(data);
			const res = await db.execute({
				schema: this.tableschema,
				query: select().from(this.tablename).where(data),
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}

	// async createNew(data: Omit<T, 'id'>): Promise<T | undefined> {
	// 	// async createNew(data: Optional<T, 'id'>): Promise<T | undefined> {
	// 	// log.warn({ data });
	// 	// if (data.id) delete data.id;
	// 	try {
	// 		return await db.execute({
	// 			schema: this.tableschema,
	// 			query: create(this.tablename).setAll(data),
	// 		});
	// 	} catch (error) {
	// 		log.error(error);
	// 	}
	// }

	async createNew(data: NewDoc<T>): Promise<T | undefined> {
		try {
			if ('id' in data) delete data.id;
			return await db.execute({
				schema: this.tableschema,
				query: create(this.tablename).setAll({
					...data,
					createdAt: eq(time.now()),
					updatedAt: eq(time.now()),
				}),
			});
		} catch (error) {
			log.error(error);
		}
	}

	/**
	 * -- DANGEROUS AND MUST NOT BE USED!! --
	 *
	 * This will overwrite every/any field if a document with the same id exists.
	 * Or this will create a new document if a document with the same id does not exist.
	 * todo: properly handle createdAt & updatedAt.
	 * @param data T
	 * @returns Promise<T | undefined>
	 */
	async overwrite(data: T): Promise<T | undefined> {
		try {
			const res = await db.execute({
				schema: this.tableschema,
				query: query(
					`UPDATE ${data.id} set ${Object.keys(data)
						.map((e) => `${e} = \$${e}`)
						.toString()};`
				),
				params: data,
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}

	async updateById(id: string, data: Partial<T>): Promise<T | undefined> {
		try {
			if ('id' in data) delete data.id;
			if ('createdAt' in data) delete data.createdAt;
			deleteUndefinedKeys(data);
			const res = await db.execute({
				schema: this.tableschema,
				query: update(this.tablename)
					.where({ id })
					.setAll({
						...data,
						updatedAt: eq(time.now()),
					}),
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}
}

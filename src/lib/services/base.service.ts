import { log } from '$lib/logger';
import { db } from '$lib/server/db';
import { deleteUndefinedKeys } from '$lib/utils';
import { query, create, select, update } from 'cirql';
import type { ZodType } from 'zod';

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export class BaseService<T extends { id: string }> {
	constructor(public tablename: string, public tableschema: ZodType) {}

	async createNew(data: Omit<T, 'id'>): Promise<T | undefined> {
		// async createNew(data: Optional<T, 'id'>): Promise<T | undefined> {
		// log.warn({ data });
		// if (!data.id) delete data.id;
		try {
			return await db.execute({
				schema: this.tableschema,
				query: create(this.tablename).setAll(data),
			});
		} catch (error) {
			log.error(error);
		}
	}

	async updateById(id: string, data: Partial<T>): Promise<T | undefined> {
		try {
			if ('id' in data) delete data.id;
			deleteUndefinedKeys(data);
			const res = await db.execute({
				schema: this.tableschema,
				query: update(this.tablename).where({ id }).setAll(data),
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}

	async createOrUpdate(data: T): Promise<T | undefined> {
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
}

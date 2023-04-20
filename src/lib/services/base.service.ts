import { log } from '$lib/logger';
import { db } from '$lib/server/db';
import { create, query, select } from 'cirql';
import type { ZodType } from 'zod';

export class BaseService<T extends { id: string }> {
	constructor(public tablename: string, public tableschema: ZodType) {}

	async createNew(data: Omit<T, 'id'>): Promise<T | undefined> {
		try {
			return await db.execute({
				schema: this.tableschema,
				query: create(this.tablename).setAll(data)
			});
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
						.toString()}`
				),
				params: data
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
				query: select().from(this.tablename).where({ id })
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
					.fetch(...fetch)
			});
		} catch (error) {
			log.error(error);
		}
	}
}

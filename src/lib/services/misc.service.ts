import { db } from '$lib/server/db';

import { create, select, update, updateRecord } from 'cirql';
import { BaseService } from './base.service';
import { log } from '$lib/logger';
import { z } from 'zod';
import { menuDataSchema } from '$lib/models/data/menu.data';
import { miscModelSchema, type MiscModel, MiscIds } from '$lib/models/db/misc.model';

class MiscService extends BaseService<MiscModel> {
	constructor() {
		super('miscellaneous', miscModelSchema);
	}
	async getAppData() {
		try {
			const res = await db.execute({
				schema: this.tableschema,
				query: select().from(this.tablename).where({ id: MiscIds.appdata })
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}
	async setAppData(seeded: boolean) {
		try {
			await this.createOrUpdate({
				id: MiscIds.appdata,
				seeded
			});
			// const appdata = await miscService.getAppData();
			// if (!appdata)
			// 	await db.execute({
			// 		schema: this.tableschema,
			// 		query: create(this.tablename).setAll({
			// 			seeded,
			// 			id: MiscIds.appdata
			// 		})
			// 	});
			// const res = await db.execute({
			// 	schema: this.tableschema,
			// 	query: update(this.tablename)
			// 		.where({ id: MiscIds.appdata })
			// 		.setAll({ seeded, id: MiscIds.appdata })
			// });
			// return res[0];
		} catch (error) {
			log.error('ee:', error);
		}
	}
}

export const miscService = new MiscService();

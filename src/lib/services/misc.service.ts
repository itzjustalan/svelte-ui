import { db } from '$lib/server/db';

import { select, update, updateRecord } from 'cirql';
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
	async setAppData() {
		try {
			log.warn(2222);
			const res = await db.execute({
				schema: this.tableschema,
				query: update(this.tablename).where({ id: MiscIds.appdata }).set('seeded', true)
			});
			log.info(res);
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}
}

export const miscService = new MiscService();

import { db } from '$lib/server/db';
import { select } from 'cirql';
import { BaseService } from './base.service';
import { log } from '$lib/logger';
import { miscModelSchema, type MiscModel, MiscIds } from '$lib/models/db/misc.model';

class MiscService extends BaseService<MiscModel> {
	constructor() {
		super('miscellaneous', miscModelSchema);
	}
	async getAppData(): Promise<undefined | MiscModel> {
		try {
			const res = await db.execute({
				schema: this.tableschema,
				query: select().from(this.tablename).where({ id: MiscIds.appdata }),
			});
			return res[0];
		} catch (error) {
			log.error(error);
		}
	}
	async setAppData({ seeded }: { seeded: boolean }) {
		try {
			const ndate = new Date();
			await this.overwrite({
				id: MiscIds.appdata,
				seeded,
				createdAt: ndate,
				updatedAt: ndate,
			});
		} catch (error) {
			log.error('ee:', error);
		}
	}
}

export const miscService = new MiscService();

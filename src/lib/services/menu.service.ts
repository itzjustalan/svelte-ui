import { db } from '$lib/server/db';
import { menuModelSchema, type MenuModel } from '$lib/models/db/menu.model';
import { select } from 'cirql';
import { BaseService } from './base.service';
import { log } from '$lib/logger';
import { z } from 'zod';
import { menuDataSchema } from '$lib/models/data/menu.data';

class MenuService extends BaseService<MenuModel> {
	constructor() {
		super('menus', menuModelSchema);
	}
	async findAll2(fetch: string[] = []) {
		try {
			const r = await db.execute({
				schema: this.tableschema,
				// schema: menuDataSchema,
				// query: select().from(this.tablename).fetch(),
				query: select()
					.from(this.tablename)
					.fetch(...fetch),
				// query: select().from(this.tablename).fetch('categories'),
			});
			log.warn(r);
			// log.error(r[0].categories)
			return r;
		} catch (error) {
			log.error(error);
		}
	}
	// async createNew(menuItem: MenuItemData): Promise<Menu | undefined> {
	//     try {
	//         return await db.execute({
	//             schema: menuSchema,
	//             query: create(this.table).setAll({ ...menuItem }),
	//         }) satisfies Menu;
	//     } catch (error) {
	//         log.error(error);
	//     }
	// }
}

export const menuService = new MenuService();

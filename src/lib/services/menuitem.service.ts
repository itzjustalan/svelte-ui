import { menuItemModelSchema, type MenuItemModel } from '$lib/models/db/menu.model';
import { BaseService } from './base.service';

class MenuItemService extends BaseService<MenuItemModel> {
	constructor() {
		super('menuitems', menuItemModelSchema);
	}
	// table = 'menuitem'
	// async createNew(menuItem: MenuItemData): Promise<MenuItem | undefined> {
	//     try {
	//         return await db.execute({
	//             schema: menuItemSchema,
	//             query: create(this.table).setAll({ ...menuItem }),
	//         }) satisfies MenuItem;
	//     } catch (error) {
	//         log.error(error);
	//     }
	// }
}

export const menuItemService = new MenuItemService();

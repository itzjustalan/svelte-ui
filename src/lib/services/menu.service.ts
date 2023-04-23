import { menuModelSchema, type MenuModel } from '$lib/models/db/menu.model';
import { BaseService } from './base.service';

class MenuService extends BaseService<MenuModel> {
	constructor() {
		super('menus', menuModelSchema);
	}
}

export const menuService = new MenuService();

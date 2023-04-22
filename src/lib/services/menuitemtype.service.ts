import { menuItemTypeModelSchema, type MenuItemTypeModel } from '$lib/models/db/menu.model';
import { BaseService } from './base.service';

class MenuItemTypeService extends BaseService<MenuItemTypeModel> {
	constructor() {
		super('menuitemtypes', menuItemTypeModelSchema);
	}
}

export const menuItemTypeService = new MenuItemTypeService();

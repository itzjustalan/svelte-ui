import { InternalServerError } from '$lib/errors';
import { categoryService } from '$lib/services/category.service';
import { menuService } from '$lib/services/menu.service';
import { menuItemService } from '$lib/services/menuitem.service';
import type {
	CategoryModel,
	MenuModel,
	MenuItemModel,
	MenuItemTypeModel,
} from '$lib/models/db/menu.model';
import type {
	CategoryInput,
	MenuInput,
	MenuItemInput,
	MenuItemTypeInput,
	MenuUpdateInput,
} from '$lib/models/input/menu';
import { menuDataSchema, type MenuData } from '$lib/models/data/menu.data';
import { menuItemTypeService } from '$lib/services/menuitemtype.service';

class MenuController {
	async createMenu(menuItem: MenuInput): Promise<Error | MenuModel> {
		return (
			(await menuService.createNew(menuItem)) ?? new InternalServerError('error creating menu item')
		);
	}

	async updateMenu(menuItem: MenuUpdateInput): Promise<Error | MenuModel> {
		return (
			(await menuService.updateById(menuItem.id, menuItem)) ??
			new InternalServerError('error updating menu')
		);
	}

	async getMenus(): Promise<Error | MenuData[]> {
		// await menuService.findAll();
		// await menuService.findAll2(['categories']);
		return (
			(await menuService.findAll<MenuData>(['categories'], menuDataSchema)) ??
			new InternalServerError('error getting menu item')
		);
		// return await menuService.findAll() ?? new InternalServerError('error getting menu item');
	}

	async createCategory(category: CategoryInput): Promise<Error | CategoryModel> {
		return (
			(await categoryService.createNew(category)) ??
			new InternalServerError('error creating category')
		);
	}

	async createMenuItem(menuItem: MenuItemInput): Promise<Error | MenuItemModel> {
		return (
			(await menuItemService.createNew(menuItem)) ??
			new InternalServerError('error creating menu item')
		);
	}
	async getMenuItems(): Promise<Error | MenuItemModel[]> {
		return (await menuItemService.findAll()) ?? new InternalServerError('error getting menu item');
	}

	async createMenuItemType(menuItemType: MenuItemTypeInput): Promise<Error | MenuItemTypeModel> {
		return (
			(await menuItemTypeService.createNew(menuItemType)) ??
			new InternalServerError('error creating menu item type')
		);
	}
	async getMenuItemTypes(): Promise<Error | MenuItemTypeModel[]> {
		return (
			(await menuItemTypeService.findAll()) ??
			new InternalServerError('error getting menu item type')
		);
	}

	// async getMenus(): Promise<Error | Menu[]> {
	//     await menuService.findAll() ?? new InternalServerError('error creating menu item');
	// }
}

export const menuController = new MenuController();

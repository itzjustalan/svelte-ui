import { InternalServerError } from '$lib/errors';
import { categoryService } from '$lib/services/category.service';
import { menuService } from '$lib/services/menu.service';
import { menuItemService } from '$lib/services/menuitem.service';
import type { CategoryModel, MenuModel, MenuItemModel } from '$lib/models/db/menu.model';
import type { CategoryInput, MenuInput, MenuItemInput } from '$lib/models/input/menuitem';
import { menuDataSchema, type MenuData } from '$lib/models/data/menu.data';

class MenuController {
	async createMenu(menuItem: MenuInput): Promise<Error | MenuModel> {
		return (
			(await menuService.createNew(menuItem)) ?? new InternalServerError('error creating menu item')
		);
	}

	async getMenus(): Promise<Error | MenuData[]> {
		await menuService.findAll2();
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
		return (await menuItemService.findAll()) ?? new InternalServerError('error creating menu item');
	}

	// async getMenus(): Promise<Error | Menu[]> {
	//     await menuService.findAll() ?? new InternalServerError('error creating menu item');
	// }
}

export const menuController = new MenuController();

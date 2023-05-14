import defaultApi from './apis';
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
} from '$lib/models/input/menu';
import type { CategoryData, MenuData, MenuItemData } from '$lib/models/data/menu.data';

class MenuNetwork {
	createMenu = async (data: MenuInput) => await defaultApi.post<MenuModel>('v1/api/menu', data);
	createCategory = async (data: CategoryInput) =>
		await defaultApi.post<CategoryModel>('v1/api/menu/category', data);
	createMenuItem = async (data: MenuItemInput) =>
		await defaultApi.post<MenuItemModel>('v1/api/menu/menuitem', data);
	createMenuItemType = async (data: MenuItemTypeInput) =>
		await defaultApi.post<MenuItemTypeModel>('v1/api/menu/menuitemtype', data);
	getMenus = async () => (await defaultApi.get<MenuData[]>('v1/api/menu')).data;
	getCategories = async () => (await defaultApi.get<CategoryData[]>('v1/api/menu/category')).data;
	getMenuItems = async () => (await defaultApi.get<MenuItemData[]>('v1/api/menu/menuitem')).data;
	getMenuItemTypes = async () =>
		(await defaultApi.get<MenuItemTypeModel[]>('v1/api/menu/menuitemtype')).data;
}

export const menuNetwork = new MenuNetwork();

import { AppError, InternalServerError } from '$lib/errors';
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
	CategoryUpdateInput,
	MenuInput,
	MenuItemInput,
	MenuItemTypeInput,
	MenuItemTypeUpdateInput,
	MenuItemUpdateInput,
	MenuUpdateInput,
} from '$lib/models/input/menu';
import {
	menuDataSchema,
	type MenuData,
	type CategoryData,
	categoryDataSchema,
	type MenuItemData,
	menuItemDataSchema,
} from '$lib/models/data/menu.data';
import { menuItemTypeService } from '$lib/services/menuitemtype.service';

class MenuController {
	// menu
	async getMenus(): Promise<AppError | MenuData[]> {
		return (
			(await menuService.findAll<MenuData>(
				['categories', 'categories.menuItems', 'categories.menuItems.menuItemTypes'],
				menuDataSchema
			)) ?? new InternalServerError('error fetching menus')
		);
	}

	async createMenu(menuItem: MenuInput): Promise<AppError | MenuModel> {
		return (
			(await menuService.createNew(menuItem)) ?? new InternalServerError('error creating menu')
		);
	}

	async updateMenu(menuItem: MenuUpdateInput): Promise<AppError | MenuModel> {
		return (
			(await menuService.updateById(menuItem.id, menuItem)) ??
			new InternalServerError('error updating menu')
		);
	}

	// category
	async getCategories(): Promise<AppError | CategoryData[]> {
		return (
			(await categoryService.findAll<CategoryData>(
				['menuItems', 'menuItems.menuItemTypes'],
				categoryDataSchema
			)) ?? new InternalServerError('error fetching categories')
		);
	}

	async createCategory(category: CategoryInput): Promise<AppError | CategoryModel> {
		return (
			(await categoryService.createNew(category)) ??
			new InternalServerError('error creating category')
		);
	}

	async updateCategory(category: CategoryUpdateInput): Promise<AppError | CategoryModel> {
		return (
			(await categoryService.updateById(category.id, category)) ??
			new InternalServerError('error updating category')
		);
	}

	// menuItem
	async getMenuItems(): Promise<AppError | MenuItemData[]> {
		return (
			(await menuItemService.findAll(['menuItemTypes'], menuItemDataSchema)) ??
			new InternalServerError('error fetching menuItems')
		);
	}

	async createMenuItem(menuItem: MenuItemInput): Promise<AppError | MenuItemModel> {
		return (
			(await menuItemService.createNew(menuItem)) ??
			new InternalServerError('error creating menuItem')
		);
	}

	async updateMenuItem(menuItem: MenuItemUpdateInput): Promise<AppError | MenuItemModel> {
		return (
			(await menuItemService.updateById(menuItem.id, menuItem)) ??
			new InternalServerError('error updating menuItem')
		);
	}

	// menuItemType
	async getMenuItemTypes(): Promise<AppError | MenuItemTypeModel[]> {
		return (
			(await menuItemTypeService.findAll()) ??
			new InternalServerError('error fetching menuItemType')
		);
	}

	async createMenuItemType(menuItemType: MenuItemTypeInput): Promise<AppError | MenuItemTypeModel> {
		return (
			(await menuItemTypeService.createNew(menuItemType)) ??
			new InternalServerError('error creating menuItemType')
		);
	}

	async updateMenuItemType(
		menuItemType: MenuItemTypeUpdateInput
	): Promise<AppError | MenuItemTypeModel> {
		return (
			(await menuItemTypeService.updateById(menuItemType.id, menuItemType)) ??
			new InternalServerError('error updating menuItemType')
		);
	}
}

export const menuController = new MenuController();

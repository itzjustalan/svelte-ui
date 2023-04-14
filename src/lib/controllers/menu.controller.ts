import { InternalServerError } from "$lib/errors";
import { categoryService } from "$lib/services/category.service";
import { menuService } from "$lib/services/menu.service";
import { menuItemService } from "$lib/services/menuitem.service";
import type { Category, Menu, MenuItem } from "$lib/zod/models/menu.model";
import type { CategoryData, MenuData, MenuItemData } from "$lib/zod/schemas/menuitem";

class MenuController {
    async createMenu(menuItem: MenuData): Promise<Error | Menu> {
        return await menuService.createNew(menuItem) ?? new InternalServerError('error creating menu item');
    }

    async getMenus(): Promise<Error | Menu[]> {
        return await menuService.findAll() ?? new InternalServerError('error getting menu item');
    }

    async createCategory(category: CategoryData): Promise<Error | Category> {
        return await categoryService.createNew(category) ?? new InternalServerError('error creating category');
    }

    async createMenuItem(menuItem: MenuItemData): Promise<Error | MenuItem> {
        return await menuItemService.createNew(menuItem) ?? new InternalServerError('error creating menu item');
    }

    async getMenuItems(): Promise<Error | MenuItem[]> {
        return await menuItemService.findAll() ?? new InternalServerError('error creating menu item');
    }

    // async getMenus(): Promise<Error | Menu[]> {
    //     await menuService.findAll() ?? new InternalServerError('error creating menu item');
    // }
}

export const menuController = new MenuController();

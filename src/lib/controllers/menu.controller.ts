import { InternalServerError } from "$lib/errors";
import { menuItemService } from "$lib/services/menuitem.service";
import type { MenuItem } from "$lib/zod/models/menu.model";
import type { MenuItemData } from "$lib/zod/schemas/menuitem";

class MenuController {
    async createMenuItem(menuItem: MenuItemData): Promise<Error | MenuItem> {
        return await menuItemService.createNew(menuItem) ?? new InternalServerError('error creating menu item');
    }

    async getMenuItems(): Promise<Error | MenuItem[]> {
        return await menuItemService.findAll() ?? new InternalServerError('error creating menu item');
    }
}

export const menuController = new MenuController();

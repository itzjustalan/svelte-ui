import { log } from "$lib/logger";
import { db } from "$lib/server/db";
import { menuItemSchema, type MenuItem } from "$lib/zod/models/menu.model";
import type { MenuItemData } from "$lib/zod/schemas/menuitem";
import { create } from "cirql";

class MenuItemService {
    table = 'menuitem'
    async createNew(menuItem: MenuItemData): Promise<MenuItem | undefined> {
        try {
            return await db.execute({
                schema: menuItemSchema,
                query: create(this.table).setAll({ ...menuItem }),
            }) satisfies MenuItem;
        } catch (error) {
            log.error(error);
        }
    }
}

export const menuItemService = new MenuItemService();

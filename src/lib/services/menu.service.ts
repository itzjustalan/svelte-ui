import { log } from "$lib/logger";
import { db } from "$lib/server/db";
import { menuSchema, type Menu } from "$lib/zod/models/menu.model";
import { create } from "cirql";
import type { MenuItemData } from "$lib/zod/schemas/menuitem";

class MenuService {
    table = 'menu'
    async createNew(menuItem: MenuItemData): Promise<Menu | undefined> {
        try {
            return await db.execute({
                schema: menuSchema,
                query: create(this.table).setAll({ ...menuItem }),
            }) satisfies Menu;
        } catch (error) {
            log.error(error);
        }
    }
}

export const menuService = new MenuService();

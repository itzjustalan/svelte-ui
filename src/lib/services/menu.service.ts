import { log } from "$lib/logger";
import { db } from "$lib/server/db";
import { MenuItemSchema, type MenuItem } from "$lib/zod/models/menu.model";
import { create } from "cirql";

class MenuItemService {
    table = 'menuitem'
    async createNew(menuItem: MenuItem): Promise<MenuItem | undefined> {
        try {
            return await db.execute({
                schema: MenuItemSchema,
                query: create(this.table).setAll({ ...menuItem }),
            }) satisfies MenuItem;
        } catch (error) {
            log.error(error);
        }
    }
}

export const menuItemService = new MenuItemService();

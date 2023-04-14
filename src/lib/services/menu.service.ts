import { menuSchema, type Menu } from "$lib/zod/models/menu.model";
import { BaseService } from "./base.service";

class MenuService extends BaseService<Menu> {
    constructor() { super("menus", menuSchema) }
    // async createNew(menuItem: MenuItemData): Promise<Menu | undefined> {
    //     try {
    //         return await db.execute({
    //             schema: menuSchema,
    //             query: create(this.table).setAll({ ...menuItem }),
    //         }) satisfies Menu;
    //     } catch (error) {
    //         log.error(error);
    //     }
    // }
}

export const menuService = new MenuService();

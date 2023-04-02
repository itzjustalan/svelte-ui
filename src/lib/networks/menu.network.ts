import defaultApi from "./apis";
import type { MenuItemData } from "$lib/zod/schemas/menuitem";
import type { MenuItem } from "$lib/zod/models/menu.model";

class MenuNetwork {
  createNewMenuItem = async (data: MenuItemData) =>
    await defaultApi.post<MenuItem>("v1/api/menu/menuitem", data);
  getMenuItems = async () => await (await defaultApi.get<MenuItem[]>("v1/api/menu/menuitem")).data;
}

export const menuNetwork = new MenuNetwork();

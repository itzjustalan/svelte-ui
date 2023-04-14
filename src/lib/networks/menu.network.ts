import defaultApi from "./apis";
import type { CategoryData, MenuData, MenuItemData } from "$lib/zod/schemas/menuitem";
import type { Category, Menu, MenuItem } from "$lib/zod/models/menu.model";

class MenuNetwork {
  createMenu = async (data: MenuData) =>
    await defaultApi.post<Menu>("v1/api/menu", data);
  createCategory = async (data: CategoryData) =>
    await defaultApi.post<Category>("v1/api/menu/category", data);
  createMenuItem = async (data: MenuItemData) =>
    await defaultApi.post<MenuItem>("v1/api/menu/menuitem", data);
  getMenus = async () => (await defaultApi.get<Menu[]>("v1/api/menu")).data;
  getMenuItems = async () => (await defaultApi.get<MenuItem[]>("v1/api/menu/menuitem")).data;
}

export const menuNetwork = new MenuNetwork();

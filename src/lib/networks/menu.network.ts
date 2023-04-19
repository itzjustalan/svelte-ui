import defaultApi from "./apis";
import type { CategoryModel, MenuModel, MenuItemModel } from "$lib/models/db/menu.model";
import type { CategoryInput, MenuInput, MenuItemInput } from "$lib/zod/schemas/menuitem";
import type { MenuData } from "$lib/models/data/menu.data";

class MenuNetwork {
  createMenu = async (data: MenuInput) =>
    await defaultApi.post<MenuModel>("v1/api/menu", data);
  createCategory = async (data: CategoryInput) =>
    await defaultApi.post<CategoryModel>("v1/api/menu/category", data);
  createMenuItem = async (data: MenuItemInput) =>
    await defaultApi.post<MenuItemModel>("v1/api/menu/menuitem", data);
  getMenus = async () => (await defaultApi.get<MenuData[]>("v1/api/menu")).data;
  getMenuItems = async () => (await defaultApi.get<MenuItemModel[]>("v1/api/menu/menuitem")).data;
}

export const menuNetwork = new MenuNetwork();

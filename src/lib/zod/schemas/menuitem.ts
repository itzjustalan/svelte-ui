import type { z } from "zod";
import { categorySchema, menuItemSchema, menuSchema } from "../models/menu.model";

export type MenuData = z.infer<typeof menuDataSchema>;
export const menuDataSchema = menuSchema.omit({ id: true });

export type CategoryData = z.infer<typeof categoryDataSchema>;
export const categoryDataSchema = categorySchema.omit({ id: true });

export type MenuItemData = z.infer<typeof menuItemDataSchema>;
export const menuItemDataSchema = menuItemSchema.omit({ id: true });

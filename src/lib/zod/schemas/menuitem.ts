import type { z } from "zod";
import { menuItemSchema } from "../models/menu.model";

export type MenuItemData = z.infer<typeof menuItemDataSchema>;
export const menuItemDataSchema = menuItemSchema.omit({ id: true });

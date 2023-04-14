import { RecordSchema } from "cirql";
import { z } from "zod";

// Food Menu type define
export enum MenuItemType {
    veg = 'vegetarian',
    nonVeg = 'non-vegetarian',
    halal = 'halal'
}

export type MenuItem = z.infer<typeof menuItemSchema>;
export const menuItemSchema = RecordSchema.extend({
    id: z.string(),
    title: z.string().min(1).trim(),
    description: z.string().min(1).trim(),
    price: z.number(),
    itemType: z.nativeEnum(MenuItemType),
}).strict();

export type Category = z.infer<typeof categorySchema>;
export const categorySchema = RecordSchema.extend({
    id: z.string(),
    title: z.string().min(1).trim(),
    items: z.string().array(),
    // items: menuItemSchema.array(),
}).strict();

export type Menu = z.infer<typeof menuSchema>;
export const menuSchema = RecordSchema.extend({
    id: z.string(),
    title: z.string().min(1).trim(),
    categories: z.string().array(),
    // categories: categorySchema.array(),
}).strict();

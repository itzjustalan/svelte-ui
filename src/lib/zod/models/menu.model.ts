import { RecordSchema } from "cirql";
import { z } from "zod";

// Food Menu type define
export enum MenuItemType {
    veg = 'vegetarian',
    nonVeg = 'non-vegetarian',
    halal = 'halal'
}

export type Menu = z.infer<typeof MenuSchema>;
export const MenuSchema = RecordSchema.extend({
    username: z.string().max(255).email(),
    password: z.string().min(12).max(255),
});
export type MenuItem = z.infer<typeof MenuItemSchema>;
export const MenuItemSchema = RecordSchema.extend({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    itemType: z.nativeEnum(MenuItemType),
});


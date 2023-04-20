import { RecordSchema } from 'cirql';
import { z } from 'zod';

// Food Menu type define
export enum MenuItemType {
	veg = 'vegetarian',
	nonVeg = 'non-vegetarian',
	halal = 'halal'
}

export type MenuItemModel = z.infer<typeof menuItemModelSchema>;
export const menuItemModelSchema = RecordSchema.extend({
	id: z.string(),
	title: z.string().min(1).trim(),
	description: z.string().min(1).trim(),
	price: z.number(),
	itemType: z.nativeEnum(MenuItemType)
}).strict();

export type CategoryModel = z.infer<typeof categoryModelSchema>;
export const categoryModelSchema = RecordSchema.extend({
	id: z.string(),
	title: z.string().min(1).trim(),
	items: z.string().array()
	// items: menuItemSchema.array(),
}).strict();

export type MenuModel = z.infer<typeof menuModelSchema>;
export const menuModelSchema = RecordSchema.extend({
	id: z.string(),
	title: z.string().min(1).trim(),
	categories: z.string().array()
	// categories: categorySchema.array(),
}).strict();

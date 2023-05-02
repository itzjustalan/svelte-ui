import { RecordSchema } from 'cirql';
import { z } from 'zod';

// Food Menu type define
export type MenuItemTypeModel = z.infer<typeof menuItemTypeModelSchema>;
export const menuItemTypeModelSchema = RecordSchema.extend({
	id: z.string(),
	title: z.string().min(1).trim(),
	description: z.string().min(1).trim(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
}).strict();

export type MenuItemModel = z.infer<typeof menuItemModelSchema>;
export const menuItemModelSchema = RecordSchema.extend({
	id: z.string(),
	title: z.string().min(1).trim(),
	description: z.string().min(1).trim(),
	price: z.number(),
	menuItemTypes: z.string().array().min(1),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
}).strict();

export type CategoryModel = z.infer<typeof categoryModelSchema>;
export const categoryModelSchema = RecordSchema.extend({
	id: z.string(),
	title: z.string().min(1).trim(),
	menuItems: z.string().array(),
	// items: menuItemSchema.array(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
}).strict();

export type MenuModel = z.infer<typeof menuModelSchema>;
export const menuModelSchema = RecordSchema.extend({
	id: z.string(),
	title: z.string().min(1).trim(),
	categories: z.string().array(),
	// categories: categorySchema.array(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
}).strict();

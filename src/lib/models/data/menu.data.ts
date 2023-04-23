import {
	categoryModelSchema,
	menuItemModelSchema,
	menuItemTypeModelSchema,
	menuModelSchema,
} from '../db/menu.model';
import type { z } from 'zod';

export type MenuItemData = z.infer<typeof menuItemDataSchema>;
export const menuItemDataSchema = menuItemModelSchema
	.extend({
		menuItemTypes: menuItemTypeModelSchema.array(),
	})
	.strict();

export type CategoryData = z.infer<typeof categoryDataSchema>;
export const categoryDataSchema = categoryModelSchema
	.extend({
		menuItems: menuItemDataSchema.array(),
	})
	.strict();

export type MenuData = z.infer<typeof menuDataSchema>;
export const menuDataSchema = menuModelSchema
	.extend({
		categories: categoryDataSchema.array(),
	})
	.strict();

import { categoryModelSchema, menuItemModelSchema, menuModelSchema } from '../db/menu.model';
import type { z } from 'zod';

export type CategoryData = z.infer<typeof categoryDataSchema>;
export const categoryDataSchema = categoryModelSchema.extend({
	items: menuItemModelSchema.array()
});

export type MenuData = z.infer<typeof menuDataSchema>;
export const menuDataSchema = menuModelSchema
	.extend({
		categories: categoryDataSchema.array()
	})
	.strict();

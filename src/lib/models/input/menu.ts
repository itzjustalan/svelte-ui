import { z } from 'zod';
import {
	categoryModelSchema,
	menuItemModelSchema,
	menuItemTypeModelSchema,
	menuModelSchema,
} from '../db/menu.model';

// menu
export type MenuInput = z.infer<typeof menuInputSchema>;
export const menuInputSchema = menuModelSchema.omit({ id: true }).strict();

export type MenuUpdateInput = z.infer<typeof menuUpdateInputSchema>;
export const menuUpdateInputSchema = menuModelSchema.partial().extend({ id: z.string() }).strict();

// category
export type CategoryInput = z.infer<typeof categoryInputSchema>;
export const categoryInputSchema = categoryModelSchema.omit({ id: true }).strict();

export type CategoryUpdateInput = z.infer<typeof categoryUpdateInputSchema>;
export const categoryUpdateInputSchema = categoryModelSchema
	.partial()
	.extend({ id: z.string() })
	.strict();

// menuItem
export type MenuItemInput = z.infer<typeof menuItemInputSchema>;
export const menuItemInputSchema = menuItemModelSchema.omit({ id: true }).strict();

export type MenuItemUpdateInput = z.infer<typeof menuItemUpdateInputSchema>;
export const menuItemUpdateInputSchema = menuItemModelSchema
	.partial()
	.extend({ id: z.string() })
	.strict();

// menuItemType
export type MenuItemTypeInput = z.infer<typeof menuItemTypeInputSchema>;
export const menuItemTypeInputSchema = menuItemTypeModelSchema.omit({ id: true }).strict();

export type MenuItemTypeUpdateInput = z.infer<typeof menuItemTypeUpdateInputSchema>;
export const menuItemTypeUpdateInputSchema = menuItemTypeModelSchema
	.partial()
	.extend({ id: z.string() })
	.strict();

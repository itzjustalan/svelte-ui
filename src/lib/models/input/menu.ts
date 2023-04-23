import { z } from 'zod';
import {
	categoryModelSchema,
	menuItemModelSchema,
	menuItemTypeModelSchema,
	menuModelSchema,
} from '../db/menu.model';

export type MenuInput = z.infer<typeof menuInputSchema>;
export const menuInputSchema = menuModelSchema.omit({ id: true }).strict();

export type CategoryInput = z.infer<typeof categoryInputSchema>;
export const categoryInputSchema = categoryModelSchema.omit({ id: true }).strict();

export type MenuItemInput = z.infer<typeof menuItemInputSchema>;
export const menuItemInputSchema = menuItemModelSchema.omit({ id: true }).strict();

export type MenuItemTypeInput = z.infer<typeof menuItemTypeInputSchema>;
export const menuItemTypeInputSchema = menuItemTypeModelSchema.omit({ id: true }).strict();

export type MenuUpdateInput = z.infer<typeof menuUpdateInputSchema>;
export const menuUpdateInputSchema = menuModelSchema.partial().extend({ id: z.string() }).strict();

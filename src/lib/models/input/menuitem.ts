import type { z } from 'zod';
import { categoryModelSchema, menuItemModelSchema, menuModelSchema } from '../db/menu.model';

export type MenuInput = z.infer<typeof menuInputSchema>;
export const menuInputSchema = menuModelSchema.omit({ id: true });

export type CategoryInput = z.infer<typeof categoryInputSchema>;
export const categoryInputSchema = categoryModelSchema.omit({ id: true });

export type MenuItemInput = z.infer<typeof menuItemInputSchema>;
export const menuItemInputSchema = menuItemModelSchema.omit({ id: true });

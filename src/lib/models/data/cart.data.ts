import { z } from 'zod';
import { cartModelSchema } from '../db/cart.model';
import { menuItemDataSchema } from './menu.data';

// export const cartDataSchema = cartModelSchema.merge(z.object({
//     items: z.object({
//         menuItem: menuItemDataSchema,
//     }).array(),
// })).strict();
export const cartDataSchema = cartModelSchema
	.extend({
		items: z
			.object({
				menuItem: menuItemDataSchema,
				quantity: z.number().min(0).max(10),
			})
			.array(),
	})
	.strict();

export type CartData = z.infer<typeof cartDataSchema>;

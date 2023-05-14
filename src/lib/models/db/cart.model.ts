import { RecordSchema } from 'cirql';
import { z } from 'zod';

export type CartModel = z.infer<typeof cartModelSchema>;
export const cartModelSchema = RecordSchema.extend({
	id: z.string(),
	items: z
		.object({
			menuItem: z.string(),
			quantity: z.number().min(0).max(10),
		})
		.array(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
}).strict();

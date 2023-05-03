import { z } from 'zod';
import { userModelSchema } from '../db/user.model';

export type AuthInput = z.infer<typeof authInputSchema>;
export const authInputSchema = z
	.object({
		username: z.string().max(255).email(),
		password: z.string().min(12).max(255),
	})
	.strict();

export type UserInput = z.infer<typeof userInputSchema>;
export const userInputSchema = userModelSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.strict();

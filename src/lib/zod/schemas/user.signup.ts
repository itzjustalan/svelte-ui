import { z } from 'zod';

export type AuthData = z.infer<typeof authSchema>;
export const authSchema = z.object({
	username: z.string().max(255).email(),
	password: z.string().min(12).max(255)
});
// AuthSchema

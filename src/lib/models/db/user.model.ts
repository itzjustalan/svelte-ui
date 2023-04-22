import { RecordSchema } from 'cirql';
import { z } from 'zod';

// export interface User {
//   id: string,
//   username: string,
//   password: string
// }

export type UserModel = z.infer<typeof userModelSchema>;
export const userModelSchema = RecordSchema.extend({
	username: z.string().max(255).email(),
	password: z.string().min(12).max(255),
}).strict();

export type UnverifieduserModel = z.infer<typeof unverifieduserModelSchema>;
export const unverifieduserModelSchema = RecordSchema.extend({
	id: z.string(),
	code: z.string(),
	createdAt: z.coerce.date(),
	username: z.string().max(255).email(),
	password: z.string().min(12).max(255),
}).strict();

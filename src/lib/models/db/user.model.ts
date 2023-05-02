import { RecordSchema } from 'cirql';
import { z } from 'zod';

export type UserAccess = 'create_menu' | 'read_menu' | 'update_menu' | 'delete_menu';

export const UserRoles = {
	Admin: 'admin',
	Client: 'client',
	Customer: 'customer',
	Guest: 'guest',
} as const;

export type UserModel = z.infer<typeof userModelSchema>;
export const userModelSchema = RecordSchema.extend({
	username: z.string().max(255).email(),
	password: z.string().min(12).max(255),
	role: z.nativeEnum(UserRoles),
	access: z.string().array(), //todo: custom logic with zod refine
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
}).strict();

export type UnverifieduserModel = z.infer<typeof unverifieduserModelSchema>;
export const unverifieduserModelSchema = RecordSchema.extend({
	id: z.string(),
	code: z.string(),
	createdAt: z.coerce.date(),
	username: z.string().max(255).email(),
	password: z.string().min(12).max(255),
}).strict();

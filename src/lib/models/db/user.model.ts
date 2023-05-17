import { RecordSchema } from 'cirql';
import { z } from 'zod';

export const UserRoles = {
	Admin: 'admin',
	Client: 'client',
	Customer: 'customer',
	Guest: 'guest',
} as const;

export const userAccess = [
	'c_menu',
	'r_menu',
	'u_menu',
	'd_menu',
	'c_category',
	'r_category',
	'u_category',
	'd_category',
] as const;
export type UserAccessMap = {
	[key in UserAccess]: key;
};
export type UserAccess = (typeof userAccess)[number];
export const userAccessMap: UserAccessMap = (() => {
	let m: any = {};
	userAccess.map((e) => (m[e] = e));
	return m;
})();

export const accessesAreUserAccess = (access: string[]): boolean => {
	for (let i = 0; i < access.length; i++) {
		// if ((userAccess as ReadonlyArray<string>).includes(access[i]))
		// if (!userAccess.includes(access[i] as UserAccess)) return false;
		if (!userAccessMap[access[i] as keyof UserAccessMap]) return false;
	}
	return true;
};

export type UserModel = z.infer<typeof userModelSchema>;
export const userModelSchema = RecordSchema.extend({
	id: z.string(),
	username: z.string().max(255).email(),
	password: z.string().min(12).max(255),
	role: z.nativeEnum(UserRoles),
	access: z.string().array().refine(accessesAreUserAccess),
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

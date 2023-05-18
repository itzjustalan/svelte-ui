import type { UserAccessRoutes } from './controllers/uac.controller';
import { UserRoles } from './models/db/user.model';

export const userAccessRoutes: UserAccessRoutes = {
	// '/': 1,
	'/': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/favicon.ico': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/favicon.png': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1': {
		get: {
			roles: [UserRoles.Guest],
			access: {
				r_menu: 1,
				u_menu: 0,
			},
		},
	},
	'/v1/admin': {
		get: {
			roles: [UserRoles.Admin],
		},
	},
	'/v1/admin/menu': {
		get: {
			roles: [UserRoles.Admin],
		},
	},
	'/v1/api/auth/refresh': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/api/auth/signin': {
		post: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/api/auth/signout': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/api/auth/signup': {
		post: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/api/cart': {
		get: {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer],
		},
		put: {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer],
		},
	},
	'/v1/api/menu': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/api/menu/category': {
		get: {
			roles: [UserRoles.Guest],
		},
		post: {
			roles: [UserRoles.Client, UserRoles.Admin],
		},
	},
	'/v1/api/menu/menuitem': {
		get: {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer, UserRoles.Guest],
		},
		post: {
			roles: [UserRoles.Client, UserRoles.Admin],
		},
	},
	'/v1/api/menu/menuitemtype': {
		get: {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer, UserRoles.Guest],
		},
		post: {
			roles: [UserRoles.Client, UserRoles.Admin],
		},
	},
	'/v1/auth/signin': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/auth/signup': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/auth/verify': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/cart': {
		get: {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer],
		},
	},
	'/v1/client': {
		get: {
			roles: [UserRoles.Client, UserRoles.Admin],
		},
	},
	'/v1/client/category': {
		get: {
			roles: [UserRoles.Client, UserRoles.Admin],
		},
	},
	'/v1/client/menu': {
		get: {
			roles: [UserRoles.Client, UserRoles.Admin],
		},
	},
	'/v1/client/menuitem': {
		get: {
			roles: [UserRoles.Client, UserRoles.Admin],
		},
	},
	'/v1/client/menuitemtype': {
		get: {
			roles: [UserRoles.Client, UserRoles.Admin],
		},
	},
	'/v1/error': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/menu': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
	'/v1/protected': {
		get: {
			roles: [UserRoles.Client],
		},
	},
	'/v1/test': {
		get: {
			roles: [UserRoles.Guest],
		},
	},
};

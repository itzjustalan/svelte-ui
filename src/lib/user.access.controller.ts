import { NotFoundError, type AppError, UnauthorizedError, InternalServerError } from '$lib/errors';

export const UserRoles = {
	Admin: 'admin',
	Client: 'client',
	Customer: 'customer',
	Guest: 'guest',
} as const;

export type UserAccess = 'create_menu' | 'read_menu' | 'update_menu' | 'delete_menu';

export type AccessRouteMethod = 'get' | 'post' | 'put' | 'delete';
export type AccessRoute = {
	roles: ('admin' | 'client' | 'customer' | 'guest')[];
	access: {
		[key in UserAccess]?: 0 | 1;
	};
};

export const accessRoutes: {
	[key in AccessRouteMethod]: {
		[key: string]: AccessRoute;
	};
} = {
	get: {
		'/': {
			roles: [UserRoles.Guest],
			access: {},
		},
		'/v1': {
			roles: [UserRoles.Guest],
			access: {
				read_menu: 1,
				update_menu: 0,
			},
		},
		'v1/admin':{
			roles:[UserRoles.Admin],
			access: {
				
			},
		},
		'v1/admin/menu':{
			roles:[UserRoles.Admin],
			access: {
				
			},
		},
		'/v1/api/auth/refresh': {
			roles: [UserRoles.Guest],
			access: {},
		},
		'/v1/api/cart': {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer],
			access: {},
		},
		'/v1/api/menu': {
			roles: [UserRoles.Guest],
			access: {},
		},
		'/v1/api/menu/menuitem': {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer, UserRoles.Guest],
			access: {},
		},
		'/v1/api/menu/menuitemtype': {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer, UserRoles.Guest],
			access: {},
		},
		'/v1/client/menuitem': {
			roles: [UserRoles.Client],
			access: {}
		},
		'/v1/cart': {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer, UserRoles.Guest],
			access: {},
		},
		'/v1/menu': {
			roles: [UserRoles.Guest],
			access: {},
		},
		'/v1/auth/signin': {
			roles: [UserRoles.Guest],
			access: {},
		},
		'/v1/auth/signup': {
			roles: [UserRoles.Guest],
			access: {},
		},
		'/v1/test': {
			roles: [UserRoles.Admin],
			access: {},
		},
		'/v1/protected': {
			roles: [UserRoles.Client],
			access: {},
		},
	},
	post: {
		
		'/v1/api/auth/signin': {
			roles: [UserRoles.Guest],
			access: {},
		},
		'/v1/api/auth/signup': {
			roles: [UserRoles.Guest],
			access: {},
		},
	},
	put: {
		'/v1/api/cart': {
			roles: [UserRoles.Admin, UserRoles.Client, UserRoles.Customer],
			access: {},
		},
	},
	delete: {},
};

class UserAccessController {
	authorize(
		user: undefined | App.Locals['user'],
		url: string,
		method: string
	): AppError | undefined {
		const route = this._pick_route(method, url);
		if (route === undefined) return new InternalServerError('uac not defined!');
		if (route.roles.find((e) => e === UserRoles.Guest || e === user?.role)) return;
		if (this._has_access_to_route(user?.access ?? [], route)) return;
		return new UnauthorizedError();
	}

	_has_access_to_route(accesses: string[], route: AccessRoute): Boolean {
		for (let i = 0; i < accesses.length; i++) {
			if (route.access[accesses[i] as keyof AccessRoute['access']]) {
				return true;
			}
		}
		return false;
	}

	_pick_route(method: string, url: string): AccessRoute | undefined {
		switch (method.toLowerCase()) {
			case 'get':
				return accessRoutes['get'][url];
			case 'post':
				return accessRoutes['post'][url];
			case 'put':
				return accessRoutes['put'][url];
			case 'delete':
				return accessRoutes['delete'][url];
			default:
				return;
		}
	}
}

export const uacController = new UserAccessController();

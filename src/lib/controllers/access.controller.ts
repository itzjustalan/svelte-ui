import { NotFoundError, type AppError, UnauthorizedError } from '$lib/errors';
import { UserRoles, type UserAccess } from '$lib/models/db/user.model';
import type { RequestEvent } from '@sveltejs/kit';

export type AccessRouteMethod = 'get' | 'post' | 'put' | 'delete';
export type AccessRoute = {
	roles: ('admin' | 'client' | 'customer' | 'guest')[];
	access: {
		[key in UserAccess]?: boolean;
	};
};

export const accessRoutes: {
	[key in AccessRouteMethod]: {
		[key: string]: AccessRoute;
	};
} = {
	get: {
		'/v1': {
			roles: [UserRoles.Guest],
			access: {
				read_menu: true,
			},
		},
		'/v1/auth/signin': {
			roles: [UserRoles.Guest],
			access: {},
		},
		'/v1/auth/signup': {
			roles: [UserRoles.Guest],
			access: {},
		},
		'/v1/auth/refresh': {
			roles: [UserRoles.Guest],
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
	put: {},
	delete: {},
};

class AccessController {
	authorize(e: RequestEvent): AppError | undefined {
		const { user } = e.locals;
		const route = this._pick_route(e.request, e.url);
		if (route === undefined) return new NotFoundError();
		if (route.roles.find((e) => e === UserRoles.Guest || e === user.role)) return;
		if (this._has_access_to_route(user.access, route)) return;
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

	_pick_route(r: RequestEvent['request'], url: URL): AccessRoute | undefined {
		switch (r.method.toLowerCase()) {
			case 'get':
				return accessRoutes['get'][url.pathname];
			case 'post':
				return accessRoutes['post'][url.pathname];
			case 'put':
				return accessRoutes['put'][url.pathname];
			case 'delete':
				return accessRoutes['delete'][url.pathname];
			default:
				return;
		}
	}
}

export const accessController = new AccessController();

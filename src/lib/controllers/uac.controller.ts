import { type AppError, InternalServerError } from '$lib/errors';
// import { log } from '$lib/logger';
import { UserRoles, type UserAccess } from '$lib/models/db/user.model';
import { userAccessRoutes } from '$lib/user.access.control';

export type AccessRouteMethod = 'get' | 'post' | 'put' | 'delete';
export type AccessRoute = {
	roles: ('admin' | 'client' | 'customer' | 'guest')[];
	access?: {
		[key in UserAccess]?: 0 | 1;
	};
};
export type UserAccessRoutes = {
	// [key: string]: 1 | {
	[key: string]: {
		[key in AccessRouteMethod]?: AccessRoute;
	};
};

class UserAccessController {
	authorize(
		user: undefined | App.Locals['user'],
		url: string,
		method: string
	): AppError | undefined {
		// log.info(user, method, url);
		// if (userAccessRoutes[url] === 1) return;
		const route = this._pick_route(method.toLowerCase(), url, userAccessRoutes);
		if (route === undefined) return new InternalServerError('uac not defined!');
		if (route.roles.find((e) => e === UserRoles.Guest || e === user?.role)) return;
		if (this._has_access_to_route(user?.access ?? [], route)) return;
		return new InternalServerError('uac unauthorized!');
	}

	_has_access_to_route(accesses: string[], route: AccessRoute): Boolean {
		if (!route.access) return false;
		for (let i = 0; i < accesses.length; i++) {
			if (route.access[accesses[i] as keyof AccessRoute['access']]) {
				return true;
			}
		}
		return false;
	}

	_pick_route(method: string, url: string, routes: UserAccessRoutes): AccessRoute | undefined {
		if (this._string_is_method(method)) return routes[url]?.[method];
		// if (routes[url] === 1) return;
		// else if (routes[url] !== 1) let g = routes[url];
		// if (this._string_is_method(method)) return routes[url] === 1 ? undefined : routes[url]['post'];
	}

	_string_is_method = (method: string): method is AccessRouteMethod =>
		['get', 'post', 'put', 'delete'].includes(method);
}

export const uacController = new UserAccessController();

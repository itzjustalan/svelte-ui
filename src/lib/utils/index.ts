// export { HttpStatusCodes } from "./httpStatusCodes";

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export const getCookieValue = (name: string, cookie: string | null) =>
	cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null;

export const sleep = async (t: number) => new Promise((r) => setTimeout(r, t));

export const withTimeout = (p: object, msg = 'time out', ms = 1000) =>
	Promise.race([p, new Promise((_, r) => setTimeout(() => r(msg), ms))]);

// export const decodeJwt = (token: string) => jwt.decode(token); // needs polyfills

export interface JwtPayload {
	id: string;
	role: string;
	iat: number;
	exp: number;
}

export const decodeJwt = (token: string): JwtPayload => {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map((c) => {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);
	return JSON.parse(jsonPayload) as JwtPayload;
};

export const ToTitleCase = (text: string) => {
	return text
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const prettyPrintV = (title: string) => ToTitleCase(title.replaceAll('-', ' '));

// export const deleteUndefinedKeys = <T extends object>(data: T): void =>
// 	Object.keys(data).map(
// 		(key) => data[key as keyof T] === undefined && delete data[key as keyof T]
// 	) && undefined;

/**
 * delete all (and only) undefined values from an object (in place/by reference).
 * note: doesn't change null, 0, false etc... only undefined for db operations.
 * undefined values in arrays become \<empty items\>? always send normal arrays!
 * eg:
 * ```typescript
 * let o = { name: 'halid', age: 22, b: undefined, c: {
 * d: true, e: null, f: undefined, g: () => 3, h: 0, i: 1, j: false, k: undefined,
 * x: [1, 2, undefined, 3, 5], l: `cc`, m: { n: undefined } } };
 *
 * // remove them:
 * deleteUndefinedKeys({ ...o, o.a: o.a.filter(e => e !== undefined) });
 * // becomes:
 * o = { name: 'halid', age: 22, c: {
 * d: true, e: null, g: [Function: g], h: 0, i: 1, j: false,
 * x: [ 1, 2, 3, 5 ], l: 'cc', m: {} } };
 *
 * // or convert them to null
 * deleteUndefinedKeys({ ...o, o.a: o.a.map(e => e === undefined ? null : e) });
 * // becomes:
 * o = { name: 'halid', age: 22, c: {
 * d: true, e: null, g: [Function: g], h: 0, i: 1, j: false,
 * x: [ 1, 2, null, 3, 5 ], l: 'cc', m: {} } };
 * ```
 * */
export const deleteUndefinedKeys = <T extends object>(data: T): void =>
	Object.entries(data).forEach(([k, v]: [k: string, v: unknown]) =>
		v === undefined
			? delete data[k as keyof T]
			: v && typeof v === 'object'
			? deleteUndefinedKeys(v)
			: undefined
	);

export const dataFromFormData = (formData: FormData): { [key: string]: any } => {
	const data: { [key: string]: any } = {};
	for (let field of formData) {
		const [key, value] = field;
		data[key] = value;
	}
	return data;
};

// export const prettyPrintMenuItemType = (itemType: MenuItemType) => {
// 	switch (itemType) {
// 		case MenuItemType.veg:
// 			return 'Vegetarian';
// 		case MenuItemType.halal:
// 			return 'Halal';
// 		case MenuItemType.nonVeg:
// 			return 'Non Vegetarian';
// 		default:
// 			return 'Not Specified';
// 	}
// };

export const urlWithoutParams = (url: string, params: object): string => {
	const vals = Object.values(params);
	if (vals.length === 0) return url;
	vals.map((e) => (url = url.replace(e, '')));
	url = url.replace(/\/+$/, '');
	return url;
};

export const extFromName = (name: string): string | undefined => {
	const splits = name.split('.');
	if (splits.length === 1) return;
	return splits[splits.length - 1];
};

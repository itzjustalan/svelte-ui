import { dev } from '$app/environment';
import { log } from '$lib/logger';
import { genHash } from '$lib/server/utils';
import { miscService } from '$lib/services/misc.service';
import { userService } from '$lib/services/user.service';
import { users, carts } from '$lib/utils/seeds/users.json';
import { menus, categories, menuItems, menuItemTypes } from '$lib/utils/seeds/menus.json';
import {
	categoryModelSchema,
	menuItemModelSchema,
	menuItemTypeModelSchema,
	menuModelSchema,
} from '$lib/models/db/menu.model';
import { menuService } from '$lib/services/menu.service';
import { categoryService } from '$lib/services/category.service';
import { menuItemService } from '$lib/services/menuitem.service';
import { menuItemTypeService } from '$lib/services/menuitemtype.service';
import { userModelSchema } from '$lib/models/db/user.model';
import { cartModelSchema } from '$lib/models/db/cart.model';
import { cartService } from '$lib/services/cart.sevice';

declare global {
	var appData: {
		seeded: boolean;
	};
}

const gen_users = async () => {
	const ndate = new Date();
	await Promise.allSettled([
		...users.map(async (user) => {
			const nuser = { ...user, createdAt: ndate, updatedAt: ndate };
			const result = userModelSchema.safeParse(nuser);
			if (result.success)
				await userService.overwrite({
					...result.data,
					password: await genHash(result.data.password),
				});
			else log.error('error parsing user:', result.error);
		}),
		...carts.map(async cart => {
			const ncart = { ...cart, createdAt: ndate, updatedAt: ndate };
			const result = cartModelSchema.safeParse(ncart);
			if (result.success) await cartService.overwrite(result.data);
			else log.error('error parsing cart:', result.error);
		})
	]);
};

const gen_menus = async () => {
	const ndate = new Date();
	await Promise.allSettled([
		...menus.map(async (menu) => {
			const nmenu = { ...menu, createdAt: ndate, updatedAt: ndate };
			const result = menuModelSchema.safeParse(nmenu);
			if (result.success) await menuService.overwrite(result.data);
			else log.error('error seeding menu', nmenu, result.error);
		}),
		...categories.map(async (category) => {
			const ncategory = { ...category, createdAt: ndate, updatedAt: ndate };
			const result = categoryModelSchema.safeParse(ncategory);
			if (result.success) await categoryService.overwrite(result.data);
			else log.error('error seeding menu', ncategory, result.error);
		}),
		...menuItems.map(async (menuitem) => {
			const nmenuitem = { ...menuitem, createdAt: ndate, updatedAt: ndate };
			const result = menuItemModelSchema.safeParse(nmenuitem);
			if (result.success) await menuItemService.overwrite(result.data);
			else log.error('error seeding menu', nmenuitem, result.error);
		}),
		,
		...menuItemTypes.map(async (menuItemType) => {
			const nmenuItemType = { ...menuItemType, createdAt: ndate, updatedAt: ndate };
			const result = menuItemTypeModelSchema.safeParse(nmenuItemType);
			if (result.success) await menuItemTypeService.overwrite(result.data);
			else log.error('error seeding menu', nmenuItemType, result.error);
		}),
	]);
};
export const seedDataDevMode = async () => {
	if (!dev) return;
	// if (global.appData?.seeded ?? false) return;
	const appData = await miscService.getAppData();
	if (appData?.seeded) {
		log.warn('seed found! aborting...');
		// global.appData = { ...global.appData, seeded: true };
		return;
	}
	const promises = [];
	log.warn('seeding db!!');
	promises.push(gen_users());
	promises.push(gen_menus());
	await Promise.allSettled(promises);
	await miscService.setAppData({ seeded: true });
	// global.appData = { ...global.appData, seeded: true };
};

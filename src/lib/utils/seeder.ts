import { dev } from '$app/environment';
import { log } from '$lib/logger';
import { userInputSchema } from '$lib/models/input/user';
import { genHash } from '$lib/server/utils';
import { miscService } from '$lib/services/misc.service';
import { userService } from '$lib/services/user.service';
import { users } from '$lib/utils/seeds/users.json';
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

declare global {
	var appData: {
		seeded: boolean;
	};
}

const gen_users = async () => {
	await Promise.allSettled(
		users.map(async (user) => {
			const result = userInputSchema.safeParse(user);
			if (result.success)
				await userService.createNew({
					...result.data,
					password: await genHash(result.data.password),
				});
			else log.error('error seeding user:', result.error);
		})
	);
};

const gen_menus = async () => {
	const ndate = new Date();
	await Promise.allSettled([
		...menus.map(async (menu) => {
			const nmenu = { ...menu, createdAt: ndate, updatedAt: ndate };
			const result = menuModelSchema.safeParse(nmenu);
			if (result.success) await menuService.createNew(result.data);
			else log.error('error seeding menu', nmenu, result.error);
		}),
		...categories.map(async (category) => {
			const ncategory = { ...category, createdAt: ndate, updatedAt: ndate };
			const result = categoryModelSchema.safeParse(ncategory);
			if (result.success) await categoryService.createNew(result.data);
			else log.error('error seeding menu', ncategory, result.error);
		}),
		...menuItems.map(async (menuitem) => {
			const nmenuitem = { ...menuitem, createdAt: ndate, updatedAt: ndate };
			const result = menuItemModelSchema.safeParse(nmenuitem);
			if (result.success) await menuItemService.createNew(result.data);
			else log.error('error seeding menu', nmenuitem, result.error);
		}),
		,
		...menuItemTypes.map(async (menuItemType) => {
			const nmenuItemType = { ...menuItemType, createdAt: ndate, updatedAt: ndate };
			const result = menuItemTypeModelSchema.safeParse(nmenuItemType);
			if (result.success) await menuItemTypeService.createNew(result.data);
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
